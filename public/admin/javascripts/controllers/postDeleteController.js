(function () {
    'use strict';

    angular.module("dkfm.controllers.post-delete", [
        'ui.router',     
        'ngFileUpload',
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
    .controller('postDeleteController', function ($scope, $state, $stateParams, httpService, $http) {      

      $scope.types = [{name:'Одноуровневый',post_type:'simple'},{name: "Двухуровневый",post_type: "multiple"}];
        $scope.statuses = [{name:'Черновик', status:'draft'},{name: "В публикации", status: "publication"}];

        $scope.post = {};        	

        	httpService
        		.getPostInfo($stateParams.post)
        		.then(function(response){
        			console.log(response.data);
        			$scope.post = response.data;
        			if ($scope.post.photo != null) $scope.showPhoto = true;                    
                    if ($scope.post.songs != null) $scope.showSong = true;                    
                    if ($scope.post.type == "simple") $scope.post['type'] =  $scope.types[0];                    
                    if ($scope.post.type == "multiple") {
                        $scope.showAnnotation = true;
                        $scope.post['type'] =  $scope.types[1]
                    }
                    $scope.post.status == "draft" ? $scope.post['status'] = $scope.statuses[0] : $scope.post['status'] = $scope.statuses[1];  
                                
                    
        		});

        $scope.delete = function() {    
            httpService
              .deletePost($stateParams.post)
              .then(function(response){
                $state.go('posts');
              });       
        };       

    })
    
    



})();