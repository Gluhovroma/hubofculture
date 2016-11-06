(function () {
    'use strict';

    angular.module("dkfm.controllers.instagram-edit", [
        'ui.router',
        'textAngular',
        'ui.select' 
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
    
     .filter("trust", ["$sce",
        function($sce) {

            return $sce.trustAsHtml;
    }])

    .controller('instagramEditController', function ($scope, $state, $stateParams, $http, httpService) {
        
        
    	$scope.change = function() {
    		window.instgrm.Embeds.process();
    	}

		$scope.render = function() {
            window.instgrm.Embeds.process();
        }

        httpService
            .getTags()
            .then(function(response){
                $scope.tags = response.data; 
            });


         $scope.addInstagram = function (instagram) { 
          console.log(instagram);
          var tags = [];
        
            angular.forEach(instagram.tags, function (item) {
                tags.push(item._id)
            });
           
          instagram['tags'] = tags;
            httpService
                .addInstagram(instagram)
                .then(function(response){
                     $state.go("instagram")
                })
            
        };

        
           
       
        
    })

})();