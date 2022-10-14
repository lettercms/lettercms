"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Invitations {
    constructor(parent) {
        this.parent = parent;
    }
    async all(options) {
        return this.parent.createRequest("/account/invitation", options);
    }
    async single(id, options) {
        return this.parent.createRequest(`/account/invitation/${id}`, options);
    }
}
exports.default = Invitations;
