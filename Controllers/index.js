// import angular from 'angular

// var app = angular.module('coinrightnow');.

import app from '../app'
import translate from '../Filters/translate'
import MainController from './MainController'
import getCurrencySymbol from '../Filters/CurrencySymbol'
import coin from '../Factories/CoinFactory'
import article from '../Factories/ArticleFactory'
import {default as checkImage} from '../Directives/checkImage'
import {default as auth} from '../Services/authentication.service'
import CoinController from './CoinController'
import ArticleController from './ArticleController'
import loginCtrl from "./loginCtrl"
import AdminController from "./AdminController"
import registerCtrl from './registerCtrl'
// var MainController= require('./MainController').MainController;

app.filter('translate',['$rootScope',translate]);
app.controller('MainController',['$rootScope','$scope','$timeout','coin','$routeParams', 'article', 'lang','$route', MainController]);
app.controller('CoinController',['$rootScope','$scope','$timeout','coin','$routeParams','$filter', 'lang', '$route', CoinController]);
app.controller('ArticleController',['$scope','$routeParams','article','$sce', '$uibModal' ,ArticleController]);
app.filter('getCurrencySymbol',getCurrencySymbol);
app.factory("coin",['$http','$rootScope',coin]);
app.factory("article",['$http',article]);
app.directive('errSrc',['coin' , checkImage]);
app.service('authentication', ['$http', '$window' ,'$location', auth]);
app.controller('loginCtrl',['$rootScope','$location','authentication', loginCtrl]);
app.controller('AdminController',['$rootScope','$scope','authentication', AdminController]);
app.controller('registerCtrl', ['$location', 'authentication',registerCtrl]);



// 
// Add other controllers like so:
// angular.module('MyApp').controller('LoginCtrl', LoginCtrl);
// Don't forget to add new import statements
// at the top for each new Controller

