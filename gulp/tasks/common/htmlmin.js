/*
	功能：html压缩(包含内联js和css)
 */

let gulp = require('gulp'),
  config = require('../../../config.js'),
  gulpHtmlmin = require('gulp-htmlmin');

gulp.task('htmlmin', function() {
  return gulp
    .src(
      [
        config.dist + 'sce/app/view/**/*.html' // '!'+config.dest+'/tpls/write/write.html'
      ],
      {
        base: config.dist + 'sce/app/'
      }
    )
    .pipe(
      gulpHtmlmin({
        collapseWhitespace: true,
        removeComments: true,
        // minifyCSS: true, //内联是否压缩
        minifyJS: true //内联是否压缩
      })
    )
    .pipe(gulp.dest(config.dist + 'sce/app/'));
});
