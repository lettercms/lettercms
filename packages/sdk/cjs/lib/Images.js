"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isomorphic_fetch_1 = __importDefault(require("isomorphic-fetch"));
class Images {
    constructor(parent) {
        this.parent = parent;
    }
    async all(options) {
        return this.parent.createRequest("/image", options);
    }
    async single(name, options) {
        return this.parent.createRequest(`/image/${name}`, options);
    }
    async upload(file) {
        const body = new FormData();
        body.append("file", file);
        const opts = {
            method: "POST",
            //@ts-ignore
            headers: {
                Authorization: this.parent.accessToken,
            },
            body
        };
        const res = await (0, isomorphic_fetch_1.default)(`${this.parent.endpoint}/api/image`, opts);
        return res.json();
    }
    async delete(id) {
        return this.parent.createRequest(`/image/${id}`, "DELETE");
    }
}
exports.default = Images;
