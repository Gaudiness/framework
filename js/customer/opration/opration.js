$(function(){
	oprationManagement.init();
});

var oprationManagement = {
	opration: new VortexOpration({
		oprationId: 'vorte-opration'
	}),

	init: function(){
		oprationManagement.opration.init();
	}
}