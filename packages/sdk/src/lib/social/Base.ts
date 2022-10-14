import { PagesResponse } from "./socialTypes";
import { LetterProperties } from "../../index";
import {PublishOptions} from '../Social';


class Base<feed, post> {
  url: string;
  parent: LetterProperties;
  constructor(url: string, parent: LetterProperties) {
    this.url = url;
    this.parent = parent;
  }
  all(): Promise<feed> {
    return this.parent.createRequest(`/social/${this.url}`);
  }/*
  single(id: string, options?): Promise<post> {
    return this.parent.createRequest(`/social/${this.url}/${id}`, options);
  }*/
  publish(message: string, options?: PublishOptions): Promise<string> {
    return this.parent.createRequest(`/social/${this.url}/publish`, "POST", {
      message,
      ...options,
    });
  }/*
  update(id: string, message: string, options?): Promise<void> {
    return this.parent.createRequest(`/social/${this.url}/${id}`, "PATCH", {
      message,
      ...options,
    });
  }
  delete(id: string): Promise<void> {
    return this.parent.createRequest(`/social/${this.url}/${id}`, "DELETE");
  }*/
}

/*
class Facebook {
  posts: SocialBase;
  accessToken: string;
  constructor() {
    this.accessToken = null;
  }
  private _initFB() {

  }
  private async _sendPageToServer(ID, accessToken): Promise<void> {
    try {

    } catch(err){

    }
  }
  async login(): Promise<void> {
    try {
      const {authResponse} = await login({
        scope: ''
      });

      this.accessToken = authResponse.accessToken;
    } catch(err) {
      throw err;
    }
  }
  async accountPages(): Promise<void> {
    const {data} = await getPages();
    
    const pages = data.map(e => {
      return {
        ...e,
        sendAccessToken: () => this._sendPageToServer(e.id, this.accessToken)
      }
    });

    return;
  }
}
*/

export default Base;
