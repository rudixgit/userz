module.exports = {
  apps: [
    {
      name: 'userz',
      watch: false,
      autorestart: false,
      script: './public/test.js',
      env: {
        NODE_ENV: 'production',
        PORT: 3012,
        RAMDISK_ENABLED: true,
        RAMDISK_SIZE: '150M'
      }
    }
  ]
}
