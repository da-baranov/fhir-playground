Ext.define('FHIRata.view.MappingsListController', {
    extend: 'Ext.app.ViewController',
    requires: [
        'FHIRata.view.PlaygroundView',
        'FHIRata.Ajax',
        'FHIRata.Util'
    ],
    alias: 'controller.mappingslist',

    control: {
        '#dgr': {
            rowdblclick: function () {
                this.onCommandEdit();
            }
        }
    },

    onCommandCreate: function () {
        const view = this.getView();
        const me = this;

        const tab = new FHIRata.view.PlaygroundView({ closable: true });
        tab.createFile();
        view.add(tab);
        view.setActiveTab(tab);

        tab.on("saved", function () {
            me.refreshView();
        });
    },

    onCommandEdit: function () {
        const row = this.getViewModel().get("row");
        if (!row) return;
        const aid = row.get("id");

        const view = this.getView();
        const me = this;

        let tabFound = false;
        view.items.each(function (item) {
            if (item instanceof FHIRata.view.PlaygroundView) {
                const bid = item.getViewModel().get("file.id");
                if (aid === bid) {
                    view.setActiveTab(item);
                    tabFound = true;
                    return;
                }
            }
        });

        if (tabFound) return;

        const tab = new FHIRata.view.PlaygroundView({ closable: true });
        tab.getViewModel().set("file", row.clone());
        view.add(tab);
        view.setActiveTab(tab);

        tab.on("saved", function () {
            me.refreshView();
        });
    },

    onCommandDelete: function () {
        const me = this;
        const row = this.getViewModel().get("row");
        if (row) {
            Ext.Msg.confirm("Question", "Delete?", async function (button) {
                if (button == "yes") {
                    try {
                        const id = row.get("id");
                        const response = await FHIRata.Ajax.delete("/api/fhirata/mapping", id);
                        me.refreshView();
                    }
                    catch (e) {
                        FHIRata.Util.errorMessageBox(e);
                    }
                }
            });
        }
    },

    onCommandRefresh: function () {
        this.refreshView();
    },

    refreshView: function () {
        const store = this.getStore("dataset");
        store.reload();
    }

});
