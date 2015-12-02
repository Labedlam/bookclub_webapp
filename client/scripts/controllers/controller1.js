/**
 * Created by Zeo on 11/27/15.
 */
myApp.controller('BaseController', ["$scope", "DataService","$mdToast","$document", function($scope, DataService, $mdToast, $document ){
// For gather data on the book club
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

// Toast for when vote button is clicked
    var last = {
        bottom: false,
        top: false,
        left: false,
        right: true
    };
    $scope.toastPosition = angular.extend({},last);
    $scope.getToastPosition = function() {
        sanitizePosition();
        return Object.keys($scope.toastPosition)
            .filter(function(pos) { return $scope.toastPosition[pos]; })
            .join(' ');
    };

    function sanitizePosition() {
        var current = $scope.toastPosition;
        if ( current.bottom && last.top ) current.top = false;
        if ( current.top && last.bottom ) current.bottom = false;
        if ( current.right && last.left ) current.left = false;
        if ( current.left && last.right ) current.right = false;
        last = angular.extend({},current);
    }


    //$scope.showCustomToast = function($index) {
    //    $mdToast.show({
    //        controller: 'BaseController',
    //        templateUrl: 'templates/toast-template.html',
    //        parent : $document[0].querySelector('#toastBounds'),
    //        hideDelay: 100000,
    //        position: $scope.getToastPosition()
    //
    //    });
    //    $scope.selectedIndex=$index;
    //
    //
    //};

    $scope.showActionToast = function($index) {
        var toast = $mdToast.simple()
            .content('Are You Sure You Want To Vote For this Book?')
            .action('ok')
            .highlightAction(true)
                .parent( $document[0].querySelector('#toastBounds'))
            .hideDelay( 100000)
            .position($scope.getToastPosition());
        $mdToast.show(toast).then(function(response) {
            if ( response == 'ok' ) {
                $scope.selectedIndex=$index;
            }
        });
    };


    $scope.closeToast = function() {
        $mdToast.hide();
    };
    //
    //$scope.castVote = function(){
    //    console.log("Here is the castVote click",$scope.cardClicked)
    //
    //};

}]);



//This controller is for getting data about the bookclub to look at locations

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



//This is for my Header fab menu that opens up quite beautifully
myApp.controller('toolbarController', ["$scope", function($scope){
    $scope.isOpen = false;
    $scope.demo = {
        isOpen: true,
        count: 0,
        selectedDirection: 'right'
    };
}]);


