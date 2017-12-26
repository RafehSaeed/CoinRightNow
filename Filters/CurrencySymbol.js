(function(){

var app = angular.module('coinrightnow');

//
function getCurrencySymbol(){

	return function(symbol){
		
		if(symbol == 'USD'){ return '$';}
		else if(symbol == 'CAD'){ return "C$";}
		else if(symbol == 'AUD'){ return 'A$';}
		else if(symbol == 'BGN'){ return 'лв';}
		else if(symbol == 'BRL'){ return 'R$';}
		else if(symbol == 'CHF'){ return 'Fr';}
		else if(symbol == 'CNY'){ return '¥';}
		else if(symbol == 'CZK'){ return 'Kč';}
		else if(symbol == 'DKK'){ return 'kr';}
		else if(symbol == 'GBP'){ return '£';}
		else if(symbol == 'HRK'){ return 'kn';}
		else if(symbol == 'HKD'){ return 'HK$';}
		else if(symbol == 'HUF'){ return 'Ft';}
		else if(symbol == 'IDR'){ return 'Rp';}
		else if(symbol == 'ILS'){ return '₪';}
		else if(symbol == 'INR'){ return '₹';}
		else if(symbol == 'JPY'){ return '¥';}
		else if(symbol == 'KRW'){ return '₩';}
		else if(symbol == 'MXN'){ return 'Mex$';}
		else if(symbol == 'MYR'){ return 'RM';}
		else if(symbol == 'NOK'){ return '₪';}
		else if(symbol == 'NZD'){ return 'NZ$';}
		else if(symbol == 'PHP'){ return '₱';}
		else if(symbol == 'PLN'){ return 'zł';}
		else if(symbol == 'RON'){ return 'L';}
		else if(symbol == 'RUB'){ return 'руб';}
		else if(symbol == 'SEK'){ return 'kr';}
		else if(symbol == 'SGD'){ return 'S$';}
		else if(symbol == 'THB'){ return '฿';}
		else if(symbol == 'TRY'){ return 'TL';}
		else if(symbol == 'ZAR'){ return 'R';}
		else if(symbol == 'EUR'){ return '€';}


	};
}

app.filter('getCurrencySymbol',getCurrencySymbol);
})();

