(function () {
    'use strict';
    angular.module('dkfm.services.httpService', [])
        .factory('httpService', [
        '$http',        
        function ($http) {

            return {
                getPosts: function (title, offset) {
                    return $http({
                        method: 'GET',
                        url: '/adminapi/posts?title=' + title + '&offset=' + offset 
                    });
                },
                getTags: function () {
                    return $http({
                        method: 'GET',
                        url: '/adminapi/tag'
                    });
                },
                getPostInfo: function (id) {
                    return $http({
                        method: 'GET',
                        url: '/adminapi/posts/' + id
                    });
                },
                editPostInfo: function (url, data) {
                    return $http({
                        method: 'GET',
                        transformRequest: angular.identity,
                        headers: {
                            'Content-Type': undefined
                        },
                        url: url,
                        data : data
                    });
                },
                deletePost: function (id) {
                    return $http({
                        method: 'DELETE',
                        url: '/adminapi/posts/' + id
                    });
                },
                getPeople: function (title, offset) {
                    return $http({
                        method: 'GET',
                        url: '/adminapi/people?title=' + title + '&offset=' + offset 
                    });
                },
                getPeopleInfo: function (id) {
                    return $http({
                        method: 'GET',
                        url: '/adminapi/people/' + id
                    });
                },
                editPeopleInfo: function (url, data) {
                    return $http({
                        method: 'GET',
                        transformRequest: angular.identity,
                        headers: {
                            'Content-Type': undefined
                        },
                        url: url,
                        data : data
                    });
                },
                deletePeople: function (id) {
                    return $http({
                        method: 'DELETE',
                        url: '/adminapi/people/' + id
                    });
                },
                getInstagram: function (offset) {
                    return $http({
                        method: 'GET',
                        url: '/adminapi/instagram?offset=' + offset
                    });
                },
                addInstagram: function (instagram) {
                    return $http({
                        method: 'POST',
                        url: '/adminapi/instagram/',
                        data: instagram
                    });
                },
                deleteInstagram: function (instagram) {
                    return $http({
                        method: 'DELETE',
                        url: '/adminapi/instagram/' + instagram                        
                    });
                }
                
            };
        }])
   
})();

