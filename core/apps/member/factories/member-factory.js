angular.module('Instanto')
    .factory('memberFactory', ['$http', function($http) {

    var urlBase = 'http://localhost:3000/api/members';
    var memberFactory = {};

    memberFactory.memberGetAll = function () {
        return $http.get(urlBase);
    };

    memberFactory.memberGetById = function (id) {
        return $http.get(urlBase + '/' + id);
    };

    memberFactory.memberCreate = function (member) {
        return $http.post(urlBase, member);
    };

    memberFactory.memberUpdate = function (member) {
        return $http.put(urlBase + '/' + member.id, member)
    };

    memberFactory.memberUpdateCv = function (member, filename, data) {
        return $http.put(urlBase + '/' + member.id + '/cv?filename=' + filename, new Uint8Array(data), {transformRequest: []})
    };

    memberFactory.memberDeleteCv = function (member) {
        return $http.delete(urlBase + '/' + member.id + '/cv')
    };

    memberFactory.memberUpdatePhoto = function (member, filename, data) {
        return $http.put(urlBase + '/' + member.id + '/photo?filename=' + filename, new Uint8Array(data), {transformRequest: []})
    };

    memberFactory.memberDeletePhoto = function (member) {
        return $http.delete(urlBase + '/' + member.id + '/photo')
    };

    memberFactory.memberDelete = function (id) {
        return $http.delete(urlBase + '/' + id);
    };

    memberFactory.memberGetPrimaryPublications = function (id) {
        return $http.get(urlBase + '/' + id + '/primarypublications');
    };

    memberFactory.memberGetStudentWorks = function (id) {
        return $http.get(urlBase + '/' + id + '/studentworks');
    };

    memberFactory.memberGetPrimaryLeaderedFinancedProjects = function (id) {
        return $http.get(urlBase + '/' + id + '/primaryleaderedfinancedprojects');
    };

    memberFactory.memberGetSecondaryStatuses = function (id) {
        return $http.get(urlBase + '/' + id + '/secondarystatuses');
    };

    memberFactory.memberAddSecondaryStatus = function (id, statusid) {
        return $http.post(urlBase + '/' + id + '/secondarystatuses', {status: statusid});
    };

    memberFactory.memberRemoveSecondaryStatus = function (id, statusid) {
        return $http.delete(urlBase + '/' + id + '/secondarystatuses', {data:{status: statusid}});
    }

    memberFactory.memberGetSecondaryPublications = function (id) {
        return $http.get(urlBase + '/' + id + '/secondarypublications');
    };

    memberFactory.memberAddSecondaryPublication = function (id, publicationid) {
        return $http.post(urlBase + '/' + id + '/secondarypublications', {publication: publicationid});
    };

    memberFactory.memberRemoveSecondaryPublication = function (id, publicationid) {
        return $http.delete(urlBase + '/' + id + '/secondarypublications', {data:{publication: publicationid}});
    };

    memberFactory.memberGetPartners = function (id) {
        return $http.get(urlBase + '/' + id + '/partners');
    };

    memberFactory.memberAddPartner = function (id, partnerid) {
        return $http.post(urlBase + '/' + id + '/partners', {partner: partnerid});
    };

    memberFactory.memberRemovePartner = function (id, partnerid) {
        return $http.delete(urlBase + '/' + id + '/partners', {data:{partner: partnerid}});
    };

    memberFactory.memberGetResearchLines = function (id) {
        return $http.get(urlBase + '/' + id + '/researchlines');
    };

    memberFactory.memberAddResearchLine = function (id, researchlineid) {
        return $http.post(urlBase + '/' + id + '/researchlines', {research_line: researchlineid});
    };

    memberFactory.memberRemoveResearchLine = function (id, researchlineid) {
        return $http.delete(urlBase + '/' + id + '/researchlines', {data:{research_line: researchlineid}});
    };

    memberFactory.memberGetFinancedProjects = function (id) {
        return $http.get(urlBase + '/' + id + '/financedprojects');
    };

    memberFactory.memberAddFinancedProject = function (id, financedprojectid) {
        return $http.post(urlBase + '/' + id + '/financedprojects', {financed_project: financedprojectid});
    };

    memberFactory.memberRemoveFinancedProject = function (id, financedprojectid) {
        return $http.delete(urlBase + '/' + id + '/financedprojects', {data:{financed_project: financedprojectid}});
    };

    memberFactory.memberGetSecondaryLeaderedFinancedProjects = function (id) {
        return $http.get(urlBase + '/' + id + '/secondaryleaderedfinancedprojects');
    };

    memberFactory.memberAddSecondaryLeaderedFinancedProject = function (id, financedprojectid) {
        return $http.post(urlBase + '/' + id + '/secondaryleaderedfinancedprojects', {financed_project: financedprojectid});
    };

    memberFactory.memberRemoveSecondaryLeaderedFinancedProject = function (id, financedprojectid) {
        return $http.delete(urlBase + '/' + id + '/secondaryleaderedfinancedprojects', {data:{financed_project: financedprojectid}});
    };

    return memberFactory;
}]);
