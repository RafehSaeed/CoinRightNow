// (function () {

	function registerCtrl($location, authentication) {
		var vm = this;
		$scope.onSubmit= vm.onSubmit;
		vm.credentials = {
			name : "",
			email : "",
			password : ""
		};

		vm.onSubmit = function () {
			console.log('Submitting registration');
			authentication
				.register(vm.credentials)
				.error(function(err){
					alert(err);
				})
				.then(function(){
					$location.path('profile');
				});
		};

	}

export default registerCtrl;
// })();