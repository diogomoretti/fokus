// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

        // undefined is used here as the undefined global variable in ECMAScript 3 is
        // mutable (ie. it can be changed by someone else). undefined isn't really being
        // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
        // can no longer be modified.

        // window and document are passed through as local variable rather than global
        // as this (slightly) quickens the resolution process and can be more efficiently
        // minified (especially when both are regularly referenced in your plugin).

        // Create the defaults once
        var pluginName = 'fokus',
                defaults = {
                    body: $('body'),
                    navigatorWidth: $(window).width(),
                    navigatorHeight: $(window).height(),
                    overlay: 'fokus',
                    overlayTop: 'fokus-top',
                    overlayRight: 'fokus-right',
                    overlayBottom: 'fokus-bottom',
                    overlayLeft: 'fokus-left',
                    overlayActive: 'fokus-on'
        };

        // The actual plugin constructor
        function Plugin ( element, options ) {
                this.element = element;
                // jQuery has an extend method which merges the contents of two or
                // more objects, storing the result in the first object. The first object
                // is generally empty as we don't want to alter the default options for
                // future instances of the plugin
                this.settings = $.extend( {}, defaults, options );
                this._defaults = defaults;
                this._name = pluginName;
                this.init();
        }

        Plugin.prototype = {
                init: function () {

                        // Get values    
                        var $el      = $( this.element ),
                            settings = this.settings,
                            _this = this;

                        // Place initialization logic here
                        // You already have access to the DOM element and
                        // the options via the instance, e.g. this.element
                        // and this.settings
                        // you can add more functions like the one below and
                        // call them like so: this.yourOtherFunction(this.element, this.settings).
                        $el.on('click', function () {
                            $this = $(this);
                            if ($this.hasClass(settings.overlayActive)) {
                                $this.removeClass(settings.overlayActive);
                                _this.destroyFocus(settings);
                            }
                            else {
                                $this.addClass(settings.overlayActive);
                                _this.makeFocus($this, settings);
                            }
                        });
                },

                makeFocus: function (el, config) {
                        ctx = el.offset();
            
                        elementPaddingTop = parseFloat(el.css('padding-top'));
                        elementPaddingRight = parseFloat(el.css('padding-right'));
                        elementPaddingBottom = parseFloat(el.css('padding-bottom'));
                        elementPaddingLeft = parseFloat(el.css('padding-left'));

                        elementBorderTop = parseFloat(el.css('border-top'));
                        elementBorderRight = parseFloat(el.css('border-right'));
                        elementBorderBottom = parseFloat(el.css('border-bottom'));
                        elementBorderLeft = parseFloat(el.css('border-left'));

                        elementWidth = el.width() + elementPaddingRight + elementPaddingLeft + elementBorderLeft + elementBorderRight;
                        elementHeight = el.height() + elementPaddingTop + elementPaddingBottom + elementBorderTop + elementBorderBottom;

                        distanceTop = ctx.top;
                        distanceRight = ctx.left + elementWidth;
                        distanceBottom = ctx.top + elementHeight;
                        distanceLeft = ctx.left;

                        distanceTopElement = distanceTop + elementHeight;

                        distanceElementEndToRight = config.navigatorWidth - distanceRight;
                        distanceElementEndToBottom = config.body.height() - distanceTopElement;
                        distanceBetweenLeftRight = config.navigatorWidth - (distanceElementEndToRight + distanceLeft);

                        config.body.prepend('<div class="' + config.overlay + ' ' + config.overlayTop + '"/><div class="' + config.overlay + ' ' + config.overlayRight + '"/><div class="' + config.overlay + ' ' + config.overlayBottom + '"/><div class="' + config.overlay + ' ' + config.overlayLeft + '"/>');

                        config.body.find('.' + config.overlayTop).css({
                                                left: 0,
                                                right: 0,
                                                top: 0,
                                                width: '100%',
                                                height: distanceTop + 'px'
                                            });
                        config.body.find('.' + config.overlayRight).css({
                                                right: 0,
                                                width: distanceElementEndToRight + 'px',
                                                top: distanceTop + 'px',
                                                left: distanceRight + 'px',
                                                height: (distanceElementEndToBottom + elementHeight) + 'px'
                                            });
                        config.body.find('.' + config.overlayBottom).css({
                                                top: distanceTopElement + 'px',
                                                left: distanceLeft + 'px',
                                                right: distanceRight + 'px',
                                                width: distanceBetweenLeftRight + 'px',
                                                height: distanceElementEndToBottom + 'px'
                                            });
                        config.body.find('.' + config.overlayLeft).css({
                                                left: 0,
                                                bottom: 0,
                                                width: distanceLeft + 'px',
                                                top: distanceTop + 'px',
                                                height: (distanceElementEndToBottom + elementHeight) + 'px'
                                            });
                },

                destroyFocus: function (config) {
                        config.body.find('.' + config.overlay).remove();
                }
        };

        // A really lightweight plugin wrapper around the constructor,
        // preventing against multiple instantiations
        $.fn[ pluginName ] = function ( options ) {
                this.each(function() {
                        if ( !$.data( this, 'plugin_' + pluginName ) ) {
                                $.data( this, 'plugin_' + pluginName, new Plugin( this, options ) );
                        }
                });

                // chain jQuery functions
                return this;
        };

})( jQuery, window, document );

$('.teste').fokus();