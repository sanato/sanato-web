/**
 * Widget Directive
 */

angular
    .module('Instanto')
    .directive('instantoWidget', instantoWidget);

function instantoWidget() {
    var directive = {
        transclude: true,
        template: '<div class="widget" ng-transclude></div>',
        restrict: 'EA'
    };
    return directive;

    function link(scope, element, attrs) {
        /* */
    }
};
