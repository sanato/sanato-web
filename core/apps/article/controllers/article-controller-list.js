/**
 * ArticleControllerList Controller
 */

angular
    .module('Instanto')
    .controller('ArticleControllerList', ['$rootScope', '$scope', '$state', '$modal', 'articleFactory', 'newspaperFactory',  ArticleControllerList]);

function ArticleControllerList($rootScope, $scope, $state, $modal, articleFactory, newspaperFactory) {

    $scope.$on('article_updated', function() {
        $scope.articleGetAll();
    });
     $scope.$on('article_created', function() {
        $scope.articleGetAll();
    });
      $scope.$on('article_deleted', function() {
        $scope.articleGetAll();
    });

    $scope.articleGetAll = function() {
        articleFactory.articleGetAll()
            .success(function(data) {
                $scope.articles = data.articles ? data.articles : [];
                $scope.articles_copy = [].concat($scope.articles);
            })
            .error(function(data, article) {
                console.log(data,article);
            });
    }
    
    $scope.articleCreate = function(article) {
        // we need to create a copy from article to avoid modifying
        // article.date to cast to epoch. angular complains
        // change date in format YYYY/MM/DD to epoch unix 10 digits
        var articleCopy = angular.copy(article);
        articleCopy.date = Math.floor(article.date.getTime()/1000);
        articleFactory.articleCreate(articleCopy)
            .success(function(data, error) {
                $rootScope.$broadcast('article_created');
                $scope.$close();
            })
            .error(function(data, error) {
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

    $scope.articleDelete = function(id) {
        articleFactory.articleDelete(id)
            .success(function(data) {
                $scope.articleGetAll();
            })
            .error(function(data, error) {
                console.log(data, error);
            })
    }
    
    $scope.openCreateForm = function() {
        newspaperFactory.newspaperGetAll()
            .success(function(data) {
                $scope.newspapers = data.newspapers ? data.newspapers : [];
                $scope.article = {};
                $scope.article.date = new Date();
                $modal.open({
                    templateUrl: 'core/apps/article/views/article-create.html',
                    controller: 'ArticleControllerList',
                    scope: $scope,
                    backdrop: 'static'
                });

            })
            .error(function(data, status) {
                console.log(data, status);
            })
    }

    $scope.openUpdateForm = function(article) {
        newspaperFactory.newspaperGetAll()
            .success(function(data) {
                $scope.newspapers = data.newspapers ? data.newspapers : [];
                $scope.articleZ = angular.copy(article);
                $scope.articleZ.date = new Date(article.date * 1000);
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

    $scope.closeModal = function() {
        $scope.$close();
        $scope.article = null;
    }

   
    $scope.articleGetAll();
    
}
