(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// declare app dependencies
angular
    .module("AngularGit", ["ngRoute"])
    .config(["$routeProvider", function($routeProvider) {

        // declare application routes
        $routeProvider
            .when("/info", {
                templateUrl: "js/views/InfoController.html",
                controller: "InfoController"
            })
            .when("/info/:username", {
                templateUrl: "js/views/InfoController.html",
                controller: "InfoController"
            })
            .when("/repos/:username", {
                templateUrl: "js/views/ReposController.html",
                controller: "ReposController"
            })
            .otherwise({
                redirectTo: "/info"
            });

    }]);

// load services
require("./services/GithubData");

// load controllers
require("./controllers/InfoController");
require("./controllers/ReposController");

},{"./controllers/InfoController":2,"./controllers/ReposController":3,"./services/GithubData":4}],2:[function(require,module,exports){
angular
    .module("AngularGit")
    .controller("InfoController", ["$scope", "GithubData", "$routeParams", "$location",
        function($scope, GithubData, $routeParams, $location){
            console.log("HI from the main controller");

            var getInfoFromGithub = function(username) {
                if (typeof username === "string" && username != "") {
                    $scope.username = username;
                    $location.path("/info/"+username);

                    $scope.error = undefined;

                    // use our service
                    GithubData.getRepoData(username)
                        .then(function(data){
                            // success
                            $scope.data = data;
                            $scope.error = undefined;
                        }, function(msg){
                            // error!
                            $scope.error = msg;
                            $scope.data = undefined;
                        });

                } else {
                    $scope.error = "You need to enter a valid github user name!";
                }
            };

            if (typeof $routeParams.username !== "undefined") {
                $scope.accountName = $routeParams.username;
                getInfoFromGithub($routeParams.username);
            }

            $scope.getInfoFromGithub = getInfoFromGithub;

         }]
    );
},{}],3:[function(require,module,exports){
angular
    .module("AngularGit")
    .controller("ReposController", ["$scope", "$routeParams", "GithubData",
        function($scope, $routeParams, GithubData){

            $scope.username = $routeParams.username;

            GithubData.getRepoData($routeParams.username)
                .then(function(data){
                    // success
                    $scope.error = undefined;
                    $scope.repos = data.repos;

                }, function(msg){
                    // error
                    $scope.error = msg;
                });
        }]
    );
},{}],4:[function(require,module,exports){
angular
    .module("AngularGit")
    .factory("GithubData", ["$http", "$q", function($http, $q){

        var cachedData = {};

        var getData = function(username) {
            console.log("Local data:", cachedData);


            // make and fulful a promise
            return $q(function(resolve, reject){

                // check if data is cahced
                if (cachedData[username]) {
                    resolve(cachedData[username]);
                } else {

                    // make error handler
                    function handleError(response) {
                        reject("Network Error "+response.status+" "+response.statusText);
                    }

                    $http.get("https://api.github.com/users/"+username)
                        .then(function(response){
                            // we got the user data
                            cachedData[username] = response.data;

                            // load repos list
                            return $http.get("https://api.github.com/users/"+username+"/repos");
                        }, handleError)
                        .then(function(response){
                            // we got the repos list
                            cachedData[username].repos = response.data;

                            // fulfil promise
                            resolve(cachedData[username]);
                        }, handleError);

                }

            });
        };

        return {
            getRepoData: getData
        }
    }]);
},{}]},{},[1]);
