let gulp = require('gulp'),
	config = require('../../../config.js'),
	open = require('open');

let {
	NODE_ENV: env
} = process.env;

gulp.task('openUrl', function() {
	let url = config.sce.manageUrl + config.sce[env].appId;
	open(url);
});