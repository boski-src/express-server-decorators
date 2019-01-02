"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var express = require("express");
var cors = require("cors");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var responseTime = require("response-time");
var decorators_1 = require("./decorators");
var ExpressApp = /** @class */ (function () {
    function ExpressApp(config, mainPath, logError) {
        if (mainPath === void 0) { mainPath = ''; }
        this.config = config;
        this.mainPath = mainPath;
        this.logError = logError;
        this.app = express();
        this.server = http.createServer(this.app);
        this.init();
    }
    ExpressApp.prototype.defaultConfig = function () {
        this.app
            .disable('x-powered-by')
            .disable('views')
            .disable('view cache')
            .disable('view engine')
            .use(cors())
            .use(morgan('dev'))
            .use(bodyParser.json())
            .use(bodyParser.urlencoded({ limit: '20mb', extended: true }))
            .use(responseTime());
    };
    ExpressApp.prototype.run = function (port) {
        var server = this.server.listen(port);
        server.timeout = 1000 * 60 * 3;
        return this.server;
    };
    ;
    ExpressApp.prototype.jsonResponse = function (_a, req) {
        var data = _a.data, error = _a.error, code = _a.code, status = _a.status;
        if (req === void 0) { req = {}; }
        return function (res) {
            if (status)
                res.status(status);
            var _docs = req.docs || undefined;
            var _links = req.links || undefined;
            var positive = { _docs: _docs, _links: _links, data: data };
            var negative = { _docs: _docs, _links: _links, error: { status: status, code: code, data: error } };
            return error ? res.json(negative) : res.json(positive);
        };
    };
    ExpressApp.prototype.init = function () {
        this.configure();
        this.setupMiddlewares(this.config.middlewares);
        this.setupMiddlewares(this.config.guards);
        this.setupControllers(this.config.controllers);
        this.setupMiddlewares(this.config.handlers);
    };
    ExpressApp.prototype.setupMiddlewares = function (middlewares) {
        var _this = this;
        middlewares.forEach(function (middleware) { return _this.app.use(middleware); });
    };
    ExpressApp.prototype.setupControllers = function (controllers) {
        for (var _i = 0, controllers_1 = controllers; _i < controllers_1.length; _i++) {
            var item = controllers_1[_i];
            var _a = decorators_1.getController(item), target = _a.target, basePath = _a.basePath, guards = _a.guards, params = _a.params, routes = _a.routes;
            var router = express.Router({ mergeParams: true });
            if (params.length)
                for (var _b = 0, params_1 = params; _b < params_1.length; _b++) {
                    var param = params_1[_b];
                    router.param(param.name, param.handler);
                    this.app.param(param.name, param.handler);
                }
            for (var _c = 0, routes_1 = routes; _c < routes_1.length; _c++) {
                var _d = routes_1[_c], method_1 = _d.method, path = _d.path, middlewares = _d.middlewares, handlerKey = _d.handlerKey;
                router[method_1](path, middlewares.slice(), this.catchHandler(target[handlerKey].bind(target)));
            }
            var method = basePath === '*' ? 'get' : 'use';
            this.app[method](this.mainPath + basePath, guards.slice(), router);
        }
    };
    ExpressApp.prototype.catchHandler = function (fn) {
        var _this = this;
        return function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var data, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fn(req, res, next)];
                    case 1:
                        data = _a.sent();
                        if (!res.headersSent)
                            this.jsonResponse({ data: data }, req)(res);
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        if (this.logError)
                            this.logError(e_1.source || e_1);
                        this.jsonResponse({ error: e_1.data || e_1.message, status: e_1.status }, req)(res);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
    };
    return ExpressApp;
}());
exports.ExpressApp = ExpressApp;
