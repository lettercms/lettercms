import { LetterProperties } from "../index";
import { RequestOptions, ListResponseMessage } from "../types";
import fetch from "isomorphic-unfetch";

class Images {
  parent: LetterProperties;

  constructor(parent: LetterProperties) {
    this.parent = parent;
  }
  async all(options?: RequestOptions): Promise<ListResponseMessage<any>> {
    return this.parent.createRequest("/image", options);
  }
  async single(name: string, options?: RequestOptions): Promise<any> {
    return this.parent.createRequest(`/image/${name}`, options);
  }
  async upload(file: File): Promise<any> {
    const body = new FormData();

    body.append("file", file);

    const res = await fetch(`${this.parent.endpoint}/api/image`, {
      method: "POST",
      headers: {
        Authorization: this.parent.accessToken,
      },
      body,
    });

    return res.json();
  }
  async delete(id): Promise<any> {
    return this.parent.createRequest(`/image/${id}`, "DELETE");
  }
}

export default Images;
