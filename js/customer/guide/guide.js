$(function(){
	management.init()
});

var management = {
	guide: new VortexGuide({
		guideId: 'vortex-pattern-guide',
		tabsList: [
			{ name: 'One', selected: false },
			{ name: 'Two', selected: false },
			{ name: 'Three', selected: false },
			{ name: 'Four', selected: false }
		]
	}),
	init: function(){
		management.guide.init();
	}
}