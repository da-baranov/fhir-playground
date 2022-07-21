Ext.define('FHIRata.view.PlaygroundView',{
    extend: 'Ext.panel.Panel',
    alias: 'widget.playgroundview',

    requires: [
        'FHIRata.view.PlaygroundViewController',
        'FHIRata.view.PlaygroundViewModel',
        'FHIRata.component.CodeEditor',
        'FHIRata.view.SettingsDialog'
    ],

    controller: 'playgroundview',
    viewModel: {
        type: 'playgroundview'
    },

    layout: 'border',

    tbar: [
        {
            xtype: 'combobox',
            reference: 'cboUrl',
            itemId: 'cboUrl',
            fieldLabel: '  Service URL',
            displayField: 'value',
            valueField: 'value',
            bind: {
                value: '{url}',
                store: '{urls}'
            },
            minWidth: 500
        },
        {
            text: 'Go',
            handler: 'onCommandGo'
        },
        '->',
        {
            iconCls: 'fa fa-user',
            text: 'Register',
            handler: 'onCommandRegister',
            bind: {
                hidden: '{user.isAuthenticated}'
            }
        },
        {
            iconCls: 'fa fa-user',
            text: 'Login',
            handler: 'onCommandLogin',
            bind: {
                hidden: '{user.isAuthenticated}'
            }
        },
        {
            iconCls: 'fa fa-cogs',
            text: 'Settings',
            handler: 'onCommandSettings',
            bind: {
                text: 'Settings',
                hidden: '{!user.isAuthenticated}'
            }
        },
        {
            iconCls: 'fa fa-arrow-right',
            text: 'Logout',
            handler: 'onCommandLogout',
            bind: {
                text: 'Logout ({user.email})',
                hidden: '{!user.isAuthenticated}'
            }
        }
    ],

    items: [
        // Left panel
        {
            xtype: 'container',
            region: 'west',
            layout: 'border',
            width: '50%',
            split: true,
            items: [
                {
                    xtype: 'panel',
                    region: 'center',
                    title: 'JSON',
                    layout: 'border',
                    tbar: [
                        {
                            iconCls: 'fa fa-cloud-download',
                            text: 'Load...',
                            handler: 'onCommandLoad'
                        },
                        {
                            iconCls: 'fa fa-cloud-upload',
                            text: 'Save...',
                            handler: 'onCommandSave'
                        },
                        '-',
                        {
                            iconCls: 'fa fa-code',
                            text: ' Format',
                            handler: 'onCommandBeautify'
                        }
                    ],
                    items: [
                        {
                            xtype: 'codeeditor',
                            region: 'center',
                            reference: 'txtJson'
                        }
                    ]
                }
            ]
        },
        // Right panel
        {
            xtype: 'container',
            region: 'center',
            layout: 'border',
            items: [
                {
                    xtype: 'panel',
                    region: 'north',
                    layout: 'border',
                    height: '25%',
                    title: 'FHIRata expression',
                    tbar: [
                        {
                            iconCls: 'fa fa-chevron-right',
                            text: 'Evaluate',
                            handler: 'onCommandEvaluate'
                        }
                    ],
                    items: [
                        {
                            xtype: 'codeeditor',
                            region: 'center',
                            border: 0,
                            reference: 'txtExpression'
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    region: 'center',
                    layout: 'border',
                    title: 'Result',
                    items: [
                        {
                            xtype: 'codeeditor',
                            region: 'center',
                            border: 0,
                            reference: 'txtResult'
                        }
                    ]
                }
            ]
        }
    ]
});
