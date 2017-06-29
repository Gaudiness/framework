"use strict";

var VortexToolsTimer = function(config){
	var _this = this,
		timerId = config.timerId,
		timeInterval;

	var timerManagement = {
		timerTime: ko.observable('2016-11-11 11:44:18'),
	}

	_this.init = function(){
		inDom();
		timerBinding();
		setTime();
		setTimeInterval();
	}

	function setTime(){
		var date = new Date().Format("yyyy-MM-dd hh:mm:ss");
		timerManagement.timerTime(date);
	}

	function setTimeInterval(){
		timeInterval = setInterval(function(){
			setTime();
		}, 1000);
	}

	function inDom(){
		var $container = $('#' + timerId),
			$element;
		$element = $('<span data-bind="text:timerTime"></span>');
		$container.append($element);
	}

	function timerBinding(){
		var element = document.getElementById(timerId);
		if(timerId){
			ko.cleanNode(element);
			ko.applyBindings(timerManagement, element);
		}
	}

	//添加日期格式化方法。
	Date.prototype.Format = function (fmt) { 
	    var o = {
	        "M+": this.getMonth() + 1, //月份 
	        "d+": this.getDate(), //日 
	        "h+": this.getHours(), //小时 
	        "m+": this.getMinutes(), //分 
	        "s+": this.getSeconds(), //秒 
	        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
	        "S": this.getMilliseconds() //毫秒 
	    };

	    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))
		    for (var k in o)
		    	if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));

		return fmt;
	}
}

// 下拉列表
var VortexToolsDropdown = function(config){
	var _this = this,
		dropDownId =  config.dropDownId,
		dropList = config.data;

	var dropDownManagement = {
		name: ko.observable('hahha'),
		visible: ko.observable(false),
		list: ko.observableArray([]),
		showPanel: function(){
			dropDownManagement.visible(!dropDownManagement.visible());
			_this.showPanel();
		},
		changeSelected: function(data){
			var list = dropDownManagement.list(),
				length = list.length;
			dropDownManagement.name(data.name());
			dropDownManagement.visible(!dropDownManagement.visible());
			_this.itemClick(ko.mapping.toJS(data));

			for(var i = length - 1; i >= 0; i--)
				list[i].selected(false);
			data.selected(true);

		}
	}

	dropDownManagement.icon = ko.dependentObservable(function(){
		return this.visible()?'&#xe60c;': '&#xe609;';
	}, dropDownManagement);

	_this.init = function(){
		inDom();
		inParam();
		dropDownBinding();
	}

	_this.setParam = function(data){
		var data = ko.mapping.fromJS(data)(),
			length = data.length;
		for(var i = 0; i < length; i++)
			extendAttribute(data[i]);
		if(length > 0){
			dropDownManagement.list(data);
			dropDownManagement.list()[0].selected(true);
			dropDownManagement.name(dropDownManagement.list()[0].name())
		}
	}

	_this.itemClick = config.itemClick || function(){

	}

	//暴露给外部的显示方法
	_this.show = function(){
		dropDownManagement.visible(true);
	}

	//暴露给外部的隐藏方法
	_this.hide = function(){
		dropDownManagement.visible(false);
	}

	//暴露给外部的销毁方法
	_this.dispose = function(){

	}

	_this.showPanel = config.showPanel || function(){

	}

	function inParam(){
		var length = dropList?dropList.length:0;

		dropList = ko.mapping.fromJS(dropList)();
		
		for(var i = length - 1;i >= 0; i--)
			extendAttribute(dropList[i]);
		// if(length > 0){
		// 	dropDownManagement.list(dropList);
		// 	var bool = true;
		// 	for(var i = length - 1; i >= 0; i--){
		// 		if(dropList[i].selected()){
		// 			dropDownManagement.name(dropList[i].name());
		// 			bool = false;
		// 			break;
		// 		}
		// 	}
		// 	if(bool){
		// 		dropDownManagement.name(dropList[0].name());
		// 		dropList[0].selected(true)
		// 	}
		// }
		if(length > 0){
			dropDownManagement.list(dropList);
			dropDownManagement.list()[0].selected(true);
			dropDownManagement.name(dropDownManagement.list()[0].name())
		}
	}

	function extendAttribute(data){
		var attributeAdd = {
			selected: ko.observable(false)
		}
		$.extend(data, attributeAdd);
	}

	function inDom(){
		var $container = $('#' + dropDownId),
			$element;
		$element = $('<div data-bind="click:showPanel,css:{vorteToolsSelected:visible}">'
						+'<span data-bind="text:name"></span>'
						+'<i class="iconfont" data-bind="html: icon"></i>'
					+'</div>'
					+'<div class="vortex-dropdown-panel" data-bind="visible: visible, foreach:list">'
						+'<div data-bind="text:name, click:$root.changeSelected,css:{vorteToolsSelected:selected}"></div>'
					+'</div>');
		$container.append($element);
	}

	function dropDownBinding(){
		var element = document.getElementById(dropDownId);
		if(dropDownId){
			ko.cleanNode(element);
			ko.applyBindings(dropDownManagement, element);
		}
	}
}

// 下拉按钮
var VortexToolsBtn = function(config){
	var _this = this,
		btnId = config.btnId,
		btnList = config.data,
		name = config.name;

	var  btnManagement = {
		name: ko.observable('小工具'),
		icon: ko.observable('&#xe609;'),
		visible: ko.observable(false),
		btnList: ko.observableArray(),
		showPanel: function(){
			btnManagement.visible(!btnManagement.visible());
			_this.showPanel();
		},

		itemClick: function(data){
			data.selected(!data.selected());
			btnManagement.visible(false);
			_this.itemClick(data);
		}
	}

	btnManagement.icon = ko.dependentObservable(function(){
		return this.visible()?'&#xe60c;': '&#xe609;';
	}, btnManagement);

	_this.init = function(){
		inDom();
		inParam();
		btnBinding();
	}

	//暴露给外部的显示方法
	_this.show = function(){
		btnManagement.visible(true);
	}

	//暴露给外部的隐藏方法
	_this.hide = function(){
		btnManagement.visible(false);
	}

	//暴露给外部的销毁方法
	_this.dispose = function(){

	}

	_this.itemClick = config.itemClick || function(){

	}

	_this.setParam = function(data){
		//dosomething
	}

	_this.itemClick = config.itemClick || function(){
		
	}

	function inParam(){
		btnManagement.name(name);

		extendAttribute(btnList);
	}

	_this.showPanel = config.showPanel || function(){
		// console.log('adfafd');
	}

	function inDom(){
		var $container = $('#' + btnId),
			$element;
		$element = $('<div data-bind="click:showPanel,css:{vorteToolsSelected:visible}">'
						+'<span data-bind="text:name"></span>'
						+'<i class="iconfont" data-bind="html: icon"></i>'
					+'</div>'
					+'<div class="btnContainer" data-bind="visible:visible, foreach: btnList">'
						+'<label class="iconfont" data-bind="html:icon,css:{ vortexToolsSelected:selected},click:$root.itemClick"></label>'
					+'</div>');
		$container.append($element);
	}

	function btnBinding(){
		var element = document.getElementById(btnId);
		if(btnId){
			ko.cleanNode(element);
			ko.applyBindings(btnManagement, element);
		}
	}

	function extendAttribute(data){
		// data
		var length = data.length;
		btnManagement.btnList([]);
		for(var i = length - 1; i >= 0; i--){
			var attributeAdd = {
				icon: ko.observable(data[i]),
				selected: ko.observable(false)
			}
			btnManagement.btnList.push(attributeAdd);
		}
	}
}

//带面板的小工具
var VortexToolsPanel = function(config){
	var _this = this,
		panelId = config.panelId,
		name = config.name,
		panelList = config.data;

	var panelMangement ={
		name: ko.observable('小工具'),
		icon: ko.observable(),
		list: ko.observableArray([]),
		visible: ko.observable(false),
		showPanel: function(){
			panelMangement.visible(!panelMangement.visible());
			_this.showPanel();
		},
		itemClick: function(data){
			panelMangement.visible(!panelMangement.visible());
			_this.itemClick(data);
			data.selected(!data.selected());
		}
	}

	panelMangement.icon = ko.dependentObservable(function(){
		return this.visible()?'&#xe60c;': '&#xe609;';
	}, panelMangement);

	_this.init = function(){
		inDom();
		inParam();
		panelBinding();
	}

	//暴露给外部的显示方法
	_this.show = function(){
		panelMangement.visible(true);
	}

	//暴露给外部的隐藏方法
	_this.hide = function(){
		panelMangement.visible(false);
	}

	//暴露给外部的销毁方法
	_this.dispose = function(){

	}

	_this.setParam = function(data){
		var list = ko.mapping.fromJS(data)(),
			length = list.length;
		for(var i = length - 1; i >= 0; i--)
			extendAttribute(list[i]);
		panelMangement.list(list);
	}

	_this.setSelectedFalse = function(data){
		var list = panelMangement.list(),
			length = list.length;
		for(var i = length - 1; i >= 0; i--){
			if(list[i].id() === data.id()){
				list[i].selected(false);
			}
		}
	}

	_this.showPanel = config.showPanel || function(){

	}

	_this.itemClick = config.itemClick || function(){

	}

	function inParam(){
		var length = panelList?panelList.length:0;
		panelList = ko.mapping.fromJS(panelList)();
		for(var i = length - 1; i >= 0; i--)
			extendAttribute(panelList[i]);
		panelMangement.name(name);
		panelMangement.list(panelList);
	}

	function inDom(){
		var $container = $('#' + panelId),
			$element;
		$element = $('<div data-bind="click:showPanel,css:{vorteToolsSelected:visible}">'
						+'<span data-bind="text:name"></span>'
						+'<i class="iconfont" data-bind="html: icon"></i>'
					+'</div>'
					+'<div class="vortex-dropdown-panel" data-bind="visible: visible, foreach:list">'
						+'<div data-bind="text:name,click:$root.itemClick,css:{vorteToolsSelected:selected}"></div>'
					+'</div>');
		$container.append($element);
	}

	function panelBinding(){
		var element = document.getElementById(panelId);
		if(panelId){
			ko.cleanNode(element);
			ko.applyBindings(panelMangement, element);
		}
	}

	function extendAttribute(data){
		var attributeAdd = {
			selected: ko.observable(false),
		}

		$.extend(data, attributeAdd);
	}
}


var VortexToolsContainer = function(config){
	var _this = this,
		containerId = config.containerId;

	var containerManagement = {
		list: ko.observableArray([]),

		removePanel: function(data){
			_this.removePanel(data)
			containerManagement.list.remove(data);
		}
	}

	_this.init = function(){
		inDom();
		containerBinding();
	};

	_this.addPanel = function(data){
		var list = containerManagement.list,
			length = list().length,
			bool = true,
			index,
			panel = {
				title: data.name?data.name:'暂无标题',
				visible: ko.observable(true),
				id: data.id
			};
		for(var i = length - 1; i >= 0; i--){
			if(list()[i].id() === data.id()){
				bool = false;
				index = i;
				break;
			}
		}
		if(bool){
			list.push(panel);
		}else{
			list()[index].visible(!list()[index].visible());
		}
	}

	function inDom(){
		var $container = $('#' + containerId),
			$element;
		$element = $('<!-- ko foreach: list -->'
					+'<div data-bind="visible:visible">'
						+'<div class="vortex-toolpanel-item">'
							+'<div class="vortex-toolpanel-title">'
								+'<span data-bind="text:title"></span>'
								+'<i class="iconfont" data-bind="click:$root.removePanel">&#xe62b;</i>'
							+'</div>'
							+'<div class="vortex-toolpanel-container" data-bind="attr:{id:id}"></div>'
						+'</div>'
					+'</div>'
					+'<!-- /ko --> ');
		$container.append($element);
	}

	function containerBinding(){
		var element = document.getElementById(containerId);
		if(containerId){
			ko.cleanNode(element);
			ko.applyBindings(containerManagement, element);
		}
	}

	_this.removePanel = config.removePanel || function(){

	}

}