"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getObject(obj, path) {
    if (!path)
        return obj;
    var keys = path.split('.');
    for (var i = 0; i < keys.length; i++)
        obj = obj[keys[i]];
    return obj;
}
exports.getObject = getObject;
