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

        getTemplateHtml: function ($template) {
            var $clone = $template.clone();
            var html = $clone.html();

            $clone.remove();
            return html;
        },

        events: function () {
            //show meta tags dialog
            $(document).on('click', '#pm-plugin-dialog-link', function (event) {
                event.preventDefault();

                var data = self.getItemData();

                if (data) {
                    var dialog_config = {
                        html: self.getTemplateHtml($('#pm-plugin-dialog-template-normal')),
                        onOpen: function ($dialog, dialog) {
                            $.get('?plugin=pm&action=dialog&type=' + data.type + '&id=' + data.id).then(function (html) {
                                if (html.trim().length) {
                                    var $html = $(html);
                                    var $header = $html.find('.dialog-header');
                                    var $content = $html.find('.dialog-content');

                                    $dialog.find('.dialog-header').replaceWith($header);
                                    $dialog.find('.dialog-content').replaceWith($content);
                                    $dialog.find('.js-submit').removeAttr('disabled');
                                } else {
                                    var $deleted_item_dialog_template = $('#pm-plugin-dialog-template-deleted-item').clone();
                                    var $header = $deleted_item_dialog_template.find('.dialog-header');
                                    var $content = $deleted_item_dialog_template.find('.dialog-content');

                                    var $icon = $('<i class="fas fa-times text-red custom-mr-8"></i>');
                                    var error_message = $deleted_item_dialog_template.data('error-' + data.type);

                                    $content.text(error_message)
                                    $content.prepend($icon);

                                    $dialog.find('.dialog-header').replaceWith($header);
                                    $dialog.find('.dialog-content').replaceWith($content);
                                    $dialog.find('.js-submit').remove();
                                }

                                dialog.resize();
                            });

                            $dialog.on('click', '.js-submit', function () {
                                var $submit = $(this);
                                var $spinner = $('<i class="fas fa-spinner fa-spin custom-ml-8"></i>');

                                $submit.append($spinner);

                                $.post('?plugin=pm&action=dialogSave', $dialog.find('form').serialize()).then(function () {
                                    dialog.close();
                                });
                            });
                        }
                    }
                } else {
                    var dialog_config = {
                        html: self.getTemplateHtml($('#pm-plugin-dialog-template-fallback'))
                    }
                }

                $.waDialog(dialog_config);
            });

            //show default value params
            $(document).on('change', '.pm-default-value', function () {
                var $checkbox = $(this);
                var $container = $checkbox.closest('.value');

                if ($checkbox.is(':checked')) {
                    var radio_container = $container.find('.pm-default-params');
                    radio_container.slideDown();
                } else {
                    $container.find('.pm-default-params').slideUp(function () {
                        $container.find('.pm-default-param-options-show').removeAttr('checked');
                        $container.find('.pm-default-param-options-container').hide();
                        $container.find('.pm-default-param-value').removeAttr('checked');
                    });
                }
            });

            //show default value param options
            $(document).on('change', '.pm-default-param-options-show', function () {
                var $radio = $(this);

                if ($radio.is(':checked')) { //just in case
                    $radio.closest('.pm-default-param-container').find('.pm-default-param-options-container').slideDown();
                    $radio.closest('.pm-default-params').find('.pm-default-param-container').each(function () {
                        var $radio_container = $(this);
                        var $radio_container_radio = $radio_container.find('[type="radio"]:first');

                        //hide and unselect other options' values
                        if (!$radio_container_radio.is($radio)) {
                            $radio_container.find('.pm-default-param-options-container').slideUp(function () {
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
