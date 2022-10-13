module.exports = {
  root: true,
  extends: ["@lettercms/eslint-config"],
  settings: {
    next: {
      rootDir: [
        "apps/client/",
        "apps/dashboard/",
        "apps/api"
      ],
    },
  }
};
