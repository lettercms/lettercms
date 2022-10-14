import { CMS } from "../../types";
import fetch from "isomorphic-fetch";

import type {Letter} from '../../index';

interface Headers {
  [key: string]: string;
}

async function importRequest(
  this: Letter,
  cms: CMS,
  data: Array<object>
): Promise<object> {
  
  try {

    if (globalThis.process)
      throw new Error('Method must be use in browser envs');

    let headers: Headers = {
      Authorization: this.accessToken as string,
    };

    const fd = new FormData();

    fd.append("cms", cms);
    fd.append("data", JSON.stringify(data));

    const res = await fetch(`${this.endpoint}/api/post/import`, {
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
