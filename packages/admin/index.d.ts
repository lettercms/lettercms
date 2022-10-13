
export declare class Admin {
  accessToken: string;
  _request: typeof Function;

  login(email: string, password: string): Promise<object>;
  createAccount(data: object): Promise<object>;
  createBlog(data: object): Promise<object>;
  createStat(subdomain: string): Promise<object>;
  updateAccountSubdomain(email: string, subdomain: string): Promise<object>;
}
