;(function(win){
	var body = document.body;
	var style = "max-width: 640px; margin: 0 auto; overflow: hidden; height: 100%";
	var style2 = "max-width: 640px; margin: 0 auto;";
	stopTouchend();
	/*
	*	产品列表事件绑定
	 */
	var ulist = document.getElementById('ulist');
	var expanders = document.getElementsByClassName('expander');
	var eheightList = [];
	for(let i = 0; i < expanders.length; i++){
		eheightList.push(expanders[i].offsetHeight);
		expanders[i].dataset.index= i;
		expanders[i].style.cssText = "height: 0";
	}

	var clickEvent = isPc();

	$(ulist).on(clickEvent, function(e){
		var item = e.target.parentNode.parentNode;
		if(item.getAttribute('data-show')){
			var ishow = item.getAttribute('data-show') === "false" ? false : true;
			var expander = e.target.parentNode.nextElementSibling;
			var index = expander.getAttribute('data-index');
			if(!ishow){
				expander.style.cssText = "height:" + eheightList[index] + "px";
				item.dataset.show = true;
			}else{
				expander.style.cssText = "height: 0";
				item.dataset.show = false;
			}
		}
	});

	/*
	*	更多事件绑定
	 */
	var modules = document.getElementsByClassName('more-box');
	var moreModule = document.getElementById('more-module');
	var moreButton = document.getElementById('more-button');
	var more = document.getElementById('more');

	var mheightList = [];
	for(let i =0; i < modules.length; i++){
		mheightList.push(modules[i].offsetHeight);
		modules[i].dataset.index =  i;
		modules[i].style.cssText = 'height: 0';
	}
	$(moreModule).addClass('moduleHide');

	$(moreButton).on(clickEvent, function(e){
		if(moreModule.getAttribute('data-show') === "false"){
			moreModule.classList.remove('moduleHide');
			moreModule.classList.add('moduleShow');
			moreModule.dataset.show = true;
			setTimeout(function(){
				more.classList.remove('hide');
				more.classList.add("show");
			}, 10)
			body.style.cssText = style;
		}
	})

	$(moreModule).on(clickEvent, function(e){
		var event = e.target;
		if(event.getAttribute('id') === "more-module"){
			moreModule.classList.remove('moduleShow');
			moreModule.classList.add('moduleHide');
			moreModule.dataset.show = false;
			setTimeout(function(){
				more.classList.remove('show');
				more.classList.add("hide");
			}, 10);
			body.style.cssText = style2;
		}else{
			var item = e.target.parentNode.parentNode;
			if(item.getAttribute('data-show')){
				var isshow = item.getAttribute('data-show') === "false" ? false : true;
				var moreItem = e.target.parentNode.nextElementSibling;
				var index = moreItem.getAttribute('data-index');
				if(!isshow){
					moreItem.style.cssText = "height: " + mheightList[index] + "px";
					item.dataset.show = true;
				}else{
					moreItem.style.cssText = 'height: 0';
					item.dataset.show = false;
				}
			}
		}
	})

	function isIE(){
		if(!!window.ActiveXObject || "ActiveXObject" in window){
			return true;
		}else{
			return false;
		}
	}

	function isPc(){
		if('ontouchstart' in document.documentElement === true){
			return 'touchend';
		}else{
			return 'click';
		}
	}

	/*
	*	页面滚动停止touchend事件冒泡
	 */
	function stopTouchend(){
		var locked = false;
		window.addEventListener('touchmove', function(e){
			locked || (locked = true, window.addEventListener('touchend', stopTouchendPropagation, true))
		}, true);

		function stopTouchendPropagation(e){
			e.stopPropagation();
			window.removeEventListener('touchend', stopTouchendPropagation, true);
			locked = false;
		}
	}
})(window)

