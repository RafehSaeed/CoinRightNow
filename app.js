(function() {


var app = angular.module('coinrightnow', ['ngRoute','ui.bootstrap']);
app.value('lang', 'en');
app.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
$routeProvider.
    when('/home',{
        templateUrl : 'Templates/HomeTemplate.html',
        controller:'MainController',
    }).
    when('/menu',{
        templateUrl : 'Templates/Menu.html',
        controller:'MainController', 
    }).
    when('/locations',{
        templateUrl : 'Templates/Locations.html',
        controller:'MainController',
    }).
        when('/login',{
        templateUrl : 'Templates/LoginTemplate.html',
        controller:'loginCtrl',
        controllerAs: 'vm',
    }).
        when('/admin',{
        templateUrl : 'Templates/AdminTemplate.html',
        controller:'AdminController',
        
    }).
       
        when('/coin/:id',{
        templateUrl : 'Templates/CoinTemplate.html',
        controller: 'CoinController',
        
    }).

        when('/article/:id',{
        templateUrl :'Templates/ArticleTemplate.html',
        controller: 'ArticleController',
        
    }).
        when('/createarticle',{
        templateUrl :'Templates/Forms/ArticleForm.html',
        controller: 'ArticleController',
        
    }).

    otherwise({
        redirectTo: '/home'
    });
}]);
       
       app.config(['$locationProvider', function($locationProvider) {
      $locationProvider.html5Mode(true);
}]);



       angular.module('coinrightnow').run(['$rootScope', '$location', 'authentication', function ($rootScope, $location, authentication) {
        $rootScope.$on('$routeChangeStart', function (event) {
            

        if ($location.path() === '/login'  && authentication.isLoggedIn()) {
        $location.path('/');
      }

       if ($location.path() === '/admin'  && !authentication.isLoggedIn()) {
        $location.path('/');
      }
  });
}]);


/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
particlesJS.load('particles-js', 'bower_components/constellation/particles.json', function() {
  console.log('callback - particles.js config loaded');
});

String.prototype.trunc = String.prototype.trunc ||
function(n){

    // this will return a substring and 
    // if its larger than 'n' then truncate and append '...' to the string and return it.
    // if its less than 'n' then return the 'string'
    return this.length>n ? this.substr(0,n-1)+'...' : this.toString();
};

}());