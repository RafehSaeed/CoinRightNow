(function(){

var app = angular.module('coinrightnow');

function CoinController ($rootScope,$scope,$interval,coin,$routeParams,$filter,lang, $route) {



	if (typeof $rootScope.selectedLanguage == "undefined") {
		$rootScope.selectedLanguage = lang;
	}

	$scope.loadmarket = false;
	$scope.loaddiscussion = false;
	$scope.loadgraph = true;
	$scope.amounttoconvert="";
	$scope.convertedamount= "";
	coin.getLangList();

	var myChart;
	$scope.loader= true;
	getCoin();

function getCoin(){

	if (typeof $rootScope.coins == "undefined") {

		coin.getCoins().then(function(data) {
			$rootScope.coins= data;
			coin.getExchangeRates();
			console.log($rootScope.coins);
			$scope.coin= $rootScope.coins[$routeParams.id-1];

			getCoinGraph($scope.coin.id);
			setDisqus();
			defineMetas();
				
		});
	}
	
	if (typeof $rootScope.coins != "undefined") {
		$scope.coin= $rootScope.coins[$routeParams.id-1];
		coin.getExchangeRates();
		getCoinGraph($scope.coin.id);
		setDisqus();
		defineMetas();

	}
}

function defineMetas(){

	var description = "Information for the cryptocurrency | " + $scope.coin.name + " | " + "Historical Data | Markets | Graph..." 
	console.log( description);
	document.title =  $scope.coin.name;
	$(function () { // dom ready
	    $('meta[name=description]').remove();
	    $('head').append( '<meta name="description" content=" '+ description+' ">' );
	});



}

//Changes the language to something else
$rootScope.changeLanguage = function(symbol) {
	$rootScope.selectedLanguage = symbol;
	$route.reload();
};

$scope.convertPrice = function(currency) {

	coin.convertPrice(currency);
	$scope.update('toconvert');
	renderGraph();
};

$scope.update = function(type) {
	
if(type =="toconvert" && $scope.amounttoconvert!= ""){
		$scope.convertedamount= $scope.amounttoconvert* $rootScope.coins[$routeParams.id-1].price_usd;

}else{
 
if(type=='converted' && $scope.convertedamount!= ""){
	 $scope.amounttoconvert= $scope.convertedamount/ $rootScope.coins[$routeParams.id-1].price_usd;

 }

 if($scope.amounttoconvert== "" || $scope.convertedamount== ""){

	$scope.amounttoconvert= "";
	$scope.convertedamount= "";


 }

}
};

function setMetas(){

// Set the meta for the coin page over here

}

$scope.getGraphInterval = function(interval){

switch(interval) {
	case "7d":
		 renderGraph(8);
			break;
	case "30d":
			renderGraph(31);
			break;
	default:
		renderGraph();
}
};

function getCoinGraph(coinid){

	if (typeof $scope.coin.graph == "undefined") {
		coin.getCoinGraph(coinid).then(function(data) {
		$scope.coin.graph= data;
		renderGraph();
		});
}
else{

	renderGraph();
}
}

//Used to configure Disqus according to coins
function setDisqus(){

	$scope.disqusConfig = {
	disqus_identifier: $scope.coin.name,
	disqus_url: ""+ window.location.href
	};

	
}


//Gets data of market from the API
$scope.renderMarket = function(coinid)
{

if( $scope.loadmarket == false){
	$scope.loader = true;
}
	if(typeof $scope.coin.market == "undefined") {
			coin.getCoinMarkets(coinid).then(function(data) {

			$scope.loader = false;
			$scope.coin.market = data;

		 $scope.loadmarket = true;
			console.log($scope.coin.market);
	});

}
else{
	$scope.loader = false;
	
	$scope.loadmarket = true;
}
};

function renderGraph(interval)

{
	if(typeof myChart!= 'undefined'){
		myChart.destroy();
	}

// Initialize currency if missing a bit ugly but will do for now

	if($rootScope.selectedcurrency == 'undefined'){
		$rootScope.selectedcurrency = 'USD'
	}

	$scope.loader=false;
 
	var datesarray = [];
	var pricearray = [];
	var volumearray = [];

 $scope.coin.graph.filter(function (graph) {

			datesarray.push(graph.date);
			volumearray.push(graph.volume * $rootScope.exchangerates[$rootScope.selectedcurrency]);
			pricearray.push(graph.price  * $rootScope.exchangerates[$rootScope.selectedcurrency]);

});

if(interval!= 'undefined'){
			datesarray= datesarray.reverse().slice( datesarray.length-interval, datesarray.length);
			pricearray= pricearray.reverse().slice( pricearray.length-interval, pricearray.length);
			volumearray= volumearray.reverse().slice( volumearray.length-interval, volumearray.length);
}

	$scope.series = ['Price / Month'];
	Chart.defaults.LineWithLine = Chart.defaults.line;
	Chart.controllers.LineWithLine = Chart.controllers.line.extend({
		 draw: function(ease) {
				Chart.controllers.line.prototype.draw.call(this, ease);

				if (this.chart.tooltip._active && this.chart.tooltip._active.length) {
					 var activePoint = this.chart.tooltip._active[0],
							 ctx = this.chart.ctx,
							 x = activePoint.tooltipPosition().x,
							 topY = this.chart.scales['y-axis-0'].top,
							 bottomY = this.chart.scales['y-axis-0'].bottom;

					 // draw line
					 ctx.save();
					 ctx.beginPath();
					 ctx.moveTo(x, topY);
					 ctx.lineTo(x, bottomY);
					 ctx.lineWidth = 1;
					 ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
					 ctx.stroke();
					 ctx.restore();
				}
		 }
	});


var ctx = document.getElementById("myChart");
	myChart = new Chart(ctx, {
		type: 'bar',
		data: {
			'labels':  datesarray,
			'datasets': [{
				'type': 'LineWithLine',
				'label': 'Price',
				'fill': true,
				'data': pricearray,
				'yAxisID': 'y-axis-0',
				'radius': 1,
				'borderColor': 'orange',
				'backgroundColor': 'rgba(255, 165, 0, 0.24)'

			}, {
				'type': 'bar',
				'label': 'Volume',
				'fill': 'false',
				'borderColor': 'rgba(7, 122, 187, 0.39)',
				'backgroundColor': 'rgba(7, 122, 187, 0.39)',
				'data': volumearray,
				'yAxisID': 'y-axis-1'
			}]
		},
		options: {

			responsive: true,
			animation: false,
			scales: {

				yAxes: [{
					 gridLines: {
										color: "rgba(0, 0, 0, 0)",
								},
					position: 'left',
					'id': 'y-axis-0',
					ticks: {

						callback: function(label, index, labels) {
							if (label >= 2000) return $filter('getCurrencySymbol')($rootScope.selectedcurrency) + (label / 1000).toFixed(2) + 'k';
							else if (label >= 100) return $filter('getCurrencySymbol')($rootScope.selectedcurrency) + label.toFixed(0);
							else if (label < 1) return $filter('getCurrencySymbol')($rootScope.selectedcurrency) + label.toFixed(3);
							else return $filter('getCurrencySymbol')($rootScope.selectedcurrency) + label.toFixed(2);
						}
					},
				}, {
					position: 'right',
					'id': 'y-axis-1',
					ticks: {
						callback: function(label, index, labels) {
							if (label >= 1000) return ($filter('getCurrencySymbol')($rootScope.selectedcurrency) + label / 1000).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + 'k';
							else return $filter('getCurrencySymbol')($rootScope.selectedcurrency) + label;
						}
					},
				}],
				
						xAxes: [{
								gridLines: {
										display:false
								}
						}]
			},
			hover: {
				mode: 'nearest',
				intersect: true
			},
			tooltips: {
				intersect: false,
				enabled: true,
				mode: 'label',
				callbacks: {
					label: function(tooltipItems, data) {
						if (tooltipItems.datasetIndex == 0)
							return 'Price:' + $filter('getCurrencySymbol')($rootScope.selectedcurrency) + (tooltipItems.yLabel >= 1 ? ('' + tooltipItems.yLabel.toFixed(2)).replace(/\B(?=(\d{3})+(?!\d))/g, ',') : tooltipItems.yLabel.toFixed(6));
							return ('Volume:' + $filter('getCurrencySymbol')($rootScope.selectedcurrency) + Math.floor(tooltipItems.yLabel)).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
					}
				}
			},
		},
	});


}

}
app.controller('CoinController',['$rootScope','$scope','$timeout','coin','$routeParams','$filter', 'lang', '$route', CoinController]);

})();