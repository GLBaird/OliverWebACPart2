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
                        })
                        .then(function(response){
                            // we got the repos list
                            cachedData[username].repos = response.data;

                            // lookup contributors
                            response.data.forEach(function (repo) {
                                repo.contributors = [];
                                $http.get(repo.contributors_url)
                                    .then(function (response) {
                                        repo.contributors = response.data;
                                    });
                            });

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