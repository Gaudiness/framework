"use strict";

var VortexCover = function(config){

	if( VortexCover.unique !== undefined ){
		return VortexCover.unique;
	}

	var _this = this,
		coverId = config.coverId,
		type = config.type;


	var coverManagement = {
		visible: ko.observable(false),
		src: ko.observable(),

		closeIframe: function(){
			coverManagement.visible(false);
		}
	}

	_this.init = function(){
		inDom();
		coverBinding();
	}

	//暴露给外部的显示方法
	_this.show = function(data){
		coverManagement.src(data);
		coverManagement.visible(true);
	}

	//暴露给外部的隐藏方法
	_this.hide = function(){
		coverManagement.visible(false);
	}

	//暴露给外部的销毁方法
	_this.dispose = function(){

	}

	_this.setSrc = function(data){
		coverManagement.src(data)
	}

	function inDom(){
		var $container = $('#' + coverId),
			$element;
		$element = $('<div class="vortex-cover" data-bind="visible:visible"></div>');
		$container.append($element);

		if(!type){
			$container = $element;
			$element = $('<div>'
							+'<iframe data-bind="attr:{ src: src }"></iframe>'
							+'<i class="iconfont" data-bind="click:closeIframe">&#xe62b;</i>'
						+'</div>')
			$container.append($element);
		}
	}

	function coverBinding(){
		var element = document.getElementById(coverId);
		if(coverId){
			ko.cleanNode(element);
			ko.applyBindings(coverManagement, element);
		}
	}

	VortexCover.unique = _this;
}