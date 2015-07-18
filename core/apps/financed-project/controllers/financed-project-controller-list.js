/**
 * FinancedProjectControllerList Controller
 */

angular
    .module('Instanto')
    .controller('FinancedProjectControllerList', ['$rootScope', '$scope', '$state', '$modal', 'financedProjectFactory', 'fundingBodyFactory', 'memberFactory',  FinancedProjectControllerList]);

function FinancedProjectControllerList($rootScope, $scope, $state, $modal, financedProjectFactory, fundingBodyFactory, memberFactory) {

    $scope.$on('financed_project_updated', function() {
        $scope.financedProjectGetAll();
    });
     $scope.$on('financed_project_created', function() {
        $scope.financedProjectGetAll();
    });
      $scope.$on('financed_project_deleted', function() {
        $scope.financedProjectGetAll();
    });

    $scope.financedProjectGetAll = function() {
        financedProjectFactory.financedProjectGetAll()
            .success(function(data) {
                $scope.financed_projects = data.financed_projects ? data.financed_projects : [];
                $scope.financed_projects_copy = [].concat($scope.financed_projects);
            })
            .error(function(data, financed_project) {
                console.log(data,financed_project);
            });
    }
    
    $scope.financedProjectCreate = function(financed_project) {
        var financed_project_copy = angular.copy(financed_project);
        financed_project_copy.started = Math.floor(financed_project.started.getTime()/1000);
        financed_project_copy.ended = Math.floor(financed_project.ended.getTime()/1000);
        financedProjectFactory.financedProjectCreate(financed_project_copy)
            .success(function(data, error) {
                $rootScope.$broadcast('financed_project_created');
                $scope.$close();
            })
            .error(function(data, error) {
                console.log(data, error);
            })
        
    }

    $scope.financedProjectUpdate = function(financed_project) {
        var financed_project_copy = angular.copy(financed_project);
        financed_project_copy.started = Math.floor(financed_project.started.getTime()/1000);
        financed_project_copy.ended = Math.floor(financed_project.ended.getTime()/1000);
        financedProjectFactory.financedProjectUpdate(financed_project_copy)
            .success(function(data) {
                $rootScope.$broadcast('financed_project_updated');
                $scope.$close();
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.financedProjectDelete = function(id) {
        financedProjectFactory.financedProjectDelete(id)
            .success(function(data) {
                $scope.financedProjectGetAll();
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }
    
    $scope.openCreateForm = function() {
        fundingBodyFactory.fundingBodyGetAll()
            .success(function(data) {
                $scope.funding_bodies = data.funding_bodies ? data.funding_bodies : [];
                memberFactory.memberGetAll()
                    .success(function(data) {
                        $scope.leaders = data.members ? data.members : [];
                        $scope.financed_project = {};
                        $scope.financed_project.scope = 'regional';
                        $scope.financed_project.started = new Date();
                        $scope.financed_project.ended = new Date();
                        $modal.open({
                            templateUrl: 'core/apps/financed-project/views/financed-project-create.html',
                            controller: 'FinancedProjectControllerList',
                            scope: $scope,
                            backdrop: 'static'
                        });

                    })
                    .error(function(data, error) {
                        console.log(data, error);
                    })
            })
            .error(function(data, status) {
                console.log(data, status);
            })
    }

    $scope.openUpdateForm = function(financed_project) {
        $scope.financed_projectZ = angular.copy(financed_project);
        $scope.financed_projectZ.started = new Date(financed_project.started*1000);
        $scope.financed_projectZ.ended = new Date(financed_project.ended*1000);
        fundingBodyFactory.fundingBodyGetAll()
            .success(function(data) {
                $scope.funding_bodies = data.funding_bodies ? data.funding_bodies : [];
                memberFactory.memberGetAll()
                    .success(function(data) {
                        $scope.leaders = data.members ? data.members : [];
                        $modal.open({
                            templateUrl: 'core/apps/financed-project/views/financed-project-update.html',
                            controller: 'FinancedProjectControllerList',
                            scope: $scope,
                            backdrop: 'static'
                        });
                    })
                    .error(function(data, error) {
                        console.log(data, error);
                    })
            })
            .error(function(data, status) {
                console.log(data, status);
            })
    }

    $scope.closeModal = function() {
        $scope.$close();
        $scope.financedProject = null;
    }

   
    $scope.financedProjectGetAll();
    
}
