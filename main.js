"use strict";

var app = require("express")();
var proxy = require("express-http-proxy");

app.use("/proxy", proxy("https://remoteservices.tddirectinvesting.co.uk", {
    forwardPath: function(req, res) {
        return require("url").parse(req.url).path;
    },
    intercept: function(rsp, data, req, res, callback) {
        delete res._headers["www-authenticate"];
        delete res._headerNames["www-authenticate"];

        data = JSON.parse(data.toString('utf8'));
        callback(null, JSON.stringify(data));
    }
}));

var server = app.listen(3000, function() {
    console.log("Listening at http://%s:%s", server.address().address, server.address().port);
});
