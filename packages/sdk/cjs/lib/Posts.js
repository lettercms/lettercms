"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Posts {
    constructor(parent) {
        this.parent = parent;
    }
    async all(data) {
        return this.parent.createRequest("/post", data);
    }
    async single(year, month, date, url, data) {
        const basePath = "/post/";
        let path = "";
        if (!month)
            //Only URL
            path = basePath + year;
        else if (month && !date) {
            if (typeof month === "object") {
                //URL + Data
                path = basePath + year;
                data = month;
            }
            else if (typeof month === "string")
                //Category + URL
                path = `${basePath}${year}/${month}`;
        }
        else if (date && !url) {
            if (typeof date === "object") {
                //Category + URL + Data
                path = `${basePath}${year}/${month}`;
                data = date;
            }
            else if (typeof date === "string")
                //Year + Month + URL
                path = `${basePath}${year}/${month}/${date}`;
        }
        else if (url && !data) {
            if (typeof url === "object") {
                //Year + Month + URL + Data
                path = `${basePath}${year}/${month}/${date}`;
                data = url;
            }
            else if (typeof url === "string")
                //Year + Month + Date + URL
                path = `${basePath}${year}/${month}/${date}/${url}`;
        }
        else {
            if (typeof data !== "object")
                throw new TypeError("Data must be typeof Object");
            //Year + Month + Date + URL + Data
            else
                path = `${basePath}${year}/${month}/${date}/${url}`;
        }
        return this.parent.createRequest(path, data);
    }
    async import(cms, data) {
        return this.parent.importRequest(cms, data);
    }
    async create(data) {
        return this.parent.createRequest("/post", "POST", data);
    }
    async publish(url, data) {
        return this.parent.createRequest(`/post/${url}`, "PATCH", Object.assign(Object.assign({}, data), { action: "publish" }));
    }
    async update(url, data) {
        return this.parent.createRequest(`/post/${url}`, "PATCH", Object.assign(Object.assign({}, data), { action: "update" }));
    }
    async draft(url, data) {
        return this.parent.createRequest(`/post/${url}`, "PATCH", Object.assign(Object.assign({}, data), { action: "draft" }));
    }
    async delete(url) {
        return this.parent.createRequest(`/post/${url}`, "DELETE");
    }
    async search(q, data) {
        if (Array.isArray(data))
            data = {
                fields: data,
            };
        return this.parent.createRequest("/post/search", Object.assign({ q }, data));
    }
}
exports.default = Posts;
