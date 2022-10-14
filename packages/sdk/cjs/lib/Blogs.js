"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Blogs {
    constructor(parent) {
        this.parent = parent;
    }
    async single(data) {
        return this.parent.createRequest("/blog", data);
    }
    async update(data) {
        return this.parent.createRequest("/blog", "PATCH", data);
    }
    async categories() {
        return this.single(["categories"]);
    }
    async addCategory(data) {
        return this.parent.createRequest("/blog/category", "POST", data);
    }
    async deleteCategory(name) {
        return this.parent.createRequest("/blog/category", "DELETE", {
            name,
        });
    }
}
exports.default = Blogs;
