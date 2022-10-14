"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Accounts {
    constructor(parent) {
        this.parent = parent;
    }
    async me(data) {
        return this.parent.createRequest("/account/me", data);
    }
    async inviteCollaborator(email) {
        return this.parent.createRequest("/account/invitation", "POST", {
            email,
            type: "collaborator",
        });
    }
    async inviteSingle(email) {
        return this.parent.createRequest("/account/invitation", "POST", {
            email,
            type: "single",
        });
    }
    async all(data) {
        return this.parent.createRequest("/account", data);
    }
    async collaborators(data) {
        return this.parent.createRequest("/account/collaborator", data);
    }
    async single(id, data) {
        let _id;
        const isEmail = /\w*@[a-z]{1,10}\.[a-z]{2}/.test(id);
        if (isEmail)
            _id = Buffer.from(id).toString("hex");
        else if (id.length === 12 || id.length === 24)
            _id = id;
        else
            throw new TypeError("ID must be an Email or a valid ID");
        return this.parent.createRequest(`/account/${_id}`, data);
    }
    async update(id, data) {
        let _id;
        const isEmail = /\w*@[a-z]{1,10}\.[a-z]{2}/.test(id);
        if (isEmail)
            _id = Buffer.from(id).toString("hex");
        else if (id.length === 12 || id.length === 24)
            _id = id;
        else
            throw new TypeError("ID must be an Email or a valid ID");
        return this.parent.createRequest(`/account/${_id}`, "PATCH", data);
    }
}
exports.default = Accounts;
