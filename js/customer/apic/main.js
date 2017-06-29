$(function(){
	var p = new mainManagement();
	p.init();
});

var mainManagement = function(){
	var _this = this;

	var search = new VortexSearchArea({
		searchId: 'vortex-new-search',
		
		closeClick: function(){
			console.log(222222);
			$('.vortex-new-container').slideUp();
		},
		
		searchClick: function(data){
			console.log(data);
		},

		focus: function(){
			$('.vortex-new-container').slideDown();
		}

	});

	var timer = new VortexToolsTimer({
		timerId: 'vortex-tools-timer'
	});

	var theme = new VortexToolsDropdown({
		dropDownId: 'vortex-tools-theme',
		// data: [
		// 	{ name: '垃圾收运' }, 
		// 	{ name: '作业考核' }
		// ],
		showPanel: function(){
			area.hide();
			mark.hide();
			tools.hide();
		},
		itemClick: function(data){
			if(data.name === '垃圾收运')
				tabs.showTabsArray(['车辆', '设施'])
			else if(data.name === '作业考核')
				tabs.showTabsArray(['人员'])

		}
	});

	var area = new VortexToolsDropdown({
		dropDownId: 'vortex-tools-area',
		
		showPanel: function(){
			theme.hide();
			mark.hide();
			tools.hide();
		}
	});

	var mark = new VortexToolsBtn({
		btnId: 'vortex-tools-mark',
		name: '标记',
		data: ['&#xe626;', '&#xe62d;'],
		showPanel: function(){
			theme.hide();
			area.hide();
			tools.hide();
		},
		itemClick: function(){
			console.log('itemClick');
		}
	});

	var tools = new VortexToolsPanel({
		panelId: 'vortex-tools-tools',
		name: '小工具',
		showPanel: function(){
			theme.hide();
			area.hide();
			mark.hide();
		},
		itemClick: function(data){
			container.addPanel(data)
		}
	});	
	var tabs = new VortexPanelTabs({

		tabsId: 'vortex-panel-tabs',
		
		changeSeletedTab: function(data, self){
			var count = vortexContainer.vortexSearchCount,
				countLength = count.length,
				condition = vortexContainer.vortexSearchCondition,
				conditionLength = condition.length,
				selected = vortexContainer.vortexSearchSelected,
				selectedLength = selected.length,
				list = vortexContainer.vortexSearchList,
				listLength = list.length,
				detail = vortexContainer.vortexSearchDetails,
				detailLength = detail.length;


			for(var i = countLength - 1; i >= 0; i--){
				count[i].obj.hide();
				if(count[i].tabsIndex === data)
					count[i].obj.show();
			}

			for(var i = conditionLength - 1; i >= 0; i--){
				condition[i].obj.hide();
			}

			for(var i = selectedLength - 1; i >= 0; i--){
				selected[i].obj.hide();
				selected[i].obj.setAllFold();
				if(selected[i].tabsIndex === data)
					selected[i].obj.show();
			}

			for(var i = listLength - 1; i >= 0; i--){
				list[i].obj.hide();
				if(list[i].tabsIndex === data)
					list[i].obj.show();
			}

			for(var i = detailLength - 1; i >= 0; i--){
				detail[i].obj.hide();
			}

			self.show();

			if(data == 'car'){
				legend.setParam([
					{ name:'洒水车', color:'#2f323a', icon:'&#xe629;' },
					{ name:'清扫车', color:'#4d77be', icon:'&#xe629;' }
				]);

			}else if(data == 'facility'){
				legend.setParam([
					{ name:'垃圾桶', color:'#2f323a', icon:'&#xe62d;' },
					{ name:'中转站', color:'#4d77be', icon:'&#xe620;' }
				]);

			}else if(data == 'person'){
				legend.setParam([
					{ name:'保洁人员', color:'#2f323a', icon:'&#xe628;' },
					{ name:'考核人员', color:'#4d77be', icon:'&#xe628;' }
				]);

			}
		}
	});

	var view = new VortexView({
		viewId: 'vortex-view',
		viewList: [
			{ name: '车辆', selected: true },
			{ name: '人员', selected: false },
			{ name: '设施', selected: false },
			{ name: '考核记录', selected: false },
			{ name: '异常警报', selected: true },
			{ name: '标记', selected: false },
			{ name: '热力图', selected: false }
		],
		itemClick: function(){
			console.log('view item click.');
		}
	});

	var video = new VortexVideo({
		videoId: 'vortex-video'
	});

	var cover = new VortexCover({
		coverId: 'vortex-cover',
		src: ''
	});

	var legend = new VortexLegend({
		legendId: 'vortex-legend'
	});

	var container = new VortexToolsContainer({
		containerId: 'vortex-panel-container',
		removePanel: function(data){
			tools.setSelectedFalse(data);
		}
	});

	_this.init = function(){
		search.init();
		tabs.init();
		timer.init();
		theme.init();
		area.init();
		mark.init();
		tools.init();
		view.init();
		video.init();
		cover.init();
		legend.init();
		container.init();
		setParam();
	}

	function setParam(){
		legend.setParam([
			{ name:'洒水车', color:'#66CD00', icon:'&#xe629;' },
			{ name:'清扫车', color:'#0099ff', icon:'&#xe629;' },
			{ name:'垃圾车', color:'#ff0000', icon:'&#xe629;' }
		]);

		theme.setParam([ 
			{ name: '垃圾收运' }, 
			{ name: '作业考核' }
		]);

		tools.setParam([
			{ name:'速度仪表盘', id: '1' },
			{ name:'效率仪表盘', id: '2' },
			{ name:'总量仪表盘', id: '3' }
		]);

		// mark.setParam([ 
		// 	{ name: '垃圾收运', selected: false }, 
		// 	{ name: '作业考核', selected: false }
		// ]);

		area.setParam([
			{ name: '苏州' }, 
			{ name: '佛山' },
			{ name: '无锡' },
		]);

		view.setParam([
			{ name: '车辆', selected: true },
			{ name: '人员', selected: false },
			{ name: '设施', selected: false },
			{ name: '考核记录', selected: false }
		]);
	}

}