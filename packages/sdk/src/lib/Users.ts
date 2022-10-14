import { LetterProperties } from "../index";
import { RequestOptions, ListResponseMessage } from "../types";

interface User {
  subdomain?: string;
  name?: string;
  lastname?: string;
  email?: string;
  feed?: Array<string>;
  messagingToken?: string;
  verified?: boolean;
  active?: boolean;
  newUser?: boolean;
  device?: "mobile" | "desktop";
}
interface UserResponse extends User {
  _id: string;
}

class Users {
  parent: LetterProperties;
  constructor(parent: LetterProperties) {
    this.parent = parent;
  }
  async all(data?: RequestOptions): Promise<ListResponseMessage<UserResponse>> {
    return this.parent.createRequest("/user", data);
  }
  async create(data?: User): Promise<void> {
    return this.parent.createRequest("/user", "POST", data);
  }
  async single(id: string, data?: RequestOptions): Promise<UserResponse> {
    return this.parent.createRequest(`/user/${id}`, data);
  }
  async update(id: string, data?: User): Promise<void> {
    return this.parent.createRequest(`/user/${id}`, "PATCH", data);
  }
  async recommendation(id: string, data?: RequestOptions): Promise<any> {
    return this.parent.createRequest(`/user/${id}/recommendation`, data);
  }
  async recommendationForPost(
    id: string,
    post: string,
    data?: RequestOptions
  ): Promise<any> {
    return this.parent.createRequest(
      `/user/${id}/recommendation/${post}`,
      data
    );
  }
  async merge(from: string, to: string): Promise<void> {
    return this.parent.createRequest(`/user/merge`, "POST", {
      from,
      to,
    });
  }
  async delete(id: string): Promise<void> {
    return this.parent.createRequest(`/user/${id}`, "DELETE");
  }
}

export default Users;
