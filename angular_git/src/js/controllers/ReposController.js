angular
    .module("AngularGit")
    .controller("ReposController", ["$scope", "$rootScope", "$routeParams", "GithubData", "$location",
        function($scope, $rootScope, $routeParams, GithubData, $location){

            function updateReposList(username) {
                GithubData.getRepoData(username)
                    .then(function(data){
                        // success
                        $rootScope.error = undefined;
                        $scope.repos = data.repos;

                    }, function(msg){
                        // error
                        $rootScope.error = msg;
                    });
            }

            // get event from TabSearchController
            $scope.$on("getdata", function(event, username) {
                $location.path("/repos/"+username);
                updateReposList(username);
            });

            // do initial load of data
            updateReposList($routeParams.username);

            // Pass details to rootscope for TabSearchController
            if (typeof $routeParams.username !== "undefined") {
                $rootScope.username = $routeParams.username;
                $rootScope.accountName = $routeParams.username;
            }
        }]
    );