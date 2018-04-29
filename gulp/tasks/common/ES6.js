/*
	功能：将ES6语法转为ES5
 */

let gulp = require('gulp'),
	config = require('../../../config.js'),
	gulpBabel = require('gulp-babel'),
	gulpNewer = require('gulp-newer'), //增量更新
	gulpLogger = require('gulp-logger'); //打印增量内容

let {
	NODE_ENV
} = process.env;

gulp.task('ES6', function() {
	return gulp.src([config.src + 'static/es6/**'])
		.pipe(gulpBabel({
			presets: [
				['env', {
					"targets": {
						browsers: ["safari>=9", "android>=5", "ios>=9"] //可取值：chrome, opera, edge, firefox, safari, ie, ios, android, node, electron.
					},
					"modules": 'umd', //可取值"amd" | "umd" | "systemjs" | "commonjs" | false, defaults to "commonjs".
					"useBuiltIns": true, //使用'babel-polyfill'
					"debug": NODE_ENV === 'product' ? false : true //这里按server环境来区分是否debug有些欠妥 以后遇到问题再改 @liuxuefeng 20180306
				}]
			],
			ignore: [config.src + 'static/es6/lib/**']
			// plugins: ['transform-runtime']
		}))
		.pipe(gulpNewer(config.temp + "static/js"))
		.pipe(gulpLogger({
			showChange: true
		}))
		.pipe(gulp.dest(config.temp + 'static/js'))
});