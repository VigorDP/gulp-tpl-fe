# gulp-template-fe
> 基于gulp的自动化构建项目模板

## 功能
+ SASS编译，错误自重启，移除冗余CSS，增量更新
+ Babel编译，ES6支持
+ eslint检查
+ CSS雪碧图
+ SVG"雪碧图"
+ 图片压缩
+ 文件组合(fileInclude)
+ 统一 npm scripts 脚本命令
+ HTML、JS、CSS合并压缩，JS自动defer,并提供sourceMap支持
+ 静态资源(JS,CSS,Image)加MD5戳防缓存
+ Zip支持
+ 本地开发，实时刷新
+ 自动埋点
+ 更多...(提取关键CSS，CSS异步加载等)


## 使用方式：
```javascript
//0、安装依赖
npm install //安装失败时，可以多install几次，或者删掉node_modules重新install，mac尝试使用sudo npm install
//1、本地开发
npm run dev
//2、打测试环境包
npm run build-test                         //静态资源放服务器本地
//3、打生产环境包
npm run build-product               //静态资源放服务器本地
npm run build-product-cdn         //静态资源放CDN
```

## 文件结构

>生成该结构命令为：treer -i "/(\.git|node_modules)/" -e tree.md

```html
├─gulpfile.js
├─package.json
├─README.md
├─temp                              //与src文件夹对应，存放ES6，SASS，HTML(含公用模板)编译后的文件
|  ├─view
|  |  └index.html
|  ├─static
|  |   ├─js
|  |   | ├─index.js
|  |   | ├─lib
|  |   | |  ├─doT.min.js
|  |   | |  ├─vconsole-elements.min.js
|  |   | |  ├─vconsole-resources.min.js
|  |   | |  ├─vconsole.min.js
|  |   | |  └zepto.min.js
|  |   | ├─common
|  |   | |   └util.js
|  |   ├─css
|  |   |  ├─index.css
|  |   |  ├─common
|  |   |  |   ├─base.css
|  |   |  |   └common.css
├─src                               //源文件，推荐使用ES6，SASS，HTML模板等写法
|  ├─view
|  |  └index.html
|  ├─static
|  |   ├─template
|  |   |    ├─common
|  |   |    |   ├─css.html
|  |   |    |   ├─mixpanel-product.html
|  |   |    |   ├─mixpanel-test.html
|  |   |    |   └vconsole.html
|  |   ├─scss
|  |   |  ├─index.scss
|  |   |  ├─common
|  |   |  |   ├─base.scss
|  |   |  |   └common.scss
|  |   ├─img
|  |   ├─es6
|  |   |  ├─index.js
|  |   |  ├─lib
|  |   |  |  ├─doT.min.js
|  |   |  |  ├─vconsole-elements.min.js
|  |   |  |  ├─vconsole-resources.min.js
|  |   |  |  ├─vconsole.min.js
|  |   |  |  └zepto.min.js
|  |   |  ├─common
|  |   |  |   └util.js
├─gulp         // gulp 任务结合，分common task 和 custom task，custom下可自行添加特定业务类task
|  ├─tasks
|  |   ├─custom
|  |   |   ├─cssSprite.js
|  |   |   ├─px2rem.js
|  |   |   └sceInit.js
|  |   ├─common
|  |   |   ├─cdnPre.js
|  |   |   ├─cssMin.js
|  |   |   ├─delRedundant.js
|  |   |   ├─devServer.js
|  |   |   ├─ES6.js
|  |   |   ├─eslint.js
|  |   |   ├─fileInclude.js
|  |   |   ├─htmlMin.js
|  |   |   ├─imgMin.js
|  |   |   ├─jsMin.js
|  |   |   ├─revision.js
|  |   |   ├─sass.js
|  |   |   ├─usemin.js
|  |   |   └zip.js
├─dist                              //打包后的文件夹，与temp文件夹对应
|  ├─sce_918901818.zip
|  ├─sce
|  |  ├─app.yaml
|  |  ├─conf
|  |  |  ├─nginx_server.inc
|  |  |  └uwsgi.ini
|  |  ├─app
|  |  |  ├─view
|  |  |  |  └index.html
|  |  |  ├─static
|  |  |  |   ├─js
|  |  |  |   | └main.70b5.js
|  |  |  |   ├─css
|  |  |  |   |  └main.6017.css
├─config.js        // 特定项目相关的配置文件，如后端服务域名等

```
## 注意点
+ uncss无法监听到js文件中动态添加的类名，所以当js文件操作了类名A，同时不希望uncss删掉A，需要在uncss中配置ignore选项，如：

```javascript
gulp.task('default', function () {
    return gulp.src('styles/**/*.scss')
        .pipe(sass())
        .pipe(concat('main.css'))
        .pipe(uncss({
            html: ['index.html', 'posts/**/*.html', 'http://example.com'],
            ignore:['.A']
        }))
        .pipe(nano())
        .pipe(gulp.dest('./out'));
});
```
+ 本模板默认只有js、css、img三种静态资源，如需添加新资源，如font等，请自行添加task

## 维护须知
+ 新增gulp任务时，引入的插件名请遵循驼峰式结构，且使用gulp插件的全称形式，如gulp-rev-all，应该取名:

```javascript
// good
let gulpRevAll=require('gulp-rev-all');
// bad
revAll=require('gulp-rev-all');
```

+ 给每个新增的task写上注释

## 一些基础帮助
### gulp文件选择
关于gulp文件选择中用的glob，详细文档参考：https://github.com/isaacs/node-glob
```
a/**
a/**/**
a/**/*
```
如果无法区分以上三个的区别的话，请在写gulp之前，务必看下上述文档。


## Help
@冯银超(yinchaofeng@sohu-inc.com)
@柳学峰(xuefengliu@sohu-inc.com)