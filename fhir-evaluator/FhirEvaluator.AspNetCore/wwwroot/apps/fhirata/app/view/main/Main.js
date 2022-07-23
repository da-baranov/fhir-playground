Ext.define('FHIRata.view.main.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.window.MessageBox',
        'FHIRata.view.main.MainController',
        'FHIRata.view.main.MainModel',
        'FHIRata.view.MappingsList'
    ],

    controller: 'main',
    viewModel: 'main',
    layout: 'fit',

    tbar: [
        {
            xtype: 'tbspacer',
            width: 10
        },
        {
            xtype: 'image',
            height: 37,
            width: 119,
            // src: 'https://fhir.org/assets/images/HL7_FHIR-stacked_1_0_0.png'
            src: 'https://outburn.co.il/wp-content/uploads/2022/01/logo_outburn.png'
        },
        {
            xtype: 'tbspacer',
            width: 20
        },
        {
            xtype: 'label',
            html: '<b>FHIRata expressions testing tool</b>'
        },
        '->',
        {
            text: 'Swagger',
            iconCls: 'fa fa-code',
            handler: function () {
                window.open(
                    window.EXT_BASE_PATH.endsWith("/") ?
                        window.EXT_BASE_PATH + "swagger" :
                        window.EXT_BASE_PATH + "/swagger", "_blank");
            }
        },
        '-',
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
        {
            xtype: 'mappingslist',
            bind: {
                hidden: "{user && !user.isAuthenticated}"
            }
        },
        {
            xtype: 'container',
            html:
                '<div style="padding:30px">' +
                '<h2>FHIR in Israel</h2>' +
                '<p>The history of HL7’s Fast Healthcare Interoperability Resources (FHIR) standard implementation in Israel begun around 2018, where Israel’s second largest Health Maintenance Organization (HMO), Maccabi Health Care Services, has announced it would start using FHIR resources as the basis for its new Operational Data Hub (ODH) data model. This can be considered as an implementation of FHIR’s “Persistent Store” exchange mechanism.</p>' +
                '<p>The director of Maccabi’s medical division at the time was Professor Nachman Ash(Today the Director General of the Ministry of Health Israel), who believed medical data standardization & interoperability would greatly benefit Maccabi specifically, and the entire Israeli healthcare system in general.</p>' +
                '</div>',
            bind: {
                hidden: "{user && user.isAuthenticated}"
            }
        }
    ]
});
