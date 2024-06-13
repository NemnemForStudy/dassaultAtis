///////////////////////////////////////////////////////////////////////////////
// Author: Moon Ho Hwang (QIF)
// start date: 7/17/2015
// 
// History
//      7/17/2015 by qif: add Genetic Algorithm
/////////////////////////////////////////////////////////////////////////////// 

function TestGA_Rosenbrock() {
    TestGA_Sphere.call(this); 
    
    this.getInfo = function() {
        return "Solving Minimize f([x_1,x_2,x_3])=\Sigma_{i=1,2} (100*(x_{i+1}-x_i^2)^2)+(x_i^2-1)^2 where x_1,x_2,x_3 in ["+this.range[0][0]+"," +this.range[0][1]+"]" + 
                ", parentSelectionRule =" + this.parentSelectionRule +
                ", repetationAllowed =" + this.repetationAllowed + 
                ", crossoverRule = " + this.crossoverRule; 
    }
    
    //-- Rosenbrock evaulation: overiding evaluate which can be defined previously.  
    this.evaluate = function (a) {
        var eval =0;
        for(var ii=0; ii<a.length-1; ii++ ) 
            eval += 100*(a[ii+1]-a[ii]*a[ii])*(a[ii+1]-a[ii]*a[ii])+(a[ii]-1)*(a[ii]-1);
        return eval;
    }
} 

TestGA_Rosenbrock.prototype = new TestGA_Sphere();
