/**
 * PublicationControllerList Controller
 */

angular
    .module('Instanto')
    .controller('PublicationControllerList', ['$rootScope', '$scope', '$state', '$modal', 'publicationFactory', 'memberFactory', 'publicationTypeFactory', 'publisherFactory', PublicationControllerList]);

function PublicationControllerList($rootScope, $scope, $state, $modal, publicationFactory, memberFactory, publicationTypeFactory, publisherFactory) {

    $scope.$on('publication_updated', function() {
        $scope.publicationGetAll();
    });
     $scope.$on('publication_created', function() {
        $scope.publicationGetAll();
    });
      $scope.$on('publication_deleted', function() {
        $scope.publicationGetAll();
    });

    $scope.publicationGetAll = function() {
        publicationFactory.publicationGetAll()
            .success(function(data) {
                $scope.publications = data.publications ? data.publications : [];
                $scope.publications_copy = [].concat($scope.publications);
            })
            .error(function(data, status) {
                console.log(data,status);
            });
    }
    
    $scope.publicationCreate = function(publication) {
        publicationFactory.publicationCreate(publication)
            .success(function(data, error) {
                $scope.publications.push(data);
                $rootScope.$broadcast('publication_created');
                $scope.$close();
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.publicationUpdate = function(publication) {
        publicationFactory.publicationUpdate(publication)
            .success(function(data) {
                $rootScope.$broadcast('publication_updated');
                $scope.$close();
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.publicationDelete = function(id) {
        publicationFactory.publicationDelete(id)
            .success(function(data) {
                $scope.publicationGetAll();
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.openCreateForm = function() {
        $scope.publication = {};
        $scope.publication.year = new Date().getFullYear();
        $modal.open({
            templateUrl: 'core/apps/publication/views/publication-create.html',
            controller: 'PublicationControllerList',
            scope: $scope,
            backdrop: 'static'
        });
    }

    $scope.openUpdateForm = function(publication) {
        $scope.publicationZ = angular.copy(publication);
        $modal.open({
            templateUrl: 'core/apps/publication/views/publication-update.html',
            controller: 'PublicationControllerList',
            scope: $scope,
            backdrop: 'static'
        });
    }

    $scope.closeModal = function() {
        $scope.$close();
        $scope.publication = null;
    }

    publicationTypeFactory.publicationTypeGetAll()
        .success(function(data) {
            $scope.publication_types = data.publication_types ? data.publication_types : [];
        })
        .error(function(data, status) {
            console.log(data,status);
        });

    memberFactory.memberGetAll()
        .success(function(data) {
            $scope.authors = data.members ? data.members : [];
        })
        .error(function(data, status) {
            console.log(data,status);
        });
    publisherFactory.publisherGetAll()
        .success(function(data) {
            $scope.publishers = data.publishers ? data.publishers : [];
        })
        .error(function(data, status) {
            console.log(data, status);
        })
    $scope.publicationGetAll();
    
}
