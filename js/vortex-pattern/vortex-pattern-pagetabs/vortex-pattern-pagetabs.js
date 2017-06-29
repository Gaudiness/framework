"user strict"

var VortesPageTabs = function(config){
	var _this = this,
	tabsId = config.tabsId,
	title = config.title || '',
	list = config.tabs || '';

	var tabsManagement = {
		name: ko.observable(''),
		list: ko.observableArray([]),
		itemClick: function(data){
			var list = tabsManagement.list(),
				length = list.length;
			for(var i = length - 1; i >= 0; i--){
				list[i].selected(false);
			}
			data.selected(true);
		}
	}

	_this.init = function(){
		inDom();
		tabsBinding();
		inParam();
	}

	_this.setList = function(data){
		extendAttirbute(data);
		tabsManagement.list(list);
	}

	function inDom(){
		var $container = $('#' + tabsId),
			$element;
		$element = $('<div class="vortex-pagetabs-title" data-bind="text:name"></div>'
					+'<div class="vortex-pagetabs-body">'
						+'<div>'
							+'<div class="vortex-pagetabs-container" data-bind="foreach:list">'
								+'<span class="vortex-pagetabs-item" data-bind="css:{vortexPagetabsSelected:selected},text:title,click:$root.itemClick"></span>'
							+'</div>'
							+'<div class="vortex-pagetabs-charts">'
							+'<!-- ko foreach:list -->'
								+'<div data-bind="visible:selected,attr:{id:id}"></div>'
							+'<!-- /ko -->'
							+'</div>'
						+'</div>'
					+'</div>'
					+'<div class="vortex-pagetabs-footer"></div>');
		$container.append($element);
	}

	function tabsBinding(){
		var element = document.getElementById(tabsId);
		if(tabsId){
			ko.cleanNode(element);
			ko.applyBindings(tabsManagement, element);
		}
	}

	function inParam(){
		tabsManagement.name(title);

		extendAttirbute(list);
		tabsManagement.list(list);
	}

	function extendAttirbute(data){
		data = ko.mapping.fromJS(data)();
		var length = data.length;
		for(var i = length - 1; i >= 0; i--){
			var attributeAdd = {
				selected: ko.observable(i?false:true)
			}
			$.extend(data[i], attributeAdd);
		}
		list = data;
	}
}