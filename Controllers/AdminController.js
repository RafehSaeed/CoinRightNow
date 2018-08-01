// (function () {

// var app = angular.module('coinrightnow');

	function AdminController ($rootScope,$scope,authentication) {

		getUser();
		$scope.logout= logOut;
	
	function getUser(){
		$rootScope.user3 = authentication.currentUser();
		if (authentication.isLoggedIn())
			{
				console.log($rootScope.user3);
				$rootScope.loggedin = true;
			}
		}

	function logOut(){
		authentication.logout();
		$rootScope.user3="";
		$rootScope.loggedin = false;
		}
}

// })();

