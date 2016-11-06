(function () {
    'use strict';

    angular.module("dkfm.controllers.post-edit", [
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
    .controller('postEditController', function ($scope, $state, $stateParams, $http, $timeout, Upload, httpService) {      
     
        $scope.loading = false;
        $scope.types = [{name:'Одноуровневый',post_type:'simple'},{name: "Двухуровневый",post_type: "multiple"}];
        $scope.statuses = [{name:'Черновик', status:'draft'},{name: "В публикации", status: "publication"}];
        
        $scope.photo_error = false;
        $scope.song_error = false;
        $scope.content_error = false;
        $scope.title_error = false;             
        $scope.showPhoto = false;
        $scope.showSong = false;
        $scope.showAnnotation = false;
        $scope.post = {};
        $scope.post['type'] =  $scope.types[0]
        $scope.post['status'] =  $scope.statuses[0]

        httpService
            .getTags()
            .then(function(response){
                $scope.tags = response.data; 
            });
        
        
        
        if ($stateParams.post) {
            $http.get('/adminapi/posts/' + $stateParams.post)
                .then(function (response) {                    
                    $scope.post = response.data;
                    console.log($scope.post);
                    if ($scope.post.photo != null) $scope.showPhoto = true;                    
                    if ($scope.post.songs != null) $scope.showSong = true;                    
                    if ($scope.post.type == "simple") $scope.post['type'] =  $scope.types[0];                    
                    if ($scope.post.type == "multiple") {
                        $scope.showAnnotation = true;
                        $scope.post['type'] =  $scope.types[1]
                    }
                    $scope.post.status == "draft" ? $scope.post['status'] = $scope.statuses[0] : $scope.post['status'] = $scope.statuses[1];                   

                });
        };
        
        $scope.deletePhoto = function() {        
            $scope.post.photo = null;            
            $scope.showPhoto = false;
            console.log($scope.post);
        };
        $scope.deleteSong = function() {
            $scope.post.songs = null;            
            $scope.showSong = false;
            console.log($scope.post);
        };

        $scope.disableAnnotation = function(type) {
            type.post_type == "simple" ? $scope.showAnnotation = false : $scope.showAnnotation = true;
        }
        $scope.save = function(photo, songs, post) {    
        console.log(post);      
            if (photo) {
              photo.type == "image/png" || photo.type == "image/jpeg" || photo.type == "image/gif" ? $scope.photo_error = false : $scope.photo_error = true;                      
            }
            angular.forEach(songs, function(song){
                song.type == "audio/mp3" ? $scope.song_error = false : $scope.song_error = true;
            });            
            post.content == undefined || post.content == "" ?  $scope.content_error = true : $scope.content_error = false;
            post.title == undefined || post.title =="" ? $scope.title_error = true : $scope.title_error = false;

            if ($scope.photo_error == false && $scope.song_error == false && $scope.content_error == false && $scope.title_error == false) {
           
           
            var transl=new Array();
            transl['А']='a';transl['а']='a';transl['Б']='b';transl['б']='b';transl['В']='v';transl['в']='v';transl['Г']='g';transl['г']='g';
            transl['Д']='d';transl['д']='d';transl['Е']='e';transl['е']='e';transl['Ё']='yo';transl['ё']='yo';transl['Ж']='zh';transl['ж']='zh';
            transl['З']='z';     transl['з']='z';
            transl['И']='i';     transl['и']='i';
            transl['Й']='j';     transl['й']='j';
            transl['К']='k';     transl['к']='k';
            transl['Л']='l';     transl['л']='l';
            transl['М']='m';     transl['м']='m';
            transl['Н']='n';     transl['н']='n';
            transl['О']='O';     transl['о']='o';
            transl['П']='p';     transl['п']='p';
            transl['Р']='r';     transl['р']='r';
            transl['С']='s';     transl['с']='s';
            transl['Т']='t';     transl['т']='t';
            transl['У']='u';     transl['у']='u';
            transl['Ф']='f';     transl['ф']='f';
            transl['Х']='x';     transl['х']='x';
            transl['Ц']='c';     transl['ц']='c';
            transl['Ч']='ch';    transl['ч']='ch';
            transl['Ш']='sh';    transl['ш']='sh';
            transl['Щ']='shh';    transl['щ']='shh';
            transl['Ъ']='"';     transl['ъ']='"';
            transl['Ы']='y\'';    transl['ы']='y\'';
            transl['Ь']='\'';    transl['ь']='\'';
            transl['Э']='e\'';    transl['э']='e\'';
            transl['Ю']='yu';    transl['ю']='yu';
            transl['Я']='ya';    transl['я']='ya';
            transl[' ']='-';

            var urlname = '';
            var newurlname = post.title.replace(/(^\s+|\s+$)/g,'').replace(/ {1,}/g," ");

            for(var i=0;i<newurlname.length;i++) {
                if(transl[newurlname[i]]!=undefined) { 
                    urlname+=transl[newurlname[i]]; 
                }
                else { 
                    urlname+=newurlname[i]; 
                }
            }

            post['urlname'] = urlname;

            var tags = [];
            var url = "";

            angular.forEach(post.tags, function (item) {
                tags.push(item._id)
            });
            $scope.post['tags'] = tags;


            var formData = new FormData();
            if (songs) {
               for(var song in songs) {        
                    formData.append("songs_files", songs[song]);
                }; 
            }
            
            if (photo) {
              formData.append("photo_file", photo);  
            }
           
            formData.append("title", post.title);
            formData.append("author", post.author);
            formData.append("type", post.type.post_type);
            formData.append("status", post.status.status);
            formData.append("annotation", post.annotation);
            formData.append("content", post.content);
            formData.append("photo", post.photo);
            formData.append("songs", post.songs);
            formData.append("tags", JSON.stringify(post.tags));
            formData.append("urlname", post.urlname);



            if ($stateParams.post) 
                 url = '/adminapi/posts/' + $stateParams.post;

            else url = '/adminapi/posts/';            
            

            $scope.loading = true;
            $http.post(url, formData, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
            .then(function(response){
                $scope.loading = false;
                $state.go("posts");
            })
            
           }        
        };

       
        
       

    })
    
    



})();