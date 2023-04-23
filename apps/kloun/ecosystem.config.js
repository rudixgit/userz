module.exports = {
  apps: [
    {
      name: 'kloun',
      script: './.next/standalone/apps/kloun/server.js',
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
        RAMDISK_ENABLED: true,
        RAMDISK_SIZE: '150M'
      }
    }
  ]
}
