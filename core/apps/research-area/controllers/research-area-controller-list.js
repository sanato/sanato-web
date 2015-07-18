/**
 * ResearchAreaControllerList Controller
 */

angular
    .module('Instanto')
    .controller('ResearchAreaControllerList', ['$rootScope', '$scope', '$state', '$modal', 'researchAreaFactory', ResearchAreaControllerList]);

function ResearchAreaControllerList($rootScope, $scope, $state, $modal, researchAreaFactory) {

    $scope.$on('research_area_updated', function() {
        $scope.researchAreaGetAll();
    });
     $scope.$on('research_area_created', function() {
        $scope.researchAreaGetAll();
    });
      $scope.$on('research_area_deleted', function() {
        $scope.researchAreaGetAll();
    });

    $scope.researchAreaGetAll = function() {
        researchAreaFactory.researchAreaGetAll()
            .success(function(data) {
                $scope.research_areas = data.research_areas ? data.research_areas : [];
                $scope.research_areas_copy = [].concat($scope.research_areas); 
            })
            .error(function(data, status) {
                console.log(data,status);
            });
    }
    
    $scope.researchAreaCreate = function(research_area) {
        researchAreaFactory.researchAreaCreate(research_area)
            .success(function(data, error) {
                $scope.research_areas.push(data);
                $rootScope.$broadcast('research_area_created');
                $scope.$close();
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.researchAreaUpdate = function(research_area) {
        researchAreaFactory.researchAreaUpdate(research_area)
            .success(function(data) {
                $rootScope.$broadcast('research_area_updated');
                $scope.$close();
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.researchAreaDelete = function(id) {
        researchAreaFactory.researchAreaDelete(id)
            .success(function(data) {
                $scope.researchAreaGetAll();
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.openCreateForm = function() {
        $scope.researchArea = null;
        $modal.open({
            templateUrl: 'core/apps/research-area/views/research-area-create.html',
            controller: 'ResearchAreaControllerList',
            scope: $scope,
            backdrop: 'static'
        });
    }

    $scope.openUpdateForm = function(research_area) {
        $scope.research_areaZ = angular.copy(research_area);
        $modal.open({
            templateUrl: 'core/apps/research-area/views/research-area-update.html',
            controller: 'ResearchAreaControllerList',
            scope: $scope,
            backdrop: 'static'
        });
    }

    $scope.closeModal = function() {
        $scope.$close();
        $scope.research_area = null;
    }

   
    $scope.researchAreaGetAll();
    
}
