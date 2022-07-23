Ext.define('FHIRata.component.CodeEditor', {
    extend: "Ext.panel.Panel",
    alias: "widget.codeeditor",
    border: false,

    config: {
        value: null,
        mode: "json"
    },

    publishes: ["value"],

    _editor: null,
    _beautify: null,

    updateValue: function (value) {
        if (!value) value = "";
        if (this._editor) {
            let editorValue = this._editor.getValue();
            if (!editorValue) editorValue = "";
            if (value !== editorValue) {
                this._editor.setValue(value);
                this._editor.clearSelection();
                // this._editor.moveCursorToPosition({ row: 0, column: 0 });
            }
        }
    },

    ace_id: null,

    initComponent: function () {
        this.callParent(arguments);
        this.ace_id = "ace_" + Ext.data.identifier.Uuid.createRandom()(); // not a typo
        this.setHtml(
            `<div id="${this.ace_id}" style="position:absolute;top:0;right:0;bottom:0;left:0;border:0"></div>`
        );
    },

    listeners: {
        render: function () {
            this.initAce();
        },
        resize: function () {
            if (this._editor) this._editor.resize(true);
        }
    },

    initAce: function () {
        const mode = this.getMode() || "json";
        var me = this;
        if (!ace) {
            throw new Error(
                "Ace code editor is unavailable ace и ace.beautify"
            );
            return;
        }
        this._editor = ace.edit(this.ace_id);
        this._beautify = ace.require("ace/ext/beautify");
        this._editor.setTheme("ace/theme/chrome");
        this._editor.session.setMode("ace/mode/" + mode);
        this._editor.on("change", function (e) {
            var editorValue = me._editor.getValue();
            if (!editorValue) editorValue = "";
            var thisValue = me.getValue();
            if (!thisValue) thisValue = "";
            if (editorValue !== thisValue) {
                me.setValue(editorValue);
                me.fireEvent("change", me, editorValue);
            }
        });
    },

    beautify: function () {
        this._beautify.beautify(this._editor.session);
    },

    insert: function (text) {
        this._editor.insert(text);
    },

    insertSnippetHtml: function () {
        const me = this;
        MDocs.DataAccess.getTextResourceAsync("snippets/html.html")
            .then(function (text) {
                me.insert(text);
            });
    },

    insertSnippetBootstrap: function () {
        const me = this;
        MDocs.DataAccess.getTextResourceAsync("snippets/bootstrap.html")
            .then(function (text) {
                me.insert(text);
            });
    }
});
