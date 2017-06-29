"use strict";

//取得浏览器的类型和版本。
var vortex = vortex||'';

$(function() { 
	vortex = {
		userAgent: navigator.userAgent.toLowerCase(),
		rMsie: /(msie\s|trident.*rv:)([\w.]+)/,
		rFirefox: /(firefox)\/([\w.]+)/,
		rOpera: /(opera).+version\/([\w.]+)/,
		rChrome: /(chrome)\/([\w.]+)/,
		rSafari: /version\/([\w.]+).*(safari)/,
		browser: '',
		version: '',
		match: ''
	};

    vortex.match = vortex.rMsie.exec(vortex.userAgent);
    if(vortex.match != null){
        vortex.browser = "IE";
        vortex.version = vortex.match[2] || "0";
  	}

  	vortex.match = vortex.rFirefox.exec(vortex.userAgent);
  	if (vortex.match != null) {
    	vortex.browser = vortex.match[1] || "";
    	vortex.version = vortex.match[2] || "0";
  	}

  	vortex.match = vortex.rOpera.exec(vortex.userAgent);
  	if (vortex.match != null) {
    	vortex.browser = vortex.match[1] || "";
    	vortex.version = vortex.match[2] || "0";
  	}

  	vortex.match = vortex.rChrome.exec(vortex.userAgent);
  	if (vortex.match != null) {
    	vortex.browser = vortex.match[1] || "";
    	vortex.version = vortex.match[2] || "0";
  	}

  	vortex.match = vortex.rSafari.exec(vortex.userAgent);
  	if (vortex.match != null) {
    	vortex.browser = vortex.match[2] || "";
    	vortex.version = vortex.match[1] || "0";
  	}

  	if (vortex.match != null) {
    	vortex.vortex.browser = "";
    	vortex.vortex.version = "0";
  	}

}());

//报警信息控件
var VortexTags = function(config){
	var _this = this,
		alarmId = config.alarmId,
		type = config.type || '',
		icon = config.icon || '&#xe61c;',
		content = config.content || '',
		list = config.list;

	var alarmManagement = {
		count: ko.observable(0),
		icon: ko.observable(''),
		content: ko.observable(),
		type: ko.observable(),
		typeAlarm: ko.observable(),
		typeDropdown: ko.observable(),
		list: ko.observableArray([]),
		itemClick: function(){
			_this.itemClick(_this);
		},
		dropClick: function(data){
			var list = alarmManagement.list(),
				length = list.length;
			for(var i = length - 1; i >= 0; i--)
				list[i].selected(false);
			data.selected(true);

			_this.dropClick(data.name);
		}
	}

	_this.init = function(){
		inDom();
		inAudio();
		inParam();
		alarmBinding();
	}

	_this.itemClick = config.itemClick || function(){

	}

	_this.dropClick = config.dropClick || function(){
		
	}

	_this.setCount = function(data){
		alarmManagement.count(data);
	}

	function inDom(){
		var $container = $('#' + alarmId),
			$element;
		$element = $('<div data-bind="click:itemClick">'
						+'<div class="icon-container" data-bind="css:{vortexRingShake:count()}">'
							+'<i class="iconfont iconfont-middel" data-bind="html:icon"></i>'
						+'</div>'
						+'<span class="vortex-tag-count" data-bind="text:count,visible:typeAlarm()">26</span>'
						+'<span class="vortex-tag-context" data-bind="text:content"></span>'
						+'<div id="vortex-audio-container"></div>'
						+'<div class="vortex-dropdown-container" data-bind="foreach:list">'
							+'<p data-bind="text:name,click:$root.dropClick,css:{vortexDropdownSelected:selected,vortexColorDark:$index()%2}"></p>'
						+'</div>'
					+'</div>');
		$container.append($element);
		if(type === 'alarm'){
			$container = $('#' + alarmId + ' .icon-container');
			$element = $('<i class="iconfont icon-dot"></i>');
			$container.append($element);
		}
	}

	function inAudio(){
		if(!(vortex.browser == 'IE' && vortex.version <= 8) && type === 'alarm'){
			var $container = $('#vortex-audio-container'),
				$element = $('<audio autoplay="false" loop="true" id="vortex-mp3">'
								+'<source src="js/vortex-pattern/vortex-pattern-alarm/music/2.mp3">'
							+'</audio>');
			$container.append($element);

			$('#' + alarmId + ' #vortex-mp3')[0].pause();

			alarmManagement.count.subscribe(function(status){
				var audio = $('#' + alarmId + ' #vortex-mp3')[0];
				if(!status){
					audio.pause();
				}else{
					audio.play();
				}
			});
		}
	}

	function inParam(){
		alarmManagement.icon(icon);
		alarmManagement.content(content);
		if(type === 'alarm')
			alarmManagement.typeAlarm(true);
		else if(type === 'dorpdown')
			alarmManagement.typeDropdown(true);
		if(list?list.length:0)
			extendAttibut(list);
	}

	function alarmBinding(){
		var element = document.getElementById(alarmId);
		if(alarmId){
			ko.cleanNode(element);
			ko.applyBindings(alarmManagement, element);
		}
	}

	function extendAttibut(data){
		var length = data.length;
		alarmManagement.list([]);
		for(var i = 0; i < length; i++){
			var attributeAdd = {
				name: data[i],
				selected: ko.observable(i?false:true)
			}
			alarmManagement.list.push(attributeAdd);
		}
	}


}