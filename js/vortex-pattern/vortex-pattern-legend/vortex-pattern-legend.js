"use strict";

var VortexLegend = function(config){

	if(VortexLegend.unique !== undefined ){
		return VortexLegend.unique;
	}

	var _this = this,
		legendId = config.legendId;

	var legendManagement = {
		list: ko.observableArray(),
		show: ko.observable(true),
		slideClick: function(){
			panelhide();
		}
	}

	legendManagement.slideIcon = ko.dependentObservable(function(){
		return this()?'&#xe62f;':'&#xe62e;';
	}, legendManagement.show);

	_this.init = function(){
		inDom();
		legendBinding();
	}

	_this.setParam = function(data){
		legendManagement.list(data);
	}

	function inDom(){
		var $container = $('#' + legendId),
			$element;
		$element = $('<div class="vortex-legend-btn iconfont" data-bind="html:slideIcon,click:slideClick"></div>'
					+'<div class="vortex-legend-container" data-bind="foreach:list">'
						+'<div>'
							+'<i class="iconfont" data-bind="html:icon,style:{color:color}"></i>'
							+'<div data-bind="text:name"></div>'
						+'</div>'
					+'</div>');

		$container.append($element);
	}

	function legendBinding(){
		var element = document.getElementById(legendId);
		if(legendId){
			ko.cleanNode(element);
			ko.applyBindings(legendManagement, element);
		}
	}

	function panelhide(){
		var $element = $('.vortex-legend-btn'),
			$container = $('.vortex-legend-container'),
			show = legendManagement.show;
		if(show()){
			$element.animate({ top: '67px' });
			$container.animate({ top: '98px' });
			show(false);
		}else{
			$element.animate({ top: '7px' });
			$container.animate({ top: '35px' });
			show(true);
		}
	}

	//单例模式返回值
	VortexLegend.unique = _this;
}