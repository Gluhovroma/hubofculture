(function () {
    'use strict';

    angular.module("dkfm.controllers.posts", [
        'ui.router'        
    ])
    .controller('postsController', function ($scope, $state, $stateParams, $http, httpService) {
        
        var offset = 0;
        $scope.search = '';

        $scope.statuses = [
            {name:'Черновик', status:'draft'},
            {name: "В публикации", status: "publication"}
        ];

        httpService
            .getPosts($scope.search, offset)
            .then(function(response) {
                $scope.posts = response.data; 
                angular.forEach($scope.posts, function (post) {
                    post.status == 'draft' ?   post.status = 'Черновик' : post.status = 'В публикации';
                    post.created_at = new Date(post.created_at).format('Y.m.d');
                    post.last_mod = new Date(post.last_mod).format('Y.m.d');
                });

            });
        $scope.searchPosts = function(search) {
            httpService
            .getPosts(search, offset)
            .then(function(response) {
                $scope.posts = response.data; 
                angular.forEach($scope.posts, function (post) {
                    post.status == 'draft' ?   post.status = 'Черновик' : post.status = 'В публикации';
                    post.created_at = new Date(post.created_at).format('Y.m.d');
                    post.last_mod = new Date(post.last_mod).format('Y.m.d');
                });

            });
        }
           
        $scope.loadPosts = function (search) {
            offset++;
            httpService
            .getPosts(search, offset)
            .then(function(response){
                angular.forEach(response.data, function (item) {
                    item.status == 'draft' ?  item.status = 'Черновик' : item.status = 'В публикации';
                    item.created_at = new Date(item.created_at).format('Y.m.d');
                    item.last_mod = new Date(item.last_mod).format('Y.m.d');
                   $scope.posts.push(item)
                });
            })
        }; 

       
    })

})();