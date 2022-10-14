"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./social/index");
class Social {
    constructor(parent) {
        this.parent = parent;
        this.facebook = new index_1.Facebook(parent);
        this.instagram = new index_1.Instagram(parent);
    }
    publish(message, options) {
        const promises = [
            this.facebook.publish(message, options),
            this.instagram.publish(message, options),
        ];
        return Promise.all(promises);
    }
    accounts(options) {
        return this.parent.createRequest("/social/account", options);
    }
}
exports.default = Social;
