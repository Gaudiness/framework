"use strict";

var VortexMenuTabs = function(config){
	var _this = this,
		tabsId = config.tabsId,
		startIndex = 0,
		endIndex = 0;

	var menutabsManagement = {
		list: ko.observableArray([

		]),
		homeSelected: ko.observable(true),
		homeUri: ko.observable(''),
		tabsClose: function(data){
			var list = menutabsManagement.list();
			menutabsManagement.list.remove(data);
			
			var length = menutabsManagement.list().length;
			if(menutabsManagement.list() && length)
				list[length - 1].selected(true);
			else
				menutabsManagement.homeSelected(true);
		},
		itemClick: function(data){
			setAllUnSelected();
			data.selected(true);
		},

		homeClick: function(){
			setAllUnSelected();
			menutabsManagement.homeSelected(true);
		},

		leftAvailable: ko.observable(true),

		rightAvailable: ko.observable(true),

		turnLeft: function(){
			var list = menutabsManagement.list();
			if(!menutabsManagement.leftAvailable()){
				list[startIndex - 1].visible(true);
				list[endIndex].visible(false);
				startIndex--;
				endIndex--;
			}
			console.log(startIndex, endIndex);

		},

		turnRight: function(){
			var list = menutabsManagement.list();
			if(!menutabsManagement.rightAvailable()){
				list[startIndex].visible(false);
				list[endIndex + 1].visible(true);
				startIndex++;
				endIndex++;
			}
			console.log(startIndex, endIndex);
		},

		operationVisible: ko.observable(false),

		operationClick: function(){
			menutabsManagement.operationVisible(!menutabsManagement.operationVisible());
		},

		closeCurrent: function(){
			var list = menutabsManagement.list,
				length = list().length;
			for(var i = length - 1; i >= 0; i--){
				if(list()[i].selected()){
					if(i - 1 >= 0)
						list()[i - 1].selected(true);
					else
						menutabsManagement.homeSelected(true);
					
					list.remove(list()[i]);
					break;
				}
			}
		},

		closeAll: function(){
			var list = menutabsManagement.list,
				length = list().length;
			for(var i = length - 1; i >= 0; i--){
				list.remove(list()[i]);
			}
			menutabsManagement.homeSelected(true);
		},

		closeOthers: function(){
			var list = menutabsManagement.list,
				length = list().length;
			for(var i = length - 1; i >= 0; i--){
				if(!list()[i].selected()){
					list.remove(list()[i]);
				}
			}
		},
		oprationHide: function(){
			menutabsManagement.operationVisible(false)
		}

	}

	_this.init = function(){
		inDom();
		tabsBinding();
		inParam()
		onResize();
	}

	_this.addTab = function(data){
		var attributeAdd = {
				selected: ko.observable(true),
				visible: ko.observable(true)
			},
			bool = true,
			list = menutabsManagement.list,
			length = list().length,
			item;

		attributeAdd.visible.subscribe(function(status){
			var list = this.list(),
				length = list.length,
				leftAvailable = this.leftAvailable,
				rightAvailable = this.rightAvailable;
			leftAvailable(list[0].visible());
			rightAvailable(list[length - 1].visible());

		}, menutabsManagement); 

		$.extend(data, attributeAdd);
		for(var i = length - 1; i >= 0; i--){
			if(list()[i].name() === data.name()){
				bool = false;
				item = list()[i];
				break;
			}
		}
		setAllUnSelected();
		if(bool){
			list.push(data);
			endIndex = list().length;
		}else
			item.selected(true);

		endIndex = list().length - 1;
		tabsResize();
	}

	_this.fullScreen = function(id){
		$('#' + id).addClass('vortexFullScreen');
		$('.full-screen-info').show();

		$('.vortex-menu-Info').addClass('vortex-body-menuInfo');

		var timer = setTimeout(function(){
			$('.full-screen-info').fadeOut();
		}, 3000);

		document.onkeydown = function(e){
		    keyDown(e, timer);
		}

		var elementId;
		if(menutabsManagement.homeSelected()){
			elementId = 'home';
		}else{
			var list = menutabsManagement.list(),
				length = list.length;
			for(var i = length - 1; i >= 0; i--){
				if(list[i].selected()){
					elementId = i;
					break;
				}
			}
		}

 		document.getElementById(elementId).contentWindow.document.onkeydown = function(e){
			keyDown(e, timer);
		}

	}

	function keyDown(e, timer){
		if((e.keyCode || e.which) == 27){
	    	var $element = $('.vortexFullScreen');
	    	$element.removeClass('vortexFullScreen');
	    	clearTimeout(timer);
	    	$('.full-screen-info').hide();
	    	$('.vortex-menu-Info').removeClass('vortex-body-menuInfo');
	    }
	}

	function inDom(){
		var $container = $('#' + tabsId),
			$element;

		$element = $('<div class="vortex-tabs-title">'
						+'<div class="tabs-left-container">'
							+'<span class="iconfont" data-bind="css:{tabsSelected:homeSelected},click:homeClick">&#xe613;</span>'
							+'<span class="iconfont" data-bind="css:{btnUnAble:leftAvailable}, click:turnLeft">&#xe60d;</span>'
						+'</div>'
						+'<div class="tabs-center-container">'
							+'<div data-bind="foreach:list">'
								+'<div class="tabs-item-withIcon" data-bind="css:{tabsSelected:selected},click:$root.itemClick,visible:visible">'
									+'<span data-bind="text:name"></span>'
									+'<i class="iconfont" data-bind="click:$root.tabsClose">&#xe621;</i>'
								+'</div>'
							+'</div>'
						+'</div>'
						+'<div class="tabs-right-container">'
							+'<span class="iconfont" data-bind="css:{btnUnAble:rightAvailable}, click:turnRight">&#xe60f;</span>'
							+'<div class="tabs-item-withIcon" data-bind="click:operationClick, css:{tabsWithIconSelected:operationVisible}">'
								+'<span>批量操作</span>'
								+'<i class="iconfont">&#xe606;</i>'
								+'<div data-bind="visible:operationVisible,event:{mouseleave:oprationHide}">'
									+'<div data-bind="click:closeCurrent">关闭当前页签</div>'
									+'<div data-bind="click:closeOthers">关闭其他页签</div>'
									+'<div data-bind="click:closeAll">关闭所有页签</div>'
								+'</div>'
							+'</div>'
						+'</div>'
					+'</div>'
					+'<div class="vortex-tabs-content">'
						+'<div class="full-screen-info">'
							+'<div>按ESC退出全屏模式</div>'
						+'</div>'
						+'<iframe data-bind="attr:{src:homeUri},visible:homeSelected" id="home"></iframe>'
						+'<!-- ko foreach: list -->'
						+'<iframe data-bind="attr:{src:uri, id: $index()},visible:selected"></iframe>'
						+'<!-- /ko -->'
					+'</div>')
		$container.append($element);
	}

	function tabsBinding(){
		var element = document.getElementById(tabsId);
		if(tabsId){
			ko.cleanNode(element);
			ko.applyBindings(menutabsManagement, element);
		}
	}

	function inParam(){
		if(config.homeUri)
			menutabsManagement.homeUri(config.homeUri);
	}

	function setAllUnSelected(){
		var list = menutabsManagement.list(),
			length = list.length,
			selected = menutabsManagement.homeSelected;

		selected(false);
		for(var i = length - 1; i >= 0; i--){
			list[i].selected(false);
		}
	}

	function tabsResize(){
		var $items = $('#' + tabsId + ' .tabs-center-container .tabs-item-withIcon'),
			length = $items.length,
			list = menutabsManagement.list();
		
		for(var i = 0; i < length; i++){
			list[i].visible(true)
			if(i < startIndex)
				list[i].visible(false)
		}

		for(var i = 0; i < length; i++){
			var top = $($items[i]).position().top;
			if(top){
				if(i <= endIndex)
					endIndex = i - 1;
				list[i].visible(false);
			}else{
				
			}
		}

	}

	function onResize(){
		$(window).resize(function(){
			tabsResize();
		});
	}

}