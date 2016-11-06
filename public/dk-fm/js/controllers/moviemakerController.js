(function () {
    'use strict';

    angular.module("dk-fm.controllers.moviemaker", [
        'ui.router',       
        'textAngular'
        
    ])
    .filter("trust", ["$sce",
        function($sce) {

            return $sce.trustAsHtml;
    }])
    .controller('moviemakerController', function ($anchorScroll, $scope, $rootScope, $stateParams, $state, httpService) {
        $rootScope.curState = "МУВИМЭЙКЕРЫ";     
        httpService
            .getMoviemaker()
            .then(function(response) {                
                $scope.info = response.data;                        
            }); 
		$rootScope.setScrollbar();
		$rootScope.setScrollbar('#content',{callbacks:{
						onTotalScroll:function(){
							$( "#content" ).trigger("scroll");
 					},
						
			}
			});
		
    })


})();