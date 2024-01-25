"use strict";
(self["webpackChunkjupyterlab_sandbox"] = self["webpackChunkjupyterlab_sandbox"] || []).push([["lib_index_js"],{

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ISandboxTracker: () => (/* binding */ ISandboxTracker),
/* harmony export */   Sandbox: () => (/* binding */ Sandbox),
/* harmony export */   SandboxNS: () => (/* binding */ SandboxNS),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/application */ "webpack/sharing/consume/default/@jupyterlab/application");
/* harmony import */ var _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_4__);





// import '../style/index.css';
class Sandbox extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_4__.Panel {
    constructor() {
        super();
        this._frame = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.IFrame();
        this.addWidget(this._frame);
    }
    get iframeNode() {
        return this.node.querySelector('iframe');
    }
    get sandboxAttr() {
        return Object.keys(this._sandBox || {}).join(' ');
    }
    get sandBox() {
        return this._sandBox;
    }
    set sandBox(attrs) {
        var _a;
        this._sandBox = attrs;
        (_a = this.iframeNode) === null || _a === void 0 ? void 0 : _a.setAttribute('sandbox', this.sandboxAttr);
    }
    get url() {
        return this._frame.url;
    }
    set url(url) {
        this._frame.url = url;
    }
}
class SandboxModal extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_4__.Widget {
    constructor() {
        let body = document.createElement("div");
        let label = document.createElement("label");
        label.textContent = 'Input a valid url';
        let input = document.createElement("input");
        // perhaps should just match window.location.protocol?
        input.placeholder = "protocol:host";
        body.appendChild(label);
        body.appendChild(input);
        super({ node: body });
    }
    get inputNode() {
        return this.node.querySelector('input');
    }
    getValue() {
        return this.inputNode.value;
    }
}
/** A namespace for all `iframe`-related things
 */
var SandboxNS;
(function (SandboxNS) {
    /** Generally useful subset of permissions that can run things like JupyterLab and Bokeh */
    SandboxNS.DEFAULT_SANDBOX = {
        'allow-forms': true,
        'allow-presentation': true,
        'allow-same-origin': true,
        'allow-scripts': true,
    };
    // @todo: implement error handling
    // export type TSandBoxProblem = 'no-src' | 'insecure-origin' | 'protocol-mismatch';
})(SandboxNS || (SandboxNS = {}));
var Private;
(function (Private) {
    let counter = 0;
    Private.namespace = 'sandbox-ext';
    function createSandbox(url, options) {
        let frame = new Sandbox();
        frame.id = `${Private.namespace}-${++counter}`;
        frame.title.label = 'Sandbox';
        frame.title.closable = true;
        frame.sandBox = options;
        frame.url = url;
        return frame;
    }
    Private.createSandbox = createSandbox;
})(Private || (Private = {}));
/**
 * The command IDs used by the launcher plugin.
 */
var CommandIDs;
(function (CommandIDs) {
    CommandIDs.create = 'sandbox:create';
    CommandIDs.restore = 'sandbox:restore';
})(CommandIDs || (CommandIDs = {}));
class ButtonRender {
    constructor(commands) {
        this._commands = commands;
    }
    createNew(panel) {
        const button = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.ToolbarButton({
            className: 'renderButton',
            tooltip: "Render Iframe",
            icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.buildIcon,
            onClick: () => {
                this._commands.execute(CommandIDs.create);
            }
        });
        panel.toolbar.insertAfter('cellType', 'voilaRender', button);
        return button;
    }
}
/**
 * The editor tracker token.
 */
const ISandboxTracker = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_3__.Token('jupyterlab_sandbox:ISandboxTracker');
const extension = {
    id: 'jupyterlab_sandbox',
    autoStart: true,
    requires: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.ICommandPalette, _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.ILayoutRestorer],
    provides: ISandboxTracker,
    activate: (app, palette, restorer) => {
        const tracker = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.WidgetTracker({ namespace: Private.namespace });
        const { commands, docRegistry } = app;
        // Handle state restoration.
        restorer.restore(tracker, {
            command: CommandIDs.restore,
            args: (widget) => ({ url: widget.url, sandbox: widget.sandBox }),
            name: () => Private.namespace
        });
        // not added to palette, only exists to reload page without modal creation
        app.commands.addCommand(CommandIDs.restore, {
            execute: (args) => {
                const url = args['url'];
                // fixme: should pass in args['sandbox'] to createSandbox but it's always undefined
                // const options = args['sandbox'] as Sandbox.TSandboxOptions
                let frame = Private.createSandbox(url, SandboxNS.DEFAULT_SANDBOX);
                tracker.add(frame);
                app.shell.add(frame);
            }
        });
        app.commands.addCommand(CommandIDs.create, {
            label: 'Open Web Page',
            execute: (args) => {
                (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.showDialog)({
                    title: 'Open a Web Page',
                    body: new SandboxModal(),
                    buttons: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Dialog.cancelButton(), _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Dialog.okButton()],
                    focusNodeSelector: 'input'
                }).then(result => {
                    if (!result.value) {
                        return null;
                    }
                    let frame = Private.createSandbox(result.value, SandboxNS.DEFAULT_SANDBOX);
                    tracker.add(frame);
                    app.shell.add(frame);
                    return Promise.resolve();
                });
            }
        });
        palette.addItem({ command: CommandIDs.create, category: 'Sandbox' });
        const renderButton = new ButtonRender(commands);
        docRegistry.addWidgetExtension('Notebook', renderButton);
        return tracker;
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (extension);


/***/ })

}]);
//# sourceMappingURL=lib_index_js.f876918e24def46862cc.js.map