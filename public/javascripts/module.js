'use strict'
var app = angular.module('stormPathApp', ['ui.router', 'stormpath', 'stormpath.templates']);
console.log('module.js');

app.run(function($stormpath){
    $stormpath.uiRouter({
      forbiddenState: 'forbidden',
      defaultPostLoginState: 'home',
      loginState: 'login'
    });
});

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('home', {url:'/home', templateUrl:'/partials/home.html', sp: {
    authenticate: true
  }})
  .state('register', {url:'/register', templateUrl:'/partials/register.html', controller:'registerCtrl'})
  .state('login', {url:'/login', templateUrl:'/partials/login.html', controller:'loginCtrl'})
  $urlRouterProvider.otherwise('/')
});
