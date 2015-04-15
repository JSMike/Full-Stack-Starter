var starterApp = angular.module('starterApp', ['ui.bootstrap', 'ui.router', 'matchMedia']);

starterApp.controller('indexController', function() {

});

starterApp.controller('mainController', function($scope, $http) {
  $scope.people = [];
  $http.get('/people/')
    .success(function (data) {
      $scope.people = data;
    })
    .error(function (err) {
      console.log("main, get, error: " + err);
    });

  $scope.add = function () {
    console.log("add");
    $http.post('/people/', {new: true, name: ""})
      .success(function (data) {
        $scope.people = data;
      })
      .error(function (err) {
        console.log("main, add, error: " + err);
      });
  };

  $scope.update = function (idx) {
    $http.post('/people/', $scope.people[idx])
      .success(function (data) {
        $scope.people = data;
      })
      .error(function (err) {
        console.log("main, update, error: " + err);
      });
  };

  $scope.del = function (idx) {
    $http.post('/people/', {del: true, _id: $scope.people[idx]._id})
      .success(function (data) {
        $scope.people = data;
      })
      .error(function (err) {
        console.log("main, del, error: " + err);
      });
  };

  $scope.refresh = function () {
    $http.get('/people/')
      .success(function (data) {
        $scope.people = data;
      })
      .error(function (err) {
        console.log("main, refresh, error: " + err);
      });
  };
});

starterApp.controller('headerController', function($scope, $rootScope, $state, $http, cfg) {
  $rootScope.title = 'Full Stack Starter' + (cfg.title ? ' - ' + cfg.title : '');
  $scope.header = cfg.text;
});

starterApp.controller('navbarController', function($scope, $modal) {
  $scope.links = [{link: "#/", style: "", text: "example"}];
  $scope.data = {heading: "Example Modal Pop-up", img: "img/modals.jpg"};
  $scope.popup = function ($event) {
    $event.preventDefault();
    $modal.open({
      templateUrl: "views/popup.ejs",
      controller: "popupController",
      resolve: {
        data: function() {
          return $scope.data;
        }
      }
    });
  };
});

starterApp.controller('popupController', function($scope, $modalInstance, data) {
  $scope.heading = data.heading;
  $scope.img = data.img;
  $scope.ok = function() {
    $modalInstance.close(true);
  };

  $scope.cancel = function() {
    $modalInstance.dismiss(false);
  };
});

starterApp.directive('navbar', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: false,
    templateUrl: 'views/navbar.ejs',
    controller: 'navbarController'
  };
});

starterApp.directive('footer', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: false,
    templateUrl: 'views/footer.ejs'
  };
});

starterApp.config(function($stateProvider, $urlRouterProvider) {
  // For any unmatched url, redirect to /
  $urlRouterProvider.otherwise("/");

  // Set up states
  $stateProvider.state('index', {
    url: "/",
    views: {
      "": {
        templateUrl: "views/index.ejs",
        controller: "indexController"
      },
      "header@index": {
        templateUrl: "views/header.ejs",
        resolve: {
          cfg: function() {
            return {
              text: "Welcome to the Full Stack Starter!",
              title: ""
            };
          }
        },
        controller: "headerController"
      },
      "main@index": {
        templateUrl: "views/main.ejs",
        controller: "mainController"
      }
    }
  });
});
