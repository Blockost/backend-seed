"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var inversify_config_1 = __importDefault(require("./config/inversify/inversify.config"));
var inversify_express_utils_1 = require("inversify-express-utils");
// Import @controller here so that the classes are declared and the metadata are generated
require("./controllers/userController");
var PORT = 3000;
var inversionOfControlContainer = new inversify_config_1.default();
inversionOfControlContainer.bind();
inversionOfControlContainer
    .bindAsync()
    .then(function () {
    // When asynchronous bindings are done, start the application with the finalized container
    var server = new inversify_express_utils_1.InversifyExpressServer(inversionOfControlContainer.getContainer());
    server.setConfig(function (app) {
        app.use(body_parser_1.default.json());
        // Add CORS support, enable any origin (i.e Access-Control-Allow-Origin: *)
        app.use(cors_1.default());
    });
    // Build and start Express server
    var inversifyExpressApp = server.build();
    inversifyExpressApp.listen(PORT, function () { return console.log("Listening in port " + PORT); });
})
    .catch(function (error) {
    // XXX 2019-03-15 Blockost Logging to console because bindings failed so we don't
    // have access to LoggerService here
    console.error("Cannot start application. Reason: " + error);
});
