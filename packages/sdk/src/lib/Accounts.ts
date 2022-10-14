import { LetterProperties } from "../index";
import {
  RequestOptions,
  ListResponseMessage,
  AccountRequestOptions,
} from "../types";

interface Account {
  subdomain?: string;
  name?: string;
  lastname?: string;
  firstTime?: boolean;
  lastLogin?: string;
  description?: string;
  ocupation?: string;
  role?: "admin" | "collaborator" | "single";
  isSubscribeToNewsletter?: boolean;
  permissions?: Array<string>;
  photo?: string;
  email?: string;
  website?: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
}

interface AccountResponse extends Account {
  _id: string;
}

class Accounts {
  parent: LetterProperties;

  constructor(parent: LetterProperties) {
    this.parent = parent;
  }
  async me(data?: RequestOptions): Promise<AccountResponse> {
    return this.parent.createRequest("/account/me", data);
  }
  async inviteCollaborator(email: string): Promise<void> {
    return this.parent.createRequest("/account/invitation", "POST", {
      email,
      type: "collaborator",
    });
  }
  async inviteSingle(email: string): Promise<void> {
    return this.parent.createRequest("/account/invitation", "POST", {
      email,
      type: "single",
    });
  }
  async all(
    data?: RequestOptions
  ): Promise<ListResponseMessage<AccountResponse>> {
    return this.parent.createRequest("/account", data);
  }
  async collaborators(
    data?: AccountRequestOptions
  ): Promise<ListResponseMessage<AccountResponse>> {
    return this.parent.createRequest("/account/collaborator", data);
  }
  async single(id: string, data?: RequestOptions): Promise<AccountResponse> {
    let _id;

    const isEmail = /\w*@[a-z]{1,10}\.[a-z]{2}/.test(id);

    if (isEmail) _id = Buffer.from(id).toString("hex");
    else if (id.length === 12 || id.length === 24) _id = id;
    else throw new TypeError("ID must be an Email or a valid ID");

    return this.parent.createRequest(`/account/${_id}`, data);
  }
  async update(id: string, data?: Account): Promise<void> {
    let _id;

    const isEmail = /\w*@[a-z]{1,10}\.[a-z]{2}/.test(id);

    if (isEmail) _id = Buffer.from(id).toString("hex");
    else if (id.length === 12 || id.length === 24) _id = id;
    else throw new TypeError("ID must be an Email or a valid ID");

    return this.parent.createRequest(`/account/${_id}`, "PATCH", data);
  }
}

export default Accounts;
