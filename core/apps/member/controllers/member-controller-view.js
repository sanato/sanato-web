/**
 * MemberControllerList Controller
 */

angular
    .module('Instanto')
    .controller('MemberControllerView', ['$rootScope', '$scope', '$state', '$stateParams', '$modal', 'memberFactory', 'statusFactory', 'publicationFactory', 'partnerFactory', 'researchLineFactory', 'financedProjectFactory',  MemberControllerView]);

function MemberControllerView($rootScope, $scope, $state, $stateParams, $modal, memberFactory, statusFactory, publicationFactory, partnerFactory, researchLineFactory, financedProjectFactory) {
   
    $scope.$on('member_updated', function() {
        $scope.memberGetById($stateParams.memberid);
        $scope.memberGetPrimaryPublications($stateParams.memberid);
        $scope.memberGetStudentWorks($stateParams.memberid);
        $scope.memberGetPrimaryLeaderedFinancedProjects($stateParams.memberid);
        $scope.memberGetSecondaryStatuses($stateParams.memberid);
        $scope.memberGetSecondaryPublications($stateParams.memberid);
        $scope.memberGetPartners($stateParams.memberid);
        $scope.memberGetResearchLines($stateParams.memberid);
        $scope.memberGetFinancedProjects($stateParams.memberid);
        $scope.memberGetSecondaryLeaderedFinancedProjects($stateParams.memberid);
    });

    $scope.$on('member_updated_only', function() {
        $scope.memberGetById($stateParams.memberid);
    });


    $scope.doClickPhoto = function() {
        var element = document.getElementById("file-input-photo");
        element.click();
    };

    $scope.doClickCv = function() {
        var element = document.getElementById("file-input-cv");
        element.click();
    };

    $scope.handleFileUploadCv = function(element) {
        var file = element.files.item(0);
        var reader2 = new FileReader();
        reader2.onload = function(e) {
            var data = reader2.result;
            memberFactory.memberUpdateCv($scope.member, file.name, data)
                .success(function(data) {
                    $rootScope.$broadcast("member_updated_only");
                })
                .error(function(data, status) {

                });
        }
        reader2.readAsArrayBuffer(file);
    };

    $scope.handleFileUploadPhoto = function(element) {
        var file = element.files.item(0);
        var reader2 = new FileReader();
        reader2.onload = function(e) {
            var data = reader2.result;
            memberFactory.memberUpdatePhoto($scope.member, file.name, data)
                .success(function(data) {
                    $rootScope.$broadcast("member_updated_only");
                })
                .error(function(data, status) {

                });
        }
        reader2.readAsArrayBuffer(file);
    };

    $scope.memberGetById = function(memberid) {
    	memberFactory.memberGetById(memberid)
            .success(function(data) {
                $scope.member = data;
                statusFactory.statusGetById($scope.member.primary_status)
                    .success(function(data) {
                        $scope.member.primary_status_doc = data;
                    })
                    .error(function(data, errcode) {
                        //console.log(data, errcode);
                    })
            })
            .error(function(data, member) {
                //console.log(data,member);
            });
    }

    $scope.memberDeleteCv = function(member) {
        memberFactory.memberDeleteCv(member)
            .success(function(data) {
                $rootScope.$broadcast("member_updated_only");
            })
            .error(function(data, status) {
                console.log(status);
            });
    }

    $scope.memberDeletePhoto = function(member) {
        memberFactory.memberDeletePhoto(member)
            .success(function(data) {
                $rootScope.$broadcast("member_updated_only");
            })
            .error(function(data, status) {
                console.log(status);
            });
    }

    $scope.memberDelete = function(id) {
        console.log('deleting from view');
        memberFactory.memberDelete(id)
            .success(function(data) {
                $state.go('member-list');
            })
            .error(function(data, error) {
                //console.log(data, error);
            })
    }

    $scope.memberGetPrimaryPublications = function(id) {
        memberFactory.memberGetPrimaryPublications(id)
            .success(function(data) {
                $scope.member_primary_publications = data.publications ? data.publications : [];
                $scope.member_primary_publications_copy = [].concat($scope.member_primary_publications);
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.memberGetStudentWorks = function(id) {
        memberFactory.memberGetStudentWorks(id)
            .success(function(data) {
                $scope.member_student_works = data.student_works ? data.student_works : [];
                $scope.member_student_works_copy = [].concat($scope.member_student_works);
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.memberGetPrimaryLeaderedFinancedProjects = function(id) {
        memberFactory.memberGetPrimaryLeaderedFinancedProjects(id)
            .success(function(data) {
                $scope.member_primary_leadered_financed_projects = data.financed_projects ? data.financed_projects : [];
                $scope.member_primary_leadered_financed_projects_copy = [].concat($scope.member_primary_leadered_financed_projects);
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.memberGetSecondaryStatuses = function(id) {
        memberFactory.memberGetSecondaryStatuses(id)
            .success(function(data) {
                $scope.member_secondary_statuses = data.statuses ? data.statuses : [];
                $scope.member_secondary_statuses_copy = [].concat($scope.member_secondary_statuses);
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.memberAddSecondaryStatus = function(id, statusid) {
        memberFactory.memberAddSecondaryStatus(id, statusid)
            .success(function(data) {
                $rootScope.$broadcast('member_updated');
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.memberRemoveSecondaryStatus = function(id, statusid) {
        memberFactory.memberRemoveSecondaryStatus(id, statusid)
            .success(function(data) {
                $rootScope.$broadcast("member_updated");
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.memberGetSecondaryPublications = function(id) {
        memberFactory.memberGetSecondaryPublications(id)
            .success(function(data) {
                $scope.member_secondary_publications = data.publications ? data.publications : [];
                $scope.member_secondary_publications_copy = [].concat($scope.member_secondary_publications);
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.memberAddSecondaryPublication = function(id, publicationid) {
        memberFactory.memberAddSecondaryPublication(id, publicationid)
            .success(function(data) {
                $rootScope.$broadcast('member_updated');
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.memberRemoveSecondaryPublication = function(id, publicationid) {
        memberFactory.memberRemoveSecondaryPublication(id, publicationid)
            .success(function(data) {
                $rootScope.$broadcast("member_updated");
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.memberGetPartners = function(id) {
        memberFactory.memberGetPartners(id)
            .success(function(data) {
                $scope.member_partners = data.partners ? data.partners : [];
                $scope.member_partners_copy = [].concat($scope.member_partners);
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.memberAddPartner = function(id, partnerid) {
        memberFactory.memberAddPartner(id, partnerid)
            .success(function(data) {
                $rootScope.$broadcast('member_updated');
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.memberRemovePartner = function(id, partnerid) {
        memberFactory.memberRemovePartner(id, partnerid)
            .success(function(data) {
                $rootScope.$broadcast("member_updated");
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.memberGetResearchLines = function(id) {
        memberFactory.memberGetResearchLines(id)
            .success(function(data) {
                $scope.member_research_lines = data.research_lines ? data.research_lines : [];
                $scope.member_research_lines_copy = [].concat($scope.member_research_lines);
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.memberAddResearchLine = function(id, researchlineid) {
        memberFactory.memberAddResearchLine(id, researchlineid)
            .success(function(data) {
                $rootScope.$broadcast('member_updated');
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.memberRemoveResearchLine = function(id, researchlineid) {
        memberFactory.memberRemoveResearchLine(id, researchlineid)
            .success(function(data) {
                $rootScope.$broadcast("member_updated");
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.memberGetFinancedProjects = function(id) {
        memberFactory.memberGetFinancedProjects(id)
            .success(function(data) {
                $scope.member_financed_projects = data.financed_projects ? data.financed_projects : [];
                $scope.member_financed_projects_copy = [].concat($scope.member_financed_projects);
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.memberAddFinancedProject = function(id, financedprojectid) {
        memberFactory.memberAddFinancedProject(id, financedprojectid)
            .success(function(data) {
                $rootScope.$broadcast('member_updated');
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.memberRemoveFinancedProject = function(id, financedprojectid) {
        memberFactory.memberRemoveFinancedProject(id, financedprojectid)
            .success(function(data) {
                $rootScope.$broadcast("member_updated");
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.memberGetSecondaryLeaderedFinancedProjects = function(id) {
        memberFactory.memberGetSecondaryLeaderedFinancedProjects(id)
            .success(function(data) {
                $scope.member_secondary_leadered_financed_projects = data.financed_projects ? data.financed_projects : [];
                $scope.member_secondary_leadered_financed_projects_copy = [].concat($scope.member_secondary_leadered_financed_projects);
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.memberAddSecondaryLeaderedFinancedProject = function(id, financedprojectid) {
        memberFactory.memberAddSecondaryLeaderedFinancedProject(id, financedprojectid)
            .success(function(data) {
                $rootScope.$broadcast('member_updated');
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.memberRemoveSecondaryLeaderedFinancedProject = function(id, financedprojectid) {
        memberFactory.memberRemoveSecondaryLeaderedFinancedProject(id, financedprojectid)
            .success(function(data) {
                $rootScope.$broadcast("member_updated");
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }


    $scope.openUpdateForm = function(member) {
        publicationFactory.publicationGetAll()
        .success(function(data) {
            $scope.publicationes = data.publicationes ? data.publicationes : [];
            $scope.memberZ = angular.copy(member);
            $modal.open({
                templateUrl: 'core/apps/member/views/member-update.html',
                controller: 'MemberControllerList',
                scope: $scope,
                backdrop: 'static'
            });
        })
        .error(function(data, publication) {
            console.log(data,publication);
        });
    }

    $scope.openAddSecondaryStatusForm = function() {
        $scope.statuses_to_add = [];
        var blacklist = $scope.member_secondary_statuses;
        var blacklistIds = blacklist.map(function(status) {
            return status.id;
        });

        blacklistIds.push($scope.member.primary_status);

        statusFactory.statusGetAll()
            .success(function(data) {
                var statuses = data.statuses ? data.statuses : [];
                statuses.forEach(function(status) {
                    if (blacklistIds.indexOf(status.id) === -1) {
                        $scope.statuses_to_add.push(status);
                    }
                });
                $modal.open({
                    templateUrl: 'core/apps/member/views/member-add-secondary-status.html',
                    controller: 'MemberControllerView',
                    scope: $scope,
                    backdrop: 'static'
                });
            })
            .error(function(data, error) {
                console.log(data, error);
            });
    }

    $scope.openAddSecondaryPublicationForm = function() {
        $scope.publications_to_add = [];
        var blacklist = $scope.member_secondary_publications.concat($scope.member_primary_publications);
        var blacklistIds = blacklist.map(function(pub) {
            return pub.id;
        });

        publicationFactory.publicationGetAll()
            .success(function(data) {
                var publications = data.publications ? data.publications : [];
                publications.forEach(function(publication) {
                    if (blacklistIds.indexOf(publication.id) === -1) {
                        $scope.publications_to_add.push(publication);
                    }
                });
                $modal.open({
                    templateUrl: 'core/apps/member/views/member-add-secondary-publication.html',
                    controller: 'MemberControllerView',
                    scope: $scope,
                    backdrop: 'static'
                });
            })
            .error(function(data, error) {
                console.log(data, error);
            });
    }

    $scope.openAddPartnerForm = function() {
        $scope.partners_to_add = [];
        var blacklist = $scope.member_partners;
        var blacklistIds = blacklist.map(function(partner) {
            return partner.id;
        });

        partnerFactory.partnerGetAll()
            .success(function(data) {
                var partners = data.partners ? data.partners : [];
                partners.forEach(function(partner) {
                    if (blacklistIds.indexOf(partner.id) === -1) {
                        $scope.partners_to_add.push(partner);
                    }
                });
                $modal.open({
                    templateUrl: 'core/apps/member/views/member-add-partner.html',
                    controller: 'MemberControllerView',
                    scope: $scope,
                    backdrop: 'static'
                });
            })
            .error(function(data, error) {
                console.log(data, error);
            });
    }
    $scope.openAddResearchLineForm = function() {
        $scope.research_lines_to_add = [];
        var blacklist = $scope.member_research_lines;
        var blacklistIds = blacklist.map(function(research_line) {
            return research_line.id;
        });

        researchLineFactory.researchLineGetAll()
            .success(function(data) {
                var research_lines = data.research_lines ? data.research_lines : [];
                research_lines.forEach(function(research_line) {
                    if (blacklistIds.indexOf(research_line.id) === -1) {
                        $scope.research_lines_to_add.push(research_line);
                    }
                });
                $modal.open({
                    templateUrl: 'core/apps/member/views/member-add-research-line.html',
                    controller: 'MemberControllerView',
                    scope: $scope,
                    backdrop: 'static'
                });
            })
            .error(function(data, error) {
                console.log(data, error);
            });
    }

    $scope.openAddFinancedProjectForm = function() {
        $scope.financed_projects_to_add = [];
        var blacklist = $scope.member_financed_projects;
        var blacklistIds = blacklist.map(function(financed_project) {
            return financed_project.id;
        });

        financedProjectFactory.financedProjectGetAll()
            .success(function(data) {
                var financed_projects = data.financed_projects ? data.financed_projects : [];
                financed_projects.forEach(function(financed_project) {
                    if (blacklistIds.indexOf(financed_project.id) === -1) {
                        $scope.financed_projects_to_add.push(financed_project);
                    }
                });
                $modal.open({
                    templateUrl: 'core/apps/member/views/member-add-financed-project.html',
                    controller: 'MemberControllerView',
                    scope: $scope,
                    backdrop: 'static'
                });
            })
            .error(function(data, error) {
                console.log(data, error);
            });
    }

    $scope.openAddSecondaryLeaderedFinancedProjectForm = function() {
        $scope.secondary_leadered_financed_projects_to_add = [];
        var blacklist = $scope.member_secondary_leadered_financed_projects.concat($scope.member_primary_leadered_financed_projects);
        var blacklistIds = blacklist.map(function(fp) {
            return fp.id;
        });

        financedProjectFactory.financedProjectGetAll()
            .success(function(data) {
                var financed_projects = data.financed_projects ? data.financed_projects : [];
                financed_projects.forEach(function(financed_project) {
                    if (blacklistIds.indexOf(financed_project.id) === -1) {
                        $scope.secondary_leadered_financed_projects_to_add.push(financed_project);
                    }
                });
                $modal.open({
                    templateUrl: 'core/apps/member/views/member-add-secondary-leadered-financed-project.html',
                    controller: 'MemberControllerView',
                    scope: $scope,
                    backdrop: 'static'
                });
            })
            .error(function(data, error) {
                console.log(data, error);
            });
    }

    $scope.memberGetById($stateParams.memberid);
    $scope.memberGetPrimaryPublications($stateParams.memberid);
    $scope.memberGetStudentWorks($stateParams.memberid);
    $scope.memberGetPrimaryLeaderedFinancedProjects($stateParams.memberid);
    $scope.memberGetSecondaryStatuses($stateParams.memberid);
    $scope.memberGetSecondaryPublications($stateParams.memberid);
    $scope.memberGetPartners($stateParams.memberid);
    $scope.memberGetResearchLines($stateParams.memberid);
    $scope.memberGetFinancedProjects($stateParams.memberid);
    $scope.memberGetSecondaryLeaderedFinancedProjects($stateParams.memberid);

}
