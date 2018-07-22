/*
	功能：输出部署sce的配置文件
 */
let gulp = require('gulp'),
  path = require('path'),
  lodash = require('lodash'),
  gulpReplace = require('gulp-replace'),
  gulpUtil = require('gulp-util'),
  config = require('../../../config.js');
let env = process.env.NODE_ENV;

gulp.task('sceInit', function() {
  //1、取出对应的配置信息
  var configObj = config.sce[env].proxyTable,
    opt = [];
  for (var i in configObj) {
    var obj = {
      key: i,
      value: configObj[i]
    };
    opt.push(obj);
  }
  // 2、创建 nginx_server.inc 文件
  var nginxTpl = `
		location ^~ /<%= key %>/ {
		    proxy_set_header Host <%= value %>;
		    proxy_set_header Origin http://<%= value %>;
		    proxy_pass    http://<%= value %>/;
		    client_max_body_size 51m;
		    client_body_buffer_size 1024k;
		}`;
  var result = `
		location / {
			alias /opt/src/app/;
			expires 24h;
		}
		#禁止Nginx代理时自动加端口
		port_in_redirect off;
		`;
  //该Nginx配置 目前不太灵活 不符合上述规则的proxy配置需要单独追加 日后需要再优化@liuxuefeng 20180306
  for (var i = 0; i < opt.length; i++) {
    result += lodash.template(nginxTpl)(opt[i]);
  }
  generateFile('nginx_server.inc', result).pipe(
    gulp.dest(config.dist + 'sce/conf')
  );

  // 3、创建 uwsgi.ini 文件
  var uwsgiTpl = `
		[uwsgi]
		socket = :8000
		master = true
		module = hello
		processes = 4
		listen = 120
		enable-threads = true
		daemonize = /opt/logs/agent.log
		pidfile = /opt/conf/pid
		pythonpath = /opt/src/app
		buffer-size =  32768
		reload-mercy = 8
		vacuum = true
		harakiri = 30
		limit-as = 1024
		threads = 512
		uid=app
		gid=app
	`;
  generateFile('uwsgi.ini', uwsgiTpl).pipe(gulp.dest(config.dist + 'sce/conf'));
  // 4、创建 app.yaml 文件，请不要调整缩进，该文件多一个空格都不行
  var appId = config.sce[env].appId,
    yamlTpl = `appid: <%= appId %>
start: $UWSGI_START`,
    obj = {
      appId: appId
    };
  return generateFile('app.yaml', lodash.template(yamlTpl)(obj)).pipe(
    gulp.dest(config.dist + 'sce')
  );
});

/**
 * @Author   冯银超
 * @DateTime 2018-01-10 以string为内容生成名为filename的文件
 * @param    {string}   filename 要生成的文件名
 * @param    {string}   string   生成文件的内容
 * @return   {stream}            文件的流格式
 */
function generateFile(filename, string) {
  var src = require('stream').Readable({
    objectMode: true
  });
  src._read = function() {
    this.push(
      new gulpUtil.File({
        cwd: '',
        base: '',
        path: filename,
        contents: new Buffer(string)
      })
    );
    this.push(null);
  };
  return src;
}
