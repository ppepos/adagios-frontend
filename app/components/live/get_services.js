'use strict';

angular.module('adagios.live')

    .constant('filterSuffixes', { contains: '__contains',
                                  has_fields: '__has_field',
                                  startswith: '__startswith',
                                  endswith: '__endswith',
                                  exists: '__exists',
                                  in: '__in',
                                  isnot: '__isnot',
                                  regex: '__regex'
                                })

    .factory('getServices', ['$http', 'filterSuffixes',
        function ($http, filterSuffixes) {
            return function (columns, filters, apiName) {
                var filtersQuery = '';

                function createFiltersQuery(filters) {
                    var builtQuery = '';
                    angular.forEach(filters, function (value, key) {
                        var filterType = filterSuffixes[key];
                        angular.forEach(value, function (fieldValues, fieldName) {
                            var filter = fieldName + filterType;
                            angular.forEach(fieldValues, function (_value) {
                                var filterQuery = '&' + filter + '=' + _value;
                                builtQuery += filterQuery;
                            });
                        });
                    });

                    return builtQuery;
                }

                filtersQuery = createFiltersQuery(filters);

                return $http.get('/rest/status/json/' + apiName + '/?fields=' + columns + filtersQuery)
                    .error(function () {
                        throw new Error('getServices : GET Request failed');
                    });
            };
        }]);
