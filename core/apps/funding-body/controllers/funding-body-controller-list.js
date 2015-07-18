/**
 * FundingBodyControllerList Controller
 */

angular
    .module('Instanto')
    .controller('FundingBodyControllerList', ['$rootScope', '$scope', '$state', '$modal', 'fundingBodyFactory', FundingBodyControllerList]);

function FundingBodyControllerList($rootScope, $scope, $state, $modal, fundingBodyFactory) {

    $scope.$on('funding_body_updated', function() {
        $scope.fundingBodyGetAll();
    });
     $scope.$on('funding_body_created', function() {
        $scope.fundingBodyGetAll();
    });
      $scope.$on('funding_body_deleted', function() {
        $scope.fundingBodyGetAll();
    });

    $scope.fundingBodyGetAll = function() {
        fundingBodyFactory.fundingBodyGetAll()
            .success(function(data) {
                $scope.funding_bodies = data.funding_bodies ? data.funding_bodies : [];
                $scope.funding_bodies_copy = [].concat($scope.funding_bodies);
            })
            .error(function(data, status) {
                console.log(data,status);
            });
    }
    
    $scope.fundingBodyCreate = function(fundingBody) {
        fundingBodyFactory.fundingBodyCreate(fundingBody)
            .success(function(data, error) {
                $rootScope.$broadcast('funding_body_created');
                $scope.$close();
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.fundingBodyUpdate = function(fundingBody) {
        fundingBodyFactory.fundingBodyUpdate(fundingBody)
            .success(function(data) {
                $rootScope.$broadcast('funding_body_updated');
                $scope.$close();
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.fundingBodyDelete = function(id) {
        fundingBodyFactory.fundingBodyDelete(id)
            .success(function(data) {
                $scope.fundingBodyGetAll();
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }
    
    $scope.openCreateForm = function() {
        $scope.funding_body = {};
        $scope.funding_body.scope = 'regional';
        $modal.open({
            templateUrl: 'core/apps/funding-body/views/funding-body-create.html',
            controller: 'FundingBodyControllerList',
            scope: $scope,
            backdrop: 'static'
        });
    }

    $scope.openUpdateForm = function(funding_body) {
        $scope.funding_bodyZ = angular.copy(funding_body);
        $modal.open({
            templateUrl: 'core/apps/funding-body/views/funding-body-update.html',
            controller: 'FundingBodyControllerList',
            scope: $scope,
            backdrop: 'static'
        });
    }

    $scope.closeModal = function() {
        $scope.$close();
        $scope.funding_body = null;
    }

   
    $scope.fundingBodyGetAll();
    
}
