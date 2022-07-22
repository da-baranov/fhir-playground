Ext.define('FHIRata.store.AjaxStore', {
    requires: [
        'FHIRata.Ajax',
        'FHIRata.Util'
    ],
    extend: 'Ext.data.Store',

    alias: 'store.ajax',

    silent: false,

    proxy: {
        type: 'ajax',
        reader: {
            type: 'json'
        }
    },

    constructor: function (config) {
        this.callParent(arguments);

        const proxy = this.getProxy();
        if (proxy) {
            if (config.url) {
                proxy.setUrl(config.url);
            } else if (this.url) {
                proxy.setUrl(this.url);
            }
        }

        this.on("beforeload", function (sender) {
            const token = FHIRata.Ajax.getToken();
            if (token) {
                let headers = proxy.getHeaders() || {};
                headers["Authorization"] = "Bearer " + token;
                proxy.setHeaders(headers);
            } else {
                proxy.setHeaders({});
            }
        });

        this.on("load", function (sender, records, success, op) {
            if (!success && !sender.silent) {
                FHIRata.Util.errorMessageBox(op);
            }
        });
    }
});
