;
(function() {
	var reportUrl = 'http://10.16.27.233:3000/errorReport/?';
	var defaultSetting = {
		project: 'Ink', //错误上报msg前缀，一般用于标识业务类型
		response: 'xuefengliu@sohu-inc.com' // 项目负责人,项目出现问题会发邮件给此人
	};
	var config = function(obj) {
		Object.assign(defaultSetting, obj);
		catchAjaxError();
		catchJsError();
		catchResourceError();
	};

	// 捕获ajax错误
	var catchAjaxError = function() {
		/*默认上报的错误信息*/
		var defaults = {
			time: '', //发送数据时的时间戳
			type: 'AjaxError', //模块名,
			msg: 'ajax请求错误', //错误的具体信息,
			appInfo: navigator.appVersion,
			pageUrl: location.href,
			ajaxUrl: '',
			method: 'GET',
			status: 200,
			statusText: ''
		};

		//重写send方法,监控xhr请求
		var s_ajaxListener = new Object();
		s_ajaxListener.tempSend = XMLHttpRequest.prototype.send; //复制原先的send方法
		s_ajaxListener.tempOpen = XMLHttpRequest.prototype.open; //复制原先的open方法
		//重写open方法,记录请求的url
		XMLHttpRequest.prototype.open = function(method, url, boolen) {
			defaults.method = method
			s_ajaxListener.tempOpen.apply(this, [method, url, boolen]);
			this.ajaxUrl = url;

		};
		XMLHttpRequest.prototype.send = function(_data) {
			// 如果用了zepto这种基于XMLHttpRequest的库，需缓存onreadystatechange函数
			var temp = this.onreadystatechange;
			this.onreadystatechange = function() {
				temp();
				console.log(this.readyState);
				if (this.readyState == 4) {
					console.log(this.status);
					if (this.status >= 200 && this.status < 300) {
						console.log('abc');
						return true;
					} else {
						defaults.time = new Date().toLocaleString();
						defaults.ajaxUrl = this.ajaxUrl;
						defaults.pageUrl = location.href;
						defaults.status = this.status;
						defaults.statusText = this.statusText;
						ReportData(defaults);
					}
				}
			}
			s_ajaxListener.tempSend.apply(this, [_data]);
		};
	};
	// 捕获js错误
	var catchJsError = function() {

		window.onerror = function(msg, _url, line, col, error) {
			/*默认上报的错误信息*/
			var defaults = {
				time: '', //发送数据时的时间戳
				type: 'JsError', //模块名,
				msg: '', //错误的具体信息,
				appInfo: navigator.appVersion,
				resourceUrl: _url,
				method: 'GET',
				pageUrl: location.href,
				line: line,
				col: col
			};
			//采用异步的方式,避免阻塞
			setTimeout(function() {
				//不一定所有浏览器都支持col参数，如果不支持就用window.event来兼容
				col = col || (window.event && window.event.errorCharacter) || 0;
				if (error && error.stack) {
					//msg信息较少,如果浏览器有追溯栈信息,使用追溯栈信息
					defaults.msg = error.stack.toString();
				} else {
					defaults.msg = msg;
				}
				defaults.time = new Date().toLocaleString();
				ReportData(defaults);
			}, 0);

			// return true;   //错误不会console浏览器上,如需要，可将这样注释
		};
	};
	// 捕获资源加载错误(img,script,css,font,stationery,以及jsonp)
	var catchResourceError = function() {
		/*默认上报的错误信息*/

		window.addEventListener('error', function(e) {
			var defaults = {
				time: new Date().toLocaleString(), //发送数据时的时间戳
				type: 'ResourceError', //模块名,
				msg: '静态资源加载失败', //错误的具体信息,
				appInfo: navigator.appVersion,
				method: "GET",
				target: e.target.localName,
				name: e.type,
				resourceUrl: e.target.currentSrc,
				pageUrl: location.href
			};
			defaults.msg = e.target.localName + ' is load error';
			console.log('error', defaults.msg);
			if (e.target != window) { //抛去js语法错误
				ReportData(defaults);
			}
		}, true);
	};

	function ReportData(data) {
		var obj = Object.assign({}, defaultSetting, data);
		url = reportUrl + formatParams(obj);
		console.log('reportUrl=', url);
		new Image().src = url;
	}
	/*格式化参数*/
	function formatParams(data) {
		var arr = [];
		for (var name in data) {
			arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
		}
		return arr.join("&");
	}


	var FeMonitor = {
		config: config
	};
	if (typeof module !== "undefined" && module.exports) {
		module.exports = FeMonitor;
	} else if (typeof define === "function" && define.amd) {
		define(function() {
			return FeMonitor;
		});
	} else {
		window.FeMonitor = FeMonitor;
	}
})();