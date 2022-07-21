Ext.define('FHIRata.view.SettingsDialogController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.settingsdialog',

    onCommandOK: function () {
        const view = this.getView();
        view.fireEvent("ok", view);
    },

    onCommandCancel: function () {
        const view = this.getView();
        view.fireEvent("cancel", view);
    }
});
