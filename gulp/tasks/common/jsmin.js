/*
	功能：js压缩
 */

let gulp = require('gulp'),
  config = require('../../../config.js'),
  gulpSourcemaps = require('gulp-sourcemaps'),
  gulpUglify = require('gulp-uglify');

gulp.task('jsmin', function() {
  return gulp
    .src(
      [
        config.dist + 'sce/app/static/js/**/*.js',
        '!' + config.dist + 'sce/app/static/js/**/*.min.js'
      ],
      {
        base: config.dist + 'sce/app/'
      }
    )
    .pipe(gulpSourcemaps.init())
    .pipe(
      gulpUglify({
        compress: {
          drop_console: true
        }
      })
    )
    .pipe(gulpSourcemaps.write('./'))
    .pipe(gulp.dest(config.dist + 'sce/app'));
});
