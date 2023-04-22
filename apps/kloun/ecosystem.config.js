module.exports = {
  apps: [
    {
      name: 'kloun',
      script: './.next/standalone/apps/kloun/server.js',
      env: {
        NODE_ENV: 'production',
        PORT: 3001
      }
    }
  ]
}
