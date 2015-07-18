angular.module('Instanto')
    .factory('researchLineFactory', ['$http', function($http) {

    var urlBase = 'http://localhost:3000/api/researchlines';
    var researchLineFactory = {};

    researchLineFactory.researchLineGetAll = function () {
        return $http.get(urlBase);
    };

    researchLineFactory.researchLineGetById = function (id) {
        return $http.get(urlBase + '/' + id);
    };

    researchLineFactory.researchLineCreate = function (research_line) {
        return $http.post(urlBase, research_line);
    };

    researchLineFactory.researchLineUpdate = function (research_line) {
        return $http.put(urlBase + '/' + research_line.id, research_line)
    };

    researchLineFactory.researchLineUpdateLogo = function (research_line, filename, data) {
        return $http.put(urlBase + '/' + research_line.id + '/logo?filename=' + filename, new Uint8Array(data), {transformRequest: []})
    };

    researchLineFactory.researchLineDeleteLogo = function (researchLine) {
        return $http.delete(urlBase + '/' + researchLine.id + '/logo')
    };

    researchLineFactory.researchLineDelete = function (id) {
        return $http.delete(urlBase + '/' + id);
    };

    researchLineFactory.researchLineGetFinancedProjects = function (id) {
        return $http.get(urlBase + '/' + id + '/financedprojects');
    };

    researchLineFactory.researchLineAddFinancedProject = function (id, financedprojectid) {
        return $http.post(urlBase + '/' + id + '/financedprojects', {financed_project: financedprojectid});
    };

    researchLineFactory.researchLineRemoveFinancedProject = function (id, financedprojectid) {
        return $http.delete(urlBase + '/' + id + '/financedprojects', {data:{financed_project: financedprojectid}});
    };

    researchLineFactory.researchLineGetArticles = function (id) {
        return $http.get(urlBase + '/' + id + '/articles');
    };

    researchLineFactory.researchLineAddArticle = function (id, articleid) {
        console.log(id, articleid);
        return $http.post(urlBase + '/' + id + '/articles', {article: articleid});
    };

    researchLineFactory.researchLineRemoveArticle = function (id, articleid) {
        return $http.delete(urlBase + '/' + id + '/articles', {data:{article: articleid}});
    };

    researchLineFactory.researchLineGetPartners = function (id) {
        return $http.get(urlBase + '/' + id + '/partners');
    };

    researchLineFactory.researchLineAddPartner = function (id, partnerid) {
        console.log(id, partnerid);
        return $http.post(urlBase + '/' + id + '/partners', {partner: partnerid});
    };

    researchLineFactory.researchLineRemovePartner = function (id, partnerid) {
        return $http.delete(urlBase + '/' + id + '/partners', {data:{partner: partnerid}});
    };

    researchLineFactory.researchLineGetMembers = function (id) {
        return $http.get(urlBase + '/' + id + '/members');
    };

    researchLineFactory.researchLineAddMember = function (id, memberid) {
        console.log(id, memberid);
        return $http.post(urlBase + '/' + id + '/members', {member: memberid});
    };

    researchLineFactory.researchLineRemoveMember = function (id, memberid) {
        return $http.delete(urlBase + '/' + id + '/members', {data:{member: memberid}});
    };

    researchLineFactory.researchLineGetPublications = function (id) {
        return $http.get(urlBase + '/' + id + '/publications');
    };

    researchLineFactory.researchLineAddPublication = function (id, publicationid) {
        console.log(id, publicationid);
        return $http.post(urlBase + '/' + id + '/publications', {publication: publicationid});
    };

    researchLineFactory.researchLineRemovePublication = function (id, publicationid) {
        return $http.delete(urlBase + '/' + id + '/publications', {data:{publication: publicationid}});
    };

    researchLineFactory.researchLineGetStudentWorks = function (id) {
        return $http.get(urlBase + '/' + id + '/studentworks');
    };

    researchLineFactory.researchLineAddStudentWork = function (id, studentworkid) {
        console.log(id, studentworkid);
        return $http.post(urlBase + '/' + id + '/studentworks', {student_work: studentworkid});
    };

    researchLineFactory.researchLineRemoveStudentWork = function (id, studentworkid) {
        return $http.delete(urlBase + '/' + id + '/studentworks', {data:{student_work: studentworkid}});
    };

    researchLineFactory.researchLineGetSecondaryResearchAreas = function (id) {
        return $http.get(urlBase + '/' + id + '/secondaryresearchareas');
    };

    researchLineFactory.researchLineAddSecondaryResearchArea = function (id, researchareaid) {
        console.log(id, researchareaid);
        return $http.post(urlBase + '/' + id + '/secondaryresearchareas', {research_area: researchareaid});
    };

    researchLineFactory.researchLineRemoveSecondaryResearchArea = function (id, researchareaid) {
        return $http.delete(urlBase + '/' + id + '/secondaryresearchareas', {data:{research_area: researchareaid}});
    };

    return researchLineFactory;
}]);
