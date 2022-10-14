"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isomorphic_fetch_1 = __importDefault(require("isomorphic-fetch"));
async function importRequest(cms, data) {
    try {
        if (globalThis.process)
            throw new Error('Method must be use in browser envs');
        let headers = {
            Authorization: this.accessToken,
        };
        const fd = new FormData();
        fd.append("cms", cms);
        fd.append("data", JSON.stringify(data));
        const res = await (0, isomorphic_fetch_1.default)(`${this.endpoint}/api/post/import`, {
            mode: "cors",
            credentials: "include",
            method: "POST",
            headers,
            body: fd,
        });
        if (!res.ok) {
            const resData = await res.json();
            return Promise.reject(resData);
        }
        const resData = await res.json();
        return Promise.resolve(resData);
    }
    catch (err) {
        return Promise.reject(err);
    }
}
exports.default = importRequest;
