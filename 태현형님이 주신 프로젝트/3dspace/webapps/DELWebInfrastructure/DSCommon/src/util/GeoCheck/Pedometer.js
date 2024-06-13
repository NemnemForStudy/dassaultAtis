//-- Pedometer class 
function Pedometer(options) { // Axis, flagClearCaches, uphill_acc, du_ratio, max_velocity) {
    this.accelXs=[];
    this.accelYs=[];
    this.accelZs=[];
    this.movingAverageBSize= 5;
    this.AcceSegmentManager= new SegmentManager(options);  
    //this.AcceSegmentManagerZ= new SegmentManager(); // 9/10/2015 it is used for detecting real step not noisy motion of tab. 
    this.flagClearCaches = options.flagClearCaches?true:false;
    
    this.gravityXYZ=null; 
    this.gravity = null;
    
    this.Axis = options.Axis?options.Axis:"Y";
    
    this.average= function(data, size) {
        var answer = 0;
        if(!data || data.length==0)
            throw "NULL data";
        var length = size?Math.min(data.length,size):data.length;   
        for(var ii=0; ii<length; ii++)
            answer += data[ii];
        return (answer/length);
    }
    
    this.setSegmentManagingOptions = function(options) { 
        this.AcceSegmentManager.setOptions(options);  
    }
    this.movingAverage= function(x, y, z) {
        this.accelXs.push(x); this.accelYs.push(y); this.accelZs.push(z); 
        if(this.accelXs.length==this.movingAverageBSize) this.accelXs.shift(); 
        if(this.accelYs.length==this.movingAverageBSize) this.accelYs.shift(); 
        if(this.accelZs.length==this.movingAverageBSize) this.accelZs.shift(); 
        return {x:this.average(this.accelXs), y:this.average(this.accelYs), z:this.average(this.accelZs)}
    }
    
    this.removeGravityXYZ = function(inputXYZ) {   
        if(!this.gravityXYZ || isNaN(this.gravityXYZ.x))  
            this.gravityXYZ = inputXYZ; //0; // input;  
        else {
            this.gravityXYZ.x = 0.9 * this.gravityXYZ.x + (1-0.9) * inputXYZ.x;
            this.gravityXYZ.y = 0.9 * this.gravityXYZ.y + (1-0.9) * inputXYZ.y;
            this.gravityXYZ.z = 0.9 * this.gravityXYZ.z + (1-0.9) * inputXYZ.z;
        }
        
        var linear_acc = {x:inputXYZ.x - this.gravityXYZ.x, y:inputXYZ.y - this.gravityXYZ.y,
                          z:inputXYZ.z - this.gravityXYZ.z}
        return linear_acc; 
    }
    
    this.removeGravity = function(input) {   
        if(!this.gravity || isNaN(this.gravity))  
            this.gravity = input; //0; // input;  
        else  
            this.gravity = 0.9 * this.gravity + (1-0.9) * input; 
        
        var linear_acc =  input - this.gravity;
        return linear_acc; 
    }
    
    this.onMotionSensorChanged= function(event) {
        var accs = event.accelerationIncludingGravity?event.accelerationIncludingGravity:{x:0, y:0, z:0};
        var accelXYZ = this.movingAverage(parseFloat(accs.x), parseFloat(accs.y), parseFloat(accs.z)); 
        var XYZ = Math.sqrt(accelXYZ.y*accelXYZ.y + accelXYZ.z*accelXYZ.z + accelXYZ.x*accelXYZ.x); //  - 13.7; // 9.80665;
        //input = this.removeGravity(XYZ); // do not remove Gravity otherwise easy to stop. 
        
        //this.AcceSegmentManager.addMotionSensorData(gravityFreeAvvelXYZ.z, event.timeStamp);
        //if(this.Axis == "Y")
        this.AcceSegmentManager.addMotionSensorData(XYZ, event.timeStamp); //, this.AcceSegmentManagerZ.currentSegment);
        //else if(this.Axis == "X")
         //   this.AcceSegmentManager.addMotionSensorData(accelXYZ.x, event.timeStamp); //, this.AcceSegmentManagerZ.currentSegment);  
        //else
        //    throw "Invalide Pedometer.Axis";
        
        if(this.flagClearCaches)
            this.clearCaches(); 
    }
    
    this.onMotionSensorEnd=function() { 
        this.AcceSegmentManager.addCurrentSegment();
    }
    
    this.clearCaches = function() { 
        this.AcceSegmentManager.clearCaches();
    }
    
    this.getLastAcceleration = function() {
        var acc = this.AcceSegmentManager.currentSegment.lastData(); 
        return acc;
    }
    
    this.getLastVelocity = function() { 
        if(this.AcceSegmentManager.velocities.length>0)
            return this.AcceSegmentManager.velocities[this.AcceSegmentManager.velocities.length-1]; 
        else
            throw "No Velocities in this.AcceSegmentManager"; 
    }
    
    this.getLastPosition = function() { 
        if(this.AcceSegmentManager.positions.length>0)
            return this.AcceSegmentManager.positions[this.AcceSegmentManager.positions.length-1]; 
        else
            throw "No Positions in this.AcceSegmentManager"; 
    }
    
    this.getLastDisplacement = function() { 
        if(this.AcceSegmentManager.displacements.length>0)
            return this.AcceSegmentManager.displacements[this.AcceSegmentManager.displacements.length-1]; 
        else
            throw "No displacements in this.AcceSegmentManager"; 
    }
} 

//--- 
function getPedometerSegmentLabels(SegMngr, drawStartIndex, drawEndIndex) {
    var labels =[]; 
    var index = 0; 
    var label_started = false;
    for(var ii=0; ii < SegMngr.Segments.length; ii++) {  
        var segment = SegMngr.Segments[ii];   
        for(var jj=0; jj<segment.data.length; jj++, index++) { 
            if(index<drawStartIndex || drawEndIndex<index)  // out of our interests 
                continue; 
            if(!label_started) { // label gets started.  
                label_started = true; 
                labels.push(ii); 
            }
            else { 
                if(jj==0) // new segment starts 
                    labels.push(ii-1+"-"+ii); // show the boundary 
                else if(drawEndIndex==index) // end boundary 
                    labels.push(ii); 
                else { // 
                    if(jj==Math.round(segment.data.length/2)) { // segment middle point 
                        /*if(segment.isDownHillByEnds()) {
                            if(segment.isUpHillByEnds()) labels.push("B");
                            else                         labels.push("D");
                        } else {
                           if(segment.isUpHillByEnds())  labels.push("U");
                            else                         labels.push("B"); 
                        }*/
                        if (segment.start_state == "Up") labels.push("U");
                        else if (segment.start_state == "Down") labels.push("D");
                        else labels.push("B"); 
                    }else
                        labels.push(""); 
                } 
            } 
        } // for jj
    } // for ii 
    return labels;
}
