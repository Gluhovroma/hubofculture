
(function () {
    'use strict';
    angular.module('dkfm', [   
        'dkfm.controllers.home',
        'dkfm.controllers.posts',
        'dkfm.controllers.post-edit',
        'dkfm.controllers.post-delete', 
        'dkfm.controllers.people',
        'dkfm.controllers.people-edit',
        'dkfm.controllers.people-delete', 
        'dkfm.controllers.instagram',  
        'dkfm.controllers.instagram-edit',
        'dkfm.controllers.tags',
        'dkfm.controllers.timetable',    
        'dkfm.controllers.timetable-edit',   
        'dkfm.controllers.timetable-delete',  
        'dkfm.controllers.video', 
        'dkfm.controllers.soundcloud',      
        'dkfm.controllers.radio-admin',
        'dkfm.controllers.creator',
        'dkfm.controllers.author',
        'dkfm.controllers.moviemaker',
        'dkfm.controllers.dj',
        'dkfm.controllers.info',
        'dkfm.services.httpService',    
        'textAngular'       
    ])
    .run(function($rootScope) {
             
    })
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'partials/home.html',
                controller: 'homeController'
            })
            .state('posts', {
                url: '/posts',
                templateUrl: 'partials/posts.html',
                controller: 'postsController'
            })
            .state('post-edit', {                
                url: '/post-edit/:post',                  
                templateUrl: 'partials/post-edit.html',
                controller: 'postEditController'
            })
            .state('post-delete', {                
                url: '/post-delete/:post',                  
                templateUrl: 'partials/post-delete.html',
                controller: 'postDeleteController'
            })
            .state('people', {
                url: '/people',
                templateUrl: 'partials/people.html',
                controller: 'peopleController'
            })
            .state('people-edit', {                
                url: '/people-edit/:people',                  
                templateUrl: 'partials/people-edit.html',
                controller: 'peopleEditController'
            })
            .state('people-delete', {                
                url: '/people-delete/:people',                  
                templateUrl: 'partials/people-delete.html',
                controller: 'peopleDeleteController'
            })
            .state('instagram', {   
                url: '/instagram',                
                templateUrl: 'partials/instagram.html',
                controller: 'instagramController'
            })
            .state('instagram-edit', {     
                url: '/instagram-edit',              
                templateUrl: 'partials/instagram-edit.html',
                controller: 'instagramEditController'
            })                       
            .state('timetable', {  
                url: '/timetable',           
                templateUrl: 'partials/timetable.html',
                controller: 'timetableController'
            })
            .state('timetable-edit', {  
                url: '/timetable-edit/:timetable',              
                templateUrl: 'partials/timetable-edit.html',
                controller: 'timetableEditController'
            }) 
            .state('timetable-delete', {  
                url: '/timetable-delete/:timetable',              
                templateUrl: 'partials/timetable-delete.html',
                controller: 'timetableDeleteController'
            })                        
            .state('video', {        
                url: '/video',               
                templateUrl: 'partials/video.html',
                controller: 'videoController'
            })
            .state('soundcloud', {  
                url: '/soundcloud',                             
                templateUrl: 'partials/soundcloud.html',
                controller: 'soundCloudController'
            })            
            .state('tags', { 
                url: '/tags',                
                templateUrl: 'partials/tags.html',
                controller: 'tagsController'
            })            
            .state('radio-admin', { 
                url: '/radio-admin',                
                templateUrl: 'partials/radio-admin.html',
                controller: 'radioAdminController'
            })
            .state('info', { 
                url: '/info',                
                templateUrl: 'partials/info.html',
                controller: 'infoController'
            })
            .state('author', { 
                url: '/author',                
                templateUrl: 'partials/author.html',
                controller: 'authorController'
            })
             .state('moviemaker', { 
                url: '/moviemaker',                
                templateUrl: 'partials/moviemaker.html',
                controller: 'moviemakerController'
            })
              .state('creator', { 
                url: '/creator',                
                templateUrl: 'partials/creator.html',
                controller: 'creatorController'
            })
               .state('dj', { 
                url: '/dj',                
                templateUrl: 'partials/dj.html',
                controller: 'djController'
            })
            
    });   

})();
