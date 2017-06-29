"use strict";

var VortexOpration = function(config){
	var _this = this,
		oprationId = config.oprationId || '';

	var oprationManagement = {

	}

	_this.init = function(){
		inDom();
		oprationBinding();
	}

	function inDom(){
		var $container = $('#' + oprationId),
            $element;

        $element = $('');
        $container.append($element);
	}

	function oprationBinding(){
		var element = document.getElementById(oprationId);
        if(oprationId){
            ko.cleanNode(element);
            ko.applyBindings(oprationManagement, element);
        }
	}
}