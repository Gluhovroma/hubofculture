

(function () {
    'use strict';
    
    angular.module('dk-fm', [
        'dk-fm.controllers.main',
        'dk-fm.controllers.articles',
        'dk-fm.controllers.article',   
        'dk-fm.controllers.people',
        'dk-fm.controllers.people-info', 
        'dk-fm.controllers.info',            
        'dk-fm.services.httpService',
        'dk-fm.controllers.directives.ester-view',
        'afkl.lazyImage',
        'ngTouch',          
    ])
    .run(function($rootScope, httpService,$state,$window,$timeout, $location, $anchorScroll, socket,$http) { 
    	$rootScope.isMobile=(function(a){return(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))?true:false})(navigator.userAgent||navigator.vendor||window.opera);
        $rootScope.chrome = false;
                
        

		$rootScope.setScrollbar= function(sel,options)
		{
			if(!$rootScope.isMobile)
			{
				options=options || {};
				sel= sel || '.my-scroll-bar';
				var opts = $.extend( {}, $rootScope.setScrollbar.defaults, options);
				
					$(sel+':not([scrolled])').each(function(){
						$(this).attr('scrolled',true);
						if($(this).attr('scrollbar-theme'))
							opts.theme=$(this).attr('scrollbar-theme');
						if(sel=="#content")
							opts.mouseWheel.scrollAmount=Math.floor($(window).height()*(28/100));
						console.log(opts.mouseWheel.scrollAmount);
						$(this).mCustomScrollbar(opts);
					});
			}
		}
		$rootScope.setScrollbar.defaults={
						  theme:"rounded-dots",
						  scrollInertia:1000,
						  mouseWheel:{scrollAmount: "auto"},
						  autoHideScrollbar:true,
						  autoExpandScrollbar: true,
						  scrollButtons:{enable:true}
						}
		

        $('#audio-player').on('nextSong', function() {
            $rootScope.$apply(function () {
                if (audioPlayer.currentSong === audioPlayer.songs.length - 1) {
                    $rootScope.song = audioPlayer.songs[0].name;
                    $rootScope.curSong = 0;
                  } else {
                    $rootScope.curSong = audioPlayer.currentSong+1;
                    $rootScope.song = audioPlayer.songs[audioPlayer.currentSong+1].name;;
                  }
                  if ($rootScope.user != null) {  
                    if ($rootScope.user.like_tracks) {
                        if( $rootScope.user.like_tracks[$rootScope.song.replace(/\s+/g, '')]) {                                                  
                            $rootScope.like = "heart-red ion-ios-heart";
                        }
                        else {
                            $rootScope.like = "ion-ios-heart-outline heart-black";
                        }                            
                    } 
                    else {
                        $rootScope.like = "ion-ios-heart-outline heart-black";
                    }             
                } 
                $rootScope.animationCond = false;
                    $timeout(function() {               
                        $rootScope.animationCond = true;               
                        }, 140);
            })          
                      
        })
        $('#audio-player').on('previousSong', function() {
            $rootScope.$apply(function () {
                if (audioPlayer.currentSong === 0) {
                    $rootScope.song = audioPlayer.songs[audioPlayer.songs.length-1].name;
                    $rootScope.curSong = audioPlayer.songs.length-1;
                  } else {
                    $rootScope.curSong = audioPlayer.currentSong-1;
                    $rootScope.song = audioPlayer.songs[audioPlayer.currentSong-1].name;;
                  }
                  if ($rootScope.user != null) {  
                    if ($rootScope.user.like_tracks) {
                        if( $rootScope.user.like_tracks[$rootScope.song.replace(/\s+/g, '')]) {                                                  
                            $rootScope.like = "heart-red ion-ios-heart";
                        }
                        else {
                            $rootScope.like = "ion-ios-heart-outline heart-black";
                        }                            
                    } 
                    else {
                        $rootScope.like = "ion-ios-heart-outline heart-black";
                    }             
                } 
                $rootScope.animationCond = false;
                    $timeout(function() {               
                        $rootScope.animationCond = true;               
                        }, 140);
            })       
        })

		$('#audio-player').on('radioplaypause', function() {
			
			$rootScope.$apply(function () {
				$rootScope.radioPlayCond == true ? $rootScope.radioPlayCond = false : $rootScope.radioPlayCond =true;
			})
			
		})
        $('#audio-player').on('playerStopLoading', function() {
            // alert("stop");
            // $rootScope.$apply(function () {
            //     if ($rootScope.radioPlayCond != false)
                    // $rootScope.radioPlayCond = false;
            // })
            // $rootScope.$apply(function () {
            //     $rootScope.radioPlayCond == true ? $rootScope.radioPlayCond = false : $rootScope.radioPlayCond =true;
            // })
            console.log("1");
            
        })
        $('#audio-player').on('playerStopLoading2', function() {
            // alert("stop");
            // $rootScope.$apply(function () {
            //     if ($rootScope.radioPlayCond != false)
                    // $rootScope.radioPlayCond = false;
            // })
            // $rootScope.$apply(function () {
            //     $rootScope.radioPlayCond == true ? $rootScope.radioPlayCond = false : $rootScope.radioPlayCond =true;
            // })
            console.log("2");
        })

        $rootScope.youtubeVideo = null; 
        $rootScope.title = "hubofculture";
        $rootScope.piano = "none";
        $rootScope.player = "none";
        $rootScope.tagsDisplay = "none";		       
        $rootScope.articles = "block";
        $rootScope.people = "block";
        $rootScope.rightMenuStatus=0; 
        $rootScope.cassetteControlPlayCondition = false;
        $rootScope.radioStopCondition = false;
        $rootScope.animationCond = false;
        $rootScope.radioOpen = true;
        $rootScope.radioOpenBig = true;        
        $rootScope.user= null;
        $rootScope.song = null;
        $rootScope.radioPlayCond = false;

        socket.on('notification', function(data) {
      
            var a = data.message.replace(/\s+/g, '');       
            $rootScope.$apply(function () {
             
                if ($rootScope.radioPlayCond == true) {
                   $rootScope.song = data.message; 
                }
                if (audioPlayer.songs.length == 0) {
                	$rootScope.song = data.message; 
                }
                $rootScope.radioSong = data.message;                                     
                if ($rootScope.user != null) {  
                    if ($rootScope.user.like_tracks) {
                        if( $rootScope.user.like_tracks[a]) {                                                  
                            $rootScope.like = "heart-red ion-ios-heart";
                        }
                        else {
                            $rootScope.like = "ion-ios-heart-outline heart-black";
                        }                            
                    } 
                    else {
                        $rootScope.like = "ion-ios-heart-outline heart-black";
                    }             
                }
            });   
        });
        httpService
            .getUser()
            .then(function(response){
                if (response.data.user != null)                    
                    $rootScope.user = response.data.user;             
            })

        $rootScope.songLike = function(song) {
            if (!$rootScope.user.like_tracks) {
                $rootScope.like = "heart-red ion-ios-heart"; 
                httpService
                    .likeSong(song.replace(/\s+/g, ''))
                    .then(function(response) {
                        $rootScope.user = response.data;
                    })
            }
            else {                
                if (!$rootScope.user.like_tracks[song.replace(/\s+/g, '')]) {                   
                    $rootScope.like = "heart-red ion-ios-heart"; 
                    httpService
                        .likeSong(song.replace(/\s+/g, ''))
                        .then(function(response) {
                            $rootScope.user = response.data;
                        })                   
                }
                else {                   
                    $rootScope.like = "ion-ios-heart-outline heart-black";                   
                       httpService
                        .unlikeSong(song.replace(/\s+/g, ''))
                        .then(function(response) {
                            $rootScope.user = response.data;
                        })
                } 
            }      
            
        };
        $rootScope.youtubeVideoStop = function() {
            $('#' + $rootScope.youtubeVideo)[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');    
        }; 

        $rootScope.$on("$stateChangeStart", function(evt, to, toP, from, fromP) {            
            if (from.name === "articles.article" && to.name === "articles") {  
              $rootScope.articles = "block";
              $rootScope.title = "hubofculture";                        
              $location.hash(fromP.name);
              $anchorScroll();
            }
            if (from.name === "people.peopleInfo" && to.name === "people") {                 
              $rootScope.people = "block";
              $rootScope.title = "hubofculture";            
              $location.hash(fromP.name);
              $anchorScroll();
            }
        });

       $rootScope.scrollTop = function() {
            $rootScope.tagsHeight = "55px"
            $timeout(function() {                 
                  $("#content").scrollTop(0);
            }, 100);          

        };

        $rootScope.procSmallMenu =function(casemenu){
			switch(casemenu)
			{
				case 0: $('#right-hook-menu').removeClass('hook-menu-min'); break;
				case 1: $('#right-hook-menu').addClass('hook-menu-min'); break;				
				
			}
			
		}
		
        $rootScope.showSmallMenu = function() {
		
        	 switch($rootScope.rightMenuStatus)
			{
				case 0:				
					$rootScope.procSmallMenu($rootScope.rightMenuStatus);
					$('#right-hook-menu').removeClass('hook-closed');
					$rootScope.rightMenuStatus=1;
					break;				
				case 1:				
					$('#right-hook-menu').addClass('hook-closed');
					//setTimeout(function(){$rootScope.procSmallMenu(1)},500);
					$rootScope.rightMenuStatus=0;
					break;
			}
        }

        $rootScope.showTags = function() {
            
            if ($rootScope.tagsDisplay == "none"){
                $rootScope.tagsDisplay = "block"
            }
            else
                $rootScope.tagsDisplay = "none";
        }

        $rootScope.showPiano = function() {
            if ($rootScope.piano == "none") {
                $rootScope.piano = "block";
                $rootScope.player = "none";
            }
            else 
                $rootScope.piano = "none";            
        };

        $rootScope.showPlayer= function() {
            if ($rootScope.player == "none") {
                $rootScope.player = "block";
                $rootScope.piano = "none";
            }
            else 
                $rootScope.player = "none";            
        };

        $rootScope.radioPlay = function() {
        
        	if ($rootScope.radioPlayCond == true) {
        		audioPlayer.radioPause(); 
        		$rootScope.animationCond = false;
        		$rootScope.radioPlayCond = false; 
        		
        	}
        	else {
        		audioPlayer.radioPlay();
        		$rootScope.animationCond = true; 
        		$rootScope.radioPlayCond = true; 
				$rootScope.song = $rootScope.radioSong; 
				
        	}     
            
        };   

        
        $rootScope.playerPrev = function() { 

            $rootScope.animationCond = false;
            $timeout(function() {               
                $rootScope.animationCond = true;               
            }, 140);

            
                       
        };
        $rootScope.playerNext = function() {   
            $rootScope.animationCond = false;     
            $rootScope.cassetteControlPlayCondition = false;
            $rootScope.radioNextCondition = true;

            $timeout(function() { 
                 $rootScope.radioNextCondition = false;
                 $rootScope.animationCond = true;
                 $rootScope.animationCond = true; 
                 $rootScope.cassetteControlPlayCondition = true;
            }, 140);

            if (audioPlayer.songs.length != 0) {
                audioPlayer.nextSong();
            };
                       
        };

        $rootScope.radioPlayPause = function() {           
            $rootScope.cassetteControlPlayCondition == true ?  $rootScope.cassetteControlPlayCondition = false:  $rootScope.cassetteControlPlayCondition = true;
            $rootScope.animationCond == true ? $rootScope.animationCond = false: $rootScope.animationCond = true;
            if ($rootScope.youtubeVideo != null) {
                $rootScope.youtubeVideoStop();
            }             
        };  

        $rootScope.dynamicPosts = [];                   
        $rootScope.col_big = 12;
        $rootScope.col_medium = 12;       
        $rootScope.esters_containter_col = "col-md-12";        
        $rootScope.dynamicPostsCounter = 0;

        $rootScope.closeRadio = function() {
            if($(window).width()<600) { 
                $rootScope.radioOpen = false;
                $('#radio').toggleClass('col-xs-alt-offset-12');
            }
        }
		$rootScope.closeMenu=function()
		{
			if($rootScope.rightMenuStatus==1)
			{
				$rootScope.showSmallMenu();
			}
		}

        $rootScope.showRadio = function() {   		
                if ($rootScope.radioOpen == true) {
                    $rootScope.radioOpen = false;
                     if($(window).width()>=600) {                     
                        $rootScope.radioOpenBig = false;
                        $('#journal,#radio-audio-player').toggleClass('col-md-9');
                        $('#journal,#radio-audio-player').toggleClass('col-sm-7');
                        $('#journal,#hook-menu,#radio-audio-player').toggleClass('col-md-offset-3');
                        $('#journal,#hook-menu,#radio-audio-player').toggleClass('col-sm-offset-5');
                        $('#journal,#hook-menu,#radio-audio-player').toggleClass('right');
                        $('#journal,#radio-audio-player').toggleClass('col-md-12');
                        $('#journal,#radio-audio-player').toggleClass('col-sm-12');   
                        $('#journal,#radio-audio-player').toggleClass('col-xs-12');                   
                            //  $('.sub-nav').toggleClass('right');
                            // $('.sub-nav').toggleClass('col-md-12');
                            // $('.sub-nav').toggleClass('col-sm-12'); 
                                
                    
                    }
                    else {
						 $rootScope.closeMenu();
                        $('#radio').toggleClass('col-xs-alt-offset-12');
                    }
                    
                    $rootScope.esters_containter_col = "col-md-6"
                   
                }
                else {
                    $rootScope.radioOpen = true;
                     if($(window).width()>=600) {                     
                        $rootScope.radioOpenBig = true;
                        $('#journal,#radio-audio-player').toggleClass('col-md-9');
                        $('#journal,#radio-audio-player').toggleClass('col-sm-7');
                        $('#journal,#hook-menu,#radio-audio-player').toggleClass('col-md-offset-3');
                        $('#journal,#hook-menu,#radio-audio-player').toggleClass('col-sm-offset-5');
                        $('#journal,#hook-menu,#radio-audio-player').toggleClass('right');
                        $('#journal,#radio-audio-player').toggleClass('col-md-12');
                        $('#journal,#radio-audio-player').toggleClass('col-sm-12');
                        $('#journal,#radio-audio-player').toggleClass('col-xs-12');                   
                    }
                    else {
                        $('#radio').toggleClass('col-xs-alt-offset-12');
                    }
                    $rootScope.esters_containter_col = "col-md-12"                
                    
                }         
        }
        
    /////////////////////// здесь все относиться к темплейтам подкастов ////////////////////////////////////
    $rootScope.templates  = {
        'main': 'dk-fm/templates/podcasts-folders.html',
        'timetable':'dk-fm/templates/timetable.html',
        'track_list':'dk-fm/templates/user-bookmarks.html',
        'podcasts':'dk-fm/templates/podcasts.html',        
    };

    $rootScope.podcast_template = $rootScope.templates['main'];

        $rootScope.goTimetable = function() {
            var date = new Date();
            var date_string = date.getDate().toString() + date.getMonth().toString() + date.getFullYear().toString();          

            httpService
                .getParamsTimeTable(date_string)
                .then(function(response) {                   
                  $rootScope.timetable_items = [];                  
                  if (response.data != '') {
                    $rootScope.podcast_template = $rootScope.templates['timetable'];
                    angular.forEach(response.data.events, function(event, key) {
                        var time = new Date(event.time);
                        response.data.events[key].time = (time.getHours()<10?'0':'') + time.getHours() +':'+ (time.getMinutes()<10?'0':'') + time.getMinutes()
                    })
                    $rootScope.timetable_items = response.data.events
                                                                               
                  }
                  else {
                     var item = {
                        'time':'',
                        'title': "Расписание отсутсвует"
                     }
                     $rootScope.timetable_items.push(item);
                    $rootScope.podcast_template = $rootScope.templates['timetable'];                    
                }    
                                   
                           
                                                    
                });
        }  
        $rootScope.goBookmarks = function() {            
            
            $rootScope.tracks = [];
            $rootScope.podcast_songs = [];
            if ($rootScope.user) {
                angular.forEach($rootScope.user.like_tracks, function(value, key) {
                    var list_item = {
                        name: value.artist +' - ' + value.title
                    };
                    var player_item = {
                        image: "images/sunhawk-small-2@2x.jpg",
                        name: value.artist +' - ' + value.title,
                        srcs: [
                            {
                                src: value.path,
                                type: "audio/mp3"
                            }
                        ]
                    };
                    $rootScope.podcast_songs.push(player_item);
                    $rootScope.tracks.push(list_item);
                });            
                audioPlayer.songs = $rootScope.podcast_songs;           
                $rootScope.podcast_template = $rootScope.templates['track_list'];
            }
            else {
                $rootScope.tracks[0] = {
                    name: "Пожалуйста авторизуйтесь"
                };
                $rootScope.podcast_template = $rootScope.templates['track_list'];
                
            }        
            
          
        };
     //    $rootScope.goPodcast = function(folder) {
     //        var folders = {
     //            'RockNRoll': "Rock'n'Roll",
     //            'Broadcast': 'Эфиры',
     //            'four_on_the_floor':"Прямая бочка",
     //            'polygonal': 'Ломаная бочка'
     //        };
     //        console.log(folder);
     //        $rootScope.wherePodcasts = folders[folder];
     //        console.log($rootScope.where)
     //        $rootScope.podcast_template = $rootScope.templates['podcasts'];
     //        httpService
     //            .getPodcast(folder)
     //            .then(function(response) {
     //                $rootScope.podcasts = response.data;
     //                //$rootScope.podcasts = [];
					// for(var item in $rootScope.podcasts)
					// {
					// 	var arrPodcast = $rootScope.podcasts[item].title.split("_");
						
					// 	$rootScope.podcasts[item].data={
						
					// 		name:arrPodcast[0] || "unknown",
					// 		author:arrPodcast[1] || "unknown",
					// 		date:arrPodcast[2] || "unknown"
							
					// 	}
					// }
					// 	console.log($rootScope.podcasts);
     //            })

     //    }
        $rootScope.goPodcastSongs = function(podcast) {
            
            
            $rootScope.tracks = [];
            $rootScope.podcast_songs = [];           
            
            httpService
                .getPodcastSongs(podcast)
                .then(function(response) {
                    angular.forEach(response.data, function(value, key) {
                        var list_item = {
                            name: value.artist +' - ' + value.title
                        };
                        var player_item = {
                            image: "images/sunhawk-small-2@2x.jpg",
                            name: value.artist +' - ' + value.title,
                            srcs: [
                              {
                                src: value.path,
                                type: "audio/mp3"
                              }
                            ]
                        };
                        $rootScope.podcast_songs.push(player_item );
                        $rootScope.tracks.push(list_item);
                });            
                audioPlayer.songs = $rootScope.podcast_songs;           
                $rootScope.podcast_template = $rootScope.templates['track_list'];   

            })
        } 
        $rootScope.goMain = function(){
            $rootScope.podcast_template = $rootScope.templates['main'];
        }
      
        $rootScope.playSong = function($index) {
            if ($rootScope.youtubeVideo != null) {
                $rootScope.youtubeVideoStop();
            } 
            if ($rootScope.radioPlayCond == true) {
                audioPlayer.songs = $rootScope.podcast_songs; 
            } 
            audioPlayer.playspecificSong($index);
            $rootScope.curSong = $index;
            $rootScope.cassetteControlPlayCondition = true;
            $rootScope.animationCond = true;
            $rootScope.radioPlayCond = false;
            $rootScope.player = 'block';
            $rootScope.song = audioPlayer.songs[$index].name;  

            if ($rootScope.user != null) {  
                    if ($rootScope.user.like_tracks) {
                        if( $rootScope.user.like_tracks[$rootScope.song.replace(/\s+/g, '')]) {                                                  
                            $rootScope.like = "heart-red ion-ios-heart";
                        }
                        else {
                            $rootScope.like = "ion-ios-heart-outline heart-black";
                        }                            
                    } 
                    else {
                        $rootScope.like = "ion-ios-heart-outline heart-black";
                    }             
                }
        }
        $rootScope.login = function() {
        	window.location.href = 'http://hubofculture.com/auth/vk';        	
        }
        $rootScope.logout = function() {
        	window.location.href = 'http://hubofculture.com/auth/signout';        	
        }
        
		/*if(!$rootScope.isMobile)
		{
			$('.my-scroll-bar').each(function(){
				$rootScope.setScrollbar(this);
			}
			);
		}*/
    })
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $compileProvider) {
    	 $compileProvider.debugInfoEnabled(false);
        $urlRouterProvider.otherwise('/feed/all');
        $stateProvider
           
            .state('articles', {
                url: '/feed/:tag',
                templateUrl: 'dk-fm/partials/articles.html',
                controller: 'articlesController'          
            })
            .state('articles.article', {
                url: '/article?name',
                templateUrl: 'dk-fm/partials/article.html',
                controller: 'articleController'
            })
            .state('people', {
                url: '/people',
                templateUrl: 'dk-fm/partials/people.html',
                controller: 'peopleController'              
            })
            .state('people.peopleInfo', {
                url: '/info?name',
                templateUrl: 'dk-fm/partials/people-info.html',
                controller: 'peopleInfoController'
            })
            .state('info', {
                url: '/info',
                templateUrl: 'dk-fm/partials/info.html',
                controller: 'infoController'
            })          
            
            $locationProvider.html5Mode(true).hashPrefix('!');
            
          
    })
.factory('socket', ['$rootScope', function($rootScope) {
  var socket = io.connect();

  return {
    on: function(eventName, callback){
      socket.on(eventName, callback);
    },
    emit: function(eventName, data) {
      socket.emit(eventName, data);
    }
  };
}])
.directive('myRepeatDirective', function() {
  return function(scope, element, attrs, $rootScope) {
    
    if (scope.$last){
	
			
				var options= {};
				var sel='.my-scroll-bar';
				var defaults={
						  theme:"rounded-dots",
						  scrollInertia:400,
						  autoExpandScrollbar: true
						}
				var opts = $.extend( {}, defaults, options);
				
					$(sel+':not([scrolled])').each(function(){
						$(this).attr('scrolled',true);
						$(this).mCustomScrollbar(opts);
					});
			
    }
  };
})

    

})();