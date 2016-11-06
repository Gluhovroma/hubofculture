(function () {
    'use strict';

    angular.module("dkfm.controllers.video", [
        'ui.router',
        'ui.select',
        'anguvideo',
        
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
    .controller('videoController', function ($scope, $state, $stateParams, $http, $timeout, httpService) {
       var offset = 0;
       $scope.test = [];
       $scope.videoshow = null;


           $http.get('/adminapi/video?offset=' + offset)
                .success(function (data) {
                    $scope.videos = data;
                    console.log($scope.videos);                       
                });
        httpService
            .getTags()
            .then(function(response){
                $scope.tags = response.data; 
            });


            $scope.show = function() {
              $scope.videoShow = $scope.newvideo.url;
            };


            $scope.addVideo = function (video) {   
             offset = 0;         
            
              var tags = [];
        
            angular.forEach(video.tags, function (item) {
                tags.push(item._id)
            });
           
          video['tags'] = tags;


            $http.post('/adminapi/video/', video)
            .success(function (data) {
                $http.get('/adminapi/video?offset=' + offset)
                .success(function (data) {
                    $scope.videos= data;     
                    $scope.newvideo = null; 
                    $scope.videoShow = null;                 
                });
                             
            });
        }
        $scope.deleteVideo = function(video) {
            offset = 0;
            $http.delete('/adminapi/video/' + video._id)
            .success(function (data) {
                $http.get('/adminapi/video?offset=' + offset)
                .success(function (data) {
                    $scope.videos= data;                       
                });                        
            });
        }

         $scope.loadVideo = function() {
            offset++;
            $http.get('/adminapi/video?offset=' + offset)
                .success(function (data) {
                    angular.forEach(data, function (item) { 
                        $scope.videos.push(item);
                        console.log($scope.videos);

                    });
                                          
                });
       }
    })
    
})();