/**
 * Created by Zeo on 11/27/15.
 */
myApp.controller('BaseController', ["$scope","$http", "DataService","DataServiceReg","$mdToast","$document", function($scope,$http,DataService,DataServiceReg, $mdToast, $document ){



// Retrieves  data on all the users
    $scope.dataService = DataService;
    $scope.users=[];
    $scope.member = {};
    $scope.prefBook={};
    $scope.bookclubUsers=[];


    $scope.loggedInUser={};
    $scope.loggedInBookClub={};

    $scope.usersInBookClub=[];


    $scope.show=true;
    $scope.showResult=false;

    getThoseUsers();
    hasUserVoted();


    function getThoseUsers(){
    if($scope.dataService.userData() === undefined){
        $scope.dataService.retrieveData().then(function (){
            $scope.users=$scope.dataService.userData();
        });
        console.log("Base Async: " , $scope.dataService.userData());
    } else{
        $scope.users=$scope.dataService.userData();
    }
    };
    console.log("hello BaseController here is promise",$scope.users );


    console.log($scope.users);
  // Retrieves data of all  the bookclubs

    $scope.dataService1 = DataServiceReg;
    $scope.bookclub=[];
    $scope.infobookclub = {};

    if($scope.dataService1.bookclubData() === undefined){
        $scope.dataService1.retrieveData().then(function (){
            $scope.bookclub=$scope.dataService1.bookclubData();
        });
        console.log("Base Async: for book promise" , $scope.dataService1.bookclubData());
    } else {
        $scope.bookclub = $scope.dataService1.bookclubData();

    }

    console.log("I'm underneath the book promise");

    checkIfUsersHaveVoted($scope.users);
    //Check to see if all members in group have voted
    function checkIfUsersHaveVoted(users){
            console.log ("Is check ifusers have voted function being called?");
        var numberVotesCast=0;

        for(var i = 0; i < users.length; i++)
        {
            if(users[i].prefBookVote == true) {
                numberVotesCast++;
                console.log("this user" + users[i] + "has voted", numberVotesCast);
            }else{
            console.log("this user"+users[i]+"has NOT Voted");
             }

    };

    };


  //Get User info on user who is logged in
  //  getUserLoggedIn();


  //Then pull out the bookclub object associated with that user
    function MatchBookClub(){

        //pull out the bookclub id from the user logged in
        //store it in a variable
        //use that to cycle through the array of book clubs to find a match
        //if $scope.book

    }



    //Get the user logged in object and bookclub its in
    //function getUserLoggedIn(){
    //
    //    $http({
    //        method: 'POST',
    //        url: '/voting/loggedin'
    //    }).then(function(response){
    //        //console.log("This should be the logged in user object",response);
    //        $scope.loggedInUser=response.data;
    //
    //
    //        //console.log("This should be the logged in user object",response.data);
    //        //$scope.loggedInBookClubr=response.data.bookclubName_id;
    //        //
    //        //
    //        //console.log("This should be the logged in user object book club",$scope.loggedInBookClub);
    //
    //    });
    //}


// Toast for when vote button is clicked
    var last = {
        bottom: false,
        top: false,
        left: true,
        right: false
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
    };


$scope.userVoteBookChoice=[];
$scope.bookmodel={};
// Tthis is triggered when the user clicks to vote on a book
    $scope.showActionToast = function(userobject,$index) {


        var toast = $mdToast.simple()
            .content('Are You Sure You Want To Vote For this Book?')
            .action('ok')
            .highlightAction(true)
                .parent( $document[0].querySelector('#toastBounds'))
            .hideDelay( 100000)
            .position($scope.getToastPosition());


        $mdToast.show(toast).then(function(response) {
            if ( response == 'ok' ) {



                console.log("this is what your sending back to the toast function ",userobject,$index);
                $scope.selectedIndex=$index;

                console.log("is scope.user anything ",$scope.user );
                $scope.userHasVoted();
                //I know this is redundant, but for the sack of just getting things to work the way I want with my limited set of knowledge and experience
                console.log("Send up to votedbook route",userobject);
                $scope.votedBook(userobject);

                console.log("this is the book that was voted by user who logged in");
                $scope.castPrefBookVote(userobject);

                hasUserVoted();
                $scope.userVoteBookChoice=userobject[0];

                console.log("this is userobject[0]",userobject[0]);


                //location.reload();
            }
        });
    };


    $scope.closeToast = function() {
        $mdToast.hide();
    };

$scope.show=true;
    $scope.showresult=false;


//check to see if this user has voted
    function hasUserVoted(){
        $http({
            method: 'GET',
            url: '/voting/checkuservote'
        }).then(function(response){

            $scope.loggedInUser=response.data;
            console.log("this is my HasUserVotedFunction response",response.data);
            $scope.userVoteBookChoice=response.data[0];

            if(response.data[0].votePrefBook == true){
                $scope.show = false;
                $scope.showresult= true;
                //console.log("Hello here is response data and scope hid",$scope.show);
                //console.log("this is responsedata 0 .voteprefbook",response.data[0].votePrefBook);
            }else{
                $scope.show = true;
                $scope.showresult=false;
                console.log("this means that the scope.hide should be set to true ",response.data[0].votePrefBook);
                //console.log("this is scope.hide ",$scope.show);
            }//hide the choices and show the book you voted on

            //checkIfUsersHaveVoted();
        });



        //Check to see if all members in group have voted
        function checkIfUsersHaveVoted(data){
            console.log ("Is check ifusers have voted function being called?", data);
            console.log("access the object key value voteBookPref",data[0].votePrefBook);
            var numberVotesCast=0;

            for(var i = 0; i < data.length; i++)
            {
                if(data[i].votePrefBook == true) {
                    numberVotesCast++;
                    console.log("this user " + data[i]._id + " has voted, Total Votes Cast: ", numberVotesCast);


                }else{
                    console.log("this user "+data[i]._id+" has NOT Voted");
                }

            };

        };




    };

 //function to change the value of PrefBook Vote to true in user collection document of logged in user
    $scope.prefBookVote = false;

    $scope.userHasVoted = function(){

        $http({
            method: 'PUT',
            url: '/voting/loggedin',
            data: {"votePrefBook": "true"}
        }).then(function(response){
                console.log("does the book club objectcome down here?",response);
               $scope.prefBookVote=response.data
        });
    };


 //Send votedBook to the user collection
    $scope.votedBook = function(votedbook){

        console.log("this is pref book",votedbook);
        var votedBook={
            title:votedbook[0].title,
            author:votedbook[0].author,
            summary:votedbook[0].summary
        };
        console.log("here is whats beening sent up to cast vote",votedBook);


        $http({
            method: 'PUT',
            url: '/voting/uservotedbook',
            data:  votedBook
        }).then(function(response){
            console.log("here is the response from uservotedbook ",response.data);

            $scope.userVoteBookChoice=response.data;
            console.log("this is calling the book club promise");


        });
    };

// Send vote book to the bookcollection document in which the user is logged into
    $scope.castPrefBookVote = function(prefbook){

            console.log("this is pref book",prefbook);
        var infoToCastVote={
          title:prefbook[0].title,
            author:prefbook[0].author,
            summary:prefbook[0].summary,
            _id:prefbook[0]._id,
          //clubid:$scope.loggedInUser
        };
        console.log("here is whats beening sent up to cast vote",infoToCastVote);


        $http({
            method: 'PUT',
            url: '/voting/updatebook',
            data:  infoToCastVote
        }).then(function(response){
            console.log("here is the response from castvote ",response);
            $scope.usersInBookClub=response;

            console.log("this is calling the book club promise",$scope.bookclub);


        });
    };

//check to see if all users in book club  have voted




}]);

////////////////////////////////////////////////////////////////////

//function for getting the data on the book collection

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