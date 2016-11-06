(function () {
    'use strict';

    angular.module("dk-fm.controllers.dj", [
        'ui.router',       
        'textAngular'
        
    ])
    .filter("trust", ["$sce",
        function($sce) {

            return $sce.trustAsHtml;
    }])
    .controller('djController', function ($anchorScroll, $scope, $rootScope, $stateParams, $state, httpService) {
        $rootScope.curState = "Диджеи";     
        httpService
            .getDJ()
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