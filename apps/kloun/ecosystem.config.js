module.exports = {
    apps: [
        {
            name: "git",
            script: "pnpm start --port 3032",
            env: {
                NODE_ENV: "production",
            },
        }
    ],
};