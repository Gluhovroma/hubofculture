(function () {
    'use strict';

    angular.module("dkfm.controllers.people-edit", [
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
    .controller('peopleEditController', function ($scope, $state, $stateParams, $http, $timeout, Upload, httpService) {      
     
      
        
        $scope.statuses = [{name:'Черновик', status:'draft'},{name: "В публикации", status: "publication"}];
        
        $scope.photo_error = false;
        
        $scope.content_error = false;
        $scope.title_error = false;             
        $scope.showPhoto = false;
       
       
        $scope.people = {};
       
        $scope.people['status'] =  $scope.statuses[0]

        if ($stateParams.people) {
            $http.get('/adminapi/people/' + $stateParams.people)
                .then(function (response) {                    
                    $scope.people = response.data;
                    
                    if ($scope.people.photo != null) $scope.showPhoto = true;                    
                                     
                    $scope.people.status == "draft" ? $scope.people['status'] = $scope.statuses[0] : $scope.people['status'] = $scope.statuses[1];                   

                });
        };
        
        $scope.deletePhoto = function() {        
            $scope.people.photo = null;            
            $scope.showPhoto = false;
        
        };
       
        $scope.save = function(photo, people) {    
 
            if (photo) {
              photo.type == "image/png" || photo.type == "image/jpeg" || photo.type == "image/gif" ? $scope.photo_error = false : $scope.photo_error = true;                      
            }
                      
            people.content == undefined || people.content == "" ?  $scope.content_error = true : $scope.content_error = false;
            people.title == undefined || people.title =="" ? $scope.title_error = true : $scope.title_error = false;

            if ($scope.photo_error == false && $scope.content_error == false && $scope.title_error == false) {
           
           
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
            var newurlname = people.title.replace(/(^\s+|\s+$)/g,'').replace(/ {1,}/g," ");

            for(var i=0;i<newurlname.length;i++) {
                if(transl[newurlname[i]]!=undefined) { 
                    urlname+=transl[newurlname[i]]; 
                }
                else { 
                    urlname+=newurlname[i]; 
                }
            }

            people['urlname'] = urlname;        
            var url = "";

            var formData = new FormData();
                       
            if (photo) {
              formData.append("photo_file", photo);  
            }           
            formData.append("title", people.title);            
            formData.append("status", people.status.status);           
            formData.append("content", people.content);
            formData.append("photo", people.photo);          
            formData.append("urlname", people.urlname);
            if ($stateParams.people) 
                 url = '/adminapi/people/' + $stateParams.people;
            else url = '/adminapi/people/';            
            

            
            $http.post(url, formData, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
            .then(function(response){
                $state.go("people");
            })
            
           }        
        };

       
        
       

    })
    
    



})();