(function () {
    'use strict';

    angular.module("dkfm.controllers.timetable-edit", [
        'ui.router',
         
    ])
    .controller('timetableEditController', function ($scope, $state, $stateParams, $http, $timeout) {
       
        $scope.timetable_items = [];
 

       if ($stateParams.timetable) {        
            $http.get('/adminapi/timetable/' + $stateParams.timetable)
            .success(function (data) {   
                console.log(data);            
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
       }
       $scope.save = function(date, timetable_items) {
        var timetable_item = {
            'date': date,
            'events': timetable_items
        }
        if ($stateParams.timetable){
            $http.put('/adminapi/timetable/'+ $stateParams.timetable, timetable_item)
            .success(function (data) {
                 $state.go('timetable');             
            });
        }
        else {
            $http.post('/adminapi/timetable/', timetable_item)
            .success(function (data) {
                 $state.go('timetable');             
            });
        }
        
       }
       $scope.deleteItem = function(index) {
       
        $scope.timetable_items.splice(index, 1);            
     
      
       }
       $scope.AddNewTimetableItem = function() {
        var newTimetableItem = {
          title: "",
          time: null
        };
        $scope.timetable_items.push(newTimetableItem);       
              
      };
       
    })
    
})();