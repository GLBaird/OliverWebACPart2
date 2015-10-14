// declare app dependencies
var app = angular.module("AngularGit", []);

app.controller("InfoController", ["$scope", "$http", function($scope, $http){
    console.log("HI from the main controller");

    $scope.getInfoFromGithub = function(username) {
        if (typeof username === "string" && username != "") {
            $scope.error = undefined;
            $http({
                method: "GET",
                url: "https://api.github.com/users/"+username
            }).then(function(response){
                // success
                $scope.data = response.data;
                $scope.error = undefined;
            }, function(response){
                // error!
                $scope.error = "Network Error "+response.status+" "+response.statusText;
                $scope.data = undefined;
            });
        } else {
            $scope.error = "You need to enter a valid github user name!";
        }
    }
}]);