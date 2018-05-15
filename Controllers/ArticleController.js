(function () {

var app = angular.module('coinrightnow');

	function ArticleController ($scope,$routeParams,article,$sce ,$uibModal) {

		getArticle($routeParams.id);
		    $scope.article = {
			     title : "",
				 commentbody : ""
   			 };
	//Get a Specific Article
	function getArticle(id){

		article.getArticle(id).then(function (data) {
			$scope.article= data;
            console.log($scope.article);
			console.log($scope.article.commentbody);

		});

    function showConfirmation() {

        $uibModal.open({
            templateUrl: 'Templates/Dialog/confirmation.html', // loads the template
            backdrop: true, // setting backdrop allows us to close the modal window on clicking outside the modal window
            // windowClass: 'modal', // windowClass - additional CSS class(es) to be added to a modal window template
            windowClass : 'show',
            controller: function ($scope, $uibModalInstance, $log, user) {
                $scope.user = user;
                $scope.submit = function () {
                    $log.log('Submiting user info.'); // kinda console logs this statement
                    $log.log(user); 
                    $uibModalInstance.dismiss('cancel'); // dismiss(reason) - a method that can be used to dismiss a modal, passing a reason
                };
                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel'); 
                };
            },
            resolve: {
                user: function () {
                    return $scope.user;
                }
            }
        });//end of modal.open
    }// end of scope.open function
    
	$scope.getHtml = function(html){
        return $sce.trustAsHtml(html);
    };

//Posts the article using the values attached to the scope.article model
	$scope.submitArticle = function(){
        console.log( $scope.article.content);
        article.postArticle($scope.article).then(function (data) {
        	showConfirmation();
        });
    };	
		}
}

app.controller('ArticleController',['$scope','$routeParams','article','$sce', '$uibModal' ,ArticleController]);
})();

