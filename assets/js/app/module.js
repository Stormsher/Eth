(function() {
  'use strict';

  angular.module('app', [
    'ngAria',
    'ui.router',
    'ngResource',
    'ngMaterial',
    'ngMessages',
    'angular-loading-bar',
    'ngAnimate',
    'ngMdIcons',
    'ngCookies',
    'nvd3',
    'ngSails'
  ]).run(inrun).config(conf);


  inrun.$inject = ["$rootScope", "$state", "Auth"];
  function inrun ($rootScope, $state, Auth) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
      if (!Auth.authorize(toState.data.access)) {
        event.preventDefault();
        $state.go('anon.login');
      }
    });
  }
  conf.$inject = ["$sailsProvider"];
  function conf($sailsProvider) {
    $sailsProvider.url = 'http://localhost';

  }

})();
