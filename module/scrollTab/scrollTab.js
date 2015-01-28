"use strict";
/************************************************************************
 * 简易结构：
 * < ... | title  x | title  x | title  x | title  x | ... >
 ************************************************************************
 * useage:
 * <div scroll-tab
        groups="groupList"
        select="select(i)"
        selected-index="selectedIndex"
        show-del="del"
        del-event="delItem(i)"></div>
 ************************************************************************
 * @params:
 * {Function} select: 点击标签事件
 * {Number} selectedIndex: 当前选中的标签索引值
 * {Array} groups: 数据来源列表
 * {Boolean} showDel: 是否显示删除按钮
 * {Function} delEvent: 删除事件
 ************************************************************************/
angular.module("z.scrollTab", [])
    .directive("scrollTab", function () {
        return {
            restrict: 'EA',
            transclude: true,
            replace: true,
            scope: {
                select: '&',
                groups: '=',
                selectedIndex: '=',
                showDel: '=',
                delEvent: '&'
            },
            template:
                '<div class="tab-wrapper rela">'+
                    '<a href="javascript:;" class="tab-left-btn absol" ng-click="leftmove()"><i class="icon-tab-left"></i></a>'+
                    '<a href="javascript:;" class="tab-right-btn absol" ng-click="rightmove()"><i class="icon-tab-right"></i></a>'+
                    '<div class="tab-ul-wrapper"><ul class="clearfix tab-ul">'+
                        '<li ng-repeat="group in groups" class="rela" ng-class="{active: $index == selectedIndex}" ng-click="select({i: $index})">' +
                            '{{group.name}}{{$index + 1}} <a class="absol" ng-show="showDel && $index != 0" href="javascript:;" ng-click="delEvent({i: $index})">&times;</a>' +
                        '</li>'+
                    '</ul/div>'+
                '</div>',
            link: function (scope, element, attrs) {
                var tab = jQuery(element).find('.tab-ul');
                
                scope.tabScroll = function (direction) {
                    var tabMarginLeft = parseInt(tab.css('margin-left')),
                        oneLiWidth = tab.find('li').eq(0).width(),
                        errRange = oneLiWidth - 10, // 误差范围
                        count = tab.find('li').length,
                        maxMarginLeft = oneLiWidth * count - tab.parent().width();

                    if (direction === "left") {
                        if (tabMarginLeft >= -errRange) {
                            tab.css({
                                marginLeft: 0
                            });
                        } else {
                            tab.stop(true, true).animate({
                                marginLeft: "+=" + oneLiWidth
                            });
                        }
                    } else {
                        if (tabMarginLeft <= -maxMarginLeft) {
                            return;
                        } else {
                            tab.stop(true, true).animate({
                                marginLeft: "-=" + oneLiWidth
                            });
                        }
                    }
                };

                scope.leftmove = function () {
                    scope.tabScroll("left");
                };

                scope.rightmove = function () {
                    scope.tabScroll("right");
                };
            }
        };
    });