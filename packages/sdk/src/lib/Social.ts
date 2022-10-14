import { LetterProperties } from "../index";
import { Instagram, Facebook } from "./social/index";

export interface PublishOptions {
  message: string
  images: Array<string>
}

declare interface AccountsOptions {
  feeds: string
  limit: number
}

class Social {
  parent: LetterProperties;
  facebook: Facebook;
  instagram: Instagram;
  constructor(parent: LetterProperties) {
    this.parent = parent;
    this.facebook = new Facebook(parent);
    this.instagram = new Instagram(parent);
  }
  publish(message: string, options: PublishOptions): Promise<Array<any>> {
    const promises = [
      this.facebook.publish(message, options),
      this.instagram.publish(message, options),
    ];

    return Promise.all(promises);
  }
  accounts(options: AccountsOptions): Promise<Array<any>> {
    return this.parent.createRequest("/social/account", options);
  }
}

export default Social;
