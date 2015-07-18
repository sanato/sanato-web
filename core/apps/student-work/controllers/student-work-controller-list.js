/**
 * StudentWorkControllerList Controller
 */

angular
    .module('Instanto')
    .controller('StudentWorkControllerList', ['$rootScope', '$scope', '$state', '$modal', 'studentWorkFactory', 'memberFactory', 'studentWorkTypeFactory', StudentWorkControllerList]);

function StudentWorkControllerList($rootScope, $scope, $state, $modal, studentWorkFactory, memberFactory, studentWorkTypeFactory) {

    $scope.$on('student_work_updated', function() {
        $scope.studentWorkGetAll();
    });
     $scope.$on('student_work_created', function() {
        $scope.studentWorkGetAll();
    });
      $scope.$on('student_work_deleted', function() {
        $scope.studentWorkGetAll();
    });

    $scope.studentWorkGetAll = function() {
        studentWorkFactory.studentWorkGetAll()
            .success(function(data) {
                $scope.student_works = data.student_works ? data.student_works : [];
                $scope.student_works_copy = [].concat($scope.student_works);
            })
            .error(function(data, status) {
                console.log(data,status);
            });
    }
    
    $scope.studentWorkCreate = function(student_work) {
        studentWorkFactory.studentWorkCreate(student_work)
            .success(function(data, error) {
                $scope.student_works.push(data);
                $rootScope.$broadcast('student_work_created');
                $scope.$close();
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.studentWorkUpdate = function(student_work) {
        studentWorkFactory.studentWorkUpdate(student_work)
            .success(function(data) {
                $rootScope.$broadcast('student_work_updated');
                $scope.$close();
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.studentWorkDelete = function(id) {
        studentWorkFactory.studentWorkDelete(id)
            .success(function(data) {
                $scope.studentWorkGetAll();
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.openCreateForm = function() {
        $scope.student_work = {};
        $scope.student_work.year = new Date().getFullYear();
        $modal.open({
            templateUrl: 'core/apps/student-work/views/student-work-create.html',
            controller: 'StudentWorkControllerList',
            scope: $scope,
            backdrop: 'static'
        });
    }

    $scope.openUpdateForm = function(student_work) {
        $scope.student_workZ = angular.copy(student_work);
        $modal.open({
            templateUrl: 'core/apps/student-work/views/student-work-update.html',
            controller: 'StudentWorkControllerList',
            scope: $scope,
            backdrop: 'static'
        });
    }

    $scope.closeModal = function() {
        $scope.$close();
        $scope.student_work = null;
    }

    studentWorkTypeFactory.studentWorkTypeGetAll()
        .success(function(data) {
            $scope.student_work_types = data.student_work_types ? data.student_work_types : [];
        })
        .error(function(data, status) {
            console.log(data,status);
        });

    memberFactory.memberGetAll()
        .success(function(data) {
            $scope.authors = data.members ? data.members : [];
        })
        .error(function(data, status) {
            console.log(data,status);
        });
    $scope.studentWorkGetAll();
    
}
