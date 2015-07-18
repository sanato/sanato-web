angular.module('Instanto')
    .factory('studentWorkFactory', ['$http', function($http) {

    var urlBase = 'http://localhost:3000/api/studentworks';
    var studentWorkFactory = {};

    studentWorkFactory.studentWorkGetAll = function () {
        return $http.get(urlBase);
    };

    studentWorkFactory.studentWorkGetById = function (id) {
        return $http.get(urlBase + '/' + id);
    };

    studentWorkFactory.studentWorkCreate = function (student_work) {
        return $http.post(urlBase, student_work);
    };

    studentWorkFactory.studentWorkUpdate = function (student_work) {
        return $http.put(urlBase + '/' + student_work.id, student_work)
    };

    studentWorkFactory.studentWorkDelete = function (id) {
        return $http.delete(urlBase + '/' + id);
    };

    studentWorkFactory.studentWorkGetResearchLines = function (id) {
        return $http.get(urlBase + '/' + id + '/researchlines');
    };

    studentWorkFactory.studentWorkAddResearchLine = function (id, researchlineid) {
        return $http.post(urlBase + '/' + id + '/researchlines', {research_line: researchlineid});
    };

    studentWorkFactory.studentWorkRemoveResearchLine = function (id, researchlineid) {
        return $http.delete(urlBase + '/' + id + '/researchlines', {data:{research_line: researchlineid}});
    };
    
    return studentWorkFactory;
}]);
