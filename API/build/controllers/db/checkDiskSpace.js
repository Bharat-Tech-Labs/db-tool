"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ssh2 = require('ssh2');
exports.default = (function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var key, body, privateKey, conn;
    return tslib_1.__generator(this, function (_a) {
        console.log('checkDdgfhiskSpace');
        res.statusCode = 200;
        res.writeHead(200, {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
        });
        for (key in req.body) {
            body = JSON.parse(key);
        }
        if (body.sshPassword === '') {
            privateKey = require('fs').readFileSync(body.sshKey);
        }
        conn = new ssh2.Client();
        console.log(conn);
        conn.on('ready', function () {
            // console.log('Client :: ready');
            conn.exec('df -h', function (err, stream) {
                // console.log(stream);
                if (err)
                    throw err;
                var resData = "";
                stream.on('close', function (code, signal) {
                    res.end(resData);
                    // console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
                    conn.end();
                }).on('data', function (data) {
                    resData += data;
                    // console.log('STDOUT: ' + data);
                    // res.write(data);
                }).stderr.on('data', function (data) {
                    console.log('STDERR: ' + data);
                });
            });
        }).on('error', function (err) {
            console.log("Connection not Established");
            res.end(err);
        }).connect({
            host: body.sshHost,
            port: body.sshPort,
            username: body.sshUser,
            privateKey: privateKey,
            password: body.sshPassword
        });
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=checkDiskSpace.js.map