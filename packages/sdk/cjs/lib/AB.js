"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ABTesting {
    constructor(parent) {
        this.parent = parent;
    }
    async all(data) {
        return this.parent.createRequest("/ab", data);
    }
    async create(data) {
        return this.parent.createRequest("/ab", "POST", data);
    }
    async update(url, data) {
        return this.parent.createRequest(`/ab/${url}`, "PATCH", data);
    }
    async delete(url) {
        return this.parent.createRequest(`/ab/${url}`, "DELETE");
    }
}
exports.default = ABTesting;
