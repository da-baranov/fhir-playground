/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'FHIRata.Application',

    name: 'FHIRata',

    requires: [
        // This will automatically load all classes in the FHIRata namespace
        // so that application classes do not need to require each other.
        'FHIRata.*'
    ],

    // The name of the initial view to create.
    mainView: 'FHIRata.view.main.Main'
});
