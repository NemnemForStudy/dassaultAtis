var keys = null;
var parseJSON = function(AttributeString){
    try{
        return JSON.parse(AttributeString);
    }
    catch(e){
        AttributeString = AttributeString.replaceAll("'", '"');        
        try{
            return  JSON.parse(AttributeString);
        }
        catch(e){
            return AttributeString;
        }
    }
};

var getChildElements = function(element){
    var result = {};
    var children = $(element).children();
    
    for(var i = 0; i < children.length; i++){
        var child = children[i];
        result[child.localName]=parseAttribute(child.innerText);
    }
    return result;
};

var getLevel = function(vertex, SemGraph){
   var level = 0;
   var recursiveSearch = function(vertexID){
      //Should only be one right?....
      var edgeIDS = SemGraph.inE(vertexID, function(edge){
                      return (edge.type == "Hierarchy")
                  });
      
      var parentVtxID = null
      if(edgeIDS[0] !== undefined && edgeIDS[0] !== null){
          parentVtxID = SemGraph.getEdgeSource(edgeIDS[0]);
          level++;
          recursiveSearch(parentVtxID);
      }
   };
   recursiveSearch(vertex[keys.idString]);
   return level;
}



var parseXMLToSemanticGraph = function(xmlString, existingGraph){
  if(!keys){
      keys = {};
      
      var $idElement = $(xmlString).find("IdentificationString");
      if($idElement.length > 0){
          keys.idString = $idElement.text();
          keys.idString = (keys.idString != "" ? keys.idString : "id");
      }
      
      var $EdgeSourceElement = $(xmlString).find("EdgeSourceString");
      if($EdgeSourceElement.length > 0){
          keys.EdgeSourceString = $EdgeSourceElement.text();
          keys.EdgeSourceString = (keys.EdgeSourceString != "" ? keys.EdgeSourceString : "src");
      }
      
      var $EdgeDestinationString = $(xmlString).find("EdgeDestinationString");
      if($EdgeDestinationString){
          keys.EdgeDestinationString =$EdgeDestinationString.text();
          keys.EdgeDestinationString = (keys.EdgeDestinationString != "" ? keys.EdgeDestinationString : "dst");
      }
  }
  
  var graph;
  if(!existingGraph){
      graph = new SAGraph( keys.idString, keys.EdgeSourceString, keys.EdgeDestinationString);
  }
  else{
      graph = existingGraph;
  }
  
  var entities = $(xmlString).find("entity");
  var lastid = 0;
  var edgeTypes = ["Hierarchy", "Precedence", "Require"];
  var JsonEnteties = {};
  //first need to parse the xml to break out all the enteties
  $.each(entities, function(idx, value){
      var jsonEntity = handleEntity(value);
      jsonEntity[keys.idString] = jsonEntity[keys.idString] ? jsonEntity[keys.idString] : lastid++;
      
      //organize by type then by id
      if(jsonEntity.type){
          if(!JsonEnteties[jsonEntity.type])
              JsonEnteties[jsonEntity.type] = {};
          if(jsonEntity[keys.idString] !== undefined && jsonEntity[keys.idString] !== null){
              JsonEnteties[jsonEntity.type][jsonEntity[keys.idString]]=jsonEntity;
          }
          else{
              JsonEnteties[jsonEntity.type][lastid]=jsonEntity;
          }
      }
      //if there isn't a type then we can't do anything with it anyway
  });
  
  //add all the vertecies first
  $.each(JsonEnteties, function(type, aggregate){
      //need to add all the vertecies first
      
      if($.inArray(type, edgeTypes) == -1){
          //this is a vertex type group
          $.each(aggregate, function(id,entity){
              if(graph && graph.VE[entity[keys.idString]])
                  $.extend(true, graph.VE[entity[keys.idString]], entity);
              else
                  graph.addVtx(entity[keys.idString], entity);
          });
      }
  });
  
  //now add all the edges
  $.each(JsonEnteties, function(type, aggregate){
      //need to add all the vertecies first
      if($.inArray(type, edgeTypes) > -1){
          $.each(aggregate, function(id,entity){
              if(graph && graph.VE[entity[keys.idString]]){
                  $.extend(true, graph.VE[entity[keys.idString]], entity);
              }
              else{
                  graph.addEdge(entity[keys.idString], 
                          entity[keys.EdgeSourceString], 
                          entity[keys.EdgeDestinationString], 
                          entity);
              }
          });
      }
  });
  return graph;
};

var parseAttribute = function(AttributeString){
    var firstChar = AttributeString.charAt(0);
    if(firstChar != '{' && firstChar != '[')
        return AttributeString;
    else
        return parseJSON(AttributeString);
};

var handleEntity = function(element){
    return getChildElements(element);
};

var parseDateTime = function(dateTimeStr){
    return new Date(dateTimeStr);
};

var xml2SemanticGraphParser = function(ContraintFile, ScheduleFile, parseFinishedCallBack){
    var that = this;
    this.graph = null;
    //load the constraints file
    
    //first load the contraints
    var frConstraint = new FileReader();
    frConstraint.onload = function(){
        var LoadConstraintsfileList = frConstraint.result;
        that.graph = parseXMLToSemanticGraph(LoadConstraintsfileList, that.graph);
        that.ConstraintsFileLoaded = true;
        //Then load the results file
        var frResults = new FileReader();
        frResults.onload = function(){
            var LoadResultsfileList = frResults.result;
            that.graph = parseXMLToSemanticGraph(LoadResultsfileList, that.graph);
            that.ResultsFileLoaded = true;
            if(that.ConstraintsFileLoaded && that.ResultsFileLoaded){
                parseFinishedCallBack({graph:that.graph});
            }
        };
        
        frResults.readAsText(ScheduleFile);
    };
    frConstraint.readAsText(ContraintFile);
    
    
    
    
    return this;
}

