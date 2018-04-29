/*
	功能：eslint检查js代码的规范性
 */


const gulp = require('gulp'),
	config = require('../../../config.js'),
	gulpEslint = require('gulp-eslint');

gulp.task('eslint', () => {
	// ESLint ignores files with "node_modules" paths. 
	// So, it's best to have gulp ignore the directory as well. 
	// Also, Be sure to return the stream from the task; 
	// Otherwise, the task may end before the stream has finished. 
	return gulp.src([config.src + 'static/es6/**/*.js', '!' + config.src + 'static/es6/lib/*.js'])
		// eslint() attaches the lint output to the "eslint" property 
		// of the file object so it can be used by other modules. 
		.pipe(gulpEslint({
			"parser": "babel-eslint",
			"rules": {
				"strict": 1, //严格模式
				"eqeqeq": 1, //=== & ！==
				"no-eval": 1, //No eval(..)
				"no-redeclare": 1, //不重复声明
				"camelcase": 1, //命名驼峰化
				"semi": 1, //总是带分号
				"no-var": 1, //不使用 var
				"prefer-const": 1 // 声明后未改变的使用 const
			},
			"fix": true // 可以自动修复忘加分号等问题（不能修复所有warning）
		}))
		// eslint.format() outputs the lint results to the console. 
		// Alternatively use eslint.formatEach() (see Docs). 
		.pipe(gulpEslint.format())
		// To have the process exit with an error code (1) on 
		// lint error, return the stream and pipe to failAfterError last. 
		.pipe(gulpEslint.failAfterError());
});