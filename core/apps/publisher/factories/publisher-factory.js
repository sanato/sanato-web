angular.module('Instanto')
    .factory('publisherFactory', ['$http', function($http) {

    var urlBase = 'http://localhost:3000/api/publishers';
    var publisherFactory = {};

    publisherFactory.publisherGetAll = function () {
        return $http.get(urlBase);
    };

    publisherFactory.publisherGetById = function (id) {
        return $http.get(urlBase + '/' + id);
    };

    publisherFactory.publisherCreate = function (publisher) {
        return $http.post(urlBase, publisher);
    };

    publisherFactory.publisherUpdate = function (publisher) {
        return $http.put(urlBase + '/' + publisher.id, publisher)
    };

    publisherFactory.publisherDelete = function (id) {
        return $http.delete(urlBase + '/' + id);
    };

    publisherFactory.publisherGetPublications = function (id) {
        return $http.get(urlBase + '/' + id + '/publications');
    };
    return publisherFactory;
}]);
