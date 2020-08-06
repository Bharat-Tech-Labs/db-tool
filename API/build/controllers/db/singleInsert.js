"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var connect_1 = require("./connect");
exports.default = (function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var key, body, data;
    return tslib_1.__generator(this, function (_a) {
        for (key in req.body) {
            body = JSON.parse(key);
        }
        res.writeHead(200, {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
        });
        data = [];
        data.push(body.data);
        res.statusCode = 200;
        connect_1.sequelize.authenticate().then(function () {
            try {
                var queryInterface = connect_1.sequelize.getQueryInterface();
                var result = queryInterface.bulkInsert(body.name, data);
                res.write("success");
            }
            catch (err) {
                res.write("error");
            }
            finally {
                res.end();
            }
        }).catch(function (err) {
            res.end("Connection Error");
        });
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=singleInsert.js.map