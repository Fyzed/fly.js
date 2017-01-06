
function $(v){
	if(typeof v == 'function'){
		return window.onload = v;
	}else if( typeof v == 'string'){
		return document.getElementById(v);
	}else if(typeof v == 'object'){
		return v;
	}
}

//获取样式 解决兼容问题
function getStyle(obj,attr){
	return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj,false)[attr];
}