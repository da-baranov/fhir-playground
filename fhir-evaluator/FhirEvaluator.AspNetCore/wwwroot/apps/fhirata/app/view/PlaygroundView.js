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
        // Toolbar 1
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
                    iconCls: 'fa-regular fa-file-code',
                    text: 'Insert JSON template',
                    tooltip: 'Inserts JSON template',
                    menu: [
                        {
                            text: 'Example 1',
                            handler: 'onCommandInsertTemplate'
                        },
                        {
                            text: 'Example 2',
                            handler: 'onCommandInsertTemplate',
                        },
                        {
                            text: 'Example 3',
                            handler: 'onCommandInsertTemplate'
                        }
                    ]
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
                    iconCls: 'fa fa-chevron-right pg-green',
                    text: 'Evaluate',
                    tooltip: 'Evaluate expression (Ctrl+E)',
                    handler: 'onCommandEvaluate'
                }
            ]
        },
        // Toolbar 2
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
                {
                    xtype: 'combobox',
                    reference: 'cboUrl',
                    itemId: 'cboUrl',
                    fieldLabel: ' FHIR Server',
                    labelWidth: 70,
                    displayField: 'value',
                    valueField: 'value',
                    bind: {
                        value: '{file.server}',
                        store: '{urls}'
                    },
                    minWidth: 500
                }
            ]
        }
    ],


    items: [
        {
            xtype: 'tabpanel',
            region: 'center',
            tabPosition: 'left',
            items: [

                // EXPRESSION EDITOR TAB
                {
                    title: 'Expression editor',
                    layout: 'border',
                    items: [
                        // Left panel - JSON EDITOR
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
                        // Right panel - CONTAINER FOR
                        {
                            xtype: 'container',
                            region: 'center',
                            layout: 'border',
                            items: [
                                // EXPRESSION EDITOR
                                {
                                    xtype: 'panel',
                                    region: 'north',
                                    layout: 'border',
                                    height: '25%',
                                    title: 'FHIRata expression',
                                    split: 'true',
                                    items: [
                                        {
                                            xtype: 'codeeditor',
                                            region: 'center',
                                            border: 0,
                                            reference: 'txtExpression',
                                            mode: "xquery",
                                            bind: {
                                                value: "{file.expression}"
                                            }
                                        }
                                    ]
                                },

                                // RESULTS VIEW
                                {
                                    xtype: 'panel',
                                    region: 'center',
                                    layout: 'border',
                                    title: 'Result',
                                    split: 'true',
                                    items: [
                                        {
                                            xtype: 'codeeditor',
                                            region: 'center',
                                            border: 0,
                                            reference: 'txtResult',
                                            mode: "text",
                                            bind: {
                                                value: "{file.result}"
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },

                // CODE MAPPINGS TAB
                {
                    title: 'Code mappings',
                    layout: 'border',
                    items: [
                        {
                            xtype: 'panel',
                            region: 'center',
                            title: 'Custom code mappings (plain text, XML, JSON)',
                            layout: 'border',
                            items: [
                                {
                                    xtype: 'codeeditor',
                                    region: 'center',
                                    border: 0,
                                    reference: 'txtCodeMappings',
                                    mode: "text",
                                    bind: {
                                        value: "{file.codeMappings}"
                                    }
                                }
                            ]
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
