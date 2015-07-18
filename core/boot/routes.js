'use strict';

angular.module('Instanto').config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
    function($stateProvider, $urlRouterProvider, $httpProvider) {

        /*ngToast.configure({
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
            maxNumber: 3
        });*/

        $httpProvider.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem("instanto_token");
        //$httpProvider.interceptors.push(AuthInterceptor);

        // For unmatched routes
        $urlRouterProvider.otherwise('/');

        // Application routes
        $stateProvider
            .state('index', {
                url: '/',
                templateUrl: 'core/apps/dashboard/views/dashboard.html',
                authenticate: true,
            })

            // Status routes
            .state('status-view', {
                url: '/statuses/:statusid',
                templateUrl: 'core/apps/status/views/status-view.html',
                controller: 'StatusControllerView',
            })
            .state('status-list', {
                url: '/statuses',
                templateUrl: 'core/apps/status/views/status-list.html',
                controller: 'StatusControllerList'
            })
            

            // Member routes
            .state('member-view', {
                url: '/members/:memberid',
                templateUrl: 'core/apps/member/views/member-view.html',
                controller: 'MemberControllerView',
            })
            .state('member-list', {
                url: '/members',
                templateUrl: 'core/apps/member/views/member-list.html',
                controller: 'MemberControllerList',
            })

            // Partner routes
            .state('partner-view', {
                url: '/partners/:partnerid',
                templateUrl: 'core/apps/partner/views/partner-view.html',
                controller: 'PartnerControllerView',
            })
            .state('partner-list', {
                url: '/partners',
                templateUrl: 'core/apps/partner/views/partner-list.html',
                controller: 'PartnerControllerList',
            })

            // Student work types routes
            .state('student-work-type-view', {
                url: '/studentworktypes/:studentworktypeid',
                templateUrl: 'core/apps/student-work-type/views/student-work-type-view.html',
                controller: 'StudentWorkTypeControllerView',
            })
            .state('student-work-type-list', {
                url: '/studentworktypes',
                templateUrl: 'core/apps/student-work-type/views/student-work-type-list.html',
                controller: 'StudentWorkTypeControllerList',
            })

            // Student works routes
            .state('student-work-view', {
                url: '/studentworks/:studentworkid',
                templateUrl: 'core/apps/student-work/views/student-work-view.html',
                controller: 'StudentWorkControllerView',
            })
            .state('student-work-list', {
                url: '/studentworks',
                templateUrl: 'core/apps/student-work/views/student-work-list.html',
                controller: 'StudentWorkControllerList',
            })

            // Publisher routes
            .state('publisher-view', {
                url: '/publishers/:publisherid',
                templateUrl: 'core/apps/publisher/views/publisher-view.html',
                controller: 'PublisherControllerView',
            })
            .state('publisher-list', {
                url: '/publishers',
                templateUrl: 'core/apps/publisher/views/publisher-list.html',
                controller: 'PublisherControllerList',
            })

            // Research area routes
            .state('research-area-view', {
                url: '/researchareas/:researchareaid',
                templateUrl: 'core/apps/research-area/views/research-area-view.html',
                controller: 'ResearchAreaControllerView',
            })
            .state('research-area-list', {
                url: '/researchareas',
                templateUrl: 'core/apps/research-area/views/research-area-list.html',
                controller: 'ResearchAreaControllerList',
            })

            // Research line routes
            .state('research-line-view', {
                url: '/researchlines/:researchlineid',
                templateUrl: 'core/apps/research-line/views/research-line-view.html',
                controller: 'ResearchLineControllerView',
            })
            .state('research-line-list', {
                url: '/researchlines',
                templateUrl: 'core/apps/research-line/views/research-line-list.html',
                controller: 'ResearchLineControllerList',
            })

            // Newspaper routes
            .state('newspaper-view', {
                url: '/newspapers/:newspaperid',
                templateUrl: 'core/apps/newspaper/views/newspaper-view.html',
                controller: 'NewspaperControllerView',
            })
            .state('newspaper-list', {
                url: '/newspapers',
                templateUrl: 'core/apps/newspaper/views/newspaper-list.html',
                controller: 'NewspaperControllerList',
            })

            // Article routes
            .state('article-view', {
                url: '/articles/:articleid',
                templateUrl: 'core/apps/article/views/article-view.html',
                controller: 'ArticleControllerView',
            })
            .state('article-list', {
                url: '/articles',
                templateUrl: 'core/apps/article/views/article-list.html',
                controller: 'ArticleControllerList',
            })

            // Funding body routes
            .state('funding-body-view', {
                url: '/fundingbodies/:fundingbodyid',
                templateUrl: 'core/apps/funding-body/views/funding-body-view.html',
                controller: 'FundingBodyControllerView',
            })
            .state('funding-body-list', {
                url: '/fundingbodies',
                templateUrl: 'core/apps/funding-body/views/funding-body-list.html',
                controller: 'FundingBodyControllerList',
            })

            // Financed project routes
            .state('financed-project-view', {
                url: '/financedprojects/:financedprojectid',
                templateUrl: 'core/apps/financed-project/views/financed-project-view.html',
                controller: 'FinancedProjectControllerView',
            })
            .state('financed-project-list', {
                url: '/financedprojects',
                templateUrl: 'core/apps/financed-project/views/financed-project-list.html',
                controller: 'FinancedProjectControllerList',
            })

            // Publication type routes
            .state('publication-type-view', {
                url: '/publicationtypes/:publicationtypeid',
                templateUrl: 'core/apps/publication-type/views/publication-type-view.html',
                controller: 'PublicationTypeControllerView',
            })
            .state('publication-type-list', {
                url: '/publicationtypes',
                templateUrl: 'core/apps/publication-type/views/publication-type-list.html',
                controller: 'PublicationTypeControllerList',
            })

            // Publication routes
            .state('publication-view', {
                url: '/publications/:publicationid',
                templateUrl: 'core/apps/publication/views/publication-view.html',
                controller: 'PublicationControllerView',
            })
            .state('publication-list', {
                url: '/publications',
                templateUrl: 'core/apps/publication/views/publication-list.html',
                controller: 'PublicationControllerList',
            })
    }
]);

angular.module('Instanto').run(['$rootScope', '$state', 'Auth', function ($rootScope, $state, Auth) {


    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
        // if it is the fist time we are logged in we should populate some settings from the token
        if(!Auth.isLoggedIn()) {
            document.getElementById("page-wrapper").setAttribute("hidden", true);
            document.getElementById("login-form").removeAttribute("hidden");
        }
        // if it is the fist time we are logged in we should populate some settings from the token
        if(!$rootScope.user) {
            var user = {};
            user.username = "labrador";
            user.displayName = "Hugo González Labrador";
            user.permissions = ["status_list", "status_update"];
            $rootScope.user = user;
            console.log(Auth.hasPermission("status_list"));
            console.log($rootScope.user);
        }
       // Create dinamic breadcrumbs here checking all of our routes
       switch(toState.name) {
            case 'index':
                $rootScope.$broadcast('breadcrumbs_create', {
                    pageTitle: 'Dashboard',
                    breadcrumbs: [
                        {name: 'Home', state: 'index'},
                    ]
                });
                break;

            // Status routes
            case 'status-list':
                $rootScope.$broadcast('breadcrumbs_create', {
                    pageTitle: 'Statuses',
                    breadcrumbs: [
                        {name: 'Home', state: 'index'},
                        {name: 'Statuses', state: 'status-list'}
                    ]
                });
                break;

            case 'status-view':
                $rootScope.$broadcast('breadcrumbs_create', {
                    pageTitle: 'Statuses (View)',
                    breadcrumbs: [
                        {name: 'Home', state: 'index'},
                        {name: 'Statuses', state: 'status-list'},
                        {name: toParams.statusid, state: 'status-view({statusid:'+ toParams.statusid+ '})'}
                    ]
                });
                break;

            // Member routes
            case 'member-list':
                $rootScope.$broadcast('breadcrumbs_create', {
                    pageTitle: 'Members',
                    breadcrumbs: [
                        {name: 'Home', state: 'index'},
                        {name: 'Members', state: 'member-list'}
                    ]
                });
                break;

            case 'member-view':
                $rootScope.$broadcast('breadcrumbs_create', {
                    pageTitle: 'Members (View)',
                    breadcrumbs: [
                        {name: 'Home', state: 'index'},
                        {name: 'Members', state: 'member-list'},
                        {name: toParams.memberid, state: 'member-view({memberid:'+ toParams.memberid+ '})'}
                    ]
                });
                break;




            default:
                $rootScope.$broadcast('breadcrumbs_create', {
                    pageTitle: 'Not defined',
                    breadcrumbs: [
                        {name: 'No breadcrumbs defined for this route', state: 'index'},
                    ]
                }); 
        }
    });

}]);
