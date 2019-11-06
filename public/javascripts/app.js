var app = angular.module('angularjsNodejsTutorial', []);


app.controller('loginController', function($scope, $http) {
  $scope.verifyLogin = function() {
    // To check in the console if the variables are correctly storing the input:
    // console.log($scope.username, $scope.password);

    var request = $http({
      url: '/login',
      method: "POST",
      data: {
        'username': $scope.username,
        'password': $scope.password
      }
    })

    request.success(function(response) {
      // success
      console.log(response);
      if (response.result === "success") {
        // After you've written the INSERT query in routes/index.js, uncomment the following line
         window.location.href = "http://localhost:8081/search"
      }
    });
    request.error(function(err) {
      // failed
      console.log("error: ", err);
    });

  };
});


app.controller('searchController', function($scope, $http) {
  $scope.searchRestaurant = function() {
    // To check in the console if the variables are correctly storing the input:

    var request = $http({
      url: '/search',
      method: "POST",
      data: {
        'restaurantname': $scope.restaurantname
      }
    });



    request.success(function(response) {
      // success
      console.log(response);
      if (response.result === "success") {
        // After you've written the INSERT query in routes/index.js, uncomment the following line
        window.location.href = "http://localhost:8081/result"
      }
    });
    request.error(function(err) {
      // failed
      console.log("error: ", err);
    });

  };
});


app.controller('resultController', function($scope, $http) {
  $scope.showresult = function() {
    var request = $http({
      url: '/result',
      method: "POST",
      data: {
      }
    });
    request.success(function(response) {
      $scope.info = response;
      console.log($scope.info);
    });
    request.error(function(err) {
      console.log("error: ", err);
    });
  };
});

app.controller('userController', function($scope, $http) {
    var request = $http({
      url: '/userList',
      method: "GET",
      data: {
      }
    });
    request.success(function(response){
      $scope.users = response;
    });
    request.error(function(err) {
      // failed
      console.log("error: ", err);
    });
  
});

app.controller('topMovieController', function($scope, $http) {
  $scope.printGenres = function(){
    var request = $http({
      url: '/genres',
      method: "GET",
      data: {
      }
    });
    request.success(function(response){
      $scope.genres = response;
    });
    request.error(function(err) {
      // failed
      console.log("error: ", err);
    });
  };
  $scope.printTopMovies = function(genre){
    var request = $http({
      url: '/topMovies/'+genre,
      method: "GET",
      data: {
      }
    });
    request.success(function(response){
      $scope.topMovies = response;
      $scope.showTable = true;
      console.log(rows);
    });
    request.error(function(err) {
      // failed
      console.log("error: ", err);
    });
  };
});



app.controller('RecommendationController', function($scope, $http) {
  $scope.recommend = function() {
    console.log($scope.movieId);
    var request = $http({
      url: '/Recommendations/' + $scope.movieId,
      method: "GET"
    })
    request.success(function(response) {
      console.log(response);
      $scope.whetherShowReco = true;
      $scope.results = response;
    });
    request.error(function(err) {
      console.log("recommendation error: ", err);
    });
  };
});


app.controller('BestOfController', function($scope, $http) {
    var range = [];
      for (var i = 2000; i <= 2017; i++) {
        range.push(i);
    }
    console.log(range);
    $scope.years = range;
  


  $scope.bestOf = function() {
    var request = $http({
      url: '/BestOf/'+ $scope.years,
      method: "GET"
    })
    request.success(function(response) {
      //console.log($scope.years);
      console.log(response);
      $scope.showtable = true;
      $scope.results = response;
    });
    request.error(function(err) {
      console.log("bestOf error: ", err);
    });
  };
});


app.controller('backController', function($scope, $http) {
  $scope.back = function() {
      window.location.href = "http://localhost:8081/search";
    }
});


// app.controller('posterController', function($scope, $http) {
//     var init = function () {
//       var request = $http({
//         url: '/posters',
//         method: "POST",
//         data : {
//         }
//       });

//       request.success(function(response) {
//         // success
//         $scope.posters = new Map();
//         console.log("success");
//         for (var i = 0;i < response.length;i++) {
//           var requestPoster = $http({
//             url: "http://www.omdbapi.com/?i="+response[i].imdb_id+"&apikey=461ec312",
//             method: "GET"
//           });
//           requestPoster.success(function(response2) {
//             $scope.posters[response2.Title] = [response2.Poster, response2.Website];
//           });
//           requestPoster.error(function(err) {
//             $scope.posters[response2.Title] = ["", ""];
//           });
//         }
//         console.log($scope.posters);
//       });
//       request.error(function(err) {
//         console.log("error: ", err);
//       });
//     };

//     init();
// });


// app.controller('postersController', function($scope, $http) {
//   var init = function () {

//     var request = $http({
//       url: '/posterLists',
//       method: "GET",
//       data: {
//       }
//     });
//     request.success(function(response){
//       $scope.results = response;
//       $scope.posters = new Map();
//       console.log("success");
//       for (var i = 0;i < response.length;i++) {
//         var requestPoster = $http({
//           url: "http://www.omdbapi.com/?i="+response[i].imdb_id+"&apikey=461ec312",
//           method: "GET"
//         });
//         requestPoster.success(function(response2) {
//           $scope.posters[response2.Title] = [response2.Poster, response2.Website];
//         });
//         requestPoster.error(function(err) {
//           $scope.posters[response2.Title] = ["", ""];
//         });
//       }
//         console.log($scope.posters);
//       });
//     request.error(function(err) {
//       console.log("error: ", err);
//     });
//   };
//   init();

// });



//     $scope.printPosters = function(imdbId){
//       console.log(title);
//       var request = $http({
//         url: 'http://www.omdbapi.com/?i='+imdbId+'&apikey=1ecd07b5',
//         method: "GET",
//       });
//       console.log(url);
//       request.success(function(response2){
//         $scope.jsonResults = response2;
//         $scope.image = response2.Poster;
//         $scope.website = response2.Website;
//       });
//       request.error(function(err) {
//         // failed
//         console.log("error: ", err);
//       });
//     };


// Template for adding a controller
/*
app.controller('dummyController', function($scope, $http) {
  // normal variables
  var dummyVar1 = 'abc';

  // Angular scope variables
  $scope.dummyVar2 = 'abc';

  // Angular function
  $scope.dummyFunction = function() {

  };
});
*/
