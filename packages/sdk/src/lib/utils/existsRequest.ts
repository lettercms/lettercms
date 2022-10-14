import toQuery from "./objectToQueryString";
import fetch from "isomorphic-fetch";

const stagingEndpoint = "https://lettercms-api-staging.herokuapp.com";

export default async function (
  path: string,
  conditions: object
): Promise<boolean> {
  const query = toQuery(conditions);
  const host =
    process.env.NODE_ENV !== "production"
      ? `http://localhost:3009/api/${path}`
      : `${stagingEndpoint}/api/${path}`; //`https://davidsdevel-${path}.lettercms.vercel.app`;

  const res = await fetch(`${host}/exists${query}`);

  if (res.status === 404) return Promise.resolve(false);

  return Promise.resolve(true);
}
