/*
	功能：将px转为rem
 */

let gulp = require('gulp'),
  config = require('../../../config.js'),
  gulpPx2remPlugin = require('gulp-px2rem-plugin');

gulp.task('px2rem', function() {
  return gulp
    .src(config.temp + 'static/css/index.css') //入口自行修改
    .pipe(
      gulpPx2remPlugin({
        width_design: 750, //设计稿宽度
        valid_num: 2, //转换为rem后的小数位数
        pieces: 7.5, //fontsize=width_design/pieces
        ignore_px: [1, 2] //这些数值的px不转换为rem
        // 'ignore_selector': ['.class1']  //这个类中px不做转换
      })
    )
    .pipe(gulp.dest(config.temp + 'static/css'));
});
