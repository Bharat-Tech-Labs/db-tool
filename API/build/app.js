"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var bodyParser = require('body-parser');
var express = require('express');
var db_js_1 = tslib_1.__importDefault(require("./routes/db.js"));
var app = express();
app.use(bodyParser.urlencoded({ limit: '500mb', extended: false, parameterLimit: 1000000 }));
app.use('/', db_js_1.default);
app.listen(8082, 'localhost');
//# sourceMappingURL=app.js.map