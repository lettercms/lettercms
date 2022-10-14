"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Pages {
    constructor(parent) {
        this.parent = parent;
    }
    async all(data) {
        return this.parent.createRequest("/page", data);
    }
    async single(url, data) {
        return this.parent.createRequest(`/page/${url}`, data);
    }
    async create(data) {
        return this.parent.createRequest("/page", "POST", data);
    }
    async publish(url, data) {
        return this.parent.createRequest(`/page/${url}`, "PATCH", Object.assign(Object.assign({}, data), { action: "publish" }));
    }
    async update(url, data) {
        return this.parent.createRequest(`/page/${url}`, "PATCH", Object.assign(Object.assign({}, data), { action: "update" }));
    }
    async draft(url, data) {
        return this.parent.createRequest(`/page/${url}`, "PATCH", Object.assign(Object.assign({}, data), { action: "draft" }));
    }
    async delete(url) {
        return this.parent.createRequest(`/page/${url}`, "DELETE");
    }
}
exports.default = Pages;
