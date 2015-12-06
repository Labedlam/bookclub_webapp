/**
 * Created by Zeo on 12/4/15.
 */
//myApp.controller('Register', ["$scope","$http", "DataServiceReg","$mdToast","$document", function($scope,$http,DataServiceReg, $mdToast, $document ){
//
//
//    $scope.dataService = DataServiceReg;
//    $scope.bookclub=[];
//    $scope.infobookclub = {};
//
//    if($scope.dataService.bookclubData() === undefined){
//        $scope.dataService.retrieveData().then(function (){
//            $scope.bookclub=$scope.dataService.bookclubData();
//        });
//        console.log("Base Async: " , $scope.dataService.bookclubData());
//    } else{
//        $scope.bookclub=$scope.dataService.bookclubData();
//
//
//
//        console.log("hello does anybody hear me")
//    }}]);