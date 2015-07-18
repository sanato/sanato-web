/**
 * Master Controller
 */

angular.module('Instanto')
    .controller('MasterCtrl', ['$scope', '$http', MasterCtrl]);

function MasterCtrl($scope, $http) {
    /**
     * Sidebar Toggle & Cookie Control
     */
    var mobileView = 992;

    $scope.getWidth = function() {
        return window.innerWidth;
    };

    $scope.$watch($scope.getWidth, function(newValue, oldValue) {
        if (newValue >= mobileView) {
            if (localStorage.getItem('toggle')) {
                $scope.toggle = !localStorage.getItem('toggle') ? false : true;
            } else {
                $scope.toggle = true;
            }
        } else {
            $scope.toggle = false;
        }

    });

    $scope.toggleSidebar = function() {
        $scope.toggle = !$scope.toggle;
        localStorage.setItem('toggle', $scope.toggle);
    };

    window.onresize = function() {
        $scope.$apply();
    };

    $scope.$on('breadcrumbs_create', function(event, args) {
        $scope.pageTitle = args.pageTitle;
        $scope.breadcrumbs = args.breadcrumbs;
    });

    $scope.logout = function() {
        localStorage.removeItem("instanto_token");
        location.reload();
    };

}
