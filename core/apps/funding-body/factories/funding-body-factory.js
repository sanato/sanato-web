angular.module('Instanto')
    .factory('fundingBodyFactory', ['$http', function($http) {

    var urlBase = 'http://localhost:3000/api/fundingbodies';
    var fundingBodyFactory = {};

    fundingBodyFactory.fundingBodyGetAll = function () {
        return $http.get(urlBase);
    };

    fundingBodyFactory.fundingBodyGetById = function (id) {
        return $http.get(urlBase + '/' + id);
    };

    fundingBodyFactory.fundingBodyCreate = function (fundingBody) {
        return $http.post(urlBase, fundingBody);
    };

    fundingBodyFactory.fundingBodyUpdate = function (fundingBody) {
        return $http.put(urlBase + '/' + fundingBody.id, fundingBody)
    };

    fundingBodyFactory.fundingBodyDelete = function (id) {
        return $http.delete(urlBase + '/' + id);
    };

    fundingBodyFactory.fundingBodyGetPrimaryFinancedProjects = function (id) {
        return $http.get(urlBase + '/' + id + '/primaryfinancedprojects');
    };

    fundingBodyFactory.fundingBodyGetSecondaryFinancedProjects = function (id) {
        return $http.get(urlBase + '/' + id + '/secondaryfinancedprojects');
    };

    fundingBodyFactory.fundingBodyAddSecondaryFinancedProject = function (id, financedprojectid, record) {
        return $http.post(urlBase + '/' + id + '/secondaryfinancedprojects', {financed_project: financedprojectid, record: record});
    };

    fundingBodyFactory.fundingBodyRemoveSecondaryFinancedProject = function (id, financedprojectid) {
        return $http.delete(urlBase + '/' + id + '/secondaryfinancedprojects', {data:{financed_project:financedprojectid}});
    };

    return fundingBodyFactory;
}]);
