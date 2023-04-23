module.exports = {
  apps: [
    {
      name: 'eziktok',
      script: './.next/standalone/apps/eziktok/server.js',
      env: {
        NODE_ENV: 'production',
        PORT: 3002,
        RAMDISK_ENABLED: true,
        RAMDISK_SIZE: '150M'
      }
    }
  ]
}
