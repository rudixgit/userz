module.exports = {
    apps: [
        {
            name: "git",
            script: "pnpm start --port 3001",
            env: {
                NODE_ENV: "production",
            },
        }
    ],
};