module.exports = {
	apps: [
		{
			name: 'arpecop',
			watch: false,
			autorestart: false,
			script: './.next/standalone/apps/arpeco/public/test.js',
			env: {
				NODE_ENV: 'production',
				PORT: 3011,
				RAMDISK_ENABLED: true,
				RAMDISK_SIZE: '150M'
			}
		}
	]
}
