import Base from "./Base";
import { LetterProperties } from "../../index";
import {
  FacebookFeed,
  FacebookPost,
  InstagramFeed,
  InstagramPost,
} from "./socialResponses";

class Facebook extends Base<FacebookFeed, FacebookPost> {
  constructor(parent: LetterProperties) {
    super("facebook", parent);
  }
}

class Instagram extends Base<InstagramFeed, InstagramPost> {
  constructor(parent: LetterProperties) {
    super("instagram", parent);
  }
}

export { Facebook, Instagram };
