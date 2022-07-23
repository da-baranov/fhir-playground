Ext.define('FHIRata.model.Mapping', {
    extend: 'Ext.data.Model',

    idProperty: "_id",

    fields: [
        { name: '_id', type: "string" },
        { name: 'id', type: "auto" },
        { name: 'name', type: "string" },
        { name: 'userName', type: "string" },
        { name: "json", type: "string" },
        { name: "expression", type: "string" },
        { name: "result", type: "string" },
        { name: "server", type: "string" },
        { name: "codeMappings", type: "string" },
        { name: "createDate", type: "date", dateFormat: "c" }
    ],
});