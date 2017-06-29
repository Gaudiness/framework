"use strict";

var VortexView = function(config){
	var _this = this,
		viewId = config.viewId,
		viewList = config.viewList;

	var viewManagement = {
		viewList: ko.observableArray([]),

		itemClick: function(data) {
			data.selected(!data.selected());
			_this.itemClick(data);
		},

		itemMouseLeave: function() {
			var list = viewManagement.viewList()
				length = list.length;

			for(var i = length - 1; i >= 0; i--){
				if(!list[i].selected())
					list[i].visible(false);
			}
		},
		showAll: function(){
			var list = viewManagement.viewList()
				length = list.length;

			for(var i = length - 1; i >= 0; i--){
				list[i].visible(true);
			}
		}
	}

	viewManagement.hasItemSelected = ko.dependentObservable(function(){
		var list = viewManagement.viewList(),
			length = list.length,
			bool = false;

		for(var i = length - 1; i >= 0; i--){
			if(list[i].selected())
				bool = true;
		}
		return bool;
	})

	_this.init = function(){
		inDom();
		inParam();
		viewBinding();
	}

	_this.itemClick = config.itemClick || function () {
		
	}

	_this.setParam = function(data){
		var list = data,
			length = list.length;
		list = ko.mapping.fromJS(data)();
		for(var i = length - 1; i >= 0; i--)
			extendAttribute(list[i]);
		viewManagement.viewList(list);
	}

	function inParam(){
		var length = viewList.length;
		viewList = ko.mapping.fromJS(viewList)();
		for(var i = length - 1; i >= 0; i--)
			extendAttribute(viewList[i]);
		viewManagement.viewList(viewList);
	}

	function inDom(){
		var $container = $('#' + viewId),
			$element;

		$element = $('<i class="iconfont" data-bind="css:{vortexViewSelected:hasItemSelected}, click:showAll">&#xe625;</i>'
						+'<div class="vortex-view-container">'
							+'<div data-bind="foreach:viewList,event:{mouseleave:$root.itemMouseLeave}">'
								+'<span data-bind="text: name,click:$root.itemClick,visible:visible,css:{vortexViewSelected:selected}"></span>'
							+'</div>'
							+'<i class="iconfont">&#xe62a;</i>'
						+'</div>');

		$container.append($element);
	}

	function viewBinding(){
		var element = document.getElementById(viewId);
		if(viewId){
			ko.cleanNode(element);
			ko.applyBindings(viewManagement, element);
		}
	}

	function extendAttribute(data){
		var attributeAdd = {
			visible: ko.observable(true)
		}
		$.extend(data, attributeAdd);
	}
}

