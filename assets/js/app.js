/*
var navigatorWidth = $(window).width();

var element = document.getElementById("element");

var rect = element.getBoundingClientRect();

console.log(navigatorWidth)
console.log(rect.top, rect.right, rect.bottom, rect.left);

var fokusTop = rect.top - 5;
var fokusLeft = rect.left - 5;
var fokusRight = rect.right + 5;

var r = navigatorWidth - fokusRight;

var elem = $('body')
elem.prepend('<div class="fokus fokus-top"/><div class="fokus fokus-bottom"/><div class="fokus fokus-right"/><div class="fokus fokus-left"/>')
elem.find('.fokus-top').css({
                        width  : '100%',
                        height : fokusTop + 'px'
                    });
elem.find('.fokus-right').css({
                        width  : r + 'px',
                        top : fokusTop + 'px',
                        left : fokusRight + 'px'
                    });
elem.find('.fokus-bottom').css({
                        width  : fokusLeft + 'px',
                        top : fokusTop + 'px'
                    });
elem.find('.fokus-left').css({
                        width  : fokusLeft + 'px',
                        top : fokusTop + 'px'
                    });