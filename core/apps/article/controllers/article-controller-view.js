/**
 * ArticleControllerList Controller
 */

angular
    .module('Instanto')
    .controller('ArticleControllerView', ['$rootScope', '$scope', '$state', '$stateParams', '$modal', 'articleFactory', 'newspaperFactory', 'researchLineFactory', ArticleControllerView]);

function ArticleControllerView($rootScope, $scope, $state, $stateParams, $modal, articleFactory, newspaperFactory, researchLineFactory) {
   
    $scope.$on('article_updated', function() {
        $scope.articleGetById($stateParams.articleid);
        $scope.articleGetResearchLines($stateParams.articleid)
    });

    $scope.articleGetById = function(articleid) {
    	articleFactory.articleGetById(articleid)
            .success(function(data) {
                $scope.article = data;
                newspaperFactory.newspaperGetById($scope.article.newspaper)
                    .success(function(data) {
                        $scope.article.newspaper_doc = data;
                    })
                    .error(function(data, status) {
                        console.log(data, error);
                    })
            })
            .error(function(data, article) {
                console.log(data,article);
            });
    }

    $scope.articleDelete = function(id) {
        articleFactory.articleDelete(id)
            .success(function(data) {
                $state.go('article-list');
            })
            .error(function(data, article) {
                console.log(data, error);
            })
    }

    $scope.articleUpdate = function(article) {
        console.log(article);
        // we need to create a copy from article to avoid modifying
        // article.date to cast to epoch. angular complains
        // change date in format YYYY/MM/DD to epoch unix 10 digits
        var articleCopy = angular.copy(article);
        articleCopy.date = Math.floor(article.date.getTime()/1000);
        console.log(articleCopy);
        articleFactory.articleUpdate(articleCopy)
            .success(function(data) {
                $rootScope.$broadcast('article_updated');
                $scope.$close();
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.articleGetResearchLines = function(id) {
        articleFactory.articleGetResearchLines(id)
            .success(function(data) {
                $scope.research_lines = data.research_lines ? data.research_lines : [];
                $scope.research_lines_copy = [].concat($scope.research_lines);
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.articleAddResearchLine = function(id, researchlineid) {
        articleFactory.articleAddResearchLine(id, researchlineid)
            .success(function(data) {
                $rootScope.$broadcast('article_updated');
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.articleRemoveResearchLine = function(id, researchlineid) {
        articleFactory.articleRemoveResearchLine(id, researchlineid)
            .success(function(data) {
                $rootScope.$broadcast("article_updated");
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }

    $scope.openUpdateForm = function(article) {
        $scope.articleZ = angular.copy(article);
        $scope.articleZ.date = new Date(article.date * 1000);
        newspaperFactory.newspaperGetAll()
            .success(function(data) {
                $scope.newspapers = data.newspapers ? data.newspapers : [];
                $modal.open({
                    templateUrl: 'core/apps/article/views/article-update.html',
                    controller: 'ArticleControllerList',
                    scope: $scope,
                    backdrop: 'static'
                });
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
                    templateUrl: 'core/apps/article/views/article-add-research-line.html',
                    controller: 'ArticleControllerView',
                    scope: $scope,
                    backdrop: 'static'
                });
            })
            .error(function(data, error) {
                console.log(data, error);
            });
    }

    $scope.articleGetById($stateParams.articleid);
    $scope.articleGetResearchLines($stateParams.articleid)
}
