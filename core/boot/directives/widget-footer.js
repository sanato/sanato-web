/**
 * Widget Footer Directive
 */

angular
    .module('Instanto')
    .directive('instantoWidgetFooter', instantoWidgetFooter);

function instantoWidgetFooter() {
    var directive = {
        requires: '^instantoWidget',
        transclude: true,
        template: '<div class="widget-footer" ng-transclude></div>',
        restrict: 'E'
    };
    return directive;
};
