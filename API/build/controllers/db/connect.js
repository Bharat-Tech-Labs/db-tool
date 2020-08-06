"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
var tslib_1 = require("tslib");
var sequelize_1 = require("sequelize");
var pg_1 = tslib_1.__importDefault(require("pg"));
var sequelize;
exports.sequelize = sequelize;
exports.default = (function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var key, body;
    return tslib_1.__generator(this, function (_a) {
        console.log('connectok');
        res.statusCode = 200;
        res.writeHead(200, {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
        });
        for (key in req.body) {
            body = JSON.parse(key);
        }
        exports.sequelize = sequelize = new sequelize_1.Sequelize(body.dbname, body.userName, body.userPassword, {
            dialectModule: pg_1.default,
            pool: { idle: 5000000 },
            logging: false,
            dialect: 'postgres',
            host: body.host,
            port: body.port
        });
        sequelize.authenticate().then(function () {
            res.end("success");
        }).catch(function (err) {
            res.end("error");
        });
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=connect.js.map