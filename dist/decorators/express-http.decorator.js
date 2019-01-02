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
require("reflect-metadata");
var enums_1 = require("../common/enums");
var __CONTROLLER__ = 'http:controller';
var __ROUTES__ = 'http:route';
function trimPath(str) {
    return str[str.length - 1] == '/' ? str.slice(0, str.length - 1) : str;
}
exports.trimPath = trimPath;
function getController(controllerClass) {
    var instance = new controllerClass();
    return Reflect.getMetadata(__CONTROLLER__, instance.constructor) || {};
}
exports.getController = getController;
function route(method, path, middlewares) {
    if (middlewares === void 0) { middlewares = []; }
    return function (target, key) {
        var routes = Reflect.getMetadata(__ROUTES__, target.constructor) || [];
        routes.push({
            method: method,
            path: trimPath(path),
            middlewares: middlewares,
            handlerKey: key
        });
        Reflect.defineMetadata(__ROUTES__, routes, target.constructor);
    };
}
exports.route = route;
function controller(basePath, middlewares) {
    if (middlewares === void 0) { middlewares = {}; }
    return function (target) {
        var routes = Reflect.getMetadata(__ROUTES__, target.prototype.constructor) || [];
        var controller = {
            target: new target(),
            basePath: trimPath(basePath),
            params: middlewares.params || [],
            guards: middlewares.guards || [],
            routes: routes
        };
        Reflect.defineMetadata(__CONTROLLER__, controller, target.prototype.constructor);
    };
}
exports.controller = controller;
function request(name, value) {
    var _this = this;
    return function (target, propertyKey, descriptor) {
        var method = descriptor.value;
        descriptor.value = function (req) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    req[name] = value;
                    return [2 /*return*/, method.apply(this, [req].concat(args))];
                });
            });
        };
        return descriptor;
    };
}
exports.request = request;
function Controller(basePath, middlewares) {
    if (middlewares === void 0) { middlewares = {}; }
    return controller(basePath, middlewares);
}
exports.Controller = Controller;
function Links(array) {
    return request('links', array);
}
exports.Links = Links;
function Docs(url) {
    return request('docs', url);
}
exports.Docs = Docs;
function All(path, middlewares) {
    return route(enums_1.ERouteMethods.all, path, middlewares);
}
exports.All = All;
function Get(path, middlewares) {
    return route(enums_1.ERouteMethods.get, path, middlewares);
}
exports.Get = Get;
function Post(path, middlewares) {
    return route(enums_1.ERouteMethods.post, path, middlewares);
}
exports.Post = Post;
function Patch(path, middlewares) {
    return route(enums_1.ERouteMethods.patch, path, middlewares);
}
exports.Patch = Patch;
function Put(path, middlewares) {
    return route(enums_1.ERouteMethods.put, path, middlewares);
}
exports.Put = Put;
function Delete(path, middlewares) {
    return route(enums_1.ERouteMethods.delete, path, middlewares);
}
exports.Delete = Delete;
function Options(path, middlewares) {
    return route(enums_1.ERouteMethods.options, path, middlewares);
}
exports.Options = Options;
