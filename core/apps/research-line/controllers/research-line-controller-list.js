/**
 * ResearchLineControllerList Controller
 */

angular
    .module('Instanto')
    .controller('ResearchLineControllerList', ['$rootScope', '$scope', '$state', '$modal', 'researchLineFactory', 'researchAreaFactory',  ResearchLineControllerList]);

function ResearchLineControllerList($rootScope, $scope, $state, $modal, researchLineFactory, researchAreaFactory) {

    $scope.$on('research_line_updated', function() {
        $scope.researchLineGetAll();
    });
     $scope.$on('research_line_created', function() {
        $scope.researchLineGetAll();
    });
      $scope.$on('research_line_deleted', function() {
        $scope.researchLineGetAll();
    });

    $scope.researchLineGetAll = function() {
        researchLineFactory.researchLineGetAll()
            .success(function(data) {
                $scope.research_lines = data.research_lines ? data.research_lines : [];
                $scope.research_lines_copy = [].concat($scope.research_lines);
            })
            .error(function(data, status) {
                console.log(data,status);
            });
    }
    
    $scope.researchLineCreate = function(research_line) {
        console.log(research_line.finished, typeof research_line.finished);
        researchLineFactory.researchLineCreate(research_line)
            .success(function(data, error) {
                $scope.research_lines.push(data);
                $rootScope.$broadcast('research_line_created');
                $scope.$close();
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.researchLineUpdate = function(research_line) {
        console.log('updating from list ', research_line);
        researchLineFactory.researchLineUpdate(research_line)
            .success(function(data) {
                $rootScope.$broadcast('research_line_updated');
                $scope.$close();
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.researchLineDelete = function(id) {
        researchLineFactory.researchLineDelete(id)
            .success(function(data) {
                $scope.researchLineGetAll();
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.openCreateForm = function() {
        researchAreaFactory.researchAreaGetAll()
            .success(function(data) {
                $scope.research_areas = data.research_areas ? data.research_areas : [];
                $scope.research_line = {};
                $scope.research_line.finished = false;
                $modal.open({
                    templateUrl: 'core/apps/research-line/views/research-line-create.html',
                    controller: 'ResearchLineControllerList',
                    scope: $scope,
                    backdrop: 'static'
                });
            })
            .error(function(data, status) {
                console.log(data, status);
            })
    }

    $scope.openUpdateForm = function(research_line) {
        researchAreaFactory.researchAreaGetAll()
            .success(function(data) {
                $scope.research_areas = data.research_areas ? data.research_areas : [];
                $scope.research_lineZ = angular.copy(research_line);
                $modal.open({
                    templateUrl: 'core/apps/research-line/views/research-line-update.html',
                    controller: 'ResearchLineControllerList',
                    scope: $scope,
                    backdrop: 'static'
                });
            })
            .error(function(data, status) {
                console.log(data, status);
            })
    }

    $scope.closeModal = function() {
        $scope.$close();
        $scope.research_line = null;
    }

   
    $scope.scopeOptions = [
        {
            id: "regional",
            name: "Regional"
        },
        {
            id: "national",
            name: "National"
        },
        {
            id: "international",
            name: "International"
        },
    ]
    $scope.researchLineGetAll();
    
}
