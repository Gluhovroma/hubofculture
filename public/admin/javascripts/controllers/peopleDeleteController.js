


(function () {
    'use strict';

    angular.module("dkfm.controllers.people-delete", [
        'ui.router',     
        'ngFileUpload',
        'textAngular',
        'ui.select'
    ])
    .filter('propsFilter', function() {
          return function(items, props) {
            var out = [];
            if (angular.isArray(items)) {
              items.forEach(function(item) {
                var itemMatches = false;

                var keys = Object.keys(props);
                for (var i = 0; i < keys.length; i++) {
                  var prop = keys[i];
                  var text = props[prop].toLowerCase();
                  if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                    itemMatches = true;
                    break;
                  }
                }
                if (itemMatches) {
                  out.push(item);
                }
              });
            } else {
              // Let the output be the input untouched
              out = items;
            }

            return out;
          };
    })
    .controller('peopleDeleteController', function ($scope, $state, $stateParams, httpService, $http) {      

      
        $scope.statuses = [{name:'Черновик', status:'draft'},{name: "В публикации", status: "publication"}];

        $scope.people = {};         

          httpService
            .getPeopleInfo($stateParams.people)
            .then(function(response){
              
              $scope.people = response.data;
              if ($scope.people.photo != null) $scope.showPhoto = true;                    
              $scope.people.status == "draft" ? $scope.people['status'] = $scope.statuses[0] : $scope.people['status'] = $scope.statuses[1];  
                                
                    
            });

        $scope.delete = function() {    
            httpService
              .deletePeople($stateParams.people)
              .then(function(response){
                $state.go('people');
              });       
        };       

    })
    
    



})();