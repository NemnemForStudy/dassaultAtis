///////////////////////////////////////////////////////////////////////////////
// Author: Moon Ho Hwang (QIF)
// start date: 7/17/2015
// 
// History
//      7/17/2015 by qif: add Genetic Algorithm
///////////////////////////////////////////////////////////////////////////////
 
function TestGA_Sphere() {
    GeneticAlgorithm.call(this);
    this.variable_size = 3, // variable size 
    this.range=[[-100000, 100000],[-100000, 100000],[-100000, 100000]]; 
    
    this.getInfo = function() {
        return  "Solving Minimize f([x1,x2,x3])=x1^2+x2^2+x3^2 where x1,x2,x3 in ["+this.range[0][0]+"," +this.range[0][1]+"]" + 
                ", parentSelectionRule =" + this.parentSelectionRule +
                ", repetationAllowed =" + this.repetationAllowed + 
                ", crossoverRule = " + this.crossoverRule; 
    }, 
    
    this.evaluate = function (a) {
        var eval =0;
        for(var ii=0; ii<a.length; ii++ ) 
            eval += (a[ii])*(a[ii]);
        return eval;
    },
    
    this.getRandomPosition = function (size, range) { 
        var length = (size)?size:  this.variable_size;
        var v=[];
        for(var ii=0; ii<length; ii++) 
            v.push(randomIntFromInterval(range[ii][0],range[ii][1]));
        return v;
    };
    
    this.getAroundPosition = function(P,radius_6sigma,range){ 
        var X=P[0], Y=P[1], Z=P[2]; 
         
        var tx = generateGaussianNoise(0, radius_6sigma/3);// radius_6sigma is 6sigma   
        if(X+tx < range[0][0]) X = range[0][0];
        else if(X+tx > range[0][1])  X = range[0][1];
        else X += tx;
        
        var ty = generateGaussianNoise(0, radius_6sigma/3);// radius_6sigma is 6sigma   
        if(Y+ty < range[1][0]) Y =  range[1][0]; 
        else if(Y+ty > range[1][1]) Y =  range[1][1];
        else Y += ty;
        
        var tz = generateGaussianNoise(0, radius_6sigma/3);// radius_6sigma is 6sigma   
        if(Z+tz < range[2][0]) Z = range[2][0];
        else if(Z+tz > range[2][1]) Z= range[2][1];
        else Z += tz;
        return [X, Y, Z]; 
    };
     
    this.getRandomSolution = function(){
        var v=this.getRandomPosition(3,this.range);   
        return{posi:v, eval:this.evaluate(v)}; 
    };
    //-- (1) generateInitialPopulation 
    this.generateInitialPopulation = function(PopSize, InitPopulation){// using random selection 
        var population = [];
        if(InitPopulation == null || InitPopulation.length == 0) {
            for(var ii=0; ii<PopSize; ii++) { 
                var sol = this.getRandomSolution();
                population.push(sol);
            }
        }else {
            for(var ii=0; ii<PopSize; ii++) {
                var ri = ii%InitPopulation.length;
                var sol = this.mutate(InitPopulation[ri]);
                population.push(sol);
            }
        } 
        return population;
    },
     
    //-- make pairs of parent matching.  
    this.selectParentPairs = function(SortedPopulation, selectSize){
        //console.log(this.data);
        var statis = this.getMinMaxTotal(SortedPopulation);
        var repeat = this.repetationAllowed;
        var solutions1 = this.parentSelectionRule=="Random"? selectSolutions(SortedPopulation, selectSize, repeat): selectSolutionsUsingEval(SortedPopulation, selectSize, statis, repeat); // 
        var solutions2 = this.parentSelectionRule=="Random"? selectSolutions(SortedPopulation, selectSize, repeat): selectSolutionsUsingEval(SortedPopulation, selectSize, statis, repeat); // 
        var ParentPairs=[];
        for(var ii=0; ii<solutions1.length; ii++) 
            ParentPairs.push([solutions1[ii], solutions2[ii]]); // make pair 
        return ParentPairs;
    }, 
     
    //-- (2) crossover 
    this.crossover= function(sol1, sol2){ // pure average between sol1 and sol2. 
        var vector=[];
        var totaleval = sol1.eval + sol2.eval;
        var weight1 = (this.crossoverRule=="EvalProportional" && totaleval>0.0001)? ((totaleval - sol1.eval)/totaleval): 0.5;
        var weight2 = (this.crossoverRule=="EvalProportional" && totaleval>0.0001)? ((totaleval - sol2.eval)/totaleval): 0.5;
        for(var ii=0; ii<sol1.posi.length; ii++)
            vector.push(weight1*sol1.posi[ii]+weight2*sol2.posi[ii]); // average 
             
        return  {posi:vector, eval:this.evaluate(vector)}
    },

    //-- (3) mutation 
    this.mutate= function(sol1){ // weighted average between 2*sol1 and random_solution 
        var radius_6sigma = this.radius_6s?this.radius_6s:10;
        var p2 =  this.getAroundPosition(sol1.posi, radius_6sigma, this.range);   
        var sol2 = {posi:p2, eval:this.evaluate(p2)} 
        return this.crossover(sol1, sol2);
    } 
}  

selectSolutions = function (SortedPopulation, selectSize, repetationAllowed){
    var notSelectedIndices = [];    
    for(var i=0; i<SortedPopulation.length; i++) 
        notSelectedIndices.push(i);  
    var NoOfSelections = Math.min(SortedPopulation.length, selectSize); 
    var selectedSolutions = [];
    while( selectedSolutions.length < NoOfSelections ) {
        var RandomNonSelectedIndex = randomIntFromInterval(0, notSelectedIndices.length-1);
        var ri = notSelectedIndices[RandomNonSelectedIndex];
        var selectedP = SortedPopulation[ri]; 
        selectedSolutions.push(selectedP);
        if(repetationAllowed == false)
            notSelectedIndices.splice(RandomNonSelectedIndex,1); // remove it 
    } 
    return selectedSolutions;
}

selectSolutionsUsingEval = function (SortedPopulation, selectSize, statis, repetationAllowed){  
    var max_plus_min = statis.max + statis.min; 
    var sum_max_min_subracting_eval = 0;
    for(var ii=0; ii<SortedPopulation.length; ii++) {
        var sol = SortedPopulation[ii];
        sum_max_min_subracting_eval += max_plus_min - sol.eval;
    }
    if(sum_max_min_subracting_eval < 0.001) 
        return this.selectSolutions(SortedPopulation, selectSize, repetationAllowed);
    else {
        var SelectedIndices = [];   
        var NoOfSelections = Math.min(SortedPopulation.length, selectSize); 
        var selectedSolutions = [];
        while( selectedSolutions.length < NoOfSelections ) {
            var RN = Math.random(); // randomIntFromInterval(0, notSelectedIndices.length-1);
            var CumulProb = 0;
            for(var ii=0; ii<SortedPopulation.length; ii++){
                var sol_ii = SortedPopulation[ii];
                var sol_ii_probability = (max_plus_min - sol_ii.eval)/ sum_max_min_subracting_eval;  
                CumulProb +=sol_ii_probability;
                if(CumulProb>= RN && 
                   repetationAllowed || !(ii in SelectedIndices) ) {
                    selectedSolutions.push(sol_ii);
                    SelectedIndices.push(ii); // add the index 
                    //console.log("selection index="+ii+" out of "+SortedPopulation.length); 
                    break; // from for loop 
                }   
            }
        } 
        if(selectedSolutions < NoOfSelections)
            throw "Not Enough selection made!";
        return selectedSolutions;
    } 
}

TestGA_Sphere.prototype = new GeneticAlgorithm(true);

function console_out_solutions(sols){
    for(var i = Math.min(sols.length-1,10); i>=0; i--){
        var s = sols[i]; 
        console.log("i="+i+", [x1="+s.posi[0]+", x2="+s.posi[1]+",x3="+s.posi[2]+"], eval="+s.eval);
    }
}
