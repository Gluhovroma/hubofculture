(function () {
    'use strict';

    angular.module("dk-fm.controllers.author", [
        'ui.router',       
        'textAngular'
        
    ])
    .filter("trust", ["$sce",
        function($sce) {

            return $sce.trustAsHtml;
    }])
    .controller('authorController', function ($anchorScroll, $scope, $rootScope, $stateParams, $state, httpService) {
        $rootScope.curState = "АВТОРЫ";     
        httpService
            .getAuthor()
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