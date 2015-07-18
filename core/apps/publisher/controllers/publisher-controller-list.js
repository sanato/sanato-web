/**
 * PublisherControllerList Controller
 */

angular
    .module('Instanto')
    .controller('PublisherControllerList', ['$rootScope', '$scope', '$state', '$modal', 'publisherFactory', PublisherControllerList]);

function PublisherControllerList($rootScope, $scope, $state, $modal, publisherFactory) {

    $scope.$on('publisher_updated', function() {
        $scope.publisherGetAll();
    });
     $scope.$on('publisher_created', function() {
        $scope.publisherGetAll();
    });
      $scope.$on('publisher_deleted', function() {
        $scope.publisherGetAll();
    });

    $scope.publisherGetAll = function() {
        publisherFactory.publisherGetAll()
            .success(function(data) {
                $scope.publishers = data.publishers ? data.publishers : [];
                $scope.publishers_copy = [].concat($scope.publishers);
            })
            .error(function(data, status) {
                console.log(data,status);
            });
    }
    
    $scope.publisherCreate = function(publisher) {
        publisherFactory.publisherCreate(publisher)
            .success(function(data, error) {
                $scope.publishers.push(data);
                $rootScope.$broadcast('publisher_created');
                $scope.$close();
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.publisherUpdate = function(publisher) {
        publisherFactory.publisherUpdate(publisher)
            .success(function(data) {
                $rootScope.$broadcast('publisher_updated');
                $scope.$close();
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.publisherDelete = function(id) {
        publisherFactory.publisherDelete(id)
            .success(function(data) {
                $scope.publisherGetAll();
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.openCreateForm = function() {
        $scope.publisher = null;
        $modal.open({
            templateUrl: 'core/apps/publisher/views/publisher-create.html',
            controller: 'PublisherControllerList',
            scope: $scope,
            backdrop: 'static'
        });
    }

    $scope.openUpdateForm = function(publisher) {
        $scope.publisherZ = angular.copy(publisher);
        $modal.open({
            templateUrl: 'core/apps/publisher/views/publisher-update.html',
            controller: 'PublisherControllerList',
            scope: $scope,
            backdrop: 'static'
        });
    }

    $scope.closeModal = function() {
        $scope.$close();
        $scope.publisher = null;
    }

   
    $scope.publisherGetAll();
    
}
