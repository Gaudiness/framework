$(function(){
	var p = new facilityManagement();
	p.init();
});

var facilityManagement = function(){
	var _this = this,
		tabs = new VortexPanelTabs(),

		falicityConditon = new VortexSearchCondition({
			conditionId: 'facility-condition',
			tabsIndex: 'facility',
			type: 'conplex',
			submit: function(data, string, index){
				facilitySelected.setIconFold(index, data);
				facilitySelected.SetSelectedString(string, index);
			}
		}),
		
		facilitySelected = new VortexSearchSelected({
			selectedId: 'facility-selected',
			tabsIndex: 'facility',
			iconClick: function(data, status){
				falicityConditon.setParam({
					visible: status,
					list: data.item(),
					index: data.index
				});
			}

		}),
		
		facilityList = new VortexSearchList({
			listId: 'facility-list',
			tabsIndex: 'facility',
			type: 'withTitle',
			showDetails: function(self){
				console.log('facilityList . click');
				self.hide();
			}
		});

	_this.init = function(){
		addTabs();
		inPattens();
		setParam();
		// show();
	}

	function addTabs(){
		tabs.addTabs({
			name: '设施',
			icon: '&#xe613;',
			visible: true,
			tabsIndex: 'facility'
		})
	}

	function setParam(){
		facilitySelected.setParam([
			{ name: '设施', checked: false, item: [
				{
					name: '公厕', checked: false, count: 120, iconfont: '&#xe632;', item: [{name: '一级', checked: false}, {name: '二级', checked: false}, {name: '三级', checked: false}]
				},{
					name: '中转站', checked: false, count: 43, iconfont: '&#xe635;', item: [{name: '中转站1', checked: false}, {name: '中转站2', checked: false}, {name: '中转站3', checked: false}]
				},{
					name: '垃圾桶', checked: false, count: 64, iconfont: '&#xe62d;', item: [{name: '垃圾桶1', checked: false}, {name: '垃圾桶2', checked: false}]
				},{
					name: '处置场', checked: false, count: 64, iconfont: '&#xe633;', item: [{name: '处置场', checked: false}]
				},{
					name: '垃圾收集点', checked: false, count: 64, iconfont: '&#xe63a;', item: [{name: '1', checked: false}, {name: '2', checked: false}, {name: '3', checked: false}]
				}]
			}
		]);

		facilityList.setParam([
			{ title: 'one', type: '一级公厕', address: '就是离开房间了深刻的佛教历史', service: '全天', typeCode: '0' },
			{ title: 'two', type: 'N级公厕', address: '经理说快递放假了身份既让他', service: '全天', typeCode: '0' },
			{ title: 'two', type: '特级公厕', address: '经理说快递放假了身份既让他', service: '全天', typeCode: '0' },
			{ title: 'one', type: '处置场1', address: '士大夫士大夫', service: '全天', typeCode: '0' },
			{ title: 'eleven', type: '视屏', address: '士大夫士大夫', service: '全天', typeCode: '1' },
			{ title: 'eleven1', type: '视频', address: '士大夫士大夫', service: '全天', typeCode: '1' }
		]);

	}

	function inPattens(){
		falicityConditon.init();
		facilitySelected.init();
		facilityList.init();
	}

	function show(){
		facilitySelected.show();
		facilityList.show();
	}
}