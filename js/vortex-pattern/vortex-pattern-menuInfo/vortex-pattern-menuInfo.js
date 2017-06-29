"use strict";

var VortexMenuInfo = function(config){
	var _this = this,
		menuInfoId = config.menuInfoId,
		ignoreId;

	var menuInfoManagement = {
		list: ko.observableArray([
			{ type: '超速报警', carNum: '浙GDC857', date: '2016-11-11 05:51:59' },
			{ type: '超速报警', carNum: '浙GDC857', date: '2016-11-11 05:51:59' },
			{ type: '超速报警', carNum: '浙GDC857', date: '2016-11-11 05:51:59' },
			{ type: '超速报警', carNum: '浙GDC857', date: '2016-11-11 05:51:59' },
			{ type: '超速报警', carNum: '浙GDC857', date: '2016-11-11 05:51:59' },
		]),
		show: ko.observable(false)
	}

	_this.init = function(){
		inDom();
		menuInfoBinding();
		bindClick();
	}

	_this.show = function(data){
		var $menuInfo = $('.vortex-menu-Info');
		$menuInfo.animate({right: '0px'}, function(){
			menuInfoManagement.show(true);
		});
		ignoreId = data;

		var $cover = $('.vortex-cover');
		$cover.addClass('vortex-body-cover');
	}

	_this.hide = config.hide || function(){

	}

	function inDom(){
		var $container = $('#' + menuInfoId),
			$element;
		$element = $('<div class="vortex-menu-Info">'
						+'<div>'
							+'<ol class="vortex-menuInfo-content" data-bind="foreach:list">'
								+'<li>'
									+'<div class="vortex-menuInfo-title" data-bind="text:type"></div>'
									+'<div class="vortex-menuInfo-line">'
										+'<span class="vortex-menuInfo-1" data-bind="text:carNum">sdfsl</span>'
										+'<span class="vortex-menuInfo-2" data-bind="text:date">sdfs</span>'
									+'</div>'
								+'</li>'
							+'</ol>'
							+'<div class="vortex-menuInfo-footer">查看详情</div>'
						+'</div>'
					+'</div>');
		$container.append($element);
	}

	function menuInfoBinding(){
		var element = document.getElementById(menuInfoId);
		if(menuInfoId){
			ko.cleanNode(element);
			ko.applyBindings(menuInfoManagement, element);
		}
	}

	function bindClick(){
		$(document).click(function(e){
			var length = ignoreId?ignoreId.length:0,
				bool = true;
			for(var i = length - 1; i >= 0;i--){
				if(!returnBool(e, ignoreId[i])){
					bool = false;
					break;
				}
			}

			if($(e.target).closest(".vortex-menu-Info").length == 0 && menuInfoManagement.show() && bool){
				var $menuInfo = $('.vortex-menu-Info'),
					width = $menuInfo.width();
				$menuInfo.animate({right: -width}, function(){
					menuInfoManagement.show(false);
					_this.hide();	
					var $cover = $('.vortex-cover');
					$cover.removeClass('vortex-body-cover');	
				});


            }
		})
	}

	function returnBool(e, id){
		return $(e.target).closest("#" + id).length == 0;
	}
}