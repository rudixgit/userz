module.exports = {
  apps: [
    {
      name: 'rudixops',
      watch: false,
      autorestart: false,
      script: './.next/standalone/apps/rudixops/public/test.js',
      env: {
        NODE_ENV: 'production',
        PORT: 3019,
        RAMDISK_ENABLED: true,
        RAMDISK_SIZE: '150M'
      }
    }
  ]
}
