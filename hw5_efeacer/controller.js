var citiesApp = angular.module('citiesApp', []);

citiesApp.controller('citiesController', function($scope) {
    $scope.cities = [{
            metropolis: 'Mumbai',
            continent: 'Asia',
            population: '20400000'
        },
        {
            metropolis: 'New York',
            continent: 'North America',
            population: '21295000'
        },
        {
            metropolis: 'San Francisco',
            continent: 'North America',
            population: '5780000'
        },
        {
            metropolis: 'London',
            continent: 'Europe',
            population: '8580000'
        },
        {
            metropolis: 'Rome',
            continent: 'Europe',
            population: '2715000'
        },
        {
            metropolis: 'Melbourne',
            continent: 'Australia',
            population: '3900000'
        },
        {
            metropolis: 'San Jose',
            continent: 'North America',
            population: '7354555'
        },
        {
            metropolis: 'Rostov-on-Don',
            continent: 'Europe',
            population: '1052000'
        },
    ]
});
