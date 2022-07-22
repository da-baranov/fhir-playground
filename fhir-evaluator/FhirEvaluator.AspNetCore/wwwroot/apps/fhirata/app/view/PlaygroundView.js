Ext.define('FHIRata.view.PlaygroundView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.playgroundview',

    requires: [
        'FHIRata.view.PlaygroundViewController',
        'FHIRata.view.PlaygroundViewModel',
        'FHIRata.component.CodeEditor',
        'FHIRata.model.Mapping'
    ],

    controller: 'playgroundview',
    viewModel: {
        type: 'playgroundview'
    },

    layout: 'border',

    bind: {
        title: "{title}"
    },

    defaultFocus: '#txtName',

    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    iconCls: 'fa fa-save',
                    text: 'Save',
                    tooltip: 'Save (Ctrl+S)',
                    handler: 'onCommandSave'
                },
                '-',
                {
                    iconCls: 'fa fa-code',
                    text: ' Format',
                    tooltip: 'Format selected JSON',
                    handler: 'onCommandBeautify'
                },
                '-',
                {
                    iconCls: 'fa fa-chevron-right',
                    text: 'Evaluate',
                    tooltip: 'Evaluate expression (Ctrl+E)',
                    handler: 'onCommandEvaluate'
                }
            ]
        },
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'label',
                    text: 'Properties',
                    style: {
                        fontWeight: 'bold'
                    }
                },
                {
                    xtype: 'tbspacer',
                    width: 30
                },
                {
                    xtype: "textfield",
                    fieldLabel: "Name",
                    itemId: "txtName",
                    labelWidth: 35,
                    allowBlank: false,
                    bind: {
                        value: "{file.name}"
                    }
                },
                {
                    xtype: 'tbspacer',
                    width: 10
                },
                /*
                {
                    xtype: 'combobox',
                    reference: 'cboUrl',
                    itemId: 'cboUrl',
                    fieldLabel: '  Service URL',
                    labelWidth: 70,
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
                }
                */
            ]
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
                    items: [
                        {
                            xtype: 'codeeditor',
                            region: 'center',
                            reference: 'txtJson',
                            bind: {
                                value: "{file.json}"
                            }
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
                    items: [
                        {
                            xtype: 'codeeditor',
                            region: 'center',
                            border: 0,
                            reference: 'txtExpression',
                            bind: {
                                value: "{file.expression}"
                            }
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
                            reference: 'txtResult',
                            bind: {
                                value: "{file.result}"
                            }
                        }
                    ]
                }
            ]
        }
    ],

    createFile: function () {
        const file = Ext.create('FHIRata.model.Mapping', {
            id: undefined,
            name: undefined,
            json: '{ "hello" : "world" }',
            expression: "$string()"
        });
        this.getViewModel().set("file", file);
    }
});
