(function () {
    'use strict';

    angular.module("dk-fm.controllers.articles", [
        'ui.router',
        'ngSanitize',       
        'afkl.lazyImage'             
    ])
    .filter("trust", ["$sce",
        function($sce) {

            return $sce.trustAsHtml;
    }])
    .filter('truncate', function () {
        return function (text, length, end) {
            if (text) {
                if (isNaN(length))
                length = 10;
                if (end === undefined)
                    end = "...";
                if (text.length <= length || text.length - end.length <= length) {
                    return text;
                }
                else {
                    return String(text).substring(0, length-end.length) + end;
                }
            }  

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
    .controller('articlesController', function ($scope, $state, $stateParams, $http, httpService, $rootScope, $location, $anchorScroll) {
        
        $rootScope.articles = "block";     
        $rootScope.curState = "ПОТОК";
    	var offset = 0;
    	var tag;
        $scope.loading = false;
    	var posts_max = 0;
    	$scope.load_condition = false;

    	if (!$stateParams.tag) {
    		$state.go('home');
    	}
    	else {
    		tag = $stateParams.tag;            
    	}
    
    	
        $scope.render = function() {
            window.instgrm.Embeds.process();
			$rootScope.setScrollbar();
		
        }

        if($(window).width()<=768) { 
                $scope.nolazy = {"nolazy": false}
        }
        else {
            $scope.nolazy = {"nolazy": true}
        }
      
                httpService
		        	.getEsters(tag, offset)
		            .then(function(response) {
                        if (response.data != "") {
                            $scope.esters = [];
                            var esters =  response.data;                        
                            for (var i = 0; i < esters.length; i++) {
                            if (esters[i].type == "video") {
                                var array = [];
                                array.push(esters[i]);
                                $scope.esters.push(array);
                            }
                            else if (esters[i].type == "SoundCloud") {
                                var array = [];
                                array.push(esters[i]);
                                $scope.esters.push(array);
                            }
                            else if (esters[i].type == "simple") {
                                var array = [];
                                array.push(esters[i]);
                                $scope.esters.push(array);
                            }
                            else if (esters[i].type == "instagram") {
                                if (i+1 < esters.length) {
                                     if (esters[i+1].type == "instagram"  || esters[i+1].type == "multiple") {
                                        var array = [];
                                        array.push(esters[i]);
                                        array.push(esters[i+1]);
                                        $scope.esters.push(array);
                                        i++;
                                     }
                                     else {
                                        var array = [];
                                        array.push(esters[i]);
                                        $scope.esters.push(array)
                                     }
                                }
                                else {
                                    var array = [];
                                    array.push(esters[i]);
                                    $scope.esters.push(array)
                                }
                            }
                            else if (esters[i].type == "multiple") {
                                if (i+1 < esters.length) {
                                     if (esters[i+1].type == "instagram"  || esters[i+1].type == "multiple") {
                                        var array = [];
                                        array.push(esters[i]);
                                        array.push(esters[i+1]);
                                        $scope.esters.push(array);
                                        i++;
                                     }
                                     else {
                                        var array = [];
                                        array.push(esters[i]);
                                        $scope.esters.push(array)
                                     }
                                }
                                else {
                                    var array = [];
                                    array.push(esters[i]);
                                    $scope.esters.push(array)
                                }
                            }                            

                        };
                        var first_array_length = Math.floor($scope.esters.length / 2);
                        $scope.first_array_esters = [];
                        $scope.second_array_esters = [];
                        
                        for (var i = 0 ; i < first_array_length; i++) {
                            $scope.first_array_esters.push($scope.esters[i])
                        };
                        for (var i = first_array_length ; i < $scope.esters.length; i++) {
                            $scope.second_array_esters.push($scope.esters[i])
                        };

                        }
                        else {
                            $state.go('articles');
                        }
                                            
		                
                        

		                
		            });
       
        
        $scope.playVideo = function(video) {
            if ($rootScope.youtubeVideo != null) {
                $rootScope.youtubeVideoStop();
            }
            console.log(audioPlayer);
            if (audioPlayer.songs.length > 0) {
            	 audioPlayer.togglePause(); 
            }
           	$rootScope.cassetteControlPlayCondition = false;
           	$rootScope.animationCond = false;
           	$rootScope.radioPlayCond = false;
            var iframe = document.createElement("iframe");
			iframe.setAttribute("src", "//www.youtube.com/embed/" + video.id + "?autoplay=1&autohide=2&border=0&rel=0&wmode=opaque&amp&enablejsapi=1&showinfo=0");
			iframe.setAttribute("frameborder", "0");
            var id = "youtube-iframe" + video.id;
			iframe.setAttribute("id", id);
            iframe.setAttribute("class", "youtube-iframe");
            iframe.setAttribute("allowfullscreen", true)
            iframe.setAttribute("webkitallowfullscreen", true)
            if ($rootScope.radioOpen == true) {
            	var doc = $('.radio-close ' + '#'+video.id)[0];
            	console.log(doc);
            	doc.className += " video-switch";
			doc.innerHTML = "";
			doc.appendChild(iframe);
            $rootScope.youtubeVideo = id;
            }
            else {
            	var doc = $('.radio-open ' + '#'+video.id)[0];
            	console.log(doc);
            		doc.className += " ta-insert-video";
			doc.innerHTML = "";
			doc.appendChild(iframe);
            $rootScope.youtubeVideo = id;
            }
       		
			// var doc = document.getElementById(video.id);
			// doc.className += " video-switch";
			// doc.innerHTML = "";
			// doc.appendChild(iframe);
   //          $rootScope.youtubeVideo = id; 
			
			
        }


      
        $scope.play = function(simple) {

            if ($rootScope.youtubeVideo != null) {
                $rootScope.youtubeVideoStop();
            } 
            $rootScope.cassetteControlPlayCondition = true;
            $rootScope.podcast_songs = [];
            $rootScope.tracks = [];
            angular.forEach(simple.songs, function(song){
                console.log(song);
                var list_item = {
                    name: song.artist +' - ' + song.title,
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
            var scroll;
            var fullsreenstatus = 0;
           $('#content').bind('scroll', function() { 
                console.log("kaka");

                if (fullsreenstatus == 0) {
                    scroll = $(this).scrollTop();
                    console.log(scroll);
                } 





                if($(this).scrollTop() + $(this).innerHeight()>=$(this)[0].scrollHeight-10 && $state.current.name != "articles.article")  {
                 $scope.loading = true;           
            offset++;
            httpService
                .getEsters(tag, offset)
                .then(function(response) {                     
                        var esters =  response.data;
                        var esters_two_col = [];
                        for (var i = 0; i < esters.length; i++) {
                            if (esters[i].type == "video") {
                                var array = [];
                                array.push(esters[i]);
                                $scope.esters.push(array);
                                esters_two_col.push(array);
                            }
                            else if (esters[i].type == "SoundCloud") {
                                var array = [];
                                array.push(esters[i]);
                                $scope.esters.push(array);
                                esters_two_col.push(array);
                            }
                            else if (esters[i].type == "simple") {
                                var array = [];
                                array.push(esters[i]);
                                $scope.esters.push(array);
                                esters_two_col.push(array);
                            }
                            else if (esters[i].type == "instagram") {
                                if (i+1 < esters.length) {
                                     if (esters[i+1].type == "instagram"  || esters[i+1].type == "multiple") {
                                        var array = [];
                                        array.push(esters[i]);
                                        array.push(esters[i+1]);
                                        $scope.esters.push(array);
                                        esters_two_col.push(array);
                                        i++;
                                     }
                                     else {
                                        var array = [];
                                        array.push(esters[i]);
                                        $scope.esters.push(array)
                                        esters_two_col.push(array);
                                     }
                                }
                                else {
                                    var array = [];
                                    array.push(esters[i]);
                                    $scope.esters.push(array)
                                    esters_two_col.push(array);
                                }
                            }
                            else if (esters[i].type == "multiple") {
                                if (i+1 < esters.length) {
                                     if (esters[i+1].type == "instagram"  || esters[i+1].type == "multiple") {
                                        var array = [];
                                        array.push(esters[i]);
                                        array.push(esters[i+1]);
                                        $scope.esters.push(array);
                                        esters_two_col.push(array);
                                        i++;
                                     }
                                     else {
                                        var array = [];
                                        array.push(esters[i]);
                                        $scope.esters.push(array);
                                        esters_two_col.push(array);
                                     }
                                }
                                else {
                                    var array = [];
                                    array.push(esters[i]);
                                    $scope.esters.push(array);
                                    esters_two_col.push(array);
                                }
                            }
                             

                        };
                        if (esters_two_col.length>0) {
                           var first_array_length = Math.floor(esters_two_col.length / 2); 
                           var second_array_length = esters_two_col.length - first_array_length;
                        };
                        
                        if ($scope.first_array_esters.length < $scope.second_array_esters.length){
                            first_array_length = Math.max(first_array_length, second_array_length)
                        }
                        else {
                            first_array_length = Math.min(first_array_length, second_array_length)
                        }
                    
                        
                        
                        for (var i = 0 ; i < first_array_length; i++) {
                            $scope.first_array_esters.push(esters_two_col[i])
                        };
                        for (var i = first_array_length ; i < esters_two_col.length; i++) {
                            $scope.second_array_esters.push(esters_two_col[i])
                        };  
                         $scope.loading = false;           
                    });       
                }
            })

		  $rootScope.setScrollbar('#content',{callbacks:{
						onTotalScroll:function()
						{
							$( "#content" ).trigger("scroll");
						}
						,
						onScroll:function(){
							console.log(this.mcs.top)
							scroll=this.mcs.top;
 					      },
						
			}
			});

        $(document).on('webkitfullscreenchange mozfullscreenchange fullscreenchange', function(e) {    
                console.log(scroll);
            if (fullsreenstatus == 0) {
                if (window.chrome) {
                    
                }
                fullsreenstatus = 1;
            }
            else {   
				if(!$rootScope.isMobile){
                    console.log(scroll);
                    $("#content").mCustomScrollbar("scrollTo",[0,scroll]);
                }				
				else {
                    $("#content").scrollTop(scroll);
                }
                
                fullsreenstatus = 0;
            }   
        });


            

       
    })
    
})();