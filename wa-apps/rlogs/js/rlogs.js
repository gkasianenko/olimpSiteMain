(function ($) {
    $.storage = new $.store();
    $.rlogs = {
        namespace: '.rlogs',
        load_from_hash: 0,
        hash: '',
        raw_hash: '',
        ajaxPull: {},
        options: {},
        debug: {},
        date: new Date(),

        /**
         *
         * @param options
         */
        init: function (options) {
            let app = $.rlogs;


            $(document).on('click', '#rlogs-action-rotate', function() {
                $('#rlogs-action-rotate').attr('disabled', true);
                $('.rlogs-process-rotate').show();
                $.ajax({
                    url: '?module=rotate&action=run',
                    method: 'post',
                    async: true,
                    success: function () {
                        $('#rlogs-action-rotate').removeAttr('disabled');
                        $('.rlogs-process-rotate').hide();
                    },
                });
            });

            if (typeof($.History) != "undefined") {
                $.History.bind(function () {
                    app.dispatch();
                });

                $.History.unbind = function (state, handler) {
                    if (handler) {
                        if ($.History.handlers.specific[state]) {
                            $.each($.History.handlers.specific[state], function (i, h) {
                                if (h === handler) {
                                    $.History.handlers.specific[state].splice(i, 1);
                                    return false;
                                }
                            });
                        }
                    } else {
                        // We have a generic handler
                        handler = state;
                        $.each($.History.handlers.generic, function (i, h) {
                            if (h === handler) {
                                $.History.handlers.generic.splice(i, 1);
                                return false;
                            }
                        });
                    }
                };

                $.History.one = function(state, handler) {
                    if (!handler) {
                        handler = state;
                        state = null;
                    }
                    let h = function() {
                        handler.call(this);
                        $.History.unbind.apply($.History, state ? [state, h] : [h]);
                    };
                    $.History.bind.apply($.History, state ? [state, h] : [h]);
                };
            }

            $.wa.errorHandler = function (xhr) {
                $.storage.del('glogs/hash');
                if (xhr.status === 403) {
                    $("#content").html('<div class="content left'+$.rlogs_sidebar.width+'px"><div class="block double-padded">' + xhr.responseText + '</div></div>');
                    return false;
                } else {
                    if (app.load_from_hash) {
                        $.wa.setHash('#/');
                        return false;
                    }
                }
                return true;
            };

            this.options = options;

            let hash = window.location.hash || $.storage.get('rlogs/hash');

            // console.log(hash);
            // console.log(window.location.hash);

            hash = '';

            if (hash && hash != window.location.hash) {
                this.load_from_hash = 2;
                $.wa.setHash('#/' + hash);
            } else {
                // console.log('run dispatch');
                this.dispatch();
            }

        },


        /* диспетчер страниц */
        dispatch: function (hash) {
            let app = $.rlogs;
            if (app.ignore_dispatch) {
                app.ignore_dispatch--;
                return;
            }

            app.hash = '';
            if (hash === undefined) {
                hash = window.location.hash;
            }
            hash = hash.replace(/^[^#]*#\/*/, ''); /* fix syntax highlight*/


            let reserved = [
                'search', 'tag', 'pages', 'plugins', 'app',
            ];

            app.raw_hash = hash;

            // console.log(hash);
            // return;

            if (hash) {
                hash = hash.split('/');
                if (hash[0]) {
                    let actionName = "";
                    let attrMarker = hash.length;
                    for (let i = 0; i < hash.length; i++) {

                        // console.log(actionName);
                        // console.log(reserved.includes(actionName));

                        let h = hash[i];
                        if (i < 2) {
//                            console.log(actionName);
                            if (i === 0) {
                                actionName = h;
                            } else if (reserved.includes(actionName)) {
                                attrMarker = i;
                                break;
                            } else if (parseInt(h, 10) != h && h.indexOf('=') == -1) {
                                actionName += h.substr(0,1).toUpperCase() + h.substr(1);
                            } else {
                                attrMarker = i;
                                break;
                            }
                        } else {
                            attrMarker = i;
                            break;
                        }
                    }

                    let attr = hash.slice(attrMarker);

                    // console.log(hash);
                    app.hash = '/' + hash.slice(0, 2).join('/');

                    // console.log(app.hash);
                    // console.log(attr);
                    if (~app.hash.indexOf('rlogs')) {
                        app.hash = '';
                    }

                    this.beforeAnyAction(actionName, attr);
                    if (this[actionName + 'Action']) {
                        if (this.load_from_hash) {
                            this.load_from_hash--;
                        }
                        // console.log('--------------');
                        // console.log(actionName + 'Action');
                        // console.log(attr);
                        // console.log('--------------');
                        this[actionName + 'Action'].apply(this, attr);
                        // console.log(actionName + 'Action');

                        // save last page to return to by default later
                        $.storage.set('rlogs/hash', app.hash);
                    } else {
                        $.storage.del('rlogs/hash');
                        console && console.log('Invalid action name:', actionName+'Action');
                    }

                } else {
                    this.beforeAnyAction();
                    this.defaultAction();
                }

            } else {
                this.beforeAnyAction();
                this.defaultAction();
            }
        },

        /* установка опций */
        setOption: function(name, value) {
            this.options[name] = value;
        },

        /* получение опций */
        getOption: function(name) {
            return this.options[name];
        },

        /* действие перед лубым событием */
        beforeAnyAction: function() {},

        /* очистка параметров */
        initClearance: function() {
        },

        /**
         *
         * @param url
         * @param data
         * @param callback
         * @param wrapper
         */
        load: function (url, data, callback, wrapper) {
            let target = $('#content');
            if (typeof data == 'function') {
                wrapper = callback || null;
            }
            if (wrapper) {
                target.empty().append(wrapper);
                target = target.find(':last-child');
            }

            if (typeof data == 'function') {
                target.load(url, data);
            } else {
                target.load(url, data, callback);
            }
        },


        /**
         * Debug trace helper
         *
         * @param String message
         * @param {} data
         */
        trace: function(message, data) {
            var timestamp = null;
            if (this.options.debug && console) {
                timestamp = this.time.interval();
                // console.log(timestamp + ' ' + message, data);
            }
            return timestamp;
        },


        /**
         *
         */
        defaultAction: function () {
            let app = $.rlogs;
//            $.apishop.loadDispatch(arguments, function() {
            app.load("?module=backend");
//            });
        },

        /**
         *
         * @param params
         */
        pluginsAction: function(params) {
            let app = $.rlogs;
            app.initClearance();
            $('#p-sidebar li.selected').removeClass('selected');
            $('#p-sidebar #sidebar-plugins').addClass('selected');

            if (!$('#wa-plugins-container').length) {
                app.load("?module=plugins");
            } else {
                $.plugins.dispatch('#/plugins/' + params);
            }
        },

        settingsAction: function(params) {
            let app = $.rlogs;
            app.load("?module=settings");
        },

    };

})(jQuery);