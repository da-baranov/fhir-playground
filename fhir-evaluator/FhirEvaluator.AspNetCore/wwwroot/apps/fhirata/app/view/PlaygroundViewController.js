Ext.define('FHIRata.view.PlaygroundViewController', {
    extend: 'Ext.app.ViewController',

    requires: [
        'FHIRata.view.SettingsDialog',
        'FHIRata.view.LoginDialog',
        'FHIRata.Ajax'
    ],

    alias: 'controller.playgroundview',

    onCommandBeautify: function () {
        const editor = this.lookup("txtJson");
        if (editor) editor.beautify();
    },

    onCommandEvaluate: function () {
        alert("Evaluate");
    },

    onCommandGo: function () {
        const url = this.getViewModel().get("url");
        if (!url) {
            return;
        }
        this.doConnect(url);
    },

    onCommandLogout: async function () {
        const me = this;
        const viewModel = me.getViewModel();

        Ext.Msg.show({
            title: 'Question',
            message: 'Do you really want to exit?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: async function(btn) {
                if (btn === 'yes') {
                    try {
                        FHIRata.Ajax.setToken(undefined);

                        const response = await FHIRata.Ajax.post("/api/auth/logout");
                        if (!response.success) {
                            alert("Logout failed: " + response.message);
                        } else {
                            FHIRata.Ajax.setToken(undefined);
                        }
                    }
                    catch (e) {
                        alert(e + " " + e.message);
                    }
                    finally {
                        viewModel.loadSession();
                    }
                }
            }
        });
    },

    onCommandLogin: function () {
        const me = this;
        const viewModel = me.getViewModel();

        const dialog = new FHIRata.view.LoginDialog();
        dialog.setTitle("FHIRata login");
        dialog.down("#cmdOK").setText("Login");
        dialog.show();
        dialog.on("ok", async function (sender, data) {
            try {
                const response = await FHIRata.Ajax.post("/api/auth/login", data);
                if (!response.success) {
                    alert("Login failed: " + response.message);
                } else {
                    FHIRata.Ajax.setToken(response.token);
                    sender.close();
                }
            }
            catch (e) {
                alert(e + " " + e.message);
            }
            finally {
                viewModel.loadSession();
            }
        });
    },

    onCommandRegister: function () {
        const me = this;
        const viewModel = me.getViewModel();

        const dialog = new FHIRata.view.LoginDialog();
        dialog.setTitle("FHIRata registration");
        dialog.down("#cmdOK").setText("Register");
        dialog.on("ok", async function (sender, data) {
            try {
                const response = await FHIRata.Ajax.post("/api/auth/register", data);

                if (!response.success) {
                    alert("Registration failed: " + response.message);
                } else {
                    FHIRata.Ajax.setToken(response.token);
                    sender.close();
                }
            }
            catch (e) {
                alert(e + " " + e.message);
            }
            finally {
                viewModel.loadSession();
            }
        });
        dialog.show();
    },

    onCommandSettings: function () {
        const dialog = new FHIRata.view.SettingsDialog();
        dialog.on("ok", function (sender) {
            sender.close();
        });
        dialog.on("cancel", function (sender) {
            sender.close();
        });
        dialog.show();
    },

    doConnect: function (url) {
        if (!url) return;

        const store = this.getStore("urls");
        const item = store.findRecord("value", url);
        if (!item) {
            store.add({ value: url });
        }
        this.getViewModel().set("url", url);
    }
});
