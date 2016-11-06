(function () {
    'use strict';

    angular.module("dkfm.controllers.timetable-delete", [
        'ui.router',
         
    ])
    .controller('timetableDeleteController', function ($scope, $state, $stateParams, $http, $timeout) {    
   
   
    
            $http.get('/adminapi/timetable/' + $stateParams.timetable)
            .success(function (data) {               
                var date = new Date(data.date);            
                $scope.date = date;
                $scope.timetable_items = [];  
                angular.forEach(data.events, function(event, key) {
                    var time = new Date(event.time);
                    var new_event = {
                        time: time,
                        title: event.title
                    }
                    $scope.timetable_items.push(new_event);
                })   
            });
       
       $scope.delete = function(timetable_item){
        	$http.delete('/adminapi/timetable/' + $stateParams.timetable)
            .then(function (data) {          
          		$state.go("timetable");                    
            });
        
       }
       
    })
    
})();