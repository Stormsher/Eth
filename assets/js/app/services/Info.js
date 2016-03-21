(function() {
    'use strict';

    angular.module('app')
      .factory('Info', Info);

    Info.$inject = ["$resource"];

    function Info($resource) {
      return {
        ethereum: $resource('Info/graph/:id', {
          id: '@id'
        })
      }
    }
})();
