/**
 * ResearchLineControllerView Controller
 */

angular
    .module('Instanto')
    .controller('ResearchLineControllerView', ['$rootScope', '$scope', '$state', '$stateParams', '$modal', 'researchLineFactory', 'researchAreaFactory', 'financedProjectFactory', 'articleFactory', 'partnerFactory', 'memberFactory', 'publicationFactory', 'studentWorkFactory',  ResearchLineControllerView]);

function ResearchLineControllerView($rootScope, $scope, $state, $stateParams, $modal, researchLineFactory, researchAreaFactory, financedProjectFactory, articleFactory, partnerFactory, memberFactory, publicationFactory, studentWorkFactory) {
    $scope.$on('research_line_updated', function() {
        $scope.researchLineGetById($stateParams.researchlineid);
        $scope.researchLineGetFinancedProjects($stateParams.researchlineid);
        $scope.researchLineGetArticles($stateParams.researchlineid);
        $scope.researchLineGetPartners($stateParams.researchlineid);
        $scope.researchLineGetMembers($stateParams.researchlineid);
        $scope.researchLineGetPublications($stateParams.researchlineid);
        $scope.researchLineGetStudentWorks($stateParams.researchlineid);
        $scope.researchLineGetSecondaryResearchAreas($stateParams.researchlineid);
    });

    $scope.$on('research_line_updated', function() {
        $scope.researchLineGetById($stateParams.researchlineid);
    });

    $scope.$on('research_line_updated_only', function() {
        $scope.researchLineGetById($stateParams.researchlineid);
    });


    $scope.doClick = function() {
        var element = document.getElementById("file-input");
        element.click();
    };

    $scope.handleFileUpload = function(element) {
        var file = element.files.item(0);
        var reader2 = new FileReader();
        reader2.onload = function(e) {
            var data = reader2.result;
            researchLineFactory.researchLineUpdateLogo($scope.research_line, file.name, data)
                .success(function(data) {
                    $rootScope.$broadcast("research_line_updated_only");
                })
                .error(function(data, status) {

                });
        }
        reader2.readAsArrayBuffer(file);
    };

    $scope.researchLineGetById = function(researchlineid) {
    	researchLineFactory.researchLineGetById(researchlineid)
            .success(function(data) {
                $scope.research_line = data;
                researchAreaFactory.researchAreaGetById($scope.research_line.primary_research_area)
                    .success(function(data) {
                        $scope.research_line.primary_research_area_doc = data;
                    })
                    .error(function(data, status) {
                        console.log(data, status);
                    })
            })
            .error(function(data, research_line) {
                console.log(data,research_line);
            });
    }

    $scope.researchLineDelete = function(id) {
        researchLineFactory.researchLineDelete(id)
            .success(function(data) {
                $state.go('research-line-list');
            })
            .error(function(data, status) {
                console.log(data, status);
            })
    }

     $scope.researchLineUpdate = function(research_line) {
        researchLineFactory.researchLineUpdate(research_line)
            .success(function(data) {
                $rootScope.$broadcast('research_line_updated');
                $scope.$close();
            })
            .error(function(data, status) {
                console.log(data, status);
            })
    }

    $scope.researchLineDeleteLogo = function(research_line) {
        researchLineFactory.researchLineDeleteLogo(research_line)
            .success(function(data) {
                $rootScope.$broadcast("research_line_updated_only");
            })
            .error(function(data, status) {
                console.log(status);
            });
    }

    $scope.researchLineGetFinancedProjects = function(id) {
        researchLineFactory.researchLineGetFinancedProjects(id)
            .success(function(data) {
                $scope.research_line_financed_projects = data.financed_projects ? data.financed_projects : [];
                $scope.research_line_financed_projects_copy = [].concat($scope.research_line_financed_projects);
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.researchLineAddFinancedProject = function(id, financedprojectid) {
        researchLineFactory.researchLineAddFinancedProject(id, financedprojectid)
            .success(function(data) {
                $rootScope.$broadcast('research_line_updated');
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.researchLineRemoveFinancedProject = function(id, financedprojectid) {
        researchLineFactory.researchLineRemoveFinancedProject(id, financedprojectid)
            .success(function(data) {
                $rootScope.$broadcast("research_line_updated");
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.researchLineGetArticles = function(id) {
        researchLineFactory.researchLineGetArticles(id)
            .success(function(data) {
                $scope.research_line_articles = data.articles ? data.articles : [];
                $scope.research_line_articles_copy = [].concat($scope.research_line_articles);
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.researchLineAddArticle = function(id, articleid) {
        researchLineFactory.researchLineAddArticle(id, articleid)
            .success(function(data) {
                $rootScope.$broadcast('research_line_updated');
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.researchLineRemoveArticle = function(id, articleid) {
        researchLineFactory.researchLineRemoveArticle(id, articleid)
            .success(function(data) {
                $rootScope.$broadcast("research_line_updated");
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.researchLineGetPartners = function(id) {
        researchLineFactory.researchLineGetPartners(id)
            .success(function(data) {
                $scope.research_line_partners = data.partners ? data.partners : [];
                $scope.research_line_partners_copy = [].concat($scope.research_line_partners);
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.researchLineAddPartner = function(id, partnerid) {
        researchLineFactory.researchLineAddPartner(id, partnerid)
            .success(function(data) {
                $rootScope.$broadcast('research_line_updated');
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.researchLineRemovePartner = function(id, partnerid) {
        researchLineFactory.researchLineRemovePartner(id, partnerid)
            .success(function(data) {
                $rootScope.$broadcast("research_line_updated");
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.researchLineGetMembers = function(id) {
        researchLineFactory.researchLineGetMembers(id)
            .success(function(data) {
                $scope.research_line_members = data.members ? data.members : [];
                $scope.research_line_members_copy = [].concat($scope.research_line_members);
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.researchLineAddMember = function(id, memberid) {
        researchLineFactory.researchLineAddMember(id, memberid)
            .success(function(data) {
                $rootScope.$broadcast('research_line_updated');
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.researchLineRemoveMember = function(id, memberid) {
        researchLineFactory.researchLineRemoveMember(id, memberid)
            .success(function(data) {
                $rootScope.$broadcast("research_line_updated");
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.researchLineGetPublications = function(id) {
        researchLineFactory.researchLineGetPublications(id)
            .success(function(data) {
                $scope.research_line_publications = data.publications ? data.publications : [];
                $scope.research_line_publications_copy = [].concat($scope.research_line_publications);
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.researchLineAddPublication = function(id, publicationid) {
        researchLineFactory.researchLineAddPublication(id, publicationid)
            .success(function(data) {
                $rootScope.$broadcast('research_line_updated');
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.researchLineRemovePublication = function(id, publicationid) {
        researchLineFactory.researchLineRemovePublication(id, publicationid)
            .success(function(data) {
                $rootScope.$broadcast("research_line_updated");
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.researchLineGetStudentWorks = function(id) {
        researchLineFactory.researchLineGetStudentWorks(id)
            .success(function(data) {
                $scope.research_line_student_works = data.student_works ? data.student_works : [];
                $scope.research_line_student_works_copy = [].concat($scope.research_line_student_works);
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.researchLineAddStudentWork = function(id, studentworkid) {
        researchLineFactory.researchLineAddStudentWork(id, studentworkid)
            .success(function(data) {
                $rootScope.$broadcast('research_line_updated');
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.researchLineRemoveStudentWork = function(id, studentworkid) {
        researchLineFactory.researchLineRemoveStudentWork(id, studentworkid)
            .success(function(data) {
                $rootScope.$broadcast("research_line_updated");
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.researchLineGetSecondaryResearchAreas = function(id) {
        researchLineFactory.researchLineGetSecondaryResearchAreas(id)
            .success(function(data) {
                $scope.research_line_secondary_research_areas = data.research_areas ? data.research_areas : [];
                $scope.research_line_secondary_research_areas_copy = [].concat($scope.research_line_secondary_research_areas);
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.researchLineAddSecondaryResearchArea = function(id, researchareaid) {
        researchLineFactory.researchLineAddSecondaryResearchArea(id, researchareaid)
            .success(function(data) {
                $rootScope.$broadcast('research_line_updated');
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.researchLineRemoveSecondaryResearchArea = function(id, researchareaid) {
        researchLineFactory.researchLineRemoveSecondaryResearchArea(id, researchareaid)
            .success(function(data) {
                $rootScope.$broadcast("research_line_updated");
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }


    $scope.openUpdateForm = function(research_line) {
        researchAreaFactory.researchAreaGetAll()
            .success(function(data) {
                $scope.research_areas = data.research_areas;
                $scope.research_lineZ = angular.copy(research_line);
                $modal.open({
                    templateUrl: 'core/apps/research-line/views/research-line-update.html',
                    controller: 'ResearchLineControllerView',
                    scope: $scope,
                    backdrop: 'static'
                });
            })
            .error(function(data, status) {
                console.log(data, status);
            })
    }

    

    $scope.openAddFinancedProjectForm = function() {
        $scope.articles_to_add = [];
        var blacklist = $scope.research_line_financed_projects;
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
                    templateUrl: 'core/apps/research-line/views/research-line-add-financed-project.html',
                    controller: 'ResearchLineControllerView',
                    scope: $scope,
                    backdrop: 'static'
                });
            })
            .error(function(data, error) {
                console.log(data, error);
            });
    }

    $scope.openAddArticleForm = function() {
        $scope.articles_to_add = [];
        var blacklist = $scope.research_line_articles;
        var blacklistIds = blacklist.map(function(article) {
            return article.id;
        });

        articleFactory.articleGetAll()
            .success(function(data) {
                var articles = data.articles ? data.articles : [];
                articles.forEach(function(article) {
                    if (blacklistIds.indexOf(article.id) === -1) {
                        $scope.articles_to_add.push(article);
                    }
                });
                $modal.open({
                    templateUrl: 'core/apps/research-line/views/research-line-add-article.html',
                    controller: 'ResearchLineControllerView',
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

        var blacklist = $scope.research_line_partners;
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
                    templateUrl: 'core/apps/research-line/views/research-line-add-partner.html',
                    controller: 'ResearchLineControllerView',
                    scope: $scope,
                    backdrop: 'static'
                });
            })
            .error(function(data, error) {
                console.log(data, error);
            });
    }

    $scope.openAddMemberForm = function() {
        $scope.members_to_add = [];

        var blacklist = $scope.research_line_members;
        var blacklistIds = blacklist.map(function(member) {
            return member.id;
        });

        memberFactory.memberGetAll()
            .success(function(data) {
                var members = data.members ? data.members : [];
                members.forEach(function(member) {
                    if (blacklistIds.indexOf(member.id) === -1) {
                        $scope.members_to_add.push(member);
                    }
                });
                $modal.open({
                    templateUrl: 'core/apps/research-line/views/research-line-add-member.html',
                    controller: 'ResearchLineControllerView',
                    scope: $scope,
                    backdrop: 'static'
                });
            })
            .error(function(data, error) {
                console.log(data, error);
            });
    }

    $scope.openAddPublicationForm = function() {
        $scope.publications_to_add = [];

        var blacklist = $scope.research_line_publications;
        var blacklistIds = blacklist.map(function(publication) {
            return publication.id;
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
                    templateUrl: 'core/apps/research-line/views/research-line-add-publication.html',
                    controller: 'ResearchLineControllerView',
                    scope: $scope,
                    backdrop: 'static'
                });
            })
            .error(function(data, error) {
                console.log(data, error);
            });
    }

    $scope.openAddStudentWorkForm = function() {
        $scope.student_works_to_add = [];

        var blacklist = $scope.research_line_student_works;
        var blacklistIds = blacklist.map(function(student_work) {
            return student_work.id;
        });

        studentWorkFactory.studentWorkGetAll()
            .success(function(data) {
                var student_works = data.student_works ? data.student_works : [];
                student_works.forEach(function(student_work) {
                    if (blacklistIds.indexOf(student_work.id) === -1) {
                        $scope.student_works_to_add.push(student_work);
                    }
                });
                $modal.open({
                    templateUrl: 'core/apps/research-line/views/research-line-add-student-work.html',
                    controller: 'ResearchLineControllerView',
                    scope: $scope,
                    backdrop: 'static'
                });
            })
            .error(function(data, error) {
                console.log(data, error);
            });
    }

    $scope.openAddSecondaryResearchAreaForm = function() {
        $scope.research_areas_to_add = [];

        var blacklist = $scope.research_line_secondary_research_areas;
        var blacklistIds = blacklist.map(function(research_area) {
            return research_area.id;
        });

        blacklistIds.push($scope.research_line.primary_research_area);

        researchAreaFactory.researchAreaGetAll()
            .success(function(data) {
                var research_areas = data.research_areas ? data.research_areas : [];
                research_areas.forEach(function(research_area) {
                    if (blacklistIds.indexOf(research_area.id) === -1) {
                        $scope.research_areas_to_add.push(research_area);
                    }
                });
                $modal.open({
                    templateUrl: 'core/apps/research-line/views/research-line-add-secondary-research-area.html',
                    controller: 'ResearchLineControllerView',
                    scope: $scope,
                    backdrop: 'static'
                });
            })
            .error(function(data, error) {
                console.log(data, error);
            });
    }


    $scope.researchLineGetById($stateParams.researchlineid);
    $scope.researchLineGetFinancedProjects($stateParams.researchlineid);
    $scope.researchLineGetArticles($stateParams.researchlineid);
    $scope.researchLineGetPartners($stateParams.researchlineid);
    $scope.researchLineGetMembers($stateParams.researchlineid);
    $scope.researchLineGetPublications($stateParams.researchlineid);
    $scope.researchLineGetStudentWorks($stateParams.researchlineid);
    $scope.researchLineGetSecondaryResearchAreas($stateParams.researchlineid);

}
