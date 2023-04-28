module.exports = {
  apps: [
    {
      name: 'userz',
      watch: false,
      autorestart: false,
      script: './.next/standalone/apps/userz/public/test.js',
      env: {
        NODE_ENV: 'production',
        PORT: 3011,
        RAMDISK_ENABLED: true,
        RAMDISK_SIZE: '150M'
      }
    }
  ]
}
