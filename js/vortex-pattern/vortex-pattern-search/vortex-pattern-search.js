"use strict";

//存放实例的容器。
var vortexContainer = vortexContainer || {
	vortexSearchCount: [],
	vortexSearchList: [],
	vortexSearchCondition: [],
	vortexSearchSelected: [],
	vortexSearchDetails: []
};

//搜索控件
var VortexSearchArea = function(config){
	var _this = this,
		searchId = config.searchId;

	var searchManagement = {
		searchVal: ko.observable(),

		closeVisible: ko.observable(false),

		inputFoucs: function(){
			searchManagement.closeVisible(true);
			_this.focus();
		},

		closeClick: function(){
			searchManagement.searchVal();
			searchManagement.closeVisible(false);
			searchManagement.searchVal('');
			_this.closeClick();
		},

		searchBtnClick: function(){
			var data = searchManagement.searchVal();
			_this.searchClick(data);
		}

	}

	_this.init = function(){
		inDom();
		searchBinding();
	}

	_this.focus = config.focus || function(){

	}

	//公有的自定义关闭按钮点击事件
	_this.closeClick = config.closeClick || function(){

	}

	//公有的自定义搜索按钮点击事件
	_this.searchClick = config.searchClick || function(){

	}

	//公有的设置搜索框值的方法
	_this.setInputVal = function(data){
		searchManagement.searchVal(data);
	}
	
	//公有的获取搜索框值的方法
	_this.getInputVal = function(){
		return searchManagement.searchVal();
	}

	//私有的绑定方法
	function searchBinding(){
		var element = document.getElementById(searchId);
		if(searchId){
			ko.cleanNode(element);
			ko.applyBindings(searchManagement, element);
		}
	}

	function inDom(){
		var $container = $('#' + searchId),
			$element;

		$element = $('<div>'
						+'<input data-bind="event: { focus: inputFoucs }, value:searchVal" placeholder="搜设施，查车辆，查人员">'
						+'<i class="iconfont" data-bind="visible: closeVisible, click: closeClick">&#xe62b;</i>'
					+'</div>'
					+'<i class="iconfont" data-bind="click: searchBtnClick">&#xe627;</i>')
		$container.append($element);
	}
}

//搜索面板的切换页签
var VortexPanelTabs = function(config){
	if( VortexPanelTabs.unique !== undefined ){
		return VortexPanelTabs.unique;
	}

	var _this = this,
		tabsId = config.tabsId;

	var tabsManagement = {
		content: ko.observableArray([]),

		selectedIndex: ko.observable(0),

		tabsIndex: ko.observable(),

		visible: ko.observable(true),
		
		//页签点击事件
		itemClick: function(data){
			var index = tabsManagement.selectedIndex,
				tabsIndex = tabsManagement.tabsIndex,
				indexFormer = tabsIndex();
			if(data.index() != index()){
				index(data.index());
				tabsIndex(data.tabsIndex);
			}
		}

	}

	tabsManagement.tabsIndex.subscribe(function(status){
		_this.changeSeletedTab(status, _this);
	});

	//控件的入口
	_this.init = function(){
		inDom();
		tabBingding();
	}

	//暴露给外部的显示方法
	_this.show = function(){
		tabsManagement.visible(true);
	}

	//暴露给外部的隐藏方法
	_this.hide = function(){
		tabsManagement.visible(false);
	}

	//暴露给外部的销毁方法
	_this.dispose = function(){

	}

	_this.getTabsIndex = function(){
		return tabsManagement.tabsIndex();
	}

	_this.showTabsArray = function(data){
		var list = tabsManagement.content(),
			length = list.length,
			dLength = data.length;

		for(var i = length - 1; i >= 0; i--){
			list[i].visible(false);
			for(var j = dLength - 1; j >= 0; j--){
				if(list[i].name() == data[j]){
					list[i].visible(true);
					break;
				}
			}
		}

		for(var i = 0; i < length; i ++){
			if(list[i].visible()){
				tabsManagement.selectedIndex(i);
				tabsManagement.tabsIndex(list[i].tabsIndex);
				break;
			}
		}
	}

	//私有的绑定方法
	function tabBingding(){
		var element = document.getElementById(tabsId);
		if(tabsId){
			ko.cleanNode(element);
			ko.applyBindings(tabsManagement, element);
		}
	}

	_this.addTabs = function(data){
		var attibuteAdd = {
			name: ko.observable(data.name),
			icon: ko.observable(data.icon),
			index: ko.observable(tabsManagement.content().length),
			visible: ko.observable(data.visible),
			tabsIndex: data.tabsIndex
		}

		tabsManagement.content.push(attibuteAdd);

		if(!tabsManagement.tabsIndex()){
			tabsManagement.tabsIndex(data.tabsIndex);
		}
	}

	_this.changeSeletedTab = config.changeSeletedTab || function(){

	}

	//私有的添加dom的方法
	function inDom(){
		var $container = $('#' + tabsId),
			$element;

		$element = $('<div data-bind="foreach:content, visible:visible">'
						+'<div class="vortex-newPanel-item" data-bind="css:{vortexNewPanelSelected:$root.selectedIndex()==$index()},click:$root.itemClick,visible:visible">'
							+'<i class="iconfont" data-bind="html:icon"></i>'
							+'<span data-bind="text:name"></span>'
						+'</div>'
					+'</div>');

		$container.append($element);
	}

	//单例模式返回值
	VortexPanelTabs.unique = _this;
}

// 搜索面板的数量控件
var VortexSearchCount = function(config){
	var _this = this,
		countId = config.countId,
		tabsIndex = config.tabsIndex;

	var countManagement = {

		visible: ko.observable(false),

		countFirst: ko.observable(0),

		firstClick: function(){
			_this.firstClick();
		},

		countSecond: ko.observable(0),

		secondClick: function(){
			_this.secondClick();
		},

		countThird: ko.observable(0),

		thirdClick: function(){
			_this.thirdClick();
		},
		
		countForth: ko.observable(0),

		forthClick: function(){
			_this.forthClick();
		},
	}

	_this.init = function(){
		countBinding();
	}

	//暴露给外部的显示方法
	_this.show = function(){
		countManagement.visible(true);
	}

	//暴露给外部的隐藏方法
	_this.hide = function(){
		countManagement.visible(false);
	}

	//暴露给外部的销毁方法
	_this.dispose = function(){

	}

	_this.setCount = function(data){
		var list = data,
			length = list.length;
		for(var i = 0; i < length; i++){
			if(i === 0)
				countManagement.countFirst(data[i]);
			else if(i === 1)
				countManagement.countSecond(data[i]);
			else if(i === 2)
				countManagement.countThird(data[i]);
			else if(i === 3)
				countManagement.countForth(data[i]);
		}
	}

	function inDOM(){

	}

	// 私有的绑定方法
	function countBinding(){
		var element = document.getElementById(countId)
		if(countId){
			ko.cleanNode(element);
			ko.applyBindings(countManagement, element);
		}
	}

	_this.firstClick = config.firstClick || function(){

	}

	_this.secondClick = config.secondClick || function(){

	}

	_this.thirdClick = config.thirdClick || function(){

	}

	_this.forthClick = config.forthClick || function(){

	}

	vortexContainer.vortexSearchCount.push({
		tabsIndex: tabsIndex,
		obj: this	
	});
}

//搜索列表控件
var VortexSearchList = function(config){
	var _this = this,
		listId = config.listId || '',
		type = config.type || '',
		data = config.data || '',
		tabsIndex = config.tabsIndex || '';

	var listManagement = {
		visible: ko.observable(false),
		list: ko.observableArray([]),

		showDetails: function(data){
			_this.showDetails(_this, data);
		},
	}

	_this.init = function(){
		inDom();
		listIdBindings();
	}

	_this.showDetails = config.showDetails || function(){

	}

	// 暴露给外部的显示方法
	_this.show = function(){
		listManagement.visible(true);
	}

	// 暴露给外部的隐藏方法
	_this.hide = function(){
		listManagement.visible(false);
	}

	// 暴露给外部的销毁方法
	_this.dispose = function(){
		
	}

	function inDom(){
		var $container = $('#' + listId),
			$element;

		if(type === 'noTitle'){
			$element = $('<div data-bind="foreach:list, visible:visible">'
							+'<div class="vortex-list-one" data-bind="click:$root.showDetails">'
								+'<img data-bind="attr:{ src:photos }">'
								+'<div>'
									+'<div data-bind="text:typeName"></div>'
									+'<div data-bind="text:companyName"></div>'
									+'<div>'
										+'<div class="vortex-line-title">车牌号码：</div>'
										+'<div class="vortex-line-value" data-bind="text:carCode"></div>'
									+'</div>'
									+'<div>'
										+'<div class="vortex-line-title">排班时间：</div>'
										+'<div class="vortex-line-value" data-bind="text:scheduleTime,attr:{title:scheduleTime}"></div>'
									+'</div>'
								+'</div>'
							+'</div>'
						+'</div>');
		}else if(type === 'withTitle'){
			$element = $('<div data-bind="foreach:list, visible:visible">'
							+'<div class="facility-list-item" data-bind="click:$root.showDetails">'
								+'<div data-bind="text:title"></div>'
								+'<div class="vortex-facility-bottom">'
									+'<img>'
									+'<div>'
										+'<div>'
											+'<span class="vortex-line-title">类型：</span>'
											+'<span class="vortex-line-value" data-bind="text:type"></span>'
										+'</div>'
										+'<div>'
											+'<span class="vortex-line-title">地址：</span>'
											+'<span class="vortex-line-value" data-bind="text:address,attr:{title:address}"></span>'
										+'</div>'
										+'<div>'
											+'<span class="vortex-line-title">服务时间：</span>'
											+'<span class="vortex-line-value" data-bind="text:service"></span>'
										+'</div>'
									+'</div>'
								+'</div>'
							+'</div>'
						+'</div>')
		}else if(type === 'noPic'){
			$element = $('<div data-bind="visible:visible, foreach:list">'
							+'<div class="vortex-person-line" data-bind="click:$root.showDetails">'
								+'<div class="vortex-person-title">'
									+'<span data-bind="text:area">工业园区</span>'
									+'<span data-bind="text:company">公司A</span>'
								+'</div>'
								+'<div>'
									+'<span class="vortex-person-label">人员姓名:</span>'
									+'<span class="vortex-person-value" data-bind="text:name">高X</span>'
								+'</div>'
								+'<div>'
									+'<div class="vortex-person-label">排班时间：</div>'
									+'<div class="vortex-person-value">'
										+'<div data-bind="visible:dayShift()">'
											+'<span class="color-0099ff" data-bind="text:dayShift">8:00-18:00</span>'
											+'<span>(日常班)</span>'
										+'</div>'
										+'<div data-bind="visible:nightShift()">'
											+'<span class="color-0099ff" data-bind="text:nightShift">19:00-23:00</span>'
											+'<span>(晚班)</span>'
										+'</div>'
									+'</div>'
								+'</div>'
							+'</div>'
						+'</div>');
		}

		$container.append($element);
	}

	_this.setParam = function(data){
		listManagement.list(ko.mapping.fromJS(data)());
	}

	// 私有的条件面板绑定方法
	function listIdBindings(){
		var element = document.getElementById(listId);
		if(listId){
			ko.cleanNode(element);
			ko.applyBindings(listManagement, element);
		}
	}

	vortexContainer.vortexSearchList.push({
		tabsIndex: tabsIndex,
		obj: this	
	});
}

//搜索条件控件
var VortexSearchCondition = function(config){
	var _this = this,
		type = config.type,
		conditionId = config.conditionId,
		tabsIndex = config.tabsIndex || '';

	var conditionManagement = {
		list:ko.observableArray(),

		subList: ko.observableArray(),

		conditionVisible: ko.observable(false),

		checked: ko.observable(),

		top: ko.observable(),

		index: ko.observable(),

		submit: function(data){
			var list = ko.mapping.toJS(conditionManagement.selectedItem());
			_this.submit(list, conditionManagement.selectedString(), data.index());

			conditionManagement.conditionVisible(false);
		},

		empty: function(){
			setAllFalse(conditionManagement.list());
		},

		changeSelected: function(data){
			var list = conditionManagement.list(),
				length = list.length;
			for(var i = length-1; i >= 0; i--){
				list[i].selected(false);
			}
			data.selected(true);

			conditionManagement.subList(data.item());

			$.extend(conditionManagement, { checked: data.checked });
			containerEmpty();
			inDom();
			conditionBindings();
		}
	}
	
	conditionManagement.selectedItem = ko.dependentObservable(function(){
		var list = this,
			length = list().length,
			arr = [];
		for(var i = length - 1; i >= 0; i--){
			if(list()[i].hasItemSelected && list()[i].hasItemSelected())
				arr.push(list()[i]);
			else if(list()[i].checked())
				arr.push(list()[i])
		}
		return arr;
	}, conditionManagement.list);

	conditionManagement.selectedString = ko.dependentObservable(function(){
		var selectedItem = this,
			list = [],
			length = selectedItem().length;

		for(var i = 0; i < length; i++){
			list.push(selectedItem()[i].name());
		}

		return list.join();

	}, conditionManagement.selectedItem);

	_this.init = function(){
		// inDom();
	}

	//暴露给外部的显示方法
	_this.show = function(){
		conditionManagement.conditionVisible(true);
	}

	//暴露给外部的隐藏方法
	_this.hide = function(){
		conditionManagement.conditionVisible(false);
	}

	//暴露给外部的销毁方法
	_this.dispose = function(){
		
	}

	_this.getSelectedItem = function(){
		var list = ko.mapping.toJS(conditionManagement.selectedItem());
		return list;
	}

	// 私有的条件面板绑定方法
	function conditionBindings(){
		var element = document.getElementById(conditionId);
		if(conditionId){
			ko.cleanNode(element);
			ko.applyBindings(conditionManagement, element);
		}
	}

	function containerEmpty(){
		$('#' + conditionId).empty();
	}

	//移除所有选中
	function setAllFalse(data){
		var list = data;
		if(list){
		var	length = list.length;
			for(var i = length-1; i >= 0; i--){
				list[i].checked(false);
				if(list[i].item)
					setAllFalse(list[i].item());
			}
		}
	}

	function inDom(){
		var $container = $('#' + conditionId),
			$element;

		$container.empty();

		$element = $('<div data-bind="visible:conditionVisible, style:{ marginTop: top }">'
						+'<div class="vortex-condition-btn">'
							+'<span class="vortex-btn-submit" data-bind="click:submit">确定</span>'
							+'<span data-bind="click:empty">清空</span>'
						+'</div>'
						+'<div class="vortex-conditon-context">'
						+'</div>'
					+'</div>');

		$container.append($element);
		$container = $('#' + conditionId +' .vortex-conditon-context');

		if(type == 'single'){
			$element = $('<div class="vortex-conditon-one">'
							+'<input type="checkbox" data-bind="checked:checked">'
							+'<span>全部</span>'
						+'</div>'
						+'<div data-bind="foreach: list">'
							+'<div class="vortex-conditon-one">'
								+'<input type="checkbox" data-bind="checked:checked">'
								+'<span data-bind="text: name"></span>'
							+'</div>'
						+'</div>');

		}else if(type === 'conplex'){
			$element = $('<div class="vortex-condition-left" data-bind="foreach:list">'
							+'<div class="vortex-condition-line" data-bind="css:{backgroundf8f9fd:selected}, click:$root.changeSelected">'
								+'<span class="iconfont" data-bind="html:iconfont"></span>'
								+'<span data-bind="text:name"></span>('
								+'<span data-bind="text:count"></span>)'
								+'<i class="iconfont" data-bind="visible: hasItemSelected">&#xe610;</i>'
							+'</div>'
						+'</div>'
						+'<div class="vortex-condition-right">'
							+'<div class="vortex-condition-line">'
								+'<input type="checkbox" data-bind="checked:checked">'
								+'<span>全部</span>'
							+'</div>'
							+'<div data-bind="foreach:subList">'
								+'<div class="vortex-condition-line">'
									+'<input type="checkbox" data-bind="checked:checked">'
									+'<span data-bind="text:name"></span>'
								+'</div>'
							+'</div>'
						+'</div>')
		}

		$container.append($element);
	}

	//暴露给外部的方法，用于management参数的设置
	_this.setParam = function(data){
		//设置可见与否
		if(data.hasOwnProperty('visible')){
			conditionManagement.conditionVisible(data.visible);
		}

		if(data.hasOwnProperty('list')){
			var bool = true,
				length = data.list.length;

			data.list = extendAttriburte(data.list);
			conditionManagement.list(data.list);

			if(data.list[0].hasOwnProperty('item')){
				conditionManagement.subList(data.list[0].item());
			}
		}
	
		if(data.hasOwnProperty('index')){
			conditionManagement.top( 33 * data.index + 3 +'px');
			conditionManagement.index(data.index);
		}

		if(data.hasOwnProperty('checked')){
			$.extend(conditionManagement, { checked: data.checked });
		}else{
			$.extend(conditionManagement, { checked: data.list[0].checked });
		}

		containerEmpty();
		inDom();
		conditionBindings();
	}

	_this.submit = config.submit || function(){

	}

	//私有的属性扩展方法。
	function extendAttriburte(data){
		var length = data.length;
		for(var i = length - 1; i >=0; i--){
			var attiributeAdd = {
				index: i
			};


			if(data[i].item && data[i].item()){
				attiributeAdd.hasItemSelected = ko.dependentObservable(function(){
					var list = this,
						length = list.length,
						bool = false;
					for(var i = length - 1; i >= 0; i--){
						if(list[i].checked()){
							bool = true;
							break;
						}
					}

					return bool;
				}, data[i].item());
			}

			if(!data[i].hasOwnProperty('selected')){
				$.extend(data[i], {
					selected: ko.observable(i?false:true)
				});
			}

			$.extend(data[i], attiributeAdd);
		}

		return data;
	}

	vortexContainer.vortexSearchCondition.push({
		tabsIndex: tabsIndex,
		obj: this	
	});
}

//搜索选中控件
var VortexSearchSelected = function(config){
	var _this = this,
		selectedId = config.selectedId,
		tabsIndex = config.tabsIndex || '';

	var selectedManagement = {
		visible: ko.observable(false),

		list: ko.observableArray([]),

		iconClick: function(data){
			var list = selectedManagement.list(),
				length = list.length,
				status = data.fold(),
				checked = data.checked;

			for(var i = length - 1; i >= 0; i--){
				list[i].fold(true);
			}

			_this.iconClick(data, status, checked);
			data.fold(!status);
		},

		removeAll: function(data) {
			data.selectedString('');
			setAllFalse(selectedManagement.list());
			_this.removeAll();
		}
	}

	_this.init = function(){
		inDom();
		selectedBindings();
	}

	//暴露给外部的显示方法
	_this.show = function(){
		selectedManagement.visible(true);
	}

	//暴露给外部的隐藏方法
	_this.hide = function(){
		selectedManagement.visible(false);
	}
	
	_this.removeAll = config.removeAll || function(){
		
	}

	//暴露给外部的销毁方法
	_this.dispose = function(){
		
	}

	// 暴露给外部的点击事件可被重写
	_this.iconClick = config.iconClick || function(){

	}

	// 暴露给外部的方法。用于设置参数
	_this.setParam = function(data){
		var length = data.length
		data = ko.mapping.fromJS(data)();

		extendAttribute(data);

		selectedManagement.list(data);
	}

	_this.setAllFold = function(){
		var list = selectedManagement.list(),
			length = list.length;
		for(var i = length - 1; i >= 0; i--)
			list[i].fold(true);
	}

	_this.setIconFold = function(index){
		selectedManagement.list()[index].fold(true);
	}

	_this.SetSelectedString = function(string, index){
		selectedManagement.list()[index].selectedString(string);
	}

	//私有的添加属性的方法。
	function extendAttribute(data, parent){
		var list = data,
			length = list.length;

		for(var i = length - 1; i >= 0; i--){
			var attibuteAdd = {
				fold: ko.observable(true),
				index: i,
				selectedString: ko.observable()
			}

			//添加依赖属性。
			attibuteAdd.icon = ko.dependentObservable(function(){
				return this.fold()?'&#xe607;':'&#xe60f;';
			}, attibuteAdd);

			// 监听checked属性
			if(list[i].item){
				list[i].checked.subscribe(function(status){
					var list = this,
						length = list.length;
					subscribeParent(list, length, status);
				}, list[i].item());
			}else{
				list[i].checked.subscribe(function(status){
					var data = this,
						list = data.item(),
						length = list.length;
					subscribeChild(list, length, data);
				}, parent);
			}

			$.extend(list[i], attibuteAdd);

			if(list[i].item && list[i].item()){
				extendAttribute(list[i].item(), list[i]);
			}
		}

	}

	//私有的子节点监听方法。
	function subscribeChild(list, length, data){
		var bool = true
		for(var i = 0; i < length; i++){
			if(!list[i].checked()){
				bool = false;
				break;
			}
		}
		if(!data.checked() == bool)
			data.checked(bool);

	}

	// 私有的父节点监听方法。
	function subscribeParent(list, length, status){

		if(status){
			for(var i = length - 1; i >= 0; i--){
				list[i].checked(status);
			}
		}else{
			var bool = true;

			for(var i = length - 1; i >= 0; i--){
				if(!list[i].checked()){
					bool = false;
					break;
				}
			}
			if(bool){
				for(var i = length - 1; i >= 0; i--){
					list[i].checked(status);
				}
			}
		}
	}

	// 私有的条件面板绑定方法。
	function selectedBindings(){
		var element = document.getElementById(selectedId);
		if(selectedId){
			ko.cleanNode(element);
			ko.applyBindings(selectedManagement, element);
		}
	}
	
	// 私有的添加DOM方法。
	function inDom(){
		var $container = $('#' + selectedId),
			$element = $('<div data-bind="foreach: list, visible:visible">'
							+'<div class="vortex-selected-line">'
								+'<div class="vortex-selected-name" data-bind="text: name"></div>'
								+'<div class="vortex-selected-string" data-bind="visible:selectedString()">'
									+'<span data-bind="text: selectedString"></span>'
									+'<i class="iconfont icon-chahao" data-bind="click:$root.removeAll"></i>'
								+'</div>'
								+'<i class="iconfont" data-bind="html:icon, click:$root.iconClick"></i>'
							+'</div>'
						+'</div>');

		$container.append($element);
		
	}

	//移除所有选中。
	function setAllFalse(data){
		var list = data;
		if(list){
			var length = list.length;
			for(var i = length-1; i >= 0; i--){
				list[i].checked(false);
				if(list[i].item)
					setAllFalse(list[i].item());
			}
		}
	}

	// 储存当前对象。
	vortexContainer.vortexSearchSelected.push({
		tabsIndex: tabsIndex,
		obj: this	
	});
} 

//详情页控件。
var VortexSearchDetails = function(config){
	var _this = this,
		detailsId = config.detailsId,
		tabsIndex = config.tabsIndex;

	var detailsManagement = {
		visible: ko.observable(false),
		
		// 返回
		goBack: function(){
			_this.goBack(_this);
		},
		
		// 页签
		tabsList: ko.observableArray([]),

		tabsSelectedIndex: ko.observable(0),

		tabsClick: function(){
			detailsManagement.tabsSelectedIndex();
		},
		
		// 标题
		title: ko.observable(),
		
		//底部按钮
		footerBtn: ko.observableArray([]),

		openIframe: function(data){
			_this.openIframe(data);
		},

		// 基本信息
		basicInfoTop: ko.observableArray(),

		basicInfoSrc: ko.observable(),

		basicInfoBot: ko.observableArray(),

		basicInfoIndex: ko.observable(),

	}

	_this.init = function(){
		inDom();
		detailsBinding();
	}

	function containerEmpty(){
		var $container = $('#' + detailsId);
		$container.empty();
	}

	function inDom(){
		var $container = $('#' + detailsId),
			$element = $('<div data-bind="visible:visible">'
							+'<div class="vortex-details-back" data-bind="click:goBack">'
								+'<i class="iconfont">&#xe60d;</i>'
								+'<span>返回查询列表</span>'
							+'</div>'
							+'<div class="vortex-details-title">'
								+'<span data-bind="text:title"></span>'
							+'</div>'
							+'<div class="vortex-details-tabs" data-bind="foreach:tabsList">'
								+'<span data-bind="text:name,css:{vortexTabsSelected:$index()==$root.tabsSelectedIndex()},click:">基本信息</span>'
							+'</div>'
							+'<div class="vortex-details-context">'
							+'</div>'
							+'<div class="vortex-details-btn" data-bind="foreach:footerBtn">'
								+'<span data-bind="text:name,click:$root.openIframe"></span>'
							+'</div>'
						+'</div>');

		$container.append($element);

	}

	//暴露给外部的显示方法
	_this.show = function(){
		detailsManagement.visible(true);
	}

	//暴露给外部的隐藏方法
	_this.hide = function(){
		detailsManagement.visible(false);
	}

	//暴露给外部的销毁方法
	_this.dispose = function(){

	}

	_this.setParam = function(data){
		containerEmpty();
		inDom();

		if(data.hasOwnProperty('tabs')){
			var tab = data.tabs,
				length = tab.length;
			for(var i = length - 1; i >= 0; i--){
				var tabItem = {
					name: ko.observable(tab[i].name),
					index: i
				}
				detailsManagement.tabsList([]);
				detailsManagement.tabsList.push(tabItem);

				appendDom(tab[i], i);
			}
		}

		if(data.hasOwnProperty('title')){
			detailsManagement.title(data.title);
		}

		if(data.hasOwnProperty('btns')){
			detailsManagement.footerBtn(data.btns)
		}

		detailsBinding();
	}

	_this.openIframe = config.openIframe || function(){

	}

	_this.goBack = config.goBack || function(){

	}

	//私有的绑定方法。
	function detailsBinding(){
		var element = document.getElementById(detailsId);
		if(detailsId){
			ko.cleanNode(element);
			ko.applyBindings(detailsManagement, element);
		}
	}

	// 私有添加列表DOM的方法
	function appendDom(data, index){
		var $container = $('#'+ detailsId + ' .vortex-details-context'),
			$element;
		if(data.type == 'basicInfo'){
			$element = $('<div data-bind="visible: true">'
							+'<div class="vortex-line-pic">'
								+'<div data-bind="foreach:basicInfoTop">'
									+'<div>'
										+'<span data-bind="text:label">建立时间</span>：'
										+'<span data-bind="text:value">建立时间</span>'
									+'</div>'
								+'</div>'
								+'<img data-bind="attr:{src:basicInfoSrc}">'
							+'</div>'
							+'<div data-bind="foreach:basicInfoBot">'
								+'<div class="vortex-single-line">'
									+'<span data-bind="text: label">建立时间</span>：'
									+'<span data-bind="text: value">建立时间</span>'
								+'</div>'
							+'</div>'
					    +'</div>');

			var list = data.data,
				length = list.length;

			detailsManagement.basicInfoTop([]);
			detailsManagement.basicInfoBot([]);

			for(var i = 0; i < length; i++){
				if(i < 4)
					detailsManagement.basicInfoTop.push(list[i]);
				else
					detailsManagement.basicInfoBot.push(list[i]);
			}
			detailsManagement.basicInfoSrc(data.photo);
			detailsManagement.basicInfoIndex(index);
		}else if(true){
			$element = $('');
		}

		$container.append($element);
	}

	// 储存当前对象。
	vortexContainer.vortexSearchDetails.push({
		tabsIndex: tabsIndex,
		obj: this	
	});
}


