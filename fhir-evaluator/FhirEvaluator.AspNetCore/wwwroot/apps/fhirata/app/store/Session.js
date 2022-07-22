Ext.define('FHIRata.store.Session', {
    requires: [
        'FHIRata.Ajax',
        'FHIRata.Util',
        'FHIRata.model.Session'
    ],
    extend: 'FHIRata.store.AjaxStore',
    alias: 'store.session',
    model: 'FHIRata.model.Session',
    url: FHIRata.Ajax.apiUrl("/api/auth/session")
});