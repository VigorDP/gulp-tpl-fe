/*
	功能：sass转css
 */

let gulp = require('gulp'),
  config = require('../../../config.js'),
  gulpSass = require('gulp-sass'),
  // postCss = require('gulp-postcss'),
  gulpUncss = require('gulp-uncss'), //删除多余css
  gulpAutoprefixer = require('gulp-autoprefixer'),
  gulpPlumber = require('gulp-plumber'), //错误自启动
  gulpNotify = require('gulp-notify'),
  gulpNewer = require('gulp-newer'), //增量更新
  gulpLogger = require('gulp-logger'); //打印增量内容

let errorHandler = function(errorObject, callback) {
  // 错误通知
  gulpNotify
    .onError(
      errorObject
        .toString()
        .split(': ')
        .join(':\n')
    )
    .apply(this, arguments);
  // Keep gulp from hanging on this task
  if (typeof this.emit === 'function') {
    this.emit('end');
  }
};

gulp.task('sass', function() {
  return gulp
    .src(config.src + '/static/scss/**/*.scss', {
      base: config.src + 'static/scss'
    })
    .pipe(
      gulpSass({
        outputStyle: 'expanded'
      })
    )
    .pipe(gulpPlumber(errorHandler))
    .pipe(gulpAutoprefixer())
    .pipe(gulp.dest(config.temp + 'static/css'));
});
