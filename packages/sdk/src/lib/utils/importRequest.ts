import { CMS } from "../../types";
import fetch from "isomorphic-unfetch";

interface Headers {
  [key: string]: string;
}

async function importRequest(cms: CMS, data: Array<object>): Promise<object> {
  let headers: Headers = {
    Authorization: this.accessToken,
  };

  try {
    let Form;
    if (typeof window === "undefined") Form = require("form-data");
    else Form = window.FormData;

    const fd = new Form();

    fd.append("cms", cms);
    fd.append("data", JSON.stringify(data));

    const res = await fetch(`${this.endpoints.post}/api/post/import`, {
      mode: "cors",
      credentials: "include",
      method: "POST",
      headers,
      body: fd,
    });

    if (!res.ok) {
      const resData: object = await res.json();
      return Promise.reject(resData);
    }

    const resData: object = await res.json();

    return Promise.resolve(resData);
  } catch (err) {
    return Promise.reject(err);
  }
}

export default importRequest;
