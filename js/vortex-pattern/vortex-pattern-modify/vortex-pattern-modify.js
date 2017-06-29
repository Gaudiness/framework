"use strict";

var VortexModifyPWD = function(config){
	var _this = this,
		modifyId = config.modifyId;

	var modifyManagement = {
		visible: ko.observable(false),
		submit: function(){
			_this.submit(_this);
		},

		cancel: function(){
			_this.cancel(_this);
		}
	}

	_this.init = function(){
		inDom();
		modifyBinding();
	}

	_this.show = function(){
		modifyManagement.visible(true);
		var $cover = $('.vortex-cover');
		$cover.addClass();
	}

	_this.hide = function(){
		modifyManagement.visible(false);
	}

	function inDom(){
		var $container = $('#' + modifyId),
            $element;

        $element = $('<div class="vortex-modify-pwd" data-bind="visible:visible">'
						+'<div class="vortex-modify-title">修改密码</div>'
						+'<div class="vortex-modify-container">'
							+'<div>'
								+'<span class="vortex-modify-label">旧密码：</span>'
								+'<input class="vortex-modify-value">'
							+'</div>'
							+'<div>'
								+'<span class="vortex-modify-label">新密码：</span>'
								+'<input class="vortex-modify-value">'
							+'</div>'
							+'<div>'
								+'<span class="vortex-modify-label">确认密码：</span>'
								+'<input class="vortex-modify-value">'
							+'</div>'
							+'<div>'
								+'<span class="vortex-modify-btn" data-bind="click:submit">确认</span>'
								+'<span class="vortex-modify-btn" data-bind="click:cancel">取消</span>'
							+'</div>'
						+'</div>'
					+'</div>');
        $container.append($element);
	}

	function modifyBinding(){
		var element = document.getElementById(modifyId);
        if(modifyId){
            ko.cleanNode(element);
            ko.applyBindings(modifyManagement, element);
        }
	}

	_this.submit = config.submit || function(){

	}

	_this.cancel = config.cancel || function(){

	}
	
}