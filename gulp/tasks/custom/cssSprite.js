/*
	功能：css雪碧图
	要使用该功能，请这样做：
	1、图片必须使用background-image语法，不能写在html的img中，也不能用background语法
	2、图片命名不能用中划线
	3、高清图的配置可参见 https://www.npmjs.com/package/gulp-sprite-generator
 */

let gulp = require('gulp'),
	config = require('../../../config.js'),
	runSequence = require('run-sequence'),
	gulpSpriteGenerator = require('gulp-sprite-generator');

gulp.task('sprite', function(cb) {
	runSequence('cssSprite', 'px2rem', cb);
});


gulp.task('cssSprite', function() {
	var spriteOutput;
	spriteOutput = gulp.src(config.temp + 'static/css/index.css') //注意修改入口文件名
		.pipe(gulpSpriteGenerator({
			baseUrl: '../img',
			spriteSheetPath: '../img',
			spriteSheetName: "sprite.png",
			algorithm: 'left-right' // 竖条图 top-down  长条图 left-right 正方形图 binary-tree
		}))

	spriteOutput.css.pipe(gulp.dest(config.temp + 'static/css'));
	return spriteOutput.img.pipe(gulp.dest(config.temp + 'static/img'));
});