Ext.define('FHIRata.view.PlaygroundViewModel', {
    requires: [
        'FHIRata.Util'
    ],
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.playgroundview',
    data: {
        name: 'FHIRata',
        url: '/api/fhirata',
        user: {
            isAuthenticated: false,
            email: undefined
        }
    },

    stores: {
        urls: {
            fields: ['value'],
            data: [
                { value: '/api/fhirata' }
            ]
        }
    },

    constructor: function (config) {
        this.callParent(arguments);
        this.loadSession();
    },

    loadSession: function () {
        const me = this;
        FHIRata
            .Util
            .getSessionInfo()
            .then(function (data) {
                me.set("user", data);
            })
            .catch(function (e) {
                alert(e);
            });
    }
});
