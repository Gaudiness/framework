"use strict";

//历史轨迹控件
var VortexContrail = function(config){
	var _this = this,
		contrailId = config.contrailId,
		timeSlot = config.timeSlot,
		contrailIntervel,
		spead = config.spead * 1000;

	//历史控件的view/model
	_this.contrailManagement = {
		timeSlot: ko.observableArray([]),

		pause: ko.observable(true),

		selectedIndex: ko.observable(),

		changeSelected: function(data){
			var timeSlot = _this.contrailManagement.timeSlot(),
				length = timeSlot.length;

			for(let i = 0; i < length; i ++){
				timeSlot[i].timeSlotStaus('none');
				timeSlot[i].inTimeSlotline(false);	
			}
			
			for(let i = 0; i < data.index(); i ++){
				timeSlot[i].timeSlotStaus('travelled');
				timeSlot[i].inTimeSlotline(true);	
			}
			data.timeSlotStaus('selected');
			_this.contrailManagement.selectedIndex(data.index());

		},

		contrailPlay: function(){
			var management = _this.contrailManagement,
				pause = management.pause,
				timeSlot = management.timeSlot(),
				length = timeSlot.length,
				index = management.selectedIndex;

			clearInterval(contrailIntervel);

			if(pause()){
				contrailIntervel = setInterval(function(){
					timeSlot[index()].timeSlotStaus('travelled');
					timeSlot[index()].inTimeSlotline(true);

					if(index() == length - 1){
						index(0);
						for(let i = 0; i < length; i ++){
							timeSlot[i].timeSlotStaus('none');
							timeSlot[i].inTimeSlotline(false);	
						}
						clearInterval(contrailIntervel);
						pause(true);
					}else {
						index(index() + 1);
						
					}
		
					timeSlot[index()].timeSlotStaus('selected');
				}, spead);
			}else{
				clearInterval(contrailIntervel);
			}
			pause(!pause());
		},

		turnLeft: function(){
			var index = _this.contrailManagement.selectedIndex,
				timeSlot = _this.contrailManagement.timeSlot();

			if(index() > 0){
				timeSlot[index()].timeSlotStaus('none');
				index(index() - 1);
				timeSlot[index()].inTimeSlotline(false);
				timeSlot[index()].timeSlotStaus('selected');	
			}
		},

		turnRight: function(){
			var index = _this.contrailManagement.selectedIndex,
				timeSlot = _this.contrailManagement.timeSlot(),
				length = timeSlot.length;

			timeSlot[index()].timeSlotStaus('travelled');
			timeSlot[index()].inTimeSlotline(true);
			if(index() == length - 1){
				for(let i = 0; i < length; i ++){
					timeSlot[i].timeSlotStaus('none');
					timeSlot[i].inTimeSlotline(false);	
				}
				index(0);
				timeSlot[index()].timeSlotStaus('selected');
			}else{
				index(index() + 1);
				timeSlot[index()].timeSlotStaus('selected');
			}
		}
	}

	_this.contrailManagement.icon = ko.dependentObservable(function(){
		var pause = _this.contrailManagement.pause();
		return pause?'&#xe63c;':'&#xe63e;';
	});

	_this.contrailManagement.selectedIndex.subscribe(function(){
		_this.selectedChanged();
	});

	_this.init = function(){
		_this.setManagementParam();
		_this.contrailBinding();
	}

	_this.setManagementParam = function(){
		var management = _this.contrailManagement,
			timeS = management.timeSlot,
			length = timeSlot.length - 1,
			width = 1/length * 100;

		timeSlot = ko.mapping.fromJS(timeSlot)();

		for(let i = 0; i <= length; i++){
			var attibutAdd = {
				width: ko.observable(i==length?0:width + '%'),
				timeSlotStaus: ko.observable(i?'none':'selected'),
				inTimeSlotline: ko.observable(false),
				index: ko.observable(i),
			}
			$.extend(timeSlot[i], attibutAdd);
		}

		timeS(timeSlot);

		management.selectedIndex(0);
	}

	_this.selectedChanged = config.selectedChanged || function(){

	}


	_this.contrailBinding =function(){
		var element = document.getElementById(contrailId);
		if(contrailId){
			ko.cleanNode(element);
			ko.applyBindings(_this.contrailManagement, element);
		}
	}
}