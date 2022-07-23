Ext.application({
    extend: 'FHIRata.Application',
    requires: [
        'FHIRata.view.Viewport',
        'FHIRata.Util'
    ],
    name: 'FHIRata',
    mainView: 'FHIRata.view.Viewport',

    user: undefined,

    launch: function () {

        Ext.tip.QuickTipManager.init();

        Ext.state.Manager.setProvider(Ext.create("Ext.state.LocalStorageProvider"));
        Ext.Ajax.timeout = 120000;
        Ext.Ajax.useDefaultXhrHeader = false;
        Ext.Ajax.cors = true;

        // Global Ext error handler
        Ext.Error.handle = function (err) {
            try {
                FHIRata.Util.errorMessageBox(err);
                console.log(err);
            } catch (e) {
                console.error(err);
            }
        };

        // Global window error handler
        window.addEventListener("error", function (event) {
            if (!extReady) {
                alert(event.message);
                console.log(event);
            } else {
                FHIRata.Util.errorMessageBox(event);
                console.log(event);
            }
        });

        console.log("Started");

        var el = document.getElementById("loading-overlay");
        if (el) el.remove();
    }
});
