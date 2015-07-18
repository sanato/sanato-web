/**
 * PartnerControllerList Controller
 */

angular
    .module('Instanto')
    .controller('PartnerControllerList', ['$rootScope', '$scope', '$state', '$modal', 'partnerFactory', PartnerControllerList]);

function PartnerControllerList($rootScope, $scope, $state, $modal, partnerFactory) {

    $scope.$on('partner_updated', function() {
        $scope.partnerGetAll();
    });
     $scope.$on('partner_created', function() {
        $scope.partnerGetAll();
    });
      $scope.$on('partner_deleted', function() {
        $scope.partnerGetAll();
    });

    $scope.partnerGetAll = function() {
        partnerFactory.partnerGetAll()
            .success(function(data) {
                $scope.partners = data.partners ? data.partners : [];
                $scope.partners_copy = [].concat($scope.partners);
            })
            .error(function(data, partner) {
                console.log(data,partner);
            });
    }
    
    $scope.partnerCreate = function(partner) {
        partnerFactory.partnerCreate(partner)
            .success(function(data, error) {
                $scope.partners.push(data);
                $rootScope.$broadcast('partner_created');
                $scope.$close();
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.partnerUpdate = function(partner) {
        console.log('updating from list ', partner);
        partnerFactory.partnerUpdate(partner)
            .success(function(data) {
                $rootScope.$broadcast('partner_updated');
                $scope.$close();
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.partnerDelete = function(id) {
        partnerFactory.partnerDelete(id)
            .success(function(data) {
                $scope.partnerGetAll();
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.openCreateForm = function() {
        $scope.partner = {};
        $scope.partner.scope = 'regional';
        $scope.partner.same_department = false;
        $modal.open({
            templateUrl: 'core/apps/partner/views/partner-create.html',
            controller: 'PartnerControllerList',
            scope: $scope,
            backdrop: 'static'
        });
    }

    $scope.openUpdateForm = function(partner) {
        $scope.partnerZ = angular.copy(partner);
        $modal.open({
            templateUrl: 'core/apps/partner/views/partner-update.html',
            controller: 'PartnerControllerList',
            scope: $scope,
            backdrop: 'static'
        });
    }

    $scope.closeModal = function() {
        $scope.$close();
        $scope.partner = null;
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
    $scope.partnerGetAll();
    
}
