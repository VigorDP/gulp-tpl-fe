/*
	功能：css压缩
 */

let gulp = require('gulp'),
  config = require('../../../config.js'),
  gulpCleanCSS = require('gulp-clean-css');

gulp.task('cssmin', function() {
  return gulp
    .src(
      [
        config.dist + 'sce/app/static/css/**/*.css',
        '!' + config.dist + 'sce/app/static/css/**/*.min.css'
      ],
      {
        base: config.dist + 'sce/app/'
      }
    )
    .pipe(gulpCleanCSS())
    .pipe(gulp.dest(config.dist + 'sce/app/'));
});
