(function () {
    'use strict';

    angular.module("dk-fm.controllers.creator", [
        'ui.router',       
        'textAngular'        
    ])
    .filter("trust", ["$sce",
        function($sce) {

            return $sce.trustAsHtml;
    }])
    .controller('creatorController', function ($anchorScroll, $scope, $rootScope, $stateParams, $state, httpService) {
        $rootScope.curState = "СОЗДАТЕЛИ";     
        httpService
            .getCreator()
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