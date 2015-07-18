/**
 * PublicationTypeControllerList Controller
 */

angular
    .module('Instanto')
    .controller('PublicationTypeControllerView', ['$rootScope', '$scope', '$state', '$stateParams', '$modal', 'publicationTypeFactory', PublicationTypeControllerView]);

function PublicationTypeControllerView($rootScope, $scope, $state, $stateParams, $modal, publicationTypeFactory) {
   
    $scope.$on('publication_type_updated', function() {
        $scope.publicationTypeGetById($stateParams.publicationtypeid);
        $scope.publicationTypeGetPublications($stateParams.publicationtypeid);
    });

    $scope.publicationTypeGetById = function(publicationtypeid) {
    	publicationTypeFactory.publicationTypeGetById(publicationtypeid)
            .success(function(data) {
                $scope.publication_type = data;
            })
            .error(function(data, status) {
                console.log(data,status);
            });
    }

    $scope.publicationTypeDelete = function(id) {
        publicationTypeFactory.publicationTypeDelete(id)
            .success(function(data) {
                $state.go('publication-type-list');
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
            .error(function(data, status) {
                console.log(data, status);
            })
    }

    $scope.publicationTypeGetPublications = function(id) {
        publicationTypeFactory.publicationTypeGetPublications(id)
            .success(function(data) {
                $scope.publication_type_publications = data.publications ? data.publications : [];
                $scope.publication_type_publications_copy = [].concat($scope.publication_type_publications);
            })
            .error(function(data, status) {
                console.log(data, status);
            })
    }

    $scope.openUpdateForm = function(publication_type) {
        $scope.publication_typeZ = angular.copy(publication_type);
        $modal.open({
            templateUrl: 'core/apps/publication-type/views/publication-type-update.html',
            controller: 'PublicationTypeControllerView',
            scope: $scope,
            backdrop: 'static'
        });
    }

    $scope.publicationTypeGetById($stateParams.publicationtypeid);
    $scope.publicationTypeGetPublications($stateParams.publicationtypeid);

}
