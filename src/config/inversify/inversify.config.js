"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var inversify_1 = require("inversify");
var serviceIdentifiers_1 = __importDefault(require("./serviceIdentifiers"));
var userServiceImpl_1 = __importDefault(require("../../services/impl/userServiceImpl"));
/**
 * Class that holds the configuration of the Inversify container.
 *
 * This should be the only place in the application where there is some coupling.
 */
var InversifyConfig = /** @class */ (function () {
    function InversifyConfig() {
        // XXX: 2019-03-11 Blockost Make all dependecies singletons
        this.container = new inversify_1.Container({ defaultScope: 'Singleton' });
    }
    InversifyConfig.prototype.getContainer = function () {
        return this.container;
    };
    /**
     * Defines binding between abstraction to concrete classes.
     */
    InversifyConfig.prototype.bind = function () {
        this.container.bind(serviceIdentifiers_1.default.UserService).to(userServiceImpl_1.default);
    };
    /**
     * Defines binding between abstraction to concrete classes that need to be
     * aynchronously instantiated.
     */
    InversifyConfig.prototype.bindAsync = function () {
        return Promise.resolve();
    };
    return InversifyConfig;
}());
exports.default = InversifyConfig;
