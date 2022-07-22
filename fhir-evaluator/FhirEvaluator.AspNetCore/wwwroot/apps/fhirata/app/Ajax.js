Ext.define("FHIRata.Ajax", {

    requires: [
        "FHIRata.Util"
    ],

    statics: {

        toJson: function (str) {
            try {
                return JSON.parse(str);
            }
            catch (ex) {
                return undefined;
            }
        },

        apiUrl: function (url) {
            url = url ? url : "";

            let base_url = window.EXT_BASE_PATH;
            if (!base_url) base_url = "/";
            if (!base_url.endsWith("/")) base_url += "/";

            if (url.startsWith("/")) url = url.substr(1, url.length - 1);
            return base_url + url;
        },

        get: async function (url) {
            const options = {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "GET"
            };
            const token = this.getToken();
            if (token) {
                options.headers["Authorization"] = "Bearer " + token;
            }
            const response = await window.fetch(this.apiUrl(url), options);

            if (!response.ok) {
                const text = await response.text();
                const json = this.toJson(text);
                if (json) {
                    const jerr = FHIRata.Util.extractError(json);
                    throw jerr;
                }
                else {
                    throw new Error("Ajax GET call failed with code " + response.status + ". Server says: " + text);
                }
            }
            return await response.json();
        },

        post: async function (url, data) {
            const options = {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST"
            };
            if (data) {
                options.body = JSON.stringify(data);
            }
            const token = this.getToken();
            if (token) {
                options.headers["Authorization"] = "Bearer " + token;
            }
            const response = await window.fetch(this.apiUrl(url), options);

            if (!response.ok) {
                const text = await response.text();
                const json = this.toJson(text);
                if (json) {
                    const jerr = FHIRata.Util.extractError(json);
                    throw jerr;
                }
                else {
                    throw new Error("Ajax POST call failed with code " + response.status + ". Server says: " + text);
                }
            }
            return await response.json();
        },

        put: async function (url, data) {
            const options = {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST"
            };
            if (data) {
                options.body = JSON.stringify(data);
            }
            const token = this.getToken();
            if (token) {
                options.headers["Authorization"] = "Bearer " + token;
            }
            const response = await window.fetch(this.apiUrl(url), options);

            if (!response.ok) {
                const text = await response.text();
                const json = this.toJson(text);
                if (json) {
                    const jerr = FHIRata.Util.extractError(json);
                    throw jerr;
                }
                else {
                    throw new Error("Ajax PUT call failed with code " + response.status + ". Server says: " + text);
                }
            }
            return await response.json();
        },

        delete: async function (url, data) {
            const options = {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "DELETE"
            };
            if (data) {
                options.body = JSON.stringify(data);
            }
            const token = this.getToken();
            if (token) {
                options.headers["Authorization"] = "Bearer " + token;
            }
            const response = await window.fetch(this.apiUrl(url), options);

            if (!response.ok) {
                const text = await response.text();
                const json = this.toJson(text);
                if (json) {
                    const jerr = FHIRata.Util.extractError(json);
                    throw jerr;
                }
                else {
                    throw new Error("Ajax DELETE call failed with code " + response.status + ". Server says: " + text);
                }
            }
            return await response.json();
        },

        getToken: function () {
            return localStorage.getItem("jwt.token");
        },

        setToken: function (token) {
            if (!token) {
                localStorage.removeItem("jwt.token");
            } else {
                localStorage.setItem("jwt.token", token);
            }
        }
    }
});