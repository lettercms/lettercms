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

class Posts {
  parent: LetterProperties;
  constructor(parent: LetterProperties) {
    this.parent = parent;
  }
  async all(data?: PostRequestOptions): Promise<PostsListResponse> {
    return this.parent.createRequest("/post", data);
  }
  async single(
    year: string,
    month?: StringOrData,
    date?: StringOrData,
    url?: StringOrData,
    data?: PostRequestOptions
  ): Promise<PostResponse> {
    const basePath = "/post/";
    let path = "";

    if (!month)
      //Only URL
      path = basePath + year;
    else if (month && !date) {
      if (typeof month === "object") {
        //URL + Data
        path = basePath + year;

        data = month;
      } else if (typeof month === "string")
        //Category + URL
        path = `${basePath}${year}/${month}`;
    } else if (date && !url) {
      if (typeof date === "object") {
        //Category + URL + Data
        path = `${basePath}${year}/${month}`;
        data = date;
      } else if (typeof date === "string")
        //Year + Month + URL
        path = `${basePath}${year}/${month}/${date}`;
    } else if (url && !data) {
      if (typeof url === "object") {
        //Year + Month + URL + Data
        path = `${basePath}${year}/${month}/${date}`;
        data = url;
      } else if (typeof url === "string")
        //Year + Month + Date + URL
        path = `${basePath}${year}/${month}/${date}/${url}`;
    } else {
      if (typeof data !== "object")
        throw new TypeError("Data must be typeof Object");
      //Year + Month + Date + URL + Data
      else path = `${basePath}${year}/${month}/${date}/${url}`;
    }

    return this.parent.createRequest(path, data);
  }
  async import(cms: CMS, data: Array<object>): Promise<void> {
    return this.parent.importRequest(cms, data);
  }
  async create(data?: Post): Promise<void> {
    return this.parent.createRequest("/post", "POST", data);
  }
  async publish(url: string, data?: Post): Promise<void> {
    return this.parent.createRequest(`/post/${url}`, "PATCH", {
      ...data,
      action: "publish",
    });
  }
  async update(url: string, data?: Post): Promise<void> {
    return this.parent.createRequest(`/post/${url}`, "PATCH", {
      ...data,
      action: "update",
    });
  }
  async draft(url: string, data?: Post): Promise<void> {
    return this.parent.createRequest(`/post/${url}`, "PATCH", {
      ...data,
      action: "draft",
    });
  }
  async delete(url: string): Promise<void> {
    return this.parent.createRequest(`/post/${url}`, "DELETE");
  }
  async search(
    q: string,
    data?: PostRequestOptions
  ): Promise<PostsListResponse> {
    if (Array.isArray(data))
      data = {
        fields: data,
      };
    return this.parent.createRequest("/post/search", {
      q,
      ...data,
    });
  }
}

export default Posts;
