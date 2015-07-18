angular.module('Instanto')
    .factory('publicationFactory', ['$http', function($http) {

    var urlBase = 'http://localhost:3000/api/publications';
    var publicationFactory = {};

    publicationFactory.publicationGetAll = function () {
        return $http.get(urlBase);
    };

    publicationFactory.publicationGetById = function (id) {
        return $http.get(urlBase + '/' + id);
    };

    publicationFactory.publicationCreate = function (publication) {
        return $http.post(urlBase, publication);
    };

    publicationFactory.publicationUpdate = function (publication) {
        return $http.put(urlBase + '/' + publication.id, publication)
    };

    publicationFactory.publicationDelete = function (id) {
        return $http.delete(urlBase + '/' + id);
    };

    publicationFactory.publicationGetResearchLines = function (id) {
        return $http.get(urlBase + '/' + id + '/researchlines');
    };

    publicationFactory.publicationAddResearchLine = function (id, researchlineid) {
        return $http.post(urlBase + '/' + id + '/researchlines', {research_line: researchlineid});
    };

    publicationFactory.publicationRemoveResearchLine = function (id, researchlineid) {
        return $http.delete(urlBase + '/' + id + '/researchlines', {data:{research_line: researchlineid}});
    };

    publicationFactory.publicationGetSecondaryAuthors = function (id) {
        return $http.get(urlBase + '/' + id + '/secondaryauthors');
    };

    publicationFactory.publicationAddSecondaryAuthor = function (id, secondaryauthorid) {
        return $http.post(urlBase + '/' + id + '/secondaryauthors', {member: secondaryauthorid});
    };

    publicationFactory.publicationRemoveSecondaryAuthor = function (id, secondaryauthorid) {
        return $http.delete(urlBase + '/' + id + '/secondaryauthors', {data:{member: secondaryauthorid}});
    };
    
    return publicationFactory;
}]);
