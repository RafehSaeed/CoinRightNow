// (function(){


function coin(coin){
	return {
		link: function(scope , element , attrs){
			element.bind('error',function(){
				if(attrs.src != attrs.errSrc) {
				coin.addMissingImage(attrs.ngSrc);
				attrs.$set('src', attrs.errSrc);
				}
			});
		}
	}
}

export default coin;
