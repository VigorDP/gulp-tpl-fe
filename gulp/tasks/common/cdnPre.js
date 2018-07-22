/*
	功能：静态资源路径改为cdn地址(需在config.js中开启CDN开关)
 */

let gulp = require('gulp'),
  config = require('../../../config.js'),
  gulpIf = require('gulp-if'),
  gulpReplace = require('gulp-replace');

let { CDN } = process.env;

gulp.task('cdnPre', function() {
  //
  return gulp
    .src(config.dist + 'sce/app/view/**/*.html', {
      base: config.dist + 'sce/app'
    })
    .pipe(
      gulpIf(
        CDN === 'true',
        gulpReplace(/"[./]*static\//g, '"' + config.cdnPath)
      )
    )
    .pipe(gulp.dest(config.dist + 'sce/app'));
});
