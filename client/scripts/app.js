/**
 * Created by Zeo on 11/27/15.
 */
var myApp = angular.module('myApp', ['ngRoute','ngMaterial']);
myApp.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/headerRoute', {
            templateUrl: "/assets/views/routes/headerRoute.html",
            controller: "BaseController"
        })
        .when('/header',{
            templateUrl:"/assets/views/templates/header.html",
            controller:"toolbarController"

        })
        .when('/footerRoute', {
            templateUrl: "/assets/views/routes/footerRoute.html",
            controller: "AnotherController"
        })

        .otherwise('/headerRoute');
}]);