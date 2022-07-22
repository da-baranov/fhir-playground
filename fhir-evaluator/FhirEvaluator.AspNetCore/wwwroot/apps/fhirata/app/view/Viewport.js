Ext.define('FHIRata.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires: [
        'FHIRata.view.main.Main'
    ],
    alias: 'app-viewport',

    layout: 'border',
    items: [
        {
            xtype: 'app-main',
            region: 'center'
        }
    ]
});