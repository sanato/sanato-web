angular.module('Instanto')
    .factory('articleFactory', ['$http', function($http) {

    var urlBase = 'http://localhost:3000/api/articles';
    var articleFactory = {};

    articleFactory.articleGetAll = function () {
        return $http.get(urlBase);
    };

    articleFactory.articleGetById = function (id) {
        return $http.get(urlBase + '/' + id);
    };

    articleFactory.articleCreate = function (article) {
        return $http.post(urlBase, article);
    };

    articleFactory.articleUpdate = function (article) {
        return $http.put(urlBase + '/' + article.id, article)
    };

    articleFactory.articleDelete = function (id) {
        return $http.delete(urlBase + '/' + id);
    };

    articleFactory.articleGetResearchLines = function (id) {
        return $http.get(urlBase + '/' + id + '/researchlines');
    };

    articleFactory.articleAddResearchLine = function (id, researchlineid) {
        return $http.post(urlBase + '/' + id + '/researchlines', {research_line: researchlineid});
    };

    articleFactory.articleRemoveResearchLine = function (id, researchlineid) {
        return $http.delete(urlBase + '/' + id + '/researchlines', {data:{research_line: researchlineid}});
    };
    
    return articleFactory;
}]);
