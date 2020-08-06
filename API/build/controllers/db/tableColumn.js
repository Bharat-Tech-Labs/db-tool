"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var connect_1 = require("./connect");
exports.default = (function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        console.log('tableColumn');
        res.writeHead(200, {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
        });
        res.statusCode = 200;
        connect_1.sequelize.authenticate().then(function () {
            var key;
            var tableName;
            for (key in req.body) {
                tableName = JSON.parse(key);
            }
            var query = "SELECT column_name FROM information_schema.columns WHERE TABLE_NAME = '" + tableName + "';";
            connect_1.sequelize.query(query, { type: connect_1.sequelize.QueryTypes.SELECT })
                .then(function (columns) {
                res.write(JSON.stringify(columns));
                res.end();
            });
        }).catch(function (err) {
            res.end("Connection Error");
        });
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=tableColumn.js.map