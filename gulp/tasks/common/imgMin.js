/*
	功能：图片压缩
 */

const gulp = require('gulp'),
  config = require('../../../config.js'),
  gulpIf = require('gulp-if'),
  del = require('del'),
  gulpSmushit = require('gulp-smushit'),
  gulpNewer = require('gulp-newer'), //增量更新
  gulpLogger = require('gulp-logger'); //打印增量内容

gulp.task('imgMin', function() {
  del.sync(config.temp + 'static/img/**');
  return gulp
    .src(config.src + 'static/img/**')
    .pipe(gulpNewer(config.temp + 'static/img'))
    .pipe(
      gulpLogger({
        showChange: true
      })
    )
    .pipe(
      gulpIf(
        config.isImgOptmize,
        gulpSmushit({
          verbose: true
        })
      )
    )
    .pipe(gulp.dest(config.temp + 'static/img'));
  // .pipe(gulp.dest(config.dist + 'sce/app/static/img'));
});
