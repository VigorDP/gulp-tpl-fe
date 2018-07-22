let config = {
  author: 'yinchaofeng@sohu-inc.com',
  project: 'InkShareFe',
  src: 'src/',
  temp: 'dist/',
  dist: 'dist/',
  startPath: '/view/index.html', //自行修改
  buryPointSwitch: true, //是否埋点
  isImgOptmize: false, //是否开启图片压缩
  monitorSwitch: true,
  cdnPath: '//ink_wf.cdn.sohusce.com/club-h5/', //自行修改
  sce: {
    manageUrl: 'https://console.sce.sohuno.com/apps/versions?appid=',
    //下为四个环境 用不到的可以删掉
    dev: {
      proxyTable: {
        backend1: 'ink-club-test.sce.sohuno.com' //path to server的proxy映射，key值可以自定义
      }
    },
    test: {
      appId: 918901818, //sce的应用id
      appToken: '3f592aea565b2b738e11d9ee6eacf485', //埋点系统分配的token
      proxyTable: {
        backend1: 'ink-club-test.sce.sohuno.com',
        backend2: 'ink-club2-test.sce.sohuno.com'
      }
    },
    staging: {
      appId: 589712534, //sce的应用id
      appToken: 'd737b9d40351f68b28b065dd7fd57aa3', //埋点系统分配的token
      proxyTable: {
        backend1: 'ink-club.sce.sohuno.com',
        backend2: 'ink-club.sce.sohuno.com'
      }
    },
    product: {
      appId: 589712534, //sce的应用id
      appToken: 'd737b9d40351f68b28b065dd7fd57aa3', //埋点系统分配的token
      proxyTable: {
        backend1: 'ink-club.sce.sohuno.com',
        backend2: 'ink-club.sce.sohuno.com'
      }
    }
  }
};

module.exports = config;
