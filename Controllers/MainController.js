(function(){



function MainController ($rootScope,$scope,$interval,coin,$routeParams,article,lang,$route) {


	defineScopeVariables();
	getArticleList();

	$scope.missingImages = [];
	$scope.limitnum= 0;
	$scope.coinID= $routeParams.id;
	$scope.showTopPerformer = true;
	$scope.showWorstPerformer = false ;
	// Store link to missing images here
	$rootScope.missingImages  = [];
	$rootScope.topPerformer;
	$rootScope.worstPerformer;
	$rootScope.selectedLanguage;
	$scope.globaldata ;
	getGlobalData();

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


	function defineMetas(){

		document.title =  "CoinRightNow | Cryto-Informatics";
		$(function () { // dom ready
		    $('meta[name=description]').remove();
		    $('head').append( '<meta name="description" content="Best source for cryptocurrency informatics | Graphs | Historical Data | Markets | News">' );
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
		});
	}

	//Changes the language to something else
	$rootScope.changeLanguage = function(symbol) {
		$rootScope.selectedLanguage = symbol;
		$route.reload();

	};

	// returns all articles as Json
	function getArticleList(){

		article.getArticleList().then(function(data) {
		$scope.articles = data;
		console.log($scope.articles);
		});
	}

	// get global stats data
	function getGlobalData(){

		console.log('I have been summoned')
		coin.getGlobalData().then(function(n){
			$scope.globaldata = n.data;
			console.log($scope.globaldata);
		})
	}


	//define rootscope variables with checks
	function defineScopeVariables(){

		defineMetas();

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

}

module.exports = {
MainController: MainController
};

})();

