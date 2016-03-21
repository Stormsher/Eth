(function() {
  'use strict';
  angular.module('app').controller('DashboardController', DashboardController);

  DashboardController.$inject = ["$scope", "$rootScope", "$sails", "Info"];

  function arrayMin(arr) { return Math.min.apply(Math, arr); };

  function DashboardController($scope, $rootScope, $sails, Info) {
    //init block
    $rootScope.bread = "Dashboard";

    $scope.options = {
      chart: {
        type: 'lineChart',
        height: 450,
        forceY: [9,11],
        margin: {
          top: 20,
          right: 20,
          bottom: 40,
          left: 55
        },
        x: function(d) {
          return d.x;
        },
        y: function(d) {
          return d.y;
        },
        useInteractiveGuideline: true,
        xAxis: {
          axisLabel: 'Time',
          tickFormat: function(d) {
            return d3.time.format('%X')(new Date(d))
          },
          showMaxMin: false,
        },
        yAxis: {
          axisLabel: 'Price in USD',
          tickFormat: function(d) {
            return d3.format('.02f')(d);
          },
          axisLabelDistance: -10
        }
      },
      title: {
        enable: true,
        text: 'Ethereum to USD chart'
      }
    };

    $scope.data = [];

    $sails.get("/Info").success(function (response) {
    }).error(function (response) { console.log('error');});

    $sails.on('info', function ( message ) {

      var it = {
        x: new Date(message.data.createdAt),
        y: message.data.usd
      }
      $scope.currentUSD = Number(message.data.usd).toFixed(2);
      $scope.data[0].values.push(it);
      maxmin.push($scope.currentUSD);
      var chartMax = Math.max.apply(null, maxmin);
      $scope.options.chart.forceY = [chartMax-1,chartMax+0.5];

    });


var maxmin= [];
    Info.ethereum.get({}, function(items) {
      var usd = [];
      $scope.currentUSD = Number(items.last).toFixed(2);
      items.graph.forEach(function(item) {
        var time = moment(item.createdAt);
        var it = {
          x: new Date(item.time),
          y: item.usd
        }
        usd.push(it);
        maxmin.push(item.usd);
      });


      var chartMax = Math.max.apply(null, maxmin);
      $scope.options.chart.forceY = [chartMax-1,chartMax+0.5];
      var obj = {
        values: usd,
        key: 'Usd',
        color: '#ff7f0e'
      }
      $scope.data.push(obj);
    });

    $scope.test = function () {
      $scope.data[0].values.push({})
    }
  }
})();
