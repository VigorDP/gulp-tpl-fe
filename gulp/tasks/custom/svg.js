/**
 * 合并 svg 并清洗 svg 内冗余属性
 */

const gulp = require('gulp'),
  del = require('del'),
  config = require('../../../config.js'),
  through = require('through2'),
  svgSprite = require('gulp-svg-sprite');

gulp.task('svg', function() {
  del.sync(config.src + 'static/template/symbol/**');
  return gulp
    .src(config.src + 'static/svg/**/*.svg')
    .pipe(
      svgSprite({
        mode: {
          symbol: true
        }
      })
    )
    .pipe(removeXML())
    .pipe(gulp.dest(config.src + 'static/template'));
});

let removeXML = opt => {
  return through.obj((file, enc, cb) => {
    if (file.isNull()) return cb(null, file);
    if (file.isStream()) return cb(new PluginError('Streaming not supported'));
    // 1、这里开始，str就都是字符串了，可以采用正则进行处理了！
    var str = file.contents.toString('utf8');
    // 2、处理str
    str = str
      .replace('<?xml version="1.0" encoding="UTF-8" standalone="no"?>', '')
      .replace(
        /(xmlns="http:\/\/www\.w3\.org\/2000\/svg"|xmlns:xlink="http:\/\/www\.w3\.org\/1999\/xlink")|<title>.*?<\/title>/g,
        ''
      );
    // 3、将处理后的字符串再转回buffer类型
    file.contents = new Buffer(str);
    //  4、将处理后的文件向下一级传输
    cb(null, file);
  });
};
