
Ext.define('FHIRata.view.SettingsDialog',{
    extend: 'Ext.window.Window',
    modal: true,
    title: 'Settings',
    width: 600,
    height: 450,

    requires: [
        'FHIRata.view.SettingsDialogController',
        'FHIRata.view.SettingsDialogModel'
    ],

    controller: 'settingsdialog',
    viewModel: {
        type: 'settingsdialog'
    },

    fbar: [
        {
            text: 'OK',
            handler: 'onCommandOK'
        },
        {
            text: 'Cancel',
            handler: 'onCommandCancel'
        }
    ]
});
