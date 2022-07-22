
Ext.define('FHIRata.view.LoginDialog',{
    extend: 'Ext.window.Window',
    modal: true,
    width: 400,
    height: 200,
    title: 'FHIRata Logon',

    requires: [
        'FHIRata.view.LoginDialogController',
        'FHIRata.view.LoginDialogModel'
    ],

    controller: 'logindialog',
    viewModel: {
        type: 'logindialog'
    },

    layout: "border",
    bodyPadding: 10,

    defaultFocus: '#txtEmail',

    items: [
        {
            xtype: "fieldset",
            region: "center",
            layout: {
                type: "vbox",
                align: "stretch",
                pack: "start"
            },
            padding: 10,
            defaults: {
                labelWidth: 200,
                width: 200
            },
            items: [
                {
                    xtype: "textfield",
                    fieldLabel: "Email",
                    itemId: "txtEmail",
                    name: "email",
                    bind: "{email}",
                    allowBlank: false
                },
                {
                    xtype: "textfield",
                    inputType: "password",
                    fieldLabel: "Password",
                    name: "password",
                    bind: "{password}",
                    allowBlank: false
                },
                {
                    xtype: "label",
                    html: "Warning! This a demo web application. Don't enter logins and passwords which you use elsewere"
                }
            ]
        }
    ],

    fbar: [
        {
            text: 'OK',
            itemId: 'cmdOK',
            width: 90,
            handler: function () {
                const window = this.up('window');
                const data = window.getViewModel().getData();
                window.fireEvent('ok', window, data);
            }
        },
        {
            text: 'Cancel',
            handler: function () {
                this.up('window').close();
            }
        }
    ]
});
