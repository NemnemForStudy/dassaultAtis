/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Author: Moon Ho Hwang (QIF)
// Starting Date: 04/27/2015
// Prerequisite Libraries: (1) numeric-1.2.6.js
//                         (2) num_util.js 
//  History of modification:
//     2015-05-14 by qif: promoted it first time. 
//     2015-07-27 by qif: if: Add a penalty in case the point is opposite side of near-plane in evaluation. 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
// C*Pt[i] = alpha_k*Wt[i] where i=0,..., Pt.length 
function validate_CP_W(C, Pt, Wt) { 
	var answer = true;
	var valid_test = 0; 
	for(var i=0; i<Wt.length; i++) {
		var P = Pt[i];
		//dbgr.log("P="+P);
		var W = numeric.dot(C, P);
		//dbgr.log("W="+W);
		if(Math.abs(W[2])>0.001) { valid_test++;
			var alpha  = 1.0/W[2];
			var alphaW = numeric.mul(alpha,W);
			if(isEqualVector(alphaW, Wt[i]) == false) {
				dbgr.log("C*P = "+alphaW+" != W="+Wt[i]);
				answer = false;
			}
		}
		else {
			//dbgr.log("Wrans="+Wt[i]);
		}
	}
	//dbgr.log("|valide test|="+valid_test);
	return answer;
}

// {(Wt[i], Pt[i])} is the set of corresponding (u,v) to (X,Y,Z,1) points where i=0,to, Wt.length
// build Bx = 0 from the statement C*Pt[i] = alpha_k*Wt[i] 
function create_N_8_B(Wt, Pt) {
	if (Wt.length != Pt.length) throw "Wt.length: "+ Wt.length + " != " + Pt.length + " Pt.length";
	var B = []; B[0]=[]; B[1]=[]; B[2]=[]; 
	for(var ii=0; ii<Wt.length; ii++) {
		var u = Wt[ii][0], v=Wt[ii][1];
		var x = Pt[ii][0], y=Pt[ii][1], z=Pt[ii][2]; 
 		B[0].push([-v*x, -v*y, -v*z,  -v,  u*x,  u*y,  u*z, u]); // for (r1,r2)=(c11,c12,c13,c14,c21,c22,c23,c24); 
		B[1].push([  -x,   -y,   -z,  -1,  u*x,  u*y,  u*z, u]); // for (r1,r3)=(c11,c12,c13,c14,c31,c32,c33,c34);
		B[2].push([  -x,   -y,   -z,  -1,  v*x,  v*y,  v*z, v]); // for (r2,r3)=(c21,c12,c23,c24,c31,c32,c33,c34);
	}
	return B;
}

// check orthogonality of (ux,uy), (ux,yz), and (uy,uz) where ux=Rcol[0], uy=Rcol[1], uz=Rcol[2]. 
function checkOrthogonality(Rcol) {
	var ux = Rcol[0]; // new THREE.Vector3(Rcol[0][0], Rcol[0][1], Rcol[0][2]);
	var uy = Rcol[1]; // new THREE.Vector3(Rcol[1][0], Rcol[1][1], Rcol[1][2]);
	var uz = Rcol[2]; // new THREE.Vector3(Rcol[2][0], Rcol[2][1], Rcol[2][2]);
	var nxy = numeric.dot(ux, uy);
	var nxz = numeric.dot(ux, uz);
	var nyz = numeric.dot(uy, uz);
	if( Math.abs(nxy)> 0.001 || Math.abs(nxz)> 0.001 || Math.abs(nyz)> 0.001 ) {
		console.log("Inner product on the axis is not zero.");
		return false;
	}
	/*
	var uxCPuy = cross_product_3Dvector(ux, uy); // new THREE.Vector3().crossVectors(ux, uy); 
	if(isEqualVector(uz, uxCPuy) == false) {
		dbgr.log("us="+uz + " != " + uxCPuy + "=uxCPUy!"); 
		//Rcol[2] = uxCPuy;
		//dbgr.log("Changed Rcol=");
		log_cs(Rcol);
		return false;
	}
	else	
	*/
	return true;
}

// solve u_k*p_k*r3 = ri*p_k using Ax=b where A=(u_k*p_k), r3=x, b = ri*p+k
function get_r3_from_ri(Wt, Pt, index, r, validation_needed){
 	var b=[];
	var A=[]
	for(var k=0; k<4/*Wt.length*/; k++) {
		var u = Wt[k][index];
		var P_k = Pt[k];
		var A_row = numeric.mul(u, P_k); // u is scalar 
		A.push(A_row); // A=u*Pk, x=r3
		
		var b_row = numeric.dot(r,P_k); // r is a vector 
		b.push(b_row); // know b = r*Pk
	}
    var r3 = numeric.solve(A, b);
	if(validation_needed) { 
		var vb = numeric.dot(A,r3);
		if(isEqualVector(b, vb, 0.001) == false) {
			console.log("get_r3_from_ri gives a wrong solution!");
			throw "get_r3_from_ri gives a wrong solution!";
		}
	}
	return r3;
}

// solve p_k*r1=u_k*p_k*r3 using Ax=b where A=(p_k), r1=x, b = u_k*p_k*r3
function get_r1_from_r3(Wt, Pt, r3, validation_needed){
 	var b=[];
	var A=[]
	for(var k=0; k<4/*Wt.length*/; k++) {
		var P_k = Pt[k];  
		A.push(P_k); // A=Pk, x=r1
		
		var u = Wt[k][0];
		var b_row = numeric.mul(u, numeric.dot(r3,P_k)); //  
		b.push(b_row); // known b = uk*r3*Pk 
	}
    var r1 = numeric.solve(A, b);
	if(validation_needed) { 
		var vb = numeric.dot(A,r1);
		if(isEqualVector(b, vb, 0.001) == false) {
			console.log("get_r1_from_r3 gives a wrong solution!");
			throw "get_r1_from_r3 gives a wrong solution!";
		}
	}
	return r3;
}
// u_k*p_k*r2 = v_k*r1*p_k using Ax=b where A=(u_k*p_k), r2=x, b = v_k*p_k*r1
function get_r2_from_r1(Wt, Pt, r1, validation_needed){
 	var b=[];
	var A=[]
	for(var k=0; k<4/*Wt.length*/; k++) {
		var u = Wt[k][0], v = Wt[k][1];
		var P_k = Pt[k];
		var A_row = numeric.mul(u, P_k); // u is scalar 
		A.push(A_row);//A=uk*pk, x = r2
		
		var b_row = numeric.mul(v, numeric.dot(r1,P_k)); 
		b.push(b_row); //b=vk*r1*pk
	}
    var r2 = numeric.solve(A, b);
	if(validation_needed) { 
		var vb = numeric.dot(A,r2);
		if(isEqualVector(b, vb, 0.001) == false) {
			console.log("get_r2_from_r1 gives a wrong solution!");
			throw "get_r2_from_r1 gives a wrong solution!";
		}
	}
	return r2;
}

// compute C (3x4 [R|RT] matrix transforming world coordinate system to camera coordinate system 
// from Bs = 0 if k=0, r1&r2 in s; if k=1, r1&r3 in s; and if k=2, r2&r3 in s.  
function compute_C(s, k, Wt, Pt, validation_needed) {  
	var r1, r2, r3;
	if(k ==0) {// r1 & r2, 
		r1 = [s[0],s[1],s[2],s[3]];// c11,c12,c13,c14
		r2 = [s[4],s[5],s[6],s[7]];// c21,c22,c23,c24  
		r3 = get_r3_from_ri(Wt, Pt, 0, r1, validation_needed);// u_k P_k*r3  = r1 * P_k 
	}else if(k==1) { // r1 & r3,  
		r1 = [s[0],s[1],s[2],s[3]];// c11,c12,c13,c14
		r3 = [s[4],s[5],s[6],s[7]];// c31,c32,c33,c34 
		r2 = get_r2_from_r1(Wt, Pt, r1, validation_needed);// u_k*p_k*r2 = v_k*r1*p_k
	}else{ // r2 & r3 
		r2 = [s[0],s[1],s[2],s[3]];// c21,c22,c23,c24
		r3 = [s[4],s[5],s[6],s[7]];// c31,c32,c33,c34 
		r1 = get_r1_from_r3(Wt, Pt, r3, validation_needed); //  p_k*r1=u_k*p_k*r3
	}
	
	var C = [r1,r2,r3];  
	return C;
}
/*
function get_C(B, sol, k, Wt, Pt) { 
	var B_dot_sol = numeric.dot(B, sol);
	var norm = numeric.norm2(B_dot_sol);
	if(Math.abs(norm) < 0.001) {    
		var C = compute_C(sol, k, Wt, Pt, true);
		return C;
	}
	else {
		return null;
	}
}
*/
//get [R|RT] and K where K[R|RT] * Pt[i] = alpha_k*Wt[i]. 
// sol and k hint Bx=0  
function get_RRT_Ks(ii, B, sol, k, Wt, Pt/*, cam*/, validation_needed ) { 
	var RRT_Ks = [];  
	var B_dot_sol = numeric.dot(B, sol);
	var norm = numeric.norm2(B_dot_sol);
	if(Math.abs(norm) < 0.001)  { 
		var C = compute_C(sol, k, Wt, Pt, validation_needed);
		if(!validation_needed || validate_CP_W(C, Pt, Wt)) {
			try{
				var RRT_K = get_RRT_K(C, ii,/* cam,*/ Wt, Pt, validation_needed);
				if(RRT_K != null) {
					dbgr.log("sols[k="+k+",ii="+ii+"]=");
					loge4x4(RRT_K.RRT);
					
					RRT_Ks.push(RRT_K);
				} 
			}				
			catch(err) { 
				console.log(err+"! catch error in get_RRT_Ks");
			}
		}else {
			dbgr.log("C could not meet C*P == W. @ k="+ k);
			dbgr.log("C_"+ii+"=");
			log_rs(C);		 
		}  
	} else {
		console.log("numeric.dot(B, sol) is not close to zero.");
	}
	return RRT_Ks; 
}

/**
  Ori: 16x1 rotation matrix. It can be null if not available. 
*/
function get_RRT_K(C, ii, /*cam,*/ Wt, Pt, validation_needed, Ori) {
	/*var VfC = cam.projectionMatrix; // K
	var CfV = cam.projectionMatrixInverse;
	var CfW = cam.matrixWorldInverse; // R|T
	var WfC = cam.matrixWorld;  // [R^t|-R^t*T]
	
	var VfW = new THREE.Matrix4().multiplyMatrices(VfC, CfW);
	dbgr.log("VfW(?=C)"); loge4x4(VfW.elements); */
	dbgr.log("C(?=VfW)"); log_rs(C);
	 
	/*dbgr.log("CfW(=WfC^-1)"); loge4x4(CfW.elements);
	dbgr.log("WfC(=CfW^-1)"); loge4x4(WfC.elements); 
	*/
	//------------------------------ get R from M where C=[M|MT] ----------------------------------------------
	var M=[]; // C[0] = r1.// C[1] = r2.// C[2] = r3.
	M.push([C[0][0],C[0][1],C[0][2]]); M.push([C[1][0],C[1][1],C[1][2]]); M.push([C[2][0],C[2][1],C[2][2]]); 
	dbgr.log("Mrow_"+ii+"="); log_rs(M);
	
	var Mcol = numeric.transpose(M);
	dbgr.log("Mcol_"+ii+"="); log_cs(Mcol); 
	
	//RQ decomposition(M), validity Q*Q^t=I is done inside.  
	var sol = getRQ(Mcol, true, Ori); //-- true: Z = X x Y| Y = Z x X | X = Y x Z
	var K = sol["R"]; // K: row vector of scales 
	dbgr.log("K="); log_rs(K);
	var R = sol["Q"]; // R: rotation matrix 
	dbgr.log("R="); log_rs(R);
	var KR = numeric.dot(K,R);
	for(var i=0; i<M.length; i++) {
		if(isEqualVector(M[i], KR[i]) == false )
			throw "M[i] != KR[i]!";
	}
    
	/* // commented out by qif @ 6/3/2015, 
	   // we need to allow a terrible solution.
	if(K[2][2]>0)
		return null; // seems negative is the answer. 
	*/
	
	//dbgr.log("R"+ii+"="); log_rs(R); 
	
	// skip validation 
	if(checkOrthogonality(R) == false) {  
		console.log("R is not orthogonal."); ;  
		throw "R is not orthogonal." ;  
	}
	//------------------------------- get T = M^-1* column(c4); -----------------------------------------------
	var Minv = numeric.inv(M);
	//dbgr.log("Minv_"+ii+"=");
	//log_cs(Minv);
	
	var T = numeric.dot(Minv, [ C[0][3], C[1][3], C[2][3] ]);  
	dbgr.log("T"+ii+"="+T);  
	var RT = numeric.mul(1, numeric.dot(R, T)); //  
	dbgr.log("RT_"+ii+"="+RT);
	
	//--- validation  
    if(validation_needed) { // validation could not be satisfied in approximation 
	    var KRT = numeric.dot(K, RT);
		var C2 =[[M[0][0],M[0][1],M[0][2],KRT[0]], 
	         [M[1][0],M[1][1],M[1][2],KRT[1]], 
			 [M[2][0],M[2][1],M[2][2],KRT[2]]];
			 
	    var flag = dbgr.flag;

	 //   dbgr.flag = true;
		for(var i=0; i<C2.length; i++) {
			if(isEqualVector(C[i],C2[i], 0.01) == false) {
				dbgr.log("C"); log_rs(C);
				dbgr.log("C2"); log_rs(C2);
				dbgr.flag = flag;
				//throw "C["+i+"] != C2["+i+"]."
			}
		}

		dbgr.flag = flag; 
		if( validate_CP_W(C2, Pt, Wt)==false) {		
			throw "C2*Pi != Wi."
		}
    }			 

	//-------------------------------------- set the camera --------------------------------------------------   
    /*
	var RRt = new THREE.Matrix4(R[0][0], R[0][1], R[0][2], RT[0], 
							    R[1][0], R[1][1], R[1][2], RT[1], 
							    R[2][0], R[2][1], R[2][2], RT[2], 
									  0,       0,       0,    1);  
	*/
    var RRt = [R[0][0], R[0][1], R[0][2], RT[0], 
               R[1][0], R[1][1], R[1][2], RT[1], 
               R[2][0], R[2][1], R[2][2], RT[2], 
                     0,       0,       0,    1];
                     
	dbgr.log("RRt="); loge4x4(RRt); 									  
	var RRT_K={	RRT:RRt, K:K }
	 
	return RRT_K;
}


function LongestPointIndex(p, others) {
    var index = -1;
    var max_dist = Number.NEGATIVE_INFINITY;
    for(var i=0; i<others.length; i++) {
        var d = distance(p, others[i]);
        if(d>max_dist) {
            index = i;
            max_dist = d;
        }
    }
    return index;
}

function randomIndex(Ps) { 
    return Math.round(Math.random()*(Ps.length-1)); 
}

function makeRandomSequence(Pt, Wt) {
    var valid_length = Pt.length; 
    var Ps = []; for(var i=0; i<Pt.length; i++) Ps.push(Pt[i]);
    var Ws = []; for(var i=0; i<Wt.length; i++) Ws.push(Wt[i]);
    Pt=[]; Wt=[];
    //Pt.push(Ps[0]); Wt.push(Ws[0]); Ps.shift(); Ws.shift();
    var last_p = Pt[Pt.length-1]; 
    while(Ps.length>0) {
        var longest_p_kndex = randomIndex(Ps); //  LongestPointIndex(last_p, Ps);
        if (longest_p_kndex < 0) 
            throw "Something wrong happends in Sequencing.";
        Pt.push(Ps[longest_p_kndex]);  // append it to Pt
        Wt.push(Ws[longest_p_kndex]);  // append it to Wt
        Ps.splice(longest_p_kndex, 1); // remove it from Ps 
        Ws.splice(longest_p_kndex, 1); // remove it from Ws
    }
    
    if(valid_length != Pt.length)
        throw "Pt length is not the same as before.";
        
    return {Pt:Pt, Wt:Wt};
} 

//-- evaluate K 
function evaluate_K(K) { // , wwidth, wheight) {
	
    var x_scale = K[0][0], y_scale = K[1][1], z_scale=K[2][2];
	var x_y_scale_diff = Math.abs(x_scale- y_scale)*2 / (x_scale + y_scale);  
	
	//var z_over_xy = Math.abs(K[2][2]) / (x_scale + y_scale);
    //positive_amount = positive_amount * z_over_xy;
	
	var x_translate = Math.abs(K[0][2]), y_translate = Math.abs(K[1][2]);
	var translate  =  Math.abs(x_translate)+Math.abs(y_translate); // Math.abs(x_translate - y_translate)*2/ (x_translate + y_translate); 
	var skew = Math.abs(K[0][1])  
	//---------------------------------------------------------------------------------------------
	// smaller [x_y_scale_diff and scale_translate] are better. => negative value with big absolute.
	// bigger is worse => positive value with big absolute. 
	//----------------------------------------------------------------------------------------------
    //var positive_amount = 1/x_y_scale_diff * 1/skew * 1/x_translate * 1/y_translate; 
	var positive_amount = 1/x_y_scale_diff  * 1/(skew + x_translate + y_translate);
	//positive_amount *= (Math.abs(z_scale)*2 / (x_scale + y_scale));
	positive_amount *= Math.abs(z_scale);
	
	var eval;
	if(z_scale>0) { // a crazy solution: make eval positive  
		eval = positive_amount;
		/*if(K[2][2] <1) { // make it positively bigger but less than INFINITY 
			if(positive_amount<1)
				eval = 1.0/positive_amount * 1/K[2][2];
			else 
				eval = positive_amount * 1/K[2][2];
		} else
		{
			eval = positive_amount * K[2][2];
			if(positive_amount<1)
				eval = 1.0/positive_amount * K[2][2];
			else 
				eval = positive_amount * K[2][2];
		}
		*/
	}
	else { // good solution: make eval negative   
		eval = -positive_amount;
		/*if(positive_amount<0.00000001) // if it is close to zero, make it negatively bigger!
			eval = Number.NEGATIVE_INFINITY;
		else
			eval = -1.0/positive_amount; 
		*/
	}
    return eval;
}


function printoutRRT_Ks(Sols, ww, wh) {
    for(var i = 0; i < Sols.length; i++) {
        var RRT_K = Sols[i];
        console.log("RRT["+i+"]="); loge4x4(RRT_K.RRT);
        var K = RRT_K.K;
        console.log("K["+i+"]=");log_rs(K);  
        var Kratio = K[0][0]/K[1][1];
        console.log("Kratio = "+Kratio + ", 1/Kratio = " + 1/Kratio);
        console.log("GW="+ww+"/GH="+wh+"="+ww/wh);  
    }
}

//--- get analytic solutions by mixing sequences of points 
function getAnalyticSolutions(correspondingPointPairs, MixSequencing, wwidth, wheight, validation_needed) {
    var  Pt=[], Wt=[]; 
    var Solutions = []; // clear 
    //var  RRT_K_star = null;
    var  mim_eval = Number.POSITIVE_INFINITY;
    for(var ii=0; ii<8 /*correspondingPointPairs.length*/;ii++) {
        var w = correspondingPointPairs[ii][0]; // window point  
        Wt.push(w);  
        var P = correspondingPointPairs[ii][1];  // 3D point  
        Pt.push(P);   
        dbgr.log(ii + ": w=" + w + ", p=" + P );
    } 
    if ( Wt.length < 8 ) {
        console.log( correspondingPointPairs.length + " point pairs corrected. at least 8 points we need to correct.");
        return RRT_K_star;
    }
    
    var iteration_limit = MixSequencing? 50: 1; 
    var good_sol_found = false;
    for(var iteration=0; good_sol_found == false && iteration < iteration_limit; iteration++) {
        try{ 
            if(MixSequencing) {
               var CorPs= makeRandomSequence(Pt, Wt);
               Pt = CorPs.Pt;
               Wt = CorPs.Wt;
            }
            
            //-- step 1. get SVD from B which is Bx = 0. 
            // get matrix form B form from point pairs ((u'_k, v'_k), (x_k, y_k,z_k) ) k=1 to 8.  
            var Bs = create_N_8_B(Wt, Pt); 
          
            for(var k=0;k<Bs.length;k++) { // if k=0 (r1,r2), k=1, (r1,r3), k=1, (r2,r3)  
                var B = Bs[k];
                //---- get SVD decomposition ****************
                /*var svd = numeric.svd(B); 
                var S = svd["S"];
                dbgr.log("S="+S);
                var V = svd["V"]; 
                */
				var S=[];
				var V = null;
				try {
					var svd = numeric.svd(B);  
					S = svd["S"];
					dbgr.log("S="+S);
					V = svd["V"]; 
				}
				catch(Err) {
					console.log("solving svd is failed"); 
				}	
                //-- step 2. For each i: S[i] = 0, V[i] is a solution for B*V[i] = 0. 
                for(var ii=0; ii<S.length; ii++) { 
                    if(Math.abs(S[ii])<0.001) {// where S[ii]=0 is the solution  
                        var sol = getColumn(V, ii);
                        dbgr.log("k="+k + ", ii="+ii);
                        var Rts = get_RRT_Ks(ii, B, sol, k, Wt, Pt/*, cam*/, validation_needed);
                        for(i in Rts) {
                            var RRT_K = Rts[i]; 
                            RRT_K["eval"] = evaluate_K(RRT_K.K); // ,wwidth, wheight); // evaluate RRT_K by it's K
                            Solutions.push(RRT_K);  // to global variable. 
                            if(RRT_K.eval < 0.001) {
                                good_sol_found = true;
                                break;
                            }
                        }
                    } // if 
                }// for  
            } // try 
        }
        catch(Error) {
            console.log(Error + " @ iteration="+iteration + " in getAnalyticSolutions()"); 
        }
    } // for iteration 
    return Solutions;
}

//--- get analytic solutions by mixing sequences of points 
function getSolutionsByLeastSquare(correspondingPointPairs) {
    var  Pt=[], Wt=[]; 
    var Solutions = []; // clear 
    //var  RRT_K_star = null;
    var  mim_eval = Number.POSITIVE_INFINITY;
    for(var ii=0; ii < correspondingPointPairs.length;ii++) {
        var w = correspondingPointPairs[ii][0]; // window point  
        Wt.push(w);  
        var P = correspondingPointPairs[ii][1];  // 3D point  
        Pt.push(P);   
        dbgr.log(ii + ": w=" + w + ", p=" + P );
    }   
     
    try{  
        var sols = getLeastSquareSolutions(Pt, Wt);;
        for(i in sols) { 
            Solutions.push(sols[i]);  
        }  
    }
    catch(Error) {
        console.log(Error + " @ iteration="+iteration + " in getAnalyticSolutions()"); 
    }
     
    return Solutions;
} 

function set_2D_evaluations(Solutions, THREE, projectionMatrix, width, height){
	var N = (Solutions)?Solutions.length:0; 
	if(projectionMatrix) { 
		for(var ii=0; ii<N; ii++) {
			var sol = Solutions[ii]; 
			var matrixWorldInverse = getThreeMatrix4(THREE,  sol.RRT); 
			var eval_2D = evaluate_in_nomalized_window(THREE, sol.P, sol.Q, projectionMatrix, matrixWorldInverse, width, height);
			sol["eval_2D"] = eval_2D;
		}
	}
}

/**
 This solution evaluation function works best so far.
 Added frustun check for points.
*/
function evaluate_in_nomalized_window(THREE, P, Q, projectionMatrix, matrixWorldInverse, width, height) {
	var CamCalibrationMtx = new THREE.Matrix4();
	CamCalibrationMtx.multiplyMatrices( projectionMatrix, matrixWorldInverse ); // 

    // make frustum for point / frustum check
    var frustum = new THREE.Frustum; 
    frustum.setFromMatrix(CamCalibrationMtx);
        
	var Qcomp=[];
	for(var ii=0; ii<P.length; ii++) {
		var p = P[ii];
        var pv = new THREE.Vector3(p[0],p[1],p[2]);
		var pc = new THREE.Vector3(p[0],p[1],p[2]);
        
 		pc = pc.applyProjection( CamCalibrationMtx ); 
 		
		var computed_nw = [pc.x/pc.z, pc.y/pc.z]; // normalize windows [-1,1] 
		//if(computed_nw[0]<-1 || computed_nw[0]>1 || computed_nw[1]<-1 || computed_nw[1]>1)
		//	alert("computation computed_nw is wrong!");
        var q = Q[ii];
		var origin_nw = [q[0], q[1]]; // [q[0]/width*2, q[1]/height*2]; // make q in Q normalize of [-1,1] 
	
		//if(origin_nw[0]<-1 || origin_nw[0]>1 || origin_nw[1]<-1 || origin_nw[1]>1)
		//	alert("computation origin_nw is wrong!");
		
		var dist = distance(computed_nw, origin_nw);
		if(computed_nw[0]>1 || computed_nw[0]<-1 || computed_nw[1]>1 || computed_nw[1]<-1 )
			dist = dist * 1; // if out of view, emphasize it. 
            
        if (!frustum.containsPoint(pv)) {
            dist += 3; // this point is outside of frustum , move it out
        }  
 		Qcomp.push(dist); 
	} 
	var distance_statistics =getAverageAndStd(Qcomp); // {average:average, std:sigma, Qcomp:Qcomp};   
    var dist_average_sqr = distance_statistics.average  ;//+ distance_statistics.std+ distance_statistics.average * distance_statistics.std ; 
	return dist_average_sqr; 
}

function multiplyMatriceElements(ae, be) {
	var te=[1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];
	var a11 = ae[0], a12 = ae[4], a13 = ae[8], a14 = ae[12];
	var a21 = ae[1], a22 = ae[5], a23 = ae[9], a24 = ae[13];
	var a31 = ae[2], a32 = ae[6], a33 = ae[10], a34 = ae[14];
	var a41 = ae[3], a42 = ae[7], a43 = ae[11], a44 = ae[15];

	var b11 = be[0], b12 = be[4], b13 = be[8], b14 = be[12];
	var b21 = be[1], b22 = be[5], b23 = be[9], b24 = be[13];
	var b31 = be[2], b32 = be[6], b33 = be[10], b34 = be[14];
	var b41 = be[3], b42 = be[7], b43 = be[11], b44 = be[15];

	te[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
	te[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
	te[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
	te[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;

	te[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
	te[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
	te[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
	te[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;

	te[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
	te[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
	te[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
	te[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;

	te[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
	te[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
	te[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
	te[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;
	return te;
}

function applyProjection(p, e) {
	var x = p[0], y = p[1], z = p[2]; 
	var d = 1 / ( e[3] * x + e[7] * y + e[11] * z + e[15] ); // perspective divide

	var px = ( e[0] * x + e[4] * y + e[8]  * z + e[12] ) * d;
	var py = ( e[1] * x + e[5] * y + e[9]  * z + e[13] ) * d;
	var pz = ( e[2] * x + e[6] * y + e[10] * z + e[14] ) * d;

	return [px, py, pz];
}

function get_uv_distance_of_PQ_from_solution(P, Q, projectionElems, matrixWorldInverseElems, near_dist) {
    var CamCalibrationElems = multiplyMatriceElements( projectionElems, matrixWorldInverseElems ); //
    var distToNearPlane = 1; //near_dist?near_dist:0;
    var CamWorld = getInverseColArray(matrixWorldInverseElems); // camera world matrix 
    var camOrigin = [CamWorld[12],CamWorld[13],CamWorld[14]];  // get camera origin 
    var NearPlaneNorm = [-CamWorld[8],-CamWorld[9],-CamWorld[10]]; // -Z of the camera orientation 
    var pointOnNearPlane = numeric.add(camOrigin, numeric.mul(distToNearPlane, NearPlaneNorm));
	//------------------------------------------------------------------------------------------------------
    var distances=[];
    var computedQ=[];
	var x=0, y=1, z=2;
	for(var ii=0; ii<P.length; ii++) {
		var p = P[ii].slice();   
		var q = Q[ii];
        var origin_q = [q[0], q[1]]; // [q[0]/width*2, q[1]/height*2]; // make q in Q normalize of [-1,1]  
        
        var dist = 0; 
        var pc = applyProjection(p, CamCalibrationElems);
        var computed_q = [pc[x]/pc[z], pc[y]/pc[z]]; // normalize windows [-1,1]  
        computedQ.push(computed_q);
        
        dist = distance(computed_q, origin_q);
         
        var pointOnNearPlane2p = numeric.sub(p, pointOnNearPlane); // p - pointOnNearPlane 
        var halfplane = numeric.dot(pointOnNearPlane2p, NearPlaneNorm);
         if ( halfplane < 0) { // opposite side of near plane  
            dist += 3; // penalty 
        } 
        
 		distances.push(dist); 
	} 
    return {distances:distances, computedQ:computedQ};
}

/**
 This solution evaluation function works best so far.
 Added frustun check for points.
*/
function evaluate_in_nomalized_window2(P, Q, projectionElems, matrixWorldInverseElems, width, height, near_dist) {
	/*var CamCalibrationElems = multiplyMatriceElements( projectionElems, matrixWorldInverseElems ); //
    
    // make frustum for point / frustum check
    //var frustum = new THREE.Frustum; 
    //var m = new THREE.Matrix4(CamCalibrationElems); // transpose16x1(CamCalibrationElems));
    //frustum.setFromMatrix(m);
    
    //-- qif: 7/27/2015.
    //-- Do not use THREE.Frustum.contain(p) test
    //-- But use a half-plane test. To do that, we need a point on the near plane. 
    var distToNearPlane = 1; //near_dist?near_dist:0;
    var CamWorld = getInverseColArray(matrixWorldInverseElems); // camera world matrix 
    var camOrigin = [CamWorld[12],CamWorld[13],CamWorld[14]];  // get camera origin 
    var NearPlaneNorm = [-CamWorld[8],-CamWorld[9],-CamWorld[10]]; // -Z of the camera orientation 
    var pointOnNearPlane = numeric.add(camOrigin, numeric.mul(distToNearPlane, NearPlaneNorm));
	//------------------------------------------------------------------------------------------------------
    
    var Qcomp=[];
	var x=0, y=1, z=2;
	for(var ii=0; ii<P.length; ii++) {
		var p = P[ii].slice();   
        var dist = 0;
        //var pv = new THREE.Vector3(p[0], p[1], p[2]);  
        var pc = applyProjection(p, CamCalibrationElems);
        var computed_nw = [pc[x]/pc[z], pc[y]/pc[z]]; // normalize windows [-1,1] 
        //if(computed_nw[0]<-1 || computed_nw[0]>1 || computed_nw[1]<-1 || computed_nw[1]>1)
        //	alert("computation computed_nw is wrong!");
        
        var q = Q[ii];
        var origin_nw = [q[0], q[1]]; // [q[0]/width*2, q[1]/height*2]; // make q in Q normalize of [-1,1] 
        //if(origin_nw[0]<-1 || origin_nw[0]>1 || origin_nw[1]<-1 || origin_nw[1]>1)
        //	alert("computation origin_nw is wrong!");
        dist = distance(computed_nw, origin_nw);
        
        //if(computed_nw[0]>1 || computed_nw[0]<-1 || computed_nw[1]>1 || computed_nw[1]<-1 )
        //    dist = dist; // if out of view, emphasize it. 
           
         //var frusCon = frustum.containsPoint(pv);
        var pointOnNearPlane2p = numeric.sub(p, pointOnNearPlane); // p - pointOnNearPlane 
        var halfplane = numeric.dot(pointOnNearPlane2p, NearPlaneNorm);
         if ( halfplane < 0) { // opposite side of near plane  
            dist += 3; 
        } 
        
 		Qcomp.push(dist); 
	} 
    */
    var distances = get_uv_distance_of_PQ_from_solution(P, Q, projectionElems, matrixWorldInverseElems, near_dist);
	var distance_statistics =getAverageAndStd(distances.distances); // {average:average, std:sigma, Qcomp:Qcomp};   
    var dist_average_sqr = distance_statistics.average  ;//+ distance_statistics.std+ distance_statistics.average * distance_statistics.std ; 
	return dist_average_sqr; 
}
/**
 This solution evaluation function works best so far.
 Added frustun check for points.
*/
function evaluate_in_nomalized_window3(P, Q, projectionElems, matrixWorldInverseElems, width, height, near_dist) {
	var CamCalibrationElems = multiplyMatriceElements( projectionElems, matrixWorldInverseElems ); //
    
    // make frustum for point / frustum check
    //var frustum = new THREE.Frustum; 
    //var m = new THREE.Matrix4(CamCalibrationElems); // transpose16x1(CamCalibrationElems));
    //frustum.setFromMatrix(m);
    
    //-- qif: 7/27/2015.
    //-- Do not use THREE.Frustum.contain(p) test
    //-- But use a half-plane test. To do that, we need a point on the near plane. 
    var distToNearPlane = 1; //near_dist?near_dist:0;
    var CamWorld = getInverseColArray(matrixWorldInverseElems); // camera world matrix 
    var camOrigin = [CamWorld[12],CamWorld[13],CamWorld[14]];  // get camera origin 
    var NearPlaneNorm = [-CamWorld[8],-CamWorld[9],-CamWorld[10]]; // -Z of the camera orientation 
    var pointOnNearPlane = numeric.add(camOrigin, numeric.mul(distToNearPlane, NearPlaneNorm));
	//------------------------------------------------------------------------------------------------------
    
    var Qcomp=[];
	var x=0, y=1, z=2;
    var projectedP = []; 
    var diffsInEN=[], diffsInES=[], diffsInWS=[], diffsInWN=[];
    var averageDiffInEN=[0,0], averageDiffInES=[0,0], averageDiffInWS=[0,0], averageDiffInWN=[0,0];
    var NegativeHalfPlaneIndices=[];
	for(var ii=0; ii<P.length; ii++) {
		var p = P[ii].slice();   
        var dist = 0;
        //var pv = new THREE.Vector3(p[0], p[1], p[2]);  
        var pc = applyProjection(p, CamCalibrationElems);
        var computed_nw = [pc[x]/pc[z], pc[y]/pc[z]]; // normalize windows [-1,1] 
        //if(computed_nw[0]<-1 || computed_nw[0]>1 || computed_nw[1]<-1 || computed_nw[1]>1)
        //	alert("computation computed_nw is wrong!");
        projectedP.push(computed_nw);
        
        var q = Q[ii];
        var origin_nw = [q[0], q[1]]; // [q[0]/width*2, q[1]/height*2]; // make q in Q normalize of [-1,1] 
        //if(origin_nw[0]<-1 || origin_nw[0]>1 || origin_nw[1]<-1 || origin_nw[1]>1)
        //	alert("computation origin_nw is wrong!");
        var diff = numeric.sub(origin_nw, computed_nw); // computed_nw to origin_nw   
        dist = numeric.norm2(diff); // distance(computed_nw, origin_nw);
             
        //var frusCon = frustum.containsPoint(pv);
        var pointOnNearPlane2p = numeric.sub(p, pointOnNearPlane); // p - pointOnNearPlane 
        var halfplane = numeric.dot(pointOnNearPlane2p, NearPlaneNorm);
        if ( halfplane < 0) { // opposite side of near plane  
            NegativeHalfPlaneIndices.push(ii);
            dist += 3;
        } 
 		Qcomp.push(dist);
        
        //---------------------------- 8/4/2015 by qif ---------------------------------
        if(computed_nw[0]>0) { // right (east)
            if(computed_nw[1]>0) { // top (north) => EN
                diffsInEN.push(diff);
                averageDiffInEN = numeric.add(diff, averageDiffInEN);
            } else { // bottom (south) => ES
                diffsInES.push(diff);
                averageDiffInES = numeric.add(diff, averageDiffInES);
            }
        } else { // left(west)
            if(computed_nw[1]>0) { // top (north) => WN
                diffsInWN.push(diff);
                averageDiffInWN = numeric.add(diff, averageDiffInWN);
            } else { // bottom (south) => WS 
                diffsInWS.push(diff);
                averageDiffInWS = numeric.add(diff, averageDiffInWS);
            }
        }
        if(diffsInEN.length>0)
            averageDiffInEN = numeric.add(1/diffsInEN.length, averageDiffInEN);
        if(diffsInES.length>0)
            averageDiffInES = numeric.add(1/diffsInES.length, averageDiffInES);
        if(diffsInWN.length>0)
            averageDiffInWN = numeric.add(1/diffsInWN.length, averageDiffInWN);
        if(diffsInWS.length>0)
            averageDiffInWS = numeric.add(1/diffsInWS.length, averageDiffInWS);
	} 
	var distance_statistics =getAverageAndStd(Qcomp); // {average:average, std:sigma, Qcomp:Qcomp};   
    var dist_average_sqr = distance_statistics.average  ;//+ distance_statistics.std+ distance_statistics.average * distance_statistics.std ; 
	return {eval:dist_average_sqr, projectedP:projectedP, NegativeHalfPlaneIndices:NegativeHalfPlaneIndices,
           diffsInEN:{diffs:diffsInEN, average:averageDiffInEN}, diffsInES:{diffs:diffsInES, average:averageDiffInES}, 
           diffsInWS:{diffs:diffsInWS, average:averageDiffInWS}, diffsInWN:{diffs:diffsInWN, average:averageDiffInWN} };
}
/*
function evaluate_for_visibility_test(THREE, Viewer,  P, Q,  projectionMatrix, matrixWorldInverse, width, height) {
	var CamCalibrationMtx = new THREE.Matrix4();
	CamCalibrationMtx.multiplyMatrices( projectionMatrix, matrixWorldInverse ); //
    
 	var camera = new THREE.Camera();
	camera.projectionMatrix = projectionMatrix.clone(); // 
	camera.matrixWorldInverse = matrixWorldInverse.clone();  
         
    // Get Camera position
    var cameraMtx = new THREE.Matrix4();
    cameraMtx.getInverse(matrixWorldInverse);
    var wfc = cameraMtx.elements;    
    var cameraPos = new THREE.Vector3(wfc[12],wfc[13],wfc[14]);     

	for(var ii=0; ii<P.length; ii++) {
		var p = P[ii];
        var pv = new THREE.Vector3(p[0],p[1],p[2]);
            
        var ray = new THREE.Ray(cameraPos, pv.clone.sub(cameraPos).normalize());
        var pickFaces = true, pickLines = true, pickPoints = true;
        var intersects = ray.intersectMeshInstances({ object: Viewer.internalSceneGraph.scene},
                camera, new THREE.Vector3(iMouse.x, iMouse.y, 1),
            pickFaces, pickLines, pickPoints,
            width, height);
            
			if ( intersects.length > 0 ) { 
				var SELECTEDOBJ = intersects[ 0 ];  
				var cameraViewOriginP = p.clone();
          }
                    
	} 
	return dist;     
}
*/

/**
   
*/
function evaulate_sol_by_3D_points(THREE, sol, pickingObjects, VIEW_ANGLE, ASPECT, NEAR, FAR, width, height) { 
	var camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
	setCameraPositionOrientation(camera, sol, THREE); 
	camera.updateMatrixWorld(); // 
	camera.matrixWorldInverse.getInverse( camera.matrixWorld );  
	var cameraPosi = camera.position.clone(); 
	
	var CamCalibrationMtx = new THREE.Matrix4();
	CamCalibrationMtx.multiplyMatrices( camera.projectionMatrix, camera.matrixWorldInverse ); //  
	
	var diffs =[];
	
	for(var ii=0; ii<sol.P.length; ii++) { 
		/*var q = sol.Q[ii]; 
		var nwx = ((q[0] + width/2)/width)*2-1;    // normalized window x 
        var nwy = -(((height/2)-q[1])/height)*2+1; // normalized window y 
		
		var nearPlainPoint = new THREE.Vector3( nwx, nwy, NEAR);  
		var	projector = new THREE.Projector();
		projector.unprojectVector( nearPlainPoint, camera ); // make nearPlainPoint in world coordinate 3D point. 
		var raycaster = new THREE.Raycaster( cameraPosi, nearPlainPoint.sub( cameraPosi ).normalize() ); // cameraPosi + casting direction. 
		*/
		var p = new THREE.Vector3(sol.P[ii][0], sol.P[ii][1], sol.P[ii][2]);
		
		var raycaster = new THREE.Raycaster( cameraPosi, p.clone().sub( cameraPosi ).normalize() ); // cameraPosi + casting direction. 
		
		try{
			var intersects = raycaster.intersectObjects( pickingObjects, true ); // true => recursive
			if ( intersects.length > 0 ) { 
				var SELECTEDOBJ = intersects[ 0 ];  
				var cameraViewOriginP = p.clone();
				cameraViewOriginP.applyMatrix4( camera.matrixWorldInverse ); 
				
				var viewedP = SELECTEDOBJ.point.clone();  
				var viewedQ = viewedP.clone().applyProjection( CamCalibrationMtx );  
				//viewedP.applyProjection( CamCalibrationMtx );
				//var originP = new THREE.Vector3(sol.P[ii][0], sol.P[ii][1], sol.P[ii][2]);   
				//originP.applyProjection( CamCalibrationMtx );
				//var diff = viewedP.z - originP.z; // if it is positive, originP is blocked by others. 
				if(viewedQ.x>1 || viewedQ.x < -1 || viewedQ.y>1 || viewedQ.y < -1) { // out of view frustum 
					/*var diff = p.clone().sub(cameraPosi).lengthSq();
					diffs.push(diff); //1); // 1 is the maximum difference value. 
					*/
					var blocked_z = Math.max(0, Math.abs(cameraViewOriginP.z)); 
					diffs.push(blocked_z);
				} else {
					/*var diff = viewedP.sub(p).lengthSq();
					diffs.push(diff); // Math.min(1, diff)); */
					var cameraViewP = viewedP.clone();
					cameraViewP.applyMatrix4( camera.matrixWorldInverse ); 
					var blocked_z = Math.max(0, cameraViewP.z - cameraViewOriginP.z); 
					diffs.push(blocked_z);
				}
			}
			else {
				/*var diff = p.clone().sub(cameraPosi).lengthSq;
				diffs.push(diff); //1); // 1 is the maximum difference value. */
				var blocked_z = Math.abs(cameraViewOriginP.z); 
				diffs.push(blocked_z);
			}
				
		}
		catch(error) {
			console.log(error);
			/*var diff = p.clone().sub(cameraPosi).lengthSq;
			diffs.push(diff); //1); // 1 is the maximum difference value. */
			var blocked_z = Math.abs(cameraViewOriginP.z); 
			diffs.push(blocked_z);
		} 
	} 
	if(diffs.length==0)
		return Number.POSITIVE_INFINITY
	else {
		var distance_statistics = getAverageAndStd(diffs);
		return distance_statistics.average + distance_statistics.std;// + distance_statistics.average * distance_statistics.std;
	} 
}

function setCameraRRT_K(camera, RRT_K, three) {
    /*
    var cam = camera[0];  
    var Camera_from_World = cam.matrixWorldInverse; // .getInverse( World_from_Camera ); // RT   
    dbgr.log("CfW="); loge4x4(Camera_from_World.elements);
    */
    var Mrrt = RRT_K.RRT;
    dbgr.log("RRT*="); loge4x4(Mrrt); 
    var K = RRT_K.K;
    dbgr.log("K*="); log_rs(K); 
    //var Kratio = K[0][0]/K[1][1];
    //dbgr.log("K*ratio = "+Kratio + ", 1/K*ratio = " + 1/Kratio + ", wwidth/wheight="+ww/wh); 
    var RRT = getThreeMatrix4(three, Mrrt);
    
    camera.matrixWorld.getInverse( RRT ); // world from the camera is the inverse of camera from the world. 
    
    var wfc = camera.matrixWorld.elements;
    camera.position.set(wfc[12],wfc[13],wfc[14]); // Q: is the position from world or parent?  
    camera.matrixAutoUpdate = false;
    camera.rotationAutoUpdate = false;
    //console.log("One RRT");
} 

function getThreeMatrix4FromRowFirstArray(three, Mrrt) {
	return new three.Matrix4(Mrrt[0],Mrrt[1],Mrrt[2],Mrrt[3],
                                Mrrt[4],Mrrt[5],Mrrt[6],Mrrt[7],
                                Mrrt[8],Mrrt[9],Mrrt[10],Mrrt[11],
                                Mrrt[12],Mrrt[13],Mrrt[14],Mrrt[15]);
}

function getThreeMatrix4(three, Mrrt) {
	return getThreeMatrix4FromRowFirstArray(three, Mrrt);
}

function getRowArrayFromThreeMatrix4(m) {
	var e = m.elements;
	return [e[0],e[4],e[8],e[12],  e[1],e[5],e[9],e[13], e[2],e[6], e[10],e[14], e[3],e[7],e[11],e[15]];
}

function printSolutionInfo(sol, three) {
	var old_flag = dbgr.flag;
    dbgr.flag = true; // make logging out  

	var Mrrt = sol.RRT; 
    var RRT = getThreeMatrix4(three, Mrrt);
    
    var Rt = new three.Matrix4().getInverse( RRT ); // world from the camera is the inverse of camera from the world. 
	dbgr.log("R|t*="); loge4x4(Rt.elements); 
	var K = sol.K;
    dbgr.log("K*="); log_rs(K); 
	dbgr.log("|P|="+sol.P.length+", K_eval*="+sol.K_eval+", eval_2D*="+sol.eval_2D+", eval_3D*="+sol.eval_3D); 
	dbgr.flag = old_flag; // set it back. 
}

function getMatrixWorld(Mrrt, three){
	//var Kratio = K[0][0]/K[1][1];
    //dbgr.log("K*ratio = "+Kratio + ", 1/K*ratio = " + 1/Kratio + ", wwidth/wheight="+ww/wh); 
    var RRT = getThreeMatrix4(three, Mrrt);
    
    var MtxW = new three.Matrix4().getInverse( RRT ); // world from the camera is the inverse of camera from the world.  
	//dbgr.log("New*="); loge4x4(MtxW.elements); 
	return MtxW;
}
 
function setCameraPositionOrientation(camera, sol, three) {  
	printSolutionInfo(sol, three);
    var MtxW = getMatrixWorld(sol.RRT, three); 
    var wfc = MtxW.elements;
    camera.position.set(wfc[12],wfc[13],wfc[14]); // Q: is the position from world or parent?    
	camera.rotation.setEulerFromRotationMatrix(MtxW);
    //console.log("One RRT");
} 

/* make orthogonal and normal vectors of Arrt rotation matrix 
*/
function makeOrthogonalNormal(Arrt){
	var Mcol=[[Arrt[0],Arrt[4],Arrt[8]], [Arrt[1],Arrt[5],Arrt[9]], [Arrt[2],Arrt[6],Arrt[10]]];  
	dbgr.log("Mcol="); log_cs(Mcol);  

	//RQ decomposition(M), validity Q*Q^t=I is done inside.  
	var sol = getRQ(Mcol, true); //-- true: Z = X x Y| Y = Z x X | X = Y x Z
	var K = sol["R"]; // K: row vector of scales 
	dbgr.log("K="); log_rs(K);
	var R = sol["Q"]; // R: rotation matrix (row vector matrix)
	dbgr.log("R="); log_rs(R);
	var KR = numeric.dot(K,R); 
	var M = numeric.transpose(Mcol); 

	for(var i=0; i<M.length; i++) {
		if(isEqualVector(M[i], KR[i]) == false )
			throw "M[i] != KR[i]!";
	}
	for(var i=0; i<R.length; i++) {
		for(var j=0; j<R[i].length; j++) {
			Arrt[4*i+j]=R[i][j];
		}
	}
}

/* take average currentIndex+howMany from Solutions
*/
function takeAverageSolutions(Solutions, currentIndex, howMany) {
	var Arrt=[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var N = Math.min(Solutions.length, howMany);
	for(var ii=0; ii<N; ii++) { 
		var index = currentIndex + ii;
		if(index>=Solutions.length)
			index = index - Solutions.length; 
		var sol = Solutions[index]; 
		//printSolutionInfo(sol, this.THREE);
		var Mrrt = sol.RRT;
		for(var k=0; k<Mrrt.length; k++)
			Arrt[k] += Mrrt[k];
	}
	for(var k=0; k<Arrt.length; k++)  // take the average 
		Arrt[k] = Arrt[k]/N;
	
	makeOrthogonalNormal(Arrt);
	return Arrt;
}

//---- sum of P[k][pi]Q[k][qi] * P[k][pj]Q[k][qj]  for k=0,...,P.length-1, pi,pj \in{0,1,2,3}, qi,qj \in {0,1,2}
function SoM(P,Q,pi,qi,pj,qj) {
    var sum_of_multication = 0;
    for(var k=0; k<P.length; k++) {
        sum_of_multication += P[k][pi]*Q[k][qi]*P[k][pj]*Q[k][qj];
    }
    return sum_of_multication;
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// +                                                                                                                          +
// | \S x_k*v_k*[1]  \S y_k*v_k*[1]  \S z_k*v_k*[1]  \S v_k*[1] -\S x_k*u_k[1]  -\S y_k*u_k*[1]  -\S z_k*u_k*[1]  -\S u_k*[1] | 
// | \S x_k*v_k*[2]  \S y_k*v_k*[2]  \S z_k*v_k*[2]  \S v_k*[2] -\S x_k*u_k[2]  -\S y_k*u_k*[2]  -\S z_k*u_k*[2]  -\S u_k*[2] | 
// | \S x_k*v_k*[3]  \S y_k*v_k*[3]  \S z_k*v_k*[3]  \S v_k*[3] -\S x_k*u_k[3]  -\S y_k*u_k*[3]  -\S z_k*u_k*[3]  -\S u_k*[3] | 
// | \S x_k*v_k*[4]  \S y_k*v_k*[4]  \S z_k*v_k*[4]  \S v_k*[4] -\S x_k*u_k[4]  -\S y_k*u_k*[4]  -\S z_k*u_k*[4]  -\S u_k*[4] | 

// | \S x_k*v_k*[5]  \S y_k*v_k*[5]  \S z_k*v_k*[5]  \S v_k*[5] -\S x_k*u_k[5]  -\S y_k*u_k*[5]  -\S z_k*u_k*[5]  -\S u_k*[5] | 
// | \S x_k*v_k*[6]  \S y_k*v_k*[6]  \S z_k*v_k*[6]  \S v_k*[6] -\S x_k*u_k[6]  -\S y_k*u_k*[6]  -\S z_k*u_k*[6]  -\S u_k*[6] | 
// | \S x_k*v_k*[7]  \S y_k*v_k*[7]  \S z_k*v_k*[7]  \S v_k*[7] -\S x_k*u_k[7]  -\S y_k*u_k*[7]  -\S z_k*u_k*[7]  -\S u_k*[7] | 
// | \S x_k*v_k*[8]  \S y_k*v_k*[8]  \S z_k*v_k*[8]  \S v_k*[8] -\S x_k*u_k[8]  -\S y_k*u_k*[8]  -\S z_k*u_k*[8]  -\S u_k*[8] | 
// +                                                                                                                          +
// where
// [1]=x_k*v_k, [2]=y_k*v_k, [3]=z_k*v_k, [4]=v_k, [5]=x_k*u_k, [6]=y_k*u_k, [7]=z_k*u_k, [8]=u_k, 
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getMatrixForSolving_r1_r2(P,Q) {
    var x=0,y=1,z=2, u=0, v=1;
    var A=[[SoM(P,Q,x,v,x,v), SoM(P,Q,y,v,x,v), SoM(P,Q,z,v,x,v), SoM(P,Q,3,v,x,v),
           -SoM(P,Q,x,u,x,v),-SoM(P,Q,y,u,x,v),-SoM(P,Q,z,u,x,v),-SoM(P,Q,3,u,x,v)], 
           [SoM(P,Q,x,v,y,v), SoM(P,Q,y,v,y,v), SoM(P,Q,z,v,y,v), SoM(P,Q,3,v,y,v),
           -SoM(P,Q,x,u,y,v),-SoM(P,Q,y,u,y,v),-SoM(P,Q,z,u,y,v),-SoM(P,Q,3,u,y,v)],  
           [SoM(P,Q,x,v,z,v), SoM(P,Q,y,v,z,v), SoM(P,Q,z,v,z,v), SoM(P,Q,3,v,z,v),
           -SoM(P,Q,x,u,z,v),-SoM(P,Q,y,u,z,v),-SoM(P,Q,z,u,z,v),-SoM(P,Q,3,u,z,v)],   
           [SoM(P,Q,x,v,3,v), SoM(P,Q,y,v,3,v), SoM(P,Q,z,v,3,v), SoM(P,Q,3,v,3,v),
           -SoM(P,Q,x,u,3,v),-SoM(P,Q,y,u,3,v),-SoM(P,Q,z,u,3,v),-SoM(P,Q,3,u,3,v)],
           
           [SoM(P,Q,x,v,x,u), SoM(P,Q,y,v,x,u), SoM(P,Q,z,v,x,u), SoM(P,Q,3,v,x,u),
           -SoM(P,Q,x,u,x,u),-SoM(P,Q,y,u,x,u),-SoM(P,Q,z,u,x,u),-SoM(P,Q,3,u,x,u)], 
           [SoM(P,Q,x,v,y,u), SoM(P,Q,y,v,y,u), SoM(P,Q,z,v,y,u), SoM(P,Q,3,v,y,u),
           -SoM(P,Q,x,u,y,u),-SoM(P,Q,y,u,y,u),-SoM(P,Q,z,u,y,u),-SoM(P,Q,3,u,y,u)],  
           [SoM(P,Q,x,v,z,u), SoM(P,Q,y,v,z,u), SoM(P,Q,z,v,z,u), SoM(P,Q,3,v,z,u),
           -SoM(P,Q,x,u,z,u),-SoM(P,Q,y,u,z,u),-SoM(P,Q,z,u,z,u),-SoM(P,Q,3,u,z,u)],   
           [SoM(P,Q,x,v,3,u), SoM(P,Q,y,v,3,u), SoM(P,Q,z,v,3,u), SoM(P,Q,3,v,3,u),
           -SoM(P,Q,x,u,3,u),-SoM(P,Q,y,u,3,u),-SoM(P,Q,z,u,3,u),-SoM(P,Q,3,u,3,u)]];
    return A;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
// +                                                                                                           +
// | \S x_k*[1]  \S y_k*[1]  \S z_k*[1]  \S [1]  -\S x_k*u_k[1]  -\S y_k*u_k*[1]  -\S z_k*u_k*[1]  -\S u_k*[1] |  
// | \S x_k*[2]  \S y_k*[2]  \S z_k*[2]  \S [2]  -\S x_k*u_k[2]  -\S y_k*u_k*[2]  -\S z_k*u_k*[2]  -\S u_k*[2] |  
// | \S x_k*[3]  \S y_k*[3]  \S z_k*[3]  \S [3]  -\S x_k*u_k[3]  -\S y_k*u_k*[3]  -\S z_k*u_k*[3]  -\S u_k*[3] | 
// | \S x_k*[4]  \S y_k*[4]  \S z_k*[4]  \S [4]  -\S x_k*u_k[4]  -\S y_k*u_k*[4]  -\S z_k*u_k*[4]  -\S u_k*[4] | 

// | \S x_k*[5]  \S y_k*[5]  \S z_k*[5]  \S [5]  -\S x_k*u_k[5]  -\S y_k*u_k*[5]  -\S z_k*u_k*[5]  -\S u_k*[5] | 
// | \S x_k*[6]  \S y_k*[6]  \S z_k*[6]  \S [6]  -\S x_k*u_k[6]  -\S y_k*u_k*[6]  -\S z_k*u_k*[6]  -\S u_k*[6] | 
// | \S x_k*[7]  \S y_k*[7]  \S z_k*[7]  \S [7]  -\S x_k*u_k[7]  -\S y_k*u_k*[7]  -\S z_k*u_k*[7]  -\S u_k*[7] | 
// | \S x_k*[8]  \S y_k*[8]  \S z_k*[8]  \S [8]  -\S x_k*u_k[8]  -\S y_k*u_k*[8]  -\S z_k*u_k*[8]  -\S u_k*[8] |  
// +                                                                                                           +
// where
// [1]=x_k, [2]=y_k*, [3]=z_k, [4]=1, [5]=x_k*u_k, [6]=y_k*u_k, [7]=z_k*u_k, [8]=u_k, 
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getMatrixForSolving_r1_r3(P,Q) {
    var x=0,y=1,z=2,a=3, u=0, w=2;
    var A=[[SoM(P,Q,x,w,x,w), SoM(P,Q,y,w,x,w), SoM(P,Q,z,w,x,w), SoM(P,Q,a,w,x,w),
           -SoM(P,Q,x,u,x,w),-SoM(P,Q,y,u,x,w),-SoM(P,Q,z,u,x,w),-SoM(P,Q,a,u,x,w)], 
           [SoM(P,Q,x,w,y,w), SoM(P,Q,y,w,y,w), SoM(P,Q,z,w,y,w), SoM(P,Q,a,w,y,w),
           -SoM(P,Q,x,u,y,w),-SoM(P,Q,y,u,y,w),-SoM(P,Q,z,u,y,w),-SoM(P,Q,a,u,y,w)], 
           [SoM(P,Q,x,w,z,w), SoM(P,Q,y,w,z,w), SoM(P,Q,z,w,z,w), SoM(P,Q,a,w,z,w),
           -SoM(P,Q,x,u,z,w),-SoM(P,Q,y,u,z,w),-SoM(P,Q,z,u,z,w),-SoM(P,Q,a,u,z,w)],  
           [SoM(P,Q,x,w,a,w), SoM(P,Q,y,w,a,w), SoM(P,Q,z,w,a,w), SoM(P,Q,a,w,a,w),
           -SoM(P,Q,x,u,a,w),-SoM(P,Q,y,u,a,w),-SoM(P,Q,z,u,a,w),-SoM(P,Q,a,u,a,w)],  
           
           [SoM(P,Q,x,w,x,u), SoM(P,Q,y,w,x,u), SoM(P,Q,z,w,x,u), SoM(P,Q,a,w,x,u),
           -SoM(P,Q,x,u,x,u),-SoM(P,Q,y,u,x,u),-SoM(P,Q,z,u,x,u),-SoM(P,Q,a,u,x,u)], 
           [SoM(P,Q,x,w,y,u), SoM(P,Q,y,w,y,u), SoM(P,Q,z,w,y,u), SoM(P,Q,a,w,y,u),
           -SoM(P,Q,x,u,y,u),-SoM(P,Q,y,u,y,u),-SoM(P,Q,z,u,y,u),-SoM(P,Q,a,u,y,u)], 
           [SoM(P,Q,x,w,z,u), SoM(P,Q,y,w,z,u), SoM(P,Q,z,w,z,u), SoM(P,Q,a,w,z,u),
           -SoM(P,Q,x,u,z,u),-SoM(P,Q,y,u,z,u),-SoM(P,Q,z,u,z,u),-SoM(P,Q,a,u,z,u)],  
           [SoM(P,Q,x,w,a,u), SoM(P,Q,y,w,a,u), SoM(P,Q,z,w,a,u), SoM(P,Q,a,w,a,u),
           -SoM(P,Q,x,u,a,u),-SoM(P,Q,y,u,a,u),-SoM(P,Q,z,u,a,u),-SoM(P,Q,a,u,a,u)]];
    return A;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
// +                                                                                                           +
// | \S x_k*[1]  \S y_k*[1]  \S z_k*[1]  \S [1]  -\S x_k*v_k[1]  -\S y_k*v_k*[1]  -\S z_k*v_k*[1]  -\S v_k*[1] |  
// | \S x_k*[2]  \S y_k*[2]  \S z_k*[2]  \S [2]  -\S x_k*v_k[2]  -\S y_k*v_k*[2]  -\S z_k*v_k*[2]  -\S v_k*[2] |  
// | \S x_k*[3]  \S y_k*[3]  \S z_k*[3]  \S [3]  -\S x_k*v_k[3]  -\S y_k*v_k*[3]  -\S z_k*v_k*[3]  -\S v_k*[3] | 
// | \S x_k*[4]  \S y_k*[4]  \S z_k*[4]  \S [4]  -\S x_k*v_k[4]  -\S y_k*v_k*[4]  -\S z_k*v_k*[4]  -\S v_k*[4] | 

// | \S x_k*[5]  \S y_k*[5]  \S z_k*[5]  \S [5]  -\S x_k*v_k[5]  -\S y_k*v_k*[5]  -\S z_k*v_k*[5]  -\S v_k*[5] | 
// | \S x_k*[6]  \S y_k*[6]  \S z_k*[6]  \S [6]  -\S x_k*v_k[6]  -\S y_k*v_k*[6]  -\S z_k*v_k*[6]  -\S v_k*[6] | 
// | \S x_k*[7]  \S y_k*[7]  \S z_k*[7]  \S [7]  -\S x_k*v_k[7]  -\S y_k*v_k*[7]  -\S z_k*v_k*[7]  -\S v_k*[7] | 
// | \S x_k*[8]  \S y_k*[8]  \S z_k*[8]  \S [8]  -\S x_k*v_k[8]  -\S y_k*v_k*[8]  -\S z_k*v_k*[8]  -\S v_k*[8] |  
// +                                                                                                           +
// where
// [1]=x_k, [2]=y_k*, [3]=z_k, [4]=1, [5]=x_k*v_k, [6]=y_k*v_k, [7]=z_k*v_k, [8]=v_k, 
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getMatrixForSolving_r2_r3(P,Q) {
    var x=0,y=1,z=2,a=3, v=1, w=2;
    var A=[[SoM(P,Q,x,w,x,w), SoM(P,Q,y,w,x,w), SoM(P,Q,z,w,x,w), SoM(P,Q,a,w,x,w),
           -SoM(P,Q,x,v,x,w),-SoM(P,Q,y,v,x,w),-SoM(P,Q,z,v,x,w),-SoM(P,Q,a,v,x,w)], 
           [SoM(P,Q,x,w,y,w), SoM(P,Q,y,w,y,w), SoM(P,Q,z,w,y,w), SoM(P,Q,a,w,y,w),
           -SoM(P,Q,x,v,y,w),-SoM(P,Q,y,v,y,w),-SoM(P,Q,z,v,y,w),-SoM(P,Q,a,v,y,w)], 
           [SoM(P,Q,x,w,z,w), SoM(P,Q,y,w,z,w), SoM(P,Q,z,w,z,w), SoM(P,Q,a,w,z,w),
           -SoM(P,Q,x,v,z,w),-SoM(P,Q,y,v,z,w),-SoM(P,Q,z,v,z,w),-SoM(P,Q,a,v,z,w)],
           [SoM(P,Q,x,w,a,w), SoM(P,Q,y,w,a,w), SoM(P,Q,z,w,a,w), SoM(P,Q,a,w,a,w),
           -SoM(P,Q,x,v,a,w),-SoM(P,Q,y,v,a,w),-SoM(P,Q,z,v,a,w),-SoM(P,Q,a,v,a,w)],  
           
           [SoM(P,Q,x,w,x,v), SoM(P,Q,y,w,x,v), SoM(P,Q,z,w,x,v), SoM(P,Q,a,w,x,v),
           -SoM(P,Q,x,v,x,v),-SoM(P,Q,y,v,x,v),-SoM(P,Q,z,v,x,v),-SoM(P,Q,a,v,x,v)], 
           [SoM(P,Q,x,w,y,v), SoM(P,Q,y,w,y,v), SoM(P,Q,z,w,y,v), SoM(P,Q,a,w,y,v),
           -SoM(P,Q,x,v,y,v),-SoM(P,Q,y,v,y,v),-SoM(P,Q,z,v,y,v),-SoM(P,Q,a,v,y,v)], 
           [SoM(P,Q,x,w,z,v), SoM(P,Q,y,w,z,v), SoM(P,Q,z,w,z,v), SoM(P,Q,a,w,z,v),
           -SoM(P,Q,x,v,z,v),-SoM(P,Q,y,v,z,v),-SoM(P,Q,z,v,z,v),-SoM(P,Q,a,v,z,v)],  
           [SoM(P,Q,x,w,a,v), SoM(P,Q,y,w,a,v), SoM(P,Q,z,w,a,v), SoM(P,Q,a,w,a,v),
           -SoM(P,Q,x,v,a,v),-SoM(P,Q,y,v,a,v),-SoM(P,Q,z,v,a,v),-SoM(P,Q,a,v,a,v)]];
    return A;
}
 
//---- sum of (c[0]*P[k][x]+c[1]*P[k][y]+c[2]*P[k][z]+c[3]*P[k][3]) * P[k][pj]Q[k][qj]  for k=0,...,P.length-1, pi,pj \in{0,1,2,3}, qi,qj \in {0,1,2}
function SoK(P, Q, c, qi, pj, qj) {
    var sum_of_multication = 0;
    var x=0, y=1, z=2;
    for(var k=0; k<P.length; k++) { 
        var K=c[0]*P[k][x]*Q[k][qi] + c[1]*P[k][y]*Q[k][qi] + c[2]*P[k][z]*Q[k][qi] + c[3]*P[k][3]*Q[k][qi];
        sum_of_multication += K*P[k][pj]*Q[k][qj];
    }
    return sum_of_multication;
}

function get_r3_from_r1_r2(P, Q, r1, r2) {
    var x=0,y=1,z=2, u=0, v=1, w=2;
    var A=[ [SoM(P,Q,x,u,x,u), SoM(P,Q,y,u,x,u), SoM(P,Q,z,u,x,u), SoM(P,Q,3,u,x,u)], 
            [SoM(P,Q,x,u,y,u), SoM(P,Q,y,u,y,u), SoM(P,Q,z,u,y,u), SoM(P,Q,3,u,y,u)], 
            [SoM(P,Q,x,u,z,u), SoM(P,Q,y,u,z,u), SoM(P,Q,z,u,z,u), SoM(P,Q,3,u,z,u)], 
            [SoM(P,Q,x,u,3,u), SoM(P,Q,y,u,3,u), SoM(P,Q,z,u,3,u), SoM(P,Q,3,u,3,u)]];
    var b=[SoK(P,Q,r1,w,x,u), SoK(P,Q,r1,w,y,u), SoK(P,Q,r1,w,z,u), SoK(P,Q,r1,w,3,u)];  
    var r31 = numeric.solve(A, b); 
    var norm31 = numeric.norm2(r31);
    
    var A=[ [SoM(P,Q,x,v,x,v), SoM(P,Q,y,v,x,v), SoM(P,Q,z,v,x,v), SoM(P,Q,3,v,x,v)], 
            [SoM(P,Q,x,v,y,v), SoM(P,Q,y,v,y,v), SoM(P,Q,z,v,y,v), SoM(P,Q,3,v,y,v)], 
            [SoM(P,Q,x,v,z,v), SoM(P,Q,y,v,z,v), SoM(P,Q,z,v,z,v), SoM(P,Q,3,v,z,v)], 
            [SoM(P,Q,x,v,3,v), SoM(P,Q,y,v,3,v), SoM(P,Q,z,v,3,v), SoM(P,Q,3,v,3,v)]];
    var b=[SoK(P,Q,r2,w,x,v), SoK(P,Q,r2,w,y,v), SoK(P,Q,r2,w,z,v), SoK(P,Q,r2,w,3,v)];  
    var r32 = numeric.solve(A, b);
    var norm32 = numeric.norm2(r32);
    if(norm31>norm32)
        return r31;
    else
        return r32; 
}

function getLeastSquare_r2_from_r3(P, Q, r3) {
    var x=0,y=1,z=2, v=1, w=2;
    var A=[ [SoM(P,Q,x,w,x,w), SoM(P,Q,y,w,x,w), SoM(P,Q,z,w,x,w), SoM(P,Q,3,w,x,w)], 
            [SoM(P,Q,x,w,y,w), SoM(P,Q,y,w,y,w), SoM(P,Q,z,w,y,w), SoM(P,Q,3,w,y,w)], 
            [SoM(P,Q,x,w,z,w), SoM(P,Q,y,w,z,w), SoM(P,Q,z,w,z,w), SoM(P,Q,3,w,z,w)], 
            [SoM(P,Q,x,w,3,w), SoM(P,Q,y,w,3,w), SoM(P,Q,z,w,3,w), SoM(P,Q,3,w,3,w)]];
    var b=[SoK(P,Q,r3,v,x,w), SoK(P,Q,r3,v,y,w), SoK(P,Q,r3,v,z,w), SoK(P,Q,r3,v,3,w)];  
    var r2 = numeric.solve(A, b);  
    return r2; 
}

function getLeastSquare_r1_from_r3(P, Q, r3) {
    var x=0,y=1,z=2, u=0, w=2;
    var A=[ [SoM(P,Q,x,w,x,w), SoM(P,Q,y,w,x,w), SoM(P,Q,z,w,x,w), SoM(P,Q,3,w,x,w)], 
            [SoM(P,Q,x,w,y,w), SoM(P,Q,y,w,y,w), SoM(P,Q,z,w,y,w), SoM(P,Q,3,w,y,w)], 
            [SoM(P,Q,x,w,z,w), SoM(P,Q,y,w,z,w), SoM(P,Q,z,w,z,w), SoM(P,Q,3,w,z,w)], 
            [SoM(P,Q,x,w,3,w), SoM(P,Q,y,w,3,w), SoM(P,Q,z,w,3,w), SoM(P,Q,3,w,3,w)]];
    var b=[SoK(P,Q,r3,u,x,w), SoK(P,Q,r3,u,y,w), SoK(P,Q,r3,u,z,w), SoK(P,Q,r3,u,3,w)];  
    var r1 = numeric.solve(A, b);  
    return r1; 
}

/**
  set the evaluation values: K_eval, dist, and eval.
*/
function set_evals(RRT_K, P, Q, C) { 
    var K_eval = evaluate_K(RRT_K.K); //, wwidth, wheight);  
    var distance_statistics = getDistanceStatistics(P, Q, C);
    RRT_K["K_eval"] = K_eval;
    RRT_K["dist"] = distance_statistics;
    var dist_average_sqr = distance_statistics.average + distance_statistics.std + distance_statistics.average * distance_statistics.std ; 
	RRT_K["eval_2D"] = dist_average_sqr;
	
    try {
        RRT_K["eval"] = K_eval / dist_average_sqr;
    }
    catch(error) {
        if(K_eval < 0)
            RRT_K["eval"] = Number.NEGATIVE_INFINITY;
        else 
            RRT_K["eval"] = Number.POSITIVE_INFINITY;
    }  
}

/**
  Ori: 16x1 rotation matrix. It can be null if not available. 
*/
function get_C_RRT_K_eval(r1, r2, r3, P, Q, Ori) {
    var C = [r1, r2, r3];
    var RRT_K = null;
    try{
        RRT_K = get_RRT_K(C, 0, Q, P, false, Ori);
        if(RRT_K != null) {
            //dbgr.log("sols[k="+k+",ii="+ii+"]=");
            loge4x4(RRT_K.RRT);  
            RRT_K["C"]=C; // add C too 
            set_evals(RRT_K, P, Q, C);
            put_P_QtoSol(P, Q, RRT_K); // added by qif, 6/5/2015  
        }
    }
    catch(err) {
        throw err;
    }
    return RRT_K;
}
function put_P_QtoSol(P,Q, sol){
	var Pcopy = []; for(var i=0; i<P.length; i++) Pcopy.push(P[i]);
	var Qcopy = []; for(var i=0; i<Q.length; i++) Qcopy.push(Q[i]);
	sol["P"]=Pcopy;
	sol["Q"]=Qcopy;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// P: an array of 3D points [(x_k, y_k, z_k, 1)]
// Q: an array of 2D window points [(u_k, v_k, 1)]
// Ori: 16x1 rotation matrix. it can be null if not available. 
// The goal of this function is to find 3x4 matrix C such that 
//    minimize \Sigma_{i} (C*P[i] - Q[i])^2
function getLeastSquareSolutions(P, Q, Ori){ // true means sequencing
    var RRT_Ks = [];  
	
    // step 1. fill the matrix with Pt, Wt
    var B = getMatrixForSolving_r1_r2(P,Q); 
    var S=[];  
    var V = null;
    try {
        var svd = numeric.svd(B);  
        S = svd["S"];
        dbgr.log("S="+S);
        V = svd["V"]; 
    }
    catch(Err) {
        console.log("solving svd is failed for r1_r2"); 
    }	
    
    var C_RRT_K = null;
    try{   
		for(var ii=S.length-1; ii>=0; ii--) {
			if(Math.abs(S[ii])>0.001 && ii < S.length-1)
				continue;
			var sol = getColumn(V, ii);    
			var r1 =[sol[0],sol[1],sol[2],sol[3]];
			var r2 =[sol[4],sol[5],sol[6],sol[7]];  
			var r3 = get_r3_from_r1_r2(P, Q, r1, r2);
			C_RRT_K = get_C_RRT_K_eval(r1, r2, r3, P, Q, Ori); 
			if(C_RRT_K != null) { 
				if(C_RRT_K.K[2][2]<0) {
					C_RRT_K["source"]="r1r2_r3";
					RRT_Ks.push(C_RRT_K);
				}else {
					r1 = numeric.mul(-1, r1);
					r2 = numeric.mul(-1, r2);  
					r3 = get_r3_from_r1_r2(P, Q, r1, r2);
					C_RRT_K = get_C_RRT_K_eval(r1, r2, r3, P, Q, Ori); 
					if(C_RRT_K != null) {
						C_RRT_K["source"]="r1r2_r3";
						RRT_Ks.push(C_RRT_K);
					}
				}
			}
		}   
    }// try           
    catch(err) { 
       // console.log(err+"! catch error in get_RRT_Ks for r1_r2=>r3."); 
    }
	
    //-- r1_r3=>r2  
    //if(C_RRT_K == null) 
	{ // if above case did not make a solution yet. 
        B = getMatrixForSolving_r1_r3(P,Q); 
        S=[];  
        V = null;
        try {
            var svd = numeric.svd(B);  
            S = svd["S"];
            dbgr.log("S="+S);
            V = svd["V"]; 
        }
        catch(Err) {
            console.log("solving svd is failed for r1_r3"); 
        }	
         
        try{  
			for(var ii=S.length-1; ii>=0; ii--) {
				if(Math.abs(S[ii])>0.001 && ii < S.length-1)
					continue;
				var sol = getColumn(V, ii);       
                var r1 =[sol[0],sol[1],sol[2],sol[3]];
                var r3 =[sol[4],sol[5],sol[6],sol[7]];  
                var r2 = getLeastSquare_r2_from_r3(P, Q, r3);
                C_RRT_K = get_C_RRT_K_eval(r1, r2, r3, P, Q, Ori); 
                if(C_RRT_K != null) { 
					if(C_RRT_K.K[2][2]<0) {
						C_RRT_K["source"]="r1r3_r2"; 
						RRT_Ks.push(C_RRT_K);  
					} else {
						r1 = numeric.mul(-1, r1);
						r3 = numeric.mul(-1, r3);
						r2 = getLeastSquare_r2_from_r3(P, Q, r3);
						C_RRT_K = get_C_RRT_K_eval(r1, r2, r3, P, Q, Ori); 
						if(C_RRT_K != null){
							C_RRT_K["source"]="r1r3_r2"; 
							RRT_Ks.push(C_RRT_K);  
						}
					}
				}
            }    
        }// try           
        catch(err) { 
            //console.log(err+"! catch error in get_RRT_Ks for r1_r3=>r2."); 
        } 
    }
	
     //-- r2_r3=>r1  
    //if(C_RRT_K == null) 
	{ // if above case did not make a solution yet. 
        B = getMatrixForSolving_r2_r3(P,Q); 
        S=[];  
        V = null;
        try {
            var svd = numeric.svd(B);  
            S = svd["S"];
            dbgr.log("S="+S);
            V = svd["V"]; 
        }
        catch(Err) {
            console.log("solving svd is failed for r2_r3"); 
        }	
         
        try{  
			for(var ii=S.length-1; ii>=0; ii--) {
				if(Math.abs(S[ii])>0.001 && ii < S.length-1)
					continue;
				var sol = getColumn(V, ii);   
                var r2 =[sol[0],sol[1],sol[2],sol[3]];
                var r3 =[sol[4],sol[5],sol[6],sol[7]];  
                var r1 = getLeastSquare_r1_from_r3(P, Q, r3);
                C_RRT_K = get_C_RRT_K_eval(r1, r2, r3, P, Q, Ori); 
                if(C_RRT_K != null) { 
					if(C_RRT_K.K[2][2]<0) {
						C_RRT_K["source"]="r2r3_r1"; 
						RRT_Ks.push(C_RRT_K);  
					} else {
						r2 = numeric.mul(-1, r2);
						r3 = numeric.mul(-1, r3); 
						r1 = getLeastSquare_r1_from_r3(P, Q, r3);
						C_RRT_K = get_C_RRT_K_eval(r1, r2, r3, P, Q, Ori); 
						if(C_RRT_K != null) {
							C_RRT_K["source"]="r2r3_r1"; 
							RRT_Ks.push(C_RRT_K);  
						}
					}
				}
            }   
        }// try           
        catch(err) { 
            //console.log(err+"! catch error in get_RRT_Ks for r2_r3=>r1."); 
        } 
    }
	
    return RRT_Ks; 
}


function searchBestAprxSolutionOld(GoodMatchPoints) {
	var done = false;
	var max_loop = 100; //500;
	var best_eval = Number.MAX_VALUE; 
	var best_sol= null; // 
	// main loop until max_loop
	for(var trial = 0; trial < max_loop; trial++) {
        console.log("trial="+trial); 
        var Random8Points = getRandomlySelected8Points(GoodMatchPoints); 
        if(Random8Points.length != 8)  
            console.log(" |Random8Points| < 8 but " + Random8Points.length);  
        var P = []; var Q = []; 
        for(var i=0; i<Random8Points.length; i++) { 
            var p = Random8Points[i].P; var q = Random8Points[i].Q; 
            P.push([p.x, p.y, p.z, 1]);Q.push([q.u, q.v, 1]); 
        } 
        try  {
            //var Wt = []; var Pt = [];
            //var C_RRT_K_evals = getSolutions(Wt, Pt); 
            
            var C_RRT_K_evals = getLeastSquareSolutions(P, Q); // true means sequencing,
            
            for(var i=0; i< C_RRT_K_evals.length; i++) {
                var sol = C_RRT_K_evals[i];
                if(sol.eval < best_eval) {
                    best_eval = sol.eval;
                    best_sol = sol; 
                    
                    if(best_sol<0.001)
                        break;
                }
            } // for 
        }// try
        catch(Error) {
            console.log(Error+". searchBestAprxSolutionOld.");
        } // catch  
	} // iteration is done.  
	return best_sol;
}


function getRandomlySelectedNPoints(GoodMatchArrayPointPairs, NoSP) { // do not check coplanarity 
	var notSelectedIndices = []; 
	var selectedPoints = [];
    var NoOfPoints = Math.min(GoodMatchArrayPointPairs.length, NoSP); 
    for(var i=0; i<GoodMatchArrayPointPairs.length; i++) 
		notSelectedIndices.push(i); 
    while( selectedPoints.length < NoOfPoints ) {
        var RandomNonSelectedIndex = Math.round(getRandomArbitrary(0, notSelectedIndices.length-1));
        var ri = notSelectedIndices[RandomNonSelectedIndex];
        var selectedP = GoodMatchArrayPointPairs[ri]; 
        selectedPoints.push(selectedP);  
        notSelectedIndices.splice(RandomNonSelectedIndex,1);
    } 
	return selectedPoints;
} 
 

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function isLastStraight4Coplanar(LastPoints, NewPoint, last_index) {
	var P1 = NewPoint.P; 
	var P2 = LastPoints[last_index-0].P;
	var P3 = LastPoints[last_index-1].P;
	var P4 = LastPoints[last_index-2].P;
	var x1 = [P1.x, P1.y, P1.z];
	var x2 = [P2.x, P2.y, P2.z];
	var x3 = [P3.x, P3.y, P3.z];
	var x4 = [P4.x, P4.y, P4.z];
    var tol = 1;
	return isCoplanar(x1, x2, x3, x4, tol);
}

function getRandomlySelected8Points(CorPointPairs) {
	var selected_indices = [];
	var selected8Points = [];
	for(var iter = 0; iter < 1000 && selected_indices.length < 8; iter++ ) {
		var ri = Math.round(getRandomArbitrary(0, CorPointPairs.length-1));
		if(selected_indices.indexOf(ri) == -1) { // newly selected. 
			var candidateP = CorPointPairs[ri];
			var PassExam = true;
			if(selected8Points.length==3){
				if( iter < 1000 && isLastStraight4Coplanar(selected8Points, candidateP, selected8Points.length-1)) {
					PassExam = false;
				//break; 
				}
			}
			if(PassExam) {
				selected_indices.push(ri);
				selected8Points.push(candidateP);
			}
		}
	}
	return selected8Points;
} 

function validateRandomSelection(A, B){
	var AP =[]; for(var i=0; i<A.length; i++) AP.push(A[i][1]);
	var BP =[]; for(var i=0; i<B.length; i++) BP.push(B[i][1]);
	AP.sort(compare_two_vectors);
	BP.sort(compare_two_vectors);
	for(var i=0; i<AP.length; i++){
		if(compare_two_vectors(AP[i], BP[i]) != 0)
			console.log("validateRandomSelection failed");
	}
}
function areSameSolutions(solA, solB) {
	if(Math.abs(solA.eval - solB.eval) > 0.001)
		return false;
	
	return (compare_two_vectors(solA.C, solB.C) == 0); 
	/*
	if(solA.Q.length != solB.Q.length )
		return false;
	for(var i=0; i<solA.Q.length; i++) {
		var qA = solA.Q[i], qB = solB.Q[i];
		if( compare_two_vectors(qA, qB)  != 0) // different 
			return false;
	}
	return true; 
	*/ 
}

function AddIfUniqueSolutions(solA, UniqueSols) {
	if(UniqueSols) { 
		for(var i=0; i < UniqueSols.length; i++) {
			var solB = UniqueSols[i];
			if ( areSameSolutions(solA, solB))  
				return false;
		}
		UniqueSols.push(solA);
		return true;
	} 
	return false;
}

/**
 OriMtx: 16x1 transformation matrix containing orientation information 
*/
function getInitialFeasibleSolutions(GoodMatchArrayPointPairs, PickPointSize, HowManyIerations, UniqueSols, OriMtx) { 
	var sols= []; //  
    var found=0;
    for(var iter=0; found < HowManyIerations && iter< 100; iter++) { 
        try{
            var RandomNPoints = getRandomlySelectedNPoints(GoodMatchArrayPointPairs, PickPointSize); // GoodMatchArrayPointPairs;   
			//validateRandomSelection(RandomNPoints, GoodMatchArrayPointPairs);
            var P = []; var Q = []; 
            for(var i=0; i<RandomNPoints.length; i++) { 
				var q = RandomNPoints[i][0];  Q.push(q);
				var p = RandomNPoints[i][1];  P.push(p); 
            }
        
            var C_RRT_K_evals = getLeastSquareSolutions(P, Q, OriMtx); // true means sequencing,  
            for(var i=0;  C_RRT_K_evals != null && i<C_RRT_K_evals.length; i++) {
                var sol = C_RRT_K_evals[i];    
                sol["P"]=P; sol["Q"]=Q;
                if(UniqueSols) {
					if(AddIfUniqueSolutions(sol, UniqueSols)) {
						sols.push(sol); // = sol;  
						
						found ++; 
					}
				}else {
					sols.push(sol); // = sol;
					found ++; 
				}
            } // for  
			/* // repeatability test, given the same (P,Q) pairs, the solution is the same repeatability.
			var C_RRT_K_evals = getLeastSquareSolutions(P, Q); // true means sequencing, 
            for(var i=0;  C_RRT_K_evals != null && i<C_RRT_K_evals.length; i++) {
                var sol = C_RRT_K_evals[i];    
                sol["P"]=P; sol["Q"]=Q;
                if(UniqueSols) {
					if(AddIfUniqueSolutions(sol, UniqueSols)) {
						sols.push(sol); // = sol;  
						 found ++; 
					} 
				}else {
					sols.push(sol); // = sol;  
					 found ++; 
				} 
			}*/
        }
        catch(Err) {
            console.log(Err +" in getInitialFeasibleSolutions");
        }  
    } 
    return sols;
}
/* make array of (q,p) pairs 
*/
function getArrayOfPointPairs(GoodMatchPoints){
	var AP=[]
	for(var i=0; i<GoodMatchPoints.length; i++) { 
        var p = GoodMatchPoints[i].P; var q = GoodMatchPoints[i].Q;  
		//if(p.y<1000.0) //-- this filtering is for removing odd 3D projections found in Auburn Hills R&D office data. 
		{
			var pair=[[q.u, q.v, 1], [p.x, p.y, p.z, 1]]; 
			AP.push(pair);
		} 
    } 
	console.log("|Good Match Points|="+GoodMatchPoints.length + "|Accepted Points|="+AP.length);
	return AP;
}

function getAverageAndStd(Qcomp) {
	//-- step 1. compute average of distance[i];
	var average=0;
	for(var i=0; i < Qcomp.length; i++) {
		average += Qcomp[i] ; 
	}
	average = average / Qcomp.length;
	
	//-- step 2. compute standard deviation of distance[i];
	var sigma = 0;
	for(var i=0; i < Qcomp.length; i++) {
        sigma += Math.sqrt((average - Qcomp[i] ) * (average - Qcomp[i] ));
	}
    sigma = sigma / Qcomp.length;
    
    var distance_statistics ={average:average, std:sigma};   
	return distance_statistics;
}

function getDistanceAverageAndStd(Qcomp){ 
	var data=[]
	for(var i=0; i < Qcomp.length; i++) {
		data.push(Qcomp[i].dist); 
	}  
    var distance_statistics = getAverageAndStd(data); 
	distance_statistics["Qcomp"]=Qcomp;   
	return distance_statistics;
}

function getDistanceStatistics(P,Q,C) { // ,TabuList, tabusize) {
	var Qcomp=[];
	//-- step 1. compute distance(Q[i], C*P[i]) 
    for(var i=0; i<P.length; i++) {
		var qi=Q[i], pi=P[i]; 
		var dist = getError(C, pi, qi);
		var comp_dist = {p:pi, q:qi, dist:dist};  
		Qcomp.push(comp_dist); 
    }
	var distance_statistics =getDistanceAverageAndStd(Qcomp); // {average:average, std:sigma, Qcomp:Qcomp};   

    return distance_statistics; 
}
/*
*/
function compare_two_vectors(a, b) { 
	if(a.length < b.length)
		return -1;
	if(a.length > b.length)
		return  1;
	
	for(var i=0; i<a.length; i++) {
		if(a[i]-b[i] < -0.001) return -1;  
		else if(a[i]-b[i] > 0.001) return 1;
	} 
    return 0;
} 
             
function SearchBinary(key, orderedarray) {
    var imin = 0, imax  = orderedarray.length-1; 
    while(imax >= imin) {  // add '=' by qif, 6/3/2015
        var imid = Math.round((imax+imin)/2); 
        var a = orderedarray[imid];
        var comp_a_key = compare_two_vectors(a, key);
        if(comp_a_key == 0) //a == key
            return imid;
        else if(comp_a_key<0) // a < key: change min index to search upper sub-array  
            imin = imid +1; 
        else  // a > key: change max index to search lower sub-array
            imax = imid - 1;
    }
    return -1; // not found 
}
 
function insert_inliners(P, Q, C, GoodMatchArrayPointPairs, average, sigma, cutoff_magnitute) {
    //-- step 1. make two sorted lists for P and TabuList 
	var sortedP = P.slice(0).sort(compare_two_vectors); // copy & sort  
	
    //-- step 2. make Qcomp list of pi not in P nor TabuList  
    for(var i=0; i<GoodMatchArrayPointPairs.length; i++) {
		var qi=GoodMatchArrayPointPairs[i][0];
		var pi=GoodMatchArrayPointPairs[i][1];
		if( SearchBinary(pi, sortedP)==-1) { // pi is not in TabuList   
			var err = getError(C, pi, qi);  
			var threshold = cutoff_magnitute*sigma; 
			//var offset = Math.abs(err - average); // using this make no outliner but all inliner 
            if( err < threshold /*average*/ ) { // probably inliner  
                P.push(pi); // add pi to P
                Q.push(qi); // add qi to Q 
            }
		} 
    }
}
function getError(C, pi, qi) {
	var Cpi = numeric.dot(C, pi); // Cpi has non-one w_i 
    var nCpi = numeric.mul(1.0/Cpi[2], Cpi); // normalizing by w_i
	var d = distance(qi, nCpi); 
	return d;
}

function remove_outliners(P, Q, C/*, insertTabuList, removeTabuList*/, average, sigma, cutoff_magnitute) {  
    var removedPoints = [];
    for(var i=0; i<P.length; i++) {
		var pi=P[i]; 
        var qi=Q[i]; 
        var err = getError(C, pi, qi);  
		var threshold = cutoff_magnitute*sigma;
		//var offset = Math.abs(err - average); // using this make no outliner but all inliner 
        if( P.length > 6 && err > threshold  /*average*/) {  
            PQ={p:pi,q:qi, dist:err}
            P.splice(i, 1); // remove pi from P
            Q.splice(i, 1); // remove qi from Q  
            removedPoints.push(PQ); 
		}
    } 
    removedPoints.sort(function(a,b){return a.dist - b.dist;} ); // sorting by ascending order of distance 
    return removedPoints;
}

function update_P_Q(P, Q, C, GoodMatchArrayPointPairs, ii, cutoff_magnitute ){ 
	//-- step 1. reducing (considering worst distance comparing standard deviation) 
    var origin_distance_statistics = getDistanceStatistics(P,Q,C); // TabuList,TabuSize);
    var std  = origin_distance_statistics.std;
    var average = origin_distance_statistics.average; 
    console.log(ii+" |GoodMatchArrayPointPairs|=" + GoodMatchArrayPointPairs.length, ", dist_average="+average + ", std="+std); 
    console.log("Before insert_inliners: |P|=" + P.length);
	insert_inliners(P, Q, C, GoodMatchArrayPointPairs, average, std, cutoff_magnitute); 
    console.log("Before remove_outliners: |P|=" + P.length); 
    var removedPoints = remove_outliners(P, Q, C, average, std, cutoff_magnitute);
    console.log("After remove_outliners: |P|=" + P.length);
    //window.dbgr.log = function(str){}; 
    return removedPoints;
}

function getRemoveIndex(length) {  
	for(var i=0; i<length; i++) {
		var r = Math.random();
		if(r < 0.75) 
			return i; 
	}
	return length-1;
}

function popOne(removedPoints) {  
	//var PQremoved = removedPoints[0]; // removedPoints is sorted; 
	//removedPoints.shift();  
	var index = getRemoveIndex(removedPoints.length);
	var PQremoved = removedPoints[index]; 
	removedPoints.splice(index, 1); // remove it from Ps  
	return PQremoved;
}

function getNewSolutionAfterRefineP_Q(P, Q, C, GoodMatchArrayPointPairs, trial , cutoff_magnitute) {
    var C_RRT_K_evals = null
    var removedPoints = null;
    try  {      
        removedPoints = update_P_Q(P, Q, C, GoodMatchArrayPointPairs, trial, cutoff_magnitute); // TabuSize=10  
        C_RRT_K_evals = getLeastSquareSolutions(P, Q); // true means sequencing,   
    }
    catch(Error) { 
        console.log(Error); 
        console.log("catch(Error): RESET the solution @ trial = " + trial); 
    } // more than 8 point  
	
    // if no solution find, add removed points from less off order.  
    while((C_RRT_K_evals == null || C_RRT_K_evals.length == 0) && removedPoints.length>0) {
        var PQremoved = popOne(removedPoints);  
		P.push(PQremoved.p); Q.push(PQremoved.q);
        try{  
            C_RRT_K_evals = getLeastSquareSolutions(P, Q);  
        }
        catch(Err) {
            console.log(Err); 
        }
    }
    return C_RRT_K_evals;
} 
function findIndexOfArray(p, P){
	for(var i=0; i<P.length; i++) {
		if(compare_two_vectors(p, P[i]) == 0)
			return i;
	}
	return -1;
}

/**
OriMtx: 16x1 transformation matrix containing orientation information. 
*/
function getNewSolutionAfterRefineP_QNew(sol, NeighborSols, UniqueSols, SolLimit, OriMtx) {  
	var P = sol.P.slice(), Q = sol.Q.slice() // copy  P and Q from sol.
	var distance_statistics = sol.dist;
	
	//-- step 1. get statistics, and Qcomp
	 // TabuList,TabuSize);
  	 
    if(P.length >8 && distance_statistics.Qcomp.length > 0  ) {
		distance_statistics.Qcomp.sort(function(a,b){return  b.dist - a.dist;}); // descending order 
		for(var k=0; k< distance_statistics.Qcomp.length; k++) {
			var PQremoved =  distance_statistics.Qcomp[k]; // pick the most off point  
			if(PQremoved.dist < 0.00001) // if distance is so small, ignore it. 
				continue;
			var index = findIndexOfArray(PQremoved.p, P);
			if(index >= 0 ) { // find the index of most off point  
				P.splice(index, 1); Q.splice(index, 1); // remove pi from P // remove qi from Q  
				try {  
					var NeighborSol_found = false;
					var sols = getLeastSquareSolutions(P, Q, OriMtx);
					if( sols && sols.length > 0) {
						for(var j=0; sols && j<sols.length; j++) { 
							if( (SolLimit <= 0 || NeighborSols.length < SolLimit) && AddIfUniqueSolutions(sols[j], UniqueSols)) {
								NeighborSols.push(sols[j]); 
								getNewSolutionAfterRefineP_QNew(sols[j], NeighborSols, UniqueSols,  SolLimit, OriMtx);  // recursive calls  
								NeighborSol_found = true;
							}
						} 
					}
					if(NeighborSol_found)
						return;
					else {// back p and q in 
						P.splice(index, 0, PQremoved.p); Q.splice(index,0, PQremoved.q); // insert   
					} 
				}
				catch(Err) {
					console.log(Err);
				}  
			}
		} 
    } 
} 

function searchBestAprxSolutionFromArrayOld(GoodMatchArrayPointPairs, cutoff_magnitute, iterationMax)
{
	var done = false;
	var max_loop = iterationMax?iterationMax:100;  
	var behaviors = [];
		
	var SolutionQ = getInitialFeasibleSolutions(GoodMatchArrayPointPairs, GoodMatchArrayPointPairs.length, max_loop*0.3); //10,20); get 20 feasible sets of 10 points  
	
	var TotalSolutions = [];
    if(SolutionQ.length == 0) {
        console.log("Could not find any INITIAL feasible solution!");
        return null; // BSF_C_RTT_K_eval_P_Q ;
    }
	dbgr.setFlag(false); 
    var no_neheibor_sols = 0, get_improving_solution = 0, get_refined_solution = 0; 
    var refine_beat_bsf = 0; reset_beat_bsf = 0;
    var bst_eval = Number.MAX_VALUE; 
    var BSF_C_RTT_K_eval_P_Q = null;   
    //--- iterative improvement 
	for(var trial = 0; SolutionQ.length>0  && trial < max_loop; trial++) { 
        console.log("trial="+trial);   
        var sol = SolutionQ[0]; 
		TotalSolutions.push(sol);
		SolutionQ.shift();
        if(sol.eval < bst_eval) { get_improving_solution++;
            if(typeof sol.refined == "undefined") // reset P and Q set by random selection 
                reset_beat_bsf++;
            else // refine the previous P and Q 
                refine_beat_bsf++;
            
            bst_eval = sol.eval; 
            BSF_C_RTT_K_eval_P_Q = sol;    
        } 
		var cutoff_m = (cutoff_magnitute)? cutoff_magnitute: 2;
        var C_RRT_K_evals = getNewSolutionAfterRefineP_Q(sol.P, sol.Q, sol.C, GoodMatchArrayPointPairs, trial , cutoff_m); 
        if(C_RRT_K_evals == null || C_RRT_K_evals.length == 0) {
            no_neheibor_sols++;
            console.log("C_RRT_K_evals == null || C_RRT_K_evals.length == 0: RESET the solution @ trial = " + trial);
            try { 
                var NewInit = getInitialFeasibleSolutions(GoodMatchArrayPointPairs, GoodMatchArrayPointPairs.length-1, 1); // make only one solution   
                for(var ii=0; ii < NewInit.length; ii++) 
                    SolutionQ.push(NewInit[ii]); // add newly sampled solution  
            }
            catch(Err) {
                console.log(Err); 
            }
        }
        else { 
            get_refined_solution ++ ; 
            for(var ii=0; ii < C_RRT_K_evals.length; ii++) {
                var newsol = C_RRT_K_evals[ii];
                newsol["P"] = sol.P; newsol["Q"]=sol.Q; // add new solution 
                newsol["refined"] = true; 
                SolutionQ.push(newsol);
            }
        } 
	} // iteration is done.   
    
    console.log("no_neheibor_sols="+no_neheibor_sols
               +", get_refined_solutions="+get_refined_solution+", get_improving_solution="+get_improving_solution);
    console.log("reset_beat_bsf="+reset_beat_bsf+", refine_beat_bsf="+refine_beat_bsf);
   
	/// seeing three cases are shown to check validation of LeastSquareMethod 
	TotalSolutions.sort(function(a,b){return a.eval - b.eval;});
	var solsources = "";
	for(var i=0; i<TotalSolutions.length; i++) { 
		if(solsources.length>0) solsources += ", ";
		solsources += TotalSolutions[i].source+":"+TotalSolutions[i].eval;
	}
	console.log(solsources);
	//console.log("best eval="+BSF_C_RTT_K_eval_P_Q.eval + " @ trial = " + BSF_C_RTT_K_eval_P_Q.trial);
   // dbgr.setFlag(true); 
	return BSF_C_RTT_K_eval_P_Q;
}

function searchBestAprxSolutionFromArray(GoodMatchArrayPointPairs, NoOfNeigbhors, iterationMax)
{
	var TotalSolutions = searchAprxSolutionsFromArray(GoodMatchArrayPointPairs, NoOfNeigbhors, iterationMax);
	if(TotalSolutions)
		return TotalSolutions[0];
	else
		return [];
}

/**
  OriMtx: 16x1 transformation matrix containing orientation information 
*/
function searchAprxSolutionsFromArray(GoodMatchArrayPointPairs, NoOfNeigbhors, iterationMax, maxSolutions, OriMtx) { 
	var max_loop = iterationMax?iterationMax:100;  
    var max_sol = maxSolutions? maxSolutions: 50;
	var behaviors = [];
		
	var TotalSolutions = [];
	var SolutionQ = getInitialFeasibleSolutions(GoodMatchArrayPointPairs, GoodMatchArrayPointPairs.length, NoOfNeigbhors, TotalSolutions, OriMtx); //10,20); get 20 feasible sets of 10 points  
	
    if(SolutionQ.length == 0) {
        console.log("Could not find any INITIAL feasible solution!");
        return TotalSolutions; // BSF_C_RTT_K_eval_P_Q ;
    }
	dbgr.setFlag(false); 
    var no_neheibor_sols = 0, /*get_improving_solution = 0,*/ get_refined_solution = 0; 
    var refine_beat_bsf = 0; reset_beat_bsf = 0;
    //var bst_eval = Number.MAX_VALUE; 
    //var BSF_C_RTT_K_eval_P_Q = null;   
    //--- iterative improvement 
	for(var trial = 0; SolutionQ.length>0 && trial < max_loop /* */ && TotalSolutions.length < max_sol/*max_loop*2*/ ; trial++) { 
       if (dbgr.flag) console.log("trial="+trial, "|TotalSolutions|="+TotalSolutions.length);   
		SolutionQ.sort(function(a,b){return a.eval - b.eval;}); // sorting by ascending order 
        var sol = SolutionQ[0]; SolutionQ.shift(); 
		sol["trial"]=trial; 
		
        var NeiborSolutions =[] ;
		getNewSolutionAfterRefineP_QNew(sol, NeiborSolutions, TotalSolutions, NoOfNeigbhors, OriMtx);  /*
        if(NeiborSolutions == null || NeiborSolutions.length == 0) 
		{
            no_neheibor_sols++; 
            NeiborSolutions = getInitialFeasibleSolutions(GoodMatchArrayPointPairs, GoodMatchArrayPointPairs.length-1, NoOfNeigbhors, TotalSolutions);            
		}else {
			get_refined_solution ++ ; 
		} */
		for(var ii=0; ii < NeiborSolutions.length; ii++) {
			var newsol = NeiborSolutions[ii];   
			SolutionQ.push(newsol); 
		} 
		if (dbgr.flag) console.log("|NeiborSolutions|="+NeiborSolutions.length+" @ trial ="+trial);
	} // iteration is done.   
    
   if (dbgr.flag) console.log("no_neheibor_sols="+no_neheibor_sols
               +", get_refined_solutions="+get_refined_solution/*+", get_improving_solution="+get_improving_solution*/);
    //console.log("reset_beat_bsf="+reset_beat_bsf+", refine_beat_bsf="+refine_beat_bsf);
    
	/// seeing three cases are shown to check validation of LeastSquareMethod 
	TotalSolutions.sort(function(a,b){return a.eval - b.eval;});
	var solsources = "";
	for(var i=0; i<TotalSolutions.length; i++) { 
		if(!TotalSolutions[i].trial) // stop by |TotalSolutions|=100
			TotalSolutions[i].trial = "LAST"; // look different  
		if(solsources.length>0) solsources += ", ";
		solsources += TotalSolutions[i].source+":"+TotalSolutions[i].eval+"@t="+TotalSolutions[i].trial;
	}
	if (dbgr.flag) console.log(solsources);
	if (dbgr.flag) console.log("iteration="+trial+", |TotalSols|="+TotalSolutions.length +", best eval="+TotalSolutions[0].eval + " @ trial = " + TotalSolutions[0].trial);
  //  dbgr.setFlag(true);  
	return TotalSolutions;
}

function searchBestAprxSolution(GoodMatchPoints) { 
	var GoodMatchArrayPointPairs = getArrayOfPointPairs(GoodMatchPoints);
	return searchBestAprxSolutionFromArray(GoodMatchArrayPointPairs, 2, 100); 
}

function searchAprxSolutionsFromGoodMatches(GoodMatchPoints, max_solutions) { 
	var GoodMatchArrayPointPairs = getArrayOfPointPairs(GoodMatchPoints);
	return searchAprxSolutionsFromArray(GoodMatchArrayPointPairs, 2, 100, max_solutions); 
}
////////////////////////////////////////////////////////////// GA-Based algorithm ////////////////////////////////////////////////////////////////////
function GACamPositionFinder3js(THREE, P, Q, projection3jsMtx, Orient3jsMtx, PosiRanges, width, height) { 
    TestGA_Sphere.call(this); 
	this.THREE = THREE;
    this.projection3jsMtx = projection3jsMtx;
	this.mtxWorld3jsMtx = Orient3jsMtx;
	this.P = P; 
	this.Q = Q;
	this.width = width;
	this.height = height;
	this.range = PosiRanges;
    //-- evaulation: 2D image difference 
    this.evaluate = function (a) {
    	var p = new THREE.Vector3(a[0], a[1], a[2]);
		this.mtxWorld3jsMtx.setPosition(p);
		
		var mtxWorldInverse = new this.THREE.Matrix4().getInverse(this.mtxWorld3jsMtx);   
		var eval = evaluate_in_nomalized_window(this.THREE, this.P, this.Q, this.projection3jsMtx, mtxWorldInverse, this.width, this.height); 
		
		return eval; 
    }
} 
/*
function GACamPositionFinder() { 
    GA_Position.call(this);      
    this.init = function(P, Q, projection16x1col, mtxWorld16x1col, PosiRanges, width, height, near_dist, useInitSol) {
        this.projection16x1col = projection16x1col;
        this.mtxWorld16x1col = mtxWorld16x1col;
        this.tr=[mtxWorld16x1col[12], mtxWorld16x1col[13], mtxWorld16x1col[14]];
        this.P = P; 
        this.Q = Q;
        this.width = width;
        this.height = height;
        this.range = PosiRanges;
        this.near_dist = near_dist;
        
        this.useInitSol = useInitSol; 
        this.first_sample = (useInitSol)?true:false; 
    };
    //-- evaulation: 2D image difference 
    this.evaluate = function (a) {
    	//var p = new THREE.Vector3(a[0], a[1], a[2]); 
    	var copyMtxWorld=[];
		for(var ii=0; ii< this.mtxWorld16x1col.length; ii++) copyMtxWorld.push(this.mtxWorld16x1col[ii]);  // copy
        copyMtxWorld[12]=a[0], copyMtxWorld[13]=a[1], copyMtxWorld[14]=a[2]; // set the position  
		var mtxWorldInverse16x1col  = getInverseColArray(copyMtxWorld); 
		var eval = evaluate_in_nomalized_window2(this.P, this.Q, this.projection16x1col, mtxWorldInverse16x1col, this.width, this.height, this.near_dist);
        
        //var mtxWorldInverse16x1col_star = getInverseColArray(this.mtxWorld16x1col); 
		//var eval_star = evaluate_in_nomalized_window2(this.P, this.Q, this.projection16x1col, mtxWorldInverse16x1col_star, this.width, this.height, this.near_dist);
		return eval; 
    }
}
*/

function searchGASolutionsFromArrayAndThree(THREE, correspondingPointPairs, maxIteration, PopulationSize, prjMtx3js, OriMtx3js, PosiRanges, width, height) {
	var Q=[], P=[];
	pickTheSpreadingPoints(correspondingPointPairs, Q, P);
    var GAgenerations = [];
    if(Q.length==0) {
        alert("Empty point pairs!");
        return GAgenerations;
    }else {
        var GASolver = new GACamPositionFinder3js(THREE, P, Q, prjMtx3js, OriMtx3js, PosiRanges, width, height);
        GAgenerations = GASolver.run(maxIteration, PopulationSize, Math.round(PopulationSize/2), 0.4); 
        //-- for compatibility 
       for(var ii=0; ii<GAgenerations.length; ii++) {
            for(var jj=0; jj<GAgenerations[ii].length; jj++) { 
                var sol = GAgenerations[ii][jj];
                var p = new THREE.Vector3(sol.posi[0], sol.posi[1], sol.posi[2]);
                GASolver.mtxWorld3jsMtx.setPosition(p);  
                
                var m = new THREE.Matrix4().getInverse(GASolver.mtxWorld3jsMtx); 
                sol["RRT"] = getRowArrayFromThreeMatrix4(m);
                sol["P"]=P;
                sol["Q"]=Q;
            }
       }
    }
	return GAgenerations;
} 

function searchGAPositionFromArray(correspondingPointPairs, maxIteration, PopulationSize, prjMtx16x1, OriMtx16x1, PosiRanges, width, height, useInitSol,
          parent1SelectionRule, parent2SelectionRule, repetationAllowed, crossoverRule, debug_flag, useAllPoints, 
          threshold/*no threshold*/, time_limit_sec, posi_radius_6s) {
	var Q=[], P=[];
	pickTheSpreadingPoints(correspondingPointPairs, Q, P, useAllPoints);
    var GAgenerations = [];
    if(Q.length==0) {
        alert("Empty point pairs!");
        return GAgenerations;
    }else {
        var GASolver = new GA_Position();
        GASolver.init(P, Q, prjMtx16x1, OriMtx16x1, PosiRanges, width, height, 0, useInitSol);
        GASolver.parent1SelectionRule = parent1SelectionRule?parent1SelectionRule:"Random";
        GASolver.parent2SelectionRule = parent2SelectionRule?parent2SelectionRule:"Random";
        GASolver.repetationAllowed = repetationAllowed?true:false;
        GASolver.crossoverRule = crossoverRule?crossoverRule:"Random";
        GASolver.debug_flag = (debug_flag)?true:false;
        GASolver.radius_6s = posi_radius_6s?posi_radius_6s:100;
        GASolver.threshold = threshold ? threshold :-1; //0.25;
        GASolver.time_limit_sec = time_limit_sec?time_limit_sec:2; // 2 secs default
        
        GAgenerations  = GASolver.run(maxIteration, PopulationSize, Math.round(PopulationSize/2), 0.4); 
        //-- for compatibility 
        for(var ii=0; ii<GAgenerations.length; ii++) {
            for(var jj=0; jj<GAgenerations[ii].length; jj++) { 
                var sol = GAgenerations[ii][jj];
                var copyMtxWorld=[]; // 
                for(var k=0; k<GASolver.initialMtx16x1col.length; k++) copyMtxWorld.push(GASolver.initialMtx16x1col[k]);  // copy 
                copyMtxWorld[12]=sol.posi[0], copyMtxWorld[13]=sol.posi[1], copyMtxWorld[14]=sol.posi[2]; // set the position  
                
                var mtxWorldInverse16x1col = getInverseColArray(copyMtxWorld); 
                sol["RRT"] = transpose16x1(mtxWorldInverse16x1col); // make it row first 16x1.  
                sol["P"]=P;
                sol["Q"]=Q;
            }
        }
    }
	return GAgenerations;
} 

function searchGASolutionsFromArray(correspondingPointPairs, maxIteration, PopulationSize, prjMtx16x1, OriMtx16x1, PosiRanges, width, height, useInit, 
       parent1SelectionRule, parent2SelectionRule, repetationAllowed, crossoverRule, debug_flag, useAllKeypoints, 
       TargetEvaluationValue/*no threshold*/, TimeOutLimit, posi_radius_6s) { 
	return searchGAPositionFromArray(correspondingPointPairs, maxIteration, PopulationSize, prjMtx16x1, OriMtx16x1, PosiRanges, width, height, useInit, 
                                 parent1SelectionRule, parent2SelectionRule, repetationAllowed, crossoverRule, debug_flag, useAllKeypoints, 
                                 TargetEvaluationValue/*no threshold*/, TimeOutLimit, posi_radius_6s) ;
}
function searchGARotationFromArray(correspondingPointPairs, maxIteration, PopulationSize, 
            prjMtx16x1, initMtx16x1col, PosiRanges, width, height, near_dist, useInit,
            parent1SelectionRule, parent2SelectionRule, repetationAllowed, crossoverRule, debug_flag, useAllPoints, 
            threshold/*no threshold*/, time_limit_sec, y_angle_6s, z_angle_6s) {
	var Q=[], P=[];
	pickTheSpreadingPoints(correspondingPointPairs, Q, P, useAllPoints);
	var GAgenerations = [];
    if(Q.length==0) {
        alert("Empty point pairs!");
        return GAgenerations;
    }else {
        var GASolver = new GA_Orientation();
        GASolver.init(P, Q, prjMtx16x1, initMtx16x1col, PosiRanges, width, height, near_dist, useInit); 
        GASolver.parent1SelectionRule = parent1SelectionRule?parent1SelectionRule:"Random";
        GASolver.parent2SelectionRule = parent2SelectionRule?parent2SelectionRule:"Random";
        GASolver.repetationAllowed = repetationAllowed?true:false;
        GASolver.crossoverRule = crossoverRule?crossoverRule:"Random";
        GASolver.debug_flag = (debug_flag)?true:false;
        GASolver.y_angle_6s = y_angle_6s?y_angle_6s:60; // degree
        GASolver.z_angle_6s = z_angle_6s?z_angle_6s:60; 
        GASolver.changePositionToo = false;
        GASolver.threshold = threshold ? threshold :-1; //0.25;
        GASolver.time_limit_sec = time_limit_sec?time_limit_sec:2; // 2 secs default
        
        GAgenerations  = GASolver.run(maxIteration, PopulationSize, Math.round(PopulationSize/2), 0.4); 
        //-- for compatibility 
        for(var ii=0; ii<GAgenerations.length; ii++) {
            for(var jj=0; jj<GAgenerations[ii].length; jj++) { 
                var sol = GAgenerations[ii][jj];
                var x = sol.Rx, y = sol.Ry;
                var z = cross_product_3Dvector(x, y);
                var t = sol.tr;
                var mtxWorld16x1col = [ x[0],x[1],x[2],0, y[0],y[1],y[2],0, z[0],z[1],z[2],0, t[0],t[1],t[2],1 ];  

                var mtxWorldInverse16x1col = getInverseColArray(mtxWorld16x1col); 
                var eval = evaluate_in_nomalized_window2(P, Q, prjMtx16x1, mtxWorldInverse16x1col, width, height, near_dist);  
                //console.log("ii="+ii+ ", eval="+eval + "eval_star=" + eval_star);
                var RRT = transpose16x1(mtxWorldInverse16x1col); 
                sol["RRT"] = RRT;// mtxWorldInverse16x1col); // make it row first 16x1. 
                sol["P"]=P;
                sol["Q"]=Q;
            }
        }
    }
	return GAgenerations;
}

function updateMinMaxValuesIndices(uv, ii, minmaxX, minmaxY, minmaxXidx, minmaxYidx) {
    var min=0, max = 1;
    var x = 0; y=1;
    if(uv[x]<minmaxX[min]){ minmaxX[min]=uv[x];
        minmaxXidx[min] = ii;
    }  
    if(uv[x]>minmaxX[max]){ minmaxX[max]=uv[x];
        minmaxXidx[max] = ii;
    }  
    if(uv[y]<minmaxY[min]){ minmaxY[min]=uv[y];
        minmaxYidx[min] = ii;
    }  
    if(uv[y]>minmaxY[max]){ minmaxY[max]=uv[y];
        minmaxYidx[max] = ii;
    }  
}

function getUniqueIndices(minmaxX_NE_idx, minmaxY_NE_idx, minmaxX_NW_idx, minmaxY_NW_idx,
                          minmaxX_SW_idx, minmaxY_SW_idx, minmaxX_SE_idx, minmaxY_SE_idx) { 
    var indices=[];
    var _min = 0; _max= 1;
    if(indices.indexOf(minmaxX_NE_idx[_min])<0) indices.push(minmaxX_NE_idx[_min] );
    if(indices.indexOf(minmaxX_NE_idx[_max])<0) indices.push(minmaxX_NE_idx[_max] );
    if(indices.indexOf(minmaxY_NE_idx[_min])<0) indices.push(minmaxY_NE_idx[_min] );
    if(indices.indexOf(minmaxY_NE_idx[_max])<0) indices.push(minmaxY_NE_idx[_max] );
    
    if(indices.indexOf(minmaxX_NW_idx[_min])<0) indices.push(minmaxX_NW_idx[_min] );
    if(indices.indexOf(minmaxX_NW_idx[_max])<0) indices.push(minmaxX_NW_idx[_max] );
    if(indices.indexOf(minmaxY_NW_idx[_min])<0) indices.push(minmaxY_NW_idx[_min] );
    if(indices.indexOf(minmaxY_NW_idx[_max])<0) indices.push(minmaxY_NW_idx[_max] );
    
    if(indices.indexOf(minmaxX_SW_idx[_min])<0) indices.push(minmaxX_SW_idx[_min] );
    if(indices.indexOf(minmaxX_SW_idx[_max])<0) indices.push(minmaxX_SW_idx[_max] );
    if(indices.indexOf(minmaxY_SW_idx[_min])<0) indices.push(minmaxY_SW_idx[_min] );
    if(indices.indexOf(minmaxY_SW_idx[_max])<0) indices.push(minmaxY_SW_idx[_max] );
    
    if(indices.indexOf(minmaxX_SE_idx[_min])<0) indices.push(minmaxX_SE_idx[_min] );
    if(indices.indexOf(minmaxX_SE_idx[_max])<0) indices.push(minmaxX_SE_idx[_max] );
    if(indices.indexOf(minmaxY_SE_idx[_min])<0) indices.push(minmaxY_SE_idx[_min] );
    if(indices.indexOf(minmaxY_SE_idx[_max])<0) indices.push(minmaxY_SE_idx[_max] );
    return indices;
}
function getQ_P_in4partitions(Qcandidates, Pcandidates, centerUV, Q, P) {
    //-- make min_max index for each {NE, NW, SW, SE} 
    var Pinf = Number.POSITIVE_INFINITY, Ninf = Number.NEGATIVE_INFINITY;
    var minmaxX_NE  = [Pinf,Ninf], minmaxY_NE = [Pinf,Ninf]; 
    var minmaxX_NE_idx = [-1, -1], minmaxY_NE_idx = [-1, -1];
    var minmaxX_NW  = [Pinf,Ninf], minmaxY_NW = [Pinf,Ninf]; 
    var minmaxX_NW_idx = [-1, -1], minmaxY_NW_idx = [-1, -1];
    var minmaxX_SW  = [Pinf,Ninf], minmaxY_SW = [Pinf,Ninf]; 
    var minmaxX_SW_idx = [-1, -1], minmaxY_SW_idx = [-1, -1];
    var minmaxX_SE  = [Pinf,Ninf], minmaxY_SE = [Pinf,Ninf]; 
    var minmaxX_SE_idx = [-1, -1], minmaxY_SE_idx = [-1, -1];
    var x = 0, y = 1;
    for(var ii=0; ii<Qcandidates.length; ii++) {
        var uv = Qcandidates[ii];
        if(uv[x]> centerUV[x] && uv[y] > centerUV[y])   // NE
            updateMinMaxValuesIndices(uv, ii, minmaxX_NE, minmaxY_NE, minmaxX_NE_idx, minmaxY_NE_idx); 
        else if (uv[x] < centerUV[x] && uv[y] > centerUV[y]) // NW
            updateMinMaxValuesIndices(uv, ii, minmaxX_NW, minmaxY_NW, minmaxX_NW_idx, minmaxY_NW_idx); 
        else if(uv[x] < centerUV[x] && uv[y] < centerUV[y]) // SW  
            updateMinMaxValuesIndices(uv, ii, minmaxX_SW, minmaxY_SW, minmaxX_SW_idx, minmaxY_SW_idx);    
        else  // SE 
            updateMinMaxValuesIndices(uv, ii, minmaxX_SE, minmaxY_SE, minmaxX_SE_idx, minmaxY_SE_idx); 
    }
    
    //-- filter out  var indices=[]
    var indices = getUniqueIndices(minmaxX_NE_idx, minmaxY_NE_idx, minmaxX_NW_idx, minmaxY_NW_idx,
                                   minmaxX_SW_idx, minmaxY_SW_idx, minmaxX_SE_idx, minmaxY_SE_idx);
    for(var ii=0; ii<indices.length; ii++) { 
        var index = indices[ii];
        if(index<0) // invalid one
            continue;
        Q.push(Qcandidates[index]); P.push(Pcandidates[index]);
    } 
}
function pickTheSpreadingPoints(correspondingPointPairs, Q, P, useAllPoints) {
    if(correspondingPointPairs.length==0)
        return;
    if(useAllPoints) {
        for(var ii=0; ii<correspondingPointPairs.length; ii++) { 
            Q.push(correspondingPointPairs[ii][0]);	P.push(correspondingPointPairs[ii][1]);
        } 
    }else { // picking some from NE, NW, SW, SE  
        // step 1. get the center UV point 
        var centerUV=[0,0,0]; 
        var Qcandidates=[]; Pcandidates=[]
        for(var ii=0; ii<correspondingPointPairs.length; ii++) { 
            centerUV = numeric.add(correspondingPointPairs[ii][0], centerUV); 
            Qcandidates.push(correspondingPointPairs[ii][0]);	
            Pcandidates.push(correspondingPointPairs[ii][1]);
        }
        centerUV = numeric.mul(1/correspondingPointPairs.length, centerUV); 
        getQ_P_in4partitions(Qcandidates, Pcandidates, centerUV, Q, P); 
    }   
}

function pickTheSpreadingInlierPoints(correspondingPointPairs, Q, P, projectionElems, matrixWorldInverseElems, OutlierThesholdSigmaN) {
    if(correspondingPointPairs.length==0)
        return;
    var originP=[], originQ=[];
    for(var ii=0; ii<correspondingPointPairs.length; ii++) { 
        originQ.push(correspondingPointPairs[ii][0]);	originP.push(correspondingPointPairs[ii][1]);
    } 
    var distances = get_uv_distance_of_PQ_from_solution(originP, originQ, projectionElems, matrixWorldInverseElems, 1);
    var dist_statistics= getAverageAndStd(distances.distances);
    var average_dist = dist_statistics.average;
    var std_dist = dist_statistics.std;
    var outlierthreshold = std_dist*OutlierThesholdSigmaN;
    // picking some from NE, NW, SW, SE  
    // step 1. get the center UV point 
    var centerUV=[0,0,0]; 
    var Qinliner = [], Pinliner = []; 
    for(var ii=0; ii<originQ.length; ii++) {  
        var dist = distances.distances[ii];
        var dist_devi = Math.sqrt((dist-average_dist)*(dist-average_dist));
        if(OutlierThesholdSigmaN > 0 && dist_devi > outlierthreshold )
            continue;
        else {
            Qinliner.push(originQ[ii]); Pinliner.push(originP[ii]) 
            centerUV = numeric.add(originQ[ii], centerUV); 
        } 
    }
    centerUV = numeric.mul(1/Qinliner.length, centerUV); 
    console.log("|Qorigin|="+originQ.length+", |Qinliners|="+Qinliner.length);
    getQ_P_in4partitions(Qinliner, Pinliner, centerUV, Q, P);  
}

function searchGACamCalibrationFromArray(correspondingPointPairs, maxIteration, PopulationSize, prjMtx16x1, initMtx16x1col, PosiRanges, width, height, near_dist, useInit,
                        parent1SelectionRule, parent2SelectionRule, repetationAllowed, crossoverRule, debug_flag, useAllKeypoints,
                        threshold, time_limit_sec, posi_radius_6s, y_angle_6s, z_angle_6s, OutlierThesholdSigmaN) {
    var Q=[], P=[];
	pickTheSpreadingPoints(correspondingPointPairs, Q, P, useAllKeypoints);
    var GAgenerations = [];
    if(Q.length==0) {
        alert("Empty point pairs!");
        return GAgenerations;
    }else {
        var GASolver = new GA_CamCalibration();
        GASolver.init(P, Q, prjMtx16x1, initMtx16x1col, PosiRanges, width, height, near_dist, useInit, correspondingPointPairs, OutlierThesholdSigmaN); 
        
        GASolver.parent1SelectionRule = parent1SelectionRule?parent1SelectionRule:"Random";
        GASolver.parent2SelectionRule = parent2SelectionRule?parent2SelectionRule:"Random";
        GASolver.repetationAllowed = repetationAllowed?true:false;
        GASolver.crossoverRule = crossoverRule?crossoverRule:"Random";
        GASolver.debug_flag = (debug_flag)?true:false;
        GASolver.threshold = threshold ? threshold :-1; //0.25;
        GASolver.time_limit_sec = time_limit_sec?time_limit_sec:2; // 2 secs default
        
        GASolver.radius_6s = posi_radius_6s?posi_radius_6s:100;
        GASolver.y_angle_6s = y_angle_6s?y_angle_6s:60; // degree
        GASolver.z_angle_6s = z_angle_6s?z_angle_6s:60;
        GASolver.changePositionToo = true;
        
        GAgenerations = GASolver.run(maxIteration, PopulationSize, Math.round(PopulationSize/2), 0.4); 
        //-- for compatibility 
        var eval_star = Number.POSITIVE_INFINITY;
        var gen_star;
        for(var ii=0; ii<GAgenerations.length; ii++) {
            for(var jj=0; jj<GAgenerations[ii].length; jj++) { 
                var sol = GAgenerations[ii][jj];
                var x = sol.Rx, y = sol.Ry;
                var z = cross_product_3Dvector(x, y);
                var t = sol.tr;
                var mtxWorld16x1col = [ x[0],x[1],x[2],0, y[0],y[1],y[2],0, z[0],z[1],z[2],0, t[0],t[1],t[2],1 ];  

                var mtxWorldInverse16x1col = getInverseColArray(mtxWorld16x1col); 
               
                var eval = evaluate_in_nomalized_window2(P, Q, prjMtx16x1, mtxWorldInverse16x1col, width, height, near_dist);  
                if(eval < eval_star) {
                    eval_star = eval;
                    gen_star = ii;
                }
                //console.log("ii="+ii+ ",jj="+jj+", eval="+eval + ",eval_star=" + eval_star);
                var RRT = transpose16x1(mtxWorldInverse16x1col); 
                sol["RRT"] = RRT;// mtxWorldInverse16x1col); // make it row first 16x1. 
                //sol["P"]=P;
                //sol["Q"]=Q;
            }
        }
        console.log("best eval ="+eval_star + " found at generation=" + gen_star);
        
        var M = initMtx16x1col; 
        var evalobj = GASolver.evaluate({Rx:[M[0],M[1],M[2]], Ry:[M[4],M[5],M[6]], tr:[M[12],M[13],M[14]]}); 
        console.log("init_sol.eval="+evalobj.eval); 
	} 
	return GAgenerations;
}

