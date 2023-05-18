!(function($) {
    "use strict";
    $.fn.magicaccordion = function(options) {
        var defaults = {
            accordion: true,
            mouseType: false,
            speed: 300,
            closedSign: 'collapse',
            openedSign: 'expand',
            openedActive: false,
         };
        var methods = {

            init : function() {
                return this.each(function() {
                	var self = $(this);
                    methods.menuLoad(self);
                });
            },

            menuLoad : function(self){
				var opts = $.extend(defaults, options);
				if(self.hasClass('menu-init')) return;
				self.addClass('menu-init')
				self.find("li").each(function() {
					if ($(this).find("ul").length) {
					    $(this).find("ul").hide();
					    $(this).find("a:first").after("<span class='" + opts.closedSign + "'>" + opts.closedSign + "</span>");
					    if ($(this).find("a:first").attr('href') == "#") {
					        $(this).find("a:first").click(function() {
					            return false
					        });
					    }
					}
				});
		        if (opts.openedActive) {
		            methods.openedActive(self);
		        }
				if (opts.mouseType) {
					self.find("li a").mouseenter(function() {
						methods.menuAction(self, $(this));
					});
				} else {
					self.find("li span").click(function() {
						methods.menuAction(self, $(this));
					});
				}
				var catplus = self.find('.nav-accordion >.level0:hidden').not('.all-cat');
				if (catplus.length){
					self.find('.all-cat').show().click(function(event) {
					    $(this).children().toggle();
					    catplus.slideToggle('slow');
					});
				} else {
					self.find('.all-cat').hide();
				}
         	},

            menuAction : function(self, item){
            	var opts = $.extend(defaults, options);
            	var parent = item.parent();
                if (parent.find("ul").length) {
                    if (opts.accordion) {
                        if (!parent.find("ul").is(':visible')) {
                            var parents = parent.parents("ul");
                            var visible = self.find("ul:visible");
                            visible.each(function(visibleIndex) {
                                var close = true;
                                parents.each(function(parentIndex) {
                                    if (parents[parentIndex] == visible[visibleIndex]) {
                                        close = false;
                                        return false
                                    }
                                });
                                if (close) {
                                    if ($(this).parent().find("ul") != visible[visibleIndex]) {
                                        $(visible[visibleIndex]).slideUp(opts.speed, function() {
                                            $(this).parent("li").find("a:first").next().html(opts.closedSign).addClass(opts.closedSign)
                                        })
                                    }
                                }
                            });
                        }
                    }
                    var parentFirst = parent.find("ul:first");
                    if (parentFirst.is(":visible")) {
                        parentFirst.slideUp(opts.speed, function() {
                            $(this).parent("li").find("a:first").next().delay(opts.speed + 1000).html(opts.closedSign).removeClass(opts.openedSign).addClass(opts.closedSign)
                        });
                    } else {
                        parentFirst.slideDown(opts.speed, function() {
                            $(this).parent("li").find("a:first").next().delay(opts.speed + 1000).html(opts.openedSign).removeClass(opts.closedSign).addClass(opts.openedSign)
                        });
                    }
                }
            },

         	openedActive : function(self){
         		var opts = $.extend(defaults, options);
	            self.find("li.active").each(function() {
	                $(this).parents("ul").slideDown(opts.speed, opts.easing);
	                $(this).parents("ul").parent("li").find("a:first").next().html(opts.openedSign).removeClass(opts.closedSign).addClass(opts.openedSign);
	                $(this).find("ul:first").slideDown(opts.speed, opts.easing);
	                $(this).find("a:first").next().html(opts.openedSign).removeClass(opts.closedSign).addClass(opts.openedSign)
	            });
         	}
        };

        if (methods[options]) { // $("#element").pluginName('methodName', 'arg1', 'arg2');
            return methods[options].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof options === 'object' || !options) { // $("#element").pluginName({ option: 1, option:2 });
            return methods.init.apply(this);
        } else {
            $.error('Method "' + method + '" does not exist in magicaccordion plugin!');
        }

     }
})(jQuery);