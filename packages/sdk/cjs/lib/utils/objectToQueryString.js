"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(data) {
    return `?${Object.entries(data)
        .map((e) => `${e[0]}=${e[1]}`)
        .join("&")}`;
}
exports.default = default_1;
