/**
 * PartnerControllerView Controller
 */

angular
    .module('Instanto')
    .controller('PartnerControllerView', ['$rootScope', '$scope', '$state', '$stateParams', '$modal', 'partnerFactory','memberFactory', 'researchLineFactory', PartnerControllerView]);

function PartnerControllerView($rootScope, $scope, $state, $stateParams, $modal, partnerFactory, memberFactory, researchLineFactory) {
    
    $scope.$on('partner_updated', function() {
        $scope.partnerGetById($stateParams.partnerid);
        $scope.partnerGetMembers($stateParams.partnerid);
        $scope.partnerGetResearchLines($stateParams.partnerid);
    });

    $scope.$on('partner_updated_only', function() {
        $scope.partnerGetById($stateParams.partnerid);
    });


    $scope.doClick = function() {
        var element = document.getElementById("file-input");
        element.click();
    };

    $scope.handleFileUpload = function(element) {
        var file = element.files.item(0);
        
        /*var preview = document.getElementById("logo-preview");
        while (preview.firstChild) {
            preview.removeChild(preview.firstChild);
        logo        var reader = new FileReader();
        reader.onload = function(e) {
            $scope.logoSrc = reader.result;
            var img = new Image();
            img.src = reader.result;
            img.className = "img-thumbnail";
            var preview = document.getElementById("logo-preview");
            preview.appendChild(img);
        }
        reader.readAsDataURL(file);
        */

        var reader2 = new FileReader();
        reader2.onload = function(e) {
            var data = reader2.result;
            partnerFactory.partnerUpdateLogo($scope.partner, file.name, data)
                .success(function(data) {
                    $rootScope.$broadcast("partner_updated_only");
                })
                .error(function(data, status) {

                });
        }
        reader2.readAsArrayBuffer(file);
    };

   
  
    $scope.partnerGetById = function(partnerid) {
    	partnerFactory.partnerGetById(partnerid)
            .success(function(data) {
                $scope.partner = data;
            })
            .error(function(data, status) {
                console.log(data, status);
            });
    }

    $scope.partnerDelete = function(id) {
        partnerFactory.partnerDelete(id)
            .success(function(data) {
                $state.go('partner-list');
            })
            .error(function(data, partner) {
                console.log(data, error);
            })
    }

    $scope.partnerUpdate = function(partner) {
        partnerFactory.partnerUpdate(partner)
            .success(function(data) {
                $rootScope.$broadcast('partner_updated');
                $scope.$close();
            })
            .error(function(data, partner) {
                console.log(data, partner);
            })
    }

    $scope.partnerDeleteLogo = function(partner) {
        partnerFactory.partnerDeleteLogo(partner)
            .success(function(data) {
                $rootScope.$broadcast("partner_updated_only");
            })
            .error(function(data, status) {
                console.log(status);
            });
    }

    $scope.partnerGetMembers = function(id) {
        partnerFactory.partnerGetMembers(id)
            .success(function(data) {
                $scope.members = data.members ? data.members : [];
                $scope.members_copy = [].concat($scope.members);
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.partnerAddMember = function(id, memberid) {
        partnerFactory.partnerAddMember(id, memberid)
            .success(function(data) {
                $rootScope.$broadcast('partner_updated');
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.partnerRemoveMember = function(id, memberid) {
        partnerFactory.partnerRemoveMember(id, memberid)
            .success(function(data) {
                $rootScope.$broadcast("partner_updated");
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.partnerGetResearchLines = function(id) {
        partnerFactory.partnerGetResearchLines(id)
            .success(function(data) {
                $scope.research_lines = data.research_lines ? data.research_lines : [];
                $scope.research_lines_copy = [].concat($scope.research_lines);
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.partnerAddResearchLine = function(id, researchlineid) {
        partnerFactory.partnerAddResearchLine(id, researchlineid)
            .success(function(data) {
                $rootScope.$broadcast('partner_updated');
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.partnerRemoveResearchLine = function(id, researchlineid) {
        partnerFactory.partnerRemoveResearchLine(id, researchlineid)
            .success(function(data) {
                $rootScope.$broadcast("partner_updated");
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }
    $scope.openUpdateForm = function(partner) {
        $scope.partnerZ = angular.copy(partner);
        $modal.open({
            templateUrl: 'core/apps/partner/views/partner-update.html',
            controller: 'PartnerControllerView',
            scope: $scope,
            backdrop: 'static'
        });
    }

    $scope.openAddMemberForm = function() {
        $scope.members_to_add = [];
        var blacklist = $scope.members;
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
                    templateUrl: 'core/apps/partner/views/partner-add-member.html',
                    controller: 'StatusControllerList',
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
                    templateUrl: 'core/apps/partner/views/partner-add-research-line.html',
                    controller: 'PartnerControllerView',
                    scope: $scope,
                    backdrop: 'static'
                });
            })
            .error(function(data, error) {
                console.log(data, error);
            });
    }

    $scope.scopeOptions = [
        {
            id: "regional",
            name: "Regional"
        },
        {
            id: "national",
            name: "National"
        },
        {
            id: "international",
            name: "International"
        },
    ];

    $scope.partnerGetMembers($stateParams.partnerid);
    $scope.partnerGetById($stateParams.partnerid);
    $scope.partnerGetResearchLines($stateParams.partnerid);

}
