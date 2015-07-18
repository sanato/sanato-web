angular.module('Instanto')
    .factory('researchAreaFactory', ['$http', function($http) {

    var urlBase = 'http://localhost:3000/api/researchareas';
    var researchAreaFactory = {};

    researchAreaFactory.researchAreaGetAll = function () {
        return $http.get(urlBase);
    };

    researchAreaFactory.researchAreaGetById = function (id) {
        return $http.get(urlBase + '/' + id);
    };

    researchAreaFactory.researchAreaCreate = function (research_area) {
        return $http.post(urlBase, research_area);
    };

    researchAreaFactory.researchAreaUpdate = function (research_area) {
        return $http.put(urlBase + '/' + research_area.id, research_area)
    };

    researchAreaFactory.researchAreaUpdateLogo = function (researchArea, filename, data) {
        return $http.put(urlBase + '/' + researchArea.id + '/logo?filename=' + filename, new Uint8Array(data), {transformRequest: []})
    };

    researchAreaFactory.researchAreaDeleteLogo = function (researchArea) {
        return $http.delete(urlBase + '/' + researchArea.id + '/logo')
    };
    
    researchAreaFactory.researchAreaDelete = function (id) {
        return $http.delete(urlBase + '/' + id);
    };

    researchAreaFactory.researchAreaGetPrimaryResearchLines = function (id) {
        return $http.get(urlBase + '/' + id + '/primaryresearchlines');
    };

    return researchAreaFactory;
}]);
