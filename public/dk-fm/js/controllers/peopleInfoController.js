(function () {
    'use strict';

    angular.module("dk-fm.controllers.people-info", [
        'ui.router',        
        'textAngular'        
    ])
    .filter("trust", ["$sce",
        function($sce) {
            return $sce.trustAsHtml;
    }])
    .controller('peopleInfoController', function ($anchorScroll, $scope, $rootScope,$stateParams, $state, httpService,$location) {
               
       $("#content").scrollTop(0);  
        $rootScope.people = "none";        
        httpService
            .getPeopleInfo($stateParams.name)
            .then(function(response) {                
                $scope.people = response.data;        
                var date = new Date($scope.people.last_mod);                        
                var month = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
                $scope.people.last_mod = month[date.getMonth()] + ' ' + date.getDate() +', ' + date.getFullYear();
                
            });
   
        
    })


})();