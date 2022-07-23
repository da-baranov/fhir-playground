Ext.define('FHIRata.view.MappingsListModel', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'FHIRata.Ajax',
        'FHIRata.store.AjaxStore',
        'FHIRata.model.Mapping'
    ],
    alias: 'viewmodel.mappingslist',
    data: {
        row: undefined
    },

    stores: {
        dataset: {
            type: 'ajax',
            rootProperty: 'data',
            url: FHIRata.Ajax.apiUrl('/api/fhirata/mapping'),
            model: 'FHIRata.model.Mapping',
            autoLoad: true,
            listeners: {
                load: 'onLoad'
            }
        }
    }
});
