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