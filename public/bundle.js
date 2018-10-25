/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/DataBinder/DataBinder.js":
/*!**************************************!*\
  !*** ./src/DataBinder/DataBinder.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction setAttribute (element, attribute, value) {\r\n  if (attribute === 'innerHTML') {\r\n    element[attribute] = value\r\n  } else {\r\n    element.setAttribute(attribute, value)\r\n  }\r\n}\r\n\r\nclass Binding {\r\n  constructor (object, property, element, attribute) {\r\n    let _this = this\r\n\r\n    this.element = element\r\n    this.value = object[property]\r\n    this.attribute = attribute\r\n    this.valueGetter = function () {\r\n      return _this.value\r\n    }\r\n    this.valueSetter = function (val) {\r\n      _this.value = val\r\n      setAttribute(_this.element, _this.attribute, val)\r\n    }\r\n\r\n    Object.defineProperty(object, property, {\r\n      get: this.valueGetter,\r\n      set: this.valueSetter\r\n    })\r\n    object[property] = this.value\r\n\r\n    setAttribute(this.element, this.attribute, this.value)\r\n  }\r\n}\r\n\r\nclass DataBinder {\r\n  r (obj, key, element, attribute) {\r\n    if (key.length > 1) {\r\n      this.r(obj[key.shift()], key, element, attribute)\r\n    } else {\r\n      key = key.shift()\r\n      if (typeof obj[key] !== 'undefined') {\r\n        return new Binding(obj, key, element, attribute)\r\n      }\r\n      return false\r\n    }\r\n  }\r\n\r\n  bind (model, viewTemplate) {\r\n    const parser = new DOMParser()\r\n    let template = parser.parseFromString(viewTemplate, 'text/html').body.firstElementChild\r\n\r\n    this.r(\r\n      model,\r\n      template.getAttribute('data-bind').split('.'),\r\n      template,\r\n      'innerHTML'\r\n    );\r\n\r\n    ['title', 'src', 'alt', 'href'].map((attr) => {\r\n      if (template.getAttribute(`data-bind-${attr}`) !== null) {\r\n        this.r(\r\n          model,\r\n          template.getAttribute(`data-bind-${attr}`).split('.'),\r\n          template,\r\n          attr\r\n        )\r\n      }\r\n    })\r\n\r\n    return template\r\n  }\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (DataBinder);\r\n\n\n//# sourceURL=webpack:///./src/DataBinder/DataBinder.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _DataBinder_DataBinder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DataBinder/DataBinder */ \"./src/DataBinder/DataBinder.js\");\n/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./model */ \"./src/model.js\");\n/* harmony import */ var _template__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./template */ \"./src/template.js\");\n\r\n\r\n\r\n\r\n\r\nconst dataBinder = new _DataBinder_DataBinder__WEBPACK_IMPORTED_MODULE_0__[\"default\"]()\r\nconst view = dataBinder.bind(_model__WEBPACK_IMPORTED_MODULE_1__[\"model\"], _template__WEBPACK_IMPORTED_MODULE_2__[\"viewTemplate\"])\r\n\r\n_model__WEBPACK_IMPORTED_MODULE_1__[\"model\"].label = 'That works'\r\n_model__WEBPACK_IMPORTED_MODULE_1__[\"model\"].x.y.z = 'Changed'\r\n_model__WEBPACK_IMPORTED_MODULE_1__[\"model\"].src = 'src'\r\n\r\ndocument.getElementById('output').appendChild(view)\r\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/model.js":
/*!**********************!*\
  !*** ./src/model.js ***!
  \**********************/
/*! exports provided: model */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"model\", function() { return model; });\nlet model = {\r\n  label: 'Schibsted',\r\n  alt: '',\r\n  x: {\r\n    y: {\r\n      z: 'Some nested property to bind'\r\n    }\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/model.js?");

/***/ }),

/***/ "./src/template.js":
/*!*************************!*\
  !*** ./src/template.js ***!
  \*************************/
/*! exports provided: viewTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"viewTemplate\", function() { return viewTemplate; });\nlet viewTemplate = `<h1 data-bind=\"label\" data-bind-src=\"x.src\" data-bind-alt=\"alt\" data-bind-title=\"x.y.z\"></h1>`\n\n\n//# sourceURL=webpack:///./src/template.js?");

/***/ })

/******/ });