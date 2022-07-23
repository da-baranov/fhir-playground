Ext.define('FHIRata.view.MappingsList',{
    extend: 'Ext.tab.Panel',

    alias: 'widget.mappingslist',

    // title: 'My FHIRata mappings',

    requires: [
        'FHIRata.view.MappingsListController',
        'FHIRata.view.MappingsListModel'
    ],

    controller: 'mappingslist',
    viewModel: {
        type: 'mappingslist'
    },

    listeners: {
        render: function (sender) {
            const map = new Ext.util.KeyMap({
                target: Ext.getBody(),
                binding: [{
                    key: "s",
                    ctrl: true,
                    defaultEventAction: "stopEvent",
                    handler: async function (keyCode, e) {
                        await sender.saveActiveDocument();
                        e.preventDefault();
                        return true;
                    }
                }]
            });
        }
    },

    items: [
        {
            title: 'Expressions catalog',
            layout: 'fit',
            items: [
                // Grid
                {
                    xtype: 'grid',
                    itemId: 'dgr',
                    tbar: [
                        {
                            text: 'Create',
                            tooltip: 'Creates an expression editor',
                            iconCls: 'fa fa-plus pg-orange',
                            handler: 'onCommandCreate'
                        },
                        {
                            text: 'Edit',
                            tooltip: 'Edit selected expression',
                            iconCls: 'fa fa-edit',
                            handler: 'onCommandEdit'
                        },
                        {
                            text: 'Delete',
                            tooltip: 'Delete selected expression',
                            iconCls: 'fa fa-trash',
                            handler: 'onCommandDelete'
                        },
                        {
                            text: 'Refresh',
                            tooltip: 'Refresh list',
                            iconCls: 'fa fa-refresh',
                            handler: 'onCommandRefresh'
                        }
                    ],
                    bind: {
                        store: '{dataset}',
                        selection: '{row}'
                    },
                    columns: [
                        {
                            text: 'Mapping name',
                            flex: 2,
                            dataIndex: 'name'
                        },
                        {
                            text: 'Expression',
                            flex: 2,
                            dataIndex: 'expression'
                        },
                        {
                            text: 'FHIR server',
                            flex: 2,
                            dataIndex: 'server'
                        },
                        {
                            text: 'Author',
                            flex: 1,
                            dataIndex: 'userName'
                        },
                        {
                            xtype: 'datecolumn',
                            text: 'Created',
                            flex: 1,
                            dataIndex: 'createDate',
                            format: 'd.m.Y'
                            
                        }
                    ],
                    bbar: {
                        xtype: 'pagingtoolbar',
                        displayInfo: true
                    },
                    listeners: {
                        render: function (sender) {

                        }
                    }
                }
            ]
        }
    ],

    initComponent: function () {
        this.callParent(arguments);
        const controller = this.getController();
        Ext.on("logon", function () {
            controller.refreshView();
        });
        Ext.on("logoff", function () {
            controller.refreshView();
        });
    },

    saveActiveDocument: async function () {
        const activeTab = this.getActiveTab();
        if (activeTab instanceof FHIRata.view.PlaygroundView) {
            await activeTab.getController().onCommandSave();
        }
    }
});
