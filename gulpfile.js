let gulp = require('gulp'),
	config = require('./config.js'),
	del = require('del'),
	requireDir = require('require-dir'),
	chalk = require('chalk'),
	runSequence = require('run-sequence');

console.log('Waiting For Gulp Tasks Loading ...' + '\n');

let {
	NODE_ENV: env,
	CDN: cdn
} = process.env;

// 递归引入gulp/tasks目录下的文件，该操作比较耗时(14s左右)
requireDir('./gulp/tasks', {
	recurse: true
});

if (env !== 'dev') {
	console.log('\n\n/***********************    打包开始，当前环境为：' + chalk.blue.bold(env) + '    ***********************/' + '\n');
}
gulp.task('build', function(cb) { //默认不放 CDN
	del.sync(config.temp);
	del.sync(config.dist);
	runSequence(['svg'], ['eslint', 'ES6', 'fileInclude'], ['sass'], ['sprite'], ['usemin'], ['cssmin', 'jsmin', 'htmlmin'], ['revision'], ['cdnPre'], ['delRedundant'], ['zip'], function() {
		if (cdn === 'true') console.log('○ 静态资源zip请上传至：' + config.cdnPath);
		console.log('○ sce zip请上传至：' + config.sce.manageUrl + config.sce[env].appId);
		console.log('\n\n/***********************    打包结束，当前环境为：' + chalk.blue.bold(env) + '    ***********************/' + '\n');
	});
})

gulp.task('dev', function(cb) {
	del.sync(config.temp);
	config.buryPointSwitch = false;
	config.isImgOptmize = false;
	runSequence(['svg'], ['fileInclude', 'eslint', 'ES6'], ['sass'], ['sprite'], ['dev-server'], cb);
});