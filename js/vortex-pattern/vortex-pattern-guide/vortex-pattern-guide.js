"use strict";

var VortexGuide = function(config){
	var _this = this,
		guideId = config.guideId,
		list = config.tabsList;

	var guideManagement = {
		list: ko.observableArray([]),
		listClick: function(data){
			var list = guideManagement.list(),
				length = list.length;

			for(var i = length - 1; i >= 0; i--){
				list[i].selected(false);
			}
			data.selected(true);

		}
	}

	_this.init = function(){
		inDom();
		guideBinding();
		inParam();
	}

	function inDom(){
		var $container = $('#' + guideId),
            $element;

        $element = $('<div class="vortex-pattern-guide" >'
						+'<div class="vortex-guide-tabs" data-bind="foreach:list">'
							+'<div class="vortex-guideTabs-item" data-bind="css:{vortexGuideTabsSelected:selected}, click:$root.listClick">'
								+'<span data-bind="text:name"></span>'
								+'<i class="iconfont" data-bind="visible:selected">&#xe609;</i>'
							+'</div>'
						+'</div>'
						+'<div class="vortex-guide-contents" data-bind="foreach:list">'
							+'<div data-bind="visible:selected">'
								+'<ol>'
									+'<li>'
										+'<span>One</span>'
										+'<p>'
											+'OneOneOneOneOneOneOneOneOneOneOneOneOneOneOne'
											+'OneOneOneOneOneOneOneOneOneOneOneOneOneOneOneOneOneOneOneOne'
										+'</p>'
									+'</li>'
									+'<li>'
										+'<span>Two</span>'
										+'<p>'
											+'TwoTwoTwoTwoTwoTwoTwoTwoTwoTwoTwoTwoTwoTwoTwoTwoTwoTwoTwoTwoTwoTwoTwoTwo'
											+'TwoTwoTwoTwoTwoTwoTwoTwoTwoTwoTwoTwoTwoTwoTwoTwoTwoTwoTwoTwoTwoTwoTwoTwo'
										+'</p>'
									+'</li>'
									+'<li>'
										+'<span>Three</span>'
										+'<p>'
											+'ThreeThreeThreeThreeThreeThreeThreeThreeThreeeThreeThreeeThreeThreeThreeThreeThreeThree'
											+'ThreeThreeThreeThreeThreeThreeThreeThreeThreeeThreeThreeeThreeThreeThreeThreeThreeThree'
											+'ThreeThreeThreeThreeThreeThreeThreeThreeThreeeThreeThreeeThreeThree'
										+'</p>'
									+'</li>'
									+'<li>'
										+'<span>Four</span>'
										+'<p>'
											+'FourFourFourFourFourFourFourFourFour'
										+'</p>'
									+'</li>'
								+'</ol>'
							+'</div>'
						+'</div>'
					+'</div>');
        $container.append($element);
	}

	function guideBinding(){
		var element = document.getElementById(guideId);
        if(guideId){
            ko.cleanNode(element);
            ko.applyBindings(guideManagement, element);
        }
	}

	function inParam(){
		list = ko.mapping.fromJS(list)();
		extendAttribute();
		guideManagement.list(list);
	}

	function extendAttribute(){
		var length = list.length;
		for(var i = length - 1; i >= 0; i--){
			var attributeAdd = {
				selected: ko.observable(i?false:true)
			}

			$.extend(list[i], attributeAdd);
		}
	}
}