///////////////////////////////////////////////////////////////////////////////
// Author: Moon Ho Hwang (QIF)
// start date: 8/04/2015
// prerequisites: numeric
//                num_util.
// History
//      08/04/2015 by qif: add the class 
/////////////////////////////////////////////////////////////////////////////// 
/**
  Q: array of [u, v, 1];
  P: array of [x, y, z, 1];
  tr: position of (x,y,z);
  
  Find Rx and Ry so Rz = Rx * Ry in order to minimize sum_{i=1 to n} Q[i]*T-P[i] where T=inverse([R|tr]).
*/
function GA_Position() {
    TestGA_Sphere.call(this); 
    
    this.init = function(P, Q, projection16x1col, initialMtx16x1col, PosiRanges, width, height, near_distance, useInitSol) {
      //  this.debug_flag = true; // for debugging. 
        this.P = P;
        this.Q = Q; 
        this.PosiRanges = PosiRanges;
        this.projection16x1col=projection16x1col;
        this.initialMtx16x1col = initialMtx16x1col;
        this.posi = (this.initialMtx16x1col)?[this.initialMtx16x1col[12],this.initialMtx16x1col[13],this.initialMtx16x1col[14]]:null;
        this.width = width;
        this.height = height;
        this.near_distance = near_distance; 
        this.useInitSol = useInitSol;
        if(useInitSol)
            this.init_population= [{posi:this.posi, eval:this.evaluate(this.posi)}];
        
        this.first_sample = true;
        
        var x=0; y=1; z=2;
        this.minP=[Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY];  
        this.maxP=[Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY]; 
        
        for(var ii=0; ii<P.length; ii++) {
            this.minP[x] = Math.min(P[ii][x], this.minP[x]);  this.minP[y] = Math.min(P[ii][y], this.minP[y]);  this.minP[z] = Math.min(P[ii][z], this.minP[z]); 
            this.maxP[x] = Math.max(P[ii][x], this.maxP[x]);  this.maxP[y] = Math.max(P[ii][y], this.maxP[y]);  this.maxP[z] = Math.max(P[ii][z], this.maxP[z]); 
        }
    };
    
    this.getInfo = function() {
        return "Solving Minimize the position tr in order to minimize sum_{i=1 to n} Q[i]*T-P[i] where T=inverse([R|tr])."
    };
     
    this.evaluateMtxWorldBasedOnSelectionRule = function(mtxWorld16x1col) {
        //var mtxWorldInverse16x1row = getInverseColArray(mtxWorld16x1row);
        var mtxWorldInverse16x1col = getInverseColArray(mtxWorld16x1col);
        //var mtxWorldInverse16x1star = getInverseColArray(this.initialMtx16x1col); // column first 
        var evals ;
        if(this.parent2SelectionRule=="MatchingToMate")
            evals = evaluate_in_nomalized_window3(this.P, this.Q, this.projection16x1col, mtxWorldInverse16x1col, this.width, this.height, this.near_distance);
        else  
            evals = evaluate_in_nomalized_window2(this.P, this.Q, this.projection16x1col, mtxWorldInverse16x1col, this.width, this.height, this.near_distance);  
            
        //var evalr = evaluate_in_nomalized_window2(this.P, this.Q, this.projection16x1col, mtxWorldInverse16x1row, this.width, this.height);
        //var eval_star = evaluate_in_nomalized_window2(this.P, this.Q, this.projection16x1col, mtxWorldInverse16x1star, this.width, this.height);
        return evals;
    };
    
    this.evaluate = function (vector) {
        //var p = new THREE.Vector3(a[0], a[1], a[2]);
        var M = this.initialMtx16x1col;
        var x = [M[0],M[1],M[2]]; 
        var y = [M[4],M[5],M[6]]; 
        var z = [M[8],M[9],M[10]]; 
        var t = vector.slice();
        //var mtxWorld16x1row = [ x[0],y[0],z[0],t[0], x[1],y[1],z[1],t[1], x[2],y[2],z[2],t[2], 0,0,0,1 ];  // row first 
		var mtxWorld16x1col = [ x[0],x[1],x[2],0, y[0],y[1],y[2],0, z[0],z[1],z[2],0, t[0],t[1],t[2],1 ];  // column first 
		var evals = this.evaluateMtxWorldBasedOnSelectionRule(mtxWorld16x1col);
		
		return evals; 
    };
    //-- make pairs of parent matching.  
    this.selectParentPairs = function(SortedPopulation, selectSize){
        //console.log(this.data);
        var statis = this.getMinMaxTotal(SortedPopulation);
        var repeat = this.repetationAllowed;
        //var solutions1 = selectSolutions(SortedPopulation, selectSize); //selectSolutionsUsingEval(SortedPopulation, selectSize, statis); //selectSolutions(SortedPopulation, selectSize);
        //var solutions2 = selectSolutions(SortedPopulation, selectSize); // //selectSolutionsUsingEval(SortedPopulation, selectSize, statis); //selectSolutions(SortedPopulation, selectSize);//
        var solutions1 = this.parent1SelectionRule=="Random"? selectSolutions(SortedPopulation, selectSize, repeat): selectSolutionsUsingEval(SortedPopulation, selectSize, statis, repeat); // 
        var solutions2 = null;
        if(this.parent2SelectionRule=="Random") 
            solutions2 = selectSolutions(SortedPopulation, selectSize, repeat);
        else //if(this.parent2SelectionRule=="EvalProportional") 
            solutions2 = selectSolutionsUsingEval(SortedPopulation, selectSize, statis, repeat); // 
        //else
        //   solutions2 = this.selectSolutionsUsingDiff(SortedPopulation, solutions1); 
            
        var ParentPairs=[];
        for(var ii=0; ii<solutions1.length; ii++) 
            ParentPairs.push([solutions1[ii], solutions2[ii]]); // make pair 
        return ParentPairs;
    };
     
    this.selectSolutionsUsingDiff = function(SortedPopulation, SelectedSolutions1){
        var answer = [];
        for(var ii=0; ii<SelectedSolutions1.length; ii++) {
            var selected = SelectedSolutions1[ii];
            var diffSumNormMin = Number.POSITIVE_INFINITY;
            var minIndex = -1;
            for(var jj=0;jj<SortedPopulation.length; jj++) {
                var sol = SortedPopulation[jj];
                if(selected.eval == sol.eval && 
                   selected.diffAvgEN == sol.diffAvgEN && selected.diffAvgES == sol.diffAvgES && 
                   selected.diffAvgWS == sol.diffAvgWS && selected.diffAvgWN == sol.diffAvgWN)
                    continue;
                var diffInEN = numeric.add(selected.diffAvgEN, sol.diffAvgEN);
                var diffInES = numeric.add(selected.diffAvgES, sol.diffAvgES);
                var diffInWS = numeric.add(selected.diffAvgWS, sol.diffAvgWS);
                var diffInWN = numeric.add(selected.diffAvgWN, sol.diffAvgWN);
                var diffSum = numeric.add(numeric.add(diffInEN, diffInES), numeric.add(diffInWS, diffInWN));
                var diffSumNorm = numeric.norm2(diffSum);
                if(diffSumNorm < diffSumNormMin) {
                    diffSumNormMin = diffSumNorm; 
                    minIndex = jj;
                }
            }
            answer.push(SortedPopulation[minIndex]);
        }
        if(answer.length != SelectedSolutions1.length)
            throw "answer.length != SelectedSolutions1.length";
        return answer;
    }; 
    /*
    this.mixup = function(sol1, weight1, sol2, weight2) { 
        var v = numeric.add(numeric.mul(weight1,sol1.val), numeric.mul(weight2,sol2.val));// average position     
        var evals = this.evaluate(v);      
        if(this.parent2SelectionRule=="MatchingToMate")         
            return  {val:v, eval:evals.eval,
                     diffAvgEN:evals.diffsInEN.average, diffAvgES:evals.diffsInES.average, 
                     diffAvgWN:evals.diffsInWN.average, diffAvgWS:evals.diffsInWS.average}; 
        else
            return {val:v, eval:evals.eval}; 
    };
    
    //---------------------------------------------- 
    //-- (2) crossover 
    this.crossover= function(sol1, sol2){ // pure average between sol1 and sol2. 
        var totaleval = sol1.eval + sol2.eval;
        var weight1 = (this.crossoverRule=="EvalProportional" && totaleval>0.0001)? ((totaleval - sol1.eval)/totaleval): 0.5;
        var weight2 = (this.crossoverRule=="EvalProportional" && totaleval>0.0001)? ((totaleval - sol2.eval)/totaleval): 0.5;
        return this.mixup(sol1, weight1, sol2, weight2);
    };

    //-- (3) mutation 
    this.mutate= function(sol1){ // weighted average between 2*sol1 and random_solution 
        var sol2 = this.getRandomSolution(sol1.val, this.range, this.radius_std);  
        return this.crossover(sol1, sol2);
    } 
    */
}    

GA_Position.prototype = new TestGA_Sphere();
