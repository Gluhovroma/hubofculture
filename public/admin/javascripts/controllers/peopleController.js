(function () {
    'use strict';

    angular.module("dkfm.controllers.people", [
        'ui.router'        
    ])
    .controller('peopleController', function ($scope, $state, $stateParams, $http, httpService) {
        
        var offset = 0;
        $scope.search = '';

        $scope.statuses = [
            {name:'Черновик', status:'draft'},
            {name: "В публикации", status: "publication"}
        ];

        httpService
            .getPeople($scope.search, offset)
            .then(function(response) {
                $scope.people = response.data; 
                angular.forEach($scope.people, function (item) {
                    item.status == 'draft' ?   item.status = 'Черновик' : item.status = 'В публикации';
                    item.created_at = new Date(item.created_at).format('Y.m.d');
                    item.last_mod = new Date(item.last_mod).format('Y.m.d');
                });

            });
        $scope.searchPeople = function(search) {
            httpService
            .getPeople(search, offset)
            .then(function(response) {
                $scope.people = response.data; 
                angular.forEach($scope.people, function (item) {
                    item.status == 'draft' ?   item.status = 'Черновик' : item.status = 'В публикации';
                    item.created_at = new Date(item.created_at).format('Y.m.d');
                    item.last_mod = new Date(item.last_mod).format('Y.m.d');
                });

            });
        }
           
        $scope.loadPeople = function (search) {
            offset++;
            httpService
            .getPeople(search, offset)
            .then(function(response){
                angular.forEach(response.data, function (item) {
                    item.status == 'draft' ?  item.status = 'Черновик' : item.status = 'В публикации';
                    item.created_at = new Date(item.created_at).format('Y.m.d');
                    item.last_mod = new Date(item.last_mod).format('Y.m.d');
                   $scope.people.push(item)
                });
            })
        }; 

       
    })

})();