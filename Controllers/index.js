import angular from 'angular';
// import MainController from ('./MainController').MainController;
var MainController= require('./MainController').MainController;

var app = angular.module('coinrightnow');

app.controller('MainController',['$rootScope','$scope','$timeout','coin','$routeParams', 'article', 'lang','$route', MainController]);

// Add other controllers like so:
// angular.module('MyApp').controller('LoginCtrl', LoginCtrl);
// Don't forget to add new import statements
// at the top for each new Controller