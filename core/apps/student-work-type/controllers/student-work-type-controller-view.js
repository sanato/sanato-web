/**
 * StudentWorkTypeControllerList Controller
 */

angular
    .module('Instanto')
    .controller('StudentWorkTypeControllerView', ['$rootScope', '$scope', '$state', '$stateParams', '$modal', 'studentWorkTypeFactory', StudentWorkTypeControllerView]);

function StudentWorkTypeControllerView($rootScope, $scope, $state, $stateParams, $modal, studentWorkTypeFactory) {
   
    $scope.$on('student_work_type_updated', function() {
        $scope.studentWorkTypeGetById($stateParams.studentworktypeid);
        $scope.studentWorkTypeGetStudentWorks($stateParams.studentworktypeid);

    });

    $scope.studentWorkTypeGetById = function(studentworktypeid) {
    	studentWorkTypeFactory.studentWorkTypeGetById(studentworktypeid)
            .success(function(data) {
                $scope.student_work_type = data;
            })
            .error(function(data, status) {
                console.log(data,status);
            });
    }

    $scope.studentWorkTypeDelete = function(id) {
        studentWorkTypeFactory.studentWorkTypeDelete(id)
            .success(function(data) {
                $state.go('student-work-type-list');
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
            .error(function(data, status) {
                console.log(data, status);
            })
    }

    $scope.studentWorkTypeGetStudentWorks = function(id) {
        studentWorkTypeFactory.studentWorkTypeGetStudentWorks(id)
            .success(function(data) {
                $scope.student_work_type_student_works = data.student_works ? data.student_works : [];
                $scope.student_work_type_student_works_copy = [].concat($scope.student_work_type_student_works);
            })
            .error(function(data, status) {
                console.log(data, status);
            })
    }


    $scope.openUpdateForm = function(student_work_type) {
        $scope.student_work_typeZ = angular.copy(student_work_type);
        $modal.open({
            templateUrl: 'core/apps/student-work-type/views/student-work-type-update.html',
            controller: 'StudentWorkTypeControllerView',
            scope: $scope,
            backdrop: 'static'
        });
    }

    $scope.studentWorkTypeGetById($stateParams.studentworktypeid);
    $scope.studentWorkTypeGetStudentWorks($stateParams.studentworktypeid);
}
