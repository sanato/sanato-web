/**
 * MemberControllerList Controller
 */

angular
    .module('Instanto')
    .controller('MemberControllerList', ['$rootScope', '$scope', '$state', '$modal', 'memberFactory', 'statusFactory', MemberControllerList]);

function MemberControllerList($rootScope, $scope, $state, $modal, memberFactory, statusFactory) {
    
    $scope.memberGetAll = function() {
        memberFactory.memberGetAll()
            .success(function(data) {
                $scope.members = data.members ? data.members : [];
                $scope.members_copy = [].concat($scope.members);
            })
            .error(function(data, status) {
                console.log(data, status);
            });
    }
    
    $scope.memberCreate = function(member) {
        memberFactory.memberCreate(member)
            .success(function(data, error) {
                $scope.members.push(data);
                $rootScope.$broadcast('member_created');
                $scope.$close();
            })
            .error(function(data, status) {
                console.log(data, status);
            })
    }

    $scope.memberUpdate = function(member) {
        memberFactory.memberUpdate(member)
            .success(function(data) {
                $rootScope.$broadcast('member_updated');
                $scope.$close();
            })
            .error(function(data, status) {
                console.log(data, status);
            })
    }

    $scope.memberDelete = function(id) {
        memberFactory.memberDelete(id)
            .success(function(data) {
                $rootScope.$broadcast('member_deleted');
            })
            .error(function(data, status) {
                console.log(data, status);
            })
    }

    $scope.openCreateForm = function() {
        // we use $scope.member here to avoid the isolation made by tabset directive
        // we pre-select None as the default for the radio buttons
        $scope.member = {};
        $scope.member.degree = "none";
        $scope.member.year_in = new Date().getFullYear();
        $modal.open({
            templateUrl: 'core/apps/member/views/member-create.html',
            controller: 'MemberControllerList',
            scope: $scope,
            backdrop: 'static'
        });
       
    }

    $scope.openUpdateForm = function(member) {
        $scope.memberZ = angular.copy(member);
        $modal.open({
            templateUrl: 'core/apps/member/views/member-update.html',
            controller: 'MemberControllerList',
            scope: $scope,
            backdrop: 'static'
        });
    }

    
    
    $scope.$on('member_updated', function() {
        $scope.memberGetAll();
    });
    $scope.$on('member_created', function() {
        $scope.memberGetAll();
    });
    $scope.$on('member_deleted', function() {
        $scope.memberGetAll();
    });

    statusFactory.statusGetAll()
        .success(function(data) {
            $scope.statuses = data.statuses ? data.statuses : [];
        })
        .error(function(data, status) {
            console.log(data,status);
        });

    $scope.memberGetAll();
}
