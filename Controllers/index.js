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

// var MainController= require('./MainController').MainController;

app.filter('translate',['$rootScope',translate]);
app.controller('MainController',['$rootScope','$scope','$timeout','coin','$routeParams', 'article', 'lang','$route', MainController]);
app.filter('getCurrencySymbol',getCurrencySymbol);
app.factory("coin",['$http','$rootScope',coin]);
app.factory("article",['$http',article]);
app.directive('errSrc',['coin' , checkImage]);
app.service('authentication', ['$http', '$window' ,'$location', auth]);
// 
// Add other controllers like so:
// angular.module('MyApp').controller('LoginCtrl', LoginCtrl);
// Don't forget to add new import statements
// at the top for each new Controller

