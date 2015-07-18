angular.module('Instanto')
    .factory('publicationTypeFactory', ['$http', function($http) {

    var urlBase = 'http://localhost:3000/api/publicationtypes';
    var publicationTypeFactory = {};

    publicationTypeFactory.publicationTypeGetAll = function () {
        return $http.get(urlBase);
    };

    publicationTypeFactory.publicationTypeGetById = function (id) {
        return $http.get(urlBase + '/' + id);
    };

    publicationTypeFactory.publicationTypeCreate = function (publication_type) {
        return $http.post(urlBase, publication_type);
    };

    publicationTypeFactory.publicationTypeUpdate = function (publication_type) {
        return $http.put(urlBase + '/' + publication_type.id, publication_type)
    };

    publicationTypeFactory.publicationTypeDelete = function (id) {
        return $http.delete(urlBase + '/' + id);
    };

    publicationTypeFactory.publicationTypeGetPublications = function (id) {
        return $http.get(urlBase + '/' + id + '/publications');
    };

    return publicationTypeFactory;
}]);
