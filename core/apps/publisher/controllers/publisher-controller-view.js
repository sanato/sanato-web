/**
 * PublisherControllerList Controller
 */

angular
    .module('Instanto')
    .controller('PublisherControllerView', ['$rootScope', '$scope', '$state', '$stateParams', '$modal', 'publisherFactory', PublisherControllerView]);

function PublisherControllerView($rootScope, $scope, $state, $stateParams, $modal, publisherFactory) {
   
    $scope.$on('publisher_updated', function() {
        $scope.publisherGetById($stateParams.publisherid);
        $scope.publisherGetPublications($stateParams.publisherid);

    });

    $scope.publisherGetById = function(publisherid) {
    	publisherFactory.publisherGetById(publisherid)
            .success(function(data) {
                $scope.publisher = data;
            })
            .error(function(data, status) {
                console.log(data,status);
            });
    }

    $scope.publisherDelete = function(id) {
        publisherFactory.publisherDelete(id)
            .success(function(data) {
                $state.go('publisher-list');
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
            .error(function(data, status) {
                console.log(data, status);
            })
    }

    $scope.publisherGetPublications = function(id) {
        publisherFactory.publisherGetPublications(id)
            .success(function(data) {
                $scope.publisher_publications = data.publications ? data.publications : [];
                $scope.publisher_publications_copy = [].concat($scope.publisher_publications);
            })
            .error(function(data, status) {
                console.log(data, status);
            })
    }
    $scope.openUpdateForm = function(publisher) {
        $scope.publisherZ = angular.copy(publisher);
        $modal.open({
            templateUrl: 'core/apps/publisher/views/publisher-update.html',
            controller: 'PublisherControllerView',
            scope: $scope,
            backdrop: 'static'
        });
    }

    $scope.publisherGetById($stateParams.publisherid);
    $scope.publisherGetPublications($stateParams.publisherid);

}
