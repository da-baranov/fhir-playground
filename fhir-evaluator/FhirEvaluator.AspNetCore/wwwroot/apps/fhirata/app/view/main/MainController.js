Ext.define('FHIRata.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    requires: [
        'FHIRata.Ajax',
        'FHIRata.Util',
        'FHIRata.view.LoginDialog',
        'FHIRata.view.SettingsDialog'
    ],

    alias: 'controller.main',

    onSessionLoad: function (sender, records, successful, operation) {
        let user = undefined;
        if (successful && records.length) {
            user = records[0];
        }
        this.getViewModel().set("user", user);
    },

    updateSession: function () {
        const store = this.getStore("session");
        store.reload();
    },

    onCommandLogout: async function () {
        const me = this;

        Ext.Msg.show({
            title: 'Question',
            message: 'Do you really want to exit?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: async function (btn) {
                if (btn === 'yes') {
                    try {
                        FHIRata.Ajax.setToken(undefined);

                        const response = await FHIRata.Ajax.post("/api/auth/logout");
                        if (!response.success) {
                            alert("Logout failed: " + response.message);
                        } else {
                            FHIRata.Ajax.setToken(undefined);
                            Ext.fireEvent("logoff");
                            me.updateSession();
                        }
                    }
                    catch (e) {
                        alert(e + " " + e.message);
                    }
                    finally {
                    }
                }
            }
        });
    },

    onCommandLogin: function () {
        const me = this;

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
                    Ext.fireEvent("logon");
                    sender.close();
                    me.updateSession();
                }
            }
            catch (e) {
                FHIRata.Util.errorMessageBox(e);
            }
            finally {
            }
        });
    },

    onCommandRegister: function () {
        const me = this;

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
                    me.updateSession();
                }
            }
            catch (e) {
                FHIRata.Util.errorMessageBox(e);
            }
            finally {
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
    }
});
