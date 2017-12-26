(function(){

//Factory for fetching cryptocurrency information from the API
var app = angular.module('coinrightnow');

var article= function($http){



  
	function getArticleList() {
		return $http.get('http://localhost:5000/article')
			.then(function(response) {
		
			 return response.data.reverse();
		});
	}

	function getArticle(id) {

		return $http.get('http://localhost:5000/article/'+ id)
			.then(function(response) {
				console.log('article controller loaded');
			 return response.data;
		});
	}

	function postArticle(article) {


  // return $http.post('http://localhost:5000/login', user).then(function(response) {
  //       saveToken(response.data.token);
  //     });
		return $http.post('http://localhost:5000/article/', article)
			.then(function(response) {
				console.log('article posted');
			 return response.data;
		});
	}

	return{
		getArticleList : getArticleList,
		getArticle : getArticle,
		postArticle : postArticle
		
		
		
	};

};


app.factory("article",article);

}());