"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tracing_1 = __importDefault(require("./utils/tracing"));
class Stats {
    constructor(parent) {
        this.parent = parent;
        this.tracing = new tracing_1.default(parent);
    }
    async all(data) {
        return this.parent.createRequest("/stat", data);
    }
    async setView(url, referrer = '') {
        return this.parent.createRequest("/stat/view", "POST", {
            url,
            referrer,
        });
    }
    startTrace() {
        this.tracing.init();
    }
}
exports.default = Stats;
