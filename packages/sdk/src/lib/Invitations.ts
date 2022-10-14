import { LetterProperties } from "../index";
import { RequestOptions, ListResponseMessage } from "../types";

interface Invitation {
  _id: string;
  subdomain?: string;
  type?: "collaborator" | "single";
  email?: string;
  status?: "pending" | "expired" | "accepted";
  expireIn?: string;
  permissions?: Array<string>;
}

class Invitations {
  parent: LetterProperties;

  constructor(parent: LetterProperties) {
    this.parent = parent;
  }
  async all(
    options?: RequestOptions
  ): Promise<ListResponseMessage<Invitation>> {
    return this.parent.createRequest("/account/invitation", options);
  }
  async single(id: string, options?: RequestOptions): Promise<Invitation> {
    return this.parent.createRequest(`/account/invitation/${id}`, options);
  }
}

export default Invitations;
