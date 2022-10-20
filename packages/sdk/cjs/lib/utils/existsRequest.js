"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const objectToQueryString_1 = __importDefault(require("./objectToQueryString"));
const isomorphic_fetch_1 = __importDefault(require("isomorphic-fetch"));
const stagingEndpoint = 'https://lettercms-api-main.vercel.app';
async function default_1(path, conditions) {
    const query = (0, objectToQueryString_1.default)(conditions);
    const host = process.env.NODE_ENV !== "production"
        ? `http://localhost:3009/api/${path}`
        : `${stagingEndpoint}/api/${path}`; //`https://davidsdevel-${path}.lettercms.vercel.app`;
    const res = await (0, isomorphic_fetch_1.default)(`${host}/exists${query}`);
    if (res.status === 404)
        return Promise.resolve(false);
    return Promise.resolve(true);
}
exports.default = default_1;
