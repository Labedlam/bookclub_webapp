/**
 * Created by Zeo on 11/27/15.
 */
myApp.controller('BaseController', ["$scope", "DataService", function($scope, DataService){

    $scope.dataService = DataService;
    $scope.bookclub=[];

    if($scope.dataService.bookclubData() === undefined){
        $scope.dataService.retrieveData().then(function (){
            $scope.bookclub=$scope.dataService.bookclubData();
        });
        console.log("Base Async: " , $scope.dataService.bookclubData());
    } else{
        $scope.bookclub=$scope.dataService.bookclubData();
    }



}]);

myApp.controller('AnotherController', ["$scope", "DataService", function($scope, DataService){
    $scope.dataService = DataService;
    $scope.bookclub=[];

    if($scope.dataService.bookclubData() === undefined){
        $scope.dataService.retrieveData().then(function (){
            $scope.bookclub=$scope.dataService.bookclubData();
        });
        console.log("Base Async: " , $scope.dataService.bookclubData());
    } else{
        $scope.bookclub=$scope.dataService.bookclubData();
    }


}]);

myApp.controller('toolbarController', ["$scope", function($scope){
    $scope.isOpen = false;
    $scope.demo = {
        isOpen: true,
        count: 0,
        selectedDirection: 'right'
    };
}]);


