module.exports = {
    apps: [
        {
            name: "app",
            script: "pnpm start --port 3031",
            env: {
                NODE_ENV: "production",
            },
        }
    ],
};
