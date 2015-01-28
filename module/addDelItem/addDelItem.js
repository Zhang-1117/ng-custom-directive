"use strict"
/************************************************************************
 * 简易结构:
 * item     item
 * item  →  item
 * item  ←
 * item
 ************************************************************************
 * useage:
 * <div add-del-item left-list="groupList"
                     right-list="selectedItemList"
                     to-right-btn="rightBtn"
                     to-left-btn="leftBtn">
 *  </div>
 * 
 ************************************************************************
 * @params:
 * left-list: 左侧列表
 * right-list: 右侧列表
 * to-right-btn: 向右添加数据操作按钮html字符串
 * to-left-btn: 向左添加数据操作按钮html字符串
 ************************************************************************/
angular.module("z.addDelItem", [])
    .directive("addDelItem", function ($sce, $filter) {
        return {
            restrict: 'EA',
            transclude: true,
            replace: true,
            scope: {
                leftList: '=',
                rightList: '=',
                toRightBtn: '=',
                toLeftBtn: '='
            },
            templateUrl: '../add-del-item-tpl.html',
            link: function (scope, element, attrs) {
                scope.toRightBtn = $sce.trustAsHtml(scope.toRightBtn);
                scope.toLeftBtn = $sce.trustAsHtml(scope.toLeftBtn);

                function selectedList(fromList, toList) {
                    var selectedList = $filter('filter')(fromList, {selected: true});
                    angular.forEach(selectedList, function (val, i) {
                        var index = fromList.indexOf(val);
                        fromList.splice(index, 1);
                        val.selected = false;
                        toList.push(val);
                    });
                }

                scope.toRight = function () {
                    selectedList(scope.leftList, scope.rightList);
                };

                scope.toLeft = function () {
                    selectedList(scope.rightList, scope.leftList);
                };

                scope.delItem = function (index) {
                    scope.leftList.push(scope.rightList[index]);
                    scope.rightList.splice(index, 1);
                };
            }
        };
    });