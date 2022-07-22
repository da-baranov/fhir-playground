Ext.define('FHIRata.Util', {
    requres: ['FHIRata.Ajax'],

    statics: {
        getSessionInfo: async function () {
            const result = await FHIRata.Ajax.get("/api/auth/session");
            return result;
        },

        confirmAsync: function (title, message) {
            return new Promise(function (resolve, reject) {
                Ext.Msg.confirm("Question", "Save changes?", function (btn) {
                    if (btn === "yes") {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                });
            });
        },

        errorMessageBox: function (e, userMessage) {
            const ex = this.extractError(e);
            Ext.Msg.show({
                title: 'Error',
                message: (userMessage ? userMessage + "<br /><br />" : "") + ex.message,
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            });
        },

        extractError: function (e) {
            // Undefined
            if (!e) {
                return new Error("Unexpected error");
            }

            // String
            if (typeof e === "string" || e instanceof String) {
                return new Error(e);
            }

            // Error
            if (e instanceof Error) {
                return e;
            }

            // ErrorEvent
            if (e instanceof ErrorEvent) {
                return e.error;
            }

            // XMLHTTPResponse?
            if (e.responseText) {
                try {
                    const data = JSON.parse(e.responseText);
                    if (data.message) {
                        return new Error(data.message);
                    }
                } catch (rex) {
                }
            }

            // Ext.Error
            if (e instanceof Ext.Error) {
                return new Error(`ExtJS error: ${e.toString()}`);
            }

            // Ext.form.action.Action
            if (e instanceof Ext.form.action.Action) {
                if (e.result && e.result.message) {
                    return new Error(e.result.message);
                }
            }

            // Ext.data.Batch
            if (e instanceof Ext.data.Batch) {
                const exceptions = e.getExceptions();
                if (exceptions.length !== 0) {
                    return this.extractError(exceptions[0]);
                }
            }

            // Ext.Operation
            if (e instanceof Ext.data.operation.Operation) {
                const error = e.getError();
                if (!error) {
                    return new Error(
                        "Unexpected error of type Operation (operation.error == null)"
                    );
                }
                if (error.response) {
                    const response = error.response;
                    if (response.responseJson) {
                        const result = new Error(response.responseJson.message);
                        result.stack = response.responseJson.stack;
                        return result;
                    }
                    if (response.responseText) {
                        return new Error(response.responseText);
                    }
                    if (response.statusText) {
                        return new Error(
                            response.statusText + " " + response.status
                        );
                    }
                    if (response.status) {
                        return new Error("HTTP Error " + response.status);
                    }
                    return new Error(
                        "Unexpected error of type Operation (error.response.responseJson == null, error.response.responseText == null)"
                    );
                } else {
                    return new Error(
                        "Unexpected error of type Operation (error.response == null)"
                    );
                }
            }

            // Something else with a known property @message
            var err;
            if (e.message) {
                err = new Error(e.message);
                err.stack = e.stack || e.stackTrace;
                return err;
            }

            // Something else with a known property @message
            if (e.msg) {
                err = new Error(e.msg);
                return err;
            }

            return new Error("Unknown error");
        },

        toast: function (message) {
            Ext.toast({
                html: message,
                title: "Information",
                width: 300,
                align: "br",
                glyph: "f05a@FontAwesome",
                bodyStyle: {
                    background: "#FFFFFF"
                }
            });
        },
    }
});