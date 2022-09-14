"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk"] = self["webpackChunk"] || []).push([["analytic"],{

/***/ "./analytics.ts":
/*!**********************!*\
  !*** ./analytics.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ \"../node_modules/jquery/dist/jquery.js\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);\n\n\nfunction createAnalytics() {\n  var isDestroyed = false; // TypeScript syntax\n\n  var counter = 0;\n\n  var listener = function listener() {\n    return counter++;\n  };\n\n  jquery__WEBPACK_IMPORTED_MODULE_0__(document).on('click', listener); // document.addEventListener('click', listener)\n\n  return {\n    destroy: function destroy() {\n      document.removeEventListener('click', listener);\n      isDestroyed = true;\n    },\n    getClicked: function getClicked() {\n      if (isDestroyed) console.log(\"Analytics destroyed! Totla clicks = \".concat(counter));\n      return counter;\n    }\n  };\n}\n\nwindow['analytics'] = createAnalytics();\n\n//# sourceURL=webpack:///./analytics.ts?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["vendors-node_modules_jquery_dist_jquery_js"], function() { return __webpack_exec__("./analytics.ts"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);