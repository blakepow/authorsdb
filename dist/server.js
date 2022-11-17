"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv = require('dotenv').config();
var swagger_autogen_1 = __importDefault(require("swagger-autogen"));
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var swaggerDocument = require('./swagger_output.json');
var db_1 = __importDefault(require("./config/db"));
var app = (0, express_1.default)();
var port = process.env.PORT || 5000;
(0, db_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.get('/favicon.ico', function (req, res) { return res.status(204); });
app.use('/api-docs', swagger_ui_express_1.default.serve);
app.get('/api-docs', swagger_ui_express_1.default.setup(swaggerDocument));
app.use('/', require('./routes/authorsRoutes'));
var outputFile = "./swagger_output.json";
var endpointsFiles = ["./routes/authorsRoutes.ts"];
(0, swagger_autogen_1.default)(outputFile, endpointsFiles);
app.listen(port, function () {
    console.log("Server listening at " + port);
});
