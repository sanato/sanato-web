/**
 * StudentWorkTypeControllerList Controller
 */

angular
    .module('Instanto')
    .controller('StudentWorkControllerView', ['$rootScope', '$scope', '$state', '$stateParams', '$modal', 'studentWorkFactory', 'memberFactory', 'studentWorkTypeFactory','researchLineFactory', StudentWorkControllerView]);

function StudentWorkControllerView($rootScope, $scope, $state, $stateParams, $modal, studentWorkFactory, memberFactory, studentWorkTypeFactory, researchLineFactory) {
   
    $scope.$on('student_work_updated', function() {
        $scope.studentWorkGetById($stateParams.studentworkid);
        $scope.studentWorkGetResearchLines($stateParams.studentworkid);
    });
    $scope.studentWorkGetById = function(studentworkid) {
    	studentWorkFactory.studentWorkGetById(studentworkid)
            .success(function(data) {
                $scope.student_work = data;
                memberFactory.memberGetById($scope.student_work.author)
                    .success(function(data) {
                        $scope.student_work.author_doc = data
                        studentWorkTypeFactory.studentWorkTypeGetById($scope.student_work.student_work_type)
                            .success(function(data) {
                                $scope.student_work.student_work_type_doc = data
                            })
                            .error(function(data, status) {
                                console.log(data, status)
                            })
                    })
                    .error(function(data, status) {
                        console.log(data, status)
                    })
            })
            .error(function(data, status) {
                console.log(data,status);
            });
    }

    $scope.memberGetById = function(memberid) {
        memberFactory.memberGetById(memberid)
            .success(function(data) {
                $scope.member = data;
                statusFactory.statusGetById($scope.member.primary_status)
                    .success(function(data) {
                        $scope.member.primary_status_doc = data;
                    })
                    .error(function(data, errcode) {
                        //console.log(data, errcode);
                    })
            })
            .error(function(data, member) {
                //console.log(data,member);
            });
    }

    $scope.studentWorkDelete = function(id) {
        studentWorkFactory.studentWorkDelete(id)
            .success(function(data) {
                $state.go('student-work-list');
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
            .error(function(data, status) {
                console.log(data, status);
            })
    }

    $scope.studentWorkGetResearchLines = function(id) {
        studentWorkFactory.studentWorkGetResearchLines(id)
            .success(function(data) {
                $scope.research_lines = data.research_lines ? data.research_lines : [];
                $scope.research_lines_copy = [].concat($scope.research_lines);
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.studentWorkAddResearchLine = function(id, researchlineid) {
        studentWorkFactory.studentWorkAddResearchLine(id, researchlineid)
            .success(function(data) {
                $rootScope.$broadcast('student_work_updated');
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.studentWorkRemoveResearchLine = function(id, researchlineid) {
        studentWorkFactory.studentWorkRemoveResearchLine(id, researchlineid)
            .success(function(data) {
                $rootScope.$broadcast("student_work_updated");
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }
    $scope.openUpdateForm = function(student_work) {
        memberFactory.memberGetAll()
            .success(function(data) {
                $scope.authors = data.members;
                studentWorkTypeFactory.studentWorkTypeGetAll()
                    .success(function(data) {
                        $scope.student_work_types = data.student_work_types;
                        $scope.student_workZ = angular.copy(student_work);
                        $modal.open({
                            templateUrl: 'core/apps/student-work/views/student-work-update.html',
                            controller: 'StudentWorkControllerView',
                            scope: $scope,
                            backdrop: 'static'
                        });
                    })
                    .error(function(data, status) {
                        console.log(data, status)
                    })
            })
            .error(function(data, status) {
                console.log(data, status)
            })
    }

    $scope.openAddResearchLineForm = function() {
        $scope.research_lines_to_add = [];
        var blacklist = $scope.research_lines;
        var blacklistIds = blacklist.map(function(research_line) {
            return research_line.id;
        });
        researchLineFactory.researchLineGetAll()
            .success(function(data) {
                var research_lines = data.research_lines ? data.research_lines : [];
                research_lines.forEach(function(researchLine) {
                    if (blacklistIds.indexOf(researchLine.id) === -1) {
                        $scope.research_lines_to_add.push(researchLine);
                    }
                });
                $modal.open({
                    templateUrl: 'core/apps/student-work/views/student-work-add-research-line.html',
                    controller: 'StudentWorkControllerView',
                    scope: $scope,
                    backdrop: 'static'
                });
            })
            .error(function(data, error) {
                console.log(data, error);
            });
    }

    $scope.studentWorkGetById($stateParams.studentworkid);
    $scope.studentWorkGetResearchLines($stateParams.studentworkid);
}
