/*
	功能：zip之前去除冗余代码使zip化的资源更干净
 */

let gulp = require('gulp'),
	config = require('../../../config.js'),
	del = require('del');

gulp.task('delRedundant', ['delCSS','delJS','delJSMap'], function() {
	return del([config.dist + 'sce/app/static/img/**/*.*', '!' + config.dist + 'sce/app/static/img/**/*.*.*', '!' + config.dist + 'sce/app/static/img/sprite.png']);
});

gulp.task('delCSS', function() {
	return del([config.dist + 'sce/app/static/css/**/*.css', '!' + config.dist + 'sce/app/static/css/**/*.*.css']);
});
gulp.task('delJS', function() {
	return del([config.dist + 'sce/app/static/js/**/*.js', '!' + config.dist + 'sce/app/static/js/**/*.*.js', '!' + config.dist + 'sce/app/static/js/fe-monitor.js']);
});
gulp.task('delJSMap', function() {
	return del([config.dist + 'sce/app/static/js/**/*.js.map', '!' + config.dist + 'sce/app/static/js/**/*.*.js.map', '!' + config.dist + 'sce/app/static/js/fe-monitor.js.map']);
});