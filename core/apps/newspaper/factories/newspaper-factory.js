angular.module('Instanto')
    .factory('newspaperFactory', ['$http', function($http) {

    var urlBase = 'http://localhost:3000/api/newspapers';
    var newspaperFactory = {};

    newspaperFactory.newspaperGetAll = function () {
        return $http.get(urlBase);
    };

    newspaperFactory.newspaperGetById = function (id) {
        return $http.get(urlBase + '/' + id);
    };

    newspaperFactory.newspaperCreate = function (newspaper) {
        return $http.post(urlBase, newspaper);
    };

    newspaperFactory.newspaperUpdate = function (newspaper) {
        return $http.put(urlBase + '/' + newspaper.id, newspaper)
    };
    
    newspaperFactory.newspaperUpdateLogo = function (newspaper, filename, data) {
        return $http.put(urlBase + '/' + newspaper.id + '/logo?filename=' + filename, new Uint8Array(data), {transformRequest: []})
    };

    newspaperFactory.newspaperDeleteLogo = function (newspaper) {
        return $http.delete(urlBase + '/' + newspaper.id + '/logo')
    };
    newspaperFactory.newspaperDelete = function (id) {
        return $http.delete(urlBase + '/' + id);
    };

    newspaperFactory.newspaperGetPrimaryMembers = function (id) {
        return $http.get(urlBase + '/' + id + '/primarymembers');
    };

    newspaperFactory.newspaperGetSecondaryMembers = function (id) {
        return $http.get(urlBase + '/' + id + '/secondarymembers');
    };

    newspaperFactory.newspaperGetArticles = function (id) {
        return $http.get(urlBase + '/' + id + '/articles');
    };
    
    return newspaperFactory;
}]);
