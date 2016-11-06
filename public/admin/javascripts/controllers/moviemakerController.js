(function () {
    'use strict';

    angular.module("dkfm.controllers.moviemaker", [
        'ui.router',
         
    ])
    .controller('moviemakerController', function ($scope, $state, $stateParams, $http, $timeout) {
       
    	$http
    		.get('/adminapi/moviemaker')
    		.then(function(response) {
    			$scope.info = response.data;
    		});

    	$scope.save = function(info){
    		$http.post('/adminapi/moviemaker', info)
            .success(function (data) {
             })
    	};
    })
    
})();