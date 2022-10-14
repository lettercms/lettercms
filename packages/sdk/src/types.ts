//Lists
interface Cursor {
  before: string;
  after?: string;
}

interface CursorPagination {
  cursors: Cursor;
  next: string;
  prev?: string;
}
interface OffsetPagination {
  page: string;
  total: string;
}

export interface ListResponseMessage<T> {
  data: Array<T>;
  pagination: CursorPagination | OffsetPagination;
}

interface Request {
  fields?: Array<string>;
  limit?: number;
  page?: number;
  before?: string;
  after?: string;
  sort?: string;
}
interface PostRequest extends Request {
  status?: string;
}
interface AccountRequest extends Request {
  role?: "admin" | "collaborator" | "single";
}

export interface LoginResponse {
  accessToken: string;
  id: string;
}

export type RequestOptions = Array<string> | Request;
export type PostRequestOptions = Array<string> | PostRequest;
export type AccountRequestOptions = Array<string> | AccountRequest;

export type AccessToken = string | undefined;
export type Subdomain = string | undefined;

export type CMS = "wordpress" | "blogger";
