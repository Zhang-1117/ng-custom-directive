"use strict";
/************************************************************************
 * 简易结构:
 *    左      中      右
 * all data    >   selected data
 ************************************************************************
 * useage: 
 * <div select-items groups="groups" items="items" name="name"></div>
 ************************************************************************
 * @params:
 * groups: 左侧显示的来源数据列表
 * items: 右侧选中的数据列表
 * name: 数据种类名称
 * uniqueFlag: 数据去重的标志key
 * templateUrl: 模板, 相对于页面的路径
 *************************************************************************/
angular.module("z.selectItems", [])
    .directive('selectItems', function () {
        return {
            restrict: 'EA',
            transclude: true,
            replace: true,
            scope: {
                groups: '=',
                items: '=',
                name: '@',
                uniqueFlag: '@'
            },
            templateUrl: '../select-items-tpl.html',
            link: function (scope, ele, attrs) {

                scope.count = scope.items.length;

                scope.addItem = function (data, index) {
                    scope.selectedHashKey = data.$$hashKey; // 唯一标识 用于判断激活样式

                    var unique = true;
                    angular.forEach(scope.items, function (val, i) {
                        if (data[scope.uniqueFlag] == val[scope.uniqueFlag]) {
                            unique = false;
                        }
                    });

                    if (unique) {
                        scope.items.push(data);
                        scope.count = scope.items.length;
                    }
                };

                scope.delItem = function (index) {
                    scope.items.splice(index, 1);
                    scope.count = scope.items.length;
                };
            }
        };
    });