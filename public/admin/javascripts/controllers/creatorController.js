(function () {
    'use strict';

    angular.module("dkfm.controllers.creator", [
        'ui.router',
         
    ])
    .controller('creatorController', function ($scope, $state, $stateParams, $http, $timeout) {
       
    	$http
    		.get('/adminapi/creator')
    		.then(function(response) {
    			$scope.info = response.data;
    		});

    	$scope.save = function(info){
    		$http.post('/adminapi/creator', info)
            .success(function (data) {
             })
    	};
    })
    
})();