(function() {
  'use strict';

  angular.module('app').config(appConfig);

  function appConfig($stateProvider, $urlRouterProvider, AccessLevels) {

    $stateProvider
      .state('anon', {
        abstract: true,
        template: '<ui-view/>',
        data: {
          access: AccessLevels.anon
        }
      })

      .state('anon.login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginController'
      })
      .state('anon.register', {
        url: '/register',
        templateUrl: 'views/register.html',
        controller: 'RegisterController'
      })
      .state('anon.dashboard',{
        url: '/',
        views: {
           '' : { templateUrl: 'views/bag.html' },
           'content@anon.dashboard': { templateUrl: 'views/dashboard.html', controller: "DashboardController" },

        },
        controller: 'MessagesController'
      });
    $stateProvider
      .state('user', {
        abstract: true,
        template: '<ui-view/>',
        data: {
          access: AccessLevels.user
        }
      })
      .state('user.dashboard', {
        url: '/dashboard',
        views: {
           '' : { templateUrl: 'views/bag.html' },
           'content@user.dashboard': { templateUrl: 'views/dashboard.html', controller: "DashboardController" },
           'menu@user.dashboard': { templateUrl: 'views/sidebar.html'},
           'toolbar@user.dashboard' : { templateUrl: 'views/toolbar.html', controller: "NavController" }
        },
        controller: 'MessagesController'
      });
    $urlRouterProvider.otherwise('/');
  }

})();
