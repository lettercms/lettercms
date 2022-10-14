"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Payment {
    constructor(parent) {
        this.parent = parent;
    }
    usage() {
        return this.parent.createRequest("/usage");
    }
}
exports.default = Payment;
