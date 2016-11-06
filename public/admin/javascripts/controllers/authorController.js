(function () {
    'use strict';

    angular.module("dkfm.controllers.author", [
        'ui.router',
         
    ])
    .controller('authorController', function ($scope, $state, $stateParams, $http, $timeout) {
       
    	$http
    		.get('/adminapi/author')
    		.then(function(response) {
    			$scope.info = response.data;
    		});

    	$scope.save = function(info){
    		$http.post('/adminapi/author', info)
            .success(function (data) {
             })
    	};
    })
    
})();