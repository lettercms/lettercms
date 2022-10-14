import createRequest from "./lib/utils/createRequest";
import importRequest from "./lib/utils/importRequest";
import existsRequest from "./lib/utils/existsRequest";

import Accounts from "./lib/Accounts";
import Blogs from "./lib/Blogs";
import Comments from "./lib/Comments";
import Images from "./lib/Images";
import Invitations from "./lib/Invitations";
import Pages from "./lib/Pages";
import Payment from "./lib/Payment";
import Posts from "./lib/Posts";
import Reports from "./lib/Reports";
import Social from "./lib/Social";
import Stats from "./lib/Stats";
import Users from "./lib/Users";

import { AccessToken, Subdomain, LoginResponse } from "./types";

const devEndpoint = "http://localhost:3009";
const prodEndpoint = process.env.LETTERCMS_ENDPOINT as string;

const isDev = process.env.NODE_ENV !== "production";

const endpoint = isDev ? devEndpoint : prodEndpoint;

class LetterSDK {
  endpoint: string;
  accessToken: AccessToken;
  subdomain: Subdomain;

  createRequest: Function;
  importRequest: Function;

  accounts: Accounts;
  blogs: Blogs;
  comments: Comments;
  images: Images;
  invitations: Invitations;
  pages: Pages;
  payment: Payment;
  posts: Posts;
  reports: Reports;
  social: Social;
  stats: Stats;
  users: Users;

  Letter: typeof LetterSDK;

  constructor(accessToken?: AccessToken) {
    this.endpoint = endpoint;

    this.accessToken = accessToken;

    this.createRequest = createRequest.bind(this);
    this.importRequest = importRequest.bind(this);

    this.accounts = new Accounts(this);
    this.blogs = new Blogs(this);
    this.comments = new Comments(this);
    this.images = new Images(this);
    this.invitations = new Invitations(this);
    this.pages = new Pages(this);
    this.payment = new Payment(this);
    this.posts = new Posts(this);
    this.reports = new Reports(this);
    this.social = new Social(this);
    this.stats = new Stats(this);
    this.users = new Users(this);

    this.Letter = LetterSDK;
  }
  public setAccessToken(accessToken: string): void {
    this.accessToken = accessToken;
  }
  static async existsSubdomain(subdomain: string): Promise<boolean> {
    try {
      return existsRequest("blog", {
        subdomain,
      });
    } catch (err) {
      return Promise.reject(err);
    }
  }
  static async existsAccount(condition: object): Promise<boolean> {
    try {
      return existsRequest("account", condition);
    } catch (err) {
      return Promise.reject(err);
    }
  }
  static async existsPage(condition: object): Promise<boolean> {
    try {
      return existsRequest("page", condition);
    } catch (err) {
      return Promise.reject(err);
    }
  }
  static async existsPost(condition: object): Promise<boolean> {
    try {
      return existsRequest("post", condition);
    } catch (err) {
      return Promise.reject(err);
    }
  }
  static async existsUser(condition: object): Promise<boolean> {
    try {
      return existsRequest("user", condition);
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

declare module globalThis {
  var letterSDK: LetterSDK;
}

if (!("letterSDK" in globalThis)) {
  globalThis.letterSDK = new LetterSDK();
}

let sdk: Letter = globalThis.letterSDK;

export type Letter = LetterSDK;
export type LetterProperties = Letter | TempLetterProperties;

export interface TempLetterProperties {
  createRequest?: any;
  importRequest?: any;
  subdomain: string;
  accessToken: AccessToken;
  endpoint: string;
}

export interface TempLetterMethods {
  accounts: Accounts;
  blogs: Blogs;
  pages: Pages;
  posts: Posts;
  reports: Reports;
  stats: Stats;
}



export default sdk;
