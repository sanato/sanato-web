angular.module('Instanto')
.factory('Auth', function($rootScope, $http){
    return {
       
        isLoggedIn: function(user) {
            // check that is a JWT token as well
            if(localStorage.getItem("instanto_token")) {
                return true;
            } else {
                return false;
            }
        },

        logout: function() {
            localStorage.removeItem("instanto_token");
            location.reload();
        },

        hasPermission: function(permission) {
            if($rootScope.user.permissions.indexOf(permission) !== -1) {
                return true;
            } else {
                return false;
            }
        }
    };
});
