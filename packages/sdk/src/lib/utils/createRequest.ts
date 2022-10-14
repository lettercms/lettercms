import toQuery from "./objectToQueryString";
import fetch from "isomorphic-fetch";
import {
  RequestOptions,
  PostRequestOptions,
  AccountRequestOptions,
} from "../../types";

import type {Letter} from '../../index';

type Request = RequestOptions | PostRequestOptions | AccountRequestOptions;

interface Headers {
  [key: string]: string;
}

interface ToQuery {
  [key: string]: string | Array<string>;
}

async function createRequest(
  this: Letter,
  path: string,
  method?: string | Request,
  data?: Request
): Promise<object> {

  if (!this.accessToken) throw new Error("Access Token is not Set");

  const hasNotMethod = typeof method === "object" && !data;

  const dataParam = hasNotMethod ? method : data;

  const methodParam = hasNotMethod ? "GET" : method;

  const isGet = methodParam === "GET";

  let query = "";

  let headers: Headers = {
    Authorization: this.accessToken,
  };

  let newData: ToQuery = {};

  if (isGet && !!dataParam) {
    if (Array.isArray(dataParam))
      newData = {
        fields: dataParam.join(","),
      };
    else {
      newData = dataParam as ToQuery;

      if (newData.fields)
        newData.fields =
          typeof newData.fields === "string"
            ? newData.fields
            : newData.fields.join(",");
    }

    query = toQuery(newData);
  }

  if (!isGet) headers["Content-Type"] = "application/json";

  try {
    const res = await fetch(`${this.endpoint}/api${path}${query}`, {
      method: methodParam as string,
      headers,
      mode: "cors",
      credentials: "include",
      body: !isGet && !!data ? JSON.stringify(data) : undefined,
    });

    return res.json() as Promise<object>;
  } catch (err) {
    return Promise.reject(err);
  }
}

export default createRequest;
