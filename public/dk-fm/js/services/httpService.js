(function () {
    'use strict';
    angular.module('dk-fm.services.httpService', [])
        .factory('httpService', [
        '$http',
      
        function ($http) {

            return {
                getTags: function () {
                    return $http({
                        method: 'GET',
                        url: '/api/tags'
                    });
                },
                getTodayTimetable: function () {
                    return $http({
                        method: 'GET',
                        url: '/api/timetable'
                    });
                },
                getOneInstagram: function () {
                    return $http({
                        method: 'GET',
                        url: '/api/last-instagram'
                    });
                },
                getInstagram: function () {
                    return $http({
                        method: 'GET',
                        url: '/api/instagram'
                    });
                },
                getInstagramOffset: function (offset) {
                    return $http({
                        method: 'GET',
                        url: '/api/instagram/' + offset
                    });
                },
                getHomePost: function () {
                    return $http({
                        method: 'GET',
                        url: '/api/homeposts'
                    });
                },
                getHomePostOffset: function (offset) {
                    return $http({
                        method: 'GET',
                        url: '/api/homeposts/offset/'+ offset
                    });
                },
                getUser: function () {
                    return $http({
                        method: 'GET',
                        url: '/auth/user'
                    });
                },
                getEsters: function (tag, offset) {
                    return $http({
                        method: 'GET',
                        url: '/api/esters/?offset='+ offset + '&tag=' + tag
                    });
                },
                getCountEsters: function (tag, offset) {
                    return $http({
                        method: 'GET',
                        url: '/api/countEsters/?tag=' + tag
                    });
                },
                getPostInfo: function (post) {
                    return $http({
                        method: 'GET',
                        url: '/api/postinfo/?post=' + post
                    });
                },
                getPeople: function (offset) {
                    return $http({
                        method: 'GET',
                        url: '/api/peoples?offset=' + offset
                    });
                },
                getPeopleInfo: function (people) {
                    return $http({
                        method: 'GET',
                        url: '/api/peopleinfo?people=' + people
                    });
                },
                getInfo: function () {
                    return $http({
                        method: 'GET',
                        url: '/api/info'
                    });
                },
                getAuthor: function () {
                    return $http({
                        method: 'GET',
                        url: '/api/author'
                    });
                },
                getCreator: function () {
                    return $http({
                        method: 'GET',
                        url: '/api/creator'
                    });
                },
                getMoviemaker: function () {
                    return $http({
                        method: 'GET',
                        url: '/api/moviemaker'
                    });
                },
                getDJ: function () {
                    return $http({
                        method: 'GET',
                        url: '/api/dj'
                    });
                },
                getTimeTables: function () {
                    return $http({
                        method: 'GET',
                        url: '/api/alltimetable'
                    });
                },
                getParamsTimeTable: function (date_string) {
                    return $http({
                        method: 'GET',
                        url: '/api/timetable/' + date_string
                    });
                },
                likeSong: function (song) {
                    return $http({
                        method: 'GET',
                        url: '/api/songlike?song=' + song
                    });
                },
                unlikeSong: function (song) {
                    return $http({
                        method: 'GET',
                        url: '/api/songunlike?song=' + song
                    });
                },
                getPodcast: function (folder) {
                    return $http({
                        method: 'GET',
                        url: '/api/getPodcast?folder=' + folder
                    });
                },
                getPodcastSongs: function (podcast) {
                    return $http({
                        method: 'GET',
                        url: '/api/getSongs?podcast=' + podcast
                    });
                },

            };
        }])

})();

