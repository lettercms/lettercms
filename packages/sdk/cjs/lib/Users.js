"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Users {
    constructor(parent) {
        this.parent = parent;
    }
    async all(data) {
        return this.parent.createRequest("/user", data);
    }
    async create(data) {
        return this.parent.createRequest("/user", "POST", data);
    }
    async single(id, data) {
        return this.parent.createRequest(`/user/${id}`, data);
    }
    async update(id, data) {
        return this.parent.createRequest(`/user/${id}`, "PATCH", data);
    }
    async recommendation(id, data) {
        return this.parent.createRequest(`/user/${id}/recommendation`, data);
    }
    async recommendationForPost(id, post, data) {
        return this.parent.createRequest(`/user/${id}/recommendation/${post}`, data);
    }
    async merge(from, to) {
        return this.parent.createRequest(`/user/merge`, "POST", {
            from,
            to,
        });
    }
    async delete(id) {
        return this.parent.createRequest(`/user/${id}`, "DELETE");
    }
}
exports.default = Users;
