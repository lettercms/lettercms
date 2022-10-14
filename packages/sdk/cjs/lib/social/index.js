"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Instagram = exports.Facebook = void 0;
const Base_1 = __importDefault(require("./Base"));
class Facebook extends Base_1.default {
    constructor(parent) {
        super("facebook", parent);
    }
}
exports.Facebook = Facebook;
class Instagram extends Base_1.default {
    constructor(parent) {
        super("instagram", parent);
    }
}
exports.Instagram = Instagram;
