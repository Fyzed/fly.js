
function $(v){
	if(typeof v == 'function'){
		return window.onload = v;
	}else if( typeof v == 'string'){
		return document.getElementById(v);
	}else if(typeof v == 'object'){
		return v;
	}
};

//获取样式 解决兼容问题
function getStyle(obj,attr){
	return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj,false)[attr];
};

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


//抖动函数的封装
//
function shake(obj,attr,endfn){
		 		var arr= [];  
				var pos = parseInt(getStyle(obj,attr)); 
				var num = 0; 
				clearInterval(obj.time);
			for(var i = 20;i>0;i-=2){
					arr.push(i,-i);

			}
				arr.push(0);  
			obj.time = setInterval(function(){ 
					obj.style[attr] = pos + arr[num] + 'px';
					num++;
					if(num == arr.length){
						clearInterval(obj.time);
						endfn&&endfn();
					}
				},50)
		 };

//获取系统时间
 
	function newDate(){
			 var timer  = new Date();
			 var year = timer.getFullYear();
			 var mon = timer.getMonth()+1;
			 var date = timer.getDate();
			 var week = timer.getDay();
			 var hour = timer.getHours();
			 var min = timer.getMinutes();
			 var sec = timer.getSeconds();
			 var str;
			 if(week==0)week="星期天";
			 if(week==1)week="星期一";
			 if(week==2)week="星期二";
			 if(week==3)week="星期三";
			 if(week==4)week="星期四";
			 if(week==5)week="星期五";
			 if(week==6)week="星期六";
			 str = year+'年'+ mon +'月'+ date +'号' + week+' '+ toTwo(hour) + ":"+ toTwo(min) + ":"+ toTwo(sec); 
			 function toTwo(n){
			  	return n<10? '0'+n : ''+n;
				  }
		   return str;
	 };


//获取当前元素到body的offsetTop和offsetLeft值

	function getPos(obj){

		var pos ={left:0,top:0};

		while(obj){
			pos.left+=obj.offsetLeft;
			pos.top+=obj.offsetTop;
			obj = obj.offsetParent;
		}
			return pos;
	};


//获取元素的className
 
 
  function getClass(parent,tagName,className){ 
	 	var allC = parent.getElementsByTagName(tagName);
	 	var arr=[]; 
	 	for(var i=0;i<allC.length;i++){
	 	 	var aClassName = allC[i].className.split(' ');
	 	 	for( var j=0;j<aClassName.length;j++){
	 	 		if(aClassName[j] == className) arr.push(allC[i]);  
	 	 	}
	 	}
	 	return arr;
	 };




//给元素添加或者移除className


	function addClass(obj,className){  
			//如果原来没有class
			if(obj.className ==" "){ 
				obj.className = className; 
			}else{
				//如果原来存在class  
				var arrClassName = obj.className.split(" ");
				var index = arrIndexOf(arrClassName,className);
				if(index ==-1)  obj.className+=" "+className; 
			}
		};
	function removeClass(obj,className){
			if(obj.className!=" "){ 
				var arrClassName = obj.className.split(" "); 
				var index = arrIndexOf(arrClassName,className);
				if(index !=-1){
					arrClassName.splice(index,1);
					obj.className = arrClassName.join(" ");
				}
			}
		} ;
	function arrIndexOf(arr,v){
			for(var i=0;i<arr.lenght;i++){
				if(arr[i]== v){
					return i;
				}else{
					return -1;
				} 
		}
	}

//event事件的绑定函数封装 可以改变ie下this的指向
 	function bind(obj,type,fn){ 
			if(obj.addEventListener){
				obj.addEventListener(type,fn,false);
			}else{
				obj.attachEvent("on"+type,function(){
					fn.call(obj);
				})
			}  
		}
