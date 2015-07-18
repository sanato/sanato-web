angular.module('Instanto')
    .factory('financedProjectFactory', ['$http', function($http) {

    var urlBase = 'http://localhost:3000/api/financedprojects';
    var financedProjectFactory = {};

    financedProjectFactory.financedProjectGetAll = function () {
        return $http.get(urlBase);
    };

    financedProjectFactory.financedProjectGetById = function (id) {
        return $http.get(urlBase + '/' + id);
    };

    financedProjectFactory.financedProjectCreate = function (financedProject) {
        return $http.post(urlBase, financedProject);
    };

    financedProjectFactory.financedProjectUpdate = function (financedProject) {
        return $http.put(urlBase + '/' + financedProject.id, financedProject)
    };

    financedProjectFactory.financedProjectDelete = function (id) {
        return $http.delete(urlBase + '/' + id);
    };

    financedProjectFactory.financedProjectGetResearchLines = function (id) {
        return $http.get(urlBase + '/' + id + '/researchlines');
    };

    financedProjectFactory.financedProjectAddResearchLine = function (id, researchlineid) {
        return $http.post(urlBase + '/' + id + '/researchlines', {research_line: researchlineid});
    };

    financedProjectFactory.financedProjectRemoveResearchLine = function (id, researchlineid) {
        return $http.delete(urlBase + '/' + id + '/researchlines', {data:{research_line: researchlineid}});
    };

    financedProjectFactory.financedProjectGetSecondaryFundingBodies = function (id) {
        return $http.get(urlBase + '/' + id + '/secondaryfundingbodies');
    };

    financedProjectFactory.financedProjectAddSecondaryFundingBody = function (id, fundingbodyid, record) {
        return $http.post(urlBase + '/' + id + '/secondaryfundingbodies', {funding_body: fundingbodyid, record: record});
    };

    financedProjectFactory.financedProjectRemoveSecondaryFundingBody = function (id, fundingbodyid) {
        return $http.delete(urlBase + '/' + id + '/secondaryfundingbodies', {data:{funding_body: fundingbodyid}});
    };

    financedProjectFactory.financedProjectGetSecondaryLeaders = function (id) {
        return $http.get(urlBase + '/' + id + '/secondaryleaders');
    };

    financedProjectFactory.financedProjectAddSecondaryLeader = function (id, leaderid) {
        return $http.post(urlBase + '/' + id + '/secondaryleaders', {leader: leaderid});
    };

    financedProjectFactory.financedProjectRemoveSecondaryLeader = function (id, leaderid) {
        return $http.delete(urlBase + '/' + id + '/secondaryleaders', {data:{leader: leaderid}});
    };

    financedProjectFactory.financedProjectGetMembers = function (id) {
        return $http.get(urlBase + '/' + id + '/members');
    };

    financedProjectFactory.financedProjectAddMember = function (id, memberid) {
        return $http.post(urlBase + '/' + id + '/members', {member: memberid});
    };

    financedProjectFactory.financedProjectRemoveMember = function (id, memberid) {
        return $http.delete(urlBase + '/' + id + '/members', {data:{member: memberid}});
    };
    
    return financedProjectFactory;
}]);
