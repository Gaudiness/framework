var menuManagement = {

	user: new userPanel({
		panelId: 'vortex-user-panel',

		mouseEnter: function(){
			menuManagement.menu.toggleMenuDetails();
		},

		mouseleave: function(){
			menuManagement.menu.toggleMenuDetails();
		}, 
		showGuide: function(){
			menuManagement.tabs.addTab({
				name: ko.observable('常见问题'),
				uri: 'guide.html'
			});
		},

		userItemClick: function(data){
			if(data.action === '修改密码'){
				menuManagement.cover.show();
				menuManagement.modifyInfo.show();

			}
			console.log(21212);
		}

	}),

	menu: new VortexFirstMenu({
		menuId: 'vortex-first-menu',
		data:[
			{
				name: '1', icon: '&#xe612;', children: [ 
					{ name: '2', icon: '&#xe612;',children:[
						{ name:'3', children:[
							{ name:'4', children: null }
						]} 
					]},
					{ name: '5', icon: '&#xe612;', children: [
						{ name: '6', children: null }] 
					}]
			},{
				name: '7', icon: '&#xe605;', children: [ 
					{ name: '8', icon: '&#xe612;',children: [
						{ name: '12', children: null },{ name: '13', children: null }] },
					{ name: '14', icon: '&#xe612;', children: null } ]
			},{
				name: '9', icon: '&#xe602;', children: []
			},{
				name: '10', icon: '&#xe60b;', children: [ 
					{ name: '11', icon: '&#xe612;', children: null },
					{ name: '15', icon: '&#xe612;', children: null } ]
			}
		],

		mouseEnter: function(data){
			menuManagement.user.toggleNameShow(data);
		},

		menuLeave: function(data){
			menuManagement.user.toggleNameShow(data);
		},

		menuClick: function(data, title){
			var id = 'vortex-first-menu';
			menuManagement.submenu.setMenuList(data);
			menuManagement.submenu.setTitle(title);
			menuManagement.submenu.show(id);

		}

	}),

	submenu: new VortexSubMenu({
		menuId: 'vortex-sub-menu',
		mouseLeave: function(){
			menuManagement.menu.toggleMenuDetails('hide');
			menuManagement.user.toggleNameShow();
		},
		itemClick: function(data){
			menuManagement.tabs.addTab({
				name: data.name,
				uri: data.uri?data.uri:'contrail.html'
			});


		}
	}),

	tabs: new VortexMenuTabs({
		tabsId: 'vortex-menu-tabs',
		homeUri: 'search.html'
	}),

	cover: new VortexCover({
		coverId: 'vortex-body-cover',
		type: 'noIframe'
	}),

	alarm: new VortexTags({
		alarmId: 'vortex-alarm',
		type: 'alarm',
		icon: '&#xe61c;',
		content: '条报警信息',
		itemClick: function(self){
			
			self.setCount(222);

			menuManagement.cover.show();
			menuManagement.menuInfo.show(['vortex-alarm', 'vortex-screen']);
		}
	}),

	system: new VortexTags({
		alarmId: 'vortex-system',
		icon: '&#xe61e;',
		type: 'dorpdown',
		content: '切换系统',
		list: [ '系统一', '系统二', '系统三',  '系统四'],
		dropClick: function(data){
			console.log(data);			
		}
	}),

	sytmName: new VortexTags({
		alarmId: 'vortex-system-name',
		icon: '&#xe61a;',
		type: 'dorpdown',
		content: '机械化作业监管系统',
		dropClick: function(data){
			console.log(data);			
		}
	}),

	exit: new VortexTags({
		alarmId: 'vortex-exit',
		icon: '&#xe61d;',
		type: 'dorpdown',
		content: '退出',
		itemClick: function(){
			menuManagement.cover.show();
			menuManagement.extiInfo.show();	
		}
	}),

	screen: new VortexTags({
		alarmId: 'vortex-screen',
		icon: '&#xe624;',
		type: 'dorpdown',
		content: '全屏',
		itemClick: function(){
			menuManagement.tabs.fullScreen('framework-body');
		}
	}),

	menuInfo: new VortexMenuInfo({
		menuInfoId: 'vortex-menu-Info',
		hide: function(){
			menuManagement.cover.hide();
		}
	}),

	extiInfo: new VortexExit({
		exitId: 'vortex-exit-info',
		exit: function(self){
			menuManagement.cover.hide();
			self.hide();
		},
		cancel: function(self){
			menuManagement.cover.hide();
			self.hide();
		}
	}),

	modifyInfo: new VortexModifyPWD({
		modifyId: 'vortex-modify-pwd',
		submit: function(self){
			menuManagement.cover.hide();
			self.hide();
		},

		cancel: function(self){
			menuManagement.cover.hide();
			self.hide();
		}
	}),

	init: function(){
		menuManagement.user.init();
		menuManagement.menu.init();
		menuManagement.submenu.init();
		menuManagement.tabs.init();
		menuManagement.alarm.init();
		menuManagement.system.init();
		menuManagement.exit.init();
		menuManagement.screen.init();
		menuManagement.cover.init();
		menuManagement.menuInfo.init();	
		menuManagement.extiInfo.init();	
		menuManagement.modifyInfo.init();
		menuManagement.sytmName.init();

	}

}

$(function(){
	menuManagement.init();
});