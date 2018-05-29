(function(){


var app = angular.module('coinrightnow');

function coin(coin){
	return {
		link: function(scope , element , attrs){
			console.log(element)
			element.bind('error',function(){
				if(attrs.src != attrs.errSrc) {
				coin.addMissingImage(attrs.ngSrc);
				attrs.$set('src', attrs.errSrc);
				}
			});
		}
	}
}

app.directive('errSrc',['coin' , coin]);
}());