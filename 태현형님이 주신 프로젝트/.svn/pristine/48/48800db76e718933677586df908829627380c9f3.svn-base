//===================================================================
// COPYRIGHT DASSAULT SYSTEMES 2015/10/14
//===================================================================
define('DS/CATCDSLoader/CATCDSJSONLoader', [], function () {

  var Loader = function () {
    function Size(obj) {
      var n = 0;
      for (var key in obj)
        n++;
      return n;
    }

    function HashTable() {
      Object.defineProperty(this, "length", {
        get: function () {
          var n = 0;
          for (var key in this) {
            n++;
          }
          return n;
        }
      });
    }

    var aRigidSetNames;
    var aGeometryLeafNames;
		var aConstraintNames;
		var aVariableNames;
	    var aSketches;
		var movingVariables;
		var movingVariableValues;
		var nameToCompareWith;


		//Load JSON file
		this.LoadJSONFile = function (JSONVar, CATCDS, solver) {

		  //Pour generer cdsreplay, traces, etc
		  if (typeof window.__karma__ !== "undefined" && window.__karma__.config.json.CATCDSReplayMode !=="" && Number(window.__karma__.config.json.CATCDSReplayMode) >0 )
		  {
		    solver.SetReplayMode(CATCDS.CATCDSReplayMode.rmREPLAY);
		    if (window.__karma__.config.json.CATCDSTraceLevel!=="")
		      solver.SetTraceLevel(Number(window.__karma__.config.json.CATCDSTraceLevel));
		    if (window.__karma__.config.json.CheckMode !=="")
		      solver.SetCheckMode(true);
		    solver.SetReplayMethod(window.__karma__.config.json.CATCDSReplayMethod); //la methode prend directement une chaine de car en argument. A mettre apres le setReplayMode sinon setReplayMode va ecraser choix de replayMethod
		  }
		  else
		    solver.SetReplayMode(CATCDS.CATCDSReplayMode.rmNONE);

		  var loadResult = 0;

      //initilisation
		  aRigidSetNames = new HashTable();
		  aGeometryLeafNames = new HashTable();
		  aConstraintNames = new HashTable();
		  aVariableNames = new HashTable();
		  aSketches = new HashTable();
		  movingVariables = [];
		  movingVariableValues = [];

		  if (typeof JSONVar.rigidsets != 'undefined') {
		    var cdsFactory = solver.GetFactory();
		    for (var i = 0; i < JSONVar.rigidsets.length; i++) {
		      var currentRigidSet = JSONVar.rigidsets[i];
		      var rs = CATCDS.CATICDSRigidSet.Create(cdsFactory);
		      var rsName = currentRigidSet.name;
		      if (rsName == "") {
		        console.log("error loading rigidSets");
		        return 1;
		      }
		      rs.SetName(rsName);
		      aRigidSetNames[rsName] = rs;
		      if (currentRigidSet.fixed === true)
		        rs.FixToggle();
		      if (currentRigidSet.fixed2D === true)
		        rs.FixToggle2D();
		      if (typeof currentRigidSet.softFixed !== 'undefined')
		        rs.SetFixationStiffness(currentRigidSet.softFixed);
		      if (typeof currentRigidSet.softFixed2D !== 'undefined')
		        rs.SetFixationStiffness2D(currentRigidSet.softFixed2D);
		    }
		  }
		  if (typeof JSONVar.sketches !== 'undefined') {
		    var i = 0;
		    for (i = 0; i < JSONVar.sketches.length; i++) {
		      var cdsFactory = solver.GetFactory();
		      var skOrigin = JSONVar.sketches[i].origin;
		      var skAxisOX = JSONVar.sketches[i].axisOX;
		      var skAxisOY = JSONVar.sketches[i].axisOY;
		      var sk = CATCDS.CATICDSSketch.Create(cdsFactory, skOrigin, skAxisOX, skAxisOY);
		      var skName = JSONVar.sketches[i].name
		      sk.SetName(skName);
		      aSketches[skName] = sk;
		      aGeometryLeafNames[sk.GetName()] = sk;
		      var rigidSetName=JSONVar.sketches[i].rigidSet;
		      if (typeof rigidSetName != 'undefined')
		      {
		        if (typeof aRigidSetNames[rigidSetName] != 'undefined')
		          aRigidSetNames[rigidSetName].AddGeometry(sk);
		        else {
		          console.log("error adding a sketch to a rigid set");
		          return 1;
		        }
		      }
		      if (JSONVar.sketches[i].fixed === true)
		        sk.FixToggle();
		      if (typeof JSONVar.sketches[i].softFixed !== 'undefined')
		        solver.SetFixationStiffness(sk, JSONVar.sketches[i].softFixed);
		    }
		  }

		  if (typeof JSONVar.variables != 'undefined') { //besoin de charger les variables avt les objets car les curves ont des variables
		    for (var i = 0; i < JSONVar.variables.length; i++) {
		      loadResult += LoadVariable(JSONVar.variables[i], JSONVar, CATCDS, solver);
		    }
		  }

		  if (typeof JSONVar.objects != 'undefined') {
			  for (var i = 0; i < JSONVar.objects.length; i++) {
			    loadResult = LoadObject(i, JSONVar, CATCDS, solver);
			  }
		  }

		  if (typeof JSONVar.joints != 'undefined') {
		    for (var i = 0; i < JSONVar.joints.length; i++) {
		      loadResult += LoadJoint(JSONVar.joints[i], CATCDS, solver);
		    }
		  }

		  if (typeof JSONVar.patterns != 'undefined') {
			      for (var i = 0; i < JSONVar.patterns.length; i++) {
			          loadResult+= LoadPattern(JSONVar.patterns[i], CATCDS, solver);
			      }
			  }

			
		  loadResult += LoadConstraints(JSONVar, CATCDS, solver);

      if (typeof JSONVar.equations != 'undefined') {
		    for (var i = 0; i < JSONVar.equations.length; i++) {
				    loadResult+= LoadEquation(JSONVar.equations[i], CATCDS, solver);
		    }
	    }

		  if (typeof JSONVar.offsetConstraints != 'undefined') {
			  for (var i = 0; i < JSONVar.offsetConstraints.length; i++) {
				    loadResult+= LoadOffsetConstraint(JSONVar.offsetConstraints[i], CATCDS, solver);
			  }
		  }

		  if (typeof JSONVar.movingEntities != 'undefined') {
			  for (var i = 0; i < JSONVar.movingEntities.length; i++) {
			    loadResult += LoadMovingEntity(JSONVar.movingEntities[i], CATCDS, solver);
			  }
			  solver.SetTargetValues(movingVariables, movingVariableValues); //enregistre les movingVariable et leur valeur
		  }

		  if (typeof JSONVar.movedEntities != 'undefined') {
			  for (var i = 0; i < JSONVar.movedEntities.length; i++) {
			    loadResult+= LoadMovedEntity(JSONVar.movedEntities[i], CATCDS, solver);
			  }
		  }

			if (typeof JSONVar.options != 'undefined') {
			    loadResult+= LoadOption(JSONVar.options, CATCDS, solver);
			}

			return loadResult;
		};

    //fonction auxiliaire pr trouver ou se trouve l'objet ds le vecteur json. Attention, bien mettre a jour la variable nameToCompareWith avt chaque appel à checkName
		checkName = function (iObject) { 
		  return iObject.name === nameToCompareWith;
		}

		//Load objects
		LoadObject = function (index, json, CATCDS, solver) {
		  var object = json.objects[index];

		  if ( typeof aGeometryLeafNames[object.name]!== 'undefined')
		    return 0; //l'objet a deja ete creee donc on ne fait rien

		  if (typeof object.type == 'undefined'){
		      console.log("error loading object type");
		      return 1;
			}

			var obj;

			if (typeof json.objectMapping != 'undefined') {
				for (i = 0; i < json.objectMapping.length; i++) {
					
					var geom2dName = json.objectMapping[i].geom2d;
					var geom2d = aGeometryLeafNames[geom2dName];
					if (geom2dName == object.name)
					{
						var refSketch = json.objectMapping[i].refSketch;
						var geom3dName = json.objectMapping[i].geom3d;
						var geom3d = aGeometryLeafNames[geom3dName];
						var sk = aGeometryLeafNames[refSketch];
						solver.Create2DRep(sk, geom3d);
						obj = solver.Get2DRep(sk, geom3d);
						object.type = "mapping";
						break;
					}
				}
			}



			var cdsFactory = solver.GetFactory();

			if (typeof object.sketch != 'undefined') {
			  CurrentSk = aSketches[object.sketch];
			  if (typeof CurrentSk === 'undefined')
			    return 1;
			  else
			    solver.SetSketch(CurrentSk);
			}

			switch (object.type) {
			  case "point":
			  solver.SetSketch(null); // voir si ok (je ne mets pas de currentSketch pr ts les objets 3D)
				var coords = [];
				if (typeof object.coords.x == 'undefined' || typeof object.coords.y == 'undefined' || typeof object.coords.z == 'undefined') {
				    console.log("error loading point");
				    return 1;
				}
				coords.push(object.coords.x);
				coords.push(object.coords.y);
				coords.push(object.coords.z);
				obj = CATCDS.CATICDSPoint.Create(cdsFactory, coords[0], coords[1], coords[2]);
				break;

			  case "axis":
			  solver.SetSketch(null);
				var origin = [];
				if (typeof object.origin.x == 'undefined' || typeof object.origin.y == 'undefined' || typeof object.origin.z == 'undefined') {
				    console.log("error loading axis");
				    return 1;
				}

				origin.push(object.origin.x);
				origin.push(object.origin.y);
				origin.push(object.origin.z);

				var vector1 = [];
				if (typeof object.vector1.x == 'undefined' || typeof object.vector1.y == 'undefined' || typeof object.vector1.z == 'undefined') {
				    console.log("error loading axis vector1");
				    return 1;
				}

				vector1.push(object.vector1.x);
				vector1.push(object.vector1.y);
				vector1.push(object.vector1.z);

				var vector2 = [];
				if (typeof object.vector2.x == 'undefined' || typeof object.vector2.y == 'undefined' || typeof object.vector2.z == 'undefined') {
				    console.log("error loading axis vector2");
				    return 1;
				}

				vector2.push(object.vector2.x);
				vector2.push(object.vector2.y);
				vector2.push(object.vector2.z);

				var vector3 = [];
				if (typeof object.vector3.x == 'undefined' || typeof object.vector3.y == 'undefined' || typeof object.vector3.z == 'undefined') {
				    console.log("error loading axis vector3");
				    return 1;
				}

				vector3.push(object.vector3.x);
				vector3.push(object.vector3.y);
				vector3.push(object.vector3.z);

				obj = CATCDS.CATICDSAxis.Create(cdsFactory, origin[0], origin[1], origin[2], vector1[0], vector1[1], vector1[2], vector2[0], vector2[1], vector2[2], vector3[0], vector3[1], vector3[2]);

				break;
			case "cylinder":
			  solver.SetSketch(null);
				var origin = [];
				if (typeof object.origin.x == 'undefined' || typeof object.origin.y == 'undefined' || typeof object.origin.z == 'undefined') {
				    console.log("error loading cylinder");
				    return 1;
				}

				origin.push(object.origin.x);
				origin.push(object.origin.y);
				origin.push(object.origin.z);

				var direction = [];
				if (typeof object.direction.x == 'undefined' || typeof object.direction.y == 'undefined' || typeof object.direction.z == 'undefined') {
				    console.log("error loading cylinder direction");
				    return 1;
				}

				direction.push(object.direction.x);
				direction.push(object.direction.y);
				direction.push(object.direction.z);

				if (typeof object.radius == 'undefined') {
				    console.log("error loading cylinder radius");
				    return 1;
				}

				var radius = object.radius;

				obj = CATCDS.CATICDSCylinder.Create(cdsFactory, origin[0], origin[1], origin[2], direction[0], direction[1], direction[2], radius);
				break;
			case "cone":
			  var origin = [];
			  solver.SetSketch(null);
				if (typeof object.origin.x == 'undefined' || typeof object.origin.y == 'undefined' || typeof object.origin.z == 'undefined') {
				    console.log("error loading cone");
				    return 1;
				}

				origin.push(object.origin.x);
				origin.push(object.origin.y);
				origin.push(object.origin.z);

				var direction = [];
				if (typeof object.direction.x == 'undefined' || typeof object.direction.y == 'undefined' || typeof object.direction.z == 'undefined') {
				    console.log("error loading cone direction");
				    return 1;
				}

				direction.push(object.direction.x);
				direction.push(object.direction.y);
				direction.push(object.direction.z);

				if (typeof object.angle == 'undefined') {
				    console.log("error loading cone angle");
				    return 1;
				}

				var angle = object.angle;

				obj = CATCDS.CATICDSCone.Create(cdsFactory, origin[0], origin[1], origin[2], direction[0], direction[1], direction[2], angle);
				break;
			case "plane":
			  var origin = [];
			  solver.SetSketch(null);
				if (typeof object.origin.x == 'undefined' || typeof object.origin.y == 'undefined' || typeof object.origin.z == 'undefined') {
				    console.log("error loading plane");
				    return 1;
				}

				origin.push(object.origin.x);
				origin.push(object.origin.y);
				origin.push(object.origin.z);

				var normal = [];
				if (typeof object.normal.x == 'undefined' || typeof object.normal.y == 'undefined' || typeof object.normal.z == 'undefined') {
				    console.log("error loading plane normal");
				    return 1;
				}

				normal.push(object.normal.x);
				normal.push(object.normal.y);
				normal.push(object.normal.z);

				obj = CATCDS.CATICDSPlane.Create(cdsFactory, origin[0], origin[1], origin[2], normal[0], normal[1], normal[2]);
				break;
			case "sphere":
			  var center = [];
			  solver.SetSketch(null);
				if (typeof object.center.x == 'undefined' || typeof object.center.y == 'undefined' || typeof object.center.z == 'undefined') {
				    console.log("error loading sphere center");
				    return 1;
				}

				center.push(object.center.x);
				center.push(object.center.y);
				center.push(object.center.z);

				if (typeof object.radius == 'undefined') {
				    console.log("error loading sphere radius");
				    return 1;
				}

				var radius = object.radius;

				obj = CATCDS.CATICDSSphere.Create(cdsFactory, center[0], center[1], center[2], radius);
				break;
			case "torus":
			  var center = [];
			  solver.SetSketch(null);
				if (typeof object.center.x == 'undefined' || typeof object.center.y == 'undefined' || typeof object.center.z == 'undefined') {
				    console.log("error loading torus center");
				    return 1;
				}

				center.push(object.center.x);
				center.push(object.center.y);
				center.push(object.center.z);

				var normal = [];
				if (typeof object.normal.x == 'undefined' || typeof object.normal.y == 'undefined' || typeof object.normal.z == 'undefined') {
				    console.log("error loading torus normal");
				    return 1;
				}

				normal.push(object.normal.x);
				normal.push(object.normal.y);
				normal.push(object.normal.z);

				if (typeof object.majorRadius == 'undefined') {
				    console.log("error loading torus major radius");
				    return 1;
				}

				var majorRadius = object.majorRadius;

				if (typeof object.minorRadius == 'undefined') {
				    console.log("error loading torus minor radius");
				    return 1;
				}

				var minorRadius = object.minorRadius;

				obj = CATCDS.CATICDSTorus.Create(cdsFactory, center[0], center[1], center[2], normal[0], normal[1], normal[2], majorRadius, minorRadius);
				break;
			case "line":
			  var origin = [];
			  solver.SetSketch(null);
				if (typeof object.origin.x == 'undefined' || typeof object.origin.y == 'undefined' || typeof object.origin.z == 'undefined') {
				    console.log("error loading line origin");
				    return 1;
				}
				origin.push(object.origin.x);
				origin.push(object.origin.y);
				origin.push(object.origin.z);

				var direction = [];
				if (typeof object.direction.x ==='undefined' || typeof object.direction.y === 'undefined' || typeof object.direction.z === 'undefined') {
				    console.log("error loading line direction");
				    return 1;
				}
				direction.push(object.direction.x);
				direction.push(object.direction.y);
				direction.push(object.direction.z);

				obj = CATCDS.CATICDSLine.Create(cdsFactory, origin[0], origin[1], origin[2], direction[0], direction[1], direction[2]);
				break;
			case "circle":
			  var center = [];
			  solver.SetSketch(null);
				if (typeof object.center.x == 'undefined' || typeof object.center.y == 'undefined' || typeof object.center.z == 'undefined') {
				    console.log("error loading circle center");
				    return 1;
				}

				center.push(object.center.x);
				center.push(object.center.y);
				center.push(object.center.z);

				var normal = [];
				if (typeof object.normal.x == 'undefined' || typeof object.normal.y == 'undefined' || typeof object.normal.z == 'undefined') {
				    console.log("error loading circle normal");
				    return 1;
				}

				normal.push(object.normal.x);
				normal.push(object.normal.y);
				normal.push(object.normal.z);

				if (typeof object.radius == 'undefined') {
				    console.log("error loading circle radius");
				    return 1;
				}

				var radius = object.radius;

				obj = CATCDS.CATICDSCircle.Create(cdsFactory, center[0], center[1], center[2], normal[0], normal[1], normal[2], radius);
				break;
			case "ellipse":
			  var center = [];
			  solver.SetSketch(null);
				if (typeof object.center.x == 'undefined' || typeof object.center.y == 'undefined' || typeof object.center.z == 'undefined') {
				    console.log("error loading ellipse center");
				    return 1;
				}

				center.push(object.center.x);
				center.push(object.center.y);
				center.push(object.center.z);

				var direction = [];
				if (typeof object.direction.x == 'undefined' || typeof object.direction.y == 'undefined' || typeof object.direction.z == 'undefined') {
				    console.log("error loading ellipse direction");
				    return 1;
				}

				direction.push(object.direction.x);
				direction.push(object.direction.y);
				direction.push(object.direction.z);

				var normal = [];
				if (typeof object.normal.x == 'undefined' || typeof object.normal.y == 'undefined' || typeof object.normal.z == 'undefined') {
				    console.log("error loading ellipse normal");
				    return 1;
				}

				normal.push(object.normal.x);
				normal.push(object.normal.y);
				normal.push(object.normal.z);

				if (typeof object.majorRadius == 'undefined') {
				    console.log("error loading ellipse major radius");
				    return 1;
				}

				var majorRadius = object.majorRadius;

				if (typeof object.minorRadius == 'undefined') {
				    console.log("error loading ellipse minor radius");
				    return 1;
				}

				var minorRadius = object.minorRadius;

				obj = CATCDS.CATICDSEllipse.Create(cdsFactory, center[0], center[1], center[2], direction[0], direction[1], direction[2], normal[0], normal[1], normal[2], majorRadius, minorRadius);
				break;
			case "parabola":
				break;
			case "hyperbola":
				break;
			case "point2D":
				var coords = [];
				if (typeof object.coords.x == 'undefined' || typeof object.coords.y == 'undefined') {
				    console.log("error loading point2D");
				    return 1;
				}

				coords.push(object.coords.x);
				coords.push(object.coords.y);

				obj = CATCDS.CATICDSPoint2D.Create(cdsFactory, coords[0], coords[1]);
				break;
			case "line2D":
				var origin = [];
				if (typeof object.origin.x == 'undefined' || typeof object.origin.y == 'undefined') {
				    console.log("error loading line2D origin");
				    return 1;
				}

				origin.push(object.origin.x);
				origin.push(object.origin.y);

				var direction = [];
				if (typeof object.direction.x == 'undefined' || typeof object.direction.y == 'undefined') {
				    console.log("error loading line2D direction");
				    return 1;
				}

				direction.push(object.direction.x);
				direction.push(object.direction.y);

				obj = CATCDS.CATICDSLine2D.Create(cdsFactory, origin[0], origin[1], direction[0], direction[1]);
				break;
			case "circle2D":
				var center = [];
				if (typeof object.center.x == 'undefined' || typeof object.center.y == 'undefined' || typeof object.center.z != 'undefined') {
				    console.log("error loading circle center");
				    return 1;
				}

				center.push(object.center.x);
				center.push(object.center.y);

				if (typeof object.radius == 'undefined') {
				    console.log("error loading circle radius");
				    return 1;
				}

				var radius = object.radius;

				obj = CATCDS.CATICDSCircle2D.Create(cdsFactory, center[0], center[1], radius);
				break;
			case "ellipse2D":
				var center = [];
				if (typeof object.center.x == 'undefined' || typeof object.center.y == 'undefined') {
				    console.log("error loading circle center");
				    return 1;
				}

				center.push(object.center.x);
				center.push(object.center.y);

				var direction = [];
				if (typeof object.direction.x == 'undefined' || typeof object.direction.y == 'undefined') {
				    console.log("error loading ellipse direction");
				    return 1;
				}

				direction.push(object.direction.x);
				direction.push(object.direction.y);

				if (typeof object.majorRadius == 'undefined') {
				    console.log("error loading ellipse major radius");
				    return 1;
				}

				var majorRadius = object.majorRadius;

				if (typeof object.minorRadius === 'undefined') {
				    console.log("error loading ellipse minor radius");
				    return 1;
				}

				var minorRadius = object.minorRadius;

				obj = CATCDS.CATICDSEllipse2D.Create(cdsFactory, center[0], center[1], direction[0], direction[1], majorRadius, minorRadius);
				break;

			  case "axis2D":
			    if (typeof object.origin==='undefined' || typeof object.vector1==='undefined' || typeof object.vector2==='undefined')
			      return 1;
			    obj = CATCDS.CATICDSAxis2D.Create(cdsFactory, object.origin.x, object.origin.y, object.vector1.x, object.vector1.y, object.vector2.x, object.vector2.y);
			    break;
			case "interpolationNurbsCurve2D":
			  obj = LoadInterpol(object, CATCDS, solver, true); 
			  break;
			case "interpolationNurbsCurve":
			  solver.SetSketch(null);
			  obj = LoadInterpol(object, CATCDS, solver, false);
			  break;
      case "conicarc2D":
        obj = LoadNurbsConicArc2D(object, CATCDS, solver);
        break;
      case "nurbsCurve2D" :
        obj = LoadNurbsCurve2DOr3D(object, CATCDS, solver, true);
        break;
			case "nurbsCurve":
			  solver.SetSketch(null);
			  obj = LoadNurbsCurve2DOr3D(object, CATCDS, solver, false);
			  break;
			case "profile2D":
			  obj = LoadProfile(index, json, CATCDS, solver);
			  break;
			case "offsetCurve2D":
			    obj = LoadOffsetCurve2D(object, CATCDS, solver); //attention, necessite que des profiles soient dja charges.
			  break;
			case "parabola2D":
				break;
			case "hyperbola2D":
				break;
			}

			if (!obj)
			  return 1;

			if (typeof object.fixed != 'undefined')
			    obj.FixToggle();

			if (typeof object.fixed2D != 'undefined')
			  obj.FixToggle2D();

			if (typeof object.softFixed != 'undefined')
			  solver.SetFixationStiffness(obj, object.softFixed);

			if (typeof object.softFixed2D != 'undefined')
			  solver.SetFixationStiffness2D(obj,object.softFixed2D);

			if (typeof object.rigidSet != 'undefined')
			{
			    if (typeof aRigidSetNames[object.rigidSet] != 'undefined')
			        aRigidSetNames[object.rigidSet].AddGeometry(obj);
			    else {
			        console.log("error adding an object to a rigid set");
			        return 1;
			    }
			}
			
			var objName = object.name;
			if (typeof objName != 'undefined') {
			  obj.SetName(objName);
			  aGeometryLeafNames[objName] = obj;
      }

			return 0;
		};

		//Load variables
		LoadVariable = function (variableJSON, json, CATCDS, solver) {
			if (typeof variableJSON.type == 'undefined')
			{
			    console.log("error loading variable");
			    return 1;
			}

			var cdsFactory = solver.GetFactory();
			var type;
			switch (variableJSON.type) {
			case 'free':
				type = CATCDS.CATCDSVariableType.vtFREE;
				break;
			case 'angle':
				type = CATCDS.CATCDSVariableType.vtANGLE;
				break;
			case 'distance':
				type = CATCDS.CATCDSVariableType.vtDISTANCE;
				break;
			case 'curvature':
				type = CATCDS.CATCDSVariableType.vtCURVATURE;
				break;
			}

			var variable = CATCDS.CATICDSVariable.Create(cdsFactory, type);

			if (!variable)
			{
			    console.log("error  : could not create variable");
			    return 1;
			}

			variable.SetValue(variableJSON.value);
			variable.SetTolerance(variableJSON.tolerance);

			if (typeof variableJSON.fixed != 'undefined') {
				variable.Fix();
			}

			var hasLow = false,
			hasUp = false;
			var low = 0.,
			up = 0.;

			if (typeof variableJSON.low !== 'undefined') {
				hasLow = true;
				low =variableJSON.low;
			}
			if (typeof variableJSON.up !== 'undefined') {
				hasUp = true;
				up = variableJSON.up;
			}

			variable.SetLimitsActivity(hasLow, hasUp);
			variable.SetLimits(low, up);
      
			if (typeof variableJSON.name != 'undefined') {
			  var varName = variableJSON.name;
			  variable.SetName(varName);
			  aVariableNames[varName] = variable;
		}
			return 0;
		}

    //load joint
		LoadJoint = function (jointJSON, CATCDS, solver) {
		  if (typeof jointJSON.type === 'undefined' || typeof jointJSON.name === 'undefined' || typeof jointJSON.axis1 ==='undefined' ||typeof jointJSON.axis2 ==='undefined'  ) {
		    console.log("error loading joint");
		    return 1;
		  }
		  if (!aGeometryLeafNames[jointJSON.axis1] || !aGeometryLeafNames[jointJSON.axis2])
		    return 1; 
		  var pJoint;
		  if (jointJSON.type === 'fullDOF') {
		    if (typeof jointJSON.length1 === 'undefined' || typeof jointJSON.length2 === 'undefined' ||  typeof jointJSON.length3 === 'undefined' || 
          typeof jointJSON.angle1 === 'undefined' || typeof jointJSON.angle2 === 'undefined' || typeof jointJSON.sphType === 'undefined') {
		      console.log("error loading joint");
		      return 1;
		    }
		    if (aVariableNames[jointJSON.length1] && aVariableNames[jointJSON.length2] && aVariableNames[jointJSON.length3] && aVariableNames[jointJSON.angle1] && aVariableNames[jointJSON.angle2] && aVariableNames[jointJSON.angle3])
        {
          if (jointJSON.sphType === 'zxy')
            pJoint = CATCDS.CATICDSFullDOFJoint.Create(solver.GetFactory(), aGeometryLeafNames[jointJSON.axis1], aGeometryLeafNames[jointJSON.axis2], CATCDS.CATCDSSphericalType.stZXY, aVariableNames[jointJSON.length1],
            aVariableNames[jointJSON.length2], aVariableNames[jointJSON.length3], aVariableNames[jointJSON.angle1], aVariableNames[jointJSON.angle2], aVariableNames[jointJSON.angle3]);
          else if (jointJSON.sphType === 'zyx')
            pJoint = CATCDS.CATICDSFullDOFJoint.Create(solver.GetFactory(), aGeometryLeafNames[jointJSON.axis1], aGeometryLeafNames[jointJSON.axis2], CATCDS.CATCDSSphericalType.stZYX, aVariableNames[jointJSON.length1],
            aVariableNames[jointJSON.length2], aVariableNames[jointJSON.length3], aVariableNames[jointJSON.angle1], aVariableNames[jointJSON.angle2], aVariableNames[jointJSON.angle3]);
          else if (jointJSON.sphType === 'zxz')
            pJoint = CATCDS.CATICDSFullDOFJoint.Create(solver.GetFactory(), aGeometryLeafNames[jointJSON.axis1], aGeometryLeafNames[jointJSON.axis2], CATCDS.CATCDSSphericalType.stZXZ, aVariableNames[jointJSON.length1],
            aVariableNames[jointJSON.length2], aVariableNames[jointJSON.length3], aVariableNames[jointJSON.angle1], aVariableNames[jointJSON.angle2], aVariableNames[jointJSON.angle3]);
          else if (jointJSON.sphType === 'pointpoint')
            pJoint = CATCDS.CATICDSFullDOFJoint.Create(solver.GetFactory(), aGeometryLeafNames[jointJSON.axis1], aGeometryLeafNames[jointJSON.axis2], CATCDS.CATCDSSphericalType.stPOINTPOINT, aVariableNames[jointJSON.length1],
            aVariableNames[jointJSON.length2], aVariableNames[jointJSON.length3], aVariableNames[jointJSON.angle1], aVariableNames[jointJSON.angle2], aVariableNames[jointJSON.angle3]);
        }
		  }
		  else if (jointJSON.type === 'cylindrical') {
		    if (typeof jointJSON.length === 'undefined' || typeof jointJSON.angle === 'undefined') {
		      console.log("error loading joint");
		      return 1;
		    }
		    if (aVariableNames[jointJSON.length] && aVariableNames[jointJSON.angle] )
		      pJoint = CATCDS.CATICDSCylindricalJoint.Create(solver.GetFactory(), aGeometryLeafNames[jointJSON.axis1], aGeometryLeafNames[jointJSON.axis2], aVariableNames[jointJSON.angle], aVariableNames[jointJSON.length]);
		  }
		  else if (jointJSON.type === 'revolute') {
		    if (typeof jointJSON.angle === 'undefined') {
		      console.log("error loading joint");
		      return 1;
		    }
		    if (aVariableNames[jointJSON.angle] )
		      pJoint = CATCDS.CATICDSRevoluteJoint.Create(solver.GetFactory(), aGeometryLeafNames[jointJSON.axis1], aGeometryLeafNames[jointJSON.axis2], aVariableNames[jointJSON.angle]);
		  }
		  else if (jointJSON.type === 'prismatic') {
		    if (typeof jointJSON.length === 'undefined')
		    {
		      console.log("error loading joint");
		      return 1;
		    }
		    if (aVariableNames[jointJSON.length])
		      pJoint = CATCDS.CATICDSPrismaticJoint.Create(solver.GetFactory(), aGeometryLeafNames[jointJSON.axis1], aGeometryLeafNames[jointJSON.axis2], aVariableNames[jointJSON.length]);
		  }
		  else if (jointJSON.type === "spherical") {
		    if (typeof jointJSON.angle1 === 'undefined' || typeof jointJSON.angle2 === 'undefined' || typeof jointJSON.angle3 === 'undefined' || typeof jointJSON.sphType === 'undefined')
		    {
		      console.log("error loading joint");
		      return 1;
		    }
		    if (aVariableNames[jointJSON.angle1] && aVariableNames[jointJSON.angle2] && aVariableNames[jointJSON.angle3])
        {
          if (jointJSON.sphType === 'zxy')
            pJoint = CATCDS.CATICDSSphericalJoint.Create(solver.GetFactory(), aGeometryLeafNames[jointJSON.axis1], aGeometryLeafNames[jointJSON.axis2], CATCDS.CATCDSSphericalType.stZXY, aVariableNames[jointJSON.angle1], aVariableNames[jointJSON.angle2], aVariableNames[jointJSON.angle3]);
          else if (jointJSON.sphType === 'zyx')
            pJoint = CATCDS.CATICDSSphericalJoint.Create(solver.GetFactory(), aGeometryLeafNames[jointJSON.axis1], aGeometryLeafNames[jointJSON.axis2], CATCDS.CATCDSSphericalType.stZYX, aVariableNames[jointJSON.angle1], aVariableNames[jointJSON.angle2], aVariableNames[jointJSON.angle3]);
          else if (jointJSON.sphType === 'zxz')
            pJoint = CATCDS.CATICDSSphericalJoint.Create(solver.GetFactory(), aGeometryLeafNames[jointJSON.axis1], aGeometryLeafNames[jointJSON.axis2], CATCDS.CATCDSSphericalType.stZXZ, aVariableNames[jointJSON.angle1], aVariableNames[jointJSON.angle2], aVariableNames[jointJSON.angle3]);
          else if (jointJSON.sphType === 'pointpoint')
            pJoint = CATCDS.CATICDSSphericalJoint.Create(solver.GetFactory(), aGeometryLeafNames[jointJSON.axis1], aGeometryLeafNames[jointJSON.axis2], CATCDS.CATCDSSphericalType.stPOINTPOINT, aVariableNames[jointJSON.angle1], aVariableNames[jointJSON.angle2], aVariableNames[jointJSON.angle3]);
        }
		  }
		  else if (jointJSON.type === "planar") {
		    pJoint = CATCDS.CATICDSPlanarJoint.Create(solver.GetFactory(), aGeometryLeafNames[jointJSON.axis1], aGeometryLeafNames[jointJSON.axis2]);
		  }
		  else if (jointJSON.type=== "U")
		  {
		    pJoint = CATCDS.CATICDSUJoint.Create(solver.GetFactory(), aGeometryLeafNames[jointJSON.axis1], aGeometryLeafNames[jointJSON.axis2]);
		  }

		  if (!pJoint) {
		    console.log("error creating joint");
		    return 1;
		  }

		  if (typeof jointJSON.softness !== 'undefined')
		    solver.SetConstraintStiffness(pJoint, jointJSON.softness);
		  pJoint.SetName(jointJSON.name);
		  return 0;
		}
		
	  //load interpolNurbs et interpolNurbs2D
		LoadInterpol = function (curveJSON, CATCDS, solver, is2D) {
		  if (typeof curveJSON.interpolationData === 'undefined' || typeof curveJSON.degree === 'undefined' || typeof curveJSON.periodic === 'undefined')
		    return null;

		  var cdsFactory = solver.GetFactory();
		  var nurbs2DSketch;
		  if (is2D)
		  {
		    var nurbsSketchName= curveJSON.sketch;
		    if (typeof nurbsSketchName === 'undefined' || typeof aSketches[nurbsSketchName] === 'undefined')
		    {
          console.log("error loading sketch of nurbs2D")
		      return null;
		    }
		    nurbs2DSketch=aSketches[nurbsSketchName];
		    solver.SetSketch(nurbs2DSketch);
		    obj = CATCDS.CATICDSInterpolationNURBSCurve2D.Create(cdsFactory);
		  }
		  else //interpolNurbs 3D
		    obj = CATCDS.CATICDSInterpolationNURBSCurve.Create(cdsFactory);
		  
		  if (!obj)
		    return null;

		  obj.SetPeriodic(curveJSON.periodic);
		  obj.SetDegree(curveJSON.degree);
		  var k = 0;
		  for (k = 0; k < curveJSON.interpolationData.length; k++)
		  {
		    var currentData = curveJSON.interpolationData[k];
		    var pointName = currentData.name;
		    if (typeof pointName === 'undefined' || typeof aGeometryLeafNames[pointName]==='undefined') { //obligatoire d'avoir des points d'interpol pr les interpolNurbs
		      console.log("error loading interpolation point");
		      return null;
		    }
		    var interpPoint = aGeometryLeafNames[pointName];

		    obj.AddInterpolationPoint(k, interpPoint);

		    if (typeof currentData.firstDerivativeDir !== 'undefined') {
		      var deriv=aGeometryLeafNames[ currentData.firstDerivativeDir];
		      if (typeof deriv !== 'undefined')
		        obj.SetFirstDerivativeDirection(k, deriv);
		      else{
		        console.log("error loading first derivative direction");
		        return null;
		      }
		    }

		    if (typeof currentData.firstDerivativeNormVariable !== 'undefined') {
		      var normeVar = aVariableNames[currentData.firstDerivativeNormVariable];
		      if (typeof normeVar !== 'undefined')
		        obj.SetFirstDerivativeNormVariable(k, normeVar);
		      else {
		        console.log("error loading first derivative norm variable");
		        return null;
		      }
		    }

		    if (typeof currentData.firstDerivativeNormValue !== 'undefined')
		      obj.SetFirstDerivativeNorm(k, currentData.firstDerivativeNormValue);

		    if (typeof currentData.secondDerivativeDir !== 'undefined') {
		      var deriv = aGeometryLeafNames[currentData.secondDerivativeDir];
		      if (typeof deriv !== 'undefined')
		        obj.SetSecondDerivativeDirection(k, deriv);
		      else {
		        console.log("error loading second derivative direction");
		        return null;
		      }
		    }

		    if (typeof currentData.secondDerivativeNormVariable !== 'undefined') {
		      var normeVar = aGeometryLeafNames[currentData.secondDerivativeNormVariable];
		      if (typeof normeVar !== 'undefined')
		        obj.SetSecondDerivativeNormVariable(k, normeVar);
		      else {
		        console.log("error loading second derivative norm variable");
		        return null;
		      }
		    }

		    if (typeof currentData.secondDerivativeNormValue !== 'undefined')
		      obj.SetSecondDerivativeNorm(k, currentData.secondDerivativeNormValue);

		    if (typeof currentData.curvatureVariable !== 'undefined') {
		      var curvatureVar = aGeometryLeafNames[currentData.curvatureVariable];
		      if (typeof curvatureVar !== 'undefined')
		        obj.SetCurvatureVariable(k, curvatureVar);
		      else {
		        console.log("error loading curvature variable");
		        return null;
		      }
		    }

		    if (typeof currentData.curvatureValue !== 'undefined')
		      obj.SetCurvature(k, currentData.curvatureValue);
		  }
		  return obj;
		}

		LoadNurbsCurve2DOr3D= function (curveJSON, CATCDS, solver, is2D) {
		  var cdsFactory = solver.GetFactory();
		  var i = 0;
		  var controlPoints = [];
		  var weights = [];
		  for (i = 0; i < curveJSON.controlPoints.length; i++) {
		    currentPointName = curveJSON.controlPoints[i];
		    if (!aGeometryLeafNames[currentPointName]) {
		      console.log("error loading control points of nurbsCurve")
		      return 1;
		    }
		    else
		      controlPoints.push(aGeometryLeafNames[currentPointName]);
		    if (typeof curveJSON.weights !== 'undefined') {
		      weights.push(curveJSON.weights[i]);
		    }
		  }
		  if (weights.length === 0)
		    weights = null;

		  if (is2D) {
		    var nurbsSketchName = curveJSON.sketch;
		    if (typeof nurbsSketchName === 'undefined' || typeof aSketches[nurbsSketchName] === 'undefined') {
		      console.log("error loading sketch of nurbs2D")
		      return null;
		    }
		    nurbs2DSketch = aSketches[nurbsSketchName];
		    solver.SetSketch(nurbs2DSketch);
		    obj = CATCDS.CATICDSNURBSCurve2D.Create(cdsFactory, curveJSON.degree, curveJSON.knots, controlPoints, weights);
		  }
		  else
		    obj = CATCDS.CATICDSNURBSCurve.Create(cdsFactory, curveJSON.degree, curveJSON.knots, controlPoints, weights);
      return obj;
		}
    
    LoadNurbsConicArc2D= function (curveJSON, CATCDS, solver) {
		  var cdsFactory = solver.GetFactory();
		  var i = 0;
		  var controlPoints = [];
		  for (i = 0; i < curveJSON.controlPoints.length; i++) {
		    currentPointName = curveJSON.controlPoints[i];
		    if (!aGeometryLeafNames[currentPointName]) {
		      console.log("error loading control points of nurbsCurve")
		      return 1;
		    }
		    else
		      controlPoints.push(aGeometryLeafNames[currentPointName]);
		  }
      var varRho = aVariableNames[curveJSON.rho];
		  if (typeof varRho === 'undefined'){
        console.log("error loading rho");
		    return null;
		  }	  
		  var nurbsSketchName = curveJSON.sketch;
		  if (typeof nurbsSketchName === 'undefined' || typeof aSketches[nurbsSketchName] === 'undefined') {
		    console.log("error loading sketch of nurbs2D")
		    return null;
		  }
		  nurbs2DSketch = aSketches[nurbsSketchName];
		  solver.SetSketch(nurbs2DSketch);
		  obj = CATCDS.CATICDSNURBSConicArc2D.Create(cdsFactory, controlPoints, varRho);
      return obj;
		}

		LoadOffsetCurve2D = function (curveJSON, CATCDS, solver)
		{
		  var obj = null;

		  var cdsFactory = solver.GetFactory();
		  if (typeof curveJSON.baseCurve === 'undefined' || curveJSON.sketch==='undefined' || aSketches[curveJSON.sketch] === 'undefined' || 
        (typeof curveJSON.offsetVariable === 'undefined' && typeof curveJSON.offsetValue === 'undefined')) //il faut soit une variable, soit un double pr remplirCATCSOffsetCurve2D:: _offset
		  {
		    console.log("error loading offsetCurve2D");
		    return null;
		  }

		  if (curveJSON.offsetVariable != 'undefined'  && aVariableNames[curveJSON.offsetVariable] ==='undefined')
		  {
		      console.log("error loading variable for offsetCurve2D");
		      return null;
		  }

		  if (typeof aGeometryLeafNames[curveJSON.baseCurve] === 'undefined') {
		    console.log("error loading base for offsetCurve2D"); // on n'a pas encore charge la curve qui sert de base : ne doit pas arriver si les profiles/offset st mis ds le bon ordre de dependance, mais est-ce vraiment le cas?!?
		    return null; 
		  }
		  else {
		  solver.SetSketch(aSketches[curveJSON.sketch]);
		  if (typeof curveJSON.offsetValue !== 'undefined')
		    obj = CATCDS.CATICDSOffsetCurve2D.CreateFixOffset(cdsFactory, aGeometryLeafNames[curveJSON.baseCurve], curveJSON.offsetValue);
		  else // curveJSON.offsetVariable !== 'undefined')
		    obj = CATCDS.CATICDSOffsetCurve2D.CreateVariableOffset(cdsFactory, aGeometryLeafNames[curveJSON.baseCurve], aVariableNames[curveJSON.offsetVariable]);
		  }

      return obj;
		}

    //Load patterns
		LoadPattern = function (patternJSON, CATCDS, solver) {
		    if (patternJSON.type == 'undefined')
		    {
		        console.log("error loading pattern");
		        return 1;
		    }

		    var cdsFactory = solver.GetFactory();
		    var nbGeom= patternJSON.objects.length;
		    var apGeometries=null;
		    var apVariables=null;
		    var aAlignments=null;
            
		    if (typeof patternJSON.objects != 'undefined') {
		        apGeometries = [];
		        for (var i = 0; i < patternJSON.objects.length; i++) {
		            if (typeof aGeometryLeafNames[patternJSON.objects[i]]==='undefined')
		            {
		                console.log("error loading pattern object");
		                return 1;
		            }
		            apGeometries[i] = aGeometryLeafNames[patternJSON.objects[i]];
		            if (!apGeometries[i])
		            {
		                console.log("error loading pattern geometry");
		                return 1;
		            }
		        }
		    }
            
		    if (typeof patternJSON.variables != 'undefined')
		    {
		        apVariables = [];
		        for (var i = 0; i < patternJSON.variables.length; i++) {
		            if (typeof aVariableNames[patternJSON.variables[i]] === 'undefined')
		            {
		                console.log("error loading pattern variable");
		                return 1;
		            }
		            apVariables[i] = aVariableNames[patternJSON.variables[i]];
		        }
		    }

		    if (typeof patternJSON.alignments != 'undefined')
		    {
		        aAlignments = [];
		        for (var i = 0; i < patternJSON.alignments.length; i++) {
		            switch (patternJSON.alignments[i]) {
		                case 'align':
		                    aAlignments[i] = CATCDS.CATCAlignment.caALIGN;
		                    break;
		                case 'antiAlign':
		                    aAlignments[i] = CATCDS.CATCAlignment.caANTIALIGN;
		                    break;
		                default:
		                    aAlignments[i] = CATCDS.CATCAlignment.caNOTSPECIFIED;
		                    break;
		            }
		        }
		    }
		        
		    var internalPattern = null;
		    if (typeof aGeometryLeafNames[patternJSON.axis] === 'undefined')
		    {
		        console.log("error loading pattern axis");
		        return 1;
		    }
		    var pAxis=aGeometryLeafNames[patternJSON.axis];
		    if (!pAxis)
		    {
		        console.log("error loading pattern axis");
		        return 1;
		    }
		    switch (patternJSON.type)
		    {
		        case 'linear':
		          internalPattern= CATCDS.CATICDSLinearPattern.Create(cdsFactory, pAxis, apGeometries, apVariables, typeof aAlignments!=='undefined'? aAlignments : 0 );
		            break;
		        case 'circular':
		          internalPattern = CATCDS.CATICDSCircularPattern.Create(cdsFactory, pAxis, apGeometries, apVariables, typeof aAlignments !== 'undefined' ? aAlignments : 0);
		          break;
		        case 'full2D':
		          internalPattern = CATCDS.CATICDSFullPattern2D.Create(cdsFactory, pAxis, apGeometries, apVariables);
		          break;
		    }
		    if (!internalPattern)
		    {
		        console.log("error loading pattern");
		        return 1;
		    }

		    if (typeof patternJSON.softness !== 'undefined')
		      solver.SetConstraintStiffness(internalPattern, patternJSON.softness);

		    internalPattern.SetName(patternJSON.name);
		    return 0;
		}

    //load constraintS
		LoadConstraints = function (JSONdata, CATCDS, solver)
		{
		  var res=0;
		  if (typeof JSONdata.constraints != 'undefined') {
		    for (var i = 0; i < JSONdata.constraints.length; i++) {
		      res += LoadConstraint(JSONdata.constraints[i], CATCDS, solver);
		    }
		  }
		  return res;
		}
	    
    //LoadConstraints special pour les profiles : charge certaines contraintes, conditionnee par l'indice du currentSubElement
		LoadConstraintsWithIndexCondition = function (indexLimitForArguments, json, CATCDS, solver) {
		  var contin = true;
		  for (var i = 0; i < json.constraints.length; i++) //parcours ttes les contraintes
		  {
		    var constraintToLoadOrNot = json.constraints[i];
		    if (typeof aConstraintNames[constraintToLoadOrNot.name] === 'undefined') { //contrainte pas encore chargee
		      for (var j = 0; j < constraintToLoadOrNot.args.length ; j++) {
		        nameToCompareWith = constraintToLoadOrNot.args[j]; //nom de la geometrie qui est en argument, que l'on veut retrouver ds le vecteur json pr avoir son indice
		        var argIndex = json.objects.findIndex(checkName);//cette geometrie a -t-elle un indice<= indice de currentSubElement? Si non, alors on ne charge plus de contraintes
		        if (!aSketches[nameToCompareWith] && argIndex > indexLimitForArguments) {
		          contin = false; //on ne charge plus aucune contrainte (pas celle là, ni celle d'apres)
		          break;
		        }
		      }
		      if (!contin)
		        break;
		      var resloadConstr = LoadConstraint(json.constraints[i], CATCDS, solver); //si on arrive jusqu'ici cest que contrainte peut etre chargée
		      if (resloadConstr !== 0) {
		        console.log("error during load of constraint with index condition");
		        return false;
		      }
		    }
		  }
		  return true;
		}

		//Load constraint
		LoadConstraint = function (constraint, CATCDS, solver) {
		  if (typeof constraint.name === 'undefined')
		    return 1;

		  if (typeof aConstraintNames[constraint.name] !== 'undefined') //on a deja charge cette contrainte
		    return 0;

		  if (typeof constraint.args === 'undefined' || typeof aGeometryLeafNames[constraint.args[0]] === 'undefined' ) //contraintes peuvent porter sur objects et sketches
			{
			    console.log("error loading constraint argument");
			    return 1;
			}

			var cdsFactory = solver.GetFactory();
			var entities = solver.GetEntities(CATCDS.CATCDSType.tpGEOMETRYLEAF);

			var arg0 = aGeometryLeafNames[constraint.args[0]];
			if ( ! arg0) //geomLeaf pas encore chargee
			  return 0;
			var arg1 = null;
			var arg2 = null;
			if (constraint.args.length >= 2) {
			  if ( !aGeometryLeafNames[constraint.args[1]] ) //pas encore chargeee la geomLeaf
			    return 0;
        else
			    arg1 = aGeometryLeafNames[constraint.args[1]];
			}
			if (constraint.args.length >= 3) {
			  if (!aGeometryLeafNames[constraint.args[2]] ) //pas encore chargeee la geomLeaf
			    return 0;
        else
			    arg2 = aGeometryLeafNames[constraint.args[2]];
			}  

			var isDimGeomConstraint = false;
			var cstr;

			switch (constraint.type) {
			  case 'coincidence':
			  if (arg1)
			    cstr = CATCDS.CATICDSCoincidence.Create(cdsFactory, arg0, arg1);
			  if (!cstr)
			    return 1;
			 var circleTorusOrientation = constraint.circleTorusOrientation;
			 if (circleTorusOrientation === "parallel")
			   cstr.SetCircleTorusOrientation(CATCDS.CATCDSTorusOrientation.toPARALLEL);
			 else if (circleTorusOrientation === "perpendicular")
			   cstr.SetCircleTorusOrientation(CATCDS.CATCDSTorusOrientation.toPERPENDICULAR);
			 break;
			case 'distance':
				if (arg1)
				    cstr = CATCDS.CATICDSDistance.Create(cdsFactory, arg0, arg1, arg2);
				isDimGeomConstraint = true;
				if (!cstr)
				  return 1;
				break;
			case 'angle':
				if (arg1)
				  cstr = CATCDS.CATICDSAngle.Create(cdsFactory, arg0, arg1, arg2);
				if (!cstr)
				  return 1;
				isDimGeomConstraint = true;
				if (typeof constraint.dimensional !== 'undefined' && constraint.dimensional == false) {
				    cstr.SetAlignment(CATCDS.CATCAlignment.caNOTSPECIFIED);
				}
				else //par defaut
				{
				    cstr.SetAlignment(CATCDS.CATCAlignment.caSPECIFIED);
				}
				break;
			case 'apexAngle':
			    cstr = CATCDS.CATICDSApexAngle.Create(cdsFactory, arg0);
			    isDimGeomConstraint = true;
				break;
			case 'parallelism':
				if (arg1)
					cstr = CATCDS.CATICDSParallelism.Create(cdsFactory, arg0, arg1);
				break;
			case 'perpendicularity':
				if (arg1)
					cstr = CATCDS.CATICDSPerpendicularity.Create(cdsFactory, arg0, arg1);
				break;
			case 'tangency':
				if (arg1)
					cstr = CATCDS.CATICDSTangency.Create(cdsFactory, arg0, arg1, arg2);
				break;
			case 'antitangency':
				if (arg1)
					cstr = CATCDS.CATICDSAntiTangency.Create(cdsFactory, arg0, arg1, arg2);
				break;
			case 'concentricity':
				if (arg1)
					cstr = CATCDS.CATICDSConcentricity.Create(cdsFactory, arg0, arg1);
				break;
			case 'coaxiality':
				cstr = CATCDS.CATICDSCoaxiality.Create(cdsFactory, arg0, arg1);
				break;
			case 'midpoint':
				if (arg1)
					cstr = CATCDS.CATICDSMidpoint.Create(cdsFactory, arg0, arg1, arg2);
				break;
			case 'symmetry':
				if (arg1)
					cstr = CATCDS.CATICDSSymmetry.Create(cdsFactory, arg0, arg1, arg2);
				break;
			case 'curvature':
			  cstr = CATCDS.CATICDSCurvature.Create(cdsFactory, arg0, arg1);
			  if (cstr && typeof constraint.absolute!== 'undefined')
			    cstr.SetUseAbsoluteValue(constraint.absolute);
			  isDimGeomConstraint = true;
				break;
			case 'cotangency':
				cstr = CATCDS.CATICDSCoTangency.Create(cdsFactory, arg0, arg1);
				break;
			case 'focus':
				cstr = CATCDS.CATICDSFocus.Create(cdsFactory, arg0, arg1);
				break;
			case 'radius':
			    cstr = CATCDS.CATICDSRadius.Create(cdsFactory, arg0);
			    isDimGeomConstraint = true;
				break;
			case 'majorRadius':
			    cstr = CATCDS.CATICDSMajorRadius.Create(cdsFactory, arg0);
			    isDimGeomConstraint = true;
				break;
			case 'minorRadius':
			    cstr = CATCDS.CATICDSMinorRadius.Create(cdsFactory, arg0);
			    isDimGeomConstraint = true;
				break;
			case 'segmentLength':
			    cstr = CATCDS.CATICDSSegmentLength.Create(cdsFactory, arg0, arg1, arg2);
			    isDimGeomConstraint = true;
				break;
			case 'vertexCurvature':
			    cstr = CATCDS.CATICDSVertexCurvature.Create(cdsFactory, arg0);
			    isDimGeomConstraint = true;
				break;
			}

			if (!cstr)
			{
			    console.log("error creating constraint");
			    return 1;
			}

			if (typeof constraint.value !== 'undefined')
			  cstr.SetValue(constraint.value);

			if (typeof constraint.softness !== 'undefined')
			  solver.SetConstraintStiffness(cstr, constraint.softness);

			if (typeof constraint.alignment != 'undefined') {
			  if (constraint.alignment === 'align')
			    cstr.SetAlignment(CATCDS.CATCAlignment.caALIGN);
			  else if (constraint.alignment === 'antiAlign')
			    cstr.SetAlignment(CATCDS.CATCAlignment.caANTIALIGN);
			}
            
			if (typeof constraint.helpParameters !== 'undefined') {
			    var i = 0;
			    for (i = 0; i < constraint.args.length; i++) {
			        var geomName = constraint.args[i];
			        var geom = aGeometryLeafNames[geomName];
			        if (typeof geom==='undefined')
			        {
			            console.log("error loading constraint parameter");
			            return 1;
			        }
			        //helpParameter
			        var geomParam = constraint.helpParameters[geomName];
			        if (typeof geomParam !== 'undefined') {
			            var helpParamVector = geomParam.helpParameter;
			            if (typeof helpParamVector!== 'undefined')
			                cstr.SetHelpParameter(geom, helpParamVector[0]);
			            //helpParameters
			            helpParamVector = geomParam.helpParameters;
			            if (typeof helpParamVector !== 'undefined')
			                cstr.SetHelpParameters(geom, helpParamVector[0], helpParamVector[1]);
			            //helpPoint
			            var myhelpPoint;
			            myhelpPoint = geomParam.helpPoint
			            if (typeof myhelpPoint !== 'undefined' && myhelpPoint.length === 3)
			                cstr.SetHelpPoint(geom, myhelpPoint);
			            //helPoint2D
			            myhelpPoint = geomParam.helpPoint2D
			            if (typeof myhelpPoint !== 'undefined' &&  myhelpPoint.length === 2)
			                cstr.SetHelpPoint2D(geom, myhelpPoint);
			          //helpvariable
			            var helpVar1 = aVariableNames[geomParam.helpParameterVar1];
			            var helpVar2 = aVariableNames[geomParam.helpParameterVar2];
			            if (typeof helpVar1 !== 'undefined') {
			              cstr.SetHelpParameters(geom, geomParam.var1Value, typeof geomParam.var2Value !== 'undefined' ? geomParam.var2Value : 0);
			              cstr.SetHelpParameterVariables(geom, helpVar1, typeof helpVar2 !== 'undefined' ? helpVar2 : null);
			            }
			        }
			    }
			}

			if (typeof constraint.changeChirality != 'undefined') {
			    if (constraint.changeChirality === true)
			        cstr.ChangeChirality();
			}

			if (typeof constraint.orientations != 'undefined') { //pr les distances

			    if (constraint.orientations[0]==="+" )
			        cstr.SetHalfSpace(arg0, CATCDS.CATCDSHalfSpace.hsPOSITIVE);
			    else if (constraint.orientations[0]==="-")
			        cstr.SetHalfSpace(arg0, CATCDS.CATCDSHalfSpace.hsNEGATIVE);
                
			    if (arg1) {
			        if (constraint.orientations[1] === "+")
			            cstr.SetHalfSpace(arg1, CATCDS.CATCDSHalfSpace.hsPOSITIVE);
			        else if (constraint.orientations[1] === "-")
			            cstr.SetHalfSpace(arg1, CATCDS.CATCDSHalfSpace.hsNEGATIVE);
			    }
                
			    if (arg2) {
			        if (constraint.orientations[2] === "+")
			            cstr.SetHalfSpace(arg2, CATCDS.CATCDSHalfSpace.hsPOSITIVE);
			        else if (constraint.orientations[2] === "-")
			            cstr.SetHalfSpace(arg2, CATCDS.CATCDSHalfSpace.hsNEGATIVE);
			    }
			}

			if (isDimGeomConstraint && typeof constraint.variable != 'undefined') {
			    var varToSet = aVariableNames[constraint.variable];
			    if (typeof varToSet !== 'undefined')
			        cstr.SetVariable(varToSet); //nexiste que pr les CATICDSgeomDimConstraint
			}

			cstr.SetName(constraint.name);
			aConstraintNames[constraint.name] = cstr;
			return 0;
		};

		//Load equations
		LoadEquation = function (equation, CATCDS, solver) {
			if (typeof equation.type == 'undefined')
			{
			    console.log("error loading equation");
			    return 1;
			}

			var cdsFactory = solver.GetFactory();

			switch (equation.type) {
			  case 'linear':
			    if (typeof equation.terms === 'undefined' || typeof equation.tolerance === 'undefined' || typeof equation.constant==='undefined')
			    {
			      console.log("error loading linear equation");
			      return 1;
			    }

			    var aLinVars = [];
			    var aLinTerms = [];
			    for (var i = 0; i < equation.terms.length; i++) {
			      if (typeof aVariableNames[equation.terms[i].name] === 'undefined' || typeof aVariableNames[equation.terms[i].name] == 'undefined' )
			      {
			        console.log("error loading linear equation");
			        return 1;
			      }
			      aLinVars.push(aVariableNames[equation.terms[i].name]);
			      aLinTerms.push(equation.terms[i].linear);
			    }

			    var constant = equation.constant;

			    var eq = CATCDS.CATICDSLinearEquation.Create(cdsFactory, aLinVars, aLinTerms, constant);
			    break;
			}
			if (!eq) {
				console.log("error creating equation");
				return 1;
			}
			eq.SetName(equation.name);
			eq.SetTolerance(equation.tolerance);
			return 0;
		}

		//Load profile
		LoadProfile = function (profileIndex, json, CATCDS, solver) {
		  var profile = json.objects[profileIndex];
			if (typeof profile.subElements === 'undefined' || typeof profile.vertices === 'undefined')
			{
			    console.log("error loading profile");
			    return null;
			}

			if (profile.sketch !== 'undefined')
			{
			  profileSk= aSketches[profile.sketch];
			  if (typeof profileSk ==='undefined')
			  {
			      console.log("error loading profile sketch");
			      return null;
			  }
			  else
			    solver.SetSketch(profileSk);
			}
			
			var cdsFactory = solver.GetFactory();

			var aSubElts = []; //subElements du profile
			var aOrients = [];
			for (var i = 0; i < profile.subElements.length; i++) { 
			  var subElementName=profile.subElements[i].name;
			  var currentSubElement = aGeometryLeafNames[subElementName];

			  nameToCompareWith=subElementName;
			  var subElementIndex = json.objects.findIndex(checkName);

			  if (subElementIndex < 0) //subElement est cense exister ds la liste d'objets du json
			    return null;

			  if (typeof currentSubElement === 'undefined') //si currentSubElement n'a pas encore ete charge, on le cree
			    currentSubElement = LoadObject(subElementIndex, json, CATCDS, solver);

			  if (currentSubElement === null) {
			    console.log("error loading profile");
			    return null;
			  }
			  aSubElts.push(currentSubElement);
			  aOrients.push(profile.subElements[i].orientation);

			  var ok = LoadConstraintsWithIndexCondition(subElementIndex, json, CATCDS, solver);
			  if (!ok)
			    return null;
			}

			var aVert = []; // vertices of profile
			for (var i = 0; i < profile.vertices.length; i++) {
			  var currentVertex = aGeometryLeafNames[profile.vertices[i].name];
			  nameToCompareWith = profile.vertices[i].name;
			  var currentVertexIndex = json.objects.findIndex(checkName);

        //load le currentVertex si pas deja fait
			  if (currentVertexIndex<0) //vertex est cense exister ds la liste d'objets du json
			    return null; 
			  if (typeof currentVertex === 'undefined') //on n'a pas encore charge le vertex
			    currentVertex = LoadObject(currentVertexIndex, json, CATCDS, solver); //chargement et creation du currentSubElement

			  if (currentVertex === null) {
			    console.log("error loading profile");
			    return null;
			  }
			  aVert.push(currentVertex);

			  //load les contraintes lie au currentVertex
			  var ok = LoadConstraintsWithIndexCondition(currentVertexIndex, json, CATCDS, solver);
			  if (!ok)
			    return null;
			}

			var closed = profile.closed ;

			var pr = CATCDS.CATICDSProfile2D.Create(cdsFactory, aSubElts, aVert, aOrients, closed);

			if (!pr) {
			  console.log("error creating profile");
			  return null;
			}

			if (profile.selfIntersectionMode == 'autotrim')
			  pr.SetSelfIntersectionMode(CATCDS.CATCDSSelfIntersectionMode.simAUTOTRIM);

			if (typeof profile.rigidSet != 'undefined') {
			  if (typeof aRigidSetNames[profile.rigidSet] != 'undefined')
			    aRigidSetNames[profile.rigidSet].AddGeometry(pr);
			  else {
			    console.log("error adding a profile to a rigid set");
			    return null;
			  }
			}

			if (typeof profile.segment != 'undefined') {
			  pr.SetTrimmingInfo(profile.segment);
			}

			return pr;
		}

		//Load offset constraints
		LoadOffsetConstraint = function (offsetCstr, CATCDS, solver) {
		    if (offsetCstr.name == 'undefined' ||
				offsetCstr.base == 'undefined' ||
				offsetCstr.offset == 'undefined' ||
				offsetCstr.variables == 'undefined')
		    {
		        console.log("error loading offsetConstraint");
		        return 1;
		    }


			var cdsFactory = solver.GetFactory();

			var base = aGeometryLeafNames[offsetCstr.base];
			var offset = aGeometryLeafNames[offsetCstr.offset];

			if (!base || !offset) {
			  console.log("error loading offsetConstraint profiles");
			  return 1;
			}

			//Probleme car seulement la possibilité d'avoir une seule variable
			var offsetVariable =aVariableNames[offsetCstr.variable];
			if (!offsetVariable)
			{
			    console.log("error loading offsetConstraint variable");
			    return 1;
			}

			var oc = CATCDS.CATICDSOffsetConstraint.Create(cdsFactory, base, offset, offsetVariable);

			if (!oc) {
			  console.log("error creating offsetConstraint");
			  return 1;
			}

			if (typeof offsetCstr.variables != 'undefined')
			    oc.SetBorderVerticesAlignment(true);

			if (typeof offsetCstr.softness != 'undefined')
			  solver.SetConstraintStiffness(oc, offsetCstr.softness);

			oc.SetName(offsetCstr.name);

			return 0;
		}

		//Load option
		LoadOption = function (options, CATCDS, solver) {
		  if ( typeof options.CDSLevel === 'undefined' || 
        typeof options.outputMode === 'undefined' ||
				typeof options.linearTolerance === 'undefined' || 
        typeof options.angularTolerance === 'undefined' ||
				typeof options.dynamicMoveMode === 'undefined' ||
				typeof options.diagnosticsMode === 'undefined' ||
        typeof options.DOFMode === 'undefined' ||
				typeof options.partialSolvingMode === 'undefined' ||
				typeof options.solvingMode === 'undefined' ||
				typeof options.preserveChiralityMode === 'undefined' ||
				typeof options.overdefinedDiagnosticsMode === 'undefined' ||
        typeof options.varDependencyMode === 'undefined' ||
				typeof options.updateMode === 'undefined' ||
        typeof options.rigidSetDiagnosticsMode === 'undefined'||
        //typeof options.DerivativesComputationMode === 'undefined' ||
        typeof options.initialDataOnInconsistentGeomComponentMode === 'undefined'
				)
			{
			    console.log("error loading options");
			    return 1;
			}

		  //outputMode
			if (options.outputMode == 'rootElements')
				solver.SetOutputMode(CATCDS.CATCDSOutputMode.omCALLBACK_ROOT_ELEMENTS);
			else if (options.outputMode == 'allElements')
				solver.SetOutputMode(CATCDS.CATCDSOutputMode.omCALLBACK_ALL_ELEMENTS);

		  //tolerances
			solver.SetTolerances(options.linearTolerance, options.angularTolerance);

		  //dynamicMoveMode
			if (options.dynamicMoveMode == 'standard')
			  solver.SetDynamicMoveMode(CATCDS.CATCDSMoveMode.mmSTANDARD);
			else if (options.dynamicMoveMode == 'perturbation')
			  solver.SetDynamicMoveMode(CATCDS.CATCDSMoveMode.mmPERTURBATION);
			else if (options.dynamicMoveMode == 'minimum')
			  solver.SetDynamicMoveMode(CATCDS.CATCDSMoveMode.mmMINIMUM_MOVE);
			else if (options.dynamicMoveMode == 'accurate')
			  solver.SetDynamicMoveMode(CATCDS.CATCDSMoveMode.mmACCURATE_MOVE);

		  //diagnosticsMode
			if (options.diagnosticsMode == 'always')
			  solver.SetDiagnosticsMode(CATCDS.CATCDSDiagMode.dmALWAYS);
			else if (options.diagnosticsMode == 'notoverdefined')
				solver.SetDiagnosticsMode(CATCDS.CATCDSDiagMode.dmNOTOVERDEFINED);
			else if (options.diagnosticsMode == 'never')
			  solver.SetDiagnosticsMode(CATCDS.CATCDSDiagMode.dmNEVER);
			else if (options.diagnosticsMode == 'notsolved')
			  solver.SetDiagnosticsMode(CATCDS.CATCDSDiagMode.dmNOTSOLVED);
			else if (options.diagnosticsMode === 'oldAlways')
			  solver.SetDiagnosticsMode(CATCDS.CATCDSDiagMode.dmOLDALWAYS);

		  //DOFMode
			if (options.DOFMode == 'full')
			  solver.SetDegreesOfFreedomMode(CATCDS.CATCDSDOFMode.dmFULL);
			else if (options.DOFMode == 'withoutDOS')
			  solver.SetDegreesOfFreedomMode(CATCDS.CATCDSDOFMode.dmWITHOUTDOS);

		  //partialSolvingMode
			if (options.partialSolvingMode == 'always')
				solver.SetPartialSolvingMode(CATCDS.CATCDSPartialSolvingMode.psALWAYS);
			else if (options.partialSolvingMode == 'fail_if_inconsistent')
				solver.SetPartialSolvingMode(CATCDS.CATCDSPartialSolvingMode.psFAIL_IF_INCONSISTENT);

		  //solvingMode
			if (options.solvingMode == 'standard')
			  solver.SetSolvingMode(CATCDS.CATCDSSolvingMode.slSTANDARD);
			else if (options.solvingMode == 'minimumMove')
			  solver.SetSolvingMode(CATCDS.CATCDSSolvingMode.slMINIMUM_MOVE);

		  //preserveChiralityMode
			if (options.preserveChiralityMode == 'free')
			  solver.SetPreserveChiralityMode(CATCDS.CATCDSChiralityMode.cmFREE);
			else if (options.preserveChiralityMode == 'keep')
			  solver.SetPreserveChiralityMode(CATCDS.CATCDSChiralityMode.cmKEEP);
      
		  //overdefinedDiagnosticsMode
			if (options.overdefinedDiagnosticsMode == 'dimensional')
			  solver.SetOverdefinedDiagnosticsMode(CATCDS.CATCDSOverdefinedDiagMode.odDIMENSIONAL);
			else if (options.overdefinedDiagnosticsMode == 'full')
			  solver.SetOverdefinedDiagnosticsMode(CATCDS.CATCDSOverdefinedDiagMode.odFULL);

		  //varDependencyMode
			if (options.varDependencyMode == 'never')
			  solver.SetVarDependencyMode(CATCDS.CATCDSVarDepMode.vmNEVER);
			else if (options.varDependencyMode == 'solved')
			  solver.SetVarDependencyMode(CATCDS.CATCDSVarDepMode.vmSOLVED);

		  //updateMode
			if (options.updateMode == 'evaluate')
				solver.SetUpdateMode(CATCDS.CATCDSUpdateMode.umEVALUATE);
			else if (options.updateMode == 'reevaluate')
			  solver.SetUpdateMode(CATCDS.CATCDSUpdateMode.umREEVALUATE);
			else if (options.updateMode == 'evalTransform')
			  solver.SetUpdateMode(CATCDS.CATCDSUpdateMode.umEVALTRANSFORM);

		  //rigidSetDiagnosticsMode
			if (options.rigidSetDiagnosticsMode == 'withoutDOS')
			  solver.SetRigidSetDiagnosticMode(CATCDS.CATRigidSetDiagMode.rdWITHOUTDOS);
			else if (options.rigidSetDiagnosticsMode == 'full')
			  solver.SetRigidSetDiagnosticMode(CATCDS.CATRigidSetDiagMode.rdFULL);
			else if (options.rigidSetDiagnosticsMode == 'extraDof')
			  solver.SetRigidSetDiagnosticMode(CATCDS.CATRigidSetDiagMode.rdEXTRADOF);

			if (typeof options.new3DRigidificationHeuristic != 'undefined') {
			  if (options.new3DRigidificationHeuristic == false)
			    solver.UseNew3DRigidificationHeuristic(false);
			  else
			    solver.UseNew3DRigidificationHeuristic(true);
			}

			if (typeof options.checkUnsolvableConstraintsMode != 'undefined') {
			  if (options.checkUnsolvableConstraintsMode == false)
			    solver.SetCheckUnsolvableConstraintsMode(false);
			  else
			    solver.SetCheckUnsolvableConstraintsMode(true);
			}

			if (typeof options.preprocessKinematicsChains != 'undefined') {
				if (options.preprocessKinematicsChains == false)
					solver.PreprocessKinematicsChains(false);
				else
					solver.PreprocessKinematicsChains(true);
			}

			solver.SetInitialDataOnInconsistentGeomComponentMode(options.initialDataOnInconsistentGeomComponentMode);

			if (typeof options.adaptiveMove === 'undefined')
				solver.SetAdaptiveMove(false);
			else {
				solver.SetAdaptiveMove(options.adaptiveMove);
            }
      //par défaut (autres cas non supportes)
      solver.SetPerturbationMove(false);
      solver.SetAccurateMove(false);

			return 0;
		}
    
		LoadMovingEntity= function(movingData, CATCDS, solver)
		{
		  if (typeof movingData.name === 'undefined')
		  {
		    console.log("error loading moving entity");
		    return 1;
		  }
		  entityName=movingData.name;
		  var entity = aGeometryLeafNames[entityName];
		  if (typeof entity === 'undefined') { //entity est soit un objet, soit un sketch, soit un rigidset. 
		    entity = aSketches[entityName];
		    if (typeof entity === 'undefined') {
		      entity = aRigidSetNames[entityName];
		      if (typeof entity === 'undefined') {
		        entity = aVariableNames[entityName];
		        if (typeof entity === 'undefined') {
		          console.log("error creating moving entity")
		          return 1;
		        }
		      }
		    }
		  }
  
		  var targetVector = movingData.vector;
		  var matrix = movingData.matrix;
		  if (typeof targetVector !== 'undefined' && typeof matrix !== 'undefined') {
		    var targetMatrix;
		    if (movingData.transfo2D === true) {
		      targetMatrix = [matrix.line0, matrix.line1]
		      entity.SetDynamicMove2D(targetMatrix, targetVector); //constraintSolver.SetDynamicMove2D(entity,targetMatrix,targetVector);
		    }
		    else
		    {
		      targetMatrix = [matrix.line0, matrix.line1, matrix.line2];
		      entity.SetDynamicMove(targetMatrix, targetVector); //constraintSolver.SetDynamicMove(entity,targetMatrix,targetVector);
		    }
		  }
		  var majorRadius=0;
		  var minorRadius = 0;
		  var atOneLeastRadius = false;
		  if (typeof movingData.moveMajorRadius !== 'undefined') {
		    majorRadius = movingData.moveMajorRadius;
		    atOneLeastRadius = true;
		  }
		  if (typeof movingData.moveMinorRadius !== 'undefined') {
		    minorRadius = movingData.moveMinorRadius;
		    atOneLeastRadius = true;
		  }
		  if (atOneLeastRadius)
		    entity.MoveRadii(majorRadius, minorRadius);

      if (typeof movingData.moveValue !== 'undefined') {
        movingVariables.push(entity);
        movingVariableValues.push(movingData.moveValue);
      }
      
      if (typeof movingData.moveByLineOrigin !== 'undefined' && typeof movingData.moveByLineDirection !== 'undefined'){
        var ori = [movingData.moveByLineOrigin.x, movingData.moveByLineOrigin.y, movingData.moveByLineOrigin.z];
        var dir = [movingData.moveByLineDirection.x, movingData.moveByLineDirection.y, movingData.moveByLineDirection.z];
        solver.SetDynamicMove(entity, ori, dir);
      }
      return 0;
		}

		LoadMovedEntity = function (movedData, CATCDS, solver) {
		  if (typeof movedData.name === 'undefined' || typeof movedData.matrix === 'undefined' || typeof movedData.vector === 'undefined') {
		    console.log("error loading moved entity");
		    return 1;
		  }
		  var geom=aGeometryLeafNames[movedData.name];
		  if (typeof geom === 'undefined')
		  {
		    return 1;
		  }
		  var movedMatrix=[[], []];
		  movedMatrix[0][0]=movedData.matrix.line0[0];
		  movedMatrix[0][1]=movedData.matrix.line0[1]; 
		  movedMatrix[1][0]=movedData.matrix.line1[0];
		  movedMatrix[1][1]=movedData.matrix.line1[1];
		  var movedVector=movedData.vector;

		  solver.SetAppliedTransformation2D(geom, movedMatrix, movedVector);

		  return 0;
		}

	}

	return new Loader();

});
