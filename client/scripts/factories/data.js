/**
 * Created by Zeo on 11/27/15.
 */
myApp.factory('DataService', ["$http", function($http){
    var data = undefined;

    //PRIVATE
    var getData = function(){
       var promise = $http.get('/data').then(function(response){
           data = response.data;
           console.log("Async Data Response: ", data);

        });
        return promise;
    };

    //PUBLIC
    var publicApi = {
        retrieveData: function(){
            return getData();
        },
        bookclubData: function(){
            return data;
            console.log (data);
        }
    };

    return publicApi;
}]);