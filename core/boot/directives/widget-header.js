/**
 * Widget Header Directive
 */

angular
    .module('Instanto')
    .directive('instantoWidgetHeader', instantoWidgetHeader);

function instantoWidgetHeader() {
    var directive = {
        requires: '^instantoWidget',
        scope: {
            title: '@',
            icon: '@'
        },
        transclude: true,
        template: '<div class="widget-header"><i class="fa" ng-class="icon"></i> {{title}} <div class="pull-right" ng-transclude></div></div>',
        restrict: 'E'
    };
    return directive;
};
