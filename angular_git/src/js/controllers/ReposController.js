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