(function () {
    'use strict';

    angular.module("dk-fm.controllers.info", [
        'ui.router',       
        'textAngular'
        
    ])
    .filter("trust", ["$sce",
        function($sce) {

            return $sce.trustAsHtml;
    }])
    .controller('infoController', function ($anchorScroll, $scope, $rootScope, $stateParams, $state, httpService) {
           $rootScope.curState = "ИНФО";     
        // httpService
        //     .getInfo()
        //     .then(function(response) {                
        //         $scope.info = response.data;                        
        //     }); 
		$rootScope.setScrollbar();
		$rootScope.setScrollbar('#content',{callbacks:{
						onTotalScroll:function(){
							$( "#content" ).trigger("scroll");
 					},
						
			}
			});
		
    })


})();