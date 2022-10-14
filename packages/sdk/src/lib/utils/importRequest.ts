import { CMS } from "../../types";
import fetch from "isomorphic-fetch";
import Form from 'form-data';

interface Headers {
  [key: string]: string;
}

async function importRequest(cms: CMS, data: Array<object>): Promise<object> {
  let headers: Headers = {
    Authorization: this.accessToken,
  };

  try {
    let Form;
    if (typeof window === "undefined")
      FormData = Form;
    else
      FormData = window.FormData;

    const fd = new FormData();

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
