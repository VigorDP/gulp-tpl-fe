/*
	功能：js和css文件夹下的文件，全部copy输出到dist下（解决之前usemin没写注释包裹的js、css不会输出到dist的问题，此方案会带来文件冗余，但是大道至简，忘掉心中的处女座执念，这方案还是不错的@柳学峰 20180305）
 */

let gulp = require('gulp'),
	config = require('../../../config.js');

gulp.task('jscss2dist', function() { 
	return gulp.src([config.temp + 'static/js/**/*.js',config.temp + 'static/css/**/*.css'], {
			base: config.temp
		})
		.pipe(gulp.dest(config.dist + 'sce/app/'));
});