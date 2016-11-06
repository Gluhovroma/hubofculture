(function () {
    'use strict';

    angular.module("dk-fm.controllers.article", [
        'ui.router',       
        'textAngular'
        
    ])
    .filter("trust", ["$sce",
        function($sce) {
            return $sce.trustAsHtml;
    }])
    .controller('articleController', function ($location, $anchorScroll, $scope, $rootScope,$stateParams, $state, httpService) {
                
        $rootScope.articles = "none";
        $scope.song_cond = false;
        httpService
            .getPostInfo($stateParams.name)
            .then(function(response) {                
                $scope.post = response.data.post;               
                var date = new Date($scope.post.created_at);                        
                var month = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
                $scope.post.created_at = month[date.getMonth()] + ' ' + date.getDate() +', ' + date.getFullYear();
                if ($scope.post.songs != null) {
                    $scope.song_cond = true;
                }
            });

            $scope.play = function(simple) {                
                 $rootScope.cassetteControlPlayCondition = true;
            $rootScope.podcast_songs = [];
            $rootScope.tracks = [];
            angular.forEach(simple.songs, function(song){
                var list_item = {
                    name: song.artist +' - ' + song.title
                };
                var item = {
                    image: "images/sunhawk-small-2@2x.jpg",
                    name: song.artist +' - ' + song.title,
                    srcs: [
                      {
                        src: song.url,
                        type: "audio/mp3"
                      }
                    ]
                };
                $rootScope.tracks.push(list_item);
                $rootScope.podcast_songs.push(item);

            });           
            
            audioPlayer.songPlay($rootScope.podcast_songs);
            if ($rootScope.user != null) {  
                    if ($rootScope.user.like_tracks) {
                        if( $rootScope.user.like_tracks[$rootScope.tracks[0].name.replace(/\s+/g, '')]) {                                                  
                            $rootScope.like = "heart-red";
                        }
                        else {
                            $rootScope.like = "heart-black";
                        }                            
                    } 
                    else {
                        $rootScope.like = "heart-black";
                    }             
                }
            $rootScope.animationCond = true;
            $rootScope.radioPlayCond = false;
            $rootScope.player = "block";
            $rootScope.song = audioPlayer.songs[0].name; 
            $rootScope.from = 'main';
            $rootScope.podcast_template = $rootScope.templates['track_list'];
           
            };       
        
    })


})();