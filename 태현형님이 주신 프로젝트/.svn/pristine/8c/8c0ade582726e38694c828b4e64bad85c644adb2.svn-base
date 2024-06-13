///////////////////////////////////////////////////////////////////////////////
// Author: Moon Ho Hwang (QIF)
// start date: 7/17/2015
//
// History
//      7/17/2015 by qif: add Genetic Algorithm (GA)
//      8/02/2015 by qif: add time limit for GA looping
///////////////////////////////////////////////////////////////////////////////

// real random number generator in [min, max]
function randomFloatFromInterval(min, max){
	return Math.random()*(max-min+1)+min;
}

// integer random number generator in [min, max]
function randomIntFromInterval(min,max){
    return Math.floor(randomFloatFromInterval(min, max));
}

////
// Basic class of Genetic Algorithm
//
////
function GeneticAlgorithm(debug_flag, time_limit_sec ) {
    this.debug_flag = (debug_flag)?true:false;
    this.time_limit_sec = (time_limit_sec)?time_limit_sec:2.0; // default 5 second
    this.terminatingByGoodSolutionOrTimeOut = function(bestsol, printout_flag) {
        var FindGoodSol =  this.threshold >0 &&  bestsol.eval < this.threshold;
        if (FindGoodSol) {
            console.log("Terminating by FindGoodSol!");
            return true;
        }
        var timeDiff =  (new Date() - this.startTime)/1000.0;
        var TimeOut = (/*!this.debug_flag &&*/ timeDiff > this.time_limit_sec);
        if (TimeOut) {
            console.log("Terminating by TimeOut!");
            return true;
        }
    }
    //-- looping condition for low-level pure GA.
	this.terminatingConditionForRunUntilSaturated = function(Population, currIternation, maxIteration) {
        // time difference in second
        if(this.terminatingByGoodSolutionOrTimeOut(Population[0], false))
            return true;
        var AverageStd = this.getStatistics(Population);
        var Converged = AverageStd.average * 0.1 > AverageStd.std;
        var overIteration = currIternation > maxIteration;
        return (Converged || overIteration);
	};

    this.generateNextGeneration=function(Population, OffspringSize, MutationProbability) {
        var NextGeneration=[];
        var parentPairs = this.selectParentPairs(Population, OffspringSize); // <-- (2) need to define
        //-- for each parents in the parent pair set.
        for(var sii=0; sii<parentPairs.length; sii++) {
            var parents = parentPairs[sii];
            //-- step 2.1. make a child from two parents
            var child = this.crossover(parents[0], parents[1]); //<-- (3) need to define
            //-- step 2.2. make a different feature of the child
            if(this.mutationCondition(MutationProbability))
                child = this.mutate(child); //<-- (4) need to define
            NextGeneration.push(child);
        }
        return NextGeneration;
    };
      //-- this function can be override considering internal options
    this.mutationCondition = function(MutationProbability) {
        return (Math.random()<MutationProbability);
    };
	//-- low-level pure genetic algorithm
    this.runUntilSaturated = function(maxIteration, PopulationSize, InitialPopulation, OffspringSize, MutationProbability) {
        //-- step 1. generate initial solutions ----------------------------------------------------------
        this.local_iterator = 1;
		var Population = this.generateInitialPopulation(PopulationSize, InitialPopulation); // <-- (1) need to define
        this.sortSolutions(Population);
        //-- step 2. improve the population to generate next population ----------------------------------
		do {
            //-- get 2.1 create next generation ----------------------------------------------------------
			var NextGeneration=this.generateNextGeneration(Population, OffspringSize, MutationProbability);

            //-- step 2.2 collect best solution from the current population and the next generation -------
			Population = this.pickTheBest(Population, NextGeneration, PopulationSize);
            this.local_iterator++ ;
		} while( !this.terminatingConditionForRunUntilSaturated(Population, this.local_iterator, maxIteration) );
		return  Population; // return best solution whose size if PopulationSize.
	};
    //-- high-level algorithm using low-level genetic algorithm
    this.terminatingConditionForMainRun = function(Population, currIternation, maxIteration) {
		if(this.terminatingByGoodSolutionOrTimeOut(Population[0], false))
            return true;
        var overIteration = currIternation > maxIteration;
        if (overIteration) {
            var AverageStd = this.getStatistics(Population);
            var Converged = AverageStd.average * 0.1 > AverageStd.std;
            if(Converged) {
                console.log("Terminating by Converged && overIteration!");
                return true;
            }
        }
        return false;
		//return !FindGoodSol  && !TimeOut  && (AverageStd.average * 0.1 < AverageStd.std || currIternation < maxIteration);
	};
	this.runOnce = function(InitPopulation, maxIternation, PopulationSize, OffspringSize, MutationProbability) {
        //-- step 1. generate initial solutions -----------------------------------------------------------
        //this.startTime = new Date();
        var Population = InitPopulation?InitPopulation.slice():[];
        //-- step 2. improve the solution iteratively  ----------------------------------------------------
        var ii = 0;// this.local_iterator;
        var HierPopulations = [];
		do {
            //-- step 2.1 generate a next generation ------------------------------------------------------
            var LocalGeneration = this.runUntilSaturated(maxIternation, PopulationSize, Population, OffspringSize, MutationProbability );
            Population=this.combine_sort(Population, LocalGeneration);
            var NextGeneration = this.generateNextGeneration(Population, OffspringSize, MutationProbability) ;
            //-- step 2.2 collect best solution from the current population and the next generation -------
			Population = this.pickTheBest(Population, NextGeneration, PopulationSize);
            ii = ii + this.local_iterator;
            HierPopulations.push(Population);
            if( this.debug_flag)
                this.log_iteration_status(ii, Population); // <-- tracking the trends
		}while( !this.terminatingConditionForMainRun(Population, ii, maxIternation) );
        if( this.debug_flag)
            this.log_iteration_status(ii, Population); // <--  tracking the trends
		return HierPopulations; // return the history
	};

    this.doAdjustSolutions2D = function(History){
    };

    this.doAdjustParameters = function(History){
    };

    this.run = function(maxIteration, PopulationSize, OffspringSize, MutationProbability ) {
        this.startTime = new Date();
        var PopulationHistory = [];
        var InitPopulation = this.init_population?this.init_population.slice():[];
        this.bsf=null;
        var iter = 0;
        var consecutive_no_improvement = 0;
        var ResetIterationLimitForNoImprovement = this.ResetIterationLimitForNoImprovement?this.ResetIterationLimitForNoImprovement:3; //
        this.UseHigherLoopOnGA = true;
        do {
            var History = this.runOnce(InitPopulation, maxIteration, PopulationSize, OffspringSize, MutationProbability);
            this.doAdjustSolutions2D(History);
            var BSFinNewGen = History[History.length-1][0];
            if(iter==0) {
                InitPopulation = [BSFinNewGen];
            } else {
                var BSFinLastGen = PopulationHistory[PopulationHistory.length-1][0];
                this.doAdjustParameters(BSFinLastGen); // like resampling the points
                if(Math.abs(BSFinLastGen.eval - BSFinNewGen.eval)<0.001 ) {
                    consecutive_no_improvement++;
                    if(consecutive_no_improvement == ResetIterationLimitForNoImprovement) {
                        console.log("Search seems to be traped at a local optimal. Reset the search at "+iter);
                        InitPopulation=[]; // reset the inital
                    }
                }
                else
                    InitPopulation = [BSFinNewGen];
            }
            PopulationHistory = PopulationHistory.concat(History); // update history
            iter++;
            //if(this.debug_flag)
        }while( this.UseHigherLoopOnGA && !this.terminatingByGoodSolutionOrTimeOut(BSFinNewGen, true));
        console.log("Total high-level iteration ="+iter);
        return PopulationHistory;
    };
    // combine and sort
    this.combine_sort = function(Population, NextGeneration) {
        var TotalPopulation=[];
        for(var pii=0;pii<Population.length; pii++) TotalPopulation.push(Population[pii]);
        for(var pii=0;pii<NextGeneration.length; pii++) TotalPopulation.push(NextGeneration[pii]);

        this.sortSolutions(TotalPopulation);
        return TotalPopulation;
    };

    this.pickTheBest = function(Population, NextGeneration, PopulationSize) {
        var TotalPopulation= this.combine_sort(Population, NextGeneration);
        var answer=[];
        for(var pii=0; pii<PopulationSize; pii++)// select the best
            answer.push(TotalPopulation[pii]);

        return answer;
    };
     //-- assume that each solution has "eval" value
    this.sortSolutions= function(TotalPopulation){
        TotalPopulation.sort( function(a,b) { return a.eval - b.eval; } );
    };

    this.getMinMaxTotal = function(Population) {
        var total = 0, min = Number.POSITIVE_INFINITY, max = Number.NEGATIVE_INFINITY;
        for(var k=0; k<Population.length; k++){
            var sol = Population[k];
            total += sol.eval;
            min = Math.min(min, sol.eval);
            max = Math.max(max, sol.eval);
        }
        return {total:total, min:min, max:max};
    };

    //-- assume that each solution has "eval" value
    this.getStatistics = function(Population) {
        var statis =  this.getMinMaxTotal(Population);
        var average = statis.total / Population.length;

        var std = 0;
        for(var k=0; k<Population.length; k++){
            var sol = Population[k];
            std += Math.sqrt( (average - sol.eval) * (average - sol.eval));
        }
        std = std / Population.length;
        statis["average"]=average;
        statis["std"] = std;
        return statis; // {average: average, std:std}
    };

    //-- console out the average and standard deviation of Population at iith iteration
    this.log_iteration_status = function(ii, Population)// <-- (*) optional
    {
        if(Population.length==0)
            return;

//        var s = this.getStatistics(Population);
//        console.log("ii="+ii+ ", best = " + Population[0].eval + ", average="+s.average + ", std="+s.std);
    }
}
