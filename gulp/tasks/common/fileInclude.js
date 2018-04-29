/*
	功能：处理html文件中公共资源的引入
 */

let gulpFileInclude = require('gulp-file-include'),
	config = require('../../../config.js'),
	gulp = require('gulp');

let {
	NODE_ENV: env
} = process.env;

gulp.task('fileInclude', function() {
	return gulp.src(config.src + 'view/**/*.html')
		.pipe(gulpFileInclude({ //这个插件只能传字符串
			context: {
				env: env === 'product' ? 'product' : 'test', //这里按server环境来区分是否debug有些欠妥 以后遇到问题再改 @liuxuefeng 20180306
				buryPointSwitch: config.buryPointSwitch ? 'true' : 'false',
				monitorSwitch: config.monitorSwitch ? 'true' : 'false',
				author: config.author,
				project: config.project,
				testToken: config.sce[env].appToken,
				productToken: config.sce[env].appToken
			},
			prefix: '@'
		}))
		.pipe(gulp.dest(config.temp + 'view/'));
});