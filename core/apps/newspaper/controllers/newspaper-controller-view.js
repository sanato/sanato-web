/**
 * NewspaperControllerList Controller
 */

angular
    .module('Instanto')
    .controller('NewspaperControllerView', ['$rootScope', '$scope', '$state', '$stateParams', '$modal', 'newspaperFactory', NewspaperControllerView]);

function NewspaperControllerView($rootScope, $scope, $state, $stateParams, $modal, newspaperFactory) {
   
    $scope.$on('newspaper_updated', function() {
        $scope.newspaperGetById($stateParams.newspaperid);
    });

    $scope.$on('newspaper_updated_only', function() {
        $scope.newspaperGetById($stateParams.newspaperid);
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
            newspaperFactory.newspaperUpdateLogo($scope.newspaper, file.name, data)
                .success(function(data) {
                    $rootScope.$broadcast("newspaper_updated_only");
                })
                .error(function(data, status) {

                });
        }
        reader2.readAsArrayBuffer(file);
    };
    $scope.newspaperGetById = function(newspaperid) {
    	newspaperFactory.newspaperGetById(newspaperid)
            .success(function(data) {
                $scope.newspaper = data;
            })
            .error(function(data, newspaper) {
                console.log(data,newspaper);
            });
    }

    $scope.newspaperDelete = function(id) {
        newspaperFactory.newspaperDelete(id)
            .success(function(data) {
                $state.go('newspaper-list');
            })
            .error(function(data, newspaper) {
                console.log(data, error);
            })
    }

    $scope.newspaperUpdate = function(newspaper) {
        newspaperFactory.newspaperUpdate(newspaper)
            .success(function(data) {
                $rootScope.$broadcast('newspaper_updated');
                $scope.$close();
            })
            .error(function(data, newspaper) {
                console.log(data, newspaper);
            })
    }

    $scope.newspaperDeleteLogo = function(newspaper) {
        newspaperFactory.newspaperDeleteLogo(newspaper)
            .success(function(data) {
                $rootScope.$broadcast("newspaper_updated_only");
            })
            .error(function(data, status) {
                console.log(status);
            });
    }

     $scope.newspaperGetArticles = function(id) {
        newspaperFactory.newspaperGetArticles(id)
            .success(function(data) {
                $scope.newspaper_articles = data.articles ? data.articles : [];
                $scope.newspaper_articles_copy = [].concat($scope.newspaper_articles);
            })
            .error(function(data, status) {
                console.log(data, status);
            })
    }

    $scope.openUpdateForm = function(newspaper) {
        $scope.newspaperZ = angular.copy(newspaper);
        $modal.open({
            templateUrl: 'core/apps/newspaper/views/newspaper-update.html',
            controller: 'NewspaperControllerView',
            scope: $scope,
            backdrop: 'static'
        });
    }

    $scope.newspaperGetById($stateParams.newspaperid);
    $scope.newspaperGetArticles($stateParams.newspaperid);
}
