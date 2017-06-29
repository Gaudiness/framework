$(function(){
	var p = new carManagement();
	p.init();
});

var carManagement = function(){
	var _this = this,
		
		tabs = new VortexPanelTabs();
		
		carConditon = new VortexSearchCondition({
			conditionId: 'car-condition',
			tabsIndex: 'car',
			type: 'single',
			submit: function(data, string, index){
				carSelected.setIconFold(index);
				carSelected.SetSelectedString(string, index);
			}
		}),
		
		carSelected = new VortexSearchSelected({
			selectedId: 'car-selected',
			tabsIndex: 'car',
			iconClick: function(data, status, checked){
				carConditon.setParam({
					visible: status,
					list: data.item(),
					index: data.index,
					checked: checked
				});

				console.log(carConditon.getSelectedItem());
			}
		}),
		
		carList = new VortexSearchList({
			listId: 'car-list',
			tabsIndex: 'car',
			type: 'noTitle',
			showDetails: function(self){
				
				tabs.hide();
				
				carCount.hide();
				
				carSelected.hide();
				
				carConditon.hide();
				
				self.hide();
				
				carDetails.show();
				
				carDetails.setParam({
					tabs: [{ 
						name: '基本信息', type: 'basicInfo', data:[
							{ label : "名称", value : "鸿业市场公厕" }, 
							{ label : "设施状态", value : null }, 
							{ label : "行政区划", value : "祖庙" }, 
							{ label : "启用日期", value : "2001-01-01" }, 
							{ label : "地址", value : "鸿业市场侧" }, 
							{ label : "所有权归属单位", value : null }, 
							{ label : "作业公司", value : null }, 
							{ label : "管理人姓名", value : null }, 
							{ label : "管理人电话", value : null }, 
							{ label : "保洁作业时间", value : null }
						],
						photo: 'images/nopic.png' 
					}],
					title: {
						label: '车牌号：苏E·XXXXX 人民西路XX'
					},
					btns: [
						{ name: '历史轨迹', src: 'contrail.html' },
						{ name: '数据分析', src: 'pageTabs.html' },
					]
				});
			}
		});

		carCount = new VortexSearchCount({
			countId: 'car-count',
			tabsIndex: 'car',
			countFirst: 1,
			firstClick: function(){
				console.log(1);
			},
			countSecond: 2,
			secondClick: function(){
				console.log(2);
			},
			countThird: 3,
			thirdClick: function(){
				console.log(3);
			},
			countForth: 4,
			forthClick: function(){
				console.log(4)
			}
		}),

		carDetails = new VortexSearchDetails({
			detailsId: 'car-details',
			tabsIndex: 'car',
			goBack: function(self){
				carCount.show();
				carList.show();
				carSelected.show();
				tabs.show();
				self.hide();
			},

			openIframe: function(data){
				var cover = new VortexCover();
				cover.show(data.src);
			}

		});

	_this.init = function(){
		addCarTabs();
		inPattens();
		setParam();
	}

	function addCarTabs(){
		tabs.addTabs({
			name: '车辆',
			icon: '&#xe629;',
			visible: true,
			tabsIndex: 'car'
		});
	}

	function inPattens(){
		carConditon.init();
		carSelected.init();
		carList.init();
		carCount.init();
		carDetails.init();
	}

	function setParam(){
		carSelected.setParam([
			{
				name:'车型', checked: false, 
				item: [{name: '转运车', checked: false}, {name: '垃圾车', checked: false}, {name: '机扫车', checked: false}, {name: '压缩车', checked: false}, {name: '洒水车', checked: false}, {name: '吸污车', checked: false}]
			},{
				name:'公司', checked: false, 
				item: [{name: '公司A', checked: false}, {name: '公司B', checked: false}, {name: '公司C', checked: false}]
			},{
				name:'标段', checked: false, 
				item: [ {name: '标段A', checked: false}, {name: '标段B', checked: false}, {name: '标段C', checked: false},
						{name: '标段A', checked: false}, {name: '标段B', checked: false}, {name: '标段C', checked: false},
						{name: '标段A', checked: false}, {name: '标段B', checked: false}, {name: '标段C', checked: false},
						{name: '标段A', checked: false}, {name: '标段B', checked: false}, {name: '标段C', checked: false},
						{name: '标段A', checked: false}, {name: '标段B', checked: false}, {name: '标段C', checked: false}]
			}
		]);

		carList.setParam([
			{ typeName: '垃圾车', companyName: '公司A', carCode: '苏Exxxxx', scheduleTime: '9:00-11:00, 9:00-11:00', photos: '' },
			{ typeName: '垃圾车', companyName: '公司A', carCode: '苏Exxxxx', scheduleTime: '9:00-11:00, 9:00-11:00', photos: '' },
			{ typeName: '垃圾车', companyName: '公司A', carCode: '苏Exxxxx', scheduleTime: '9:00-11:00, 9:00-11:00', photos: '' },
			{ typeName: '垃圾车', companyName: '公司A', carCode: '苏Exxxxx', scheduleTime: '9:00-11:00, 9:00-11:00', photos: '' }
		]);

		carCount.setCount([null, 2, null, 2]);
	}

}