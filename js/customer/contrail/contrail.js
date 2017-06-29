$(function(){
	contrail.init();
});

var contrail = {
	contrailPanel: new VortexContrail({
		contrailId: 'vortex-trajectory',
		timeSlot:[
			{ TimePoint: '12:00' },
			{ TimePoint: '12:00' },
			{ TimePoint: '12:00' },
			{ TimePoint: '12:00' },
			{ TimePoint: '12:00' },
			{ TimePoint: '12:00' },
			{ TimePoint: '12:00' },
			{ TimePoint: '12:00' },
			{ TimePoint: '12:00' },
			{ TimePoint: '12:00' }
		],

		spead: 1,

		selectedChanged: function(){
			// console.log(2222);
		}
	}),

	init: function(){
		contrail.contrailPanel.init();
	}
}