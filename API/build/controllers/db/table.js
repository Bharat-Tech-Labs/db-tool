"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var connect_1 = require("./connect");
exports.default = (function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        console.log('table');
        res.writeHead(200, {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
        });
        res.statusCode = 200;
        connect_1.sequelize.authenticate().then(function () {
            var query = "SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE';";
            connect_1.sequelize.query(query, { type: connect_1.sequelize.QueryTypes.SELECT })
                .then(function (table) {
                res.end(JSON.stringify(table));
            });
        }).catch(function (err) {
            res.end("Connection Error");
        });
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=table.js.map