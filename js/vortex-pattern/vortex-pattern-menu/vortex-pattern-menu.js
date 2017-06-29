"use strict";

var userPanel = function(config){
	var _this = this,
		panelId = config.panelId;

	var panelManagement ={
		userName: ko.observable('hahhhahhhahahahah'),
		nameShow: ko.observable(false),
		menuClick: ko.observable(false),
		mouseEnter: function(){
			if(!panelManagement.nameShow()){
				_this.mouseEnter();
				_this.toggleNameShow();
			}
		},
		mouseLeave: function(){
			if(!panelManagement.menuClick()){
				_this.mouseleave();
				_this.toggleNameShow();
			}
			panelManagement.visibleOfAction(false);
			panelManagement.skinVisible(false);
		},
		showGuide: function(){
			_this.showGuide();
		},

		visibleOfAction: ko.observable(false),

		userAction: ko.observableArray([
			{ action: '修改密码', icon: '&#xe604;' },
			{ action: '注销账户', icon: '&#xe61d;' },
		]),
		userClick: function(){
			panelManagement.visibleOfAction(!panelManagement.visibleOfAction());
		},

		userItemClick: function(data){
			panelManagement.visibleOfAction(false);
			_this.userItemClick(data);
		},

		skinList: ko.observableArray([
			{ color: '#2f323a', selected: ko.observable('&#xe623;'), href:'' },
			{ color: '#4d77be', selected: ko.observable(''), href:'css/vortex-theme-happy.css' }
		]),

		skinVisible: ko.observable(false),

		skinClick: function(){
			panelManagement.skinVisible(!panelManagement.skinVisible());
		},

		skinItemClick: function(data){
			var list = panelManagement.skinList(),
				length = list.length;
			for(var i = length - 1; i >= 0; i--){
				list[i].selected('');
			}
			data.selected('&#xe623;');
			panelManagement.skinVisible(false);
			$('#vortex-themes')[0].href = data.href;
		}


	}

	panelManagement.nameShow.subscribe(function(status){
		var $container = $('.vortex-user-panel'),
			$name = $('.vortex-user-name');
		if(status){
			$name.width($container.width() - 10);
		}else{
			$name.width(65);
		}
	})

	_this.init = function(){
		inDom();
		userBinding();
	}

	_this.mouseEnter = config.mouseEnter || function(){

	}

	_this.mouseleave = config.mouseleave || function(){

	}

	function inDom(){
		var $container = $('#' + panelId),
			$element;

		$element = $('<div data-bind="event:{mouseenter:mouseEnter,mouseleave:mouseLeave}">'
						+'<div class="iconfont user-pic-panel" data-bind="click:userClick">&#xe60a;</div>'
						+'<div class="vortex-user-modify" data-bind="visible:visibleOfAction,foreach:userAction">'
							+'<div class="vortex-usericon-tag" data-bind="click:$root.userItemClick">'
								+'<i class="iconfont" data-bind="html:icon"></i>'
								+'<span data-bind="text:action">修改密码</span>'
							+'</div>'
						+'</div>'
						+'<div class="vortex-user-name" data-bind="text:userName"></div>'
						+'<div class="vortex-userBtn-container">'
							+'<i class="iconfont margin-right" data-bind="click:skinClick">&#xe620;</i>'
							+'<div class="skin-change-panel" data-bind="visible:skinVisible,foreach:skinList">'
								+'<span class="iconfont" data-bind="html:selected,click:$root.skinItemClick,style:{backgroundColor:color}"></span>'
							+'</div>'
							+'<i class="iconfont" data-bind="click:showGuide">&#xe61f;</i>'
						+'</div>'
					+'</div>');
		$container.append($element);
	}

	_this.toggleNameShow = function(data){
		if(!data)
			panelManagement.nameShow(!panelManagement.nameShow());
		panelManagement.menuClick(data);
	}

	_this.showGuide = config.showGuide || function(){

	}

	_this.userItemClick = config.userItemClick || function(){

	}

	function userBinding(){
		var element = document.getElementById(panelId);
		if(panelId){
			ko.cleanNode(element);
			ko.applyBindings(panelManagement, element);
		}
	}
}

var VortexFirstMenu = function(config){
	var _this = this,
		menuId = config.menuId,
		menuList = config.data,
		startIndex = 0,
		endIndex = 0;

	var menuManagement = {
		menuList: ko.observableArray([]),
		menuHeight: ko.observable('300px'),
		detailsVisible: ko.observable(false),
		firstClick: ko.observable(false),
		subMenuShow: ko.observable(false),
		menuEnter: function(){
			var bool = menuManagement.firstClick();

			menuManagement.detailsVisible(true);
			if(!menuManagement.firstClick()){
				_this.mouseEnter(bool);
			}
		},

		menuLeave: function(){
			var bool = menuManagement.firstClick(),
				subBool = menuManagement.subMenuShow();
			if(!bool && !subBool)
				menuManagement.detailsVisible(false);
			_this.menuLeave(bool);

		},

		menuClick: function(data){
			var list = menuManagement.menuList(),
				length = list.length;

			
			_this.menuClick(data.children?data.children():'', data.name());

			menuManagement.firstClick(true);
			for(var i = length - 1; i >= 0; i--){
				list[i].selected(false);
			}
			
			data.selected(true);
			menuManagement.subMenuShow(true);

		},

		footerVisible: ko.observable(false),

		turnUp: function(){
			console.log(startIndex, endIndex);
			if(!menuManagement.UpAble()){
				startIndex--;
				endIndex--;
				menuManagement.menuList()[startIndex].visible(true);
				menuManagement.menuList()[endIndex].visible(false);
			}
		},

		turnDown: function(){
			console.log(startIndex, endIndex);
			if(!menuManagement.DownAble()){
				menuManagement.menuList()[startIndex++].visible(false);
				menuManagement.menuList()[endIndex++].visible(true);
			}
		},

		setMenuVisible: function(){
			var list = menuManagement.menuList(),
				length = list.length,
				height = menuManagement.menuHeight(),
				visible = menuManagement.footerVisible();
			for(var i = startIndex; i < length; i++){
				var bottom = visible?60 * (i + 1) + 46:60 * (i + 1),
					bool = bottom <= parseInt(height);
				list[i].visible(bool);
				if(!bool && i<=endIndex)
					endIndex = i;
			}
		}


	}

	menuManagement.UpAble = ko.dependentObservable(function(){
		var list = this.menuList(),
			length = list.length;
		return length?list[0].visible():false;
	}, menuManagement);

	menuManagement.DownAble = ko.dependentObservable(function(){
		var list = this.menuList(),
			length = list.length;
		return length?list[length - 1].visible():false;
	}, menuManagement);

	menuManagement.menuHeight.subscribe(function(status){
		var length = this.menuList().length;
		this.footerVisible(length * 60 > parseInt(this.menuHeight()));
		this.setMenuVisible();
	}, menuManagement);

	_this.init = function(){
		inDom();
		menuBinding();
		inParam();
		resizeHeight();
		onWindowResize();
	}

	_this.menuClick = config.menuClick || function(){

	}

	_this.toggleMenuDetails = function(data){
		menuManagement.detailsVisible(!menuManagement.detailsVisible());
		if(data){
			menuManagement.firstClick(false);
			menuManagement.subMenuShow(false);
		}
	}

	_this.menuLeave = config.menuLeave || function(){

	}

	_this.mouseEnter = config.mouseEnter || function(){

	}

	function resizeHeight(){
		var $this = $('#' + menuId),
			wHeight = $(window).height();
		menuManagement.menuHeight(wHeight - $this.offset().top + 'px');
	}

	function onWindowResize(){
		$(window).resize(function(){
			resizeHeight();
		});
	}

	function inDom(){
		var $container = $('#' + menuId),
			$element;

		$element = $('<div data-bind="event:{mouseenter:$root.menuEnter,mouseleave:$root.menuLeave},style:{height:menuHeight}">'
						+'<!--ko foreach: menuList-->'
						+'<div class="vortex-menu-item" data-bind="event:{click:$root.menuClick},visible:visible">'
							+'<div data-bind="css:{vortexMenuSelected:selected},visible:visible">'
								+'<i class="iconfont item-icon-1" data-bind="html:icon">&#xe612;</i>'
								+'<span data-bind="visible:$root.detailsVisible,text:name"></span>'
								+'<i class="iconfont item-icon-2" data-bind="visible:$root.detailsVisible">&#xe60f;</i>'
							+'</div>'
						+'</div>'
						+'<!-- /ko -->'
						+'<div class="vortex-menu-footer" data-bind="visible:footerVisible">'
							+'<div data-bind="click:turnUp,css:{vortexMenufooterUB:UpAble}">'
								+'<i class="iconfont border-right">&#xe60c;</i>'
							+'</div>'
							+'<div data-bind="click:turnDown,css:{vortexMenufooterUB:DownAble}">'
								+'<i class="iconfont">&#xe609;</i>'
							+'</div>'
						+'</div>'
					+'</div>');
		$container.append($element);
	}

	function menuBinding(){
		var element = document.getElementById(menuId);
		if(menuId){
			ko.cleanNode(element);
			ko.applyBindings(menuManagement, element);
		}
	}

	function inParam(){
		var data = ko.mapping.fromJS(menuList)();
		extendAttibute(data);
		menuManagement.menuList(data);

		endIndex = data.length - 1;
	}

	function extendAttibute(data, func){
		var length = data?data.length:0;
		for(var i = length - 1; i >= 0; i--){
			var attributeAdd = {
				selected: ko.observable(false),
				deep: 0,
				visible:ko.observable(true)	
			}

			$.extend(data[i], attributeAdd);
			
			if(data[i].children&&data[i].children()){
				extendSubAttibute(data[i].children(), 0, data[i])
			}
		}
	}

	function extendSubAttibute(data, deep, parent){
		deep++;
		var length = data.length;

		for(var i = length - 1; i >=0; i--){
			
			var hasChild = false;
			if(data[i].children && data[i].children())
				hasChild = true;

			var attributeAdd = {
				selected: ko.observable(false),
				deep: deep,
				icon: hasChild?'&#xe617;':'&#xe610;',
				visible: ko.observable(deep<2),
				fold: ko.observable(true),
				parent: parent
			}

			attributeAdd.iconfont = ko.dependentObservable(function(){
				var data = this.fold();
				return data?'&#xe60d;':'&#xe607;';
			}, attributeAdd);


			attributeAdd.fold.subscribe(function(status){
				var data = this,
					list = data.children?data.children():'',
					length = list?list.length:0;

				for(var i = length - 1; i >= 0; i--)
					list[i].visible(!status);
			}, data[i]);
			
			if(data[i].icon && data[i].icon())
				attributeAdd.icon = data[i].icon();

			$.extend(data[i], attributeAdd);
			if(hasChild)
				extendSubAttibute(data[i].children(), deep, data[i]);

		}
	}
}

var VortexSubMenu = function(config){
	var _this = this,
		menuId = config.menuId,
		subMenuDeep,
		firstId;

	var menuManagement = {
		children: ko.observableArray([]),
		title: ko.observable('haha'),
		mouseLeave: function(data, event){
			var dir = getDir(event),
				$menu = $('#' + menuId);
			if(dir === 1){
				$menu.animate({left: '-220px'}, function(){
					_this.mouseLeave();
				})
			}
		},
		itemClick: function(data){
			setAllUnSelected(menuManagement.children());
			setUpSelected(data);
			
			if(data.deep === 1){
				setFirstFold();
			}
			data.fold(!data.fold());

			if(!(data.children && data.children()))
				_this.itemClick(data);
		}
	}

	//暴露给外部调用的子菜单显示方法。
	_this.show = function(id){
		var $first = $('#' + id),
			$second = $('#' + menuId),
			fWidth = $first.width();

		firstId = id;
		$second.animate({left: fWidth});

	}

	_this.itemClick = config.itemClick || function(){

	}

	_this.init = function(){
		menuBinding();
	}

	_this.setMenuList = function(data){
		var list = ko.mapping.toJS(data);
		subMenuDeep = 0;
		getSubmenuDeep(list, subMenuDeep, getSubmenuDeep);
		menuManagement.children(data);
		setAllUnSelected(data);
		if(data[0]){
			setSelectedUnFold([data[0]]);
			data[0].fold(false);
		}
		inDom();
		menuBinding();
	}

	_this.setTitle = function(data){
		menuManagement.title(data);
	}

	_this.mouseLeave = config.mouseLeave || function(){

	}

	//控件内部的获取子菜单深度的方法。
	function getSubmenuDeep(item, deep, func){
		var length = item.length;

		if(item && length){
			deep++;
			for(var i = 0; i < length; i++){
				if(item[i].children){
					if(!item[i].children.length){
						var tempObj = item[i].children;
						item[i].children = new Array();
						item[i].children.push(tempObj);
					}
					func(item[i].children, deep, func);
				}
			}
		}
		if (subMenuDeep < deep) {
            subMenuDeep = deep;
        }
	}

	function inDom(){
		var $container = $('#' + menuId),
			$element;

		$container.empty();

		$element = $('<div data-bind="event:{mouseleave:mouseLeave}">'
						+'<div class="sub-menu-title">'
							+'<span class="title-context" data-bind="text:title">实时定位</span>'
						+'</div>'
						+'<div class="sub-menu-panel">'
							
						+'</div>'
					+'<div>');
		
		$container.append($element);
		inSubTreeDom($container.find('.sub-menu-panel'), 1, inSubTreeDom)
		// console.log(subMenuDeep);
	}

	//控件内部的生成dom结构的方法
	function inSubTreeDom($container, deep, func){
		deep++;

		var $element = $('<!--ko foreach:children-->'
						+'<div class="sub-menu-item" data-bind="css:{paddingRight15:deep==1}, visible:visible">'
							+'<div data-bind="click:$root.itemClick, css:{subMenuSelected:selected}">'
								+'<i class="iconfont sub-menu-icon1" data-bind="html:icon,css:{fontSize14:deep!=1}">&#xe605;</i>'
								+'<span data-bind="text:name"></span>'
								+'<i class="iconfont sub-menu-icon2" data-bind="visible:deep==1&&$data.children,html:iconfont"></i>'
							+'</div>'
						+'</div>'
						+'<!-- /ko -->');
		$container.append($element);
		if(subMenuDeep >= deep){
			func($container.find('.sub-menu-item'), deep, func);
		}
	}

	function menuBinding(){
		var element = document.getElementById(menuId);
		if(menuId){
			ko.cleanNode(element);
			ko.applyBindings(menuManagement, element);
		}
	}

	function setAllUnSelected(data){
		var length = data.length;
		for(var i = length - 1; i >= 0; i--){
			data[i].selected(false);
			if(data[i].children && data[i].children())
				setAllUnSelected(data[i].children());
		}
	}

	function setUpSelected(data){
		if(data.selected && data.deep >= 1){
			data.selected(true);
			if(parent.hasOwnProperty('parent'))
				setUpSelected(data.parent);
		}
	}

	function setSelectedUnFold(data){
		var length = data.length;
		for(var i = length - 1; i >=0; i--){
			data[i].visible(true);
			if(data[i].children && data[i].children())
				setSelectedUnFold(data[i].children());
		}
	}

	function setAllFold(data){
		var length = data.length;
		for(var i = length - 1; i >= 0; i--){
			if(data[i].deep >= 2)
				data[i].visible(false);
			if(data[i].children && data[i].children())
				setAllFold(data[i].children());
		}
	}

	function setFirstFold(){
		var list = menuManagement.children(),
			length = list.length;
		for(var i = length - 1; i >= 0; i--){
			var cLength = list[i].children()?list[i].children().length:0;
			for(var j = cLength - 1; j >= 0; j--){
				list[i].children()[j].visible(false);
			}
			list[i].fold(true);
		}
	}

	function getDir(e){
		var $this = $('#' + menuId),
			w = $this.width(),
        	h = $this.height(),
        	x = (e.pageX - $this[0].offsetLeft - (w / 2)) * (w > h ? (h / w) : 1),
        	y = (e.pageY - $this[0].offsetTop - (h / 2)) * (h > w ? (w / h) : 1),
        	direction = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;
		
		return direction;
		
    }
}