interface KeyValue {
  [key: string]: any;
}
interface FacebookAuthResponse {
  accessToken: string;
  expiresIn: string;
  reauthorize_required_in: string;
  signedRequest: string;
  userID: string;
}
interface FacebookSDK {
  login(cb: Function, scope?: FacebookScope): void;
  getLoginStatus(cb: Function): void;
  api(path: string, cb: Function): void;
}

export interface PagesResponse {
  data: Array<KeyValue>;
}
export interface FacebookResponse {
  status: "connected" | "not_authorized" | "unknown";
  authResponse: FacebookAuthResponse;
}
export interface FacebookScope {
  scope: string;
}
export interface NewWindow extends Window {
  FB?: FacebookSDK;
}

interface FacebookImage {
  id: string;
  created_time: string;
}

export interface FacebookPost {
  id: string;
  message: string;
  created_time: string;
  image: Array<FacebookImage>;
}
