Ext.define('FHIRata.view.PlaygroundViewController', {
    extend: 'Ext.app.ViewController',

    requires: [
        'FHIRata.Ajax',
        'FHIRata.Util'
    ],

    alias: 'controller.playgroundview',

    _forceClose: false,

    control: {
        "#": {
            beforeclose: function () {
                return this.handleClosing();
            }
        }
    },

    onCommandBeautify: function () {
        const editor = this.lookup("txtJson");
        if (editor) editor.beautify();
    },

    onCommandEvaluate: async function () {
        const viewModel = this.getViewModel();
        const model = viewModel.get("file");
        const data = model.data;

        try {
            const response = await FHIRata.Ajax.post("/api/fhirata/evaluate", data);
            const result = response.result;
            model.set("result", result);
        }
        catch (e) {
            model.set("result", e.message);
        }
    },

    onCommandGo: function () {
        const url = this.getViewModel().get("url");
        if (!url) {
            return;
        }
        this.doConnect(url);
    },

    onCommandInsertTemplate: async function (sender) {
        try {
            const model = this.getViewModel().get("file");
            const url = window.EXT_BASE_PATH + "snippets/" + sender.text + ".json";
            const response = await window.fetch(url);
            const text = await response.text();
            model.set("json", text);
        }
        catch (e) {
            FHIRata.Util.errorMessageBox(e);
        }
    },

    onCommandSave: async function () {
        const view = this.getView();
        const viewModel = this.getViewModel();

        view.mask("Saving data...");
        try {
            const model = viewModel.get("file");
            const response = await FHIRata.Ajax.post("/api/fhirata/mapping", model.data);
            const id = response.id;
            viewModel.set("file.id", id);
            view.unmask();
            view.fireEvent("saved");
            FHIRata.Util.toast('Saved');
            model.dirty = false;
        }
        catch (e) {
            view.unmask();
            FHIRata.Util.errorMessageBox(e, "Save failed.");
        }
    },

    doConnect: function (url) {
        if (!url) return;

        const store = this.getStore("urls");
        const item = store.findRecord("value", url);
        if (!item) {
            store.add({ value: url });
        }
        this.getViewModel().set("url", url);
    },

    handleClosing: function () {
        const me = this;
        const view = this.getView();
        const viewModel = this.getViewModel();
        const model = viewModel.get("file");

        if (view.closeMe) {
            view.closeMe = false;
            return true;
        }

        if (me._forceClose) {
            view.closeMe = true;
            view.close();
        }
        else {
            if (model.dirty) {
                Ext.Msg.show({
                    title: "Question",
                    message: "You are closing a tab that has unsaved changes. Do you want to save changes?",
                    buttons: Ext.Msg.YESNOCANCEL,
                    icon: Ext.Msg.QUESTION,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            me.onCommandSave().then(function () {
                                view.closeMe = true;
                                view.close();
                            });
                        } else if (btn === 'no') {
                            view.closeMe = true;
                            view.close();
                        } else {
                            view.closeMe = false;
                        }
                    }
                });
            } else {
                view.closeMe = true;
                view.close();
            }
        }
        return false;
    }
});
