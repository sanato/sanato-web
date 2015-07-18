/**
 * StatusControllerList Controller
 */

angular
    .module('Instanto')
    .controller('StatusControllerList', ['$rootScope', '$scope', '$state', '$modal', 'statusFactory', StatusControllerList]);

function StatusControllerList($rootScope, $scope, $state, $modal, statusFactory) {

    $scope.$on('status_updated', function() {
        $scope.statusGetAll();
    });
     $scope.$on('status_created', function() {
        $scope.statusGetAll();
    });
      $scope.$on('status_deleted', function() {
        $scope.statusGetAll();
    });

    $scope.statusGetAll = function() {
        statusFactory.statusGetAll()
            .success(function(data) {
                $scope.statuses = data.statuses ? data.statuses : [];
                $scope.statuses_copy = [].concat($scope.statuses);
            })
            .error(function(data, status) {
                console.log(data,status);
            });
    }
    
    $scope.statusCreate = function(status) {
        statusFactory.statusCreate(status)
            .success(function(data, error) {
                $scope.statuses.push(data);
                $rootScope.$broadcast('status_created');
                $scope.$close();
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.statusUpdate = function(status) {
        console.log('updating from list ', status);
        statusFactory.statusUpdate(status)
            .success(function(data) {
                $rootScope.$broadcast('status_updated');
                $scope.$close();
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.statusDelete = function(id) {
        statusFactory.statusDelete(id)
            .success(function(data) {
                $scope.statusGetAll();
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }
    
    $scope.openCreateForm = function() {
        $scope.status = null;
        $modal.open({
            templateUrl: 'core/apps/status/views/status-create.html',
            controller: 'StatusControllerList',
            scope: $scope,
            backdrop: 'static'
        });
    }

    $scope.openUpdateForm = function(status) {
        $scope.statusZ = angular.copy(status);
        $modal.open({
            templateUrl: 'core/apps/status/views/status-update.html',
            controller: 'StatusControllerList',
            scope: $scope,
            backdrop: 'static'
        });
    }

    $scope.closeModal = function() {
        $scope.$close();
        $scope.status = null;
    }

   
    $scope.statusGetAll();
    
}
