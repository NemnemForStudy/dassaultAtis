//  num_util.js
//  Author: qif
//  Prerequisite Libraries: numeric-1.2.6.js
//  History of modification:
//     2015-05-14 by qif: promoted it first time.

//This function creates a random noise variable for us
function generateGaussianNoise(mu, sigma){
    if(sigma == 0) return mu;
    var epsilon = Number.MIN_VALUE;
    //console.log("Epsilon: " + epsilon);
    var two_pi = 2.0*3.14159265358979323846;
 
    var z0, z1;
    //var generate;
    //generate = !generate;
 
    //if (!generate){
    //	//console.log(z1 * sigma + mu);
    //	return z1 * sigma + mu;
    //}
 
    var u1, u2;
    do{
       u1 = Math.random();
       u2 = Math.random();
    }while ( u1 <= epsilon );
 
    z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(two_pi * u2);
    //z1 = Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(two_pi * u2);
    //console.log(z0 * sigma + mu);
    //arr.push([z0 * sigma + mu]);
    return z0 * sigma + mu;
}

function cross_product_3Dvector(u, v) {
	return [u[1]*v[2]-u[2]*v[1], u[2]*v[0]-u[0]*v[2], u[0]*v[1]-u[1]*v[0]];
}

function transpose16x1(given) {
	var tmp;
	var te = given.slice(); // copy of given to te. 
	
	tmp = te[1]; te[1] = te[4]; te[4] = tmp;
	tmp = te[2]; te[2] = te[8]; te[8] = tmp;
	tmp = te[6]; te[6] = te[9]; te[9] = tmp;

	tmp = te[3]; te[3] = te[12]; te[12] = tmp;
	tmp = te[7]; te[7] = te[13]; te[13] = tmp;
	tmp = te[11]; te[11] = te[14]; te[14] = tmp;

	return te;
}
/**
*/
function getInverseColArray(m_elements, throwOnInvertible) {
	var te=[1,0,0,0,
	        0,1,0,0,
			0,0,1,0,
			0,0,0,1];
	var me = m_elements;
	var n11 = me[0], n12 = me[4], n13 = me[8], n14 = me[12];
	var n21 = me[1], n22 = me[5], n23 = me[9], n24 = me[13];
	var n31 = me[2], n32 = me[6], n33 = me[10], n34 = me[14];
	var n41 = me[3], n42 = me[7], n43 = me[11], n44 = me[15];

	te[0] = n23*n34*n42 - n24*n33*n42 + n24*n32*n43 - n22*n34*n43 - n23*n32*n44 + n22*n33*n44;
	te[4] = n14*n33*n42 - n13*n34*n42 - n14*n32*n43 + n12*n34*n43 + n13*n32*n44 - n12*n33*n44;
	te[8] = n13*n24*n42 - n14*n23*n42 + n14*n22*n43 - n12*n24*n43 - n13*n22*n44 + n12*n23*n44;
	te[12] = n14*n23*n32 - n13*n24*n32 - n14*n22*n33 + n12*n24*n33 + n13*n22*n34 - n12*n23*n34;
	te[1] = n24*n33*n41 - n23*n34*n41 - n24*n31*n43 + n21*n34*n43 + n23*n31*n44 - n21*n33*n44;
	te[5] = n13*n34*n41 - n14*n33*n41 + n14*n31*n43 - n11*n34*n43 - n13*n31*n44 + n11*n33*n44;
	te[9] = n14*n23*n41 - n13*n24*n41 - n14*n21*n43 + n11*n24*n43 + n13*n21*n44 - n11*n23*n44;
	te[13] = n13*n24*n31 - n14*n23*n31 + n14*n21*n33 - n11*n24*n33 - n13*n21*n34 + n11*n23*n34;
	te[2] = n22*n34*n41 - n24*n32*n41 + n24*n31*n42 - n21*n34*n42 - n22*n31*n44 + n21*n32*n44;
	te[6] = n14*n32*n41 - n12*n34*n41 - n14*n31*n42 + n11*n34*n42 + n12*n31*n44 - n11*n32*n44;
	te[10] = n12*n24*n41 - n14*n22*n41 + n14*n21*n42 - n11*n24*n42 - n12*n21*n44 + n11*n22*n44;
	te[14] = n14*n22*n31 - n12*n24*n31 - n14*n21*n32 + n11*n24*n32 + n12*n21*n34 - n11*n22*n34;
	te[3] = n23*n32*n41 - n22*n33*n41 - n23*n31*n42 + n21*n33*n42 + n22*n31*n43 - n21*n32*n43;
	te[7] = n12*n33*n41 - n13*n32*n41 + n13*n31*n42 - n11*n33*n42 - n12*n31*n43 + n11*n32*n43;
	te[11] = n13*n22*n41 - n12*n23*n41 - n13*n21*n42 + n11*n23*n42 + n12*n21*n43 - n11*n22*n43;
	te[15] = n12*n23*n31 - n13*n22*n31 + n13*n21*n32 - n11*n23*n32 - n12*n21*n33 + n11*n22*n33;

	var det = me[ 0 ] * te[ 0 ] + me[ 1 ] * te[ 4 ] + me[ 2 ] * te[ 8 ] + me[ 3 ] * te[ 12 ];

	if ( det == 0 ) {

		var msg = "Matrix4.getInverse(): can't invert matrix, determinant is 0";

		if ( throwOnInvertible || false ) {

			throw new Error( msg ); 

		} else {

			console.warn( msg );

		}

		te=[1,0,0,0,
		0,1,0,0,
		0,0,1,0,
		0,0,0,1];
		return te;
	}

	//this.multiplyScalar( 1 / det );
	for(var ii=0; ii<te.length; ii++)
		te[ii] *= 1/det;

	return te; 
}
function Coplanarity(x1, x2, x3, x4) {
    var x2_sub_x1 = numeric.sub(x2, x1);
	var x4_sub_x3 = numeric.sub(x4, x3);
	var cross = cross_product_3Dvector(x2_sub_x1, x4_sub_x3);
	var x3_sub_x1 = numeric.sub(x3, x1);
	var scalar = numeric.dot(normalize(x3_sub_x1), normalize(cross));
    return scalar;
}

function isCoplanar(x1, x2, x3, x4, tol) {
	var scalar = Coplanarity(x1, x2, x3, x4);
	return Math.abs(scalar) < tol;
}

function distance(u, v) {
	if(u.length != v.length)
		throw "u.length != v.length in distance";
	var diff_sqr_sum = 0;
	for(var i=0; i<u.length; i++) {
		diff_sqr_sum +=(u[i]-v[i])*(u[i]-v[i]);
	}
	return Math.sqrt(diff_sqr_sum);
}
function getColumn(rowM, ii) {
	var transM = numeric.transpose(rowM);
	return transM[ii];
}
function M2DtoTable(A) {
	var str = "<table border='1'>";
	for(var ii=0; ii<A.length; ii++) {
		str += "<tr>";
		for(var jj=0; jj<A[ii].length; jj++) {
			str += "<td align='right'>"+A[ii][jj]+"</td>";
		}
		str += "</tr>";
	}
	str += "</table>";
	return str;
}

function ColMtoTable(A) {
	var RowM = numeric.transpose(A);
	return M2DtoTable(RowM);
}
function VectortoStr(A) {
	var str = "[";
	for(var ii=0; ii<A.length; ii++) {
		if(ii>0) str += ", ";
		str +=  A[ii];
	}
	str += "]^t";
	return str;
}

function checkIdentity(A) {
	for(var ii=0; ii<A.length; ii++) {
		for(var jj=0; jj<A[ii].length; jj++) {
			if(ii == jj) {
				if(Math.abs(A[ii][jj]-1.0) >0.001) // not one
					return false;
			}
			else{
				if(Math.abs(A[ii][jj])>0.001) // not zero
					return false;
			}
		}
	}
	return true;
}

function isEqualVector(v, u, tol) {
	if(v.length != u.length)
		return false;
	if(tol == null)
		tol = 0.01; // 0.001 seems to be too tight

	for(var ii=0; ii<v.length; ii++) {
		if(Math.abs(v[ii]-u[ii])> tol)
			return false;
	}
	return true;
}

// Javascript to compute elapsed time between "Start" and "Finish" button clicks
function debug_loger(log_flag) {
	this.flag = (typeof log_flag == "undefined")? false: log_flag;
    this.log = log;
    this.setFlag = setFlag;
}

//Get current time from date timestamp
function log(str) {
    if(this.flag)
        console.log(str);
}

//Stamp current time as start time and reset display textbox
function setFlag(log_flag) {
    this.flag = (typeof log_flag == "undefined")? true: false;
}

var dbgr = new debug_loger(true);  //create

function loge4x4(matElem) {
    //if(!steal || ((steal.config().env == "development" ) && !steal.isRhino)) { //compile mode
    if(matElem && matElem.length && (matElem.length >= 16)) { //compile mode
    	dbgr.log(matElem[0]+", "+matElem[4]+", "+ matElem[8]+", "+matElem[12]);
    	dbgr.log(matElem[1]+", "+matElem[5]+", "+ matElem[9]+", "+matElem[13]);
    	dbgr.log(matElem[2]+", "+matElem[6]+", "+matElem[10]+", "+matElem[14]);
    	dbgr.log(matElem[3]+", "+matElem[7]+", "+matElem[11]+", "+matElem[15]);
    } else {
        dbgr.log("invalid 4x4 matrix passed into loge4x4()");
    }
}

/**
   make row based matrix which is used for numeric. 
   matElem = 16x1 for column first. 
*/
function getRowMatrix(matElem) {
	var rowMatrix=[];
	if(matElem && matElem.length && (matElem.length >= 16)) { //compile mode
    	rowMatrix.push(matElem[0], matElem[4], matElem[8], matElem[12]);
    	rowMatrix.push(matElem[1], matElem[5], matElem[9], matElem[13]);
    	rowMatrix.push(matElem[2], matElem[6], matElem[10], matElem[14]);
    	rowMatrix.push(matElem[3], matElem[7], matElem[11], matElem[15]);
    } else {
        throw "invalid argument matElem for 4x4getRowMatrix()";
    }
	return rowMatrix;
}
//-- print matrix of row vectors
function log_rs(rs) {
    if(rs && rs.length) {
    	for(var ii=0; ii<rs.length; ii++) {
    		if(rs[ii] && rs[ii].length) {
        		var str = "";
        		for(var jj=0; jj<rs[ii].length; jj++) {
        			if(jj>0) str += ", ";
        			str += rs[ii][jj];
        		}
        		dbgr.log(str);
        	}
    	}
    }
}

//--- print matrix of column vectors
function log_cs(cs) {
    if(cs) {
    	var rs = numeric.transpose(cs);
    	log_rs(rs);
    }
}

function logr4x4(matElem) {
	for(var i=0; i<4; i++)
		dbgr.log(matElem[i][0]+", "+matElem[i][1]+", "+ matElem[i][2]+", "+matElem[i][3]);
}

// proj(u,v) = (u.v/u.u) * u
function proj(u, v) {
	var uv = numeric.dot(u,v);
	var uu = numeric.dot(u,u);
	return numeric.mul(uv/uu, u);
}

function cp(v) {
	var answer=[];
	for(var i=0; i<v.length; i++) {
		answer.push(v[i]);
	}
	return answer;
}
// V is a sequence of vectors v_k in R^n
// u_k = v_k - \Sigma_{j=1}^{k-1} proj_{u_j}(v_k)
// return e_k = u_k / ||u_k||.
function Gram_Schmidt_Orthonormalization(V, zeronom_indices) {
	var E=[];
	for(var i=0; i < V.length; i++) { E.push(cp(V[i])); } // copy V to U
	for(var i=0; i < E.length; i++) {
		var u = E[i];
		var norm = numeric.norm2(u) ;
		if( Math.abs(norm) < 0.00001) {
			dbgr.log("zero norm2 of u="+u+" in Gram_Schmidt_Orthonormalization.");
            //log_rs(V);
			//throw "E["+i+"]="+u+ " has ZERO norm. Error in Gram_Schmidt_Orthonormalization.";
            dbgr.log("Error: E["+i+"]="+u+ " has ZERO norm. Error in Gram_Schmidt_Orthonormalization.");
			if(zeronom_indices) zeronom_indices.push(i); // keep the zero norm index.
            continue; // ; // break;
        }
		E[i] = numeric.mul(1/norm, u);
		for(var j=i+1; j< E.length; j++) {
			var v = E[j];
			v = numeric.sub(v,  proj(E[i], E[j]));
			E[j] = v;
		}
	}
	return E;
}

// get QR decomposition of A consisting of column vectors A[0],A[1], and A[2].
function getQR(A) {
	var sol=[]
	var Q=[];
	var E = Gram_Schmidt_Orthonormalization(A,[]);
	for(var i=0; i<E.length; i++) {
		var e = E[i];
		if(numeric.norm2(e)-1.0>0.001)
			throw "E[i] of Gram_Schmidt process is not normalized.";
		Q.push(e); // numeric.mul(1/numeric.norm2(U[i]), U[i]));  // normalize
	}
	dbgr.log("Q="); log_cs(Q);	// column vectors

	sol["Q"]=Q;

	/** validate Q **/
	var Qt = numeric.transpose(Q); // row vectors
	var I = numeric.dot(Qt,Q);
	if(checkIdentity(I) == false)
		throw "Q is not orthogonal in getQR";

	/** get R **/
	var R = [[numeric.dot(Q[0],A[0]),numeric.dot(Q[0],A[1]),numeric.dot(Q[0],A[2])],
			  [                     0,numeric.dot(Q[1],A[1]),numeric.dot(Q[1],A[2])],
			  [                     0,                     0,numeric.dot(Q[2],A[2])]
	        ];
	//numeric.dot(Qt,A);
	sol["R"]=R;

	/** validate QR = A **/
	dbgr.log("A="); log_cs(A);
	var QRrow = numeric.dot(Qt, R); // row vectors * row vectors = row vectors
	/*var QR = [];
	for(var i=0; i<Rcol.length;i++) {
		QR.push(numeric.dot(Qt, Rcol[i])); // check numeric first matrix is row vectors
	}*/
	//
	var QR = numeric.transpose(QRrow);

	dbgr.log("QR="); log_cs(QR);
	for(var i=0; i<QR.length; i++) {
		if(isEqualVector(QR[i], A[i]) == false)
			throw "QR[i]!= A[i]";
	}

	return sol;
}


function normalize(v){
	return numeric.mul(1/numeric.norm2(v), v);
}
function Gram_Schmidt_OrthNormal_for_RQD_3x3(Arow){
	var a3 = Arow[2], u3 = a3;
	var e3 = normalize(u3);
	var a2 = Arow[1];
	var u2 = numeric.sub(a2, proj(e3, a2));
	var e2 = normalize(u2);
	var a1 = Arow[0];
	var tmp = numeric.add(proj(e3, a1), proj(e2, a1));
	var u1 = numeric.sub(a1, tmp);
	var e1 = normalize(u1);

	return [e1, e2, e3];
}
function getQ_byGramSchmidtAlgorithm(Arow, RHS_3D){ 
	var Arow_reversed = [];
	for(var i=Arow.length-1; i>=0; i--)
		Arow_reversed.push(Arow[i]); 
    dbgr.log("Arow_reversed="); log_cs(Arow_reversed);

	var Ezero_norm_indices=[]
    var E=Gram_Schmidt_Orthonormalization(Arow_reversed, Ezero_norm_indices);

	var Q=[];
	for(var i=E.length-1; i >=0; i--) {
		var e = E[i];
		if(Ezero_norm_indices.length==0 && numeric.norm2(e)-1.0>0.001)
			throw "E[i] of Gram_Schmidt process is not normalized.";
		Q.push(E[i]); // numeric.mul(1/numeric.norm2(U[i]), U[i]));  // normalize
	}

	if(RHS_3D) {
		var X=0, Y=1, Z=2;
		if(Ezero_norm_indices.length==0) {
			Q[Z]=cross_product_3Dvector(Q[X],Q[Y]); // Z = X x Y
		} else if(Ezero_norm_indices.length==1) {
			var qzi = Z - Ezero_norm_indices[0]; // convert E_zero index to Q_zero index
			if(qzi == Z) // Z
				Q[Z]=cross_product_3Dvector(Q[X],Q[Y]); // Z = X x Y
			else if(qzi == X) // X
				Q[X]=cross_product_3Dvector(Q[Y],Q[Z]); // X = Y x Z
			else // Y
				Q[Y]=cross_product_3Dvector(Q[Z],Q[X]); // Y = Z x X
		}
	}
	dbgr.log("Q="); log_rs(Q);	// row vector
	/** validate Q **/
	var Qt = numeric.transpose(Q); // Qt is comlum vector
	var I = numeric.dot(Q,Qt);
	if(checkIdentity(I) == false) {
		var msg = "Q is not orthogonal in getRQ";
		msg += "|Ezero_norm_indices|="+Ezero_norm_indices.length;
		if(Ezero_norm_indices.length==1) {
			var qzi = Z - Ezero_norm_indices[0];
			msg += "qzi="+qzi;
		}
		throw msg;
	}
	return Q;
}
// get RQ decomposition of A consisting of column vectors A[0],A[1], and A[2].
// Q is row vector
// Ori: Orientation 16x1 matrix. It can be null if not available. 
function getRQ(A,RHS_3D, Ori) {
	var sol=[]
    var Q;
	var Arow = numeric.transpose(A);
	//dbgr.log("A="); log_cs(A);
    //dbgr.log("Arow="); log_cs(Arow);
	
	if(Ori == null)
		Q=getQ_byGramSchmidtAlgorithm(Arow, RHS_3D);
	else { 
		// since Orientation is the camera's orientation from the view point of world.
		// Q is the inverse of Orientation, which is the same as transpose of Orientation.
		// Q should be a row vector.
		Q = [[Ori[0],Ori[1], Ori[2]],[Ori[4],Ori[5],Ori[6]],[Ori[8],Ori[9],Ori[10]]];
	}  
	
    sol["Q"]=Q;
	/** get R **/
	var R = // numeric.dot(A, Qt);
			[[numeric.dot(Q[0],Arow[0]),numeric.dot(Q[1],Arow[0]),numeric.dot(Q[2],Arow[0])],
			 [                        0,numeric.dot(Q[1],Arow[1]),numeric.dot(Q[2],Arow[1])],
			 [                        0,                        0,numeric.dot(Q[2],Arow[2])]
	        ];//

	sol["R"]=R;
	dbgr.log("R="); log_rs(R);

	/** validate RQ= A **/
	dbgr.log("A="); log_cs(A);
	var RQ = numeric.dot(R,Q); // R is row vector, Q is row vectors => RQ is row vectors
	/*var RQ=[];
	for(var i=0; i<Qt.length;i++) {
		RQ.push(numeric.dot(R, Qt[i]));
	}*/

	dbgr.log("RQ="); log_cs(RQ);
	for(var i=0; i<RQ.length; i++) {
		if(isEqualVector(RQ[i], Arow[i]) == false)
			throw "RQ[i] != Arow[i]";
	}

	return sol;
}

// Javascript to compute elapsed time between "Start" and "Finish" button clicks
function timestamp_class(this_current_time, this_start_time, this_end_time, this_time_difference) {
    	this.this_current_time = this_current_time;
    	this.this_start_time = this_start_time;
    	this.this_end_time = this_end_time;
    	this.this_time_difference = this_time_difference;
    	this.GetCurrentTime = GetCurrentTime;
    	this.StartTiming = StartTiming;
    	this.EndTiming = EndTiming;
    }

    //Get current time from date timestamp
    function GetCurrentTime() {
    var my_current_timestamp;
    	my_current_timestamp = new Date();		//stamp current date & time
    	return my_current_timestamp.getTime();
    	}

    //Stamp current time as start time and reset display textbox
    function StartTiming() {
    	this.this_start_time = GetCurrentTime();	//stamp current time
    	//document.TimeDisplayForm.TimeDisplayBox.value = 0;	//init textbox display to zero
    	}

    //Stamp current time as stop time, compute elapsed time difference and display in textbox
    function EndTiming() {
    	this.this_end_time = GetCurrentTime();		//stamp current time
    	this.this_time_difference = (this.this_end_time - this.this_start_time) / 1000;	//compute elapsed time
    	//document.TimeDisplayForm.TimeDisplayBox.value = this.this_time_difference;	//set elapsed time in display box
    	}

var time_object = new timestamp_class(0, 0, 0, 0);  //create new time object and initialize it
