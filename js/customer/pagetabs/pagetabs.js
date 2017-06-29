var pageManagement = {
	
	tabs: new VortesPageTabs({
		tabsId: 'vortex-page-tabs',
		title: '苏·7456'
	}),

	init: function(){
		pageManagement.tabs.init();
		pageManagement.tabs.setList([
			{ title: '油耗', id: '1' },
			{ title: '速度', id: '2' },
			{ title: '啊手动阀', id: '3' }
		]);
	},
}

$(function(){
	pageManagement.init();
})