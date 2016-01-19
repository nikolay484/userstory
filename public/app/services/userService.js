  var baseurl = '/dev/userStory';
angular.module('userService', [])

.factory('User', function($http) {
   
    var userFactory = {};
    
    userFactory.create = function(userData) {
        return $http.post(baseurl+'/api/signup', userData);
    }
    
    userFactory.all = function() {
        return $http.get(baseurl+'/api/users');   
    }
    
    return userFactory;
});