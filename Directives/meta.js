(function(){


var app = angular.module('coinrightnow');

var link = function($scope,$element,$attr){
	var meta = angular.element('<meta/>');
  for(var key  in $scope.meta){
  	if(key.indexOf("$")===(-1)){
	  	meta.attr(key,$scope.meta[key]);
    }
  }
  setTimeout(function(){
	  $element[0].outerHTML = meta[0].outerHTML;
  });
};

var dynamicMeta = function(){
	return {
  	restrict: 'E',
  	template:'',
  	scope:{
    	meta:"="
    },
    link:link
  };
}

app.directive('dynamicMeta',['dynamicMeta',dynamicMeta]);
}());