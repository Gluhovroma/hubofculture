(function () {
    'use strict';
    angular.module('dk-fm.controllers.directives.ester-view', [])
       
        .directive('esterView', function ($compile, $rootScope) {         
            
            return {
                restrict: "E",
                scope: {
                    ester: "=",
                    html: "=",
                    estercol: "="
                },
                link: function (scope, elt) {    
                        scope.play = function(simple) {

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
                if (scope.estercol.length == 2) {
                    scope.class = "col-md-6 col-xs-12";
                    scope.colmd6 = false;
                }
                else {
                    scope.class= "col-md-12 col-xs-12";
                    scope.colmd6 = true;
                }                 
                    if (scope.ester.type == "video") {                        
                        scope.template = 'dk-fm/templates/video.html';                       

                        if (scope.ester.video.url.indexOf("youtube.com") >= 0) {
                        
                            scope.video = {
                                type:'youtube',
                                photo:'//i.ytimg.com/vi/' + scope.ester.video.url.replace('https://www.youtube.com/watch?v=','') + '/sddefault.jpg ',
                                id: scope.ester.video.url.replace('https://www.youtube.com/watch?v=','')
                            }
                        } else if (newVal.indexOf("youtu.be") >= 0) {
                            scope.video = {
                                type:'youtube',
                                photo:'//i.ytimg.com/vi/' + scope.ester.video.url.replace('https://youtu.be/','') + '/sddefault.jpg ',
                                id: scope.ester.video.url.replace('https://youtu.be/','')
                            }
                        }
            scope.playVideo = function(video) {
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
            

            
        }
                        var strVar="";
                        strVar += "<div class=\"col-md-12\" class=\"post-container\">    ";
                        strVar += "    <div id=\"{{video.id}}\" style=\"padding: 0px 0px 0px 0px;";
                        strVar += "    border: none;";
                        strVar += "    margin-bottom: 20px;";
                        strVar += "    overflow: hidden;";
                        strVar += "    height: 100%;";
                        strVar += "    width: 100%;cursor:pointer\" ng-click=\"playVideo(video)\">";
                        strVar += "     <img class=\"youtube-thumb\" ng-src=\"{{::video.photo}}\" style=\"margin-top: -15%;";
                        strVar += "    margin-bottom: -15%;";
                        strVar += "    width: 100%;\">";
                        strVar += "     <div class=\"play-button\"  style=\"height: 72px;";
                        strVar += "width: 72px;";
                        strVar += "left: 50%;";
                        strVar += "top: 50%;";
                        strVar += "margin-left: -36px;";
                        strVar += "margin-top: -36px;";
                        strVar += "position: absolute;";
                        strVar += "";
                        strVar += "background: url('http:\/\/i.imgur.com\/TxzC70f.png') no-repeat;\">";
                        strVar += "";
                        strVar += "     <\/div>";
                        strVar += "    <\/div>          ";
                        strVar += "<\/div> ";
                        var element = angular.element(strVar);
                        var test = $compile(element)(scope);
                        elt.append(test);
 

                    }                   
                    else if (scope.ester.type == "simple") {                        
                        
                        var date = new Date(scope.ester.post.created_at);                        
                        var month = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
                        var date_string = month[date.getMonth()] + ' ' + date.getDate() +', ' + date.getFullYear();

                        if (scope.ester.post.songs != null) {                           
                            var song_cond = true 
                        }
                        else {                             
                            var song_cond = false 
                        }
                        var photo ='';
                        if (scope.ester.post.photo == null) {
                            photo = '/img/post.jpg';
                        }
                        else {
                            photo = scope.ester.post.photo.url;
                        }
                        scope.simple = {
                            'title': scope.ester.post.title,
                            'author': scope.ester.post.author,
                            'content': scope.ester.post.content,
                            'photo': photo,
                            'songs': scope.ester.post.songs,
                            'tags': scope.ester.tags,
                            'date': date_string,
                            'song_cond': song_cond
                        }
                        var strVar="";
                        strVar += "<div class=\"col-md-12\" class=\"post-container animated fadeIn\">";
                        strVar += "  <div class=\" row card half_card mix_card mix waypoint start\" style=\"margin-left:0; margin-right:0\">    ";
                        strVar += "    <div class=\"reason\">      ";
                        strVar += "      <p class=\"byline\">     ";
                        strVar += "        <span class=\"date\">";
                        strVar += "          <abbr title=\"{{::simple.date}}\" ng-bind=\"::simple.date\"><\/abbr>";
                        strVar += "        <\/span>";
                        strVar += "        <i class=\"glyphicon glyphicon-pencil\" class=\"avatar\" style=\"font-size: 15px; opacity: 0.8; margin:0px 3px 0px 3px\">       ";
                        strVar += "        <\/i>";
                        strVar += "        <strong style=\"color:black; opacity:0.6\" ng-bind=\"::simple.author\"><\/strong>";
                        strVar += "      <\/p>";
                        strVar += "    <\/div>      ";
                        strVar += "    <div style=\"padding: 0;\" ng-class=\"{'col-md-6': $root.col_medium == 12}\">";
                        strVar += "        <div class=\"cover\">            ";
                        strVar += "             <div afkl-lazy-image=\"{{::simple.photo}}\" ";
                        strVar += "    class=\"afkl-lazy-wrapper afkl-img-ratio-1-1 own-classname\" afkl-lazy-image-options=\"{{nolazy}}\"><\/div>";
                        strVar += "         <!--  <img ng-src=\"{{::simple.photo}}\" class=\"cover\" alt=\"{{::simple.title}}\">  -->        ";
                        strVar += "            <div class=\"quick_actions\" ng-show=\"simple.song_cond\">";
                        strVar += "                <a class=\"quick_play\" href=\"\" title=\"play\" style=\"border: none;color: #fff;\"  ng-click=\"play(simple)\">";
                        strVar += "                  <span class=\"ion-android-arrow-dropright-circle\" style\"color: #fff;\"><\/span>                ";
                        strVar += "                <\/a>              ";
                        strVar += "                <span class=\"pipe\"><\/span>";
                        strVar += "            <\/div>        ";
                        strVar += "         <\/div>";
                        strVar += "    <\/div>";
                        strVar += "    <div ng-class=\"{'col-md-6': $root.col_medium == 12}\" style=\"padding:0px 15px 0px 15px\">";
                        strVar += "      <h3 class=\"title black\" ng-bind=\"::simple.title\" style=\"color: #333;font-size: 20px;\"><\/h3>  ";
                        strVar += "      <div class=\"frontside\">";
                        strVar += "        <div class=\"grid_tags tags\">";
                        strVar += "          <a ui-sref=\"articles({'tag': tag.urlname})\" class=\"tag\" title=\"Yeah Yeah Yeahs  \" ng-repeat=\"tag in ::simple.tags  | limitTo:7\">";
                        strVar += "      ";
                        strVar += "                    <span  ng-bind=\"::'#'+tag.name\"><\/span>";
                        strVar += "          <\/a>";
                        strVar += "        <\/div>";
                        strVar += "      <\/div>";
                        strVar += "      <div class=\"annotation my-scroll-bar\" scrollbar-theme=\"rounded-dots-dark\" post-render style=\"max-height: 165px;overflow: auto;\" ng-bind-html=\"::simple.content\"><\/div> ";
                        strVar += "    <\/div> ";
                        strVar += "     ";
                        strVar += "  <\/div>";
                        strVar += "<\/div>";
                        var element = angular.element(strVar);
                        var test = $compile(element)(scope);
                        elt.append(test);                       
                        
                    }
                    else if (scope.ester.type == "multiple") {

                        
                        
                        var date = new Date(scope.ester.post.created_at);                        
                        var month = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
                        var date_string = month[date.getMonth()] + ' ' + date.getDate() +', ' + date.getFullYear();
                        if (scope.ester.post.songs != null) {                           
                            var song_cond = true 
                        }
                        else {                             
                            var song_cond = false 
                        }
                        var photo ='';
                        if (scope.ester.post.photo == null) {
                            photo = '/img/post.jpg';
                        }
                        else {
                            photo = scope.ester.post.photo.url;
                        }
                        scope.multiplepost = {
                            'title': scope.ester.post.title,
                            'author': scope.ester.post.author,
                            'content': scope.ester.post.annotation,
                            'photo': photo,
                            'songs': scope.ester.post.songs,
                            'tags': scope.ester.tags,
                            'date': date_string,
                            'song_cond': song_cond,
                            'urlname': scope.ester.post.urlname
                        }
                        var strVar="";
                        strVar += "<div  id=\"{{::multiplepost.urlname}}\" class=\"post-container animated fadeIn\" ng-class=\"::class \" >";
                        strVar += "  <div class=\"card half_card mix_card mix waypoint start \">";
                        strVar += "    <div class=\"reason\">      ";
                        strVar += "      <p class=\"byline\">     ";
                        strVar += "        <span class=\"date\">";
                        strVar += "          <abbr title=\"{{::multiplepost.date}}\" ng-bind=\"::multiplepost.date\"><\/abbr>";
                        strVar += "        <\/span>";
                        strVar += "        <i class=\"glyphicon glyphicon-pencil\" class=\"avatar\" style=\"font-size: 15px; opacity: 0.8; margin:0px 3px 0px 3px\">       ";
                        strVar += "        <\/i>";
                        strVar += "        <strong style=\"color:black; opacity:0.6\" ng-bind=\"::multiplepost.author\"><\/strong>";
                        strVar += "      <\/p>";
                        strVar += "    <\/div>";
                        strVar += "    <div ng-class=\"::{'col-md-6': colmd6}\" style=\"padding:0;\">";
                        strVar += "        <div class=\"cover\">";
                        strVar += "        <a ui-sref=\"articles.article({'name': multiplepost.urlname})\">";
                        strVar += "        <div afkl-lazy-image=\"{{multiplepost.photo}}\" ";
                        strVar += "    class=\"afkl-lazy-wrapper afkl-img-ratio-1-1 own-classname\" afkl-lazy-image-options=\"{{::nolazy}}\"><\/div>         ";
                        strVar += "        <\/a>            ";
                        strVar += "                     ";
                        strVar += "            <div class=\"quick_actions\" ng-show=\"::multiplepost.song_cond\">";
                        strVar += "                <a class=\"quick_play\" href=\"\" title=\"play\" style=\"border: none;color: #999;\"  ng-click=\"play(multiplepost)\">";
                        strVar += "                  <span class=\"ion-android-arrow-dropright-circle\" style\"color: #999;\"><\/span>                ";
                        strVar += "                <\/a>              ";
                        strVar += "                <span class=\"pipe\"><\/span>";
                        strVar += "            <\/div>        ";
                        strVar += "         <\/div>";
                        strVar += "    <\/div>    ";
                        strVar += "    <div ng-class=\"{'col-md-6': colmd6}\" style=\"padding:0px 15px 0px 15px\">";
                        strVar += "      <h3 class=\"title black\" style=\"color: #333;font-size: 20px;\">";
                        strVar += "      <a ui-sref=\"articles.article({'name': multiplepost.urlname})\" class=\"title black\" ng-bind=\"::multiplepost.title\" style=\"color: #333;font-size: 20px;\"><\/a>";
                        strVar += "    <\/h3>  ";
                        strVar += "    <div class=\"frontside\">";
                        strVar += "      <div class=\"grid_tags tags\">";
                        strVar += "        <a ui-sref=\"articles({'tag': tag.urlname})\" class=\"tag\" title=\"Yeah Yeah Yeahs  \" ng-repeat=\"tag in ::multiplepost.tags  | limitTo:7\">       ";
                        strVar += "            <span  ng-bind=\"::'#'+tag.name\"><\/span>";
                        strVar += "          <\/a>";
                        strVar += "      <\/div>";
                        strVar += "    <\/div>";
                        strVar += "    <div class=\"annotation\" style=\"\" ng-bind-html=\"::multiplepost.content  | truncate:150\"><\/div> ";
                        strVar += "    <div style=\"margin-top:10px\">";
                        strVar += "        <a ui-sref=\"articles.article({'name': multiplepost.urlname})\" style=\"font-size: 12px;\">Читать далее...<\/a>";
                        strVar += "    <\/div>";
                        strVar += "    <\/div>";
                        strVar += "        ";
                        strVar += "  <\/div>";
                        strVar += "<\/div>";
                        
                        var element = angular.element(strVar);
                        var test = $compile(element)(scope);

                        elt.append(test);
                    }
 
                }
               
                
            };
        })

})();
