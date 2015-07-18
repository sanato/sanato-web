angular.module('Instanto')
    .factory('partnerFactory', ['$http', function($http) {

    var urlBase = 'http://localhost:3000/api/partners';
    var partnerFactory = {};

    partnerFactory.partnerGetAll = function () {
        return $http.get(urlBase);
    };

    partnerFactory.partnerGetById = function (id) {
        return $http.get(urlBase + '/' + id);
    };

    partnerFactory.partnerCreate = function (partner) {
        return $http.post(urlBase, partner);
    };

    partnerFactory.partnerUpdate = function (partner) {
        return $http.put(urlBase + '/' + partner.id, partner)
    };

    partnerFactory.partnerDelete = function (id) {
        return $http.delete(urlBase + '/' + id);
    };

    partnerFactory.partnerUpdateLogo = function (partner, filename, data) {
        return $http.put(urlBase + '/' + partner.id + '/logo?filename=' + filename, new Uint8Array(data), {transformRequest: []})
    };

    partnerFactory.partnerDeleteLogo = function (partner) {
        return $http.delete(urlBase + '/' + partner.id + '/logo')
    };

    partnerFactory.partnerGetMembers = function (id) {
        return $http.get(urlBase + '/' + id + '/members');
    };

    partnerFactory.partnerAddMember = function (id, memberid) {
        return $http.post(urlBase + '/' + id + '/members', {member: memberid});
    };

    partnerFactory.partnerRemoveMember = function (id, memberid) {
        return $http.delete(urlBase + '/' + id + '/members', {data:{member:memberid}});
    };

    partnerFactory.partnerGetResearchLines = function (id) {
        return $http.get(urlBase + '/' + id + '/researchlines');
    };

    partnerFactory.partnerAddResearchLine = function (id, researchlineid) {
        return $http.post(urlBase + '/' + id + '/researchlines', {research_line: researchlineid});
    };

    partnerFactory.partnerRemoveResearchLine = function (id, researchlineid) {
        return $http.delete(urlBase + '/' + id + '/researchlines', {data:{research_line: researchlineid}});
    };

    return partnerFactory;
}]);
