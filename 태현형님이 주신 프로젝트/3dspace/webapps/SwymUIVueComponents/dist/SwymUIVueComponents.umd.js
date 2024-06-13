(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["SwymUIVueComponents"] = factory();
	else
		root["SwymUIVueComponents"] = factory();
})((typeof self !== 'undefined' ? self : this), function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "4447");
/******/ })
/************************************************************************/
/******/ ({

/***/ "04bf":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"577c093e-vue-loader-template"}!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./src/components/SwymCommunityTagsHeader.vue?vue&type=template&id=6d1101c3&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.tags.length)?_c('div',{staticClass:"community-tags-header"},[(_vm.showCommunityIcon)?_c('vu-icon',{directives:[{name:"tooltip",rawName:"v-tooltip.body",value:(_vm.NLS.CommunityTags),expression:"NLS.CommunityTags",modifiers:{"body":true}}],staticClass:"community-tags-icon",attrs:{"icon":"users-alt"}}):_vm._e(),_c('div',{ref:"wrapper",staticClass:"community-tags-wrapper",class:_vm.open ? 'opened' : 'closed'},[_c("transition-group",{tag:"div",staticClass:"community-tags-container",attrs:{"name":"slide"}},_vm._l((_vm.tags),function(tag){return _c('SwymCommunityTag',{key:tag.object_db,attrs:{"tag":tag},on:{"tagSelected":_vm.tagToggled}})}),1),(!_vm.externalSeeMore && _vm.showSeeMore && _vm.open)?_c('div',{staticClass:"see-more-tags opened",on:{"click":function($event){return _vm.expandList(false)}}},[_c('span',[(!_vm.hideExpander)?_c('vu-icon',{staticClass:"expander",attrs:{"icon":"expand-up"}}):_vm._e(),_vm._v(_vm._s(_vm.NLS.ViewLess)+" ")],1)]):_vm._e()],1),(!_vm.externalSeeMore && _vm.showSeeMore && !_vm.open)?_c('div',{staticClass:"see-more-tags closed",on:{"click":function($event){return _vm.expandList(true)}}},[_c('span',[(!_vm.hideExpander)?_c('vu-icon',{staticClass:"expander",attrs:{"icon":"expand-right"}}):_vm._e(),_vm._v(_vm._s(_vm.NLS.ViewMore)+" ")],1)]):_vm._e()],1):_vm._e()}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/SwymCommunityTagsHeader.vue?vue&type=template&id=6d1101c3&scoped=true&

// CONCATENATED MODULE: ../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./src/components/SwymCommunityTagsHeader.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var SwymCommunityTagsHeadervue_type_script_lang_js_ = ({
  name: 'SwymCommunityTagsHeader',
  props: {
    tags: {
      type: Array,
      required: true,
    },
    NLS: {
      type: Object,
      default: () => ({}),
    },
    externalSeeMore: {
      type: Boolean,
      default: false,
    },
    showCommunityIcon: {
      type: Boolean,
      default: true,
    },
    openByDefault: {
      type: Boolean,
      default: false,
    },
    hideExpander: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      open: this.openByDefault || false,
      showSeeMore: false,
    }
  },
  mounted() {
    this.recheckSeeMore();
  },
  methods: {
    tagToggled(tag) {
      this.$emit('tagToggled', tag);
    },
    expandList(val) {
      if (val == undefined) {
        this.open = !this.open;
        this.$emit('listExpanded', this.open);
        return;
      }
      this.open = val;
      this.$emit('listExpanded', val);
    },
    recheckSeeMore() {
      this.$nextTick(() => {
        setTimeout(() => {
          // We don't know when all child components will render. So adding a setTimeout
          const wrapper = this.$refs.wrapper;
          this.showSeeMore = wrapper ? wrapper.scrollHeight >= 30 : false;
          if (this.externalSeeMore) {
            this.$emit('seeMoreStatusUpdated', this.showSeeMore);
          }
        }, 100);
      });
    }
  },
  watch: {
    tags(newVal, oldVal) {
      this.recheckSeeMore();
    }
  }
});

// CONCATENATED MODULE: ./src/components/SwymCommunityTagsHeader.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_SwymCommunityTagsHeadervue_type_script_lang_js_ = (SwymCommunityTagsHeadervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/SwymCommunityTagsHeader.vue?vue&type=style&index=0&id=6d1101c3&lang=scss&scoped=true&
var SwymCommunityTagsHeadervue_type_style_index_0_id_6d1101c3_lang_scss_scoped_true_ = __webpack_require__("8d9d");

// EXTERNAL MODULE: ../node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("a6c2");

// CONCATENATED MODULE: ./src/components/SwymCommunityTagsHeader.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_SwymCommunityTagsHeadervue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "6d1101c3",
  null
  
)

/* harmony default export */ var SwymCommunityTagsHeader = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "091b":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "09e7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"577c093e-vue-loader-template"}!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./src/components/CommunitySettings/SwymFeatureCreationModal.vue?vue&type=template&id=2f269351&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('vu-modal',{attrs:{"show":_vm.show,"title":_vm.modalTitle},on:{"close":function () { return _vm.$emit('close'); }},scopedSlots:_vm._u([{key:"modal-body",fn:function(){return [_c('vu-form',{ref:"form"},[_c('vu-select',{staticClass:"select-content-reuse",attrs:{"label":_vm.$i18n('selectContentToReuse'),"options":_vm.contentToReuseList,"hide-placeholder-option":true,"required":"","disabled":_vm.inEditionMode},model:{value:(_vm.contentToReuseSelected),callback:function ($$v) {_vm.contentToReuseSelected=$$v},expression:"contentToReuseSelected"}}),_c('vu-input',{attrs:{"label":_vm.$i18n('name'),"rules":[
          function (v) { return v.length > 0 || 'Can\'t be empty'; } ],"required":""},model:{value:(_vm.contentName),callback:function ($$v) {_vm.contentName=$$v},expression:"contentName"}}),_c('div',{staticClass:"icon-color"},[_c('h5',[_vm._v(_vm._s(_vm.$i18n('iconAndColor')))]),_c('div',{staticClass:"section"},[_c('div',{staticClass:"demo-icon-color"},[_c('vu-icon',{style:({color: _vm.colorSelected}),attrs:{"icon":_vm.iconSelected}})],1),_c('SwymEditIconColor',{attrs:{"color-selected":_vm.colorSelected},on:{"iconSelected":function (icon) { return _vm.iconSelected = icon; },"colorSelected":function (color) { return _vm.colorSelected = color; }}})],1)])],1)]},proxy:true},{key:"modal-footer",fn:function(){return [(_vm.inEditionMode)?_c('vu-btn',{attrs:{"color":"primary"},on:{"click":_vm.edit}},[_vm._v(" "+_vm._s(_vm.$i18n('confirm'))+" ")]):_c('vu-btn',{attrs:{"color":"primary"},on:{"click":_vm.create}},[_c('vu-icon',{attrs:{"icon":"plus","color":"white"}}),_vm._v(_vm._s(_vm.$i18n('create'))+" ")],1),_c('vu-btn',{on:{"click":function () { return _vm.$emit('cancel'); }}},[_vm._v(" "+_vm._s(_vm.$i18n('cancel'))+" ")])]},proxy:true}])})}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/CommunitySettings/SwymFeatureCreationModal.vue?vue&type=template&id=2f269351&

// CONCATENATED MODULE: ../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./src/components/CommunitySettings/SwymFeatureCreationModal.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var SwymFeatureCreationModalvue_type_script_lang_js_ = ({
  name: 'SwymFeatureCreationModal',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    iconList: {
      type: Array,
      required: true,
    },
    contentToReuseList: {
      type: Array,
      required: true,
    },
    feature: {
      type: Object,
      default: undefined
    }
  },
  data() {
    return this.initialData();
  },
  watch: {
    show(newShowValue) {
      // Each time the modal is hidden (show == false)
      // -> Reset the modal
      if (!newShowValue) {
        this.reset();
      }
    },
  },
  computed: {
    /**
     * Return true if the component is in edition mode.
     * In Edition mode if the feature props exists.
     * @returns {boolean}
     */
    inEditionMode: function(){
      return this.feature ? true : false
    },


    /**
     * Return true if the component is in creation mode.
     * In Creation mode if the feature props does not exist.
     * @returns {boolean}
     */
    inCreationMode: function(){
      return this.feature ? false : true
    },

    /**
     * Return the title of the modal regarding the mode.
     * "Edit content type / Add content type".
     * @returns {string} Modal's title
     */
    modalTitle() {
      return this.inEditionMode ? this.$i18n('editContentType') : this.$i18n('addContentType');
    },
  },
  methods: {
    /**
     * Return the initial data
     */
    initialData() {
      const icon = this.feature && this.feature.icon;
      const color = this.feature && this.feature.color;
      const contentToReuse = this.feature && this.feature.contentToReuse;
      const name = this.feature && this.feature.label;

      return {
        iconSelected: icon || this.iconList[0],
        colorSelected: color || '#000000',
        contentToReuseSelected: contentToReuse || this.contentToReuseList[0].value,
        contentName: name || '',
      };
    },

    /**
     * Reset the modal with the initial data
     */
    reset() {
      Object.assign(this.$data, this.initialData());
    },

    /**
     * Check if the form is valid
     * & trigger create event
     */
    create() {
      if (this.$refs.form.validate()) {
        this.$emit('create', {
          contentToReuse: this.contentToReuseSelected,
          name: this.contentName,
          icon: this.iconSelected,
          color: this.colorSelected,
        });
      }
    },

    /**
     * Emit the "edit" event
     * - Label
     * - Icon/Color
     *  - Content to reuse (Post, Idea)
     */
    edit(){
      this.$emit(
        'edit',
        {
          label: this.contentName,
          icon: this.iconSelected,
          color: this.colorSelected,
          contentToReuse: this.contentToReuseSelected
        }
      )
    }
  },
});

// CONCATENATED MODULE: ./src/components/CommunitySettings/SwymFeatureCreationModal.vue?vue&type=script&lang=js&
 /* harmony default export */ var CommunitySettings_SwymFeatureCreationModalvue_type_script_lang_js_ = (SwymFeatureCreationModalvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/CommunitySettings/SwymFeatureCreationModal.vue?vue&type=style&index=0&lang=scss&
var SwymFeatureCreationModalvue_type_style_index_0_lang_scss_ = __webpack_require__("93ae");

// EXTERNAL MODULE: ../node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("a6c2");

// CONCATENATED MODULE: ./src/components/CommunitySettings/SwymFeatureCreationModal.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  CommunitySettings_SwymFeatureCreationModalvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var SwymFeatureCreationModal = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "0fbf":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "10ee":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "1484":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymThreadsList_vue_vue_type_style_index_0_id_64ac2f88_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("56cf");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymThreadsList_vue_vue_type_style_index_0_id_64ac2f88_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymThreadsList_vue_vue_type_style_index_0_id_64ac2f88_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "15fd":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "1725":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"577c093e-vue-loader-template"}!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./src/components/SwymText.vue?vue&type=template&id=ade26d9c&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.displayText)?_c('span',[_vm._v(_vm._s(_vm.displayText))]):_vm._e()}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/SwymText.vue?vue&type=template&id=ade26d9c&

// CONCATENATED MODULE: ../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./src/components/SwymText.vue?vue&type=script&lang=js&
//
//
//
//

/* harmony default export */ var SwymTextvue_type_script_lang_js_ = ({
  name: 'SwymText',
  props: {
    displayText: {
      type: String,
      default: '',
    },
  },
});

// CONCATENATED MODULE: ./src/components/SwymText.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_SwymTextvue_type_script_lang_js_ = (SwymTextvue_type_script_lang_js_); 
// EXTERNAL MODULE: ../node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("a6c2");

// CONCATENATED MODULE: ./src/components/SwymText.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_SwymTextvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var SwymText = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "17ac":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"577c093e-vue-loader-template"}!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./src/components/SwymThreadsList.vue?vue&type=template&id=64ac2f88&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{ref:"thread",staticClass:"social-threads-list"},[_c('div',{staticClass:"social-threads-toolbar-container"},[_c('div',{staticClass:"social-threads-toolbar-search"},[_c('input',{staticClass:"input-button-left-part form-control form-control-root",attrs:{"type":"text","placeholder":_vm.$i18n(_vm.i18nKeys.inputPlaceholder),"spellcheck":"true"},domProps:{"value":_vm.search},on:{"input":function($event){_vm.search = $event.target.value; _vm.$emit('search', _vm.search)}}}),_c('button',{staticClass:"input-button-right-part btn btn-root btn-with-icon btn-without-label",attrs:{"type":"button"},on:{"click":function($event){_vm.search = ''; _vm.$emit('search', _vm.search)}}},[_c('span',{class:'fonticon fonticon-clickable fonticon-' +
            (_vm.search ? 'cancel-circled' : 'search')})])]),_vm._l((_vm.icons),function(icon){return _c('span',{directives:[{name:"tooltip",rawName:"v-tooltip.body",value:(icon.tooltip),expression:"icon.tooltip",modifiers:{"body":true}}],key:("social-threads-action-icons-" + (icon.fonticon)),class:("social-threads-action-icons fonticon fonticon-clickable fonticon-" + (icon.fonticon)),on:{"click":function($event){return _vm.$emit('click:icon', icon.fonticon)}}})})],2),_c('hr'),_c('vu-scroller',[_c('div',{staticClass:"my-threads social-threads-list-container",staticStyle:{"width":"100%"}},[(_vm.showWhatsNew)?[_c('div',{staticClass:"list-container"},[_c('SwymThreadTile',{attrs:{"image":"fonticon-home","name":_vm.$i18n('whatsNew'),"selected":!_vm.selected},on:{"click":function($event){return _vm.$emit('update:selected', '')}}})],1),_c('hr')]:_vm._e(),(_vm.showFavorites)?[_c('div',{staticClass:"list-container"},[_c('div',{staticClass:"favorites-thread-container"},[_c('div',{staticClass:"threads-section-header"},[_c('h5',[_vm._v(_vm._s(_vm.$i18n(_vm.i18nKeys.favoriteThreads)))]),(_vm.type !== 'ritual')?_c('a',{staticClass:"link show-all-threads",on:{"click":function($event){return _vm.$emit('show-all-favorites')}}},[_vm._v(_vm._s(_vm.$i18n('showAll')))]):_vm._e()]),_c('div',{staticClass:"sortable-list-view-container"},[_vm._l((_vm.favoriteThreads),function(thread,n){return _c('vu-lazy',{key:thread.id,style:(("order: " + n + ";")),attrs:{"height":"60px"}},[_c('SwymThreadTile',{directives:[{name:"show",rawName:"v-show",value:(!_vm.draggedThread || _vm.draggedThread.id !== thread.id),expression:"!draggedThread || draggedThread.id !== thread.id"}],attrs:{"image":thread.image,"selected":_vm.selected === thread.id,"dropdown-options":_vm.dropDownOptions(thread),"unread":_vm.hasUnreadMessage(thread),"name":thread.title,"draggable":_vm.showFavorites},on:{"click":function($event){return _vm.$emit('update:selected', thread.id)}},nativeOn:{"dragstart":function($event){return _vm.startDrag($event, thread)},"dragend":function($event){return _vm.stopDrag($event)},"dragover":function($event){$event.preventDefault();return _vm.dragOver($event, thread)}}})],1)}),_c('transition',{attrs:{"name":"fade-height","mode":"out-in"}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:((!_vm.favoriteThreads.length && !_vm.search) || _vm.draggedThread),expression:"(!favoriteThreads.length && !search) || draggedThread"}],staticClass:"drop-zone-default",style:(("order: " + _vm.dropPosition + ";")),on:{"drop":function($event){return _vm.addFavorite(_vm.draggedThread)},"dragover":function($event){$event.preventDefault();},"dragenter":function($event){$event.preventDefault();return $event.currentTarget.classList.add('dragover')},"dragleave":function($event){$event.preventDefault();return $event.currentTarget.classList.remove('dragover')}}},[_c('span',{staticClass:"fonticon fonticon-drag-drop fonticon-2x"}),_c('span',{staticClass:"drop-zone-placeholder"},[_vm._v(_vm._s(_vm.$i18n('dropAddFavorite')))])])]),_c('transition',{attrs:{"name":"fade-height","mode":"out-in"}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.draggedThread && _vm.draggedThread.is_favorite),expression:"draggedThread && draggedThread.is_favorite"}],staticClass:"drop-zone-trash",style:(("order: " + (_vm.favoriteThreads.length) + ";")),on:{"drop":function($event){return _vm.removeFavorite(_vm.draggedThread)},"dragover":function($event){$event.preventDefault();},"dragenter":function($event){$event.preventDefault();return $event.currentTarget.classList.add('dragover')},"dragleave":function($event){$event.preventDefault();return $event.currentTarget.classList.remove('dragover')}}},[_c('span',{staticClass:"fonticon fonticon-trash fonticon-2x"}),_c('span',{staticClass:"drop-zone-placeholder"},[_vm._v(_vm._s(_vm.$i18n('dropRemoveFavorite')))])])]),(_vm.search && !_vm.favoriteThreads.length)?_c('div',{staticClass:"threads-no-result"},[_c('span',{staticClass:"fonticon fonticon-search"}),_c('span',[_vm._v(_vm._s(_vm.$i18n('noSearchResult')))])]):_vm._e()],2)])]),_c('hr')]:_vm._e(),_c('div',{staticClass:"list-container item-list-container"},[_c('div',{staticClass:"other-threads-container"},[_c('div',{staticClass:"threads-section-header"},[_c('h5',[_vm._v(_vm._s(_vm.$i18n(_vm.i18nKeys.myThread)))]),(_vm.type !== 'ritual')?_c('a',{staticClass:"link show-all-threads",on:{"click":function($event){return _vm.$emit('show-all-threads')}}},[_vm._v(_vm._s(_vm.$i18n('showAll')))]):_vm._e()]),_c('div',{staticClass:"item-list-body"},_vm._l((_vm.otherThreads),function(thread){return _c('vu-lazy',{key:thread.id,attrs:{"height":"60px"}},[_c('SwymThreadTile',{directives:[{name:"show",rawName:"v-show",value:(!_vm.draggedThread || _vm.draggedThread.id !== thread.id),expression:"!draggedThread || draggedThread.id !== thread.id"}],attrs:{"image":thread.image,"selected":_vm.selected === thread.id,"dropdown-options":_vm.dropDownOptions(thread),"unread":_vm.hasUnreadMessage(thread),"name":thread.title,"draggable":_vm.showFavorites},on:{"click":function($event){return _vm.$emit('update:selected', thread.id)}},nativeOn:{"dragstart":function($event){return _vm.startDrag($event, thread)},"dragend":function($event){return _vm.stopDrag($event)}}})],1)}),1),(!_vm.otherThreads.length)?[(!_vm.search)?_c('div',{staticClass:"drop-zone-default"},[_c('span',{staticClass:"fonticon fonticon-drag-drop fonticon-2x"}),_c('span',{staticClass:"drop-zone-placeholder"},[_vm._v(_vm._s(_vm.$i18n('dropAddFavorite')))])]):_c('div',{staticClass:"threads-no-result"},[_c('span',{staticClass:"fonticon fonticon-search"}),_c('span',[_vm._v(_vm._s(_vm.$i18n('noSearchResult')))])])]:_vm._e()],2)])],2)])],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/SwymThreadsList.vue?vue&type=template&id=64ac2f88&scoped=true&

// CONCATENATED MODULE: ./src/utils/throttle.js
/* harmony default export */ var throttle = ((func, limit) => {
  let lastFunc;
  let lastRan;
  // eslint-disable-next-line func-names
  return function (...args) {
    const context = this;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if ((Date.now() - lastRan) >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
});

// CONCATENATED MODULE: ../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./src/components/SwymThreadsList.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var SwymThreadsListvue_type_script_lang_js_ = ({
  name: 'SwymThreadsList',
  props: {
    type: {
      type: String,
      default: '',
      validator(value) { return ['', 'community', 'conversation', 'ritual'].includes(value); },
    },
    threads: {
      type: Array,
      required: true,
    },
    icons: {
      type: Array,
      default: () => ([]),
    },
    showFavorites: {
      type: Boolean,
      default: false,
    },
    showWhatsNew: {
      type: Boolean,
      default: false,
    },
    selected: {
      type: String,
      default: '',
    },
    i18nKeys: {
      type: Object,
      default: () => ({
        myThread: 'myCommunities',
        favoriteThreads: 'favoriteCommunities',
        inputPlaceholder: 'findCommunities',
        unfollow: 'unfollowCommunities',
      }),
    },
  },
  data: () => ({
    dropPosition: 0,
    search: '',
    draggedThread: null,
  }),
  computed: {
    favoriteThreads() {
      return this.threads.filter((el) => el.is_favorite);
    },
    otherThreads() {
      return this.showFavorites ? this.threads.filter((el) => !el.is_favorite) : this.threads;
    },
  },
  methods: {
    startDrag(event, thread) {
      // eslint-disable-next-line no-param-reassign
      event.dataTransfer.effectAllowed = 'move';
      setTimeout(() => { this.draggedThread = thread; });
    },
    stopDrag() {
      this.draggedThread = null;
      this.dropPosition = this.favoriteThreads.length;
    },
    dragOver: throttle(function dragOver(event, thread) {
      const { clientY, target } = event;
      let currentTarget = target;
      while (!currentTarget.className.includes('thread-view')) {
        currentTarget = currentTarget.parentElement;
      }
      const bounding = currentTarget.getBoundingClientRect();
      this.dropPosition = this.favoriteThreads.indexOf(thread);
      if (clientY - bounding.top < bounding.height / 2) { this.dropPosition -= 1; }
    }, 100),
    addFavorite(thread) {
      this.$emit('add-favorite', thread);
    },
    removeFavorite(thread) {
      this.$emit('remove-favorite', thread);
    },
    hasUnreadMessage(thread) {
      return (thread.last_message && thread.last_message.message_id)
      !== (thread.mark && thread.mark.message_id);
    },
    dropDownOptions(thread) {
      const options = [];
      if (this.type === 'community') {
        options.push({
          text: this.$i18n(this.i18nKeys.unfollow),
          fonticon: 'eye-slash',
          handler: (item) => this.$alert(`Click on ${item.text}! (${thread.title})`),
        });
      }

      if (this.showFavorites) {
        if (thread.is_favorite) {
          options.unshift({
            text: this.$i18n('removeFavorite'),
            fonticon: 'favorite-delete',
            handler: () => this.removeFavorite(thread),
          });
        } else {
          options.unshift({
            text: this.$i18n('addFavorite'),
            fonticon: 'favorite-add',
            handler: () => this.addFavorite(thread),
          });
        }
      }
      if (['community', 'conversation'].includes(this.type) && this.hasUnreadMessage(thread)) {
        options.unshift({
          text: this.$i18n('markAsRead'),
          fonticon: 'eye',
          handler: () => this.$emit('mark-as-read', thread),
        });
      }
      return options;
    },
  },
});

// CONCATENATED MODULE: ./src/components/SwymThreadsList.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_SwymThreadsListvue_type_script_lang_js_ = (SwymThreadsListvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/SwymThreadsList.vue?vue&type=style&index=0&id=64ac2f88&lang=scss&scoped=true&
var SwymThreadsListvue_type_style_index_0_id_64ac2f88_lang_scss_scoped_true_ = __webpack_require__("1484");

// EXTERNAL MODULE: ./src/components/SwymThreadsList.vue?vue&type=style&index=1&lang=css&
var SwymThreadsListvue_type_style_index_1_lang_css_ = __webpack_require__("18d0");

// EXTERNAL MODULE: ../node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("a6c2");

// CONCATENATED MODULE: ./src/components/SwymThreadsList.vue







/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_SwymThreadsListvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "64ac2f88",
  null
  
)

/* harmony default export */ var SwymThreadsList = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "1864":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"577c093e-vue-loader-template"}!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./src/components/SwymThreadTile.vue?vue&type=template&id=0c519ad0&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:['thread-view my-communities draggable-community community-item-view-container',
           { 'menu-is-open': _vm.isDMenuOpen, selected: _vm.selected }],on:{"click":function($event){return _vm.$emit('click')}}},[_c('div',{staticClass:"media-thumbnail-view-container"},[(!_vm.image.includes('fonticon'))?_c('img',{attrs:{"src":_vm.image}}):_c('span',{class:[_vm.image, 'fonticon fonticon-2x']})]),_c('div',{staticClass:"info-section"},[_c('div',{staticClass:"title"},[_vm._v(" "+_vm._s(_vm.name)+" "),_c('div',{staticClass:"ellipsis"},[_vm._v(" ... ")])])]),(_vm.unread || _vm.dropdownOptions.length)?_c('div',{staticClass:"tile-action-menu"},[(_vm.unread)?_c('span',{staticClass:"fonticon fonticon-record"}):_vm._e(),(_vm.dropdownOptions.length > 1)?_c('vu-dropdownmenu',{attrs:{"items":_vm.dropdownOptions},on:{"close":function($event){_vm.isDMenuOpen = false}},nativeOn:{"click":function($event){$event.stopPropagation();_vm.isDMenuOpen = true}}},[_c('span',{staticClass:"fonticon fonticon-clickable fonticon-chevron-down chevron-menu-icon"})]):(_vm.dropdownOptions.length === 1)?_c('span',{class:("fonticon fonticon-clickable fonticon-" + (_vm.dropdownOptions[0].fonticon)),on:{"click":function($event){$event.stopPropagation();return _vm.dropdownOptions[0].handler(_vm.dropdownOptions[0])}}}):_vm._e()],1):_vm._e()])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/SwymThreadTile.vue?vue&type=template&id=0c519ad0&scoped=true&

// CONCATENATED MODULE: ../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./src/components/SwymThreadTile.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var SwymThreadTilevue_type_script_lang_js_ = ({
  name: 'SwymThreadTile',
  props: {
    image: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      required: true,
    },
    unread: {
      type: Boolean,
      default: false,
    },
    selected: {
      type: Boolean,
      default: false,
    },
    dropdownOptions: {
      type: Array,
      default: () => ([]),
    },
  },
  data: () => ({
    console: window.console,
    isDMenuOpen: false,
  }),
});

// CONCATENATED MODULE: ./src/components/SwymThreadTile.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_SwymThreadTilevue_type_script_lang_js_ = (SwymThreadTilevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/SwymThreadTile.vue?vue&type=style&index=0&id=0c519ad0&lang=scss&scoped=true&
var SwymThreadTilevue_type_style_index_0_id_0c519ad0_lang_scss_scoped_true_ = __webpack_require__("8a81");

// EXTERNAL MODULE: ../node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("a6c2");

// CONCATENATED MODULE: ./src/components/SwymThreadTile.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_SwymThreadTilevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "0c519ad0",
  null
  
)

/* harmony default export */ var SwymThreadTile = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "18d0":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymThreadsList_vue_vue_type_style_index_1_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("b5f7");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymThreadsList_vue_vue_type_style_index_1_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymThreadsList_vue_vue_type_style_index_1_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "18d8":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "1a98":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "1e77":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "1ebd":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// prettier-ignore

// Need vu-dropdownmenu & btn with ref='dropdown-btn'

/* harmony default export */ __webpack_exports__["a"] = ({
  data() {
    return {
      dropdownMenu: null,
    };
  },
  methods: {
    resetPositionDropdown(show, direction = 'bottom') {
      return null;
      if (!show) {
        this.dropdownMenu.classList.remove('open');
        this.dropdownMenu = null;
      }

      this.$nextTick(function () {
        if (show) {
          const dropdownMenu = Array.from(document.querySelectorAll('.dropdown-menu')).find(
            (el) => el.style.display !== 'none' && !el.classList.contains('open'),
          );
          this.dropdownMenu = dropdownMenu;
          const {
            top, left, height, width,
          } = (this.$refs['dropdown-btn'].$el && this.$refs['dropdown-btn'].$el.getBoundingClientRect()) || this.$refs['dropdown-btn'].getBoundingClientRect();

          const dropdownWidth = dropdownMenu.getBoundingClientRect().width;
          const dropdownHeight = dropdownMenu.getBoundingClientRect().height;

          this.$nextTick(() => {
            if (direction === 'bottom') {
              dropdownMenu.style.top = `${top + height}px`;
              dropdownMenu.style.left = `${left - dropdownWidth + width}px`;
            } else if (direction === 'top') {
              dropdownMenu.style.top = `${top - dropdownHeight - 10}px`;
              dropdownMenu.style.left = `${left}px`;
            }

            dropdownMenu.classList.add('open');
          });
        }
      });
    },
  },

});


/***/ }),

/***/ "229b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymTimelineAuthor_vue_vue_type_style_index_0_id_04bf60af_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("d563");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymTimelineAuthor_vue_vue_type_style_index_0_id_04bf60af_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymTimelineAuthor_vue_vue_type_style_index_0_id_04bf60af_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "22bf":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "23d5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"577c093e-vue-loader-template"}!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./src/components/DefaultContent/SwymDefaultContentItem.vue?vue&type=template&id=bcb27e8c&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"default-content-item",class:_vm.content.type},[_c('div',{class:("default-content-icon " + (_vm.getClassColor())),style:(("" + (_vm.content.color ? ("background-color: " + (_vm.content.color) + ";") : '')))},[_c('vu-icon',{attrs:{"icon":_vm.getFonticon()}})],1),_c('div',{staticClass:"default-content-title"},[_vm._v(" "+_vm._s(_vm.content.label)+" "),(_vm.content.type.includes('WikitreePage'))?_c('div',{staticClass:"wiki-supbages-badge"},[(_vm.content.subpagesSelected && _vm.content.subpagesSelected !== '0')?_c('vu-badge',{attrs:{"color":"default"}},[_vm._v(_vm._s('+'+ ' ' + _vm.content.subpagesSelected + ' ' + _vm.$i18n('subpages')))]):_vm._e()],1):_vm._e()]),(!_vm.readOnly && _vm.content.type.includes('WikitreePage'))?_c('div',{staticClass:"wiki-set-as-root-button-radio"},[_c('vu-checkbox',{attrs:{"type":"radio","value":_vm.content.set_as_root? _vm.content.assetId: null,"disabled":_vm.content.disabled_set_as_root,"options":_vm.checkBoxOptions},on:{"input":_vm.updateSetAsRootWikiPage}})],1):_vm._e(),(!_vm.readOnly)?_c('div',{staticClass:"default-content-context-menu"},[_c('vu-dropdownmenu',{attrs:{"items":_vm.contextMenu},on:{"update:show":function (show) { return _vm.resetPositionDropdown(show, 'bottom'); }}},[_c('vu-icon-btn',{ref:"dropdown-btn",attrs:{"icon":"chevron-down"}})],1)],1):_vm._e()])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/DefaultContent/SwymDefaultContentItem.vue?vue&type=template&id=bcb27e8c&scoped=true&

// EXTERNAL MODULE: ./src/mixins/dropdown.js
var dropdown = __webpack_require__("1ebd");

// EXTERNAL MODULE: ./src/utils/style.js
var style = __webpack_require__("a7f7");

// CONCATENATED MODULE: ../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./src/components/DefaultContent/SwymDefaultContentItem.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ var SwymDefaultContentItemvue_type_script_lang_js_ = ({
  name: 'SwymDefaultContentItem',
  mixins: [dropdown["a" /* default */]],
  props: {
    content: {
      type: Object,
      required: true,
    },
    readOnly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      checkBoxOptions: [{
        value: this.content.assetId,
        label: this.$i18n('setAsRoot'),
      }],
      contextMenu: [{
        text: this.$i18n('delete'),
        fonticon: 'trash',
        handler: () => {
          this.$emit('removeDefaultContent');
        },
      }],
    };
  },
  computed: {
    descriptionFormatted() {
      return this.content.description;
    },
  },
  methods: {
    updateSetAsRootWikiPage(){
    /*  this.content.set_as_root = true;
      this.content.disabled_set_as_root = false;*/
      this.$emit('updateSetAsRootWikiPage', this.content);
    },
    getClassColor(){
      if(this.content.color){
        return ''
      }
      let contentType =  this.content.type.toLowerCase().split('swym:')[1];

      switch(contentType){
        case 'simulationmedia':
        case 'drawing':
        case 'picture':
        case 'sound':
        case 'video':
        case '3dmodel':
        case 'document':
        case 'animatedpicture':
          return 'media'
        default:
          return contentType
      }
     
    },

    getFonticon() {
      // Derived type
      if (this.content.icon) {
        return this.content.icon;
      }

      // Post/Media/Question/Wiki/Idea
      return Object(style["c" /* getFonticonByUri */])(this.content.type)
    },
  },
});

// CONCATENATED MODULE: ./src/components/DefaultContent/SwymDefaultContentItem.vue?vue&type=script&lang=js&
 /* harmony default export */ var DefaultContent_SwymDefaultContentItemvue_type_script_lang_js_ = (SwymDefaultContentItemvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/DefaultContent/SwymDefaultContentItem.vue?vue&type=style&index=0&id=bcb27e8c&lang=scss&scoped=true&
var SwymDefaultContentItemvue_type_style_index_0_id_bcb27e8c_lang_scss_scoped_true_ = __webpack_require__("2b25");

// EXTERNAL MODULE: ../node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("a6c2");

// CONCATENATED MODULE: ./src/components/DefaultContent/SwymDefaultContentItem.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  DefaultContent_SwymDefaultContentItemvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "bcb27e8c",
  null
  
)

/* harmony default export */ var SwymDefaultContentItem = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "2419":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "248b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"577c093e-vue-loader-template"}!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./src/components/Timeline/SwymTimelineMessageBody.vue?vue&type=template&id=086917ff&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:['content', _vm.type, { first: _vm.first }]},[_vm._t("default"),_c('div',{staticClass:"comment",domProps:{"innerHTML":_vm._s(_vm.text)}})],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Timeline/SwymTimelineMessageBody.vue?vue&type=template&id=086917ff&scoped=true&

// CONCATENATED MODULE: ../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./src/components/Timeline/SwymTimelineMessageBody.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var SwymTimelineMessageBodyvue_type_script_lang_js_ = ({
  name: 'SwymTimelineMessageBody',
  props: {
    type: {
      type: String,
      default: '',
      validate: (v) => (['post', 'media', 'idea', 'question'].includes(v)),
    },
    first: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      required: true,
    },
  },
});

// CONCATENATED MODULE: ./src/components/Timeline/SwymTimelineMessageBody.vue?vue&type=script&lang=js&
 /* harmony default export */ var Timeline_SwymTimelineMessageBodyvue_type_script_lang_js_ = (SwymTimelineMessageBodyvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/Timeline/SwymTimelineMessageBody.vue?vue&type=style&index=0&id=086917ff&lang=scss&scoped=true&
var SwymTimelineMessageBodyvue_type_style_index_0_id_086917ff_lang_scss_scoped_true_ = __webpack_require__("7ffd");

// EXTERNAL MODULE: ../node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("a6c2");

// CONCATENATED MODULE: ./src/components/Timeline/SwymTimelineMessageBody.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  Timeline_SwymTimelineMessageBodyvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "086917ff",
  null
  
)

/* harmony default export */ var SwymTimelineMessageBody = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "25ab":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"577c093e-vue-loader-template"}!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./src/components/Timeline/SwymTimelineSeparatorUnreadMessage.vue?vue&type=template&id=b6b828d0&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"unread-header"},[_c('hr'),_c('div',{staticClass:"unread-text"},[_vm._v(" "+_vm._s(_vm.$i18n('unreadMessages'))+" ")]),_c('hr')])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Timeline/SwymTimelineSeparatorUnreadMessage.vue?vue&type=template&id=b6b828d0&scoped=true&

// CONCATENATED MODULE: ../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./src/components/Timeline/SwymTimelineSeparatorUnreadMessage.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var SwymTimelineSeparatorUnreadMessagevue_type_script_lang_js_ = ({
  name: 'SwymTimelineSeparatorUnreadMessage',
});

// CONCATENATED MODULE: ./src/components/Timeline/SwymTimelineSeparatorUnreadMessage.vue?vue&type=script&lang=js&
 /* harmony default export */ var Timeline_SwymTimelineSeparatorUnreadMessagevue_type_script_lang_js_ = (SwymTimelineSeparatorUnreadMessagevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/Timeline/SwymTimelineSeparatorUnreadMessage.vue?vue&type=style&index=0&id=b6b828d0&lang=scss&scoped=true&
var SwymTimelineSeparatorUnreadMessagevue_type_style_index_0_id_b6b828d0_lang_scss_scoped_true_ = __webpack_require__("605b");

// EXTERNAL MODULE: ../node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("a6c2");

// CONCATENATED MODULE: ./src/components/Timeline/SwymTimelineSeparatorUnreadMessage.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  Timeline_SwymTimelineSeparatorUnreadMessagevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "b6b828d0",
  null
  
)

/* harmony default export */ var SwymTimelineSeparatorUnreadMessage = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "2b25":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymDefaultContentItem_vue_vue_type_style_index_0_id_bcb27e8c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("f551");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymDefaultContentItem_vue_vue_type_style_index_0_id_bcb27e8c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymDefaultContentItem_vue_vue_type_style_index_0_id_bcb27e8c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "2b33":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"577c093e-vue-loader-template"}!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./src/components/SwymTypingIndicator.vue?vue&type=template&id=45466732&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.displayText)?_c('div',{staticClass:"swym-typing-indicator"},[_c('div',{staticClass:"blink-elements-wrapper"},[_c('span',{staticClass:"blink-dot"}),_c('span',{staticClass:"blink-dot"}),_c('span',{staticClass:"blink-dot"}),_c('SwymText',{staticClass:"blink-text",attrs:{"display-text":_vm.displayText}})],1)]):_vm._e()}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/SwymTypingIndicator.vue?vue&type=template&id=45466732&scoped=true&

// CONCATENATED MODULE: ../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./src/components/SwymTypingIndicator.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var SwymTypingIndicatorvue_type_script_lang_js_ = ({
  name: 'SwymTypingIndicator',
  props: {
    displayText: {
      type: String,
      default: '',
    },
  },
});

// CONCATENATED MODULE: ./src/components/SwymTypingIndicator.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_SwymTypingIndicatorvue_type_script_lang_js_ = (SwymTypingIndicatorvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/SwymTypingIndicator.vue?vue&type=style&index=0&id=45466732&lang=scss&scoped=true&
var SwymTypingIndicatorvue_type_style_index_0_id_45466732_lang_scss_scoped_true_ = __webpack_require__("9334");

// EXTERNAL MODULE: ../node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("a6c2");

// CONCATENATED MODULE: ./src/components/SwymTypingIndicator.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_SwymTypingIndicatorvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "45466732",
  null
  
)

/* harmony default export */ var SwymTypingIndicator = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "2b3f":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "2c92":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"577c093e-vue-loader-template"}!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./src/components/CommunitySettings/SwymGenericCommunityVisibility.vue?vue&type=template&id=0e091a52&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('h5',[_vm._v(_vm._s(_vm.title))]),(_vm.description)?_c('p',[_vm._v(" "+_vm._s(_vm.description)+" ")]):_vm._e(),(_vm.readOnly)?_c('div',[_c('div',{staticClass:"label-visibility"},[_c('h5',[_c('vu-icon',{attrs:{"icon":_vm.visibilitySelected.icon}}),_vm._v(" "+_vm._s(_vm.visibilitySelected.label))],1),_c('p',[_vm._v(_vm._s(_vm.visibilitySelected.description))])])]):_c('div',{ref:"options",staticClass:"options"},[_c('vu-checkbox',{attrs:{"value":_vm.value.visibilitySelected,"type":"radio","options":_vm.formattedVisibility},on:{"input":function (v) { return _vm.$emit('update:visibility', v); }}}),(_vm.value.deactivateContentDisplayInWhatsNew)?_c('div',{ref:"optin",staticClass:"optin"},[_c('vu-checkbox',{attrs:{"value":_vm.value.deactivateChecked,"options":[_vm.value.deactivateContentDisplayInWhatsNew]},on:{"input":function (v) { return _vm.$emit('update:blacklist', v); }}}),_c('vu-icon-btn',{directives:[{name:"tooltip",rawName:"v-tooltip.top",value:(_vm.$i18n('deactivateContentDisplayInWhatsNewHelp')),expression:"$i18n('deactivateContentDisplayInWhatsNewHelp')",modifiers:{"top":true}}],staticClass:"info",attrs:{"icon":"info"}})],1):_vm._e()],1)])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/CommunitySettings/SwymGenericCommunityVisibility.vue?vue&type=template&id=0e091a52&scoped=true&

// CONCATENATED MODULE: ../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./src/components/CommunitySettings/SwymGenericCommunityVisibility.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var SwymGenericCommunityVisibilityvue_type_script_lang_js_ = ({
  name: 'SwymGenericCommunityVisibility',
  props: {
    value: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    readOnly: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    formattedVisibility() {
      const v = this.value.visibility.map((visibility) => ({
        ...visibility,
        label: `
        <div class="label-visibility">
          <h5><span class="fonticon fonticon-${visibility.icon}"></span>${visibility.label}</h5>
          <p>${visibility.description}</p>
        </div>`,
      }));

      return v;
    },
    visibilitySelected(){
      return this.value.visibility.find(el => this.value.visibilitySelected === el.value)
    },
  },
  
  mounted() {
    if (this.value.deactivateContentDisplayInWhatsNew) {
      const firstRadioButton = this.$refs.options && this.$refs.options.querySelector('.control-label');

      if(firstRadioButton){
        firstRadioButton.appendChild(this.$refs.optin);
      }
    }
  },
});

// CONCATENATED MODULE: ./src/components/CommunitySettings/SwymGenericCommunityVisibility.vue?vue&type=script&lang=js&
 /* harmony default export */ var CommunitySettings_SwymGenericCommunityVisibilityvue_type_script_lang_js_ = (SwymGenericCommunityVisibilityvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/CommunitySettings/SwymGenericCommunityVisibility.vue?vue&type=style&index=0&id=0e091a52&lang=scss&scoped=true&
var SwymGenericCommunityVisibilityvue_type_style_index_0_id_0e091a52_lang_scss_scoped_true_ = __webpack_require__("68dc");

// EXTERNAL MODULE: ../node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("a6c2");

// CONCATENATED MODULE: ./src/components/CommunitySettings/SwymGenericCommunityVisibility.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  CommunitySettings_SwymGenericCommunityVisibilityvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "0e091a52",
  null
  
)

/* harmony default export */ var SwymGenericCommunityVisibility = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "2f16":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"577c093e-vue-loader-template"}!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./src/components/Timeline/SwymTimelineReply.vue?vue&type=template&id=5b6c5864&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"replied-message"},[_c('span',{staticClass:"replied-message-content"},[_c('span',{staticClass:"fonticon fonticon-chat-alt"}),_c('a',{staticClass:"btn btn-link",attrs:{"href":("#people:" + (_vm.author.login) + "/activities")}},[_vm._v(_vm._s(_vm.author.firstName)+" "+_vm._s(_vm.author.lastName))]),_c('span',{staticClass:"semi-colon"},[_vm._v(":")]),_c('span',{staticClass:"ellipsis-text",domProps:{"innerHTML":_vm._s(_vm.text)}})])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Timeline/SwymTimelineReply.vue?vue&type=template&id=5b6c5864&scoped=true&

// CONCATENATED MODULE: ../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./src/components/Timeline/SwymTimelineReply.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var SwymTimelineReplyvue_type_script_lang_js_ = ({
  name: 'SwymTimelineReply',
  props: {
    author: {
      type: Object,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
});

// CONCATENATED MODULE: ./src/components/Timeline/SwymTimelineReply.vue?vue&type=script&lang=js&
 /* harmony default export */ var Timeline_SwymTimelineReplyvue_type_script_lang_js_ = (SwymTimelineReplyvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/Timeline/SwymTimelineReply.vue?vue&type=style&index=0&id=5b6c5864&lang=scss&scoped=true&
var SwymTimelineReplyvue_type_style_index_0_id_5b6c5864_lang_scss_scoped_true_ = __webpack_require__("6417");

// EXTERNAL MODULE: ../node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("a6c2");

// CONCATENATED MODULE: ./src/components/Timeline/SwymTimelineReply.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  Timeline_SwymTimelineReplyvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "5b6c5864",
  null
  
)

/* harmony default export */ var SwymTimelineReply = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "2fb1":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "3a44":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "3c3a":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "4447":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "install", function() { return /* reexport */ install; });

// CONCATENATED MODULE: ../node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (true) {
    var getCurrentScript = __webpack_require__("dc36")
    currentScript = getCurrentScript()

    // for backward compatibility, because previously we directly included the polyfill
    if (!('currentScript' in document)) {
      Object.defineProperty(document, 'currentScript', { get: getCurrentScript })
    }
  }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// EXTERNAL MODULE: ./src/styles/transitions.scss
var transitions = __webpack_require__("15fd");

// EXTERNAL MODULE: ./src/styles/global.scss
var global = __webpack_require__("b7e3");

// CONCATENATED MODULE: ./src/index.js
/* eslint-disable no-param-reassign */




const req = __webpack_require__("d78d");
const components = req.keys().map(req);

// eslint-disable-next-line no-unused-vars
const install = (Vue, i18n = {}) => {
  console.debug('i18n :>> ', i18n);
  components.forEach((el) => {
    console.debug('Installing :>> ', el.default.name);

    const $i18n = (key, opt = {}) => {
      let str = i18n[key] || `i18n_${key}`;

      Object.entries(opt).forEach(([k, value]) => {
        str = str.replace(`{${k}}`, value);
      });

      return str;
    };

    if (el.default.methods) {
      el.default.methods.$i18n = $i18n;
    } else {
      el.default.methods = { $i18n };
    }
    Vue.component(el.default.name, el.default);
  });
};

// if (typeof window !== 'undefined' && window.Vue) {
//   install(window.Vue);
// }

/* harmony default export */ var src_0 = (install);


// CONCATENATED MODULE: ../node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (src_0);



/***/ }),

/***/ "49b0":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymRssFeedModal_vue_vue_type_style_index_0_id_3f17f136_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("64ea");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymRssFeedModal_vue_vue_type_style_index_0_id_3f17f136_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymRssFeedModal_vue_vue_type_style_index_0_id_3f17f136_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "4e3b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymPipelineStatus_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("2419");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymPipelineStatus_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymPipelineStatus_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "5286":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "56cf":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "58b9":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"577c093e-vue-loader-template"}!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./src/components/Pipeline/SwymPipelineGraph.vue?vue&type=template&id=b2fab5a0&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{ref:"pipeline-graph",staticClass:"pipeline-graph",style:({'clip-path': ("path('" + _vm.pathDynamique + "')")})},_vm._l((_vm.statusArray),function(status,index){return _c('div',{key:index,class:("pipeline-subpart subpart-" + index),style:({
      'background-color': status.color
    })},[_c('span')])}),0)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Pipeline/SwymPipelineGraph.vue?vue&type=template&id=b2fab5a0&scoped=true&

// CONCATENATED MODULE: ../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./src/components/Pipeline/SwymPipelineGraph.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var SwymPipelineGraphvue_type_script_lang_js_ = ({
  name: 'SwymPipelineGraph',
  props: {
    statusArray: {
      type: Array,
      required: true,
    },
  },

  watch: {
    statusArray: {
      deep: true,
      handler() {
        this.pathDynamique();
      },
    },
  },
  created() {
    this.$nextTick(function () { this.pathDynamique(); });
    window.addEventListener('resize', () => this.pathDynamique());
  },
  methods: {

    /**
     * Curve drawing for Pipeline
     */
    pathDynamique() {
      // TODO change parameters to have the exact curve with the old Pipeline
      if (!this.$refs['pipeline-graph']) {
        return;
      }
      const width = this.$refs['pipeline-graph'].offsetWidth;
      const height = this.$refs['pipeline-graph'].offsetHeight;
      const gap = 30;

      // Usage of clip-path and the function path -> https://developer.mozilla.org/fr/docs/Web/CSS/clip-path
      const path = `M 0 0 C 0 0 ${width / 2} ${gap} ${width} ${gap} L ${width} ${height - gap} C ${width} ${height - gap} ${width / 2} ${height - gap} 0 ${height}`;

      this.$refs['pipeline-graph'].style = `clip-path: path('${path}')`;
    },
  },
});

// CONCATENATED MODULE: ./src/components/Pipeline/SwymPipelineGraph.vue?vue&type=script&lang=js&
 /* harmony default export */ var Pipeline_SwymPipelineGraphvue_type_script_lang_js_ = (SwymPipelineGraphvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/Pipeline/SwymPipelineGraph.vue?vue&type=style&index=0&id=b2fab5a0&lang=scss&scoped=true&
var SwymPipelineGraphvue_type_style_index_0_id_b2fab5a0_lang_scss_scoped_true_ = __webpack_require__("6657");

// EXTERNAL MODULE: ../node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("a6c2");

// CONCATENATED MODULE: ./src/components/Pipeline/SwymPipelineGraph.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  Pipeline_SwymPipelineGraphvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "b2fab5a0",
  null
  
)

/* harmony default export */ var SwymPipelineGraph = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "5966":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"577c093e-vue-loader-template"}!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./src/components/SwymEditIconColor.vue?vue&type=template&id=0fa3af62&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"edit-icon-color-link"},[_c('a',{ref:"link",attrs:{"href":"#"},on:{"click":function($event){$event.preventDefault();_vm.show = true}}},[_c('vu-icon',{attrs:{"icon":"pencil"}}),_vm._v(" "+_vm._s(_vm.$i18n("edit"))+" ")],1)]),(_vm.show)?_c('div',{ref:"popover",staticClass:"edit-icon-color-wrapper"},[_c('div',{staticClass:"edit-icon-color-header"},[_c('ul',[_c('li',{class:("" + (_vm.isIconMode ? 'active' : ''))},[_c('a',{attrs:{"href":"#"},on:{"click":function($event){$event.preventDefault();return _vm.switchColorToIcon($event)}}},[_vm._v(_vm._s(_vm.$i18n("icons")))])]),_c('li',{class:("" + (_vm.isColorMode ? 'active' : ''))},[_c('a',{attrs:{"href":"#"},on:{"click":function($event){$event.preventDefault();return _vm.switchIconToColor($event)}}},[_vm._v(_vm._s(_vm.$i18n("colors")))])])])]),(_vm.isIconMode)?_c('div',{staticClass:"edit-icon-color-body"},[_c('SwymIconList',{staticClass:"icon-list",on:{"onIconClick":function (icon) { return _vm.$emit('iconSelected', icon); }}})],1):_vm._e(),(_vm.isColorMode)?_c('div',{staticClass:"edit-icon-color-body"},[_c('ColorPicker',{staticClass:"vuetify-color-picker",attrs:{"value":_vm.colorSelected},on:{"update:value":function (color) { return _vm.$emit('colorSelected', color); }}})],1):_vm._e()]):_vm._e()])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/SwymEditIconColor.vue?vue&type=template&id=0fa3af62&

// CONCATENATED MODULE: ../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./src/components/SwymEditIconColor.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/**
 * 2 modes: Icon & Color
 * Represented by Tabs
 */
const MODE = {
  ICON: 'icon',
  COLOR: 'color',
};

/* harmony default export */ var SwymEditIconColorvue_type_script_lang_js_ = ({
  name: 'SwymEditIconColor',
  props: {
    colorSelected: {
      type: String,
      default: '#000000',
    },
  },
  data() {
    return {
      show: false,
      mode: MODE.ICON,
    };
  },
  computed: {

    /**
     * Return true if we are in Icon tab
     */
    isIconMode() {
      return this.mode === MODE.ICON;
    },

    /**
     * Return true if we are in Color tab
     */
    isColorMode() {
      return this.mode === MODE.COLOR;
    },
  },
  watch: {
    /**
     * Show
     * If true, set the top of the popover
     */
    show(newVal, oldVal) {
      if (newVal) {
        this.$nextTick(() => this.setPopoverTopPosition());
      }
    },
  },
  mounted() {
    document.addEventListener('click', (event) => this.hidePopover(event));
  },

  destroy() {
    document.removeEventListener('click');
  },
  methods: {
    /**
     * Icon to Color
     */
    switchIconToColor() {
      this.mode = MODE.COLOR;
    },

    /**
     * Color to Icon
     */
    switchColorToIcon() {
      this.mode = MODE.ICON;
    },

    /**
     * Set the top of the popover
     * (Must be below the Edit link + gap)
     */
    setPopoverTopPosition() {
      const popoverEl = this.$refs.popover;
      const linkEl = this.$refs.link;

      const topLinkEl = linkEl.getBoundingClientRect().top;

      popoverEl.style.top = `${topLinkEl}px`;
    },

    /**
     * Hide popover when the user clicks outside the popover element
     */
    hidePopover(event) {
      if (this.show) {
        const popoverEl = this.$refs.popover;
        const linkEl = this.$refs.link;

        if (popoverEl && linkEl) {
          // The clicked element can be the element itself, of an element inside
          const clickOnPopover = popoverEl === event.target || popoverEl.contains(event.target);
          const clickOnLink = linkEl === event.target || linkEl.contains(event.target);

          // If click event is not on popover or edit link, hide the popover
          if (!(clickOnPopover || clickOnLink)) {
            this.show = false;
          }
        }
      }
    },
  },
});

// CONCATENATED MODULE: ./src/components/SwymEditIconColor.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_SwymEditIconColorvue_type_script_lang_js_ = (SwymEditIconColorvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/SwymEditIconColor.vue?vue&type=style&index=0&lang=scss&
var SwymEditIconColorvue_type_style_index_0_lang_scss_ = __webpack_require__("ba07");

// EXTERNAL MODULE: ../node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("a6c2");

// CONCATENATED MODULE: ./src/components/SwymEditIconColor.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_SwymEditIconColorvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var SwymEditIconColor = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "5c51":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymDefaultContentWikiTreeModal_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("671c");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymDefaultContentWikiTreeModal_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymDefaultContentWikiTreeModal_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "6013":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "605b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymTimelineSeparatorUnreadMessage_vue_vue_type_style_index_0_id_b6b828d0_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("fee8");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymTimelineSeparatorUnreadMessage_vue_vue_type_style_index_0_id_b6b828d0_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymTimelineSeparatorUnreadMessage_vue_vue_type_style_index_0_id_b6b828d0_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "6108":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymTimelineAction_vue_vue_type_style_index_0_id_4daf6fca_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("7da4");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymTimelineAction_vue_vue_type_style_index_0_id_4daf6fca_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymTimelineAction_vue_vue_type_style_index_0_id_4daf6fca_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "620e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymContentCreationInline_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cbf8");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymContentCreationInline_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymContentCreationInline_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "6236":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"577c093e-vue-loader-template"}!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./src/components/Pipeline/SwymPipelineStatus.vue?vue&type=template&id=42599e53&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"pipeline-status-header"},[_c('span',{domProps:{"innerHTML":_vm._s(_vm.$i18n('statusList'))}}),_c('vu-icon-link',{attrs:{"icon":"plus"},on:{"click":_vm.addNewStatus}},[_vm._v(" "+_vm._s(_vm.$i18n('addStatus'))+" ")])],1),_c('vu-scroller',{staticClass:"status-scroller"},[_c('div',{staticClass:"pipeline-status"},_vm._l((_vm.statusArray),function(status,index){return _c('div',{key:index,staticClass:"status"},[_c('vu-input',{attrs:{"value":status.label},on:{"input":function (value) { return _vm.$emit('update:status_label', {statusIndex: index, label: value}); }}}),_c('input',{attrs:{"type":"color"},domProps:{"value":status.color},on:{"input":function (event) { return _vm.$emit('update:status_color',
                                   {statusIndex: index, color: event.target.value}
          ); }}}),_c('vu-btn-grp',[_c('vu-icon-btn',{attrs:{"disabled":_vm.statusArray.length <= _vm.minNbStatus,"icon":"close"},on:{"click":function($event){return _vm.removeStatus(index)}}}),_c('vu-icon-btn',{attrs:{"disabled":index == 0,"icon":"expand-left"},on:{"click":function($event){return _vm.changePositionStatus(index, 'LEFT')}}}),_c('vu-icon-btn',{attrs:{"disabled":index >= _vm.statusArray.length - 1,"icon":"expand-right"},on:{"click":function($event){return _vm.changePositionStatus(index, 'RIGHT')}}})],1)],1)}),0)]),_c('div',[_c('span',[_c('b',[_vm._v(_vm._s(_vm.$i18n('minimumStatus')))])])]),_c('div',{staticClass:"minimum-status"},[_c('vu-select',{attrs:{"value":_vm.minStatusToTransfer,"options":_vm.statusArray,"hide-placeholder-option":true},on:{"input":function (value) { return _vm.$emit('update:status_minStatusToTransfer', value); }}})],1)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Pipeline/SwymPipelineStatus.vue?vue&type=template&id=42599e53&

// CONCATENATED MODULE: ../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./src/components/Pipeline/SwymPipelineStatus.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var SwymPipelineStatusvue_type_script_lang_js_ = ({
  name: 'SwymPipelineStatus',
  props: {
    statusArray: {
      type: Array,
      required: true,
    },
    minStatusToTransfer: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      minNbStatus: 3,
    };
  },
  methods: {

    /**
     * Return random color (3DSwym)
     */
    rdmColor() {
      const r = (Math.round(Math.random() * 127) + 127).toString(16);
      const g = (Math.round(Math.random() * 127) + 127).toString(16);
      const b = (Math.round(Math.random() * 127) + 127).toString(16);

      return `#${r}${g}${b}`;
    },

    /**
     * Add new status in array
     */
    addNewStatus() {
      const newStatusN = this.statusArray.length + 1;
      this.$emit('addNewStatus', {
        label: `Status ${newStatusN}`,
        value: `status${newStatusN}`,
        color: this.rdmColor(),
      });
    },

    /**
     * Remove status in array relative to its index
     */
    removeStatus(index) {
      // this.statusArrayData.splice(index, 1);
      if (this.statusArray.length > this.minNbStatus) {
        this.$emit('removeStatus', index);
      }
    },

    /**
     * Change status's position in array relative to its index and direction
     * [a, b, c] --- LEFT b --> [b, a, c]
     * [a, b, c] --- RIGHT b --> [a, c, b]
     */
    changePositionStatus(index, direction) {
      // const item = this.statusArrayData[index];
      // switch (direction) {
      //   case 'LEFT':
      //     this.statusArrayData.splice(index, 1);
      //     this.statusArrayData.splice(index - 1, 0, item);
      //     break;
      //   case 'RIGHT':
      //     this.statusArrayData.splice(index, 1);
      //     this.statusArrayData.splice(index + 1, 0, item);
      //     break;
      //   default:
      // }
      if ((direction === 'LEFT' && index > 0)
      || (direction === 'RIGHT' && index < this.statusArray.length - 1)) {
        this.$emit('changePositionStatus', { statusIndex: index, direction });
      }
    },

  },
});

// CONCATENATED MODULE: ./src/components/Pipeline/SwymPipelineStatus.vue?vue&type=script&lang=js&
 /* harmony default export */ var Pipeline_SwymPipelineStatusvue_type_script_lang_js_ = (SwymPipelineStatusvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/Pipeline/SwymPipelineStatus.vue?vue&type=style&index=0&lang=scss&
var SwymPipelineStatusvue_type_style_index_0_lang_scss_ = __webpack_require__("4e3b");

// EXTERNAL MODULE: ../node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("a6c2");

// CONCATENATED MODULE: ./src/components/Pipeline/SwymPipelineStatus.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  Pipeline_SwymPipelineStatusvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var SwymPipelineStatus = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "6417":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymTimelineReply_vue_vue_type_style_index_0_id_5b6c5864_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("18d8");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymTimelineReply_vue_vue_type_style_index_0_id_5b6c5864_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymTimelineReply_vue_vue_type_style_index_0_id_5b6c5864_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "64ea":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "6657":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymPipelineGraph_vue_vue_type_style_index_0_id_b2fab5a0_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("7740");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymPipelineGraph_vue_vue_type_style_index_0_id_b2fab5a0_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymPipelineGraph_vue_vue_type_style_index_0_id_b2fab5a0_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "671c":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "6876":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "68dc":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymGenericCommunityVisibility_vue_vue_type_style_index_0_id_0e091a52_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("d54e");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymGenericCommunityVisibility_vue_vue_type_style_index_0_id_0e091a52_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymGenericCommunityVisibility_vue_vue_type_style_index_0_id_0e091a52_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "697c":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "6bfe":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CONTENT_TYPE_URI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return isDerivedType; });
/* unused harmony export preconditionTemplate */
/* unused harmony export preconditionTemplateByUri */
/* unused harmony export getMediaSearchPrecondition */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getSearchPrecondition; });
const CONTENT_TYPE = {
  POST: 'post',
  QUESTION: 'question',
  IDEA: 'ideation',
  WIKI: 'wiki',
  SURVEY: 'survey',
  MEDIA: 'media'
}


const MEDIA_URI = [
  "swym:Picture",
  "swym:AnimatedPicture",
  "swym:Document",
  "swym:Sound",
  "swym:Video",
  "swym:3dModel",
  "swym:Drawing",
  "swym:SimulationMedia",
]

const CONTENT_TYPE_URI = {
  'swym:Post': 'post',
  'swym:Question': 'question',
  'swym:Idea': 'ideation',
  'swym:WikitreePage': 'wiki',
  'swym:Survey': 'survey',
  'swym:Picture': 'media'
}


function isDerivedType(type) {
  switch (type) {
    case 'post':
    case 'ideation':
    case 'question':
    case 'wiki':
    case 'survey':
    case 'media':
      return false;
    default:
      return true;
  }
}

function preconditionTemplate(type) {
  return `[ds6w:type]:"swym:${type}"`
}

function preconditionTemplateByUri(uri) {
  return `[ds6w:type]:"${uri}"`
}

function getMediaSearchPrecondition() {
  let precondition = ''

  MEDIA_URI.forEach((mediaUri, index) => {
    precondition += `(${preconditionTemplateByUri(mediaUri)})`

    if (index < MEDIA_URI.length - 1) {
      precondition += " OR "
    }

  })

  return precondition;
}

function getSearchPrecondition(type) {
  let precondition = ''
  switch (type) {
    case 'post':
      precondition = preconditionTemplate('Post')
      break;
    case 'media':
      precondition = getMediaSearchPrecondition()
      break;
    case 'question':
      precondition = preconditionTemplate('Question');
      break;
    case 'ideation':
      precondition = preconditionTemplate('Idea');
      break;
    case 'wiki':
      precondition = preconditionTemplate('WikitreePage');
      break;
    default:
      precondition = preconditionTemplate('Post');
  }

  return `(${precondition})`
}



/***/ }),

/***/ "7352":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "7740":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "7c64":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymCommunityTagsSelected_vue_vue_type_style_index_0_id_39938c39_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("3c3a");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymCommunityTagsSelected_vue_vue_type_style_index_0_id_39938c39_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymCommunityTagsSelected_vue_vue_type_style_index_0_id_39938c39_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "7da4":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "7f38":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"577c093e-vue-loader-template"}!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./src/components/ContentCreationInline/SwymContentCreationInline.vue?vue&type=template&id=391fa0f3&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.show)?_c('div',{staticClass:"content-creation-inline-wrapper"},[_c('div',{staticClass:"content-creation-inline-container"},[_c('div',{staticClass:"content-creation-inline-header"},[_c('vu-icon',{staticClass:"content-icon",style:(_vm.setColor(_vm.feature.data, 'background-color')),attrs:{"icon":_vm.getFontIcon(_vm.feature.data)}}),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.title),expression:"title"}],staticClass:"content-title",attrs:{"placeholder":_vm.$i18n('addTitle')},domProps:{"value":(_vm.title)},on:{"input":function($event){if($event.target.composing){ return; }_vm.title=$event.target.value}}}),_c('vu-icon-btn',{staticClass:"content-icon-close",attrs:{"icon":"close"},on:{"click":function($event){_vm.show = false}}})],1),_c('div',{staticClass:"content-creation-inline-body"},[_c('CKEditor',{attrs:{"mode":_vm.modeCKEditor,"get-body-template":_vm.mode=== 'edit' ? _vm.feature.data.template.inlineTemplate.body : null,"type":"inline"}})],1),_c('div',{staticClass:"creation-inline-footer"},[_c('div',{staticClass:"buttons"},[_c('vu-btn',{attrs:{"color":"primary","disabled":_vm.disable},on:{"click":_vm.onSave}},[_vm._v(" "+_vm._s(_vm.$i18n('save'))+" ")]),_c('vu-btn',{on:{"click":_vm.onCancel}},[_vm._v(" "+_vm._s(_vm.$i18n('cancel'))+" ")])],1)])])]):_vm._e()}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/ContentCreationInline/SwymContentCreationInline.vue?vue&type=template&id=391fa0f3&

// EXTERNAL MODULE: ./src/utils/style.js
var style = __webpack_require__("a7f7");

// CONCATENATED MODULE: ./src/mixins/contentCreation.js

/* harmony default export */ var contentCreation = ({
	data() {
		return {};
	},
	methods: {
		getFontIcon(feature) {
			if (style["a" /* CONTENT_TYPE_ICON_COLOR */][feature.value]) {
				return style["a" /* CONTENT_TYPE_ICON_COLOR */][feature.value].icon;
			} else if (feature.contentToReuse) {
				return feature.icon;
			}
		},
		setColor(feature, rule) {
			let color = feature.contentToReuse ? feature.color : style["a" /* CONTENT_TYPE_ICON_COLOR */][feature.value].color;
			return `${rule}: ${color};`;
		}
	}
});

// EXTERNAL MODULE: ./src/utils/types.js
var types = __webpack_require__("6bfe");

// CONCATENATED MODULE: ../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./src/components/ContentCreationInline/SwymContentCreationInline.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ var SwymContentCreationInlinevue_type_script_lang_js_ = ({
  name: 'SwymContentCreationInline',
  mixins: [contentCreation],
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    feature: {
      type: Object,
      default: () => ({}),
    },
    mode: {
      type: String,
    },
    modeCKEditor: String,

  },
  data() {
    return {
      title: '',
      disable: this.mode !== 'edit',

    };
  },
  mounted() {
    //TODO replace with event from swym bm message manager
    this.fullScreen();
    this.setTitle();
    // disable button save when the ckeditor is empty
    this.$on('disableButtonSave', this.disableButtonSave);
  },

  methods: {
    onSave() {
      const templateData = this.getTemplateData();
      const options = { feature: this.feature, templateData };
      if (this.mode === 'edit') {
        this.$emit('editTemplateInline', options);
      } else {
        this.$emit('saveTemplateInline', options);
      }
      this.leaveScreen();
      this.show = false;
    },
    onCancel() {
      this.leaveScreen();
      this.show = false;
    },
    setTitle() {
      // TODO : to be inproved
      if (this.mode === 'edit') this.title = this.feature.data.template.inlineTemplate.title;
    },

    /**
     * Return template data
     * @returns {Object} - Template data
     * - title
     * - body
     * - type
     * - derived_type_transient_id (if the feature is a derived type)
     */
    getTemplateData() {
      const featureData = {
        ...this.feature.data,
        ...(this.feature.data.value === 'wiki') && { // Exception for wiki, TO IMPROVE
          value: 'wiki_page', // Value in back-end side
        },
      };
      const featureIsDerivedType = Object(types["c" /* isDerivedType */])(featureData.value);
      return {
        title: this.title,
        body: CKEDITOR.instances[this.modeCKEditor].getData(),
        type: (featureData.contentToReuse) ? featureData.contentToReuse.toUpperCase() : featureData.value.toUpperCase(),
        media_links: [], // TODO => support media
        ...featureIsDerivedType && {
          derived_type_transient_id: featureData.transientId,
        },
      };
    },
    fullScreen() {
      window.parent.postMessage({
        version: '1',
        type: 'requestFullScreen',
      }, '*');
    },
    leaveScreen() {
      window.parent.postMessage({
        version: '1',
        type: 'leaveFullScreen',
      }, '*');
    },
    disableButtonSave(ckeditorEmpty) {
      this.disable = ckeditorEmpty;
    },
  },

});

// CONCATENATED MODULE: ./src/components/ContentCreationInline/SwymContentCreationInline.vue?vue&type=script&lang=js&
 /* harmony default export */ var ContentCreationInline_SwymContentCreationInlinevue_type_script_lang_js_ = (SwymContentCreationInlinevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/ContentCreationInline/SwymContentCreationInline.vue?vue&type=style&index=0&lang=scss&
var SwymContentCreationInlinevue_type_style_index_0_lang_scss_ = __webpack_require__("620e");

// EXTERNAL MODULE: ../node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("a6c2");

// CONCATENATED MODULE: ./src/components/ContentCreationInline/SwymContentCreationInline.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  ContentCreationInline_SwymContentCreationInlinevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var SwymContentCreationInline = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "7fe0":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"577c093e-vue-loader-template"}!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./src/components/SwymRssFeedModal.vue?vue&type=template&id=3f17f136&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('vu-modal',{attrs:{"show":_vm.show,"title":_vm.title,"ok-label":_vm.okButtonText},on:{"confirm":_vm.destroy,"close":_vm.destroy},scopedSlots:_vm._u([{key:"modal-body",fn:function(){return [_c('div',{staticClass:"share-url-input"},[_c('vu-input',{ref:"rss-url-form-control",staticClass:"left-text",attrs:{"value":_vm.rssUrl}}),_c('vu-btn',{staticClass:"right-button default",on:{"click":_vm.copyLink}},[_vm._v(" "+_vm._s(_vm.copyLinkButtonText)+" ")])],1)]},proxy:true}])})}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/SwymRssFeedModal.vue?vue&type=template&id=3f17f136&scoped=true&

// CONCATENATED MODULE: ../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./src/components/SwymRssFeedModal.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var SwymRssFeedModalvue_type_script_lang_js_ = ({
  name: 'SwymRssFeedModal',
  props: {
    rssUrl: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    copyLinkButtonText: {
      type: String,
      required: true,
    },
    okButtonText: {
      type: String,
      required: true,
    },
    alertMessage: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      show: true,
    };
  },
  methods: {
    /**
         * Put RSS Feed link into the clipboard
         */
    async copyLink() {
      const input = this.$refs['rss-url-form-control'].$el.getElementsByTagName('input')[0];

      input.focus();
      input.select();

      try {
        await navigator.clipboard.writeText(input.value); // Write the input value in the clipboard

        this.$message({
          text: this.alertMessage,
          timeout: 5000,
          color: 'success',
        });
      } catch (err) {
        throw new Error('Problem with the clipboard');
      }
    },

    destroy() {
      this.$destroy();
      this.$el.parentNode.removeChild(this.$el); // Remove the component from the DOM
    },
  },
});

// CONCATENATED MODULE: ./src/components/SwymRssFeedModal.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_SwymRssFeedModalvue_type_script_lang_js_ = (SwymRssFeedModalvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/SwymRssFeedModal.vue?vue&type=style&index=0&id=3f17f136&lang=scss&scoped=true&
var SwymRssFeedModalvue_type_style_index_0_id_3f17f136_lang_scss_scoped_true_ = __webpack_require__("49b0");

// EXTERNAL MODULE: ./src/components/SwymRssFeedModal.vue?vue&type=style&index=1&lang=css&
var SwymRssFeedModalvue_type_style_index_1_lang_css_ = __webpack_require__("e03b");

// EXTERNAL MODULE: ../node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("a6c2");

// CONCATENATED MODULE: ./src/components/SwymRssFeedModal.vue







/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_SwymRssFeedModalvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "3f17f136",
  null
  
)

/* harmony default export */ var SwymRssFeedModal = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "7ffd":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymTimelineMessageBody_vue_vue_type_style_index_0_id_086917ff_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("0fbf");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymTimelineMessageBody_vue_vue_type_style_index_0_id_086917ff_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymTimelineMessageBody_vue_vue_type_style_index_0_id_086917ff_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "847e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"577c093e-vue-loader-template"}!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./src/components/CommunitySettings/SwymCommunityTag.vue?vue&type=template&id=5c6c1b58&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"community-tag",class:{ editable: _vm.editable, closable: _vm.editable, 'selected': _vm.tag.selected, 'readonly': _vm.tag.readonly },on:{"click":_vm.tagSelected}},[_c('span',{staticClass:"fonticon icon",class:("fonticon-" + _vm.icon),attrs:{"title":_vm.tag.label}}),_c('span',{staticClass:"content"},[_vm._v(_vm._s(_vm.tag.label))]),(_vm.editable)?_c('span',{staticClass:"fonticon fonticon-cancel close-btn",on:{"click":_vm.tagClosed}}):_vm._e()])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/CommunitySettings/SwymCommunityTag.vue?vue&type=template&id=5c6c1b58&scoped=true&

// CONCATENATED MODULE: ../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./src/components/CommunitySettings/SwymCommunityTag.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//

/* harmony default export */ var SwymCommunityTagvue_type_script_lang_js_ = ({
  name: 'SwymCommunityTag',
  props: {
    tag: {
      type: Object,
      required: true,
    },
    editable: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    tagSelected() {
      if (!this.editable) {
        this.$emit('tagSelected', this.tag);
      }
    },
    tagClosed() {
      this.$emit('tagClosed', this.tag);
    }
  },
  computed: {
    icon() {
      const sixw = this.tag.sixw_db || this.tag.sixw;
      return sixw.replace('ds6w:', '3ds-');
    }
  }
});

// CONCATENATED MODULE: ./src/components/CommunitySettings/SwymCommunityTag.vue?vue&type=script&lang=js&
 /* harmony default export */ var CommunitySettings_SwymCommunityTagvue_type_script_lang_js_ = (SwymCommunityTagvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/CommunitySettings/SwymCommunityTag.vue?vue&type=style&index=0&id=5c6c1b58&lang=scss&scoped=true&
var SwymCommunityTagvue_type_style_index_0_id_5c6c1b58_lang_scss_scoped_true_ = __webpack_require__("8def");

// EXTERNAL MODULE: ../node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("a6c2");

// CONCATENATED MODULE: ./src/components/CommunitySettings/SwymCommunityTag.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  CommunitySettings_SwymCommunityTagvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "5c6c1b58",
  null
  
)

/* harmony default export */ var SwymCommunityTag = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "8592":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"577c093e-vue-loader-template"}!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./src/components/IconList/SwymIconSection.vue?vue&type=template&id=a1d1ad3a&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"icon-section"},[_c('h6',[_vm._v(_vm._s(_vm.title))]),_c('div',_vm._l((_vm.icons),function(icon,index){return _c('vu-icon-btn',{key:index,attrs:{"icon":("" + icon)},on:{"click":function () { return _vm.$emit('click', ("" + icon)); }}})}),1)])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/IconList/SwymIconSection.vue?vue&type=template&id=a1d1ad3a&

// CONCATENATED MODULE: ../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./src/components/IconList/SwymIconSection.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var SwymIconSectionvue_type_script_lang_js_ = ({
  name: 'SwymIconSection',
  props: {
    title: {
      type: String,
      required: true,
    },
    icons: {
      type: Array,
      required: true,
    },
  },
  created() {
  },
});

// CONCATENATED MODULE: ./src/components/IconList/SwymIconSection.vue?vue&type=script&lang=js&
 /* harmony default export */ var IconList_SwymIconSectionvue_type_script_lang_js_ = (SwymIconSectionvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/IconList/SwymIconSection.vue?vue&type=style&index=0&lang=scss&
var SwymIconSectionvue_type_style_index_0_lang_scss_ = __webpack_require__("c29e");

// EXTERNAL MODULE: ../node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("a6c2");

// CONCATENATED MODULE: ./src/components/IconList/SwymIconSection.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  IconList_SwymIconSectionvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var SwymIconSection = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "877b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymSmallPipeline_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("091b");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymSmallPipeline_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymSmallPipeline_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "893d":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"577c093e-vue-loader-template"}!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./src/components/Timeline/SwymTimelineAction.vue?vue&type=template&id=4daf6fca&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"message-action"},[_c('span',{staticClass:"fonticon fonticon-comment"}),_c('span',{domProps:{"innerHTML":_vm._s(_vm.actionHTML())}})])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Timeline/SwymTimelineAction.vue?vue&type=template&id=4daf6fca&scoped=true&

// CONCATENATED MODULE: ../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./src/components/Timeline/SwymTimelineAction.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//

/* harmony default export */ var SwymTimelineActionvue_type_script_lang_js_ = ({
  name: 'SwymTimelineAction',
  props: {
    type: {
      type: String,
      default: 'Comment',
    },
    content: {
      type: Object,
      default: () => ({}),
    },
    baseUrl: {
      type: String,
      default: '',
    },
  },
  methods: {
    actionHTML() {
      switch (this.type) {
        case 'Comment':
          return this.$i18n('timelineActionComment', {
            content_type: this.$i18n('media'),
            content_title: this.content.subject_title,
            content_href: `#${this.baseUrl}/${this.content.subject_model.toLowerCase()}:${this.content.subject_id}`,
          });
        default:
          return '';
      }
    },
  },
});

// CONCATENATED MODULE: ./src/components/Timeline/SwymTimelineAction.vue?vue&type=script&lang=js&
 /* harmony default export */ var Timeline_SwymTimelineActionvue_type_script_lang_js_ = (SwymTimelineActionvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/Timeline/SwymTimelineAction.vue?vue&type=style&index=0&id=4daf6fca&lang=scss&scoped=true&
var SwymTimelineActionvue_type_style_index_0_id_4daf6fca_lang_scss_scoped_true_ = __webpack_require__("6108");

// EXTERNAL MODULE: ../node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("a6c2");

// CONCATENATED MODULE: ./src/components/Timeline/SwymTimelineAction.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  Timeline_SwymTimelineActionvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "4daf6fca",
  null
  
)

/* harmony default export */ var SwymTimelineAction = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "8a81":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymThreadTile_vue_vue_type_style_index_0_id_0c519ad0_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("3a44");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymThreadTile_vue_vue_type_style_index_0_id_0c519ad0_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymThreadTile_vue_vue_type_style_index_0_id_0c519ad0_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "8d64":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"577c093e-vue-loader-template"}!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./src/components/SwymContributionItem.vue?vue&type=template&id=6f007cad&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:[
    'contribution-item',
    { 'last-contribution': _vm.isLastItem, disabled: !_vm.activated } ],attrs:{"data-model-id":_vm.mid,"data-model-type":_vm.contentType}},[_c('div',{class:['icon-wrapper', _vm.contentType, { validated: _vm.isValidatedQuestion }],style:(_vm.color ? { backgroundColor: _vm.color } : {}),attrs:{"draggable":_vm.activated},on:{"click":_vm.goToItem},nativeOn:{"dragstart":function($event){return _vm.dragItem($event)}}},[_c('span',{class:['fonticon', ("fonticon-" + _vm.icon)]})]),_c('div',{staticClass:"title-wrapper",attrs:{"draggable":_vm.activated},on:{"click":_vm.goToItem},nativeOn:{"dragstart":function($event){return _vm.dragItem($event)}}},[(!_vm.title)?[_vm._v(" "+_vm._s(_vm.NLS.NoTitleYet)+" ")]:[_c('a',{staticClass:"title-text",attrs:{"href":_vm.relPath},on:{"click":function($event){$event.preventDefault();return (function () { return false; })($event)}}},[_vm._v(_vm._s(_vm.title))]),(_vm.isDraft)?_c('span',{staticClass:"draft-title"},[_vm._v(_vm._s(_vm.NLS.Draft))]):_vm._e()]],2),_c('div',{staticClass:"publish-data-wrapper"},[(_vm.isDraft)?_c('span',{staticClass:"draft-status"},[_vm._v(" "+_vm._s(_vm.NLS.Draft)+" ")]):_c('span',[_vm._v(_vm._s(_vm.publishDate))])]),_c('div',{staticClass:"dropdown-wrapper"},[_c('vu-dropdownmenu',{attrs:{"items":_vm.activated ? _vm.dropdownOptions : []},on:{"close":function($event){_vm.isDMenuOpen = false}},nativeOn:{"click":function($event){$event.stopPropagation();_vm.isDMenuOpen = true}}},[_c('span',{staticClass:"fonticon fonticon-clickable fonticon-down-open"})])],1),_c('div',{staticClass:"buttons-wrapper"},[_c('vu-btn-grp',[_c('vu-icon-btn',{directives:[{name:"tooltip",rawName:"v-tooltip.body",value:(_vm.NLS.Edit),expression:"NLS.Edit",modifiers:{"body":true}}],attrs:{"icon":"pencil","disabled":!_vm.activated},on:{"click":_vm.editItem}}),_c('vu-icon-btn',{directives:[{name:"tooltip",rawName:"v-tooltip.body",value:(_vm.NLS.Delete),expression:"NLS.Delete",modifiers:{"body":true}}],attrs:{"icon":"trash","disabled":!_vm.activated},on:{"click":_vm.deleteItem}})],1)],1)])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/SwymContributionItem.vue?vue&type=template&id=6f007cad&scoped=true&

// CONCATENATED MODULE: ../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./src/components/SwymContributionItem.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var SwymContributionItemvue_type_script_lang_js_ = ({
  name: "SwymContributionItem",
  props: {
    activated: {
      type: Boolean,
      default: true,
    },
    isLastItem: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: "",
    },
    isValidatedQuestion: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    isDraft: {
      type: Boolean,
      default: false,
    },
    publishDate: {
      type: String,
      default: "",
    },
    mid: {
      type: String,
      required: true,
    },
    contentType: {
      type: String,
      required: true,
    },
    contentName: {
      type: String,
    },
    relPath: {
      type: String,
      default: "",
    },
    i18nKeys: {
      type: Object,
      default: () => ({}),
    },
    NLS: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      isDMenuOpen: false,
      dropdownOptions: [
        {
          text: this.NLS.Edit,
          fonticon: "pencil",
          handler: () => this.editItem(),
        },
        {
          text: this.NLS.Delete,
          fonticon: "trash",
          handler: () => this.deleteItem(),
        },
      ],
    };
  },
  methods: {
    editItem() {
      this.activated && this.$emit("editItem", this.mid);
    },
    deleteItem() {
      this.activated && this.$emit("deleteItem", this.mid);
    },
    goToItem() {
      this.activated && this.$emit("goToItem", this.mid);
    },
    dragItem(event) {
      this.activated && this.$emit("dragItem", { event, mid: this.mid });
    },
  },
});

// CONCATENATED MODULE: ./src/components/SwymContributionItem.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_SwymContributionItemvue_type_script_lang_js_ = (SwymContributionItemvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/SwymContributionItem.vue?vue&type=style&index=0&id=6f007cad&lang=scss&scoped=true&
var SwymContributionItemvue_type_style_index_0_id_6f007cad_lang_scss_scoped_true_ = __webpack_require__("e04e");

// EXTERNAL MODULE: ../node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("a6c2");

// CONCATENATED MODULE: ./src/components/SwymContributionItem.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_SwymContributionItemvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "6f007cad",
  null
  
)

/* harmony default export */ var SwymContributionItem = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "8d9d":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymCommunityTagsHeader_vue_vue_type_style_index_0_id_6d1101c3_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("2fb1");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymCommunityTagsHeader_vue_vue_type_style_index_0_id_6d1101c3_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymCommunityTagsHeader_vue_vue_type_style_index_0_id_6d1101c3_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "8def":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymCommunityTag_vue_vue_type_style_index_0_id_5c6c1b58_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("2b3f");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymCommunityTag_vue_vue_type_style_index_0_id_5c6c1b58_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymCommunityTag_vue_vue_type_style_index_0_id_5c6c1b58_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "9334":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymTypingIndicator_vue_vue_type_style_index_0_id_45466732_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("9ee7");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymTypingIndicator_vue_vue_type_style_index_0_id_45466732_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymTypingIndicator_vue_vue_type_style_index_0_id_45466732_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "93ae":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymFeatureCreationModal_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("9920");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymFeatureCreationModal_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymFeatureCreationModal_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "94cb":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"577c093e-vue-loader-template"}!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./src/components/SwymCockpit.vue?vue&type=template&id=cd12ee28&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"cockpit-container"},[(_vm.defaultView)?_c('div',{staticClass:"default-view"},[_c('h5',[_vm._v(_vm._s(_vm.$i18n("defaultView")))]),_c('span',[_vm._v(" "+_vm._s(_vm.$i18n("or"))+" ")]),_c('vu-btn',{attrs:{"color":"primary"},on:{"click":_vm.switchDefaultToEditView}},[_c('vu-icon',{attrs:{"color":"white","icon":"plus"}}),_vm._v(" "+_vm._s(_vm.$i18n("selectContent"))+" ")],1)],1):_vm._e(),(_vm.editView)?_c('div',{staticClass:"edit-view"},[_c('div',{staticClass:"edit-view-body"},[_c('vu-select',{attrs:{"label":_vm.$i18n('contentType'),"placeholder":"Select","hide-placeholder-option":true,"options":_vm.contentTypeList},model:{value:(_vm.contentTypeValue),callback:function ($$v) {_vm.contentTypeValue=$$v},expression:"contentTypeValue"}}),(_vm.contentTypeValue)?_c('vu-select',{attrs:{"label":_vm.$i18n('contentToDisplay'),"placeholder":"Select","hide-placeholder-option":true,"options":_vm.contentToDisplayList},model:{value:(_vm.contentToDisplaySelected),callback:function ($$v) {_vm.contentToDisplaySelected=$$v},expression:"contentToDisplaySelected"}}):_vm._e()],1),_c('div',{staticClass:"edit-view-footer"},[_c('vu-btn',{attrs:{"color":"primary"},on:{"click":_vm.switchEditOrSelectionToDefaultView}},[_vm._v(" "+_vm._s(_vm.$i18n("cancel"))+" ")]),_c('vu-btn',{attrs:{"color":"primary","disabled":!_vm.contentToDisplaySelected},on:{"click":_vm.switchEditToSelectionView}},[_vm._v(" "+_vm._s(_vm.$i18n("addContent"))+" ")])],1)]):_vm._e(),(_vm.selectionView)?_c('div',{staticClass:"selection-view"},[_c('h5',[_vm._v(_vm._s(_vm.$i18n("selectedView")))]),_c('div',[_c('vu-icon',{style:(("color: " + (_vm.iconColorType.color) + ";")),attrs:{"icon":_vm.iconColorType.icon}}),_vm._v(" "+_vm._s(_vm.labelSelection)+" "),_c('vu-icon-btn',{attrs:{"icon":"close"},on:{"click":_vm.removeContent}})],1)]):_vm._e()])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/SwymCockpit.vue?vue&type=template&id=cd12ee28&

// EXTERNAL MODULE: ./src/utils/types.js
var types = __webpack_require__("6bfe");

// EXTERNAL MODULE: ./src/utils/style.js
var style = __webpack_require__("a7f7");

// CONCATENATED MODULE: ../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./src/components/SwymCockpit.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//







/* harmony default export */ var SwymCockpitvue_type_script_lang_js_ = ({
  name: 'SwymCockpit',
  props: {
    contentTypesAndContentToDisplay: {
      type: Array,
      required: true,
    },
    dataCockpit: {
      type: Object,
      default: null,
    },
  },

  data() {
    // The user want to display all content from the (derived) type selected
    const allContent = {
      label: this.$i18n("allContent"),
      value: 'allContent',
    };
    const { dataCockpit } = this;
    const contentType = dataCockpit && dataCockpit.contentType;
    const contentToDisplay = dataCockpit && dataCockpit.contentToDisplay;
    const contentToDisplayIsNull = dataCockpit && (dataCockpit.contentToDisplay === null);
    const allContentIsSelected = contentToDisplayIsNull && contentType;

    return {
      contentTypeValue: contentType || null,
      // 3 ways -> YYY-YYY-YYY / allContent / null
      contentToDisplaySelected: (
        contentToDisplay
        || (allContentIsSelected ? allContent.value : contentToDisplay)
        || null),
      isSelectingContent: false,
      allContent
    };
  },
  computed: {

    /**
     * Return the content type list formatted
     */
    contentTypeList() {
      const list = this.contentTypesAndContentToDisplay.map((el) => (
        {
          label: el.label,
          value: el.transient_id || el.type,
        }));

      return list;
    },

    /**
     * Return the content to display (regarding the content type selected before)
     */
    contentToDisplayList() {
      // All (derived) type can be used to filter the Business Method community
      const list = [this.allContent];

      if (this.contentTypeValue) {
        const type = this.contentTypesAndContentToDisplay.find(
          (el) => (el.transient_id === this.contentTypeValue)
          || (el.type === this.contentTypeValue),
        );

        const contentsToDisplayList = type.contentToDisplay
        && type.contentToDisplay.map((content) => ({
          label: content.label,
          value: content.transient_id,
        }));
        if(contentsToDisplayList){
          list.push(...contentsToDisplayList);
        }
      }

      return list;
    },

    /**
     * Return the icon & color of the (derived) type
     */
    iconColorType() {
      if (Object(types["c" /* isDerivedType */])(this.contentTypeValue)) {
        const contentType = this.contentTypesAndContentToDisplay.find(
          (el) => el.transient_id && el.transient_id === this.contentTypeValue,
        );

        if (contentType) {
          return {
            icon: contentType.icon,
            color: contentType.color,
          };
        } else {
          // If the content type was removed in Business Method
          // Return in the Default View
          this.switchEditOrSelectionToDefaultView()
        }
      }

      // Media - different icon according to media type
      if(this.contentTypeValue === 'media'){
        if(this.contentToDisplaySelected){
          const type = this.contentTypesAndContentToDisplay.find(
            (el) => el.transient_id === this.contentTypeValue
                    || el.type === this.contentTypeValue,
          );
          const contentsToDisplayList = type.contentToDisplay;
          const contentToDisplay = contentsToDisplayList && contentsToDisplayList.find(
            (el) => el.transient_id === this.contentToDisplaySelected,
          );

          if(contentToDisplay){
            return Object(style["b" /* MEDIA_TYPE_ICON_COLOR */])(contentToDisplay.type)
          }
        }
      }

      return style["a" /* CONTENT_TYPE_ICON_COLOR */][this.contentTypeValue];
    },

    /**
     * State of all views in Cockpit
     */

    /**
     * Default view
     * Logo & Select content button
     */
    defaultView() {
      return (
        !this.isSelectingContent
        && this.contentTypeValue === null
        && this.contentToDisplaySelected === null
      );
    },

    /**
     * Edit view
     * Content type & Content to display selection
     */
    editView() {
      return (
        this.isSelectingContent
      );
    },

    /**
     * Selection view
     * Content/All content selected
     */
    selectionView() {
      return (
        !this.isSelectingContent
        && this.contentTypeValue !== null
      );
    },

    /**
     * Show formatted label
     * e.g. Post / Sample post (X)
     * Post (X)
     * Idea (X)
     * Idea / Good idea (X)
     */
    labelSelection() {
      let labelFormatted = '';

      const type = this.contentTypesAndContentToDisplay.find(
        (el) => el.transient_id === this.contentTypeValue
                || el.type === this.contentTypeValue,
      );
      const contentsToDisplayList = type.contentToDisplay;
      const contentToDisplay = contentsToDisplayList && contentsToDisplayList.find(
        (el) => el.transient_id === this.contentToDisplaySelected,
      );
      const labelType = type.label;
      const labelContentToDisplay = contentToDisplay ? contentToDisplay.label : '';
      const allContentIsSelected = this.contentToDisplaySelected === this.allContent.value;

      labelFormatted = `${labelType}${allContentIsSelected ? '' : ` / ${labelContentToDisplay}`}`;
      return labelFormatted;
    },
  },
  mounted() {
    // Create BE Data Cockpit at the beginning
    const beDataCockpit = this.createBEDataCockpit();
    this.$emit('sendBEDataCockpit', beDataCockpit);
  },
  methods: {

    /**
     * Switch Default view -> Edit view
     */
    switchDefaultToEditView() {
      this.isSelectingContent = true;

      this.$emit('isEditView');
    },

    /**
     * Switch Edit view -> Selection view
     */
    switchEditToSelectionView() {
      if (this.contentTypeValue && this.contentToDisplaySelected) {
        this.isSelectingContent = false;

        // Create BE Data Cockpit
        const beDataCockpit = this.createBEDataCockpit();
        this.$emit('sendBEDataCockpit', beDataCockpit);

        this.$emit('isSelectionView');
      }
    },

    /**
     * Switch Edit or Selection view -> Default view
     */
    switchEditOrSelectionToDefaultView() {
      // Reset data
      this.isSelectingContent = false;
      this.contentTypeValue = null;
      this.contentToDisplaySelected = null;

      // Create BE Data Cockpit
      const beDataCockpit = this.createBEDataCockpit();
      this.$emit('sendBEDataCockpit', beDataCockpit);

      this.$emit('isDefaultView');
    },

    /**
     * Remove content selected -> All content selected -> default view
     * e.g. Post / YYY (X) -> Post (X) -> Default View
     */
    removeContent() {
      // If All content was selected, switch to default view
      if (this.contentToDisplaySelected === this.allContent.value) {
        this.switchEditOrSelectionToDefaultView();
      }
      // If a specific content was selected,
      // Set the contentToDisplaySelected to All Content
      else if (this.contentToDisplaySelected !== null) {
        this.contentToDisplaySelected = this.allContent.value;

        // Create BE Data Cockpit
        const beDataCockpit = this.createBEDataCockpit();
        this.$emit('sendBEDataCockpit', beDataCockpit);
      }
    },

    /**
     * Create BE Data Cockpit
     * e.g.
     * - {contentType: "swym:Post", contentToDisplay: "XXX-XXX-XXX"}
     * Post with XXX-XXX-XXX id will be displayed
     *
     * - {contentType: "YYY-YYY-YYY", contentToDisplay: "ZZZ-ZZZ-ZZZ", contentToReuse: "swym:Post"}
     * Derived type (with YYY-YYY-YYY as ID) content (based on Post) with ZZZ-ZZZ-ZZZ id
     * will be displayed
     *
     * - {contentType: "swym:Post", contentToDisplay: null}
     * Community create by the BM will be filtered on Post
     */
    createBEDataCockpit() {
      // Get the derived type with the transient_id
      const allContentType = this.contentTypesAndContentToDisplay.find(
        (el) => el.transient_id && (el.transient_id === this.contentTypeValue),
      );

      const allContentIsSelected = this.contentToDisplaySelected === this.allContent.value;

      const beDataCockpit = {
        contentType: this.contentTypeValue,
        contentToDisplay: allContentIsSelected ? null : this.contentToDisplaySelected,
        ...allContentType && {
          // For derived type
          contentToReuse: allContentType.contentToReuse,
        },
      };

      return beDataCockpit;
    },

  },
});

// CONCATENATED MODULE: ./src/components/SwymCockpit.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_SwymCockpitvue_type_script_lang_js_ = (SwymCockpitvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/SwymCockpit.vue?vue&type=style&index=0&lang=scss&
var SwymCockpitvue_type_style_index_0_lang_scss_ = __webpack_require__("a750");

// EXTERNAL MODULE: ../node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("a6c2");

// CONCATENATED MODULE: ./src/components/SwymCockpit.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_SwymCockpitvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var SwymCockpit = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "9920":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "9c58":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymTimelineSeparatorDate_vue_vue_type_style_index_0_id_2e7aea9a_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("22bf");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymTimelineSeparatorDate_vue_vue_type_style_index_0_id_2e7aea9a_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymTimelineSeparatorDate_vue_vue_type_style_index_0_id_2e7aea9a_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "9ee7":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "a4f5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"577c093e-vue-loader-template"}!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./src/components/Pipeline/SwymPipeline.vue?vue&type=template&id=52090fa2&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"pipeline"},[_c('SwymPipelineGraph',{attrs:{"status-array":_vm.statusArray}}),(!_vm.readOnly)?_c('SwymPipelineStatus',_vm._g({attrs:{"status-array":_vm.statusArray,"min-status-to-transfer":_vm.minStatusToTransfer}},_vm.$listeners)):_vm._e()],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Pipeline/SwymPipeline.vue?vue&type=template&id=52090fa2&scoped=true&

// CONCATENATED MODULE: ../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./src/components/Pipeline/SwymPipeline.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

//test comment
/* harmony default export */ var SwymPipelinevue_type_script_lang_js_ = ({
  name: 'SwymPipeline',
  props: {
    statusArray: {
      type: Array,
      required: true,
    },
    minStatusToTransfer: {
      type: String,
      required: true,
    },
    readOnly: {
      type: Boolean,
      default: false
    }
  },
});

// CONCATENATED MODULE: ./src/components/Pipeline/SwymPipeline.vue?vue&type=script&lang=js&
 /* harmony default export */ var Pipeline_SwymPipelinevue_type_script_lang_js_ = (SwymPipelinevue_type_script_lang_js_); 
// EXTERNAL MODULE: ../node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("a6c2");

// CONCATENATED MODULE: ./src/components/Pipeline/SwymPipeline.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  Pipeline_SwymPipelinevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "52090fa2",
  null
  
)

/* harmony default export */ var SwymPipeline = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "a6ad":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "a6c2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ "a750":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymCockpit_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("1e77");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymCockpit_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymCockpit_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "a7f7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CONTENT_TYPE_ICON_COLOR; });
/* unused harmony export MEDIA_URI_ICON */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return MEDIA_TYPE_ICON_COLOR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return getFonticonByUri; });
/* unused harmony export getFontIcon */
/* unused harmony export setColor */
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("6bfe");


const UNKNOWN_TYPE_ICON = 'question';

const CONTENT_TYPE_ICON_COLOR = {
	post: {
		icon: 'newspaper',
		color: '#ADADAD'
	},
	ideation: {
		icon: 'lightbulb',
		color: '#00B8DE'
	},
	question: {
		icon: 'help',
		color: '#EA4F37'
	},
	wiki: {
		icon: 'book-open',
		color: '#00AA86'
	},
	media: {
		icon: 'picture',
		color: '#70036b'
	}
};

const MEDIA_URI_ICON = {
	'swym:Picture': 'picture',
	'swym:AnimatedPicture': 'picture-animated',
	'swym:Document': 'doc',
	'swym:Sound': 'sound',
	'swym:Video': 'video',
	'swym:3dModel': 'cube',
	'swym:Drawing': 'picture',
	'swym:SimulationMedia': 'picture'
};

function MEDIA_TYPE_ICON_COLOR(uri) {
	let icon = null;

	switch (uri) {
		case 'swym:Sound':
			icon = 'sound';
			break;
		case 'swym:Video':
			icon = 'video';
			break;
		case 'swym:3dModel':
			icon = 'cube';
			break;
		case 'swym:Document':
			icon = 'doc'; //Handle different extension?
			break;
		case 'swym:AnimatedPicture':
			icon = 'picture-animated';
			break;
		case 'swym:SimulationMedia':
		case 'swym:Drawing':
		case 'swym:Picture':
		default:
			icon = 'picture';
	}

	return {
		icon,
		color: '#70036b'
	};
}

/**
 * Return fonticon with the URI type
 * @example 'swym:Post' -> 'newspaper'
 * @example 'swym:3dModel' -> 'cube'
 * @param {string} uri 
 * @returns Fonticon name
 */
function getFonticonByUri(uri) {
	let type = _types__WEBPACK_IMPORTED_MODULE_0__[/* CONTENT_TYPE_URI */ "a"][uri];

	let typeIconColor = type && CONTENT_TYPE_ICON_COLOR[type];

	if (typeIconColor) {
		return typeIconColor.icon;
	} else {
		let mediaIcon = MEDIA_URI_ICON[uri];

		if (mediaIcon) {
			return mediaIcon;
		}
	}

	return UNKNOWN_TYPE_ICON;
}
function getFontIcon(feature) {
//	const featureType = feature.value || 
	if (CONTENT_TYPE_ICON_COLOR[feature.value]) {
		return CONTENT_TYPE_ICON_COLOR[feature.value].icon;
	} else if (feature.contentToReuse) {
		return feature.icon;
	}
}
function setColor(feature, rule) {
	let color = feature.contentTexportoReuse ? feature.color : CONTENT_TYPE_ICON_COLOR[feature.value].color;
	return `${rule}: ${color};`;
}


/***/ }),

/***/ "abb2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymCommunityContentSettings_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("a6ad");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymCommunityContentSettings_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymCommunityContentSettings_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "b008":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"577c093e-vue-loader-template"}!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./src/components/SwymSearchInput.vue?vue&type=template&id=754d6027&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('vu-form',{ref:"form",staticClass:"search-input-container"},[_c('div',{staticClass:"search-input"},[_c('vu-input',{attrs:{"value":_vm.value},on:{"input":function (value) { return _vm.$emit('input', value); }}}),_c('vu-icon-btn',{staticClass:"clear",attrs:{"icon":"clear"},on:{"click":_vm.clear}})],1),_c('vu-icon-btn',{attrs:{"icon":"search"},on:{"click":_vm.search}})],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/SwymSearchInput.vue?vue&type=template&id=754d6027&

// CONCATENATED MODULE: ../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./src/components/SwymSearchInput.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var SwymSearchInputvue_type_script_lang_js_ = ({
  name: 'SwymSearchInput',
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  mounted() {
    const form = this.$refs.form.$el;
    form.addEventListener('submit', this.formHandler);
  },
  destroy() {
    const form = this.$refs.form.$el;
    form.addEventListener('submit', this.formHandler);
  },
  methods: {
    clear() {
      this.$emit('input', '');
    },
    search() {
      this.$emit('search');
    },
    /**
     * Submit event handler
     * Avoid reloading page & call search
     * @param {Event} event - Submit event
     */
    formHandler(event) {
      // Avoid reloading the page after pressing 'Enter' key in the form/input
      event.preventDefault();
      this.search();
    },
  },
});

// CONCATENATED MODULE: ./src/components/SwymSearchInput.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_SwymSearchInputvue_type_script_lang_js_ = (SwymSearchInputvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/SwymSearchInput.vue?vue&type=style&index=0&lang=scss&
var SwymSearchInputvue_type_style_index_0_lang_scss_ = __webpack_require__("cd82");

// EXTERNAL MODULE: ../node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("a6c2");

// CONCATENATED MODULE: ./src/components/SwymSearchInput.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_SwymSearchInputvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var SwymSearchInput = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "b14c":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymDefaultContent_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("e1d6");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymDefaultContent_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymDefaultContent_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "b4cc":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"577c093e-vue-loader-template"}!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./src/components/Timeline/SwymTimelineSeparatorDate.vue?vue&type=template&id=2e7aea9a&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"unread-header"},[_c('hr'),_c('div',{staticClass:"unread-text"},[_vm._v(" "+_vm._s(_vm.prettyDate(_vm.date))+" ")]),_c('hr')])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Timeline/SwymTimelineSeparatorDate.vue?vue&type=template&id=2e7aea9a&scoped=true&

// CONCATENATED MODULE: ../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./src/components/Timeline/SwymTimelineSeparatorDate.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var SwymTimelineSeparatorDatevue_type_script_lang_js_ = ({
  name: 'SwymTimelineSeparatorDate',
  props: {
    date: {
      type: Date,
      required: true,
    },
  },
  methods: {
    prettyDate(date) {
      const d = new Date(date);
      const y = d.getFullYear();
      const yearNow = (new Date()).getFullYear();
      const options = (y === yearNow)
        ? { weekday: 'long', month: 'long', day: 'numeric' }
        : {
          weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
        };

      return d.toLocaleDateString(undefined, options);
    },
  },
});

// CONCATENATED MODULE: ./src/components/Timeline/SwymTimelineSeparatorDate.vue?vue&type=script&lang=js&
 /* harmony default export */ var Timeline_SwymTimelineSeparatorDatevue_type_script_lang_js_ = (SwymTimelineSeparatorDatevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/Timeline/SwymTimelineSeparatorDate.vue?vue&type=style&index=0&id=2e7aea9a&lang=scss&scoped=true&
var SwymTimelineSeparatorDatevue_type_style_index_0_id_2e7aea9a_lang_scss_scoped_true_ = __webpack_require__("9c58");

// EXTERNAL MODULE: ../node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("a6c2");

// CONCATENATED MODULE: ./src/components/Timeline/SwymTimelineSeparatorDate.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  Timeline_SwymTimelineSeparatorDatevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "2e7aea9a",
  null
  
)

/* harmony default export */ var SwymTimelineSeparatorDate = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "b5f7":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "b7e3":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "ba07":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymEditIconColor_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("6876");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymEditIconColor_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymEditIconColor_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "bcb4":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"577c093e-vue-loader-template"}!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./src/components/DummySearch.vue?vue&type=template&id=153ea518&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('input'),_c('vu-icon-btn',{attrs:{"icon":"search"},on:{"click":_vm.onClick}})],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/DummySearch.vue?vue&type=template&id=153ea518&

// CONCATENATED MODULE: ../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./src/components/DummySearch.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//

// Dummy Search for local test purposes

/* harmony default export */ var DummySearchvue_type_script_lang_js_ = ({
  name: 'DummySearch',
  methods: {
    onClick() {
      const that = this;
      this.$emit('change', {
        asset: {
          preview_url: 'https://dsext001-eu1-215dsi0708-3dswym.3dexperience.3ds.com/api/media/streammedia/id/v-IkEFevTbKzQXt0AUsT3A/type/thumb/key/l_thumb/update/b61c34e04d8813458e99883523cf5fd8',
          'ds6w:label': 'test title',
          'ds6w:description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla viverra eu arcu vel euismod. Vestibulum at sem ut lectus scelerisque eleifend id id elit. Praesent laoreet tincidunt leo, quis gravida elit tincidunt eget. Mauris vitae posuere odio, id ultricies eros. Ut blandit orci laoreet molestie lobortis. Sed id eros finibus, pulvinar elit sit amet, cursus metus. Praesent lobortis commodo leo, porttitor gravida nibh elementum quis. Cras dui velit, hendrerit in hendrerit vitae, vulputate eu est.',
          id: 'xxx',
          'ds6w:type': that.getRandomType(),
        },
      });
    },

    getRandomType() {
      const getRandomInt = (min, max) => {
        const mini = Math.ceil(min);
        const maxi = Math.floor(max);
        return Math.floor(Math.random() * (maxi - mini) + mini);
      };

      const n = getRandomInt(1, 5);
      switch (n) {
        case 1:
          return 'swym:Post';
        case 2:
          return 'swym:Question';
        case 3:
          return 'swym:Idea';
        default:
          return 'swym:WikitreePage';
      }
    },

  },
});

// CONCATENATED MODULE: ./src/components/DummySearch.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_DummySearchvue_type_script_lang_js_ = (DummySearchvue_type_script_lang_js_); 
// EXTERNAL MODULE: ../node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("a6c2");

// CONCATENATED MODULE: ./src/components/DummySearch.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_DummySearchvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var DummySearch = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "be60":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"577c093e-vue-loader-template"}!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./src/components/SwymSmallPipeline.vue?vue&type=template&id=57f4cd2c&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"small-pipeline",style:(_vm.gradient),on:{"click":function($event){return _vm.$emit('click')}}})}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/SwymSmallPipeline.vue?vue&type=template&id=57f4cd2c&

// CONCATENATED MODULE: ../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./src/components/SwymSmallPipeline.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//

/* harmony default export */ var SwymSmallPipelinevue_type_script_lang_js_ = ({
  name: 'SwymSmallPipeline',
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  computed: {
    // Return dynamic linear gradient to have a rectangle divided by color
    // https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/linear-gradient#gradient_with_multi-position_color_stops
    gradient() {
      const n = this.items.length;
      let linearSlot = '';

      for (let i = 0; i < n; i += 1) {
        const { color } = this.items[i];
        const firstPercent = Math.floor((i / n) * 100);
        const secondPercent = Math.floor(((i + 1) / n) * 100);
        linearSlot += `${color} ${firstPercent}% ${secondPercent}%${i + 1 === n ? '' : ','}`;
        // e.g red 0% 33%, blue 33% 66%, green 66% 100%
      }

      const linearTemplate = `linear-gradient(to right, ${linearSlot})`;
      // e.g linear-gradient(to right, red 0% 33%, blue 33% 66%, green 66% 100%)
      return {
        background: linearTemplate,
      };
    },
  },
});

// CONCATENATED MODULE: ./src/components/SwymSmallPipeline.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_SwymSmallPipelinevue_type_script_lang_js_ = (SwymSmallPipelinevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/SwymSmallPipeline.vue?vue&type=style&index=0&lang=css&
var SwymSmallPipelinevue_type_style_index_0_lang_css_ = __webpack_require__("877b");

// EXTERNAL MODULE: ../node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("a6c2");

// CONCATENATED MODULE: ./src/components/SwymSmallPipeline.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_SwymSmallPipelinevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var SwymSmallPipeline = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "bee3":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"577c093e-vue-loader-template"}!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./src/components/CKEditor.vue?vue&type=template&id=3a89dc12&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"ckeditor-container"},[_c('div',{ref:"sticky",staticClass:"sticky_toolbar"}),_c('div',{ref:"placeholder"}),_c('vu-scroller',{staticClass:"scroll"},[_c('textarea',{ref:"editor",staticClass:"textarea-editor",attrs:{"id":_vm.mode,"name":_vm.mode}})])],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/CKEditor.vue?vue&type=template&id=3a89dc12&

// CONCATENATED MODULE: ./src/lib/ckeditor/CKEditorCommand.js
// Allowed tags
// To revise
const basicListOfAllowedContent = 'p;span(*);pre;a[!href];h1;h2;ul;li;ol;i;u;s;strong;blockquote;em;table[*]{*};caption;thead[*]{*};tbody[*]{*};th[*]{*};tr[*]{*};td[*]{*};br;figcaption;';

const simpleFormattingEditorConfig = {
  extraAllowedContent: basicListOfAllowedContent,
  toolbar: [
    {
      name: 'paragraph',
      groups: ['paragraph', 'insert', 'document'],
      items: [
        'h1Command',
        'h2Command',
        'BulletedListCommand',
        'NumberedListCommand',
        'BlockquoteCommand',
        'formattedCommand',
        '-',
        'Outdent',
        'Indent',
        'AddCustomTable'
      ],
    },
    {
      name: 'basicstyles',
      groups: ['basicstyles', 'cleanup'],
      items: ['Bold', 'Italic', 'Underline', 'Strike', 'Highlight', '-', 'RemoveFormat'],
    },
    { name: 'links', items: ['CustomLink', 'Unlink'] },
  ],
  removePlugins: 'elementspath,resize',
  removeButtons: 'PasteFromWord',
  editorplaceholder: 'Start writing',
  extraPlugins: 'sticky,editorplaceholder,h1Style,h2Style,formattedStyle,BulletedListStyle,NumberedListStyle,BlockquoteStyle,highlight,customtable, customlink',
  copyFormatting_outerCursor: false,
  copyFormatting_allowedContexts: false,
  height: '680',
  ContextMenu: [],
};
const commandButtonList = {
  h1Style: {
    command: 'h1Command',
    toolbar: 'paragraph',
    label: 'Heading 1',
    style: 'h1',
    type: 'style',
  },
  h2Style: {
    command: 'h2Command',
    toolbar: 'paragraph',
    label: 'Heading 2',
    style: 'h2',
    type: 'style',
  },
  formattedStyle: {
    command: 'formattedCommand',
    toolbar: 'paragraph',
    label: 'Formatted Style',
    style: 'pre',
    type: 'style',
  },
  BulletedListStyle: {
    command: 'BulletedListCommand',
    toolbar: 'paragraph',
    ckCommand: 'bulletedlist',
    label: 'Insert/Remove Bulleted List',
    style: 'ul',
    type: 'command',
  },
  NumberedListStyle: {
    command: 'NumberedListCommand',
    ckCommand: 'numberedlist',
    toolbar: 'paragraph',
    label: 'Insert/Remove Numbered List',
    style: 'ol',
    type: 'command',
  },
  BlockquoteStyle: {
    command: 'BlockquoteCommand',
    toolbar: 'paragraph',
    ckCommand: 'blockquote',
    label: 'Block Quote',
    style: 'blockquote',
    type: 'command',
  },
};
function createCommand(CKEDITOR) {
  for (const key in commandButtonList) {
    CKEDITOR.plugins.add(key, {
      init(editor) {
        // Define an editor command
        editor.addCommand(commandButtonList[key].command, {
          contextSensitive: true,
          exec(editor, resetOption) {
            // Prevent combination
            if (!resetOption) {
              for (const index in editor.toolbar) {
                if (
                  editor.toolbar.hasOwnProperty(k)
                  && editor.toolbar[index].hasOwnProperty('name')
                  && editor.toolbar[index].hasOwnProperty('items')
                  && editor.toolbar[index].name === 'paragraph'
                ) {
                  const { items } = editor.toolbar[index];
                  for (const item in items) {
                    if (
                      items.hasOwnProperty(item)
                      && items[item].hasOwnProperty('type')
                      && items[item].type === 'button'
                      && items[item].getState() === CKEDITOR.TRISTATE_ON
                      && items[item].command !== commandButtonList[key].command
                    ) {
                      // we set true as second argument because we don't want to prevent combination again
                      // ( if not => infinite loop)
                      editor.execCommand(items[item].command, true);
                    }
                  }
                }
              }
            }
            // We are adding/removing text formatting/style
            if (this.state === CKEDITOR.TRISTATE_ON) {
              if (commandButtonList[key].type === 'command') {
                editor.execCommand(commandButtonList[key].ckCommand);
              } else {
                editor.removeStyle(new CKEDITOR.style({ element: commandButtonList[key].style }));
              }
              this.setState(CKEDITOR.TRISTATE_OFF);
            } else {
              if (commandButtonList[key].type === 'command') {
                editor.execCommand(commandButtonList[key].ckCommand);
              } else {
                editor.applyStyle(new CKEDITOR.style({ element: commandButtonList[key].style }));
              }
              this.setState(CKEDITOR.TRISTATE_ON);
            }
          },
          refresh(editor, path) {
            // we need to refresh options selected when the user change paragraph selection
            let nodeType = path;
            if (nodeType.block && nodeType.block.getName()) {
              nodeType = nodeType.block.getName();
              if (nodeType === 'p' || nodeType === 'li') {
                nodeType = path.block.getParent().getName();
              }
              if (nodeType === commandButtonList[key].style) {
                this.setState(CKEDITOR.TRISTATE_ON);
              } else {
                this.setState(CKEDITOR.TRISTATE_OFF);
              }
            }
          },
        });

        editor.ui.addButton(commandButtonList[key].command, {
          // The text part of the button (if available) and tooptip.
          label: commandButtonList[key].label,

          // The command to execute on click.
          command: commandButtonList[key].command,

          // The button placement in the toolbar (toolbar group key).
          toolbar: commandButtonList[key].toolbar,
        });
      },
    });
  }
}

// CONCATENATED MODULE: ./src/lib/ckeditor/custom-link-plugin.js
// Inspired by DS/SwymUIComponents/script/lib/ckeditor/customlink/dialogs/customlink

function addCustomLinkDialog() {
  CKEDITOR.dialog.add('customlinkDialog', (editor) => {
    // This method is invoked once a user clicks the OK button, confirming the dialog.
    const onOk = function () {
      // Create a link element and an object that will store the data entered in the dialog window.
      const dialog = this.getDialog();
      const matches = null;
      const data = {
        desc: dialog.getValueOf('linkBuilder', 'desc').trim(),
        url: dialog.getValueOf('linkBuilder', 'url').trim(),
      };
      const link = editor.document.createElement('a');

      const regex = new RegExp(
        /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/,
      );

      if (!regex.test(data.url)) {
        alert('Please check your URL');
        return false;
      }

      if (!data.desc) {
        alert('The description field cannot be empty!');
        return false;
      }

      if (!data.url) {
        alert('The URL field cannot be empty');
        return false;
      }

      // Always external link
      link.setHtml(data.desc);
      link.setAttribute('href', data.url);
      link.setAttribute('data-type', 'external');

      // Insert the link element into the current cursor position in the editor.
      if (editor.customLink) {
        editor.customLink.outerHTML = link.$.outerHTML;
      } else {
        editor.insertElement(link);
      }

      dialog.hide();
    };
    const onCancel = function (event) {
      const dialog = this.getDialog();
      dialog.hide();
    };

    return {
      // Basic properties of the dialog window: title, minimum size.
      title: 'Link properties',
      minWidth: 400,
      minHeight: 100,
      resizable: false,
      // Dialog window contents definition.
      contents: [
        {
          id: 'linkBuilder',
          elements: [
            {
              type: 'text',
              id: 'desc',
              label: 'Description',
            },
            {
              type: 'text',
              id: 'url',
              label: 'URL',
            },
          ],
        },
      ],
      buttons: [
        {
          type: 'button',
          className: 'cke_dialog_ui_button_ok',
          label: 'OK',
          title: 'OK',
          onClick() {
            onOk.apply(this);
          },
        },
        {
          type: 'button',
          className: 'cancel-button-link-properties',
          label: 'Cancel',
          title: 'Cancel',
          onClick() {
            onCancel.apply(this);
          },
        },
      ],

      onShow() {
        const editor = this.getParentEditor();
        const selection = editor.getSelection();
        let element = null;
        const plugin = CKEDITOR.plugins.link;
        let elementHTML;
        if ((element = plugin.getSelectedLink(editor)) && element.getName() === 'a') {
          // Don't change selection if some element is already selected.
          // For example - don't destroy fake selection.
          if (!selection.getSelectedElement()) selection.selectElement(element);
        } else if (editor.customLink) {
          element = editor.customLink;
        } else if (selection.getStartElement() && selection.getStartElement().getName() === 'a') {
          element = selection.getStartElement();
        } else {
          element = null;
        }

        if (element) {
          if (element.getHtml) {
            elementHTML = element.getHtml();
          } else {
            elementHTML = element.getHTML();
            if (elementHTML === '') {
              elementHTML = element.outerHTML;
            }
          }

          if (editor.customLink) {
            this.setValueOf('linkBuilder', 'desc', elementHTML);
          }

          if (element.hasAttribute('data-content-id')) {
            this.setValueOf('linkBuilder', 'url', linkToDisplay);
            this.setValueOf('linkBuilder', 'desc', elementHTML);
          } else {
            this.setValueOf('linkBuilder', 'desc', elementHTML || element.getAttribute('href'));
            this.setValueOf('linkBuilder', 'url', element.getAttribute('url') || element.getAttribute('href'));
          }
        } else if (selection.getSelectedText()) {
          this.setValueOf('linkBuilder', 'desc', selection.getSelectedText());
        }
      },

      onHide() {
        const editor = this.getParentEditor();
        if (editor.customLink) {
          delete editor.customLink;
          this.getContentElement('linkBuilder', 'desc').getElement().show();
          this.getContentElement('linkBuilder', 'desc').getElement().show();
        }
      },
    };
  });
}

// CONCATENATED MODULE: ../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./src/components/CKEditor.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


// customlink dialog without internal link processing


/* harmony default export */ var CKEditorvue_type_script_lang_js_ = ({
  name: 'CKEditor',
  props: {
    mode: {
      type: String,
      default: 'advancedRTE',
      validator: (type) => ['simpleRTE', 'instantMessageRTE', 'advancedRTE'].includes(type), // TODO to be completed
    },
    type: {
      type: String,
      default: 'classic',
      validator: (type) => ['classic', 'inline'].includes(type),
    },
    tagName: {
      type: String,
      default: 'textarea',
    },
    readOnly: {
      type: Boolean,
      default: null,
    },
    getBodyTemplate: {
      type: Object,
    },
  },
  mounted() {
    window.require(['DS/CKEditor/CKEditor'], (ckeditor) => {
      // Need to require plugin files before initialize CKEditor
      window.require(
        [
          'DS/SwymUIComponents/script/lib/ckeditor/customtable/dialogs/customtable',
          'DS/SwymUIComponents/script/lib/ckeditor/sticky/plugin',
          'DS/SwymUIComponents/script/lib/ckeditor/highlight/plugin',
          'DS/SwymUIComponents/script/lib/ckeditor/customtable/plugin',
          'DS/SwymUIComponents/script/lib/ckeditor/customlink/plugin',
        ],
        () => {
          // Add customlink dialog
          addCustomLinkDialog();

          this.initToolbar();
          this.initCkeditor();
          this.setPlugins();
          this.setBodyCkeditor();
          this.onChangeCkeditor();
        },
      );
    });
  },
  methods: {

    /**
     * Init toolbar
     * Add id attribute in sticky/placeholder div
     * -> for sticky plugin
     */
    initToolbar() {
      this.$refs.sticky.setAttribute('id', `sticky_${this.mode}`);
      this.$refs.placeholder.setAttribute('id', `placeholder_${this.mode}`);
    },

    /**
     * Init CKEditor
     */
    initCkeditor() {
      if (!CKEDITOR.instances[this.mode]) createCommand(CKEDITOR);
      const config = this.setCkeditorConfig();
      const method = this.type === 'inline' ? 'inline' : 'replace';
      const elementToReplace = this.$refs.editor;
      CKEDITOR[method](elementToReplace, config);
    },

    /**
     * Set plugins
     * Add plugins to CKEditor
     */
    setPlugins() {
      
      // Need the next line to be able to reuse customtable plugin
      CKEDITOR.instances[this.mode].element.$.addEvent = () => {};

      // Add all the necessary plugin
      // Sticky toolbar / Highlight / Custom table / Custom link
      CKEDITOR.plugins.addExternal('customtable', '../SwymUIComponents/script/lib/ckeditor/customtable/', 'plugin.js');
      CKEDITOR.plugins.addExternal('customlink', '../SwymUIComponents/script/lib/ckeditor/customlink/', 'plugin.js');
      CKEDITOR.plugins.addExternal('highlight', '../SwymUIComponents/script/lib/ckeditor/highlight/', 'plugin.js');
      CKEDITOR.plugins.addExternal('sticky', '../SwymUIComponents/script/lib/ckeditor/sticky/', 'plugin.js');
    },

    setCkeditorConfig() {
      const config = this.mode === 'advancedRTE' ? simpleFormattingEditorConfig : {};
      if (this.readOnly !== null) config.readOnly = this.readOnly;
      return config;
    },

    onChangeCkeditor() {
      CKEDITOR.instances[this.mode].on('instanceReady', (event) => {
        CKEDITOR.instances[this.mode].on('change', () => {
          const isEmpty = CKEDITOR.instances[this.mode].getData() === '';
          this.$parent.$emit('disableButtonSave', isEmpty);
        });
      });
    },

    setBodyCkeditor() {
      if (this.getBodyTemplate) {
        CKEDITOR.instances[this.mode].setData(this.getBodyTemplate);
      }
    },

  },
  render(createElement) {
    return createElement('div', {}, [
      createElement(this.tagName),
    ]);
  },
});

// CONCATENATED MODULE: ./src/components/CKEditor.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_CKEditorvue_type_script_lang_js_ = (CKEditorvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/CKEditor.vue?vue&type=style&index=0&lang=scss&
var CKEditorvue_type_style_index_0_lang_scss_ = __webpack_require__("e333");

// EXTERNAL MODULE: ../node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("a6c2");

// CONCATENATED MODULE: ./src/components/CKEditor.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_CKEditorvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var CKEditor = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "c29e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymIconSection_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("10ee");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymIconSection_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymIconSection_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "c847":
/***/ (function(module) {

module.exports = JSON.parse("{\"data\":[{\"title\":\"Authentication & Identity\",\"icons\":[\"power\",\"login\",\"logout\",\"key\",\"key-credential\",\"vcard\",\"fingerprint\",\"barcode\"]},{\"title\":\"Charts & Graphs\",\"icons\":[\"chart-pie\",\"chart-line\",\"chart-line-bar-combine\",\"chart-line-single\",\"chart-line-control\",\"chart-spline\",\"chart-time-series-zoomable\",\"chart-bar\",\"chart-bar-growing-up\",\"chart-bar-stacked\",\"chart-bar-stacked-full\",\"chart-bar-negative\",\"chart-area\",\"chart-area-stacked\",\"chart-area-stacked-full\",\"chart-area-negative\",\"chart-area-range\",\"chart-column-range\",\"chart-column-negative\",\"chart-donut\",\"chart-donut-half\",\"chart-scatter-plot\",\"chart-bubble\",\"chart-polygon\",\"chart-gauge-solid\",\"chart-gauge-angular\",\"chart-map-heat\",\"chart-map-tree\",\"chart-pyramid\",\"chart-funnel\",\"chart-thumbnail-graph\",\"chart-thumbnail-graph-move\",\"chart-box-whisker\",\"chart-gantt\",\"chart-kanban\",\"chart-pro-cap\",\"chart-qq-plot\",\"chart-box-cox-transformation\",\"graph-linear\",\"graph-chord\",\"graph-polar\",\"graph-windrose\",\"graph-sankey\",\"graph-egraph\",\"graph-egraph-list\",\"legend\",\"axis-x\",\"axis-y\"]},{\"title\":\"Data backup\",\"icons\":[\"download\",\"upload\",\"cloud-download\",\"cloud-upload\",\"cloud\",\"sync\",\"floppy\",\"database\",\"drive\",\"install\"]},{\"title\":\"Data manipulation\",\"icons\":[\"cut\",\"copy\",\"bin\",\"trash\",\"recycle\",\"clear\",\"move-to\",\"duplicate\",\"select-on\",\"select-off\",\"select-all\",\"select-none\",\"select-inverted\",\"select-all-checkboxes\",\"select-none-checkboxes\",\"drag-drop\",\"drag-grip\",\"exchange\",\"replace\",\"open\",\"insert\",\"import\",\"import-multiple\",\"export\",\"export-multiple\",\"export-to-csv\",\"export-to-v5\",\"publish\",\"run\",\"compute\",\"lock\",\"lock-open\",\"block\",\"ignore\",\"plus\",\"minus\",\"remove\",\"new-create\",\"undo\",\"redo\",\"compare-on\",\"compare-off\",\"group\",\"group-add\",\"group-delete\"]},{\"title\":\"Directional arrows\",\"icons\":[\"chevron-down\",\"chevron-left\",\"chevron-right\",\"chevron-up\",\"double-chevron-down\",\"double-chevron-left\",\"double-chevron-right\",\"double-chevron-up\",\"down\",\"left\",\"right\",\"up\",\"down-left\",\"down-right\",\"up-left\",\"up-right\",\"move-to-bottom\",\"move-to-start\",\"move-to-end\",\"move-to-top\",\"down-right-constrained\",\"up-right-constrained\",\"up-down-constrained\",\"expand-down\",\"expand-left\",\"expand-right\",\"expand-up\",\"arrow-combo-vertical\",\"arrow-combo-horizontal\",\"arrow-double-combo\"]},{\"title\":\"Display grid\",\"icons\":[\"view-tag-cloud\",\"view-small-thb\",\"view-big-thb\",\"view-imagewall-thb\",\"view-small-tile\",\"view-big-tile\",\"view-list\",\"view-mixed\"]},{\"title\":\"Display options\",\"icons\":[\"zoom-in\",\"zoom-out\",\"zoom-fit\",\"zoom-selected\",\"eye\",\"eye-off\",\"eye-windowed\",\"rotate-cw\",\"rotate-ccw\",\"aspect-ratio\",\"view-embedded\",\"side-panel\",\"bottom-panel\",\"window-split-vertical\",\"window-split-horizontal\",\"window-favorite\",\"display-layout-vertical-33\",\"display-layout-vertical-50\",\"display-layout-vertical-66\"]},{\"title\":\"File & folder\",\"icons\":[\"doc\",\"docs-duplicate\",\"doc-landscape\",\"doc-text\",\"doc-text-step\",\"doc-text-xml\",\"doc-image-delete\",\"newspaper\",\"report\",\"report-pro-cap\",\"survey\",\"doc-quotation\",\"doc-word\",\"doc-excel\",\"doc-powerpoint\",\"doc-pdf\",\"book-closed\",\"folder\",\"folder-share\",\"folder-open\",\"folder-zipped\",\"folder-requirement-specification\",\"archive\",\"box\",\"library\",\"library-class\",\"library-books\",\"presentation-slide\",\"presentation-slides\",\"presentation-slides-animated\"]},{\"title\":\"Formatting text / table / code\",\"icons\":[\"text\",\"feather\",\"brush\",\"brush-large\",\"highlighter\",\"highlighter-off\",\"swatches\",\"palette\",\"paint-can-fill\",\"pipette\",\"eraser\",\"pen-lines\",\"text-bold\",\"text-italic\",\"text-underline\",\"text-double-underline\",\"text-strikethrough\",\"text-overline\",\"text-subscript\",\"text-superscript\",\"text-special-character\",\"number-sign\",\"section-sign\",\"pilcrow\",\"backspace\",\"text-h1\",\"text-h2\",\"text-h3\",\"text-h4\",\"text-formatted\",\"text-formatted-off\",\"text-footnote\",\"required\",\"text-monospaced\",\"text-note\",\"link\",\"link-off\",\"text-caption\",\"text-quote\",\"spell-check\",\"language\",\"case-sensitive\",\"case-sensitive-off\",\"rename\",\"font-size-increase\",\"font-size-decrease\",\"numeric-keypad\",\"code\",\"bug\",\"picture-wrapping-left\",\"picture-wrapping-right\",\"picture-line-break\",\"picture-inline-small\",\"picture-inline-large\",\"picture-fit-to-frame\",\"picture-fill-to-frame\",\"picture-favorite\",\"picture-roll\",\"media-gallery\",\"text-align-left\",\"text-align-center\",\"text-align-right\",\"text-justify-left\",\"text-justify-center\",\"text-justify-right\",\"text-justify-all\",\"text-vertical-align-top\",\"text-vertical-align-middle\",\"text-vertical-align-bottom\",\"indentation-increase\",\"indentation-decrease\",\"horizontal-line\",\"line-move\",\"text-reorder\",\"table-header\",\"table-footer\",\"table-vertical\",\"table-column-add\",\"table-column-delete\",\"table-column-insert-before\",\"table-column-insert-after\",\"table-column-size\",\"table-column-size-all\",\"table-row-add\",\"table-row-delete\",\"table-row-insert-above\",\"table-row-insert-below\",\"table-cell-merge\",\"table-cell-unmerge\",\"table-column-row\",\"table-row-column\",\"annotation\",\"split\",\"split-3\",\"merge\",\"list\"]},{\"title\":\"Highlighting signs\",\"icons\":[\"info\",\"attention\",\"alert\"]},{\"title\":\"Location\",\"icons\":[\"globe\",\"globe-location\",\"target\",\"target-constrained\",\"location\",\"location-home\",\"flag-finish\",\"nav-move-to\",\"map\",\"map-navigation\",\"map-ground\",\"map-elevation\",\"compass\",\"factory\",\"factory-eye-off\",\"building-office\",\"warehouse\"]},{\"title\":\"Math & Statistics\",\"icons\":[\"math-equal\",\"math-approximation\",\"math-x-value\",\"math-percentage\",\"math-more-less\",\"math-summation\",\"math-function\",\"stat-mean\",\"stat-standard-deviation\",\"stat-quartile-1\",\"stat-quartile-2\",\"stat-quartile-3\",\"stat-median\",\"stat-outlier\"]},{\"title\":\"Media player\",\"icons\":[\"sound\",\"sound-off\",\"sound-volume-1\",\"sound-volume-2\",\"sound-volume-3\",\"play\",\"resume\",\"stop\",\"pause\",\"record\",\"to-end\",\"to-start\",\"fast-forward\",\"fast-backward\",\"play-next\",\"play-previous\",\"play-once\",\"play-loop\",\"play-bounce\",\"play-shuffle\"]},{\"title\":\"Messaging / Notification\",\"icons\":[\"comment\",\"chat\",\"send\",\"message-broadcast\",\"bell\",\"bell-off\",\"bell-pencil\",\"mail\",\"mail-open\",\"attach\",\"inbox\",\"reply\",\"reply-all\",\"forward\",\"forward-off\",\"phone\",\"camera\",\"camera-refresh\",\"videocamera\",\"videocamera-off\",\"microphone\",\"microphone-off\",\"emoji-smile\",\"emoji-handshake\"]},{\"title\":\"Miscellaneous\",\"icons\":[\"legal\",\"gavel\",\"gavel-block\",\"briefcase\",\"suitcase\",\"showcase\",\"graduation-cap\",\"trophy\",\"medal\",\"badge\",\"flight\",\"flash\",\"magnet\",\"megaphone\",\"megaphone-off\",\"tape\",\"flashlight\",\"ticket\",\"thermometer\",\"tachometer\",\"broom\",\"leaf\",\"snowflake\",\"fire\",\"lifebelt\",\"warning-symbol-biohazard\",\"safety-sign-mask\",\"accessibility-symbol\"]},{\"title\":\"Network\",\"icons\":[\"rss\",\"signal\",\"offline\",\"internet\",\"network\"]},{\"title\":\"Physical devices\",\"icons\":[\"computer-laptop\",\"monitor\",\"monitor-off\",\"tablet\",\"mobile\",\"touch\",\"keyboard\",\"mouse\",\"print\",\"vr-goggle\",\"calculator\",\"numeric-keypad-key-0\",\"numeric-keypad-key-1\",\"numeric-keypad-key-2\",\"numeric-keypad-key-3\",\"numeric-keypad-key-4\",\"numeric-keypad-key-5\",\"numeric-keypad-key-6\",\"numeric-keypad-key-7\",\"numeric-keypad-key-8\",\"numeric-keypad-key-9\"]},{\"title\":\"Process & Workflow\",\"icons\":[\"dataflow-input\",\"dataflow-output\",\"dataflow-input-output\",\"dataflow-neutral\",\"process-linear\"]},{\"title\":\"Progress bar / gauge\",\"icons\":[\"progress-0\",\"progress-1\",\"progress-2\",\"progress-3\",\"low\",\"medium\",\"high\",\"stage-0\",\"stage-1\",\"stage-2\",\"stage-3\",\"stage-full\",\"step-0\",\"step-1\",\"step-2\",\"step-3\",\"step-full\"]},{\"title\":\"Project Management\",\"icons\":[\"promote\",\"demote\",\"task-list\",\"status-change\"]},{\"title\":\"Rating / Like / Favorite\",\"icons\":[\"favorite-on\",\"favorite-half\",\"favorite-off\",\"flag\",\"thumbs-up\",\"thumbs-down\",\"interest\",\"status-ok\",\"status-ok-ongoing\",\"status-ko\",\"status-plus\",\"status-clock\",\"status-noway\",\"status-empty\",\"status-trending-good\",\"status-trending-caution\",\"status-trending-critical\"]},{\"title\":\"Searching / Tagging / Filtering / Sorting\",\"icons\":[\"search\",\"tag\",\"filter\",\"sorting\",\"alpha-sorting-a-z\",\"alpha-sorting-z-a\",\"num-sorting-1-2\",\"num-sorting-2-1\",\"date-sorting-1-31\",\"date-sorting-31-1\",\"tag-sorting\",\"fav-on-sorting\",\"fav-off-sorting\",\"tag-more\",\"find\"]},{\"title\":\"Settings / Menu\",\"icons\":[\"cog\",\"tools\",\"attributes\",\"parameters\",\"parameter-mapping\",\"properties\",\"menu\",\"menu-dot\",\"check\",\"wrong\",\"checkbox-on\",\"checkbox-off\",\"radiobutton-on\",\"radiobutton-off\",\"pencil\",\"pencil-double\",\"magic-wand\"]},{\"title\":\"Shopping & payment\",\"icons\":[\"basket\",\"shopping-cart\",\"credit-card\",\"banknote\",\"tokens\",\"vault\",\"parcel\",\"parcel-add\",\"parcel-delete\",\"parcel-ok\",\"trolley\",\"trolley-add\",\"trolley-delete\",\"truck-delivery\"]},{\"title\":\"Time\",\"icons\":[\"clock\",\"hourglass\",\"infinity\",\"navigation-history\"]},{\"title\":\"Transportation\",\"icons\":[\"transportation-bicycle\",\"transportation-bus\",\"transportation-car\",\"transportation-truck\",\"transportation-forklift\",\"transportation-funicular\",\"transportation-metro\",\"transportation-train\",\"transportation-tram\",\"transportation-walk\",\"vehicle-drone\",\"vehicle-satellite\",\"vehicle-tunnel-boring-machine\"]},{\"title\":\"Tree structure / Flow\",\"icons\":[\"flow-cascade\",\"flow-cascade-search\",\"flow-children\",\"flow-branch\",\"flow-branch-split\",\"flow-branch-list\",\"flow-branch-downward\",\"flow-tree\",\"flow-tree-expand-down\",\"flow-tree-ordered\",\"flow-line\",\"flow-dashed-line\",\"flow-parallel\",\"flow-dashed-branchdown\",\"tree-view-root\",\"tree-view-leaf\",\"tree-view-leaves\",\"tree-view-all\",\"tree-view-flattened\",\"tree-view-flattened-leaves\",\"tree-delete\",\"tree-reorder\",\"tree-reparent\",\"tree-revision-update\",\"tree-table\",\"level-down\",\"level-up\"]},{\"title\":\"Type icon\",\"icons\":[\"video-swatches\",\"video-360\",\"picture-360\",\"media-360\",\"3d-object-barcode\",\"3dpart\",\"3dproduct\",\"material\",\"materials\",\"raw-material\",\"collection\",\"collection-add\",\"collection-delete\",\"render\",\"part-ebom\",\"template\",\"fl-diagram\",\"fl-diagrams\",\"space-management\",\"electronic-component\",\"pcb-board-bare\",\"requirement\",\"requirement-specification\",\"ontology\",\"script\"]},{\"title\":\"User\",\"icons\":[\"user\",\"users\",\"users-group\",\"users-group-change\"]},{\"title\":\"Web & browser commands\",\"icons\":[\"home\",\"back\",\"reload\",\"refresh\",\"update\",\"reset\",\"anchor\",\"shortcut\"]},{\"title\":\"Widget & modal\",\"icons\":[\"popup\",\"window\",\"pin\",\"pin-off\",\"close\",\"width-full\",\"width-small\",\"resize-full\",\"resize-small\",\"resize-handle\",\"resize-fullscreen\",\"resize-fullscreen-off\",\"widget-instance\",\"expand-collapse-panel\",\"expand-all\",\"collapse-all\",\"fold\",\"unfold\"]}]}");

/***/ }),

/***/ "c87a":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymContentSettingItem_vue_vue_type_style_index_0_id_4327d9cb_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("6013");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymContentSettingItem_vue_vue_type_style_index_0_id_4327d9cb_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymContentSettingItem_vue_vue_type_style_index_0_id_4327d9cb_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "cb6d":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"577c093e-vue-loader-template"}!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./src/components/CommunitySettings/SwymCommunityTagsSelected.vue?vue&type=template&id=39938c39&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"community-tags-selected"},[_c('h6',[_vm._v(_vm._s(_vm.NLS.SelectedTags))]),_c("transition-group",{tag:"div",staticClass:"community-tags-area",attrs:{"name":"fade"}},_vm._l((_vm.tags),function(tag){return _c('SwymCommunityTag',{key:tag.object,attrs:{"tag":tag,"editable":true},on:{"tagSelected":_vm.tagSelected,"tagClosed":_vm.tagClosed}})}),1)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/CommunitySettings/SwymCommunityTagsSelected.vue?vue&type=template&id=39938c39&scoped=true&

// CONCATENATED MODULE: ../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./src/components/CommunitySettings/SwymCommunityTagsSelected.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var SwymCommunityTagsSelectedvue_type_script_lang_js_ = ({
  name: 'SwymCommunityTagsSelected',
  props: {
    NLS: {
      type: Object,
      required: true,
    },
    tags: {
      type: Array,
      required: true,
    }
  },
  methods: {
    tagSelected(tag) {
      this.$emit('tagSelected', tag);
    },
    tagClosed(tag) {
      this.$emit('tagClosed', tag);
    }
  }
});

// CONCATENATED MODULE: ./src/components/CommunitySettings/SwymCommunityTagsSelected.vue?vue&type=script&lang=js&
 /* harmony default export */ var CommunitySettings_SwymCommunityTagsSelectedvue_type_script_lang_js_ = (SwymCommunityTagsSelectedvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/CommunitySettings/SwymCommunityTagsSelected.vue?vue&type=style&index=0&id=39938c39&lang=scss&scoped=true&
var SwymCommunityTagsSelectedvue_type_style_index_0_id_39938c39_lang_scss_scoped_true_ = __webpack_require__("7c64");

// EXTERNAL MODULE: ../node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("a6c2");

// CONCATENATED MODULE: ./src/components/CommunitySettings/SwymCommunityTagsSelected.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  CommunitySettings_SwymCommunityTagsSelectedvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "39938c39",
  null
  
)

/* harmony default export */ var SwymCommunityTagsSelected = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "cbf8":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "cc1f":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "cd82":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymSearchInput_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("5286");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymSearchInput_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymSearchInput_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "cefb":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymIconList_vue_vue_type_style_index_0_id_433b9700_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("d12a");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymIconList_vue_vue_type_style_index_0_id_433b9700_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymIconList_vue_vue_type_style_index_0_id_433b9700_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "d12a":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "d47b":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "d51d":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"577c093e-vue-loader-template"}!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./src/components/DefaultContent/SwymDefaultContentWikiTreeModal.vue?vue&type=template&id=6eb57eda&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('vu-modal',{attrs:{"show":_vm.show,"title":_vm.title},scopedSlots:_vm._u([{key:"modal-body",fn:function(){return [_c('label',[_vm._v(" "+_vm._s(_vm.$i18n('messageInfoDefaultWiki'))+" ")]),_c('TreeView',{ref:"treeView",attrs:{"tree":_vm.wikiPagesToDisplay,"multipleActive":true,"activatable":true,"isVisible":true,"openAll":true,"selectedByDefault":_vm.pageSelectedByDefault}})]},proxy:true},{key:"modal-footer",fn:function(){return [_c('vu-btn',{attrs:{"color":"primary"},on:{"click":_vm.onAdd}},[_vm._v(" "+_vm._s(_vm.$i18n('add'))+" ")]),_c('vu-btn',{on:{"click":_vm.onCancel}},[_vm._v(" "+_vm._s(_vm.$i18n('cancel')))])]},proxy:true}])})}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/DefaultContent/SwymDefaultContentWikiTreeModal.vue?vue&type=template&id=6eb57eda&

// CONCATENATED MODULE: ../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./src/components/DefaultContent/SwymDefaultContentWikiTreeModal.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var SwymDefaultContentWikiTreeModalvue_type_script_lang_js_ = ({
    name: 'SwymDefaultContentWikiTreeModal',
    props: {
        show:{
            type: Boolean, 
            default: false
        },
        wikiPagesToDisplay: {
            type: Array
        },
        //if need to have page selected by default, add its subject6wuri 
        pageSelectedByDefault: {
            type: Array
        }

    }, 
    data(){
        return {
            title: this.$i18n('addNewDefaultPages'),
        }
    },
    mounted(){
        this.$emit('requestFullScreen');

    },
    methods:{
        onCancel() {
            //TODO : call search to display list again 
            this.$emit('leaveFullScreen')
            this.show = false;
        },
        onAdd(){
            this.$emit('leaveFullScreen')
            const pageSelected = this.$refs.treeView.getActiveSelection();
            this.$emit('addWikiDefaultContent', pageSelected);
            this.show = false;

        }
    }
});

// CONCATENATED MODULE: ./src/components/DefaultContent/SwymDefaultContentWikiTreeModal.vue?vue&type=script&lang=js&
 /* harmony default export */ var DefaultContent_SwymDefaultContentWikiTreeModalvue_type_script_lang_js_ = (SwymDefaultContentWikiTreeModalvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/DefaultContent/SwymDefaultContentWikiTreeModal.vue?vue&type=style&index=0&lang=scss&
var SwymDefaultContentWikiTreeModalvue_type_style_index_0_lang_scss_ = __webpack_require__("5c51");

// EXTERNAL MODULE: ../node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("a6c2");

// CONCATENATED MODULE: ./src/components/DefaultContent/SwymDefaultContentWikiTreeModal.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  DefaultContent_SwymDefaultContentWikiTreeModalvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var SwymDefaultContentWikiTreeModal = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "d54e":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "d563":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "d685":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymContributionsList_vue_vue_type_style_index_0_id_6caffa94_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("697c");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymContributionsList_vue_vue_type_style_index_0_id_6caffa94_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymContributionsList_vue_vue_type_style_index_0_id_6caffa94_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "d78d":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./CKEditor.vue": "bee3",
	"./CommunitySettings/SwymCommunityContentSettings.vue": "f04a",
	"./CommunitySettings/SwymCommunityTag.vue": "847e",
	"./CommunitySettings/SwymCommunityTagsSelected.vue": "cb6d",
	"./CommunitySettings/SwymCommunityVisibility.vue": "edc1",
	"./CommunitySettings/SwymContentSettingItem.vue": "d979",
	"./CommunitySettings/SwymFeatureCreationModal.vue": "09e7",
	"./CommunitySettings/SwymGenericCommunityVisibility.vue": "2c92",
	"./ContentCreationInline/SwymContentCreationInline.vue": "7f38",
	"./DefaultContent/SwymDefaultContent.vue": "d9cf",
	"./DefaultContent/SwymDefaultContentItem.vue": "23d5",
	"./DefaultContent/SwymDefaultContentWikiTreeModal.vue": "d51d",
	"./DummySearch.vue": "bcb4",
	"./IconList/SwymIconList.vue": "ef22",
	"./IconList/SwymIconSection.vue": "8592",
	"./Pipeline/SwymPipeline.vue": "a4f5",
	"./Pipeline/SwymPipelineGraph.vue": "58b9",
	"./Pipeline/SwymPipelineStatus.vue": "6236",
	"./SwymCockpit.vue": "94cb",
	"./SwymCommunityTagsHeader.vue": "04bf",
	"./SwymContributionItem.vue": "8d64",
	"./SwymContributionsList.vue": "ec25",
	"./SwymEditIconColor.vue": "5966",
	"./SwymRssFeedModal.vue": "7fe0",
	"./SwymSearchInput.vue": "b008",
	"./SwymSmallPipeline.vue": "be60",
	"./SwymText.vue": "1725",
	"./SwymThreadTile.vue": "1864",
	"./SwymThreadsList.vue": "17ac",
	"./SwymTypeSelector.vue": "da31",
	"./SwymTypingIndicator.vue": "2b33",
	"./Timeline/SwymTimelineAction.vue": "893d",
	"./Timeline/SwymTimelineAuthor.vue": "d94e",
	"./Timeline/SwymTimelineMessageBody.vue": "248b",
	"./Timeline/SwymTimelineReply.vue": "2f16",
	"./Timeline/SwymTimelineSeparatorDate.vue": "b4cc",
	"./Timeline/SwymTimelineSeparatorUnreadMessage.vue": "25ab"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "d78d";

/***/ }),

/***/ "d94e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"577c093e-vue-loader-template"}!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./src/components/Timeline/SwymTimelineAuthor.vue?vue&type=template&id=04bf60af&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('a',{staticClass:"btn btn-link",attrs:{"href":("#people:" + (_vm.author.login) + "/activities")}},[_vm._v(_vm._s(_vm.author.firstName)+" "+_vm._s(_vm.author.lastName))]),_c('span',{staticClass:"message-date"},[_vm._v(" "+_vm._s(_vm.date.toLocaleTimeString(undefined, {hour: '2-digit', minute:'2-digit'}))+" ")])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Timeline/SwymTimelineAuthor.vue?vue&type=template&id=04bf60af&scoped=true&

// CONCATENATED MODULE: ../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./src/components/Timeline/SwymTimelineAuthor.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var SwymTimelineAuthorvue_type_script_lang_js_ = ({
  name: 'SwymTimelineAuthor',
  props: {
    author: {
      type: Object,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
});

// CONCATENATED MODULE: ./src/components/Timeline/SwymTimelineAuthor.vue?vue&type=script&lang=js&
 /* harmony default export */ var Timeline_SwymTimelineAuthorvue_type_script_lang_js_ = (SwymTimelineAuthorvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/Timeline/SwymTimelineAuthor.vue?vue&type=style&index=0&id=04bf60af&lang=scss&scoped=true&
var SwymTimelineAuthorvue_type_style_index_0_id_04bf60af_lang_scss_scoped_true_ = __webpack_require__("229b");

// EXTERNAL MODULE: ../node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("a6c2");

// CONCATENATED MODULE: ./src/components/Timeline/SwymTimelineAuthor.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  Timeline_SwymTimelineAuthorvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "04bf60af",
  null
  
)

/* harmony default export */ var SwymTimelineAuthor = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "d979":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"577c093e-vue-loader-template"}!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./src/components/CommunitySettings/SwymContentSettingItem.vue?vue&type=template&id=4327d9cb&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.feature.isVisibleInFeaturesList)?_c('div',{staticClass:"content-item",class:this.feature.value.toLowerCase().replaceAll(' ', '-')},[_c('div',{staticClass:"content-item-row"},[_c('div',{staticClass:"wrappable"},[_c('div',{staticClass:"left-row"},[_c('div',{staticClass:"content-item-infos"},[(_vm.readOnly)?_c('div',[_c('h5',[_c('vu-icon',{class:("" + (this.feature.value)),style:(("" + (this.feature.color ? 'color:' + this.feature.color : ''))),attrs:{"icon":_vm.feature.icon}}),_vm._v(" "+_vm._s(_vm.feature.label)+" ")],1)]):_c('vu-checkbox',{staticClass:"toggle-feature",attrs:{"value":_vm.feature.checked ? _vm.feature.value : null,"type":"switch","options":[_vm.featureOptionFormatted]},on:{"input":_vm.updateFeatureChecked}})],1)]),_c('div',{staticClass:"middle-row"},[_c('div',{staticClass:"content-item-search"},[(_vm.displayAddTemplate)?_c('span',{staticClass:"search"},[(_vm.displayCreateTemplateLinks)?_c('div',[_c('vu-icon-link',{staticClass:"search-template",attrs:{"icon":"plus"},on:{"click":_vm.showSearchInput}},[_vm._v(" "+_vm._s(_vm.$i18n('searchTemplate'))+" ")]),_c('vu-icon-link',{staticClass:"create-template",attrs:{"icon":"plus"},on:{"click":_vm.showContentCreationInline}},[_vm._v(" "+_vm._s(_vm.$i18n('createTemplate'))+" ")])],1):_vm._e(),(_vm.displaySearch)?_c('div',[_c('SwymSearchInput',{on:{"search":_vm.search},model:{value:(_vm.querySearch),callback:function ($$v) {_vm.querySearch=$$v},expression:"querySearch"}})],1):_vm._e(),(_vm.feature.template)?_c('div',[(_vm.feature.template.inlineTemplate && !_vm.readOnly)?_c('vu-icon-link',{on:{"dblclick":_vm.showContentEditInline}},[_vm._v(" "+_vm._s(_vm.feature.template.label))]):_vm._e(),(!_vm.feature.template.inlineTemplate || _vm.readOnly)?_c('span',[_vm._v(_vm._s(_vm.feature.template.label))]):_vm._e()],1):_vm._e(),((_vm.isSearchingTemplate || _vm.feature.template) && !_vm.readOnly)?_c('vu-icon-btn',{attrs:{"icon":"close"},on:{"click":_vm.searchOnClick}}):_vm._e()],1):_vm._e()]),(_vm.isIdeation() || !_vm.inMobile)?_c('div',{staticClass:"content-item-small-pipeline"},[(_vm.isIdeation())?_c('SwymSmallPipeline',{attrs:{"items":_vm.feature['status-array']},on:{"click":_vm.togglePipeline}}):_vm._e()],1):_vm._e(),_c('div',{staticClass:"content-item-allow"},[(!_vm.readOnly)?_c('vu-checkbox',{attrs:{"value":_vm.feature.allowContributorsToCreate.checked ?
              _vm.feature.allowContributorsToCreate.value : null,"options":[_vm.allowContributorsToCreateFormatted]},on:{"input":function (checked) { return _vm.$emit('update:feature_allowContributorsToCreate_checked', checked != null); }}}):_vm._e()],1)])]),_c('div',{staticClass:"right-row"},[_c('div',{staticClass:"content-item-context-menu"},[(_vm.feature.contentToReuse || _vm.feature.value == 'ideation')?_c('vu-dropdownmenu',{attrs:{"items":_vm.contextMenu},on:{"update:show":function (show) { return _vm.resetPositionDropdown(show, 'bottom'); }}},[_c('vu-icon-btn',{ref:"dropdown-btn",attrs:{"icon":"chevron-down"}})],1):_vm._e()],1)])]),_c('div',{staticClass:"dropdown-pipeline"},[_c('transition',{attrs:{"name":"dropdown"}},[(_vm.isIdeation() && _vm.showPipeline)?_c('SwymPipeline',_vm._g({attrs:{"status-array":_vm.feature['status-array'],"min-status-to-transfer":_vm.feature.minStatusToTransfer,"readOnly":_vm.readOnly}},_vm.$listeners)):_vm._e()],1)],1),_c('SwymFeatureCreationModal',{attrs:{"show":_vm.showFeatureCreationModal,"feature":_vm.feature,"content-to-reuse-list":[
      {
        label: _vm.$i18n('idea'),
        value: 'ideation'
      },
      {
        label: _vm.$i18n('post'),
        value: 'post'
      }
    ]},on:{"edit":_vm.editFeature,"cancel":function($event){_vm.showFeatureCreationModal = false},"close":function($event){_vm.showFeatureCreationModal = false}}})],1):_vm._e()}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/CommunitySettings/SwymContentSettingItem.vue?vue&type=template&id=4327d9cb&scoped=true&

// EXTERNAL MODULE: ./src/mixins/dropdown.js
var dropdown = __webpack_require__("1ebd");

// CONCATENATED MODULE: ../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./src/components/CommunitySettings/SwymContentSettingItem.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var SwymContentSettingItemvue_type_script_lang_js_ = ({
  name: 'SwymContentSettingItem',
  mixins: [dropdown["a" /* default */]],
  props: {
    /**
     * Feature
     * @property {string} label - Label
     * @property {string} value - Value
     * @property {boolean} checked - Toggle on/off
     */
    feature: {
      type: Object,
      required: true,
    },
    searchComponent: {
      type: Object,
      required: true,
    },
    readOnly: {
      type: Boolean,
      default: false
    }

  },
  data() {
    return {
      isSearchingTemplate: false,
      isCreatingTemplate: false,
      showPipeline: false,
      showFeatureCreationModal: false,
      inMobile: false,
      querySearch: '',
    };
  },
  computed: {

    /**
     * Display Search/Create template
     * If:
     *  - Is not searching a template
     *  - Is not creating a template
     *  - There is no template selected/created for this feature
     *  - Is not in readOnly mode
     * @returns {boolean}
     */
    displayCreateTemplateLinks() {
      return !this.isSearchingTemplate && !this.isCreatingTemplate && !this.feature.template && !this.readOnly
    },

    /**
     * Display Search input
     * If: 
     *  - Is searching a template (click on Search template link)
     *  - Is not creating a template
     *  - There is no template selected/created for this feature
     *  - Is not in readOnly mode
     * @returns {boolean}
     */
    displaySearch(){
      return this.isSearchingTemplate && !this.isCreatingTemplate && !this.feature.template && !this.readOnly;
    },
    
    /**
     * Display all template feature
     * If:
     *  - Feature is enabled/activated
     *  - Feature has creation template possibility
     * @returns {boolean}
     */
    displayAddTemplate() {
      return this.feature.checked && this.feature.createTemplate;
    },

    contextMenu() {
      const menu = [];
      
      // Edit
      if(this.feature.contentToReuse && !this.readOnly){
        menu.push({
          text: this.$i18n('editContent'),
          fonticon: 'pencil',
          handler: () => {
            this.showFeatureCreationModal = true;
          },
        })
      }

      // Show Pipeline
      if (this.isIdeation()) {
        menu.push({
          text: this.showPipeline ? this.$i18n('hidePipeline') : this.$i18n('showPipeline'),
          fonticon: 'chart-funnel',
          handler: () => {
            this.togglePipeline();
          },
        });
      }

      // Delete
      if (this.feature.contentToReuse && !this.readOnly) {
        menu.push({
          text: this.$i18n('delete'),
          fonticon: 'trash',
          handler: () => {
            // Ask confirmation to user when delete a derived type
            this.$confirm(
              this.$i18n('deleteContentType'),
              this.$i18n('confirm'),
              {
                okLabel: this.$i18n('confirm'),
                cancelLabel: this.$i18n('cancel'),
              },
            )
              .then(() => {
                this.$emit('remove:derivedType');
              })
              // eslint-disable-next-line
              .catch((err) => console.error(err));

          },
        });
      }

      return menu;
    },
    modalTitle() {
      return `${this.feature.contentToReuse ? this.feature.title : 'Idea'} - ${this.$i18n('pipeline')}`;
    },
    /**
     * Return the feature with the formatted label (include the icon)
     */
    featureOptionFormatted() {
      return {
        ...this.feature,
        // Bypass, fonticon in front of label in vu-checkbox
        label: `
          <span
          class="${this.feature.value} fonticon fonticon-${this.feature.icon}"
          ${this.feature.color ? `style="color: ${this.feature.color} ;"` : ''}></span>
          ${this.feature.label}`,
      };
    },

    /**
     * Return the allowContributorsToCreate with the label
     */
    allowContributorsToCreateFormatted() {
      return {
        ...this.feature.allowContributorsToCreate,
        label: this.$i18n('allowContributorsToCreate'),
      };
    },
  },
  mounted() {
    // Event listener to update inMobile data
    this.onResize();
    window.addEventListener('resize', this.onResize);
  },
  destroy() {
    window.removeEventListener('resize');
  },
  methods: {
    /**
     * Triggered when the window is resized
     * inMobile is true if width is inferior to 900px
     */
    onResize() {
      this.inMobile = window.matchMedia('(max-width: 900px)').matches;
    },
    getSearchResult(data) {
      this.isSearchingTemplate = false;

      this.$emit('update:feature_template', {
        uri: data.asset.id,
        label: data.asset['ds6w:label'],
        description: data.asset['ds6w:description'],
      });
    },

    /**
     * Emit search event
     * -> to add a template
     */
    search() {
      this.isSearchingTemplate = false;
      this.$emit(
        'search',
        {
          query: this.querySearch,
          precond: this.getSearchPreconditionType(),
        },
      );

      this.querySearch = '';
    },

    searchOnClick() {
      this.isSearchingTemplate = false;
      this.$emit('update:feature_template', { uri: null});
    },

    // TO REFACTOR
    // For generic and global
    getSearchPreconditionType() {
      let precondition = null;
      switch (this.feature.contentToReuse || this.feature.value) {
        case 'post':
          precondition = 'Post';
          break;
        case 'question':
          precondition = 'Question';
          break;
        case 'ideation':
          precondition = 'Idea';
          break;
        case 'wiki':
          precondition = 'WikitreePage';
          break;
        default:
          precondition = 'Post';
      }

      return `([ds6w:type]:"swym:${precondition}")`;
    },

    showSearchInput() {
      this.isSearchingTemplate = true;

      // TODO: find another way
      // this.$nextTick(() => {
      //   let input = this.$refs["search-component"].$el.querySelector("input");

      //   input.focus()

      //   input.addEventListener('focusout', () => {
      //     this.searchOnClick() //TO REFACTOR
      //   })
      // })
    },
    showContentCreationInline(){
      this.$emit('showContentCreationInline',{ feature : this.feature}); 
    },
    showContentEditInline(){
          this.$emit('showContentEditInline',{feature : this.feature}); 
    }, 
    async updateFeatureChecked(toggle) {
      // If feature will be deactivate and it is not a derived type, show the warning
      if (toggle === null && !this.feature.contentToReuse) {
        this.$confirm(this.$i18n('disableContentType'), this.$i18n('confirm'), {
          okLabel: this.$i18n('confirm'), cancelLabel: this.$i18n('cancel'),
        })
          .then(() => {
            this.$emit('update:feature_checked', toggle != null);
          })
          // eslint-disable-next-line
          .catch((err) => console.error(err));
      } else {
        this.$emit('update:feature_checked', toggle != null);
      }
    },

    /**
     * True, if the content type is Idea
     * Or derived type based on Idea
     */
    isIdeation() {
      return (this.feature.value === 'ideation' || this.feature.contentToReuse === 'ideation');
    },

    /**
     * Show/Hide the pipeline
     */
    togglePipeline() {
      this.showPipeline = !this.showPipeline;
    },

    /**
     * Edit the feature
     * - Name/Title
     * - Icon
     * - Color
     * -> Emit an event 'update:feature'
     * @param {Object} data - Updated data for edition
     */
    editFeature(data) {
      this.$emit('update:feature', data);
      this.showFeatureCreationModal = false;
    },
  },
});

// CONCATENATED MODULE: ./src/components/CommunitySettings/SwymContentSettingItem.vue?vue&type=script&lang=js&
 /* harmony default export */ var CommunitySettings_SwymContentSettingItemvue_type_script_lang_js_ = (SwymContentSettingItemvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/CommunitySettings/SwymContentSettingItem.vue?vue&type=style&index=0&id=4327d9cb&lang=scss&scoped=true&
var SwymContentSettingItemvue_type_style_index_0_id_4327d9cb_lang_scss_scoped_true_ = __webpack_require__("c87a");

// EXTERNAL MODULE: ../node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("a6c2");

// CONCATENATED MODULE: ./src/components/CommunitySettings/SwymContentSettingItem.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  CommunitySettings_SwymContentSettingItemvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "4327d9cb",
  null
  
)

/* harmony default export */ var SwymContentSettingItem = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "d9cf":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"577c093e-vue-loader-template"}!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./src/components/DefaultContent/SwymDefaultContent.vue?vue&type=template&id=e48e8cc0&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"default-content-wrapper"},[_c('h3',[_vm._v(_vm._s(_vm.$i18n('defaultContent')))]),(!_vm.readOnly)?_c('div',{staticClass:"search"},[_c('span',{staticClass:"search-label"},[_vm._v(_vm._s(_vm.$i18n('selectDefaultContent')))]),_c('SwymTypeSelector',{attrs:{"items":_vm.dropdownList},model:{value:(_vm.featureSelected),callback:function ($$v) {_vm.featureSelected=$$v},expression:"featureSelected"}}),_c('SwymSearchInput',{on:{"search":_vm.search},model:{value:(_vm.querySearch),callback:function ($$v) {_vm.querySearch=$$v},expression:"querySearch"}})],1):_vm._e(),_c('div',{staticClass:"search-result container-fluid"},_vm._l((_vm.defaultContents.list),function(content,index){return _c('SwymDefaultContentItem',{key:index,attrs:{"content":_vm.contentWithIconColor(content),"readOnly":_vm.readOnly},on:{"removeDefaultContent":function () { return _vm.$emit('removeDefaultContent', index); },"updateSetAsRootWikiPage":function () { return _vm.$emit('updateSetAsRootWikiPage', content); }}})}),1)])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/DefaultContent/SwymDefaultContent.vue?vue&type=template&id=e48e8cc0&

// EXTERNAL MODULE: ./src/mixins/dropdown.js
var dropdown = __webpack_require__("1ebd");

// EXTERNAL MODULE: ./src/utils/types.js
var types = __webpack_require__("6bfe");

// CONCATENATED MODULE: ../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./src/components/DefaultContent/SwymDefaultContent.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ var SwymDefaultContentvue_type_script_lang_js_ = ({
  name: 'SwymDefaultContent',
  mixins: [dropdown["a" /* default */]],
  props: {
    searchComponent: {
      type: Object,
      required: true,
    },
    defaultContents: {
      type: Array,
      default: () => [],
    },
    readOnly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      featureSelected: this.defaultContents.featuresList[0], // Post is always the first
      querySearch: '',
    };
  },
  watch: {

    /**
     * Update the dropdown
     * Everytime there are changes in features
     * (Icon/Color/Name)
     */
    defaultContents: {
      handler: function(){
        let feature = this.dropdownList.find(el => (this.featureSelected.transientId === el.transientId) || (this.featureSelected.value === el.value))

        if(feature){
          this.featureSelected = feature
        }

      },
      deep: true,
    }
  },
  computed: {
    descriptionFormatted() {
      return this.content.description;
    },

    /**
     * Return dropdown list items according to features list (props)
     */
    dropdownList() {
      // Change feature selected with Post type
      // when the (derived) content type is disabled/removed

      const derivedTypeIsInFeaturesList = this.defaultContents.featuresList.find(
        (el) => el.transientId === this.featureSelected.transientId,
      );
      const contentTypeIsInFeaturesList = this.defaultContents.featuresList.find(
        (el) => el.value === this.featureSelected.value,
      );

      let mapping = this.defaultContents.featuresList.map((f) => ({
        label: f.label,
        icon: f.icon,
        color: f.color,
        value: f.value,
        precondition: f.contentToReuse || f.value,
        ...f.transientId && {
          transientId: f.transientId,
        },
      }))

      if (this.featureSelected.transientId) {
        if (!derivedTypeIsInFeaturesList) {
          this.featureSelected = this.defaultContents.featuresList[0];
        }
      } else if (this.featureSelected.value && !contentTypeIsInFeaturesList) {
        this.featureSelected = this.defaultContents.featuresList[0];
      }

      return mapping;
    },
  },
  methods: {
    /**
     * Trigger addNewDefaultContent event with the result of the search
     * -> Add new default content in Store
     */
    getSearchResult(data) {
      const isDerivedType = Object(types["c" /* isDerivedType */])(this.featureSelected.value);

      const newData = {
        ...data,
        isDerivedType,
        ...isDerivedType && { // If a derived type has been selected in SwymTypeSelector
          derivedTypeTransientId: this.featureSelected.transientId,
        },
      };

      this.$emit('addNewDefaultContent', newData);
    },

    /**
     * Trigger removeDefaultContent event with the index of the default content
     * -> Remove the default content
     */
    removeDefaultContent(index) {
      this.$emit('removeDefaultContent', index);
    },

    /**
     * Change the feature selected
     */
    changeDefaultContentType(type) {
      this.featureSelected = type;
    },

    /**
     * Return query with precondition regarding the feature selected
     * for Search
     */
    getSearchPrecondition() {

      return Object(types["b" /* getSearchPrecondition */])(this.featureSelected.precondition)

    },

    /**
     * Return content with icon & color
     */
    contentWithIconColor(content) {
      if (content.derivedTypeTransientId) {
        const { icon, color } = this.defaultContents.featuresList
          .find((el) => el.transientId === content.derivedTypeTransientId);

        return {
          ...content,
          icon,
          color,
        };
      }

      return content;
    },

    /**
     * Emit search event
     * -> to add a new default content
     */
    search() {
      const isDerivedType = Object(types["c" /* isDerivedType */])(this.featureSelected.value);

      this.$emit(
        'search',
        {
          query: this.querySearch,
          precond: this.getSearchPrecondition(),
          isDerivedType,
          ...isDerivedType && { // If a derived type has been selected in SwymTypeSelector
            derivedTypeTransientId: this.featureSelected.transientId,
          },
        },
      );
    },
  },
});

// CONCATENATED MODULE: ./src/components/DefaultContent/SwymDefaultContent.vue?vue&type=script&lang=js&
 /* harmony default export */ var DefaultContent_SwymDefaultContentvue_type_script_lang_js_ = (SwymDefaultContentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/DefaultContent/SwymDefaultContent.vue?vue&type=style&index=0&lang=scss&
var SwymDefaultContentvue_type_style_index_0_lang_scss_ = __webpack_require__("b14c");

// EXTERNAL MODULE: ../node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("a6c2");

// CONCATENATED MODULE: ./src/components/DefaultContent/SwymDefaultContent.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  DefaultContent_SwymDefaultContentvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var SwymDefaultContent = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "da31":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"577c093e-vue-loader-template"}!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./src/components/SwymTypeSelector.vue?vue&type=template&id=c4224b76&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"type-selector-wrapper",style:(_vm.formattedValue ? ("background-color: " + (_vm.formattedValue.color)) : '')},[_c('vu-dropdownmenu',{attrs:{"items":_vm.formattedItems},on:{"update:show":function (show) { return _vm.resetPositionDropdown(show, 'top'); }}},[_c('vu-icon',{ref:"dropdown-btn",attrs:{"icon":_vm.formattedValue ? _vm.formattedValue.icon : 'plus'}})],1)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/SwymTypeSelector.vue?vue&type=template&id=c4224b76&

// EXTERNAL MODULE: ./src/mixins/dropdown.js
var mixins_dropdown = __webpack_require__("1ebd");

// EXTERNAL MODULE: ./src/utils/style.js
var style = __webpack_require__("a7f7");

// CONCATENATED MODULE: ../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./src/components/SwymTypeSelector.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ var SwymTypeSelectorvue_type_script_lang_js_ = ({
  name: 'SwymTypeSelector',
  mixins: [mixins_dropdown["a" /* default */]],
  props: {
    items: {
      type: Array,
      required: true,
    },
    value: {
      type: Object,
      required: true,
    },
  },
  computed: {
    /**
     * Return items formatted
     * e.g. label/icon?/color?/value? -> text/fonticon/icon/color/handler/index
     * value (post/idea/question/...) OR icon/color (derived type)
     */
    formattedItems() {
      return this.items.map((el, index) => {
        const icon = el.icon || style["a" /* CONTENT_TYPE_ICON_COLOR */][el.value].icon;
        const color = el.color || style["a" /* CONTENT_TYPE_ICON_COLOR */][el.value].color;

        return {
          text: el.label,
          fonticon: `${icon} item-${index + 1} ${el.value.toLowerCase().replaceAll(' ', '-')} `, // Bypass, to change background color of fonticon in dropdownmenu
          icon,
          color,
          handler: this.updateTypeSelected,
          index,
        };
      });
    },

    /**
     * Return value (from v-model) formatted
     * text/icon/color
     */
    formattedValue() {
      const icon = this.value.icon || style["a" /* CONTENT_TYPE_ICON_COLOR */][this.value.value].icon;
      const color = this.value.color || style["a" /* CONTENT_TYPE_ICON_COLOR */][this.value.value].color;

      return {
        text: this.value.label,
        icon,
        color,
      };
    },
  },
  watch: {
    items() {
      this.$nextTick(() => this.updateBackgroundColor());
    },
  },
  mounted() {
    let dropdown = null;

    // Loop on items to set the background color
    this.formattedItems.forEach((el, index) => {
      const fonticonEl = document.querySelector(`.item-${index + 1}`); // Bypass, to change background color of fonticon in dropdownmenu
      fonticonEl.style['background-color'] = el.color || style["a" /* CONTENT_TYPE_ICON_COLOR */][el.value].color;

      if (dropdown === null) {
        dropdown = fonticonEl.closest('.dropdown-menu');

        // By pass, to identify the dropdown and apply style on it
        dropdown.id = 'dropdown-menu-type-selector';
      }
    });
  },
  methods: {
    /**
     * Return the item selected in the original list items (not formattedList)
     */
    updateTypeSelected(item) {
      this.$emit('input', this.items[item.index]);
    },

    /**
     * Update background color of fonticon for each item
     */
    updateBackgroundColor() {
      // Loop on items to set the background color
      this.formattedItems.forEach((el, index) => {
        const fonticonEl = document.querySelector(`.item-${index + 1}`); // Bypass, to change background color of fonticon in dropdownmenu
        fonticonEl.style['background-color'] = el.color || style["a" /* CONTENT_TYPE_ICON_COLOR */][el.value].color;
      });
    },
  },
});

// CONCATENATED MODULE: ./src/components/SwymTypeSelector.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_SwymTypeSelectorvue_type_script_lang_js_ = (SwymTypeSelectorvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/SwymTypeSelector.vue?vue&type=style&index=0&lang=scss&
var SwymTypeSelectorvue_type_style_index_0_lang_scss_ = __webpack_require__("de6d");

// EXTERNAL MODULE: ../node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("a6c2");

// CONCATENATED MODULE: ./src/components/SwymTypeSelector.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_SwymTypeSelectorvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var SwymTypeSelector = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "dc36":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// addapted from the document.currentScript polyfill by Adam Miller
// MIT license
// source: https://github.com/amiller-gh/currentScript-polyfill

// added support for Firefox https://bugzilla.mozilla.org/show_bug.cgi?id=1620505

(function (root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
}(typeof self !== 'undefined' ? self : this, function () {
  function getCurrentScript () {
    var descriptor = Object.getOwnPropertyDescriptor(document, 'currentScript')
    // for chrome
    if (!descriptor && 'currentScript' in document && document.currentScript) {
      return document.currentScript
    }

    // for other browsers with native support for currentScript
    if (descriptor && descriptor.get !== getCurrentScript && document.currentScript) {
      return document.currentScript
    }
  
    // IE 8-10 support script readyState
    // IE 11+ & Firefox support stack trace
    try {
      throw new Error();
    }
    catch (err) {
      // Find the second match for the "at" string to get file src url from stack.
      var ieStackRegExp = /.*at [^(]*\((.*):(.+):(.+)\)$/ig,
        ffStackRegExp = /@([^@]*):(\d+):(\d+)\s*$/ig,
        stackDetails = ieStackRegExp.exec(err.stack) || ffStackRegExp.exec(err.stack),
        scriptLocation = (stackDetails && stackDetails[1]) || false,
        line = (stackDetails && stackDetails[2]) || false,
        currentLocation = document.location.href.replace(document.location.hash, ''),
        pageSource,
        inlineScriptSourceRegExp,
        inlineScriptSource,
        scripts = document.getElementsByTagName('script'); // Live NodeList collection
  
      if (scriptLocation === currentLocation) {
        pageSource = document.documentElement.outerHTML;
        inlineScriptSourceRegExp = new RegExp('(?:[^\\n]+?\\n){0,' + (line - 2) + '}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*', 'i');
        inlineScriptSource = pageSource.replace(inlineScriptSourceRegExp, '$1').trim();
      }
  
      for (var i = 0; i < scripts.length; i++) {
        // If ready state is interactive, return the script tag
        if (scripts[i].readyState === 'interactive') {
          return scripts[i];
        }
  
        // If src matches, return the script tag
        if (scripts[i].src === scriptLocation) {
          return scripts[i];
        }
  
        // If inline source matches, return the script tag
        if (
          scriptLocation === currentLocation &&
          scripts[i].innerHTML &&
          scripts[i].innerHTML.trim() === inlineScriptSource
        ) {
          return scripts[i];
        }
      }
  
      // If no match, return null
      return null;
    }
  };

  return getCurrentScript
}));


/***/ }),

/***/ "de6d":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymTypeSelector_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("7352");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymTypeSelector_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymTypeSelector_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "e03b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymRssFeedModal_vue_vue_type_style_index_1_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("d47b");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymRssFeedModal_vue_vue_type_style_index_1_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymRssFeedModal_vue_vue_type_style_index_1_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "e04e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymContributionItem_vue_vue_type_style_index_0_id_6f007cad_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("1a98");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymContributionItem_vue_vue_type_style_index_0_id_6f007cad_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SwymContributionItem_vue_vue_type_style_index_0_id_6f007cad_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "e1d6":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "e333":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CKEditor_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cc1f");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CKEditor_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CKEditor_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "ec25":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"577c093e-vue-loader-template"}!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./src/components/SwymContributionsList.vue?vue&type=template&id=6caffa94&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"community-contributions-list"},[_c('vu-scroller',{ref:"scroller",attrs:{"infinite":_vm.infinite,"loading-text":_vm.NLS.Loading},on:{"loading":_vm.onLoadingStart}},[_c('div',{staticClass:"contribution-list-body"},_vm._l((_vm.contributions),function(item,index){return _c('vu-lazy',{key:item.mid,attrs:{"height":"60px"}},[_c('SwymContributionItem',{attrs:{"icon":item.icon,"color":item.color,"title":item.title,"contentType":item.contentType,"mid":item.mid,"isDraft":item.isDraft,"publishDate":item.publishDate,"relPath":item.relPath,"activated":item.activated,"isValidatedQuestion":item.isValidatedQuestion,"i18nKeys":_vm.i18nKeys,"NLS":_vm.NLS,"isLastItem":index === _vm.contributions.length - 1},on:{"editItem":_vm.editContribution,"deleteItem":_vm.deleteContribution,"goToItem":_vm.goToContribution,"dragItem":_vm.dragContribution}})],1)}),1),(!_vm.infinite && !_vm.contributions.length)?[_c('div',{staticClass:"no-results"},[_c('div',{staticClass:"no-results-icon"},[_c('span',{staticClass:"fonticon fonticon-5x fonticon-feather"})]),_c('div',{staticClass:"no-results-text"},[_vm._v(_vm._s(_vm.NLS.NoContent))]),_c('vu-btn',{staticClass:"no-results-button",attrs:{"color":"link"},on:{"click":_vm.startContentCreation}},[_vm._v(" "+_vm._s(_vm.NLS.StartNow)+" ")])],1)]:_vm._e()],2)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/SwymContributionsList.vue?vue&type=template&id=6caffa94&scoped=true&

// CONCATENATED MODULE: ../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./src/components/SwymContributionsList.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var SwymContributionsListvue_type_script_lang_js_ = ({
  name: "SwymContributionsList",
  props: {
    contributions: {
      type: Array,
      default: () => [],
    },
    i18nKeys: {
      type: Object,
      default: () => ({}),
    },
    NLS: {
      type: Object,
      default: () => ({}),
    },
    infinite: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    editContribution(mid) {
      this.$emit("editContribution", mid);
    },
    deleteContribution(mid) {
      this.$emit("deleteContribution", mid);
    },
    goToContribution(mid) {
      this.$emit("goToContribution", mid);
    },
    onLoadingStart() {
      this.$emit("onScrollerLoad");
    },
    onLoadingEnd() {
      this.$refs.scroller.stopLoading();
    },
    startContentCreation() {
      this.$emit("startContentCreation");
    },
    dragContribution(options) {
      this.$emit("dragContribution", options);
    },
  },
});

// CONCATENATED MODULE: ./src/components/SwymContributionsList.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_SwymContributionsListvue_type_script_lang_js_ = (SwymContributionsListvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/SwymContributionsList.vue?vue&type=style&index=0&id=6caffa94&lang=scss&scoped=true&
var SwymContributionsListvue_type_style_index_0_id_6caffa94_lang_scss_scoped_true_ = __webpack_require__("d685");

// EXTERNAL MODULE: ../node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("a6c2");

// CONCATENATED MODULE: ./src/components/SwymContributionsList.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_SwymContributionsListvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "6caffa94",
  null
  
)

/* harmony default export */ var SwymContributionsList = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "edc1":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"577c093e-vue-loader-template"}!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./src/components/CommunitySettings/SwymCommunityVisibility.vue?vue&type=template&id=2a7542b5&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('h3',[_vm._v(_vm._s(_vm.$i18n("communityVisibility")))]),_c('SwymGenericCommunityVisibility',{staticClass:"visibility-employee-container col-sm-6 col-xs-12",attrs:{"value":_vm.visibilityModel.employees,"title":_vm.$i18n('visibilityForEmployees'),"readOnly":_vm.readOnly},on:{"update:visibility":function (v) { return _vm.$emit('update:employeesVisibility', v); },"update:blacklist":function (v) { return _vm.$emit('update:employeesBlacklist', v); }}}),_c('SwymGenericCommunityVisibility',{staticClass:"visibility-contractor-container col-sm-6 col-xs-12",attrs:{"value":_vm.visibilityModel.contractors,"title":_vm.$i18n('visibilityForContrators'),"readOnly":_vm.readOnly},on:{"update:visibility":function (v) { return _vm.$emit('update:contractorsVisibility', v); }}})],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/CommunitySettings/SwymCommunityVisibility.vue?vue&type=template&id=2a7542b5&

// CONCATENATED MODULE: ../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./src/components/CommunitySettings/SwymCommunityVisibility.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var SwymCommunityVisibilityvue_type_script_lang_js_ = ({
  name: 'SwymCommunityVisibility',
  props: {
    visibilityModel: {
      type: Object,
      required: true,
    },
    readOnly: {
      type: Boolean,
      default: false
    }
  },
});

// CONCATENATED MODULE: ./src/components/CommunitySettings/SwymCommunityVisibility.vue?vue&type=script&lang=js&
 /* harmony default export */ var CommunitySettings_SwymCommunityVisibilityvue_type_script_lang_js_ = (SwymCommunityVisibilityvue_type_script_lang_js_); 
// EXTERNAL MODULE: ../node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("a6c2");

// CONCATENATED MODULE: ./src/components/CommunitySettings/SwymCommunityVisibility.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  CommunitySettings_SwymCommunityVisibilityvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var SwymCommunityVisibility = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "ef22":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"577c093e-vue-loader-template"}!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./src/components/IconList/SwymIconList.vue?vue&type=template&id=433b9700&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"icon-list"},[_c('vu-scroller',{ref:"scroller",staticClass:"scroller",attrs:{"infinite":"","infinite-margin":10},on:{"loading":_vm.loadMore}},_vm._l((_vm.iconsList),function(iconItem,index){return _c('SwymIconSection',{key:index,attrs:{"title":iconItem.title,"icons":iconItem.icons},on:{"click":function (icon) { return _vm.$emit('onIconClick', icon); }}})}),1)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/IconList/SwymIconList.vue?vue&type=template&id=433b9700&scoped=true&

// EXTERNAL MODULE: ./assets/bm-icons.json
var bm_icons = __webpack_require__("c847");

// CONCATENATED MODULE: ../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./src/components/IconList/SwymIconList.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var SwymIconListvue_type_script_lang_js_ = ({
  name: 'SwymIconList',
  data() {
    return ({
      iconsList: bm_icons.data.slice(0, 2),
      length: bm_icons.data.length,
      limit: 3,
    });
  },
  methods: {

    /**
     * Add new icon sections in the scroller
     */
    loadMore() {
      if (this.limit === this.length) {
        this.$refs.scroller.stopLoading();
        return;
      }
      // SetTimeout to avoid loading too many icons
      setTimeout(() => {
        if (this.limit + 3 < this.length) {
          this.limit += 3;
          this.iconsList = bm_icons.data.slice(0, this.limit - 1);
        } else if (this.length - this.limit > 0) {
          this.limit = this.length;
          this.iconsList = bm_icons.data.slice(0, this.length);
        }
        this.$refs.scroller.stopLoading();
      }, 500);
    },
  },
});

// CONCATENATED MODULE: ./src/components/IconList/SwymIconList.vue?vue&type=script&lang=js&
 /* harmony default export */ var IconList_SwymIconListvue_type_script_lang_js_ = (SwymIconListvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/IconList/SwymIconList.vue?vue&type=style&index=0&id=433b9700&scoped=true&lang=css&
var SwymIconListvue_type_style_index_0_id_433b9700_scoped_true_lang_css_ = __webpack_require__("cefb");

// EXTERNAL MODULE: ../node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("a6c2");

// CONCATENATED MODULE: ./src/components/IconList/SwymIconList.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  IconList_SwymIconListvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "433b9700",
  null
  
)

/* harmony default export */ var SwymIconList = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "f04a":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"577c093e-vue-loader-template"}!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./src/components/CommunitySettings/SwymCommunityContentSettings.vue?vue&type=template&id=2466d3f1&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"community-setting"},[_c('div',[_c('h3',[_vm._v(_vm._s(_vm.$i18n("content")))])]),_c('div',{staticClass:"content-items"},_vm._l((_vm.featuresComputed),function(feature,index){return _c('SwymContentSettingItem',{key:index,attrs:{"feature":feature,"search-component":_vm.searchComponent,"readOnly":_vm.readOnly},on:{"update:feature":function (data) { return _vm.$emit('update:feature', Object.assign({}, {featureIndex: index}, data)); },"update:feature_checked":function (checked) { return _vm.$emit('update:feature_checked', {featureIndex: index, featureChecked: checked}); },"update:feature_allowContributorsToCreate_checked":function (checked) { return _vm.$emit('update:feature_allowContributorsToCreate_checked',
              {featureIndex: index,
               allowContributorsToCreateChecked: checked}); },"update:feature_template":function (data) { return _vm.$emit('update:feature_template', Object.assign({}, {featureIndex: index}, data)); },"search":function (data) { return _vm.$emit('search', Object.assign({}, {featureIndex: index}, data)); },"addNewStatus":function (status) { return _vm.$emit('addNewStatus', {featureIndex: index, status: status}); },"removeStatus":function (statusIndex) { return _vm.$emit('removeStatus', {featureIndex: index, statusIndex: statusIndex}); },"changePositionStatus":function (data) { return _vm.$emit('changePositionStatus', Object.assign({}, {featureIndex: index}, data)); },"update:status_label":function (data) { return _vm.$emit('update:status_label', Object.assign({}, {featureIndex: index}, data)); },"update:status_color":function (data) { return _vm.$emit('update:status_color', Object.assign({}, {featureIndex: index}, data)); },"update:status_minStatusToTransfer":function (value) { return _vm.$emit('update:status_minStatusToTransfer',
              {featureIndex: index,
               minStatusToTransfer: value}); },"remove:derivedType":function () { return _vm.$emit('remove:derivedType', {featureIndex: index}); },"showContentCreationInline":function (data){ return _vm.$emit('showContentCreationInline', Object.assign({}, {featureIndex: index},data)); },"showContentEditInline":function (data){ return _vm.$emit('showContentEditInline', Object.assign({}, {featureIndex: index}, data)); }}})}),1),(!_vm.readOnly)?_c('vu-icon-link',{attrs:{"icon":"plus"},on:{"click":function($event){_vm.showFeatureCreationModal = true}}},[_vm._v(" "+_vm._s(_vm.$i18n('addContentType'))+" ")]):_vm._e(),_c('SwymFeatureCreationModal',{attrs:{"show":_vm.showFeatureCreationModal,"icon-list":['leaf', '3ds-what'],"content-to-reuse-list":[
      {
        label: _vm.$i18n('idea'),
        value: 'ideation'
      },
      {
        label: _vm.$i18n('post'),
        value: 'post'
      }
    ]},on:{"create":_vm.addNewFeature,"cancel":function($event){_vm.showFeatureCreationModal = false},"close":function($event){_vm.showFeatureCreationModal = false}}})],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/CommunitySettings/SwymCommunityContentSettings.vue?vue&type=template&id=2466d3f1&

// CONCATENATED MODULE: ../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./src/components/CommunitySettings/SwymCommunityContentSettings.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var SwymCommunityContentSettingsvue_type_script_lang_js_ = ({
  name: 'SwymCommunityContentSettings',
  props: {
    title: {
      type: String,
      required: true,
    },
    /**
     * List of available features
     */
    features: {
      type: Array,
      required: true,
    },
    /**
     * List of roles
     * @property {string} label
     */
    roles: {
      type: Array,
      default: () => [],
    },

    searchComponent: {
      type: Object,
      required: true,
    },
    readOnly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      roleSelected: null,
      showFeatureCreationModal: false,
    };
  },
  created() {
    this.roles.forEach((role) => {
      if (role.selected) {
        this.roleSelected = role.value;
      }
    });
  },
  methods: {
    addNewFeature(data) {
      this.$emit('addNewFeature', data);
      this.showFeatureCreationModal = false;
    },
  },
  computed: {
    featuresComputed(){
      if(this.readOnly){
        return this.features.filter(feature => feature.checked)
      } else {
        return this.features
      }
    }
  }
});

// CONCATENATED MODULE: ./src/components/CommunitySettings/SwymCommunityContentSettings.vue?vue&type=script&lang=js&
 /* harmony default export */ var CommunitySettings_SwymCommunityContentSettingsvue_type_script_lang_js_ = (SwymCommunityContentSettingsvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/CommunitySettings/SwymCommunityContentSettings.vue?vue&type=style&index=0&lang=scss&
var SwymCommunityContentSettingsvue_type_style_index_0_lang_scss_ = __webpack_require__("abb2");

// EXTERNAL MODULE: ../node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("a6c2");

// CONCATENATED MODULE: ./src/components/CommunitySettings/SwymCommunityContentSettings.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  CommunitySettings_SwymCommunityContentSettingsvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var SwymCommunityContentSettings = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "f551":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "fee8":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });
});
//# sourceMappingURL=SwymUIVueComponents.umd.js.map