

var navigatorWidth = $(window).width();
var navigatorHeight = $(window).height();

var element = document.getElementById("element");

var rect = element.getBoundingClientRect();

console.log($('#element')[0])
console.log(rect.top, rect.right, rect.bottom, rect.left);

var distanceTop = rect.top - 5;
var distanceLeft = rect.left - 5;
var distanceRight = rect.right + 5;
var distanceBottom = rect.bottom + 5;

var r = navigatorWidth - distanceRight;

var c = navigatorWidth - distanceLeft;

var d = navigatorWidth - (r + distanceLeft);

var v = navigatorHeight - distanceBottom;

$(document).keydown(function(event) {
    var ch = event.which;
    if (ch == 27) {
        console.log('Apertei ESC');
    }
});

console.log('Altura do Navegador: ' + navigatorHeight)
console.log('Distancia do Bottom: ' + distanceBottom)

var elem = $('body')
elem.prepend('<div class="fokus fokus-top"/><div class="fokus fokus-right"/><div class="fokus fokus-bottom"/><div class="fokus fokus-left"/><div class="fokus-element"/>')
elem.find('.fokus-top').css({
                        left: 0,
                        right: 0,
                        top: 0,
                        width : '100%',
                        height : distanceTop + 'px'
                    });
elem.find('.fokus-right').css({
                        right: 0,
                        bottom: 0,
                        width : r + 'px',
                        top : distanceTop + 'px',
                        left : distanceRight + 'px'
                    });
elem.find('.fokus-bottom').css({
                        bottom: 0,
                        left : distanceLeft + 'px',
                        right : distanceRight + 'px',
                        width : d + 'px',
                        height : v + 'px'
                    });
elem.find('.fokus-left').css({
                        left: 0,
                        bottom: 0,
                        width : distanceLeft + 'px',
                        top : distanceTop + 'px'
                    });

$('.fokus').on('click', function () {

    //console.log('Clicou fora!')
    $('.fokus').remove();
});
