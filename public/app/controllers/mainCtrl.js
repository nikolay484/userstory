angular.module('mainCtrl', []) 
.controller('MainController', MainController);

function MainController($rootScope, $location, Auth) {
    var vm = this;
    
    vm.loggedIn = Auth.isLoggedIn();
    
    $rootScope.$on('$routeChangeStart', function() {
        vm.loggedIn = Auth.isLoggedIn();
        
        Auth.getUser()
        .then(function(data) {
            vm.user = data.data;   
        });
    });
    
    vm.doLogin = function() {
        vm.proccesing = true;
        
        vm.error = '';
        
        Auth.login(vm.loginData.username, vm.loginData.password)
        .success(function(data) {
            vm.proccesing = false;
            
            Auth.getUser()
            .then(function(data) {
                vm.user = data.data;   
            });
            
            if(data.success)
                $location.path('/');
            else
                vm.error = data.message;
        });
    }
    
    vm.doLogout = function() {
        Auth.logout();
        $location.path('/logout');
    }
}

