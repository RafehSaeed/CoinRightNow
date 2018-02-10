(function(){

var app = angular.module('coinrightnow');

function MainController ($rootScope,$scope,$interval,coin,$routeParams,article,lang,$route) {

	defineScopeVariables();
	getArticleList();
	$scope.limitnum= 0;
	$scope.coinID= $routeParams.id;
	$scope.showTopPerformer = true;
	$scope.showWorstPerformer = false ;
	$rootScope.topPerformer;
	$rootScope.worstPerformer;
	$rootScope.selectedLanguage;





//Looping through the first 100 elements
$scope.incrementLimit = function() {

    $scope.limitnum += 10;
    $scope.limitnum = $scope.limitnum % $scope.coins.length;
};

//Getting first 100 coins
function getCoinList () {

	$interval(getCoinList, 60000);
	coin.getCoins().then(function(data) {
		getTopPerformer();
		$rootScope.coins= data;
		$rootScope.basecurrency = 'USD';
		console.log($rootScope.coins);

	if (typeof $scope.selectedcurrency != "undefined") 
		{$scope.convertPrice($scope.selectedcurrency);
		}
	});
}

function getTopPerformer() {

	coin.getTopPerformer().then(function(data){
		$rootScope.topPerformer = JSON.parse(data[0].topcoin);
		$rootScope.worstPerformer = JSON.parse(data[0].worstcoin);
	});
}

//converts price of all coins into the specified currency
$scope.convertPrice = function(currency) {

 	coin.convertPrice(currency);
};

//Get Languages
function getLanguages () {
	coin.getLanguages().then(function(data){
   		$rootScope.languages = data;
   		console.log(data);
	});
}

//Changes the language to something else
$rootScope.changeLanguage = function(symbol) {
	$rootScope.selectedLanguage = symbol;
	$route.reload();

};

//define rootscope variables with checks
function defineScopeVariables(){

	if (typeof $rootScope.coins == "undefined") {
		getCoinList();
	}

	if (typeof $rootScope.languages == "undefined") {
		getLanguages();
	}

	if (typeof $rootScope.topPerformer == "undefined") {
		getTopPerformer();
	}

	if (typeof $rootScope.rates == "undefined") {
		coin.getExchangeRates();
	}

	if (typeof $rootScope.selectedLanguage == "undefined") {
		$rootScope.selectedLanguage = lang;
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

app.controller('MainController',['$rootScope','$scope','$timeout','coin','$routeParams', 'article', 'lang','$route', MainController]);

})();

