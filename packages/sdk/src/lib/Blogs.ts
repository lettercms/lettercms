import { LetterProperties } from "../index";
import { RequestOptions, ListResponseMessage } from "../types";

interface Category {
  name: string;
  alias: string;
}

interface Blog {
  subdomain?: string;
  customDomain?: string;
  plan?: "beta" | "free" | "pro";
  isVisible?: boolean;
  hasCustomRobots?: boolean;
  robots?: string;
  lastPayment?: string;
  ownerEmail?: string;
  url?: string;
  categories?: Array<Category>;
  mainUrl?: string;
  title?: string;
  description?: string;
  thumbnail?: string;
}

interface CategoriesResponse {
  _id: string;
  categories?: Array<Category>;
}

interface BlogResponse extends Blog {
  _id: string;
}

class Blogs {
  parent: LetterProperties;

  constructor(parent: LetterProperties) {
    this.parent = parent;
  }
  async single(data?: RequestOptions): Promise<BlogResponse> {
    return this.parent.createRequest("/blog", data);
  }
  async update(data: Blog): Promise<void> {
    return this.parent.createRequest("/blog", "PATCH", data);
  }
  async categories(): Promise<CategoriesResponse> {
    return this.single(["categories"]);
  }
  async addCategory(data: Category): Promise<void> {
    return this.parent.createRequest("/blog/category", "POST", data);
  }
  async deleteCategory(name: string): Promise<void> {
    return this.parent.createRequest("/blog/category", "DELETE", {
      name,
    });
  }
}

export default Blogs;
