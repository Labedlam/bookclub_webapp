/**
 * Created by Zeo on 12/4/15.
 */
myApp.factory('DataServiceReg', ["$http", function($http){
    var data = undefined;

    //PRIVATE
    var getData = function(){
        var promise = $http.get('/dataforreg').then(function(response){
            data = response.data;
            console.log("Async Data Response: for book club factory ", data);

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