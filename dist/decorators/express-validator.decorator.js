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
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var utils_1 = require("../utils");
var __PARAM__ = 'validator:param';
var __TARGET__ = 'validator:target';
function target(rules, targetKey) {
    return function (target, propertyKey, parameterIndex) {
        var params = Reflect.getMetadata(__PARAM__ + ":" + propertyKey, target, propertyKey) || [];
        var targets = Reflect.getMetadata(__TARGET__ + ":" + propertyKey, target, propertyKey) || {};
        params.push(parameterIndex);
        targets[parameterIndex] = { rules: rules, key: targetKey };
        Reflect.defineMetadata(__PARAM__ + ":" + propertyKey, params, target, propertyKey);
        Reflect.defineMetadata(__TARGET__ + ":" + propertyKey, targets, target, propertyKey);
    };
}
function Body(rules) {
    return target(rules, 'body');
}
exports.Body = Body;
function Params(rules) {
    return target(rules, 'params');
}
exports.Params = Params;
function Query(rules) {
    return target(rules, 'query');
}
exports.Query = Query;
function Validate() {
    var _this = this;
    return function (target, propertyKey, descriptor) {
        var method = descriptor.value;
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return __awaiter(_this, void 0, void 0, function () {
                var errors, params, targets, argIndex, targetValue, arg, targetObject, data, validationErrors;
                return __generator(this, function (_a) {
                    errors = [];
                    params = Reflect.getMetadata(__PARAM__ + ":" + propertyKey, target, propertyKey) || [];
                    targets = Reflect.getMetadata(__TARGET__ + ":" + propertyKey, target, propertyKey) || {};
                    if (params.length) {
                        for (argIndex in args) {
                            targetValue = targets[argIndex];
                            if (!targetValue)
                                continue;
                            arg = args[argIndex];
                            targetObject = utils_1.getObject(arg, targetValue.key);
                            if (!targetObject)
                                throw new utils_1.ValidationErrors([notDefineError(targetValue.key)]);
                            data = class_transformer_1.plainToClass(targetValue.rules, targetObject);
                            validationErrors = class_validator_1.validateSync(data);
                            if (validationErrors.length)
                                errors.push.apply(errors, validationErrors);
                        }
                    }
                    if (errors.length)
                        throw new utils_1.ValidationErrors(errors);
                    return [2 /*return*/, method.apply(new target.constructor(), args)];
                });
            });
        };
        return descriptor;
    };
}
exports.Validate = Validate;
function notDefineError(key) {
    var error = new class_validator_1.ValidationError();
    error.constraints = { 'IsDefined': "\"" + key + "\" must be defined." };
    return error;
}
