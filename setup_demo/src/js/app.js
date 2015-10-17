angular
    .module("DemoApp", ["ngRoute"])
    .controller("DemoController", ["$scope", function($scope){
        console.log("App is running...");
        $scope.testing = "Angular ready!";
    }]);