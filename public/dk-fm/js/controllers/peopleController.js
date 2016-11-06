(function () {
    'use strict';

    angular.module("dk-fm.controllers.people", [
        'ui.router',
        'afkl.lazyImage'                     
    ])      
    .controller('peopleController', function ($scope, $state, $stateParams, $http, httpService, $rootScope) {
         $rootScope.curState = "Люди";
        $rootScope.people = "block"; 
        $scope.loading = false;
         if($(window).width()<=768) { 
                $scope.nolazy = {"nolazy": false, "className": 'people-image'}
        }
        else {
            $scope.nolazy = {"nolazy": true, "className": 'people-image'}
        }
        
    	var offset = 0;      
        httpService
		    .getPeople(offset)
		    .then(function(response) {                                
                angular.forEach(response.data, function(person){
                    var date = new Date(person.last_mod );                        
                    var month = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
                    person.last_mod  = month[date.getMonth()] + ' ' + date.getDate() +', ' + date.getFullYear();              

                })
                $scope.persons = response.data; 
               
            });       

        $rootScope.setScrollbar();
		$rootScope.setScrollbar('#content',{callbacks:{
						onTotalScroll:function(){
							$( "#content" ).trigger("scroll");
 					},
						
			}
		});
        $('#content').bind('scroll', function() { 
                if($(this).scrollTop() + $(this).innerHeight()>=$(this)[0].scrollHeight-10 && $state.current.name != "people.peopleInfo")  {                                 
                    offset++;
                    $scope.loading = true;
                    httpService
                        .getPeople(offset)
                        .then(function(response) {              
                            angular.forEach(response.data, function(person) {
                                var date = new Date(person.last_mod);                        
                                var month = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
                                person.last_mod = month[date.getMonth()] + ' ' + date.getDate() +', ' + date.getFullYear();
                                $scope.persons.push(person); 
                                $scope.loading = false;                               
                            });                            
                        });        
                }
            });       
    })
    
})();