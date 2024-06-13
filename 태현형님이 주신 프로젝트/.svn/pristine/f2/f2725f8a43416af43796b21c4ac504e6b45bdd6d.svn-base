///////////////////////////////////////////////////////////////////////////////
// Author: Moon Ho Hwang (QIF)
// start date: 7/22/2015
// prerequisites: numeric
//                num_util.
// History 
//      7/27/2015 by qif: Genetic Algorithm for Orientation and Position.
/////////////////////////////////////////////////////////////////////////////// 
/**
  Q: array of [u, v, 1];
  P: array of [x, y, z, 1];  
  Find (1) Rx and Ry so Rz = Rx * Ry  and (2) position, in order to minimize sum_{i=1 to n} Q[i]*T-P[i] where T=inverse([R|tr]).
*/
function GA_CamCalibration() { 
    GA_Orientation.call(this);   
    this.getInfo = function() {
        return "Solving Minimize Rx and Ry (Rz = Rx * Ry) and position in order to minimize sum_{i=1 to n} Q[i]*T-P[i] where T=inverse([R|tr])."
    }; 
      
    this.getRandomSolution = function () { // random selection in range for each x1, x2, x3
        //var sol = (this.useInitSol)? this.getSeedBasedRandomRxRy(): this.getRandomRxRy();
        var sol;
        if(this.useInitSol)
            sol = this.getSeedBasedRandomRxRy();
        else
            sol = this.getRandomRxRy();
        var evals = this.evaluate({Rx:sol.Rx, Ry:sol.Ry, tr:sol.O});
        if(this.parent2SelectionRule=="MatchingToMate")   
            return {Rx:sol.Rx, Ry:sol.Ry, tr:sol.O, eval:evals.eval, 
                diffAvgEN:evals.diffsInEN.average, diffAvgES:evals.diffsInES.average, 
                diffAvgWN:evals.diffsInWN.average, diffAvgWS:evals.diffsInWS.average}; 
        else
            return {Rx:sol.Rx, Ry:sol.Ry, tr:sol.O, eval:evals}; 
    };  
}    

GA_CamCalibration.prototype = new GA_Orientation();
