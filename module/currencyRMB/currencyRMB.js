"use strict"
/************************************************************************
 * useage:
 * <input type="text" ng-pattern="/^[￥0-9]+$/" ng-model="price" currencyrmb/>
 ************************************************************************/
angular.module("z.currencyRMB", [])
    .directive("currencyrmb", function () {
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, ngModel) {

                ngModel.$formatters.push(function(val) {
                    return '￥' + val;
                });

                ngModel.$parsers.push(function(val) {
                    return val ? val.replace(/^￥/, '') : val;
                });

                element.bind('blur', function () {
                    var value = ngModel.$modelValue;
                    if (value) {
                        ngModel.$viewValue = "￥" + value.replace('￥', '');
                        ngModel.$render();
                    }
                });
            }
        };
    });