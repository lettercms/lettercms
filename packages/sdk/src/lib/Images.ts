import { LetterProperties } from "../index";
import { RequestOptions, ListResponseMessage } from "../types";
import fetch from "isomorphic-fetch";

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

    const opts: RequestInit = {
      method: "POST",
      //@ts-ignore
      headers: {
        Authorization: this.parent.accessToken,
      },
      body
    }

    const res = await fetch(`${this.parent.endpoint}/api/image`, opts);

    return res.json();
  }
  async delete(id: string): Promise<any> {
    return this.parent.createRequest(`/image/${id}`, "DELETE");
  }
}

export default Images;
