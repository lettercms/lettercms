import { LetterProperties } from "../index";
import { PostRequestOptions, ListResponseMessage, CMS } from "../types";

type StringOrData = string | PostRequestOptions;

interface Post {
  subdomain: string;
  title: string;
  description: string;
  tags: Array<string>;
  category: string;
  content: string;
  text: string;
  comments: number;
  created: string;
  published: string;
  updated: string;
  authorEmail: string;
  postStatus: "draft" | "published";
  images: Array<string>;
  thumbnail: string;
  url: string;
  views: number;
  isProtected: boolean;
}

interface PostResponse extends Post {
  _id: string;
}
interface PostTotal {
  all: number;
  draft: number;
  published: number;
}
interface PostsListResponse extends ListResponseMessage<PostResponse> {
  total: PostTotal;
}

class ABTesting {
  parent: LetterProperties;
  constructor(parent: LetterProperties) {
    this.parent = parent;
  }
  async all(data?: PostRequestOptions): Promise<PostsListResponse> {
    return this.parent.createRequest("/ab", data);
  }
  async create(data?: Post): Promise<void> {
    return this.parent.createRequest("/ab", "POST", data);
  }
  async update(url: string, data?: Post): Promise<void> {
    return this.parent.createRequest(`/ab/${url}`, "PATCH", data);
  }
  async delete(url: string): Promise<void> {
    return this.parent.createRequest(`/ab/${url}`, "DELETE");
  }
}

export default ABTesting;
