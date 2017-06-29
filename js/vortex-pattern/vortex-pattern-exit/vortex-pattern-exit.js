"use strict";

var VortexExit = function(config){
    var _this = this,
        exitId = config.exitId;

    var exitManagement = {
        visible: ko.observable(false),
        exit: function(){
            _this.exit(_this);
        },
        cancel: function(){
            _this.cancel(_this);
        }

    }

    _this.init = function(){
        inDom();
        exitBinding();
    }

    _this.show = function(){
        exitManagement.visible(true);
    }

    _this.hide = function(){
        exitManagement.visible(false);
    }

    _this.exit = config.exit || function(){

    }

    _this.cancel = config.cancel || function(){

    }

    function inDom(){
        var $container = $('#' + exitId),
            $element;

        $element = $('<div class="vortex-exit" data-bind="visible:visible">'
                        +'<div class="vortex-exit-title">确定要退出系统吗？</div>'
                        +'<div class="vortex-exit-content">'
                            +'<div>'
                                +'<div data-bind="click:exit">退出</div>'
                                +'<div data-bind="click:cancel">取消</div>'
                            +'</div>'
                        +'</div>'
                    +'</div>');

        $container.append($element);
    }

    function exitBinding(){
        var element = document.getElementById(exitId);
        if(exitId){
            ko.cleanNode(element);
            ko.applyBindings(exitManagement, element);
        }
    }
}