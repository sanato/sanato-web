/**
 * PublicationTypeControllerList Controller
 */

angular
    .module('Instanto')
    .controller('PublicationTypeControllerList', ['$rootScope', '$scope', '$state', '$modal', 'publicationTypeFactory', PublicationTypeControllerList]);

function PublicationTypeControllerList($rootScope, $scope, $state, $modal, publicationTypeFactory) {

    $scope.$on('publication_type_updated', function() {
        $scope.publicationTypeGetAll();
    });
     $scope.$on('publication_type_created', function() {
        $scope.publicationTypeGetAll();
    });
      $scope.$on('publication_type_deleted', function() {
        $scope.publicationTypeGetAll();
    });

    $scope.publicationTypeGetAll = function() {
        publicationTypeFactory.publicationTypeGetAll()
            .success(function(data) {
                $scope.publication_types = data.publication_types ? data.publication_types : [];
                $scope.publication_types_copy = [].concat($scope.publication_types);
            })
            .error(function(data, status) {
                console.log(data,status);
            });
    }
    
    $scope.publicationTypeCreate = function(publication_type) {
        publicationTypeFactory.publicationTypeCreate(publication_type)
            .success(function(data, error) {
                $scope.publication_types.push(data);
                $rootScope.$broadcast('publication_type_created');
                $scope.$close();
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.publicationTypeUpdate = function(publication_type) {
        publicationTypeFactory.publicationTypeUpdate(publication_type)
            .success(function(data) {
                $rootScope.$broadcast('publication_type_updated');
                $scope.$close();
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.publicationTypeDelete = function(id) {
        publicationTypeFactory.publicationTypeDelete(id)
            .success(function(data) {
                $scope.publicationTypeGetAll();
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.openCreateForm = function() {
        $scope.publicationType = null;
        $modal.open({
            templateUrl: 'core/apps/publication-type/views/publication-type-create.html',
            controller: 'PublicationTypeControllerList',
            scope: $scope,
            backdrop: 'static'
        });
    }

    $scope.openUpdateForm = function(publication_type) {
        $scope.publication_typeZ = angular.copy(publication_type);
        $modal.open({
            templateUrl: 'core/apps/publication-type/views/publication-type-update.html',
            controller: 'PublicationTypeControllerList',
            scope: $scope,
            backdrop: 'static'
        });
    }

    $scope.closeModal = function() {
        $scope.$close();
        $scope.publication_type = null;
    }

   
    $scope.publicationTypeGetAll();
    
}
