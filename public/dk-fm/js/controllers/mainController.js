(function () {
    'use strict';

    angular.module("dk-fm.controllers.main", [
        'ui.router'    
         
    ])
    .controller('mainController',
        function ($scope, $state, $stateParams, httpService) {            
        	httpService
        		.getTags()
        		.then(function(response) {                    
                    $scope.tags = response.data;                  
                });
           
         
    
           
    })  
      
})();