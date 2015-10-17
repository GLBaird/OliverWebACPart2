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
require("./controllers/TabSearchController");
require("./controllers/InfoController");
require("./controllers/ReposController");
