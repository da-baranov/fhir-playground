Ext.define('FHIRata.view.PlaygroundViewModel', {
    requires: [
        'FHIRata.Util'
    ],
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.playgroundview',
    data: {
        file: {}
    },

    formulas: {
        title: function (get) {
            const fileName = get('file.name');
            return fileName && fileName.length ? fileName : 'New document*';
        }
    },

    stores: {
        urls: {
            fields: ['value'],
            data: [
                { value: 'http://hapi-fhir.outburn.co.il/fhir' }
            ]
        }
    }
});
