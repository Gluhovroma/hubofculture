(function () {
    'use strict';

    angular.module("dkfm.controllers.dj", [
        'ui.router',
         
    ])
    .controller('djController', function ($scope, $state, $stateParams, $http, $timeout) {
       
    	$http
    		.get('/adminapi/dj')
    		.then(function(response) {
    			$scope.info = response.data;
    		});

    	$scope.save = function(info){
    		$http.post('/adminapi/dj', info)
            .success(function (data) {
             })
    	};
    })
    
})();