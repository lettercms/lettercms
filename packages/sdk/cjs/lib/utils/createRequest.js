"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const objectToQueryString_1 = __importDefault(require("./objectToQueryString"));
const isomorphic_fetch_1 = __importDefault(require("isomorphic-fetch"));
async function createRequest(path, method, data) {
    if (!this.accessToken)
        throw new Error("Access Token is not Set");
    const hasNotMethod = typeof method === "object" && !data;
    const dataParam = hasNotMethod ? method : data;
    const methodParam = hasNotMethod ? "GET" : method;
    const isGet = methodParam === "GET";
    let query = "";
    let headers = {
        Authorization: this.accessToken,
    };
    let newData = {};
    if (isGet && !!dataParam) {
        if (Array.isArray(dataParam))
            newData = {
                fields: dataParam.join(","),
            };
        else {
            newData = dataParam;
            if (newData.fields)
                newData.fields =
                    typeof newData.fields === "string"
                        ? newData.fields
                        : newData.fields.join(",");
        }
        query = (0, objectToQueryString_1.default)(newData);
    }
    if (!isGet)
        headers["Content-Type"] = "application/json";
    try {
        const res = await (0, isomorphic_fetch_1.default)(`${this.endpoint}/api${path}${query}`, {
            method: methodParam,
            headers,
            mode: "cors",
            credentials: "include",
            body: !isGet && !!data ? JSON.stringify(data) : undefined,
        });
        return res.json();
    }
    catch (err) {
        return Promise.reject(err);
    }
}
exports.default = createRequest;
