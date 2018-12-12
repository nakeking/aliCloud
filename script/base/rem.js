;(function(win){
	var flag = isPc();
	var clientWidth = flag ? 640 : document.documentElement.clientWidth;
	var htmlEvent = document.getElementsByTagName('html')[0];
	htmlEvent.style.fontSize = clientWidth / 10 + 'px';
	win.addEventListener('resize', function(){
		flag = isPc();
		clientWidth = flag ? 640 : document.documentElement.clientWidth;
		htmlEvent.style.fontSize = clientWidth / 10 + 'px';
	})

	function isPc(){
		var userAgent = navigator.userAgent;
		var Agents = ["Android", "iPhone",
	      "SymbianOS", "Windows Phone",
	      "iPad", "iPod"];
	    var flag = true;
	    for(var i = 0; i<Agents.length; i++){
	    	if(userAgent.indexOf(Agents[i]) > 0){
	    		flag = false;
	    		break;
	    	}
	    }
	    return flag;
	}
})(window)