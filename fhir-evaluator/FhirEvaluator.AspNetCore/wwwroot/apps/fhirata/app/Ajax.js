Ext.define("FHIRata.Ajax", {

    statics: {

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
            const response = await window.fetch(url, options);

            if (!response.ok) {
                const text = await response.text();
                throw new Error("Ajax GET call failed with code " + response.status + ". Server says: " + text);
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
            const response = await window.fetch(url, options);

            if (!response.ok) {
                const text = await response.text();
                throw new Error("Ajax GET call failed with code " + response.status + ". Server says: " + text);
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