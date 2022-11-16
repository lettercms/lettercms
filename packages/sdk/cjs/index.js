"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createRequest_1 = __importDefault(require("./lib/utils/createRequest"));
const importRequest_1 = __importDefault(require("./lib/utils/importRequest"));
const existsRequest_1 = __importDefault(require("./lib/utils/existsRequest"));
const Accounts_1 = __importDefault(require("./lib/Accounts"));
const Blogs_1 = __importDefault(require("./lib/Blogs"));
const Comments_1 = __importDefault(require("./lib/Comments"));
const Images_1 = __importDefault(require("./lib/Images"));
const Invitations_1 = __importDefault(require("./lib/Invitations"));
const Pages_1 = __importDefault(require("./lib/Pages"));
const Payment_1 = __importDefault(require("./lib/Payment"));
const Posts_1 = __importDefault(require("./lib/Posts"));
const Reports_1 = __importDefault(require("./lib/Reports"));
const Social_1 = __importDefault(require("./lib/Social"));
const Stats_1 = __importDefault(require("./lib/Stats"));
const Users_1 = __importDefault(require("./lib/Users"));
const devEndpoint = "http://localhost:3009";
const prodEndpoint = `https://lettercms-api-${process.env.BRANCH}.vercel.app`;
const isDev = process.env.NODE_ENV !== "production";
const endpoint = isDev ? devEndpoint : prodEndpoint;
class LetterSDK {
    constructor(accessToken) {
        this.endpoint = endpoint;
        this.accessToken = accessToken;
        this.createRequest = createRequest_1.default.bind(this);
        this.importRequest = importRequest_1.default.bind(this);
        this.accounts = new Accounts_1.default(this);
        this.blogs = new Blogs_1.default(this);
        this.comments = new Comments_1.default(this);
        this.images = new Images_1.default(this);
        this.invitations = new Invitations_1.default(this);
        this.pages = new Pages_1.default(this);
        this.payment = new Payment_1.default(this);
        this.posts = new Posts_1.default(this);
        this.reports = new Reports_1.default(this);
        this.social = new Social_1.default(this);
        this.stats = new Stats_1.default(this);
        this.users = new Users_1.default(this);
        this.Letter = LetterSDK;
    }
    setAccessToken(accessToken) {
        this.accessToken = accessToken;
    }
    static async existsSubdomain(subdomain) {
        try {
            return (0, existsRequest_1.default)("blog", {
                subdomain,
            });
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    static async existsAccount(condition) {
        try {
            return (0, existsRequest_1.default)("account", condition);
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    static async existsPage(condition) {
        try {
            return (0, existsRequest_1.default)("page", condition);
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    static async existsPost(condition) {
        try {
            return (0, existsRequest_1.default)("post", condition);
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    static async existsUser(condition) {
        try {
            return (0, existsRequest_1.default)("user", condition);
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
}
if (!("letterSDK" in globalThis)) {
    globalThis.letterSDK = new LetterSDK();
}
let sdk = globalThis.letterSDK;
exports.default = sdk;
