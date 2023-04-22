module.exports = {
    apps: [
        {
            name: "app",
            script: "pnpm start --port 3002",
            env: {
                NODE_ENV: "production",
            },
        }
    ],
};
