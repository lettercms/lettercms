import { LetterProperties } from "../index";
import { PostRequestOptions, ListResponseMessage } from "../types";

interface Page {
  subdomain?: string;
  title?: string;
  description?: string;
  html?: string;
  css?: string;
  styles?: string;
  components?: string;
  created?: string;
  published?: string;
  updated?: string;
  pageStatus?: string;
  images?: string;
  url?: string;
  views?: number;
}

interface PageResponse extends Page {
  _id: string;
}

class Pages {
  parent: LetterProperties;
  constructor(parent: LetterProperties) {
    this.parent = parent;
  }
  async all(
    data?: PostRequestOptions
  ): Promise<ListResponseMessage<PageResponse>> {
    return this.parent.createRequest("/page", data);
  }
  async single(url: string, data?: PostRequestOptions): Promise<PageResponse> {
    return this.parent.createRequest(`/page/${url}`, data);
  }
  async create(data?: Page): Promise<void> {
    return this.parent.createRequest("/page", "POST", data);
  }
  async publish(url: string, data?: Page): Promise<void> {
    return this.parent.createRequest(`/page/${url}`, "PATCH", {
      ...data,
      action: "publish",
    });
  }
  async update(url: string, data?: Page): Promise<void> {
    return this.parent.createRequest(`/page/${url}`, "PATCH", {
      ...data,
      action: "update",
    });
  }
  async draft(url: string, data?: Page): Promise<void> {
    return this.parent.createRequest(`/page/${url}`, "PATCH", {
      ...data,
      action: "draft",
    });
  }
  async delete(url: string): Promise<void> {
    return this.parent.createRequest(`/page/${url}`, "DELETE");
  }
}

export default Pages;
