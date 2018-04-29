let gulp = require('gulp'),
	config = require('../../../config.js'),
	gulpUncss = require('gulp-uncss'); //删除未使用到css

gulp.task('uncss', function() {
	return gulp.src(config.temp + "static/css/**/*.css")
		.pipe(gulpUncss({
			html: [config.temp + 'view/**/*.html'],
			ignore: ['.test1']
		}))
		.pipe(gulp.dest(config.temp + "static/css"))
});