/**
 * Decorates the ui-bootstrap datepicker directive's controller to allow
 * refreshing the datepicker view (and rerunning invalid dates function) 
 * upon an event trigger: `$scope.$broadcast('refreshDatepickers');`
 * 
 * Works with inline and popup. Include this after `ui.bootstrap` js
 */
angular.module('ui.bootstrap.datepicker')
    .config(function($provide) {
        $provide.decorator('datepickerDirective', function($delegate) {
            var directive = $delegate[0];
            var link = directive.link;

            directive.compile = function() {
                return function(scope, element, attrs, ctrls) {
                    link.apply(this, arguments);

                    var datepickerCtrl = ctrls[0];
                    var ngModelCtrl = ctrls[1];

                    if (ngModelCtrl) {
                        // Listen for 'refreshDatepickers' event...
                        scope.$on('refreshDatepickers', function refreshView() {
                            datepickerCtrl.refreshView();
                        });
                    }
                }
            };
            return $delegate;
        });
    });