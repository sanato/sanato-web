/**
 * ResearchAreaControllerView Controller
 */

angular
    .module('Instanto')
    .controller('ResearchAreaControllerView', ['$rootScope', '$scope', '$state', '$stateParams', '$modal', 'researchAreaFactory', ResearchAreaControllerView]);

function ResearchAreaControllerView($rootScope, $scope, $state, $stateParams, $modal, researchAreaFactory) {
   
    $scope.$on('research_area_updated', function() {
        $scope.researchAreaGetById($stateParams.researchareaid);
        $scope.researchAreaGetPrimaryResearchLines($stateParams.researchareaid);
    });

    $scope.$on('research_area_updated', function() {
        $scope.researchAreaGetById($stateParams.researchareaid);
    });

    $scope.$on('research_area_updated_only', function() {
        $scope.researchAreaGetById($stateParams.researchareaid);
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
            researchAreaFactory.researchAreaUpdateLogo($scope.research_area, file.name, data)
                .success(function(data) {
                    $rootScope.$broadcast("research_area_updated_only");
                })
                .error(function(data, status) {

                });
        }
        reader2.readAsArrayBuffer(file);
    };
    $scope.researchAreaGetById = function(researchareaid) {
    	researchAreaFactory.researchAreaGetById(researchareaid)
            .success(function(data) {
                $scope.research_area = data;
            })
            .error(function(data, status) {
                console.log(data,status);
            });
    }

    $scope.researchAreaDelete = function(id) {
        researchAreaFactory.researchAreaDelete(id)
            .success(function(data) {
                $state.go('research-area-list');
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

     $scope.researchAreaUpdate = function(research_area) {
        researchAreaFactory.researchAreaUpdate(research_area)
            .success(function(data) {
                $rootScope.$broadcast('research_area_updated');
                $scope.$close();
            })
            .error(function(data, status) {
                console.log(data, status);
            })
    }

    $scope.researchAreaDeleteLogo = function(researchArea) {
        researchAreaFactory.researchAreaDeleteLogo(researchArea)
            .success(function(data) {
                $rootScope.$broadcast("research_area_updated_only");
            })
            .error(function(data, status) {
                console.log(status);
            });
    }

    $scope.researchAreaGetPrimaryResearchLines = function(id) {
        researchAreaFactory.researchAreaGetPrimaryResearchLines(id)
            .success(function(data) {
                $scope.research_area_primary_research_lines = data.research_lines ? data.research_lines : [];
                $scope.research_area_primary_research_lines_copy = [].concat($scope.research_area_primary_research_lines);
            })
            .error(function(data, status) {
                console.log(data, status);
            })
    }

    $scope.openUpdateForm = function(research_area) {
        $scope.research_areaZ = angular.copy(research_area);
        $modal.open({
            templateUrl: 'core/apps/research-area/views/research-area-update.html',
            controller: 'ResearchAreaControllerView',
            scope: $scope,
            backdrop: 'static'
        });
    }

    $scope.researchAreaGetById($stateParams.researchareaid);
    $scope.researchAreaGetPrimaryResearchLines($stateParams.researchareaid);

}
