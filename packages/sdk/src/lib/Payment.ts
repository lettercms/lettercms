import { LetterProperties } from "../index";

interface Usage {
  used: number;
  available: number;
}

interface UsageResponse {
  posts: {
    versioning: Usage;
  };
  files: {
    storage: Usage;
    upload: Usage;
  };
  pages: Usage;
  social: {
    schedule: Usage;
    instagramPosts: Usage;
    accounts: number;
  };
  accounts: {
    collaborators: number;
    single: number;
  };
  ab: {
    tests: Usage;
  };
  stats: {
    realtimeEnabled: number;
    reports: number;
  };
  emails: {
    campaigns: number;
  };
}

class Payment {
  parent: LetterProperties;
  constructor(parent: LetterProperties) {
    this.parent = parent;
  }
  usage(): Promise<UsageResponse> {
    return this.parent.createRequest("/usage");
  }
}

export default Payment;
