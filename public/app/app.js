angular.module('MyApp', [
    'mainCtrl',
    'userCtrl',
    'storyCtrl',
    'authService',
    'userService',
    'storyService',
    'appRoutes',
    'reverseDirective'
])

.config(function($httpProvider) {
   $httpProvider.interceptors.push('AuthInterceptor');    
});