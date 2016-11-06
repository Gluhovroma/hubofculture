(function () {
    'use strict';

    angular.module("dkfm.controllers.tags", [
        'ui.router',
         
    ])
    .controller('tagsController', function ($scope, $state, $stateParams, $http, $rootScope, $timeout) {
        var offset = 0;

        $scope.weights = [{'value':1},{'value':2},{'value':3},{'value':4},{'value':5},{'value':6},{'value':7},{'value':8},{'value':9},{'value':10},{'value':11},{'value':12},{'value':13},{'value':14}];
        var transl=new Array();
        transl['А']='a';     transl['а']='a';
        transl['Б']='b';     transl['б']='b';
        transl['В']='v';     transl['в']='v';
        transl['Г']='g';     transl['г']='g';
        transl['Д']='d';     transl['д']='d';
        transl['Е']='e';     transl['е']='e';
        transl['Ё']='yo';    transl['ё']='yo';
        transl['Ж']='zh';    transl['ж']='zh';
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
     
        $http.get('/adminapi/tag?offset=' + offset)
                .success(function (data) {
                    $scope.tags = data;                       
                });

        $scope.addTag = function (tag) { 
            offset = 0;
            var urlname = '';
            var newurlname = tag.name.replace(/(^\s+|\s+$)/g,'').replace(/ {1,}/g," ");
            for(var i=0;i<newurlname.length;i++) {
                if(transl[newurlname[i]]!=undefined) { 
                    urlname+=transl[newurlname[i]]; 
                }
                else { 
                    urlname+=newurlname[i]; 
                }
            }
            tag['urlname'] = urlname;

            $http.post('/adminapi/tag/', tag)
            .success(function (data) {
                $http.get('/adminapi/tag?offset=' + offset)
                .success(function (data) {
                    $scope.tags = data; 
                    $scope.newtag = null;                    
                });
                             
            });

        }
        $scope.deleteTag = function(tag) {
            offset = 0;
            $http.delete('/adminapi/tag/' + tag._id)
            .success(function (data) {
                $http.get('/adminapi/tag?offset=' + offset)
                .success(function (data) {
                    $scope.tags = data;                       
                });                        
            });
        }


        $scope.loadTags= function() {
            offset++;
             $http.get('/adminapi/tag?offset=' + offset)
                .success(function (data) {
                    angular.forEach(data, function (item) { 
                        $scope.tags.push(item);
                   

                    });                       
                });
       }
       
    });

    
})();