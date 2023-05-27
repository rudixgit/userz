module.exports = {
  apps: [
    {
      name: "git",
      script: "./server.js",
      watch_delay: 2500,
      ignore_watch: ["node_modules", "client/img", "build", "eziktokbuild"],
    },
  ],
};
