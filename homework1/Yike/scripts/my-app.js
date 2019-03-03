var Yike=angular.module('Yike',['ngRoute'])

Yike.config(['$routeProvider', function($routeProvider){
    $routeProvider
    .when('/today',{templateUrl: './views/today.html',
    	controller: 'TodayController'
    })
    .when('/older',{templateUrl: './views/older.html',
    	controller: 'OlderController'
    })
    .when('/author', {
		templateUrl: './views/author.html',
		controller: 'AuthorController'
	})
	/*.when('/category', {
		templateUrl: './views/category.html',
	})
	.when('/favourite', {
		templateUrl: './views/favourite.html',
	})
	.when('/settings', {
		templateUrl: './views/settings.html',
	})*/
/*    .when('/older',{template:'这是往期内容页面'})*/
    .otherwise({redirectTo:'/today'});
}]);

Yike.run(['$rootScope', function ($rootScope) {
	// 设置类名初始值
	$rootScope.collapsed = false;

	// 全局方法
	$rootScope.toggle = function () {
		// console.log(1);
		// 改变类名初始值
		$rootScope.collapsed = !$rootScope.collapsed;

		// 获取所有导航
		var navs = document.querySelectorAll('.navs dd');

		if($rootScope.collapsed) {
			// console.log('打开');
			for(var i=0; i<navs.length; i++) {
				navs[i].style.transform = 'translate(0)';
				navs[i].style.transitionDelay = '0.2s';
				navs[i].style.transitionDuration = (i + 1) * 0.15 + 's';
			}
		} else {
			// console.log('关闭');
			// 6 
			// 6 - 1
			var len = navs.length - 1;
			for(var j=len; j>0; j--) {
				// console.log(navs.length - j + 1);
				navs[j].style.transform = 'translate(-100%)';
				navs[j].style.transitionDelay = '';
				navs[j].style.transitionDuration = (len - j) * 0.15 + 's';
			}
		}
	}
}]);



/*
Yike.controller('DemoController', function ($scope) {
	console.log('启动了');
});

// 导航菜单
Yike.controller('NavController', ['$scope', function ($scope) {
	// 导航数据
	$scope.navs = [
		{link: '#!/today', text: '今日一刻', icon: 'icon-home'},
		{link: '#!/older', text: '往期内容', icon: 'icon-file-empty'}
	];
}])
Yike.controller('TodayController', ['$scope', function ($scope) {
	
}])

Yike.controller('OlderController', ['$scope', function ($scope) {
	
}])*/