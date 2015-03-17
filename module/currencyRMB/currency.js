'use strict';

/**
 * currency
 * usage:
 * <input type="text" ng-model="money" currency symbol="$" />
 * symbol为可选currency
 */

angular.module('z.currency', [])
.directive('currency', ['$filter', function($filter){
	return {
		require: 'ngModel',
		link: function(scope, elem, attrs, ctrl){
			ctrl.$formatters.push(parseCurrency);

			ctrl.$parsers.push(function(value){
				var num = value.replace(/[^0-9.-]/g, ''),
					result = parseFloat(num);
				return isNaN(result) ? undefined : result;
			});

			elem.bind('blur', function(){
				ctrl.$viewValue = parseCurrency();
				ctrl.$render();
			});

			function parseCurrency(){
				var symbol = attrs.symbol || '￥';
				var num = Number(ctrl.$modelValue).toFixed(2);
				return $filter('currency')(num, symbol).replace(/\((.*)\)/, '-$1');
			}
		}
	}
}]);
