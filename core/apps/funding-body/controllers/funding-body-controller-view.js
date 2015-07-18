/**
 * FundingBodyControllerList Controller
 */

angular
    .module('Instanto')
    .controller('FundingBodyControllerView', ['$rootScope', '$scope', '$state', '$stateParams', '$modal', 'fundingBodyFactory', 'financedProjectFactory', FundingBodyControllerView]);

function FundingBodyControllerView($rootScope, $scope, $state, $stateParams, $modal, fundingBodyFactory, financedProjectFactory) {
   
    $scope.$on('funding_body_updated', function() {
        $scope.fundingBodyGetById($stateParams.fundingbodyid);
        $scope.fundingBodyGetPrimaryFinancedProjects($stateParams.fundingbodyid);
        $scope.fundingBodyGetSecondaryFinancedProjects($stateParams.fundingbodyid);

    });

    $scope.fundingBodyGetById = function(fundingbodyid) {
    	fundingBodyFactory.fundingBodyGetById(fundingbodyid)
            .success(function(data) {
                $scope.funding_body = data;
            })
            .error(function(data, error) {
                console.log(data, error);
            });
    }

    $scope.fundingBodyDelete = function(id) {
        fundingBodyFactory.fundingBodyDelete(id)
            .success(function(data) {
                $state.go('funding-body-list');
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.fundingBodyUpdate = function(funding_body) {
        fundingBodyFactory.fundingBodyUpdate(funding_body)
            .success(function(data) {
                $rootScope.$broadcast('funding_body_updated');
                $scope.$close();
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    };

    $scope.fundingBodyGetPrimaryFinancedProjects = function(id) {
        fundingBodyFactory.fundingBodyGetPrimaryFinancedProjects(id)
            .success(function(data) {
                $scope.funding_body_primary_financed_projects = data.financed_projects ? data.financed_projects : [];
                $scope.funding_body_primary_financed_projects_copy = [].concat($scope.funding_body_primary_financed_projects);
            })
            .error(function(data, status) {
                console.log(data, status);
            })
    }

    $scope.fundingBodyGetSecondaryFinancedProjects = function(id) {
        fundingBodyFactory.fundingBodyGetSecondaryFinancedProjects(id)
            .success(function(data) {
                $scope.funding_body_secondary_financed_projects = data.financed_projects ? data.financed_projects : [];
                $scope.funding_body_secondary_financed_projects_copy = [].concat($scope.funding_body_secondary_financed_projects);
            })
            .error(function(data, status) {
                console.log(data, status);
            })
    }

    $scope.fundingBodyAddSecondaryFinancedProject = function(id, financedprojectid, record) {
        fundingBodyFactory.fundingBodyAddSecondaryFinancedProject(id, financedprojectid, record)
            .success(function(data) {
                $rootScope.$broadcast('funding_body_updated');
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.fundingBodyRemoveSecondaryFinancedProject = function(id, financedprojectid) {
        fundingBodyFactory.fundingBodyRemoveSecondaryFinancedProject(id, financedprojectid)
            .success(function(data) {
                $rootScope.$broadcast('funding_body_updated');
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.openUpdateForm = function(funding_body) {
        $scope.funding_bodyZ = angular.copy(funding_body);
        $modal.open({
            templateUrl: 'core/apps/funding-body/views/funding-body-update.html',
            controller: 'FundingBodyControllerView',
            scope: $scope,
            backdrop: 'static'
        });
    }

    $scope.openAddSecondaryFinancedProjectForm = function() {
        $scope.secondary_financed_projects_to_add = [];
        var blacklist = $scope.funding_body_primary_financed_projects.concat($scope.funding_body_secondary_financed_projects);
        var blacklistIds = blacklist.map(function(fp) {
            return fp.id;
        });
        financedProjectFactory.financedProjectGetAll()
            .success(function(data) {
                var financed_projects = data.financed_projects ? data.financed_projects : [];
                financed_projects.forEach(function(fp) {
                    if (blacklistIds.indexOf(fp.id) === -1) {
                        $scope.secondary_financed_projects_to_add.push(fp);
                    }
                });
                $modal.open({
                    templateUrl: 'core/apps/funding-body/views/funding-body-add-secondary-financed-project.html',
                    controller: 'FundingBodyControllerView',
                    scope: $scope,
                    backdrop: 'static'
                });
            })
            .error(function(data, error) {
                console.log(data, error);
            });
    }

    $scope.fundingBodyGetById($stateParams.fundingbodyid);
    $scope.fundingBodyGetPrimaryFinancedProjects($stateParams.fundingbodyid);
    $scope.fundingBodyGetSecondaryFinancedProjects($stateParams.fundingbodyid);


}
