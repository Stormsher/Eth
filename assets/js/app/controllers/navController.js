angular.module('app')
  .controller('NavController', function($scope, Auth, CurrentUser, $rootScope) {
    $scope.isCollapsed = true;
    $scope.auth = Auth;
    $scope.user = CurrentUser.user;
    $scope.bread = $rootScope.bread;
    console.log($rootScope.bread);
    $scope.logout = function() {
      Auth.logout();
    }



  });
