$(window).bind('load resize', function() {
    var windowHeight = $(window).height(),
        contentHeight = $('footer').height(),
        height = windowHeight - contentHeight;
    $('body > .container').css('min-height', function() {
        return (height > 0) ? height : false;
    });
});