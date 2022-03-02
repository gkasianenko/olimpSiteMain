$(function () {

    var self = {
        init: function () {
            self = this;
            self.events();
        },

        getItemData: function () {
            var hash = window.location.hash;

            var m = hash.match(/\/photo\/(\d+)/);
            if (m) {
                return {
                    type: 'photo',
                    id: m[1]
                };
            }

            var m = hash.match(/\/album\/(\d+)/);
            if (m) {
                return {
                    type: 'album',
                    id: m[1]
                };
            }

            var m = hash.match(/\/tag\/([^/]+)/);
            if (m) {
                return {
                    type: 'tag',
                    id: m[1]
                };
            }

            return null;
        },

        events: function () {
            //show meta tags dialog
            $(document).on('click', '#pm-plugin-dialog-link', function () {
                var data = self.getItemData();

                if (data) {
                    var dialog_content = $('#pm-meta-dialog-content-normal').html();
                    var dialog_config = {
                        buttons: $('#pm-meta-dialog-buttons-normal').html(),
                        height: '600px',
                        onLoad: function () {
                            var dialog = $(this);
                            $.get('?plugin=pm&action=dialog&type=' + data.type + '&id=' + data.id, function (html) {
                                if (html.trim().length) {
                                    dialog.find('.dialog-content-indent').html(html);
                                    dialog.find('.dialog-buttons-gradient :submit').removeAttr('disabled');
                                } else {
                                    dialog.find('.dialog-content-indent').html($('#pm-meta-dialog-content-deleted-' + data.type).html())
                                    dialog.find('.dialog-buttons-gradient').html($('#pm-meta-dialog-buttons-fallback').html());
                                }
                            });
                        },
                        onSubmit: function (d) {
                            var dialog = d;
                            $.post('?plugin=pm&action=dialogSave', $(this).serialize(), function () {
                                d.trigger('close');
                            });
                            return false;
                        },
                        onClose: function () {
                            $(this).remove();
                        }
                    }
                } else {
                    var dialog_content = $('#pm-meta-dialog-content-fallback').html();
                    var dialog_config = {
                        buttons: $('#pm-meta-dialog-buttons-fallback').html(),
                        height: '250px',
                        width: '600px',
                        onClose: function () {
                            $(this).remove();
                        }
                    }
                }

                $(dialog_content).waDialog(dialog_config);
                return false;
            });

            //show default value params
            $(document).on('change', '.pm-default-value', function () {
                var checkbox = $(this);
                var container = checkbox.closest('.value');

                if (checkbox.is(':checked')) {
                    var radio_container = container.find('.pm-default-params');
                    radio_container.slideDown();
                } else {
                    container.find('.pm-default-params').slideUp(function () {
                        container.find('.pm-default-param-options-show').removeAttr('checked');
                        container.find('.pm-default-param-options-container').hide();
                        container.find('.pm-default-param-value').removeAttr('checked');
                    });
                }
            });

            //show default value param options
            $(document).on('change', '.pm-default-param-options-show', function () {
                var radio = $(this);
                if (radio.is(':checked')) { //just in case
                    radio.closest('.pm-default-param-container').find('.pm-default-param-options-container').slideDown();
                    radio.closest('.pm-default-params').find('.pm-default-param-container').each(function () {
                        var radio_container = $(this);
                        var radio_container_radio = radio_container.find('[type="radio"]:first');
                        //hide and unselect other options' values
                        if (!radio_container_radio.is(radio)) {
                            radio_container.find('.pm-default-param-options-container').slideUp(function () {
                                $(this).find('[type="checkbox"]').removeAttr('checked');
                            });
                        }
                    });
                }
            });
        }
    };

    self.init();

});
