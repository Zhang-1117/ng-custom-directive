"use strict";
/**
 * 时间轴
 * description: 可自定义刻度数量、刻度尺标题框背景色、标题框内容，添加标记及标记说明
 *              标题框内icon的class为icon-titleline-title 可由外部进行修饰定义
 * useage: 
 * <div class="timeline" time-line
        count="16" title="data.title" my-array="data.marks"
        mark-width="20" title-color="#ddd" title-arrow-width="7">
        <i class="left-scale"></i>
        <i class="right-scale"></i>
        <div class="timeline-title"></div>
    </div>
 */

angular.module("z.timeLine", [])
	.directive("timeLine", function ($window) {
		return {
			restrict: 'EA',
			scope: {
				title: "=", // 时间轴title
				count: "@", // 刻度数量
				myArray: "=", // 需要标记的数据数组 e.g.[{pos: 3, posTitle: "12月"},{pos: 5, posTitle: "6月"}]
				markWidth: "@", // 标记直径
				titleArrowWidth: "@", // 标题框下方小三角宽度一半  （之后修正 > <
				titleColor: "@" // 标题框背景色
			},
			link: function (scope, ele, attrs) {
				var lineObj = angular.element(ele),
					lineWidth = ele[0].offsetWidth,
					count = Number(scope.count),
					spacing = lineWidth / count;

				// 生成刻度
				var createScale = function () {
					var len = count;
					for (; len >= 0; len--) {
						lineObj.append('<i class="timeline-scale" style="top: 0; left: ' + len/count * 100 + '%"/>');
					}
				};

				// 生成标记title
				var createMarkTit = function (i, num, content) {
					lineObj.append('<div class="mark-title">'+ content +'</div>');
					var self = document.querySelectorAll('.mark-title')[i],
						width = self.offsetWidth,
						height = self.offsetHeight;
					angular.element(self).css({
						top: -height - scope.markWidth/2 + 'px',
						left: (num/count - width/lineWidth/2) * 100 + '%'
					});
				};

				// 生成标记
				var createMark = function () {
					angular.forEach(scope.myArray, function (val, i) {
						lineObj.append('<div class="mark" style="width: '+ scope.markWidth +'px; height: '+ scope.markWidth +'px; border-radius: '+ scope.markWidth +'px; top: -'+ scope.markWidth/2 +'px; left: '+ (val.pos/count - scope.markWidth/lineWidth/2)*100 +'%;"/>');
						createMarkTit(i, val.pos, val.posTitle);
					});
				};

				// 时间轴title填充文字&定位
				var titPos = function () {
					var title = document.querySelectorAll('.timeline-title')[0],
						titleArrow,
						height,
						width;
					title.innerHTML = "<i class=\"timeline-title-arrow\"></i><i class=\"icon-titleline-title\"></i>" + scope.title;
					titleArrow = document.querySelectorAll('.timeline-title-arrow')[0];
					height = title.offsetHeight;
					width = title.offsetWidth;
					angular.element(title).css({
						backgroundColor: scope.titleColor,
						top: -height - scope.markWidth/2 - 5 + 'px'
					});
					angular.element(titleArrow).css({
						border: scope.titleArrowWidth + 'px solid transparent',
						borderTopColor: scope.titleColor,
						bottom: - scope.titleArrowWidth * 2 + 'px',
						left: width / 2 - scope.titleArrowWidth + 'px'
					});
				};

				// 当时间轴宽度发生变化时，修正标记及标记title的left定位
				var modifyLeft = function () {
					if (!document.querySelector('.timeline')) return;
					lineWidth = ele[0].offsetWidth;
					var markList = document.querySelectorAll('.mark'),
						markTitleList = document.querySelectorAll('.mark-title');
					angular.forEach(scope.myArray, function (val, i) {
						angular.element(markList[i]).css({
							left: (val.pos/count - scope.markWidth/lineWidth/2)*100 + '%'
						});
						angular.element(markTitleList[i]).css({
							left: (val.pos/count - markTitleList[i].offsetWidth/lineWidth/2)*100 + '%'
						});
					});

				};

				var init = function () {
					createScale();
					createMark();
					titPos();
				};
				init();

				angular.element($window).bind('resize', function () {
					modifyLeft();
				});
			}
		};
	});
