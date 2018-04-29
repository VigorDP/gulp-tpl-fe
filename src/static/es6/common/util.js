const getQS = event => {
	var e = new RegExp("(^|&)" + event + "=([^&]*)(&|$)");
	var n = decodeURIComponent(window.location.search.substr(1)).match(e);
	return null !== n ? n[2] : null;
};
const openLink = url => {
	var e = document.createEvent('MouseEvent');
	var aTag = document.createElement('a');
	e.initEvent('click', false, false);
	aTag.setAttribute('href', url);
	// document.body.appendChild(aTag); // 遇上兼容问题在放开
	aTag.dispatchEvent(e);
	aTag.remove();
};
const formatTime = timeStamp => { //timeStamp是unix时间戳
	if (timeStamp) {
		var o = new Date(timeStamp * 1000);
		return o.getFullYear() + '年' + (o.getMonth() + 1) + '月' + o.getDate() + '日';
	}
};
const isPC = () => {
	var userAgentInfo = navigator.userAgent;
	var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
	var flag = true;
	for (var v = 0; v < Agents.length; v++) {
		if (userAgentInfo.indexOf(Agents[v]) > 0) {
			flag = false;
			break;
		}
	}
	return flag;
}

export {
	isPC,
	getQS,
	openLink,
	formatTime
};