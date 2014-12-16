var myApp = angular.module('BasicAngularJS', []);

// Le Route Provider ========================
myApp.config(['$routeProvider', function ($routeProvider) {

  /**
   * $routeProvider
   */
  $routeProvider
  .when('/', {
    templateUrl: '.public/views/main.html'
  })
  .when('/emails', {
    templateUrl: '.public/views/emails.html'
  })
  .otherwise({
    redirectTo: '/'
  });

}]);

// Les Directives ========================

myApp.directive('customButton', function () {
  return {
    restrict: 'A',
    replace: true,
    transclude: true,
    template: '<a href="" class="myawesomebutton" ng-transclude>' +
                '<i class="icon-ok-sign"></i>' +
              '</a>',
    link: function (scope, element, attrs) {
      // DOM manipulation/events here!
    }
  };
});

// Les Services ========================
// singleton
myApp.service('Math', function () {
  this.multiply = function (x, y) {
    return x * y;
  };
});

// Les Factories ========================
myApp.factory('Server', function () {
  return {
    get: function(url) {
      return $http.get(url);
    },
    post: function(url) {
      return $http.post(url);
    },
  };
});

// Les Filtres ========================
myApp.filter('reverse', function () {
  return function (input, uppercase) {
    var out = '';
    for (var i = 0; i < input.length; i++) {
      out = input.charAt(i) + out;
    }
    if (uppercase) {
      out = out.toUpperCase();
    }
    return out;
  }
});
/*
myApp.filter('oddNumbers', function () {
  return function (input, Math) {
      var out = '';
      out = Math.floor(2.11);
      //if((input % 2) == 0)
        //return Math.parseInt(input);
      if (Math) {
          out = (input % 2);
      }
      return out;
  }
});      
*/
// Les Controllers ========================

myApp.controller('MainCtrl', ['$scope', function ($scope) {

    $scope.text = 'Hello, Angular fanatic.';

}]);


myApp.controller('UserCtrl', ['$scope', function ($scope) {

    // Créons un namespace pour les détails de l'utilisateur
    // Également utile pour une aide visuelle dans le DOM
    $scope.user = {};
    $scope.user.details = {
      "username": "Todd Motto",
      "id": "89101112"
    };

}]);

// controller avec injection de dépendance
myApp.controller('MathCtrl', ['$scope','Math', function ($scope, Math) {
    var a = 12;
    var b = 24;

    // outputs 288
    $scope.result = Math.multiply(a, b);
}]);

myApp.controller('ServerCtrl', ['$scope', 'Server', function ($scope, Server) {
    var jsonGet = 'http://localhost:8080';
    //var jsonPost = 'http://google.com';
    //serveur.get = Server.get(jsonGet);
    //serveur.post = Server.post(jsonPost);
    $scope.serveur = {'get': 'prout', 'post': 'fart'};
}]);

// Contrôleur inclus pour fournir des données
myApp.controller('FiltreCtrl', ['$scope', function ($scope) {
    $scope.greeting = 'Todd Motto';
    $scope.myNumbers = [1,2,3,49,51];
    $scope.lowerBound = 42;

    // Does the Filters
    $scope.greaterThanNum = function (item) {
      return item > $scope.lowerBound;
    };    
}]);

// Binding
myApp.controller('BindingCtrl', ['$scope', function ($scope) {
  // On capture la donnée du modèle
  // et/ou on l'initialise avec une chaîne de caractères vide
  $scope.myModel = '';
}]);

// XHR
myApp.controller('XHRCtrl', ['$scope', '$http', function ($scope, $http) {

  // Crée un Object user
  $scope.user = {};

  // Initialise le modèle avec une chaîne vide
  $scope.user.username = '';

  // Nous voulons effectuer la requête
  // et obtenir le nom de l'utilisateur
  $http({
    method: 'GET',
    url: '//localhost:8080/someUrlForGettingUsername'
  })
  .success(function (data, status, headers, config) {
    // Ici nous assignons cet utilisateur à
    // notre modèle existant !
    $scope.user.username = data.user.name;
  })
  .error(function (data, status, headers, config) {
    // Une erreur est survenue
  });
}]);

// Binding déclaratif
myApp.controller('EmailsCtrl', ['$scope', function ($scope) {

  // Crée un Object emails
  $scope.emails = {};

  // Nous écrivons ici en dur les données normalement
  // reçues du serveur
  $scope.emails.messages = [{
        "from": "Steve Jobs",
        "subject": "I think I'm holding my phone wrong :/",
        "sent": "2013-10-01T08:05:59Z"
    },{
        "from": "Ellie Goulding",
        "subject": "I've got Starry Eyes, lulz",
        "sent": "2013-09-21T19:45:00Z"
    },{
        "from": "Michael Stipe",
        "subject": "Everybody hurts, sometimes.",
        "sent": "2013-09-12T11:38:30Z"
    },{
        "from": "Jeremy Clarkson",
        "subject": "Think I've found the best car... In the world",
        "sent": "2013-09-03T13:15:11Z"
    }];
    
  // Fonctions de Scope
  $scope.deleteEmail = function (index) {
    $scope.emails.messages.splice(index, 1)
  };    

}]);

// Tests sur les expressions
myApp.controller('ExpressionsCtrl', ['$scope', function ($scope) {

    $scope.main = {};
    $scope.main.test1 = [];;
    $scope.main.test2 = [{'some': 'Data'}];
}]);

// Tests avec les données statiques
myApp.controller('EmailsStatiquesCtrl', ['$scope', function ($scope) {

    $scope.emails = {};

    // Assigner les données initiales !
    $scope.emails.messages = globalData.emails;

}]);