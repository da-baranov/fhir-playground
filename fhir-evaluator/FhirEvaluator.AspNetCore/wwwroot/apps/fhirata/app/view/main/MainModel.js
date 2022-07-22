Ext.define('FHIRata.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'FHIRata.Util',
        'FHIRata.store.Session'
    ],

    alias: 'viewmodel.main',

    stores: {
        session: {
            type: 'session',
            storeId: 'storeSession',
            autoLoad: true,
            listeners: {
                load: "onSessionLoad"
            }
        }
    },
        

    data: {
        name: 'FHIRata',
        user: {}
    }
});
