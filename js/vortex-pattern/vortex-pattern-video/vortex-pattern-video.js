"use strict";

var VortexVideo = function(config){
	var _this = this,
		videoId = config.videoId;

	var videoManagement = {
		videoList: ko.observableArray([]),

		name: ko.observable('asdfasdfasfdasdfsa'),

		removeVideo: function(data){
			videoManagement.videoList.remove(data);
		},

		add: function(){
			_this.addVideoList();
		}
	}

	_this.init = function(){
		inDom()
		videoBinding();
	}

	_this.addVideoList = function(data){
		var list = videoManagement.videoList,
			length = list().length;

		if(length >= 4){
			list.pop();
		}

		list.push({
			title: data.name,
			src: data.src
		});

	}

	function inDom(){
		var $container = $('#' + videoId),
			$element;

		$element = $('<!--ko foreach:videoList -->'
						+'<div class="vortex-video-item">'
							+'<div>'
								+'<span data-bind="text:title"></span>'
								+'<i class="iconfont" data-bind="click:$root.removeVideo">&#xe62b;</i>'
							+'</div>'
							+'<iframe data-bind="attr:{src:src}"></iframe>'
						+'</div>'
					+'<!--/ko-->');

		$container.append($element);
	}

	function videoBinding() {
		var element = document.getElementById(videoId);
		if(videoId){
			ko.cleanNode(element);
			ko.applyBindings(videoManagement, element);
		}
	}
}