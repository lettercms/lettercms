"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Comments {
    constructor(parent) {
        this.parent = parent;
    }
    async all(postID, options) {
        return this.parent.createRequest(`/comment/${postID}`, options);
    }
    async post(id, options) {
        return this.parent.createRequest(`/comment/${id}`, options);
    }
    async send(comment, postID, userID) {
        return this.parent.createRequest(`/comment`, "POST", {
            comment,
            postID,
            userID,
        });
    }
    async replyTo(comment, replyTo, postID, userID) {
        return this.parent.createRequest(`/comment/${replyTo}`, "POST", {
            comment,
            postID,
            userID,
        });
    }
    async delete(id) {
        return this.parent.createRequest(`/comment/${id}`, "DELETE");
    }
}
exports.default = Comments;
