///////////////////////////////////////////////////////////////////////////////
// Author: Moon Ho Hwang (QIF)
// start date: 7/22/2015
// prerequisites: numeric
//                num_util.
// History
//      7/22/2015 by qif: Genetic Algorithm for Camera Orientation 
/////////////////////////////////////////////////////////////////////////////// 

/**
  Q: array of [u, v, 1];
  P: array of [x, y, z, 1];
  tr: position of (x,y,z);
  
  Find Rx and Ry so Rz = Rx * Ry in order to minimize sum_{i=1 to n} Q[i]*T-P[i] where T=inverse([R|tr]).
*/
function GA_Orientation() {
    //TestGA_Sphere.call(this); 
    GA_Position.call(this);
    
    this.samplingMinMaxP = function() {
        var x=0; y=1; z=2;
        var P = this.P;
        this.minP=[Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY];  
        this.maxP=[Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY]; 
        
        for(var ii=0; ii<P.length; ii++) {
            this.minP[x] = Math.min(P[ii][x], this.minP[x]);  this.minP[y] = Math.min(P[ii][y], this.minP[y]);  this.minP[z] = Math.min(P[ii][z], this.minP[z]); 
            this.maxP[x] = Math.max(P[ii][x], this.maxP[x]);  this.maxP[y] = Math.max(P[ii][y], this.maxP[y]);  this.maxP[z] = Math.max(P[ii][z], this.maxP[z]); 
        }
    };
    
    this.init = function(P, Q, projection16x1col, initMtx16x1col, PosiRanges, width, height,near_distance, useInitSol, 
                         correspondingPointPairs, OutlierThesholdSigmaN) {
       // this.debug_flag = true; // for debugging. 
        
        this.P = P;
        this.Q = Q;
        var M = initMtx16x1col;
        this.tr=[M[12],M[13],M[14]];
        this.PosiRanges = PosiRanges;
        this.projection16x1col=projection16x1col;
        this.initMtx16x1col = initMtx16x1col;
        this.width = width;
        this.height = height;
        this.near_distance = near_distance;
        this.useInitSol = useInitSol;
        this.first_sample = true;
        if(useInitSol)
            this.init_population= [{Rx:[M[0],M[1],M[2]], Ry:[M[4],M[5],M[6]], tr:this.tr, eval:this.evaluate({Rx:[M[0],M[1],M[2]], Ry:[M[4],M[5],M[6]], tr:this.tr})}];
        
        this.correspondingPointPairs = correspondingPointPairs;
        this.OutlierThesholdSigmaN = OutlierThesholdSigmaN? OutlierThesholdSigmaN: -1; // -1 no outlier filtering out. 
        
        this.samplingMinMaxP();
    };
    
    this.getInfo = function() {
        return "Solving Minimize Rx and Ry (Rz = Rx * Ry) in order to minimize sum_{i=1 to n} Q[i]*T-P[i] where T=inverse([R|tr])."
    };
     
    this.evaluate = function (sol) {
        //var p = new THREE.Vector3(a[0], a[1], a[2]);
        var x = sol.Rx, y = sol.Ry;
        var z = cross_product_3Dvector(x, y);
        var t = sol.tr;
        //var mtxWorld16x1row = [ x[0],y[0],z[0],t[0], x[1],y[1],z[1],t[1], x[2],y[2],z[2],t[2], 0,0,0,1 ];  // row first 
		var mtxWorld16x1col = [ x[0],x[1],x[2],0, y[0],y[1],y[2],0, z[0],z[1],z[2],0, t[0],t[1],t[2],1 ];  // column first 
        /*
		//var mtxWorldInverse16x1row = getInverseColArray(mtxWorld16x1row);
        var mtxWorldInverse16x1col = getInverseColArray(mtxWorld16x1col);
        //var mtxWorldInverse16x1star = getInverseColArray(this.initMtx16x1col); // column first 
		//var eval = evaluate_in_nomalized_window2(this.P, this.Q, this.projection16x1col, mtxWorldInverse16x1col, this.width, this.height, this.near_distance);
        var evals = evaluate_in_nomalized_window3(this.P, this.Q, this.projection16x1col, mtxWorldInverse16x1col, this.width, this.height, this.near_distance);
        //var evalr = evaluate_in_nomalized_window2(this.P, this.Q, this.projection16x1col, mtxWorldInverse16x1row, this.width, this.height);
        //var eval_star = evaluate_in_nomalized_window2(this.P, this.Q, this.projection16x1col, mtxWorldInverse16x1star, this.width, this.height);
		*/
        var evals = this.evaluateMtxWorldBasedOnSelectionRule(mtxWorld16x1col);
		return evals; 
    };
   
    this.getRandom3DUnitVector = function() {
        var R_norm; var R; 
        do {
            R =[randomFloatFromInterval(-1, 1), randomFloatFromInterval(-1, 1), randomFloatFromInterval(-1, 1)];
            R_norm = numeric.norm2(R);
        } while(Math.abs(R_norm) < 0.001);
        R = numeric.mul(1/R_norm, R); // make it unit vector. 
        return R;
    }; 
     
    this.getRandomRz = function(CamOrigin) {
        var x=0; y=1; z=2; 
        var Center =   [randomFloatFromInterval(this.minP[x],this.maxP[x]), 
                        randomFloatFromInterval(this.minP[y],this.maxP[y]), 
                        randomFloatFromInterval(this.minP[z],this.maxP[z])]
        var Rz = numeric.sub(CamOrigin,Center); // 
        return Rz;
    }; 
   
    this.getRandomRxRy = function() { 
        // when setting CamOrigin random instead of this.tr, the solution seems to be better.  
        var CamOrigin = this.getRandomPosition(this.PosiRanges.length, this.PosiRanges); 
        var Rz; var normRz; 
        do {
            Rz = this.getRandomRz (CamOrigin);
            normRz = numeric.norm2(Rz);
        }  while(normRz<0.001) ;
        Rz = numeric.mul(1/normRz, Rz); // Rz is unit. 
        
        var Ry;
        do { 
            Ry = this.getRandom3DUnitVector(); 
        } while(isEqualVector(Ry, Rz, 0.001)); // if Rx = Ry, generate different Ry 
        var UNzy = Gram_Schmidt_Orthonormalization([Rz,Ry], []);
        Ry = UNzy[1]; // Ry is unit and orthogonal to Rz. 
        var Rx = cross_product_3Dvector(Ry, Rz); // Y * Z = X . Rx is unit and orthogonal 
        return {Rx:Rx, Ry:Ry, O:CamOrigin};
    };
    
    this.getNoramlDistributed = function(P){
        //var sigma = 100; // difference magnitude. 
        var tx = generateGaussianNoise(0, (this.PosiRanges[0][1]-this.PosiRanges[0][0])/3);// range is the sigma 
        var ty = generateGaussianNoise(0, (this.PosiRanges[1][1]-this.PosiRanges[1][0])/3);// range is the sigma 
        var tz = generateGaussianNoise(0, (this.PosiRanges[2][1]-this.PosiRanges[2][0])/3);// range is the sigma 
        var TP=[P[0]+tx, P[1]+ty, P[2]+tz];
        return TP;
    };
    
    this.getRotateByZ = function(Ry) {
        var rotateRy; var norm;
        // 2pi:360 = x:30 degree => x=60pi/360 =>pi/6. is sigma
        do {
            var alpha = //randomFloatFromInterval(-Math.PI/2, Math.PI/2);
                        // 2PI:360=x:angle => x=PI*angle/180;
                        generateGaussianNoise(0, this.z_angle_6s * Math.PI /180);// +- 3 sigma 
            var T = [[Math.cos(alpha), -Math.sin(alpha), 0],
                     [Math.sin(alpha),  Math.cos(alpha), 0],
                     [              0,                0, 1]];
            rotateRy = numeric.dot(T, Ry);
            norm = numeric.norm2(rotateRy);
        } while(norm < 0.001);
        rotateRy = numeric.mul(1/norm, rotateRy);
        return rotateRy;
    };
    
    this.getRotateByY = function(Rz) {
        var rotateRz; var norm;
        // 2pi:360 = x:30 degree => x=60pi/360 =>pi/6. is sigma
        do {
            var alpha = //randomFloatFromInterval(-Math.PI/4, Math.PI/4); // 45 
                        generateGaussianNoise(0, this.y_angle_6s * Math.PI /180); // +- 3 sigma 
            var T = [[ Math.cos(alpha),  0, Math.sin(alpha)],
                     [               0,  1,               0],
                     [-Math.sin(alpha),  0, Math.cos(alpha)]];
            rotateRz = numeric.dot(T, Rz);
            norm = numeric.norm2(rotateRz);
        } while(norm < 0.001);
        return rotateRz;
    }; 
    
    this.getSeedBasedRandomRxRy = function() { 
        // when setting CamOrigin random instead of this.tr, the solution seems to be better.  
        var M = this.initMtx16x1col; 
        var CamOrigin = this.getNoramlDistributed([M[12],M[13],M[14]]); 
        var Rz = this.getRotateByY([M[8],M[9],M[10]]); // Rz is unit. [M[8],M[9],M[10]]
        var Ry = this.getRotateByZ([M[4],M[5],M[6]]);  // Ry is unit. 
        var UNzy = Gram_Schmidt_Orthonormalization([Rz,Ry], []);
        Ry = UNzy[1]; // Ry is unit and orthogonal to Rz 
        var Rx = cross_product_3Dvector(Ry, Rz); // Y * Z = X . Rx is unit and orthogonal  
        return {Rx:Rx, Ry:Ry, O:CamOrigin};
    };
        
    this.getRandomSolution = function () { // random selection in range for each x1, x2, x3  
        var sol;
        if(this.useInitSol)
            sol = this.getSeedBasedRandomRxRy();
        else
            sol = this.getRandomRxRy();
        var evals = this.evaluate({Rx:sol.Rx, Ry:sol.Ry, tr:this.tr});   
        if(this.parent2SelectionRule=="MatchingToMate")        
            return {Rx:sol.Rx, Ry:sol.Ry, tr:this.tr, eval:evals.eval, 
                diffAvgEN:evals.diffsInEN.average, diffAvgES:evals.diffsInES.average, 
                diffAvgWN:evals.diffsInWN.average, diffAvgWS:evals.diffsInWS.average}; 
        else
            return {Rx:sol.Rx, Ry:sol.Ry, tr:this.tr, eval:evals};
    }; 
    
    this.doAdjustSolutions2D = function(Histories){
        if(this.P.length == 0) {
            alert("empty this.P"); 
        }else
            console.log("|P|="+this.P.length);
            
        var P = this.P.slice();
        var Q = this.Q.slice();
        for(var ii=0; ii<Histories.length; ii++) {
            var historic_solutions = Histories[ii];
            for(var jj=0; jj<historic_solutions.length; jj++) {
                var sol = historic_solutions[jj];
                sol.P = P;
                sol.Q = Q;
            } 
        }
    };
    
    this.doAdjustParameters = function(bsfsol) { 
        if(this.OutlierThesholdSigmaN>0){ // filtering out outliers and picking inlier's maximum 16 points 
            this.P=[], this.Q=[];
            var x = bsfsol.Rx, y = bsfsol.Ry;
            var z = cross_product_3Dvector(x, y);
            var t = bsfsol.tr;
            //var mtxWorld16x1row = [ x[0],y[0],z[0],t[0], x[1],y[1],z[1],t[1], x[2],y[2],z[2],t[2], 0,0,0,1 ];  // row first 
            var mtxWorld16x1col = [ x[0],x[1],x[2],0, y[0],y[1],y[2],0, z[0],z[1],z[2],0, t[0],t[1],t[2],1 ];  // column first 
            var mtxWorldInverse16x1col = getInverseColArray(mtxWorld16x1col);
            pickTheSpreadingInlierPoints(this.correspondingPointPairs, this.Q, this.P, this.projection16x1col, mtxWorld16x1col, this.OutlierThesholdSigmaN);
            this.samplingMinMaxP();
        }
    };
     
    this.mixup = function(sol1, weight1, sol2, weight2) {
        var Rx = numeric.add(numeric.mul(weight1,sol1.Rx), numeric.mul(weight2,sol2.Rx));// average Rx       
        var Ry = numeric.add(numeric.mul(weight1,sol1.Ry), numeric.mul(weight2,sol2.Ry));// average Ry       
        var UN = Gram_Schmidt_Orthonormalization([Rx, Ry], []); // make them orthogonal
        var tr = numeric.add(numeric.mul(weight1,sol1.tr), numeric.mul(weight2,sol2.tr));// average position     
        var evals = this.evaluate({Rx:UN[0], Ry:UN[1], tr:tr});
        if(this.parent2SelectionRule=="MatchingToMate")        
            return  {Rx:UN[0], Ry:UN[1], tr:tr, eval:evals.eval,
                     diffAvgEN:evals.diffsInEN.average, diffAvgES:evals.diffsInES.average, 
                     diffAvgWN:evals.diffsInWN.average, diffAvgWS:evals.diffsInWS.average}; 
        else
            return {Rx:UN[0], Ry:UN[1], tr:tr, eval:evals};
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
        var sol2 = this.getRandomSolution(); //this.getSeedBasedNewSolution(sol1); // this.getRandomSolution(); 
        /*var totaleval = sol1.eval + sol2.eval;
        var weight1 = (this.crossoverRule=="EvalProportional" && totaleval>0.0001)? (totaleval - sol1.eval)/totaleval: 0.75;
        var weight2 = (this.crossoverRule=="EvalProportional" && totaleval>0.0001)? (totaleval - sol2.eval)/totaleval: 0.25;
        return this.mixup(sol1, weight1, sol2, weight2);
        */ 
        return this.crossover(sol1, sol2);
    }
}    

GA_Orientation.prototype = new GA_Position(); // TestGA_Sphere();
