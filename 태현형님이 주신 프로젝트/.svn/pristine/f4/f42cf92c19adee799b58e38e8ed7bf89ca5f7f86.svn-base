
//--- Segment class ---
function Segment() {
    this.data =[];
    this.time_stamps =[];
    this.maxvalue = Number.NEGATIVE_INFINITY;
    this.minvalue = Number.POSITIVE_INFINITY;
    this.maxvalue_index = -1;
    this.minvalue_index = -1;
    this.tailIndexLength = 2; // the tail length to decide if the last data is turning around point.
    this.start_state = "UpDown";  // indicate up, down or both

    //-- add data d and timestamp,
    //-- update min, max value and indices as well
    this.add_data = function(d,timestamp) {
        this.data.push(d); // add d to data buffer
//        if(this.time_stamps.length>0 && timestamp < this.lastTime() )
//            console.log("timestamp < this.lastTime())");
        this.time_stamps.push(timestamp);
        if(d > this.maxvalue) { // update high peak
            this.maxvalue = d;
            this.maxvalue_index = this.data.length;
        }
        if(d < this.minvalue) { // update low peak
            this.minvalue = d;
            this.minvalue_index = this.data.length;
        }
    };

    //-- get last value of data
    this.lastData = function() {
        return this.data[this.data.length-1];
    };
    //-- get last timestamp
    this.lastTime = function() {
        return this.time_stamps[this.time_stamps.length-1];
    }
    //-- get first value of data
    this.firstData= function() {
        return this.data[0];
    };
    //-- get height = maxvalue - minvalue
    this.getHeight= function() { // maxvalue - minvalue
        var answer;
        if(this.data.length == 0 ||this. maxvalue_index == -1 || this.minvalue_index == -1 )
            answer= -1;
        else
            answer= this.maxvalue - this.minvalue;
        return answer;
    };
    //-- get timeLength = lastTime - startTime
    this.getTimeLength= function() { // end_time - start_time
        var answer;
        if(this.time_stamps.length == 0)
            answer =  -1;
        else
            answer = this.lastTime() - this.time_stamps[0];
        return answer;
    };
    //-- true if maxvalue_index < minvalue_index && minvalue_index is close to tail
    this.isDownHillByTail= function() { // ends to lowest within tolerance index length
        var answer = this.maxvalue_index < this.minvalue_index &&
                     this.minvalue_index >= this.data.length-1-this.tailIndexLength;
        return answer;
    };
    //-- true if firstData() > lastDatsa()
    this.isDownHillByEnds= function() { // ends to lowest within tolerance index length
        var answer = this.firstData() - this.lastData();
        return answer>0;
    };
    //-- true if minvalue_index < maxvalue_index && maxvalue_index is close to tail
    this.isUpHillByTail= function() { // ends to hightest within tolerance index length
        var answer = this.minvalue_index < this.maxvalue_index &&
                     this.maxvalue_index >= this.data.length-1-this.tailIndexLength;
        return answer;
    };
    //-- true if firstData() < lastDatsa()
    this.isUpHillByEnds= function() { // ends to lowest within tolerance index length
        var answer = this.firstData() - this.lastData();
        return answer<0;
    };

    this.checkIncreasingUpto=function(startIndex, endIndex ) {
        for(var ii=startIndex; ii<endIndex-1; ii++) {
            if(this.data[ii] >= this.data[ii+1])
                return false
        }
        return true;
    }

    this.checkDecreasingUpto=function(startIndex, endIndex ) {
        for(var ii=startIndex; ii<endIndex-1; ii++) {
            if(this.data[ii] <= this.data[ii+1])
                return false
        }
        return true;
    }

    //-- count how many peaks in this segment
    this.countPeaks = function() {
        var count = 0;
        for(var ii=this.tailIndexLength; ii<this.data.length-this.tailIndexLength; ii++) {
            if(this.checkIncreasingUpto(ii-this.tailIndexLength, ii) &&
               this.checkDecreasingUpto(ii, ii+this.tailIndexLength))
               count ++;
        }
        return count ;
    }

     //-- count how many peaks in this segment
    this.countCanyons = function() {
        var count = 0;
        for(var ii=1; ii<this.data.length-1; ii++) {
           if(this.checkDecreasingUpto(ii-this.tailIndexLength, ii) &&
               this.checkIncreasingUpto(ii, ii+this.tailIndexLength))
               count ++;
        }
        return count ;
    }
    this.getLastHeight = function(lastSize) {
        var length = Math.min(lastSize, this.data.length);
        var minv = Number.POSITIVE_INFINITY;
        var maxv = Number.NEGATIVE_INFINITY;
        for(var ii=0; ii < length; ii++) {
            var v = this.data[this.data.length-ii-1];
            if(v < minv) minv = v;
            if(maxv < v) maxv = v;
        }
        return maxv - minv;
    }
}
