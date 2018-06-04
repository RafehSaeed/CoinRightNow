(function(){

//Factory for fetching cryptocurrency information from the API
var app = angular.module('coinrightnow');


var coin= function($http,$rootScope){

	// Stores language information 
	var lang;


	

	  if (typeof $rootScope.basecurrency == "undefined") {
	  $rootScope.basecurrency = 'USD';
	  }

	  if (typeof $rootScope.selectedcurrency == "undefined") {
	    $rootScope.selectedcurrency = 'USD';
	  }

	function getCoinList() {
		return $http.get('http://api.coinrightnow.com/coinlist')
			.then(function(response) {
				console.log(response);
		
			 return response.data;
		});
	}

	function getTopPerformer() {
		return $http.get('http://api.coinrightnow.com/gettopperformers')
			.then(function(response) {
		
		
			 return response.data;
		});
	}

	function getCoinGraph(coinid){

			return $http.get('http://api.coinrightnow.com/coingraph/'+ coinid)
			.then(function(response) {
			 return response.data;
		});
	}

	function getCoinMarkets(coinid){

			return $http.get('http://api.coinrightnow.com/market/'+ coinid)
			.then(function(response) {
			 return response.data;
		});
	}


	function getExchangeRates() {
		 $http.get('http://api.coinrightnow.com/currencylist')
			.then(function(response) {
				response.data.rates.USD= 1.00;
			 	$rootScope.exchangerates=response.data.rates;
				console.log($rootScope.exchangerates);
		});
	}



	function getLanguages() {
		return $http.get('http://api.coinrightnow.com/languages')
			.then(function(response) {		
			 return response.data;
		});
	}

	function addMissingImage(image){
		$rootScope.missingImages.push(image)
	}

	function setLanguages(func) {
			 $http.get('http://api.coinrightnow.com/languages')
			.then(function(response) {
				lang  = response.data
				func(lang);
		});
	}

	// Call back function
	function getLangList(){
		if(typeof lang == 'undefined'){
			setLanguages(function(){
				$rootScope.languages = lang;
			});
		}
	}

	//converts price of all coins into the specified currency
	function convertPrice(currency) {

	$rootScope.selectedcurrency = currency;
	if($rootScope.basecurrency != $rootScope.selectedcurrency){
		if ($rootScope.basecurrency!='USD') {

			for (var j = 0; j < $rootScope.coins.length; j++) {
			$rootScope.coins[j].price_usd /= $rootScope.exchangerates[$rootScope.basecurrency];
			$rootScope.coins[j].market_cap_usd /= $rootScope.exchangerates[$rootScope.basecurrency];
			$rootScope.coins[j]["24h_volume_usd"] /= $rootScope.exchangerates[$rootScope.basecurrency];
						
		}

		}
		$rootScope.basecurrency = $rootScope.selectedcurrency;


		for (var i = 0; i < $rootScope.coins.length; i++) {
			$rootScope.coins[i].price_usd *= $rootScope.exchangerates[currency];
			$rootScope.coins[i].market_cap_usd *= $rootScope.exchangerates[$rootScope.basecurrency];
			$rootScope.coins[i]["24h_volume_usd"] *= $rootScope.exchangerates[$rootScope.basecurrency];
		}
	}
	}

	return{
		getLangList : getLangList,
		getCoins : getCoinList,
		getCoinGraph: getCoinGraph,
		getExchangeRates: getExchangeRates,
		getCoinMarkets: getCoinMarkets,
		convertPrice: convertPrice,
		getTopPerformer: getTopPerformer,
		getLanguages: getLanguages,
		addMissingImage: addMissingImage
	};

};


app.factory("coin",coin);

}());