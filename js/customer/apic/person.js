$(function(){
	var p = new personManagement();
	p.init();
});

var personManagement = function(){
	var _this = this;

	var tabs = new VortexPanelTabs();

	var personSelected = new VortexSearchSelected({
		selectedId: 'person-selected',
		tabsIndex: 'person',
		iconClick: function(data, status){

		}
	});

	var personList = new VortexSearchList({
		listId: 'person-list',
		tabsIndex: 'person',
		type: 'noPic',
		showDetails: function(self){
			self.hide();
		}
	});

	var personCondition = new VortexSearchCondition({
		conditionId: 'car-condition',
		tabsIndex: 'car',
		type: 'single',
		submit: function(data, string, index){
			
		}
	})

	_this.init = function(){
		addPersonTabs();
		inPattern();
		setParam();
	}

	function addPersonTabs(){
		tabs.addTabs({
			name: '人员',
			icon: '&#xe628;',
			visible: false,
			tabsIndex: 'person'
		});
	}

	function inPattern(){
		personSelected.init();
		personList.init();
	}

	function setParam(){
		personSelected.setParam([
			{ name: '保洁', checked: false, item:[] },
			{ name: '巡检', checked: false, item:[] }
		]);

		personList.setParam([
			{ area: '工业园区', company: '公司A', name: '高X', dayShift: '8:00-18:00', nightShift: '19:00~23:00' },
			{ area: '工业园区', company: '公司A', name: '施XX', dayShift: '8:00-10:00', nightShift: '' },
			{ area: '工业园区', company: '公司A', name: '施XX', dayShift: '8:00-10:00', nightShift: '' },
			{ area: '工业园区', company: '公司A', name: '施XX', dayShift: '8:00-10:00', nightShift: '' }
		]);
	}
}