'use strict';

angular.module('adagios.tactical.top_alert_producers', ['ngRoute' ])
    .controller('TacticalTopAlertProducers', ['$scope', function ($scope) {
        $scope.hosts = [
            {
                "host_name": "server-18",
                "problems": 10
            },
            {
                "host_name": "server-22",
                "problems": 5
            },
            {
                "host_name": "server-13",
                "problems": 3
            }
        ];
    }])

    .directive('adgTopAlertProducers', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/tactical/top_alert_producers/top_alert_producers.html'
        };
    });
