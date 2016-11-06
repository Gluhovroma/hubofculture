(function () {
    'use strict';

    angular.module("dkfm.controllers.info", [
        'ui.router',
         
    ])
    .controller('infoController', function ($scope, $state, $stateParams, $http, $timeout) {
       
    	$http
    		.get('/adminapi/info')
    		.then(function(response) {
    			$scope.info = response.data;
    		});

    	$scope.save = function(info){
    		$http.post('/adminapi/info', info)
            .success(function (data) {
             })
    	};
    })
    
})();