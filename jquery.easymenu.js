/**
 * jquery.easymenu.js
 * 这个一个jQuery的插件，它可以让您创建下拉试的导航菜单更加简单。
 * 
 * -- REQUIRE: jQuery 1.4+ --
 * 
 * @author	Hpyer
 * @home	http://hpyer.cn
 * @version	1.0
 * @release	2013-12-09
 */

/*
USAGE:

<html>
<head>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js"></script>
<link rel="stylesheet" type="text/css" href="jquery.easymenu.css" />
<script type="text/javascript" src="jquery.easymenu.js"></script>
</head>
<body>
<ul id="menu" class="clearfix">
	<li><a href="#">Home</a></li>
	<li><a href="#">Tutorials</a>
	<ul>
		<li><a href="#">2nd Nav Link</a>
			<ul>
				<li><a href="#">3rd Nav Link</a></li>
				<li><a href="#">3rd Nav Link</a></li>
			</ul>
		</li>
		<li><a href="#">2nd Nav Link</a></li>
		</ul>
	</li>
</ul>
<script>$('#menu').easymenu();</script>
</body>
</html>
*/

(function($) {
	$.fn.easymenu = function(options) {
		var default_options = {
			'hover_class' : 'hover',	// 鼠标进过菜单项时的class
			'main_item_class' : 'main-item',	// 主菜单项的class
			'sub_item_class' : 'sub-item',	// 子菜单项的class
			'separator_class' : 'separator',	// 分隔符的class
			'has_child_class' : 'has-child',	// 含有子菜单时的class
			'fade_time' : 200	// 子菜单渐显、渐隐的时间，单位：毫秒
		};
		options = $.extend(default_options, options);

		this.each(function(i, item) {
			// 区分主菜单项和子菜单项
			$(item).children('li').addClass(options.main_item_class).find('li').addClass(options.sub_item_class);

			$(item)
			// 判断子菜单项类型
			.find('li').each(function(i, item) {
				// 给空的菜单项添加separator类
				if ($(item).html() == '') $(item).removeClass().addClass(options.separator_class);
				// 如果有子菜单，则添加has_child类
				if ($(item).children('ul').length > 0) $(item).addClass(options.has_child_class);
			})

			// 菜单事件处理
			.hover(function() {
				// 不是分隔符则添加hover类
				if (!$(this).hasClass(options.separator_class)) $(this).addClass(options.hover_class);

				// 有子菜单，则显示
				if ($(this).hasClass(options.has_child_class)) {
					var submenu = $(this).children('ul');
					var is_first_submenu = $(this).hasClass(options.main_item_class);
					var p_pos = $(this).position();
					var p_w = parseInt($(this).outerWidth());
					var p_h = parseInt($(this).outerHeight());
					var w = parseInt(submenu.outerWidth());
					var h = parseInt(submenu.outerHeight());

					// 区分处理一级子菜单的位置
					var css = {};
					if (is_first_submenu) {
						css.left = parseInt(p_pos.left);
						css.top = parseInt(p_pos.top) + p_h;
					} else {
						css.left = parseInt(p_pos.left) + p_w - 1;
						css.top = parseInt(p_pos.top);
					}

					// 修正子菜单的位置，确保在屏幕内
					var p_offset = $(this).offset();
					if ((p_offset.left + p_w + w) > $(document).width()) css.left = css.left - w - p_w + 1;

					// 显示子菜单
					submenu.stop().css(css).fadeTo(options.fade_time, 1);
				}
			}, function() {
				// 不是分隔符则移除hover类
				if (!$(this).hasClass(options.separator_class)) $(this).removeClass(options.hover_class);

				// 有子菜单，则隐藏
				if ($(this).hasClass(options.has_child_class)) {
					var submenu = $(this).children('ul');
					submenu.stop().fadeTo(options.fade_time, 0, function(){
						submenu.hide();
					});
				}
			});
		});
	}
})(jQuery);