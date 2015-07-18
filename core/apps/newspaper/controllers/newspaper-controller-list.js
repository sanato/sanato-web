/**
 * NewspaperControllerList Controller
 */

angular
    .module('Instanto')
    .controller('NewspaperControllerList', ['$rootScope', '$scope', '$state', '$modal', 'newspaperFactory', NewspaperControllerList]);

function NewspaperControllerList($rootScope, $scope, $state, $modal, newspaperFactory) {

    $scope.$on('newspaper_updated', function() {
        $scope.newspaperGetAll();
    });
     $scope.$on('newspaper_created', function() {
        $scope.newspaperGetAll();
    });
      $scope.$on('newspaper_deleted', function() {
        $scope.newspaperGetAll();
    });

    $scope.newspaperGetAll = function() {
        newspaperFactory.newspaperGetAll()
            .success(function(data) {
                $scope.newspapers = data.newspapers ? data.newspapers : [];
                $scope.newspapers_copy = [].concat($scope.newspapers);
            })
            .error(function(data, newspaper) {
                console.log(data,newspaper);
            });
    }
    
    $scope.newspaperCreate = function(newspaper) {
        newspaperFactory.newspaperCreate(newspaper)
            .success(function(data, error) {
                $scope.newspapers.push(data);
                $rootScope.$broadcast('newspaper_created');
                $scope.$close();
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.newspaperUpdate = function(newspaper) {
        newspaperFactory.newspaperUpdate(newspaper)
            .success(function(data) {
                $rootScope.$broadcast('newspaper_updated');
                $scope.$close();
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.newspaperDelete = function(id) {
        newspaperFactory.newspaperDelete(id)
            .success(function(data) {
                $scope.newspaperGetAll();
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }
    
    $scope.openCreateForm = function() {
        $scope.newspaper = null;
        $modal.open({
            templateUrl: 'core/apps/newspaper/views/newspaper-create.html',
            controller: 'NewspaperControllerList',
            scope: $scope,
            backdrop: 'static'
        });
    }

    $scope.openUpdateForm = function(newspaper) {
        $scope.newspaperZ = angular.copy(newspaper);
        $modal.open({
            templateUrl: 'core/apps/newspaper/views/newspaper-update.html',
            controller: 'NewspaperControllerList',
            scope: $scope,
            backdrop: 'static'
        });
    }

    $scope.closeModal = function() {
        $scope.$close();
        $scope.newspaper = null;
    }

   
    $scope.newspaperGetAll();
    
}
