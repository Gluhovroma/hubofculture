(function () {
    'use strict';

    angular.module("dkfm.controllers.soundcloud", [
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
    
   
    .controller('soundCloudController', function ($scope, $state, $stateParams, $http, httpService) {
        
          var offset = 0
    $http.get('/adminapi/soundcloud?offset=' + offset)
                .success(function (data) {
                  console.log(data);
                    $scope.soundclouds= data;                       
                });

        httpService
            .getTags()
            .then(function(response){
                $scope.tags = response.data; 
            });

            $scope.show = function() {
              $scope.soundcloudShow= $scope.newsoundcloud.url;
            };

         $scope.addSoundCloud= function (soundcloud) { 
          offset = 0;
          var tags = [];
        
            angular.forEach(soundcloud.tags, function (item) {
                tags.push(item._id)
            });
           
          soundcloud['tags'] = tags;
          
           $http.post('/adminapi/soundcloud/', soundcloud)
                .success(function (data) {
                    $http.get('/adminapi/soundcloud?offset=' + offset)
                    .success(function (data) {
                        $scope.newsoundcloud = null;
                        $scope.soundcloudShow = null;
                        $scope.soundclouds= data;                       
                    });
                                 
                });
            
        };


        $scope.deleteSoundcloud = function(soundcloud) {
       
                offset = 0;
            $http.delete('/adminapi/soundcloud/' + soundcloud._id)
                .success(function (data) {
                    $http.get('/adminapi/soundcloud?offset=' + offset)
                    .success(function (data) {
                        $scope.soundclouds= data;                       
                    });                        
                });
        };

        $scope.loadSoundcloud = function() {
            offset++;
            $http.get('/adminapi/soundcloud?offset=' + offset)
                .success(function (data) {
                    console.log("da");
                    console.log(data);
                      angular.forEach(data, function (item) { 
                        $scope.soundclouds.push(item)

                      })
                                        
                });
        }
        
           
       
        
    })

})();