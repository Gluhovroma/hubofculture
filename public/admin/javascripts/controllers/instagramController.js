(function () {
    'use strict';

    angular.module("dkfm.controllers.instagram", [
        'ui.router'        
    ])
    .filter('propsFilter', function() {
          return function(items, props) {
            var out = [];
            if (angular.isArray(items)) {
              items.forEach(function(item) {
                var itemMatches = false;

                var keys = Object.keys(props);
                for (var i = 0; i < keys.length; i++) {
                  var prop = keys[i];
                  var text = props[prop].toLowerCase();
                  if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                    itemMatches = true;
                    break;
                  }
                }
                if (itemMatches) {
                  out.push(item);
                }
              });
            } else {
              // Let the output be the input untouched
              out = items;
            }

            return out;
          };
    })
    .directive('postRender', [ '$timeout', function($timeout) {
        var def = {
            restrict : 'A', 
            terminal : true,
            transclude : true,
            link : function(scope, element, attrs) {
                $timeout(scope.render, 0);  //Calling a scoped method
            
            }
        };
        return def;
    }])
     .filter("trust", ["$sce",
        function($sce) {

            return $sce.trustAsHtml;
    }])

    .controller('instagramController', function ($scope, $state, $stateParams, $http, httpService) {
        
        var offset = 0;
        $scope.search = '';
        $scope.render = function() {
            window.instgrm.Embeds.process();
        }        

        httpService
            .getInstagram(offset)
            .then(function(response) {
                console.log(response.data);
                $scope.instagram = response.data; 
                angular.forEach($scope.instagram, function (instagram_item) {                    
                    instagram_item.created_at = new Date(instagram_item.created_at).format('Y.m.d');                   
                });
            });


        

        $scope.deleteInstagram = function(instagram) {
            offset = 0;
            httpService
                .deleteInstagram(instagram._id)
                .then(function(response) {    
               httpService
                    .getInstagram(offset)
                    .then(function(response) {
                        $scope.instagram = response.data; 
                        angular.forEach($scope.instagram, function (instagram_item) {                    
                            instagram_item.created_at = new Date(instagram_item.created_at).format('Y.m.d');                   
                        });
                    });
            }); 

        };  
           
        $scope.loadInstagram = function () {
            offset++;
            httpService
            .getInstagram(offset)
            .then(function(response){
                angular.forEach(response.data, function (item) {                  
                    item.created_at = new Date(item.created_at).format('Y.m.d');                   
                   $scope.instagram.push(item)
                });
            })
        }; 
        
    })

})();