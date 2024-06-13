/**
  Author: Moon Ho Hwang (QIF)
  email: {moon.hwang, qif}@3ds.com
  
  Modification History
   2015.mm,dd by QIF: create the js class.
  
*/
var SAG = SAG || { REVISION: '1'}; 
/**
 * Graph constructor 
 * @constructor
 */
SAGraph = function(id_key, src_key, dst_key) {  
    this.S_id = id_key;// Every vertex and edge will have an attribute _id_.  
    this.S_src = src_key;// Every edge will have an attribute _src_ indicating the source 
    this.S_dst = dst_key;// Every edge will have an attribute _dst_ indicating the source  
    
    this.VE={} ; // VE[id]={atn:atv}: vertices or edges along with attributes ;
                 // e=VE[id] is called an edge if S_src in e & S_dst in e;
    this.FE={}; // FE[src]={eid}: forward edges starting from src s.t. E[eid].S_src = src for eid in FE[src] ;
    this.BE={}; // BE[dst]={eid}: backward edges ending to dst s.t. E[eid].S_dst = dst for eid in BE[dst] ; 
    
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////// Section 1. Vertex & Edge commonly related Methods ///////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
    /**
     * get a vertex by an id
     * @param {string} vid - the vertex id looing for 
     * @return the vertex v s.t. v[this.S_id] = vid if exists, null if not. 
     */
    this.getEntity= function(vid) {
        if(vid in this.VE)
        	return this.VE[vid];
        else
        	return null;
    }
    
    /**
     * get a vertex attribute value.
     * @param {string} vid - the vertex id looking for    
     * @param {string} key - the attribute name looking for
     * @return value of attribute if exists. null if not.
     */
    this.getEntityAttribute = function(vid, key){
        var entity = this.getEntity(vid);
        return (key in entity)?entity[key]: null;
    } 
    
    /**
     * set a vertex's attribute by value.
     * @param {string} vid - the vertex id looking for    
     * @param {string} key - the attribute name looking for
     * @param value = the attribute value which can be any thing. 
     */
    this.setEntityAttribute = function (vid, key, value) {
    	if(vid in this.VE) 
            this.getEntity(vid)[key]=value;
        else
            throw new Error(vid + " doesn't exists."); 
    }
    
    /**
     * check if id is of a vertex 
    */
    this.isVtx = function(id) {
        var ent = this.getEntity(id);
        if(ent) 
            return !((this.S_src in ent) && (this.S_dst in ent));
        else
            throw new Error(id + " doesn't exists.");
    }
    
    /**
     * check if id is of an edge  
    */
    this.isEdge = function(id) {
        var ent = this.getEntity(id);
        if(ent)
            return (this.S_src in ent) && (this.S_dst in ent);
        else
            throw new Error(id + " doesn't exists.");
    }
    /**
     * remove a vertex (along with connected edges optional) 
     * @param vid a vertex id
     * @param remove_linked_edge a boolean flag true for removing all connected edges from/to vid.
     */
    this.removeEntity = function(vid, remove_linked_edge) {
        if(vid in this.VE) { 
            if(remove_linked_edge) {
                var inE = this.inE(vid, null);
                //console.log("deleting all inE(" + vid +")\n"+ graphWriter.Eids2str(inE, this, null));

                var outE = this.outE(vid, null);
                //console.log("deleting all outE(" + vid +")\n"+ graphWriter.Eids2str(outE, this, null));
	            for(var key in inE)
                    this.removeEdge(inE[key]);
	            for(var key in outE)
	                this.removeEdge(outE[key]);
            }
            this.VE.remove(vid);
        }
        else {
            console.log("entity="+vid + " is not an entity of a graph. Warning!");
        }
    }  
    this.removeEdge = function(eid) {
        if(eid in this.VE) {  
            var srcid = this.getEdgeSource(eid);
            var dstid = this.getEdgeDestination(eid); 
            
            if(srcid in this.FE && this.FE[srcid].indexOf(eid) !== -1) {
                var i = this.FE[srcid].indexOf(eid);
                this.FE[srcid].splice(i, 1);
            }
                this.FE[srcid].remove(eid);
            if(dstid in this.BE && this.BE[dstid].indexOf(eid) !== -1){
                var i = this.BE[dstid].indexOf(eid);
                this.BE[dstid].splice(i, 1);
            } 
           
            this.VE.remove(eid);
        }
        else {
            console.log("entity="+eid + " is not an entity of a graph. Warning!");
        }
    }  
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////// Section 2. Vertex-related Methods ///////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
    /**
     * add a vertex.
     * @param {string} vid - the vertex id 
     * @return an object - the vertex attribute contain attributes: this.S_id:id.
     */
    this.addVtx = function(vid, attrs) { 
        var attributes={};
        for(var k in attrs) 
            attributes[k]=attrs[k];
        attributes[this.S_id]=vid;
        this.VE[vid]= attributes; 
        return attributes;
    } 
     
    /**
     * get all vertices satisfied by an checker.
     * @param {function} achecker - an edge checker for vertex selection 
     * @return a set of vertex ids. 
     */
    this.getVtxs = function(achecker) {
        var result = [];
        for(vid in this.VE) { 
            if(this.isVtx(vid)) {
                if(achecker != null) {   
                    if(achecker(this.VE[vid]))
                      result.push(vid); 
                }
                else
                    result.push(vid);
            } 
        }
        return result;
    }
    
   
    // /**
     // * get all root vertices in term of an edge checker.
     // * @param edgetype an edge checker for determining the roots. 
     // * @return a set of root vertex ids. 
     // */
    // this.getRootVtxs = function(vchecker, echecker) {
        // var answer = []
        // for(vtx in this.getVtxs(vchecker)) {
            // var Parents = this.inV(vtx, echecker);  
            // if(Parents == null || Parents.length == 0)
                // answer.push(vtx);
        // }
        // return answer;
    // }
    
    // /**
     // * get all leaf vertices in term of an edge checker.
     // * @param edgetype an edge checker for determining the roots. 
     // * @return a set of root vertex ids. 
     // */
    // this.getLeafVtxs = function(vchecker, echecker) {
        // var answer = []
        // for(vtx in this.getVtxs(vchecker)) {
            // var Children = this.outV(vtx, echecker);  
            // if(Children == null || Children.length == 0)
                // answer.push(vtx);
        // }
        // return answer;
    // }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////// End of Vertex-related Methods //////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////// Section 2. Edge-related Methods ////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     /**
     * add an edge.
     * @param {string} id - id for the edge. 
     * @param {string} src_id - a source id that can be for a vertex or an edge. 
     * @param {string} dst_id - a destination id that can be for a vertex or an edge. 
     * @throws Exception if src_id or dst_id doesn't exists in V or E. 
     * @return the edge attributes which contain attributes: S_id:id, S_dst:dst_id and S_src:src_id.
     */
    this.addEdge = function(id, src_id, dst_id, attrs) {
        if (id in this.VE)
            throw new Error("Edge "+id+" is already registered.");
        if ( !(src_id in this.VE ) )
            throw new Error("source "+src_id+" is not registered.");
        if ( !(dst_id in this.VE) )
            throw new Error("destination "+dst_id+" is not registered.");

        if ( !(src_id in this.FE) ) // src_id is not in FE yet
            this.FE[src_id]=[]; // put an array 
        if ( !(dst_id in this.BE) ) // dst_id is not in BE yet 
            this.BE[dst_id]=[]; // put an array  
        var edge = {};
        for(var k in attrs) 
            edge[k]=attrs[k];
        
        edge[this.S_id]=id; edge[this.S_dst]=dst_id; edge[this.S_src]=src_id;   
        
        this.VE[id]=edge;
        if (id in this.FE[src_id])
            console.log("Warning: Edge " + id+ " is already in FE["+src_id+"]!");
        else  {
            this.FE[src_id].push(id);
            if (id in this.BE[dst_id])
                console.log("Warning: " + id + " is already in BE["+dst_id+"]!");
            else { 
                this.BE[dst_id].push(id);
                //console.log(graphWriter.attr2str(edge) + " succeed!");
            }
        } 
        return edge;
    }
    
     /**
     * get all edges satisfied by an checker.
     * @param {function} achecker - an edge checker for vertex selection 
     * @return a set of edges ids. 
     */
    this.getEdges = function(achecker) {
        var result = [];
        for(vid in this.VE) { 
            if(this.isEdges(vid)) {
                if(achecker != null) {   
                    if(achecker(this.VE[vid]))
                      result.push(vid); 
                }
                else
                    result.push(vid);
            } 
        }
        return result;
    }
    
     /**
      * get the source of an edge 
      * @param {string} eid - the edge id. 
      * @return source id (indicating either one of a vertex or an edge). null if not available. 
      */
    this.getEdgeSource = function(eid) {
        return this.getEntityAttribute(eid, this.S_src); 
    }
    
    ///**
    // * set the source of an edge 
    // * @param {string} eid - the edge id
    // * @param {string} srcId - the source id which should be either one of id of a vertex or an edge 
    // */
    //this.setEdgeSource = function(eid, srcId) {
    //    this.setEntityAttribute(eid, this.S_src, srcId);
    //}
    /**
      * get the destination of an edge 
      * @param {string} edge - the edge id. 
      * @return destination id (indicating either one of a vertex or an edge). null if not available. 
      */
    this.getEdgeDestination = function(eid) {
        return this.getEntityAttribute(eid, this.S_dst); 
    }
    
     // /**
    // * set the destination of an edge 
    // * @param {string} eid - the edge id
    // * @param {string} dstId - the destination id which should be either one of id of a vertex or an edge 
    // */
    // this.setEdgeDestination = function(eid, dstId) {
        // this.setEntityAttribute(eid, this.S_dst, dstId);
    // } 
    
    
    /**
     * get a list of incoming edge ids.
     * @param {string} to_v a vertex id to which edges are coming in. 
     * @param echecker an edge checker. 
     * @return an array of incoming edge to to_v in terms of echecker. 
     */ 
    this.inE = function(to_v, echecker) { 
        var result = []
        if (!(to_v in this.VE)) {   
            throw new Error(to_v + " is not a vertex!"); 
        }
        else if (to_v in this.BE) {
            var edge_ids = this.BE[to_v];
            for (var ii=0; edge_ids && ii<edge_ids.length; ii++) {
                var edge_id = edge_ids[ii];
                var edge = this.VE[edge_id];
                if (echecker == null || echecker(edge))
                    result.push(edge_id);
            }
        }
        return result;
    } 
    /**
     * get a list of outgoing edge ids.
     * @param {string} from_v a vertex id from which edges are going from. 
     * @param echecker an edge checker. 
     * @return an array of outgoing edge from from_v in terms of echecker. 
     */ 
    this.outE = function(from_v, echecker) { 
        var result = [];
        if (!(from_v in this.VE ) ) {   
            throw new Error(from_v + " is not a vertex!"); 
        }
        else if (from_v in this.FE) {
            var edge_ids = this.FE[from_v];
            for (var ii=0; edge_ids && ii<edge_ids.length; ii++) {
                var edge_id = edge_ids[ii];
                var edge = this.VE[edge_id];
                if (echecker == null || echecker(edge))
                    result.push(edge_id);
            }
        }
        return result;
    } 
    /**
     * get all paths that have their final destination is to_v, and satisfy the optional condition echecker
     * @param to_v is the final destinations of all paths
     * @param echecker is an edge checker
     * @return the set of paths(sequence of edges) in which the destination of the last edge is to_v
     */
    this.TinE = function(to_v, echecker) { 
        var inE = this.inE(to_v,  echecker); // inE is an array 
        var result =[]; 
        for(var k in inE) {
            var ieid = inE[k]; // an input edge id to to_v in terms of echecker 
            var srcOfie = this.getEdgeSource(ieid); // the src vertex of ieid 
            var TinEofie = this.TinE(srcOfie, echecker); 
            if(TinEofie.length == 0) { 
                result.push([ieid]); // append path to result. 
            } else {
                for(var ii in TinEofie) { // for each path in TinEofie 
                    var iPathOfie = TinEofie[ii];
                    var path = iPathOfie.slice(); 
                    path.push(ieid); // append ieid to path  
                    result.push(path); // append path to result. 
                }
            } 
        }
        return result;
    } 
    
    /**
     * get all paths that have their origin is from_v, and satisfy the optional condition echecker
     * @param from_v is the origin of all paths
     * @param echecker is an edge checker
     * @return the set of paths(sequence of edges) in which the source of the edge is from_v
     */
    this.ToutE = function(from_v, echecker) { 
        var outE = this.outE(from_v,  echecker); // outE is an array 
        var result =[]; 
        for(var k in outE) {
            var oeid = outE[k]; // an output edge id from from_v in terms of echecker 
            var dstOfie = this.getEdgeDestination(oeid); // the destination vertex of oeid 
            var ToutEofoe = this.ToutE(dstOfie, echecker); 
            if(ToutEofoe.length == 0) {
                result.push([oeid]); // append path to result. 
            }
            else {
                for(var ii in ToutEofoe) { // for each path in ToutEofoe 
                    var oPathOfie = ToutEofoe[ii];
                    var path = oPathOfie.slice(); 
                    path.unshift(oeid);// add oeid first 
                    result.push(path); // append path to result. 
                }
            } 
        }
        return result;
    } 
     /**
     * get all source vertices that have their target as to_v, and satisfy the optional condition echecker
     * @param to_v
     * @param echecker
     * @return
     */
    this.inV = function(to_v, echecker) {
        var result = [];
        var BE = this.inE(to_v, echecker); // 
        for (var ii in BE) {
            var beid = BE[ii];
            var src_id = this.getEdgeSource(beid);
            if (src_id)
                result.push(src_id);
        }
        return result;
    }
    /**
     * get all destination vertices that have their target as from_v, and satisfy the optional condition echecker
     * @param from_v
     * @param echecker
     * @return
     */
    this.outV = function(from_v, echecker) {
        var result = [];
        var FE = this.outE(from_v, echecker); // 
        for (var ii in FE) {
            var feid = FE[ii];
            var dst_id = this.getEdgeDestination(feid);
            if (dst_id)
                result.push(dst_id);
        }
        return result;
    }
    /**
     * get all transitive inputting vertices of a vertex vtx in terms of edge type
     * @param vtx is a vertex
     * @param edgetype is the edge type
     * @return all transitive inputting vertices (always non null).
     */
    this.TinV = function(vtx, echecker) {
        var answer = [];
        var T = [vtx];  
        var Visited ={}; // map. 
        while(T.length>0) {
            var v = T[0]; T.shift();  Visited[v]=true;
            var iV = this.inV(v, echecker); // inV 
            for(var ii in iV) { 
                var v = iV[ii];
                answer.push(v);
                if( !(v in Visited) ) // v has not been visited yet. 
                    T.push(v);
            }// for 
        }// while 
        return answer;
    }
    /**
     * get all transitive outputting vertices of a vertex vtx in terms of edge type
     * @param vtx is a vertex
     * @param edgetype is the edge type
     * @return all transitive outputting vertices (always non null).
     */
    this.ToutV = function(vtx, echecker) {
        var answer = [];
        var T = [vtx];  
        var Visited ={}; // map. 
        while(T.length>0) {
            var v = T[0]; T.shift();  Visited[v]=true;
            var oV = this.outV(v, echecker); // inV 
            for(var ii in oV) { 
                var v = oV[ii];
                answer.push(v);
                if( !(v in Visited) ) // v has not been visited yet. 
                    T.push(v);
            }// for 
        }// while 
        return answer;
    }
} // end of SAG.Graph 
