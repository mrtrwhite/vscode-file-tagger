module.exports =
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "activate", function() { return activate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deactivate", function() { return deactivate; });
/* harmony import */ var vscode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var vscode__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vscode__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _FileSystemProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _TagItem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);
/* harmony import */ var _Tag__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2);
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below



 // this method is called when your extension is activated
// your extension is activated the very first time the command is executed

function activate(context) {
  console.log('The File Tagger extension is now active.');
  const treeDataProvider = new _FileSystemProvider__WEBPACK_IMPORTED_MODULE_1__["FileSystemProvider"](context);
  vscode__WEBPACK_IMPORTED_MODULE_0__["window"].createTreeView('tagExplorer', {
    treeDataProvider
  });
  let addProjectCmd = vscode__WEBPACK_IMPORTED_MODULE_0__["commands"].registerCommand('tagExplorer.addTag', () => {
    vscode__WEBPACK_IMPORTED_MODULE_0__["window"].showInputBox({
      placeHolder: 'Enter tag name'
    }).then(value => {
      let tags = context.workspaceState.get('tags');

      if (typeof tags === 'undefined') {
        tags = {};
      }

      tags[value] = new _Tag__WEBPACK_IMPORTED_MODULE_3__["Tag"](value, 2);
      context.workspaceState.update('tags', tags);
      treeDataProvider.refresh();
    }).catch(console.error);
  });
  context.subscriptions.push(addProjectCmd);
  let tagFileCmd = vscode__WEBPACK_IMPORTED_MODULE_0__["commands"].registerCommand('extension.tagFile', e => {
    vscode__WEBPACK_IMPORTED_MODULE_0__["window"].showQuickPick(Object.keys(context.workspaceState.get('tags')), {
      placeHolder: 'Select Tag'
    }).then(selection => {
      let tags = context.workspaceState.get('tags');
      let tag = tags[selection];
      tag.items.push(new _TagItem__WEBPACK_IMPORTED_MODULE_2__["TagItem"](e.path, e.scheme));
      tags[selection] = tag;
      context.workspaceState.update('tags', tags);
      treeDataProvider.refresh();
    }).catch(console.error);
  });
  context.subscriptions.push(tagFileCmd);
}

exports.activate = activate; // this method is called when your extension is deactivated

function deactivate() {}



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FileSystemProvider", function() { return FileSystemProvider; });
/* harmony import */ var vscode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var vscode__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vscode__WEBPACK_IMPORTED_MODULE_0__);

class FileSystemProvider {
  constructor(context) {
    this.context = context;
    this._onDidChangeTreeData = new vscode__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    this.onDidChangeTreeData = this._onDidChangeTreeData.event;
  }

  getChildren(element) {
    if (element) {
      if (element.items) {
        return element.items;
      } else {
        return [];
      }
    } else {
      let tags = this.context.workspaceState.get('tags');

      if (tags) {
        return Object.values(tags);
      } else {
        return [];
      }
    }
  }

  getTreeItem(element) {
    if (element) {
      return {
        label: element.label,
        resourceUri: element.resourceUri,
        collapsibleState: element.collapsibleState,
        command: {
          command: 'vscode.open',
          arguments: [element.resourceUri]
        }
      };
    }

    return element;
  }

  refresh() {
    this._onDidChangeTreeData.fire();
  }

}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tag", function() { return Tag; });
/* harmony import */ var vscode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var vscode__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vscode__WEBPACK_IMPORTED_MODULE_0__);

class Tag extends vscode__WEBPACK_IMPORTED_MODULE_0__["TreeItem"] {
  constructor(label, collapsible) {
    super(label, collapsible);
    this.items = [];
  }

}

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("vscode");

/***/ }),
/* 4 */,
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TagItem", function() { return TagItem; });
/* harmony import */ var vscode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var vscode__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vscode__WEBPACK_IMPORTED_MODULE_0__);

class TagItem extends vscode__WEBPACK_IMPORTED_MODULE_0__["TreeItem"] {
  constructor(path, scheme) {
    super(vscode__WEBPACK_IMPORTED_MODULE_0__["Uri"].file(path));
    let parts = path.split('/');
    let label = parts[parts.length - 1];
    this.label = label;
    this.scheme = scheme;
  }

}

/***/ })
/******/ ]);