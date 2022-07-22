Ext.define('FHIRata.model.Session', {
    extend: 'Ext.data.Model',

    idProperty: "_id",

    fields: [
        { name: '_id', type: "string" },
        { name: 'email', type: "auto" },
        { name: 'isAuthenticated', type: "boolean" }
    ],
});