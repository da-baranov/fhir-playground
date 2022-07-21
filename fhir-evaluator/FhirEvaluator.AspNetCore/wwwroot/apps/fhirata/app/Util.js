Ext.define('FHIRata.Util', {
    requres: ['FHIRata.Ajax'],

    statics: {
        getSessionInfo: async function () {
            const result = await FHIRata.Ajax.get("/api/auth/session");
            return result;
        }
    }
});