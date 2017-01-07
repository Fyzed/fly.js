
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

//简单的运动框架

function doMove(obj,attr,dir,target,endfn){   
		dir = parseInt(getStyle(obj,attr)) < target? dir : -dir;
		clearInterval(obj.timer); 
		obj.timer = setInterval(function(){  
		 var speed = parseInt(getStyle(obj,attr)) +dir;  
		 if( speed > target && dir > 0  || speed < target && dir<0){ 
				speed=target;
			}  
		 if(speed == target){ 
		  clearInterval(obj.timer);
		  endfn && endfn();
		 }
		  obj.style[attr] = speed+'px';
		},50)
	};