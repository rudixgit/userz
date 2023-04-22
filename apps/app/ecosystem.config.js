module.exports = {
    apps: [
        {
            name: "app",
            script: "pnpm start --port 3039",
            env: {
                NODE_ENV: "production",
            },
        }
    ],
};
