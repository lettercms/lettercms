const usage = {
  posts: {
    versioning: {
      limit: 10, //versions
      quota: 0.01 / 10 //per version
    }
  },
  pages: {
    published:{
      limit: 10, //pages
      quota: 0.01 //per page
    }
  },
  ab: {
    test: {
      limit: 1, //test
      quota: 0.005 //per active test
    }
  },
  stats: {
    reports: 0.01 / 10, //per report
    realtime: 0.05 //per enable realtime
  },
  social: {
    schedule: {
      limit: 10, //schedule
      quota: 0.005 / 10 //per schedule
    },
    accounts: 0.01, //per addicional account
    instagramPosts: 25
  },
  emails: {
    campaign: 0.25 //per campaign
  },
  accounts: {
    collabs: 1, //per sollab
    single: 0.1 //per single
  },
  files: {
    storage: {
      limit: 250 * 1024 * 1024, //bytes
      quota: 0.06 / 1024 / 1024 / 1024 //per bytes
    },
    upload: {
      limit: 300, //uploads daily
      quota: 0.05 / 1000 //per upload
    }
  }
};

export default usage;
