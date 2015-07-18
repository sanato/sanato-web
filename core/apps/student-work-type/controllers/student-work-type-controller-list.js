/**
 * StudentWorkTypeControllerList Controller
 */

angular
    .module('Instanto')
    .controller('StudentWorkTypeControllerList', ['$rootScope', '$scope', '$state', '$modal', 'studentWorkTypeFactory', StudentWorkTypeControllerList]);

function StudentWorkTypeControllerList($rootScope, $scope, $state, $modal, studentWorkTypeFactory) {

    $scope.$on('student_work_type_updated', function() {
        $scope.studentWorkTypeGetAll();
    });
     $scope.$on('student_work_type_created', function() {
        $scope.studentWorkTypeGetAll();
    });
      $scope.$on('student_work_type_deleted', function() {
        $scope.studentWorkTypeGetAll();
    });

    $scope.studentWorkTypeGetAll = function() {
        studentWorkTypeFactory.studentWorkTypeGetAll()
            .success(function(data) {
                $scope.student_work_types = data.student_work_types ? data.student_work_types : [];
                $scope.student_work_types_copy = [].concat($scope.student_work_types);
            })
            .error(function(data, status) {
                console.log(data,status);
            });
    }
    
    $scope.studentWorkTypeCreate = function(student_work_type) {
        studentWorkTypeFactory.studentWorkTypeCreate(student_work_type)
            .success(function(data, error) {
                $scope.student_work_types.push(data);
                $rootScope.$broadcast('student_work_type_created');
                $scope.$close();
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.studentWorkTypeUpdate = function(student_work_type) {
        studentWorkTypeFactory.studentWorkTypeUpdate(student_work_type)
            .success(function(data) {
                $rootScope.$broadcast('student_work_type_updated');
                $scope.$close();
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.studentWorkTypeDelete = function(id) {
        studentWorkTypeFactory.studentWorkTypeDelete(id)
            .success(function(data) {
                $scope.studentWorkTypeGetAll();
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.openCreateForm = function() {
        $scope.studentWorkType = null;
        $modal.open({
            templateUrl: 'core/apps/student-work-type/views/student-work-type-create.html',
            controller: 'StudentWorkTypeControllerList',
            scope: $scope,
            backdrop: 'static'
        });
    }

    $scope.openUpdateForm = function(student_work_type) {
        $scope.student_work_typeZ = angular.copy(student_work_type);
        $modal.open({
            templateUrl: 'core/apps/student-work-type/views/student-work-type-update.html',
            controller: 'StudentWorkTypeControllerList',
            scope: $scope,
            backdrop: 'static'
        });
    }

    $scope.closeModal = function() {
        $scope.$close();
        $scope.student_work_type = null;
    }

   
    $scope.studentWorkTypeGetAll();
    
}
