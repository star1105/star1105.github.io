Yike.controller('DemoController', function ($scope) {
	console.log('启动了');
});

// 导航菜单
Yike.controller('NavController', ['$scope', function ($scope) {
	// 导航数据
	$scope.navs = [
		{link: '#!/today', text: '今日一刻', icon: 'icon-home'},
		{link: '#!/older', text: '往期内容', icon: 'icon-file-empty'},
		{link: '#!/author', text: '热门作者', icon: 'icon-pencil'}
/*		{link: '#!/category', text: '栏目浏览', icon: 'icon-menu'},
		{link: '#!/favourite', text: '我的喜欢', icon: 'icon-heart'},
		{link: '#!/settings', text: '设置', icon: 'icon-cog'}*/
	];
}])
Yike.controller('TodayController', ['$scope','$http','$filter','$rootScope', function ($scope,$http,$filter,$rootScope) {
	$rootScope.loaded=false;
	/*获得计算机时间*/
	var today = $filter('date')(new Date,'yyyy-MM-dd');
	$http({
		url:'./api/today.php',
		method:'get',
		params: {today: today}
	}).then(function(info){
		$rootScope.loaded=true;
		$scope.date = info.data.date;
		$scope.stars = info.data.posts;
		console.log($scope.stars,today);
	});
}])

Yike.controller('OlderController', ['$scope','$http', '$rootScope',function ($scope,$http,$rootScope) {
	$rootScope.loaded=false;
	$http({
		url:'./api/older.php'
	}).then(function(info){
		$rootScope.loaded=true;
		$scope.date = info.data.date;
		$scope.stars = info.data.posts;
		console.log($scope.stars);
	});
}])

// 热门作者
Yike.controller('AuthorController', ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {
	// 
	$rootScope.index = 2;
	$rootScope.title = '热门作者';
	$rootScope.loaded = false;

	$http({
		url: './api/author.php'
	}).then(function (info) {
		$rootScope.loaded = true;
		$scope.rec = info.data.rec;
		$scope.all = info.data.all;
		console.log(info);
	});
}])