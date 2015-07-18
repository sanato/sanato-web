angular.module('Instanto')
    .factory('studentWorkTypeFactory', ['$http', function($http) {

    var urlBase = 'http://localhost:3000/api/studentworktypes';
    var studentWorkTypeFactory = {};

    studentWorkTypeFactory.studentWorkTypeGetAll = function () {
        return $http.get(urlBase);
    };

    studentWorkTypeFactory.studentWorkTypeGetById = function (id) {
        return $http.get(urlBase + '/' + id);
    };

    studentWorkTypeFactory.studentWorkTypeCreate = function (student_work_type) {
        return $http.post(urlBase, student_work_type);
    };

    studentWorkTypeFactory.studentWorkTypeUpdate = function (student_work_type) {
        return $http.put(urlBase + '/' + student_work_type.id, student_work_type)
    };

    studentWorkTypeFactory.studentWorkTypeDelete = function (id) {
        return $http.delete(urlBase + '/' + id);
    };

    studentWorkTypeFactory.studentWorkTypeGetStudentWorks = function (id) {
        return $http.get(urlBase + '/' + id + '/studentworks');
    };

    return studentWorkTypeFactory;
}]);
