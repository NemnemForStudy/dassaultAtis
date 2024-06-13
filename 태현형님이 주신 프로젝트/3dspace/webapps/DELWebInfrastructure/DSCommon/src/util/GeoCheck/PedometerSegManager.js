
//-- Class of Segment Manager 
function SegmentManager (options) { //uphill_acc, du_ratio, max_velocity) { 
    this.minimumSegmentTimeLength= 200; // milli second: requirement for being a segment 
    this.minimumSegmentHeightValue = 1.0;
    this.Segments=[];
    this.currentSegment= new Segment();    
    
    this.uphill_acc = options.uphill_acc? options.uphill_acc : 1.3; // meter / second^ 2 
    this.du_ratio = options.du_ratio? options.du_ratio : 0.70;    // % of decelleration against acceleration 
    this.downhill_acc = -this.uphill_acc * this.du_ratio;
    this.max_velocity =options.max_velocity? options.max_velocity : 1.6; // meter/second
    
    this.velocities = [];
    this.positions = []; 
    this.displacements=[]; // current position difference against previous position.
    this.limitForUpDown = 4;
    this.state = "Stop"; // {Stop, Walk};
    this.SmallerHeightCount = 0; // it will be used for make small steps be stoped by applying exponential pow 
    
    //-- this function is used for dynamic setting for options 
    this.setOptions = function(options) {
        for(var key in options) {
            this[key] = options[key];
        }
    }
    
    //-- get the last segment 
    this.getLastSegment = function() {
        var last_seg = null;
        if(this.Segments.length>0) 
            last_seg = this.Segments[this.Segments.length-1];
        return last_seg;
    }
    
    //-- true if (1) seg is not UpHill && (2) given d is greater than tails of seg. 
    this.DoesValidUpHillStart = function(d, ZcurrentSeg) {
        var seg = this.currentSegment;
        if ( seg.isUpHillByTail()) // keep going so NOT start
            return false;
        //else if(!ZcurrentSeg || ZcurrentSeg.isUpHillByEnds()) { // Z is UpHill too 
            var last_index = seg.data.length-1;
            for(var ii=0; ii<seg.tailIndexLength; ii++) {
                if( seg.data[last_index-ii] - 0.001 > d ) //going down 
                    return false; 
            }
            return true; 
        //} else
        //    return false;
    } 
    
    //-- true if (1) seg is not DownHill && (2) given d is smaller than tails of seg. 
    this.DoesValidDownHillStart = function(d, ZcurrentSeg) {
        var seg = this.currentSegment;
        if ( seg.isDownHillByTail()) // keep going so NOT start
            return false;
        //else if(!ZcurrentSeg || ZcurrentSeg.isDownHillByEnds())  { // Z is DownHill too 
            var last_index = seg.data.length-1;
            for(var ii=0; ii<seg.tailIndexLength; ii++) {
                if( seg.data[last_index-ii] < d - 0.001 ) //going up 
                    return false; 
            }
            return true; 
        //} else
        //    return false;
    } 
     
    
    this.getInterval= function(currentTime) {
        if(this.currentSegment) {
            var lastTime = this.currentSegment.lastTime();
            return (currentTime - lastTime)/1000; // make it in seconds
        }
        else
            return 16/1000; // make it 16 miliseconds in seconds
    }
    
    //-- apply UpHill for updating velocity and position 
    this.applyUpHillAcceleration= function(accel, timestamp) {
        if(this.velocities.length==0) {
           this.velocities.push(0); this.positions.push(0);
       }
       else {
           var dt = this.getInterval(timestamp); //16/1000.0; 
           var acc = this.uphill_acc; // Math.min(this.uphill_acc, accel); // 
           var velo = Math.min(this.max_velocity, this.velocities[this.velocities.length-1] + acc * dt) ;
           
           if( isNaN(velo))
               console.log("velo="+velo);
           
           this.velocities.push(velo);
           var disp;
           if(velo < this.max_velocity)
                disp = velo * dt + acc * dt *dt /2;
           else 
                disp = velo * dt;
            
           this.displacements.push(disp);
           
           var posi = this.positions[this.positions.length-1] + disp;
           this.positions.push(posi); 
           this.state = "Walk" 
       } 
    }
    
    //-- apply DownHill for updating velocity and position 
    this.applyDownHillAcceleration = function(accel, timestamp) {
        if(this.velocities.length==0) {
           this.velocities.push(0); this.positions.push(0);
        }else {
           var dt = this.getInterval(timestamp); //16/1000.0;
           var acc =  this.downhill_acc; //Math.max(this.downhill_acc, accel);  
           var velo =  Math.min(this.max_velocity, this.velocities[this.velocities.length-1] + acc * dt);
           if( velo < 0 ) 
              this.applyStopVelocity(timestamp, "Walk"); // keep walking mode 
           else {
               this.velocities.push(velo); 
               var disp = Math.max(0, velo * dt + acc * dt *dt /2); // no negative value 
               this.displacements.push(disp);
           
               var posi = this.positions[this.positions.length-1] + disp;
               this.positions.push(posi);
               this.state = "Walk";
           } 
        } 
    }
     
    this.applyReduceAcceleration=function(accel, timestamp) {
        if(this.velocities.length==0) {
           this.velocities.push(0); this.positions.push(0);
        }
        else {
           var segment = this.currentSegment;
           var dt = this.getInterval(timestamp); //16/1000.0;
           var NoOfPeaks = segment.countPeaks();
           var NoOfCanyons = segment.countCanyons(); 
           var NoOfBreaks = Math.min(NoOfPeaks, NoOfCanyons);
           var exp = Math.max(NoOfBreaks, this.SmallerHeightCount);
           
           var acc = (this.currentSegment.start_state == "Up") ? this.uphill_acc *  Math.pow(0.5, exp) : this.downhill_acc * Math.pow(0.5, exp);   
           var vel_prev = this.velocities[this.velocities.length-1];
           var new_vel_prev = (this.currentSegment.start_state == "Up") ? vel_prev * Math.pow(0.5, exp) : vel_prev * Math.pow(0.5, exp);  
           var velo =  Math.min(this.max_velocity,  new_vel_prev + acc * dt);
           
           if( velo < 0 || velo < 0.001) { // stop condition 
                if( this.currentSegmentMaturedEnough(4) ) // too long to sustain "Walk" state
                    this.applyStopVelocity(timestamp, "Stop");
                else
                    this.applyStopVelocity(timestamp, "Walk"); // keep "Walk" state
                this.currentSegment.start_state = "UpDown";
                this.SmallerHeightCount = 0;
           }
           else {
               this.velocities.push(velo); 
               var disp = Math.max(0, velo * dt + acc * dt *dt /2); // no negative value 
               this.displacements.push(disp);
           
               var posi = this.positions[this.positions.length-1] + disp;
               this.positions.push(posi);
               this.state = "Walk";
           } 
        } 
    }
    //-- apply Stop Velocity and Position 
    this.applyStopVelocity = function(timestamp, state) {
        this.velocities.push(0);  
        this.displacements.push(0);
        
        var posi = (this.positions.length>0)? this.positions[this.positions.length-1]: 0; 
        this.positions.push(posi);
        this.state = state?state:"Stop";
    } 
    //-- add the current segment to Segments buffer, and create a new segment to current segment. 
    this.addCurrentSegment = function(segState) {
        this.Segments.push(this.currentSegment);
        this.currentSegment = new Segment();    
        this.currentSegment.start_state = segState;
    }
    
    //-- get minimumSegmentHeightInWalk 
    this.minimumSegmentHeightInWalk=function() { 
        var answer = this.minimumSegmentHeightValue*0.4;       // requirement for a being a segment. 
        /*var lastSeg = this.getLastSegment();
        if(lastSeg)  
            answer = Math.max(this.minimumSegmentHeightValue*0.4, lastSeg.getHeight());// * 0.7;   
        */
        
        return answer;
    }
     
     this.currentSegmentTallEnough = function() {
        var sgH = this.currentSegment.getHeight();
        var sgHRequirement = this.minimumSegmentHeightValue*1.0; // 1.5;   
        if( sgH > sgHRequirement)
            return true;
        else
            return false; 
    }
    this.currentSegmentSmallEnough = function() {
        var sgH = this.currentSegment.getHeight();
        var sgHRequirement = this.minimumSegmentHeightInWalk();
            
        if( sgH < sgHRequirement)
            return true;
        else
            return false; 
    }
    this.currentSegmentMaturedEnough = function(weight) {
        var sgTL = this.currentSegment.getTimeLength();
        var coeff = weight?weight:1;
        
        if( sgTL > this.minimumSegmentTimeLength * coeff)
            return true;
        else
            return false; 
    } 
    
    //-- 
    this.addMotionSensorData/*New*/ = function(accel, timestamp, ZcurrentSeg) {  
        if(this.state == "Stop") {  
            // if timeMatured && Tall && UpStarts -> 
            if (this.currentSegmentMaturedEnough() && this.currentSegmentTallEnough() && this.DoesValidUpHillStart(accel, ZcurrentSeg) ){
                // state<-Walk, seg_state<-Up 
                this.applyUpHillAcceleration(accel, timestamp);
                this.addCurrentSegment("Up");   
            }else
                this.applyStopVelocity(timestamp, "Stop");   // state<-Stop, seg_state<-UpDown 
        }else { // state == "Walk"    
            if ( this.checkSmallSteps()) { // reduce the speed half, 
                this.applyReduceAcceleration(accel, timestamp); 
            } 
            else if (this.currentSegment.start_state != "Down") { // if seg_state == "Up" or "UpDown"    
                if (this.currentSegmentMaturedEnough() && !this.currentSegmentSmallEnough() && this.DoesValidUpHillStart(accel, ZcurrentSeg)) {
                    this.applyUpHillAcceleration(accel, timestamp);     
                    this.addCurrentSegment("Up");
                }else if (this.currentSegmentMaturedEnough() && !this.currentSegmentSmallEnough() && this.DoesValidDownHillStart(accel, ZcurrentSeg)) {// if timeMatured && DownStarts 
                    this.applyDownHillAcceleration(accel, timestamp);// seg_state<- Down 
                    this.addCurrentSegment("Down");
                } else
                    this.applyUpHillAcceleration(accel, timestamp);  // keep up hill 
            } else if (this.currentSegment.start_state == "Down") {//  if seg_state == "Down" 
                if (this.currentSegmentMaturedEnough() && !this.currentSegmentSmallEnough() && this.DoesValidUpHillStart(accel, ZcurrentSeg)) {
                    this.applyUpHillAcceleration(accel, timestamp);     
                    this.addCurrentSegment("Up");
                } else
                    this.applyDownHillAcceleration(accel, timestamp); // keep downhill                  
            } 
        } 
        this.currentSegment.add_data(accel, timestamp);  
    }  
     
    //-- 
    this.addMotionSensorDataOld = function(accel, timestamp, ZcurrentSeg) {  
        if(this.state == "Stop") {  
            // if timeMatured && Tall && UpStarts -> 
            if (this.currentSegmentMaturedEnough() && this.currentSegmentTallEnough() && this.DoesValidUpHillStart(accel, ZcurrentSeg) ){
                // state<-Walk, seg_state<-Up 
                this.applyUpHillAcceleration(accel, timestamp);
                this.addCurrentSegment("Up");   
            }else
                this.applyStopVelocity(timestamp, "Stop");   // state<-Stop, seg_state<-UpDown 
        }else { // state == "Walk"    
            if ( this.checkSmallSteps()) { // reduce the speed half, 
                this.applyReduceAcceleration(accel, timestamp); 
            } 
            else if (this.currentSegment.start_state != "Down") { // if seg_state == "Up" or "UpDown"    
                if (this.currentSegmentMaturedEnough() && !this.currentSegmentSmallEnough() && this.DoesValidDownHillStart(accel, ZcurrentSeg)) {// if timeMatured && DownStarts 
                    this.applyDownHillAcceleration(accel, timestamp);// seg_state<- Down 
                    this.addCurrentSegment("Down");
                }else
                    this.applyUpHillAcceleration(accel, timestamp);  // keep up hill 
            } else if (this.currentSegment.start_state != "Up") {//  if seg_state == "Down" or "UpDown"     
                if (this.currentSegmentMaturedEnough() && !this.currentSegmentSmallEnough() && this.DoesValidUpHillStart(accel, ZcurrentSeg)) {
                    this.applyUpHillAcceleration(accel, timestamp);     
                    this.addCurrentSegment("Up");
                } else
                    this.applyDownHillAcceleration(accel, timestamp); // keep downhill                  
            } 
        } 
        this.currentSegment.add_data(accel, timestamp);  
    }  
    
    this.checkSmallSteps = function() {
        var segment = this.currentSegment;
        var answer = false; 
        if(this.currentSegmentMaturedEnough(2) /*about .5 sec*/){
            var lastHeight = segment.getLastHeight(20);  // depend on the segment size 
            
            var NoOfPeaks = segment.countPeaks();
            var NoOfCanyons = segment.countCanyons();
            var LastSmallerHeight =  lastHeight < 0.10 && segment.data.length > 20;
            var SmallHeight = this.currentSegmentSmallEnough() ;
            var ManyOccilations = SmallHeight && NoOfPeaks > this.limitForUpDown && NoOfCanyons >this.limitForUpDown;
           
            if ( LastSmallerHeight || ManyOccilations )
                answer = true;
            if(answer) {
                if(LastSmallerHeight) { 
                    this.SmallerHeightCount ++;
                    if(ManyOccilations)
                        console.log(">>>> LastSmallerHeight & ManyOccilations <<<<");
                    else console.log(">>>> LastSmallerHeight  <<<<");
                } else
                    console.log(">>>> ManyOccilations <<<<");
            } 
        }
        return answer;
    }
     
     
    
    //-- clear cache of velocity/ position & Segments except the last one 
    //--- it can be used for avoiding memory shortage for realse mode. 
    this.clearCaches = function() {
        while(this.velocities.length>10) // keep only one last velocity 
            this.velocities.shift();
            
        while(this.positions.length>10) // keep only one last position 
            this.positions.shift();
        
        while(this.displacements.length>10) // keep only one last displacements 
            this.displacements.shift(); 
            
        while(this.Segments.length>10) // keep only one last segment 
            this.Segments.shift();
    }
}
