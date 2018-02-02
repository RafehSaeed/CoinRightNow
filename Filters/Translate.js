(function(){

var app = angular.module('coinrightnow');

//
function translate(lang){

	return function(word){
// ENGLISH DICTIONARY
		if(lang == 'en'){
			switch(word){
				case "News Feed":
					return "News Feed";
				case "Articles":
					return "Articles";
				case "Chart":
					return "Chart";
				case "Top Performer":
					return "Top Performer";
				case "Rank":
					return "Rank";
				case "Coin":
					return "Coin";
				case "Price":
					return "Price";
				case "market":
					return "market";
				case "graph":
					return "graph";
				case "discussion":
					return "discussion";
				case "Search Article...":
					return "Search Article...";
				case "Search Coin...":
					return "Search Coin...";
				case "1 year":
					return "1 year";
				case "7 day":
					return "7 day";
				case "30 days":
					return "30 days";
				case "Market Cap":
					return "Market Cap";
				case "Supply":
					return "Supply";
				case "Volume-24h":
					return "Volume-24h";
				case "1h":
					return "1h";
				case "24h":
					return "24h";
				case "7d":
					return "7d";
				default:
					return "Not in Dictionary";
			}
		}
// FRENCH DICTIONARY
		if(lang == 'fr'){
			switch(word){
				case "News Feed":
					return "Fil de presse";
				case "Articles":
					return "Des articles";
				default:
					return "Des articles";
			}
		}
// URDU DICTIONARY
		if(lang == 'ur'){
		switch(word){
			case "News Feed":
				return "خبریں";
			case "Articles":
				return "مضامین";
			case "Chart":
				return "چارٹ";
			case "Top Performer":
				return "عمدہ کارکردگی";
			case "Rank":
				return "رینک";
			case "Coin":
				return "سکہ";
			case "Price":
				return "قیمت";
			case "market":
				return "مارکیٹ";
			case "graph":
				return "گراف";
			case "discussion":
				return "بات چیت";
			case "Search Article...":
				return "... مضمون تلاش کریں";
			case "Search Coin...":
				return "... سکہ تلاش کریں";
			case "1 year":
				return "١ سال";
			case "7 day":
				return "٧ دن";
			case "30 days":
				return "٣٠ دن";
			case "Market Cap":
				return "مارکیٹ کیپ";
			case "Supply":
				return "مقدار";
			case "Volume-24h":
				return "حجم-24h";
			case "1h":
				return "١ گھنٹہ";
			case "24h":
				return "٢٤ گھنٹے";
			case "7d":
				return "٧ دن";
			default:
				return "Not in Dictionary";
			}
		}
	};
}

app.filter('translate',['lang',translate]);
})();

