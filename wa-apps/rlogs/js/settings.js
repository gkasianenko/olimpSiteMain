(function ($) {
    $.rlogs = $.rlogs ? $.rlogs : {};
    $.rlogs.settings = {

        init: function () {

            $('#settings-form').submit(function() {
                let form = $(this);
                $.post(form.attr('action'), $(this).serialize(), function (html) {
                    // $("#content").html(html);
                });
                return false;
            });

        },


    };
})(jQuery);
