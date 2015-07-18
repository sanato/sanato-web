/**
 * StatusControllerList Controller
 */

angular
    .module('Instanto')
    .controller('StatusControllerView', ['$rootScope', '$scope', '$state', '$stateParams', '$modal', 'statusFactory', 'memberFactory',  StatusControllerView]);

function StatusControllerView($rootScope, $scope, $state, $stateParams, $modal, statusFactory, memberFactory) {
   
    $scope.$on('status_updated', function() {
        $scope.statusGetById($stateParams.statusid);
        $scope.statusGetPrimaryMembers($stateParams.statusid);
        $scope.statusGetSecondaryMembers($stateParams.statusid);
    });

    $scope.statusGetById = function(statusid) {
    	statusFactory.statusGetById(statusid)
            .success(function(data) {
                $scope.status = data;
            })
            .error(function(data, status) {
                console.log(data,status);
            });
    }

    $scope.statusDelete = function(id) {
        statusFactory.statusDelete(id)
            .success(function(data) {
                $state.go('status-list');
            })
            .error(function(data, status) {
                console.log(data, error);
            })
    }

    $scope.statusUpdate = function(status) {
        statusFactory.statusUpdate(status)
            .success(function(data) {
                $rootScope.$broadcast('status_updated');
                $scope.$close();
            })
            .error(function(data, status) {
                console.log(data, status);
            })
    }

    $scope.statusGetPrimaryMembers = function(id) {
        statusFactory.statusGetPrimaryMembers(id)
            .success(function(data) {
                $scope.status_primary_members = data.members ? data.members : [];
                $scope.status_primary_members_copy = [].concat($scope.status_primary_members);
            })
            .error(function(data, status) {
                console.log(data, status);
            })
    }

    $scope.statusGetSecondaryMembers = function(id) {
        statusFactory.statusGetSecondaryMembers(id)
            .success(function(data) {
                $scope.status_secondary_members = data.members ? data.members : [];
                $scope.status_secondary_members_copy = [].concat($scope.status_secondary_members);
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.statusAddSecondaryMember = function(id, memberid) {
        statusFactory.statusAddSecondaryMember(id, memberid)
            .success(function(data) {
                $rootScope.$broadcast('status_updated');
                //$scope.$close(); TODO: Understand because this doesn´t work. To work around we have $close() in the view
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.statusRemoveSecondaryMember = function(id, memberid) {
        statusFactory.statusRemoveSecondaryMember(id, memberid)
            .success(function(data) {
                $rootScope.$broadcast("status_updated");
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.openUpdateForm = function(status) {
        $scope.statusZ = angular.copy(status);
        $modal.open({
            templateUrl: 'core/apps/status/views/status-update.html',
            controller: 'StatusControllerView',
            scope: $scope,
            backdrop: 'static'
        });
    }

    $scope.openAddSecondaryMemberForm = function() {
        $scope.secondary_members_to_add = [];
        var blacklist = $scope.status_primary_members.concat($scope.status_secondary_members);
        var blacklistIds = blacklist.map(function(member) {
            return member.id;
        });
        memberFactory.memberGetAll()
            .success(function(data) {
                var members = data.members ? data.members : [];
                members.forEach(function(member) {
                    if (blacklistIds.indexOf(member.id) === -1) {
                        $scope.secondary_members_to_add.push(member);
                    }
                });
                $modal.open({
                    templateUrl: 'core/apps/status/views/status-add-secondary-member.html',
                    controller: 'StatusControllerList',
                    scope: $scope,
                    backdrop: 'static'
                });
            })
            .error(function(data, error) {
                console.log(data, error);
            });
    }

    $scope.statusGetById($stateParams.statusid);
    $scope.statusGetPrimaryMembers($stateParams.statusid);
    $scope.statusGetSecondaryMembers($stateParams.statusid);
}
