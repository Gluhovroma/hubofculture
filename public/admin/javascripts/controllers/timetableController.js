(function () {
    'use strict';

    angular.module("dkfm.controllers.timetable", [
        'ui.router',
         
    ])
    .controller('timetableController', function ($scope, $state, $stateParams, $http, $rootScope, $timeout) {

          var offset = 0;
          $http.get('/adminapi/timetable?offset=' + offset)
            .then(function (response) {
                 $scope.timetable= response.data;
                 angular.forEach($scope.timetable, function (item) { 
                     item.date = new Date(item.date).format('d.m.Y');
                 })                      
            });
           
        $scope.loadTimetable = function () {
            offset++;
            $http.get('/adminapi/timetable?offset='+ offset)
            .then(function (response) {           
                angular.forEach(response.data, function (item) {
                    item.date = new Date(item.date).format('d.m.Y');
                   $scope.timetable.push(item)
                });
                  
                
            }); 
        };
       
        
        
       
    })
    
})();