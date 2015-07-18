/**
 * PublicationTypeControllerList Controller
 */

angular
    .module('Instanto')
    .controller('PublicationControllerView', ['$rootScope', '$scope', '$state', '$stateParams', '$modal', 'publicationFactory', 'memberFactory', 'publicationTypeFactory', 'publisherFactory', 'researchLineFactory', PublicationControllerView]);

function PublicationControllerView($rootScope, $scope, $state, $stateParams, $modal, publicationFactory, memberFactory, publicationTypeFactory, publisherFactory, researchLineFactory) {
   
    $scope.$on('publication_updated', function() {
        $scope.publicationGetById($stateParams.publicationid);
        $scope.publicationGetResearchLines($stateParams.publicationid);
        $scope.publicationGetSecondaryAuthors($stateParams.publicationid);
    });

    $scope.publicationGetById = function(publicationid) {
    	publicationFactory.publicationGetById(publicationid)
            .success(function(data) {
                $scope.publication = data;
                memberFactory.memberGetById($scope.publication.primary_author)
                    .success(function(data) {
                        $scope.publication.primary_author_doc = data;
                        publicationTypeFactory.publicationTypeGetById($scope.publication.publication_type)
                            .success(function(data) {
                                $scope.publication.publication_type_doc = data;
                                publisherFactory.publisherGetById($scope.publication.publisher)
                                    .success(function(data) {
                                        $scope.publication.publisher_doc = data;
                                    })
                                    .error(function(data, error) {
                                        console.log(data, error);
                                    })
                            })
                            .error(function(data, status) {
                                console.log(data, status)
                            })
                    })
                    .error(function(data, status) {
                        console.log(data, status)
                    })
            })
            .error(function(data, status) {
                console.log(data,status);
            });
    }

    $scope.publicationDelete = function(id) {
        publicationFactory.publicationDelete(id)
            .success(function(data) {
                $state.go('publication-list');
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

     $scope.publicationUpdate = function(publication) {
        publicationFactory.publicationUpdate(publication)
            .success(function(data) {
                $rootScope.$broadcast('publication_updated');
                $scope.$close();
            })
            .error(function(data, status) {
                console.log(data, status);
            })
    }

    $scope.publicationGetResearchLines = function(id) {
        publicationFactory.publicationGetResearchLines(id)
            .success(function(data) {
                $scope.research_lines = data.research_lines ? data.research_lines : [];
                $scope.research_lines_copy = [].concat($scope.research_lines);
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.publicationAddResearchLine = function(id, researchlineid) {
        publicationFactory.publicationAddResearchLine(id, researchlineid)
            .success(function(data) {
                $rootScope.$broadcast('publication_updated');
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.publicationRemoveResearchLine = function(id, researchlineid) {
        publicationFactory.publicationRemoveResearchLine(id, researchlineid)
            .success(function(data) {
                $rootScope.$broadcast("publication_updated");
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }


    $scope.publicationGetSecondaryAuthors = function(id) {
        publicationFactory.publicationGetSecondaryAuthors(id)
            .success(function(data) {
                $scope.publication_secondary_authors = data.members ? data.members : [];
                $scope.publication_secondary_authors_copy = [].concat($scope.publication_secondary_authors);
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.publicationAddSecondaryAuthor = function(id, memberid) {
        publicationFactory.publicationAddSecondaryAuthor(id, memberid)
            .success(function(data) {
                $rootScope.$broadcast('publication_updated');
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

     $scope.publicationRemoveSecondaryAuthor = function(id, memberid) {
        publicationFactory.publicationRemoveSecondaryAuthor(id, memberid)
            .success(function(data) {
                $rootScope.$broadcast("publication_updated");
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.openUpdateForm = function(publication) {
        memberFactory.memberGetAll()
            .success(function(data) {
                $scope.authors = data.members ? data.members : [];
                publicationTypeFactory.publicationTypeGetAll()
                    .success(function(data) {
                        $scope.publication_types = data.publication_types ? data.publication_types : [];
                        publisherFactory.publisherGetAll()
                            .success(function(data, error) {
                                $scope.publishers = data.publishers ? data.publishers : [];
                                $scope.publicationZ = angular.copy(publication);
                                $modal.open({
                                    templateUrl: 'core/apps/publication/views/publication-update.html',
                                    controller: 'PublicationControllerView',
                                    scope: $scope,
                                    backdrop: 'static'
                                });
                            })
                    })
                    .error(function(data, status) {
                        console.log(data, status)
                    })
            })
            .error(function(data, status) {
                console.log(data, status)
            })
    }

    $scope.openAddResearchLineForm = function() {
        $scope.research_lines_to_add = [];
        var blacklist = $scope.research_lines;
        var blacklistIds = blacklist.map(function(research_line) {
            return research_line.id;
        });
        researchLineFactory.researchLineGetAll()
            .success(function(data) {
                var research_lines = data.research_lines ? data.research_lines : [];
                research_lines.forEach(function(researchLine) {
                    if (blacklistIds.indexOf(researchLine.id) === -1) {
                        $scope.research_lines_to_add.push(researchLine);
                    }
                });
                $modal.open({
                    templateUrl: 'core/apps/publication/views/publication-add-research-line.html',
                    controller: 'PublicationControllerView',
                    scope: $scope,
                    backdrop: 'static'
                });
            })
            .error(function(data, error) {
                console.log(data, error);
            });
    }

    $scope.openAddSecondaryAuthorForm = function() {
        $scope.secondary_authors_to_add = [];
        var blacklist = $scope.publication_secondary_authors; //$scope.status_primary_members.concat($scope.status_secondary_members);
        var blacklistIds = blacklist.map(function(member) {
            return member.id;
        });
        blacklistIds.push($scope.publication.primary_author)
        memberFactory.memberGetAll()
            .success(function(data) {
                var members = data.members ? data.members : [];
                members.forEach(function(member) {
                    if (blacklistIds.indexOf(member.id) === -1) {
                        $scope.secondary_authors_to_add.push(member);
                    }
                });
                $modal.open({
                    templateUrl: 'core/apps/publication/views/publication-add-secondary-author.html',
                    controller: 'PublicationControllerView',
                    scope: $scope,
                    backdrop: 'static'
                });
            })
            .error(function(data, error) {
                console.log(data, error);
            });
    }  

    $scope.publicationGetById($stateParams.publicationid);
    $scope.publicationGetResearchLines($stateParams.publicationid);
    $scope.publicationGetSecondaryAuthors($stateParams.publicationid);

}
