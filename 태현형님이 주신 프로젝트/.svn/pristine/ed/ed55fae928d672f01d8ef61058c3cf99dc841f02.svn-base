/* eslint-disable no-irregular-whitespace */
/*
*/

define('DS/CAT3DSKExperience/CAT3DSketchExperience',
[
  'DS/3DPlayModelViewer/3DPlayModelViewer'
  , 'DS/Visualization/ModelLoader'
  , 'DS/Visualization/ThreeJS_DS'
  , 'DS/CoreEvents/Events'
  , 'DS/CAT3DWInfra/CAT3DWUrlServices'
  , 'DS/CAT3DWInfra/CAT3DWPreferenceManager'
],
function (
  Exp
  , ModelLoader
  , THREE
  , WUXEvents
  , CAT3DWUrlServices
  , CAT3DWPreferenceManager
) {

  'use strict';
  return Exp.extend({
    init: function (options) {
      this._parent(options);
    },

    dispose: function (options) {
      WUXEvents.publish({
        event: 'CAT3DSKExperienceExit',
        data: {}
      });
      this._viewer = null;
      this._viewpoint = null;

      this._parent(options);
    },

    clearView: function () {
      if (this._viewer){
        var rootNode = this._viewer.getRootNode();
        if (rootNode && rootNode.children && rootNode.children.length > 0) {
          rootNode.removeChildren();
        }
        this._parent();
      }
      this._viewer = null;
      this._viewpoint = null;
    },

    onLoadedAsset: function (fileExtension) {

      this.isR2V = CAT3DWPreferenceManager.getPreferenceValue('isR2V');

      if (fileExtension === '3dwb') {


        this._viewpoint.setProjectionType(1);
        this._viewer.currentViewpoint.control.setTouchRotationActive(false);
        this._viewer.currentViewpoint.getControl().setRotationActive(false);

        var normal = new THREE.Vector3(0, 0, -1);
        var up = new THREE.Vector3(-1, 0, 0);
        this._viewpoint.moveTo({ sightDirection: normal, upDirection: up });

        WUXEvents.publish({
          event: 'CAT3DSKExperienceStart',
          data: {}
        });
      }

      // IR-849846: XE6: changing backgroundcolor to white in 3DPlay
      this._viewer.setBackgroundColor('#FFFFFF');

      // if file is R2V lock camera position to perspective view
      if (this.isR2V) {

        /*var divs = document.getElementsByClassName('AfrActionBar');
        if (divs.length) {
          divs[0].style.display = 'none';
        }*/

        var camPosR2V =  CAT3DWPreferenceManager.getPreferenceValue('camPosR2V');
        var quatR2V = CAT3DWPreferenceManager.getPreferenceValue('quatR2V');
        this.fovR2V = CAT3DWPreferenceManager.getPreferenceValue('fovR2V');
        this.focalR2V = CAT3DWPreferenceManager.getPreferenceValue('focalR2V');
        this.imWidthR2V = CAT3DWPreferenceManager.getPreferenceValue('imWidthR2V');
        this.imHeightR2V = CAT3DWPreferenceManager.getPreferenceValue('imHeightR2V');

        //this._viewer.currentViewpoint.setProjectionType(0);
        this._viewer.currentViewpoint.moveTo({ eyePosition: camPosR2V, orientation: quatR2V, duration: 10 });

        this._viewer.currentViewpoint.setAngle(this.fovR2V);

        this._viewer.currentViewpoint.control.setRotationActive(false);
        this._viewer.currentViewpoint.control.setTouchRotationActive(false);
        this._viewer.currentViewpoint.control.setZoomActive(false);
        this._viewer.currentViewpoint.control.setPanActive(false);
        var camObj = { viewpoint: false, picking: false };
        this._viewer.currentViewpoint.control.setActive(camObj);

        this._zoom = 1.0;

        this._panCenter = new THREE.Vector2();

        this._panCenter.x = this._viewer.div.clientWidth / 2;
        this._panCenter.y = this._viewer.div.clientHeight / 2;

        if (this.imHeightR2V && this.imHeightR2V !== 0 && this._viewer.div.clientWidth !== 0) {
          if (this.focalR2V) {
            this._applyNewFocal(this.focalR2V);
          }

          if (this._panCenter) {
            //IR-503696-3DEXPERIENCER2018x
            // Camera is asymetrical and needs to be handle by hand
            let viewpoint = this._viewer.currentViewpoint;
            this._applyViewOffset(viewpoint);
          }

          this._viewer.render();
        }

        this.onresizeToken = this._viewer.onViewerResize(function () {
          if (this.imHeightR2V && this.imHeightR2V !== 0 && this._viewer.div.clientWidth !== 0) {
            if (this.focalR2V) {
              this._applyNewFocal(this.focalR2V);
            }

            if (this._panCenter) {
              //IR-503696-3DEXPERIENCER2018x
              // Camera is asymetrical and needs to be handle by hand
              let viewpoint = this._viewer.currentViewpoint;
              this._applyViewOffset(viewpoint);
            }

            this._viewer.render();
          }

          setTimeout(function () {
            this.frmWindow.getActionBar().hide();
            this.frmWindow.getActionBar()._tabBar.hide();
            this.frmWindow.getActionBar().MAB.hide();
            this.frmWindow.getActionBar().elements.container.classList.add('hide');
          }.bind(this), 500);


          this._viewer.render();
        }.bind(this));

        this._viewer.render();

        this.frmWindow.getActionBar().hide();
        this.frmWindow.getActionBar()._tabBar.hide();
        this.frmWindow.getActionBar().MAB.hide();
        this.frmWindow.getActionBar().elements.container.classList.add('hide');

      }
      else {
        // Reframe
        this._viewpoint.reframe(null, 0); // 0 -> animation time
      }

      if (navigator.userAgentData.mobile) {
        // Graphic optimisations for mobile devices
        // this._viewer.setSSAO(false);
        this._viewer.setAntiAliasing('NoAA');
        // Set Magnifier
        this._viewer.setMagnifier({ activated: true, dim: 83, shiftVector: { x: -50, y: 120 } });
      }
      else {
        // this._viewer.setSSAO(true);
        this._viewer.setAntiAliasing('SMAA');
      }

      this._viewer.setPixelCulling(0);
      this._viewer.render({ updateInfinitePlane: true });

    },

    _applyNewFocal: function (iFocal) {
      var hRatio = this._viewer.div.clientWidth / this.imWidthR2V;
      var vRatio = this._viewer.div.clientHeight / this.imHeightR2V;

      var imageHeight = this.imHeightR2V;
      if (hRatio > vRatio) {
        // bandes verticales
        imageHeight = this.imHeightR2V;
      } else {
        // bandes horizontales
        imageHeight = this._viewer.div.clientHeight / hRatio;
      }


      var radianToDegree = 180 / Math.PI;
      var newFov = 2.0 * Math.atan(imageHeight / (2.0 * iFocal)) * radianToDegree;

      console.log('--- focal --- newLength: ' + iFocal + '  newAngle: ' + newFov + '   oldAngle: ' + this._viewer.currentViewpoint.getAngle());
      this._viewer.currentViewpoint.setAngle(newFov);
    },

    _applyViewOffset: function (viewpoint) {
      var newWidth = this._viewer.div.clientWidth * this._zoom;
      var newHeight = this._viewer.div.clientHeight * this._zoom;

      if (newWidth <= 1 || newHeight <= 1) {
        // do nothing
      } else {
        if (this._panCenter.x + (newWidth / 2) > this._viewer.div.clientWidth) {
          this._panCenter.x = this._viewer.div.clientWidth - (newWidth / 2);
        }
        if (this._panCenter.x - (newWidth / 2) < 0) {
          this._panCenter.x = (newWidth / 2);
        }
        if (this._panCenter.y + (newHeight / 2) > this._viewer.div.clientHeight) {
          this._panCenter.y = this._viewer.div.clientHeight - (newHeight / 2);
        }
        if (this._panCenter.y - (newHeight / 2) < 0) {
          this._panCenter.y = (newHeight / 2);
        }

        this._xOffset = this._panCenter.x - (newWidth / 2);
        this._yOffset = this._panCenter.y - (newHeight / 2);

        viewpoint.setViewOffset({
          fullWidth: this._viewer.div.clientWidth,
          fullHeight: this._viewer.div.clientHeight,
          x: this._xOffset,
          y: this._yOffset,
          width: newWidth,
          height: newHeight
        });
        this._viewer.render();

      }
    },

    isAndroid: function () {
      var string = navigator.userAgent.toLowerCase();
      var regex = new RegExp('android');
      if (regex.test(string)) {
        return true;
      }
      return false;

    },

    loadAsset: function (input/*, iOptions, idisplayprogress, profiler*/) {
      this._viewer = this.frmWindow.getViewer();
      this._viewpoint = this.frmWindow.getViewpoint();
      var modelName = null;
      var fileExtension = input.asset.format;
      if (this.isAndroid()) {
        modelName = input.asset.filename;
      } else {
        modelName = decodeURIComponent(input.asset.filename);
      }

      if (this.isR2V) {
        this.frmWindow.getActionBar().MAB.state.alwaysOn = false;
        this.frmWindow.getActionBar().options.enableShowHide = false;
        this.frmWindow.getActionBar()._tabBar.hide();
        this.frmWindow.getActionBar().hide();
        this.frmWindow.getActionBar().MAB.hide();
        this.frmWindow.getActionBar().elements.container.classList.add('hide');
      }


      if (fileExtension === '3dwb' || fileExtension === '3dskt') {
        // ByPass cors issue with parameter
        var urlService = new CAT3DWUrlServices();
        modelName = urlService.generateUrlWithSuffix(modelName);

        var modelLoader = new ModelLoader();
        modelLoader.setOnLoadedCallback(this.onLoadedAsset.bind(this, fileExtension));

        modelLoader.loadModel({
          filename: modelName,
          format: fileExtension,
          proxyurl: 'none',
          withCredentials: true,
          viewer: this._viewer
        }, this._viewer.getRootNode());
      }
    }
  });
});

/*
* @fullreview  ARR3   19:07:23 Created from 3DPlayAnnotation3D
*/

define('DS/CAT3DSKExperience/CAT3DSKAnnotationAbbreviationsExperience',
['UWA/Class'],
function (Class)
{
  'use strict';
  var abbreviation = {
    'l': 'line',
    'c': 'circle',
    'e': 'ellipse',
    'r': 'rectangle',
    's': 'square',
    't': 'triangle',
    'a': 'arrow',
    'ca': 'curvedArrow',
    'dha': 'doubleHeadedArrow',
    'cda': 'curvedDoubleHeadedArrow',
    'uo': 'unknownOpen',
    'tt': 'text',
    'ep': 'eyePosition',
    'ud': 'upDirection',
    'sd': 'sightDirection',
    'td': 'targetDistance',
    'vs': 'viewpoints',
    'vp': 'viewpointInfo',
    'annot': 'annotList',
    'at': 'type',
    'om': 'onModel',
    'g': 'geometry',
    'gp': 'graphicalProp',
    'pc': 'pointsCount',
    'apn': 'annotPlaneNormal',
    'asp': 'annotStartPoint',
    'co': 'color',
    'op': 'opacity',
    'fs': 'fontSize',
    'fw': 'fontWeight',
    'cen': 'center',
    'ra': 'radius',
    'maa': 'majorAxis',
    'mia': 'minorAxis',
    'len': 'length',
    'v': 'vertices',
    'ps': 'points',
    'sc': 'scale',
    'w': 'width',
    'h': 'height',
    'oh': 'offsetHeight',
    'ls': 'lineStart',
    'le': 'lineEnd',
    'cs': 'curveStart',
    'ce': 'curveEnd',
    'cp': 'curvePoints',
    'st': 'start',
    'en': 'end',
    'p': 'point',
    'ah': 'arrowhead',
    'es': 'explodeStates',
    'd': 'diamond',
    'li': 'linkID',
    'th': 'thickness',
    'pa': 'path',
    'an': 'angle',
    'da': 'data',
    'uc': 'unknownClosed',
    'iv': 'isVisible'
  };

  var swapAbbreviation = {};
  var keys = Object.keys(abbreviation);
  keys.forEach(function (key){
    var val = abbreviation[key];
    swapAbbreviation[val] = key;
  });
  var AnnotationAbbreviation = Class.extend({
    init: function (options) {
      this._parent(options);
    },
    processJSON: function (json, mode){
      var lookUpJSON;
      if (mode === 'expand') {
        lookUpJSON = abbreviation;
      } else if (mode === 'minify') {
        lookUpJSON = swapAbbreviation;
      }
      var newObj = {};
      var keys = Object.keys(json);
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var value = json[key];
        if (Array.isArray(value)) {
          var newArray  = [];
          for (var j = 0; j < value.length; j++) {
            var newVal = (typeof value[j] === 'string') ? value[j] : this.processJSON(value[j], mode);
            newArray.push(newVal);
          }
          value = newArray;
        } else if (typeof value === 'object' && Object.keys(value).length > 0) {
          value = this.processJSON(value, mode);
        } else if (typeof value === 'string') {
          if (lookUpJSON[value]) {
            value = lookUpJSON[value];
          }
        }
        var newKeyName = lookUpJSON[key];
        if (newKeyName) {
          newObj[newKeyName] = value;
        } else {
          newObj[key] = value;
        }
      }
      return newObj;
    }
  });

  return AnnotationAbbreviation;
});

