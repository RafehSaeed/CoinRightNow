(function(){

var app = angular.module('coinrightnow');

function MainController ($rootScope,$scope,$interval,coin,$routeParams,article) {

	defineScopeVariables();
	getArticleList();
	$scope.limitnum= 0;
	$scope.coinID= $routeParams.id;


//Looping through the first 100 elements
$scope.incrementLimit = function() {

    $scope.limitnum += 10;
    $scope.limitnum = $scope.limitnum % $scope.coins.length;
};

//Getting first 100 coins
function getCoinList () {

	$interval(getCoinList, 60000);
	coin.getCoins().then(function(data) {
		$rootScope.coins= data;
		$rootScope.basecurrency = 'USD';
		console.log($rootScope.coins);

	if (typeof $scope.selectedcurrency != "undefined") 
		{$scope.convertPrice($scope.selectedcurrency);
		}
	});
}

//converts price of all coins into the specified currency
$scope.convertPrice = function(currency) {

 	coin.convertPrice(currency);
};

//define rootscope variables with checks
function defineScopeVariables(){

	if (typeof $rootScope.coins == "undefined") {
		getCoinList();
	}

	if (typeof $rootScope.rates == "undefined") {
		coin.getExchangeRates();
	}
	

}

	// returns all articles as Json
	function getArticleList(){

		article.getArticleList().then(function(data) {
			
		$scope.articles = data;
		console.log($scope.articles);
		});


	}




}

app.controller('MainController',['$rootScope','$scope','$timeout','coin','$routeParams', 'article', MainController]);

})();

