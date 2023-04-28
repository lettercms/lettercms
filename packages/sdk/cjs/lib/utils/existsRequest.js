"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });

const objectToQueryString_1 = __importDefault(require("./objectToQueryString"));

const isomorphic_fetch_1 = __importDefault(require("isomorphic-fetch"));

const isDev = process.env.NODE_ENV !== "production";

const endpoint = `http${isDev ? '' : 's'}://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/_public`;


async function default_1(path, conditions) {
    const query = (0, objectToQueryString_1.default)(conditions);

    console.log(`${endpoint}/${path}/exists${query}`);

    const res = await (0, isomorphic_fetch_1.default)(`${endpoint}/${path}/exists${query}`);

    
    const {exists} = await res.json();

    return exists;
}

exports.default = default_1;
