/**
 * Loading Directive
 * @see http://tobiasahlin.com/spinkit/
 */

angular
    .module('Instanto')
    .directive('instantoLoading', instantoLoading);

function instantoLoading() {
    var directive = {
        restrict: 'AE',
        template: '<div class="loading"><div class="double-bounce1"></div><div class="double-bounce2"></div></div>'
    };
    return directive;
};
