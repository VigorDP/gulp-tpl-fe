/*
	功能：处理html文件中特殊注释，做合并处理
 */

let gulp = require('gulp'),
	config = require('../../../config.js'),
	gulpUsemin = require('gulp-usemin'); //错误自启动

gulp.task('usemin', function() { //
	return gulp.src(config.temp + 'view/**/*.html', {
			base: config.temp
		})
		.pipe(gulpUsemin({
			// jsAttributes: {
			// 	defer: true
			// }
		}))
		.pipe(gulp.dest(config.dist + 'sce/app/'));
});