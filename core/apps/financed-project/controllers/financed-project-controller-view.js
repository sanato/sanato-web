/**
 * FinancedProjectControllerList Controller
 */

angular
    .module('Instanto')
    .controller('FinancedProjectControllerView', ['$rootScope', '$scope', '$state', '$stateParams', '$modal', 'financedProjectFactory', 'memberFactory', 'fundingBodyFactory', 'researchLineFactory',  FinancedProjectControllerView]);

function FinancedProjectControllerView($rootScope, $scope, $state, $stateParams, $modal, financedProjectFactory, memberFactory, fundingBodyFactory, researchLineFactory) {
   
    $scope.$on('financed_project_updated', function() {
        $scope.financedProjectGetById($stateParams.financedprojectid);
        $scope.financedProjectGetResearchLines($stateParams.financedprojectid);
        $scope.financedProjectGetSecondaryFundingBodies($stateParams.financedprojectid);
        $scope.financedProjectGetSecondaryLeaders($stateParams.financedprojectid);
        $scope.financedProjectGetMembers($stateParams.financedprojectid);
    });

    $scope.financedProjectGetById = function(financedprojectid) {
    	financedProjectFactory.financedProjectGetById(financedprojectid)
            .success(function(data) {
                $scope.financed_project = data;
                memberFactory.memberGetById($scope.financed_project.primary_leader)
                    .success(function(data) {
                        $scope.financed_project.primary_leader_doc = data;
                        fundingBodyFactory.fundingBodyGetById($scope.financed_project.primary_funding_body)
                            .success(function(data) {
                                $scope.financed_project.primary_funding_body_doc = data;
                            })
                            .error(function(data, error) {
                                console.log(data, error);
                            })
                    })
                    .error(function(data, error) {
                        console.log(data, error);
                    })
            })
            .error(function(data, financed_project) {
                console.log(data,financed_project);
            });
    }

    $scope.financedProjectDelete = function(id) {
        financedProjectFactory.financedProjectDelete(id)
            .success(function(data) {
                $state.go('financed-project-list');
            })
            .error(function(data, financed_project) {
                console.log(data, error);
            })
    }


    $scope.financedProjectUpdate = function(financed_project) {
        var financed_project_copy = angular.copy(financed_project);
        financed_project_copy.started = Math.floor(financed_project.started.getTime()/1000);
        financed_project_copy.ended = Math.floor(financed_project.ended.getTime()/1000);
        financedProjectFactory.financedProjectUpdate(financed_project_copy)
            .success(function(data) {
                $rootScope.$broadcast('financed_project_updated');
                $scope.$close();
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }


    $scope.financedProjectGetResearchLines = function(id) {
        financedProjectFactory.financedProjectGetResearchLines(id)
            .success(function(data) {
                $scope.research_lines = data.research_lines ? data.research_lines : [];
                $scope.research_lines_copy = [].concat($scope.research_lines);
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.financedProjectAddResearchLine = function(id, researchlineid) {
        financedProjectFactory.financedProjectAddResearchLine(id, researchlineid)
            .success(function(data) {
                $rootScope.$broadcast('financed_project_updated');
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.financedProjectRemoveResearchLine = function(id, researchlineid) {
        financedProjectFactory.financedProjectRemoveResearchLine(id, researchlineid)
            .success(function(data) {
                $rootScope.$broadcast("financed_project_updated");
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.financedProjectGetSecondaryFundingBodies = function(id) {
        financedProjectFactory.financedProjectGetSecondaryFundingBodies(id)
            .success(function(data) {
                $scope.financed_project_secondary_funding_bodies = data.funding_bodies ? data.funding_bodies : [];
                $scope.financed_project_secondary_funding_bodies_copy = [].concat($scope.financed_project_secondary_funding_bodies);
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.financedProjectAddSecondaryFundingBody = function(id, fundingbodyid, record) {
        financedProjectFactory.financedProjectAddSecondaryFundingBody(id, fundingbodyid, record)
            .success(function(data) {
                $rootScope.$broadcast('financed_project_updated');
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.financedProjectRemoveSecondaryFundingBody = function(id, fundingbodyid) {
        financedProjectFactory.financedProjectRemoveSecondaryFundingBody(id, fundingbodyid)
            .success(function(data) {
                $rootScope.$broadcast("financed_project_updated");
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.financedProjectGetSecondaryLeaders = function(id) {
        financedProjectFactory.financedProjectGetSecondaryLeaders(id)
            .success(function(data) {
                $scope.financed_project_secondary_leaders = data.members ? data.members : [];
                $scope.financed_project_secondary_leaders_copy = [].concat($scope.financed_project_secondary_leaders);
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.financedProjectAddSecondaryLeader = function(id, leaderid) {
        financedProjectFactory.financedProjectAddSecondaryLeader(id, leaderid)
            .success(function(data) {
                $rootScope.$broadcast('financed_project_updated');
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.financedProjectRemoveSecondaryLeader = function(id, leaderid) {
        financedProjectFactory.financedProjectRemoveSecondaryLeader(id, leaderid)
            .success(function(data) {
                $rootScope.$broadcast("financed_project_updated");
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.financedProjectGetMembers = function(id) {
        financedProjectFactory.financedProjectGetMembers(id)
            .success(function(data) {
                $scope.financed_project_members = data.members ? data.members : [];
                $scope.financed_project_members_copy = [].concat($scope.financed_project_members);
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.financedProjectAddMember = function(id, memberid) {
        financedProjectFactory.financedProjectAddMember(id, memberid)
            .success(function(data) {
                $rootScope.$broadcast('financed_project_updated');
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.financedProjectRemoveMember = function(id, memberid) {
        financedProjectFactory.financedProjectRemoveMember(id, memberid)
            .success(function(data) {
                $rootScope.$broadcast("financed_project_updated");
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.openUpdateForm = function(financed_project) {
        $scope.financed_projectZ = angular.copy(financed_project);
        $scope.financed_projectZ.started = new Date(financed_project.started*1000);
        $scope.financed_projectZ.ended = new Date(financed_project.ended*1000);
        fundingBodyFactory.fundingBodyGetAll()
            .success(function(data) {
                $scope.funding_bodies = data.funding_bodies ? data.funding_bodies : [];
                memberFactory.memberGetAll()
                    .success(function(data) {
                        $scope.leaders = data.members ? data.members : [];
                        $modal.open({
                            templateUrl: 'core/apps/financed-project/views/financed-project-update.html',
                            controller: 'FinancedProjectControllerList',
                            scope: $scope,
                            backdrop: 'static'
                        });
                    })
                    .error(function(data, error) {
                        console.log(data, error);
                    })
            })
            .error(function(data, status) {
                console.log(data, status);
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
                    templateUrl: 'core/apps/financed-project/views/financed-project-add-research-line.html',
                    controller: 'FinancedProjectControllerView',
                    scope: $scope,
                    backdrop: 'static'
                });
            })
            .error(function(data, error) {
                console.log(data, error);
            });
    }

    $scope.openAddSecondaryFundingBodyForm = function() {
         $scope.secondary_funding_bodies_to_add = [];
        var blacklist = $scope.financed_project_secondary_funding_bodies;
        var blacklistIds = blacklist.map(function(fp) {
            return fp.id;
        });

        blacklistIds.push($scope.financed_project.primary_funding_body);

        fundingBodyFactory.fundingBodyGetAll()
            .success(function(data) {
                var funding_bodies = data.funding_bodies ? data.funding_bodies : [];
                funding_bodies.forEach(function(fb) {
                    if (blacklistIds.indexOf(fb.id) === -1) {
                        $scope.secondary_funding_bodies_to_add.push(fb);
                    }
                });
                $modal.open({
                    templateUrl: 'core/apps/financed-project/views/financed-project-add-secondary-funding-body.html',
                    controller: 'FinancedProjectControllerView',
                    scope: $scope,
                    backdrop: 'static'
                });
            })
            .error(function(data, error) {
                console.log(data, error);
            });
    }

    $scope.openAddSecondaryLeaderForm = function() {
         $scope.secondary_leaders_to_add = [];
        var blacklist = $scope.financed_project_secondary_leaders;
        var blacklistIds = blacklist.map(function(leader) {
            return leader.id;
        });

        blacklistIds.push($scope.financed_project.primary_leader);

        memberFactory.memberGetAll()
            .success(function(data) {
                var leaders = data.members ? data.members : [];
                leaders.forEach(function(leader) {
                    if (blacklistIds.indexOf(leader.id) === -1) {
                        $scope.secondary_leaders_to_add.push(leader);
                    }
                });
                $modal.open({
                    templateUrl: 'core/apps/financed-project/views/financed-project-add-secondary-leader.html',
                    controller: 'FinancedProjectControllerView',
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
        var blacklist = $scope.financed_project_members;
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
                    templateUrl: 'core/apps/financed-project/views/financed-project-add-member.html',
                    controller: 'FinancedProjectControllerView',
                    scope: $scope,
                    backdrop: 'static'
                });
            })
            .error(function(data, error) {
                console.log(data, error);
            });
    }

    $scope.financedProjectGetById($stateParams.financedprojectid);
    $scope.financedProjectGetResearchLines($stateParams.financedprojectid);
    $scope.financedProjectGetSecondaryFundingBodies($stateParams.financedprojectid);
    $scope.financedProjectGetSecondaryLeaders($stateParams.financedprojectid);
    $scope.financedProjectGetMembers($stateParams.financedprojectid);


}
