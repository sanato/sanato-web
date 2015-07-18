/**
 * Widget Body Directive
 */

angular
    .module('Instanto')
    .directive('instantoWidgetBody', instantoWidgetBody);

function instantoWidgetBody() {
    var directive = {
        requires: '^instantoWidget',
        scope: {
            loading: '@?',
            classes: '@?'
        },
        transclude: true,
        template: '<div class="widget-body" ng-class="classes"><instanto-loading ng-show="loading"></instanto-loading><div ng-hide="loading" class="widget-content" ng-transclude></div></div>',
        restrict: 'E'
    };
    return directive;
};
