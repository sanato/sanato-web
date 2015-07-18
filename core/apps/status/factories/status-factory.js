angular.module('Instanto')
    .factory('statusFactory', ['$http', function($http) {

    var urlBase = 'http://localhost:3000/api/statuses';
    var statusFactory = {};

    statusFactory.statusGetAll = function () {
        return $http.get(urlBase);
    };

    statusFactory.statusGetById = function (id) {
        return $http.get(urlBase + '/' + id);
    };

    statusFactory.statusCreate = function (status) {
        console.log(status, typeof status);
        return $http.post(urlBase, status);
    };

    statusFactory.statusUpdate = function (status) {
        return $http.put(urlBase + '/' + status.id, status)
    };

    statusFactory.statusDelete = function (id) {
        return $http.delete(urlBase + '/' + id);
    };

    statusFactory.statusGetPrimaryMembers = function (id) {
        return $http.get(urlBase + '/' + id + '/primarymembers');
    };

    statusFactory.statusGetSecondaryMembers = function (id) {
        return $http.get(urlBase + '/' + id + '/secondarymembers');
    };

    statusFactory.statusAddSecondaryMember = function (id, memberid) {
        return $http.post(urlBase + '/' + id + '/secondarymembers', {member: memberid});
    };

    statusFactory.statusRemoveSecondaryMember = function (id, memberid) {
        return $http.delete(urlBase + '/' + id + '/secondarymembers', {data:{member:memberid}});
    };

    return statusFactory;
}]);
