"use strict";

var app = require("express")();
var proxy = require("express-http-proxy");

app.use("/proxy-live", proxy("https://remoteservices.tddirectinvesting.co.uk", {
    forwardPath: function(req, res) {
        return require("url").parse(req.url).path;
    },
    intercept: function(rsp, data, req, res, callback) {
        delete res._headers["www-authenticate"];
        delete res._headerNames["www-authenticate"];

        if (res._headers["set-cookie"]) {
            res._headers["set-cookie"][0] = res._headers["set-cookie"][0]
                .replace("; Secure", "")
                .replace("; HTTPOnly", "")
            ;
        }

        callback(null, data);
    }
}));

app.use("/proxy-preprod", proxy("https://pptdw.tdwh-test.co.uk", {
    forwardPath: function(req, res) {
        return require("url").parse(req.url).path;
    },
    intercept: function(rsp, data, req, res, callback) {
        delete res._headers["www-authenticate"];
        delete res._headerNames["www-authenticate"];

        if (res._headers["set-cookie"]) {
            res._headers["set-cookie"][0] = res._headers["set-cookie"][0]
                .replace("; Secure", "")
                .replace("; HTTPOnly", "")
            ;
        }

        callback(null, data);
    }
}));

app.use("/proxy-test", proxy("https://ev1tdw.tdwh-test.co.uk", {
    forwardPath: function(req, res) {
        return require("url").parse(req.url).path;
    },
    intercept: function(rsp, data, req, res, callback) {
        delete res._headers["www-authenticate"];
        delete res._headerNames["www-authenticate"];

        if (res._headers["set-cookie"]) {
            res._headers["set-cookie"][0] = res._headers["set-cookie"][0]
                .replace("; Secure", "")
                .replace("; HTTPOnly", "")
            ;
        }

        callback(null, data);
    }
}));

var server = app.listen(3000, function() {
    console.log("Listening at http://%s:%s", server.address().address, server.address().port);
});
