/*!
 * customizer v1.2.0
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('uikit'), require('vuex'), require('vue'), require('uikit-util'), require('vue-i18n')) :
  typeof define === 'function' && define.amd ? define(['uikit', 'vuex', 'vue', 'uikit-util', 'vue-i18n'], factory) :
  (global = global || self, global.VueCustomizer = factory(global.UIkit, global.Vuex, global.Vue, global.UIkit.util, global.VueI18n));
}(this, (function (uikit, Vuex, Vue, uikitUtil, VueI18n) { 'use strict';

  var Vuex__default = 'default' in Vuex ? Vuex['default'] : Vuex;
  Vue = Vue && Object.prototype.hasOwnProperty.call(Vue, 'default') ? Vue['default'] : Vue;
  VueI18n = VueI18n && Object.prototype.hasOwnProperty.call(VueI18n, 'default') ? VueI18n['default'] : VueI18n;

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  var script = {
    props: {
      config: {
        type: Object,
        required: true
      }
    },
    computed: _extends({}, Vuex.mapGetters(['theme']), {}, Vuex.mapGetters('sidebar', ['openPanels', 'openPanelsCount']), {
      name: function name() {
        return this.config.name;
      },
      title: function title() {
        return this.config.title;
      },
      badge: function badge() {
        return this.config.badge;
      }
    }),
    methods: Vuex.mapActions('sidebar', ['closePanel']),
    mounted: function mounted() {
      var _this = this;

      this.$nextTick(function () {
        var breadcrumb = uikit.slider(_this.$refs.breadcrumb);
        breadcrumb.show(breadcrumb.length - 1);
      });
    }
  };

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
      if (typeof shadowMode !== 'boolean') {
          createInjectorSSR = createInjector;
          createInjector = shadowMode;
          shadowMode = false;
      }
      // Vue.extend constructor export interop.
      const options = typeof script === 'function' ? script.options : script;
      // render functions
      if (template && template.render) {
          options.render = template.render;
          options.staticRenderFns = template.staticRenderFns;
          options._compiled = true;
          // functional template
          if (isFunctionalTemplate) {
              options.functional = true;
          }
      }
      // scopedId
      if (scopeId) {
          options._scopeId = scopeId;
      }
      let hook;
      if (moduleIdentifier) {
          // server build
          hook = function (context) {
              // 2.3 injection
              context =
                  context || // cached call
                      (this.$vnode && this.$vnode.ssrContext) || // stateful
                      (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
              // 2.2 with runInNewContext: true
              if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                  context = __VUE_SSR_CONTEXT__;
              }
              // inject component styles
              if (style) {
                  style.call(this, createInjectorSSR(context));
              }
              // register component module identifier for async chunk inference
              if (context && context._registeredComponents) {
                  context._registeredComponents.add(moduleIdentifier);
              }
          };
          // used by ssr in case component is cached and beforeCreate
          // never gets called
          options._ssrRegister = hook;
      }
      else if (style) {
          hook = shadowMode
              ? function (context) {
                  style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
              }
              : function (context) {
                  style.call(this, createInjector(context));
              };
      }
      if (hook) {
          if (options.functional) {
              // register for functional component in vue file
              const originalRender = options.render;
              options.render = function renderWithStyleInjection(h, context) {
                  hook.call(context);
                  return originalRender(h, context);
              };
          }
          else {
              // inject component registration as beforeCreate hook
              const existing = options.beforeCreate;
              options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
          }
      }
      return script;
  }

  /* script */
  var __vue_script__ = script;
  /* template */

  var __vue_render__ = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c("div", {
      staticClass: "customizer-panel"
    }, [_c("div", {
      staticClass: "customizer-panel-title"
    }, [_c("button", {
      staticClass: "uk-button customizer-panel-back",
      attrs: {
        type: "button"
      },
      on: {
        click: function click($event) {
          $event.preventDefault();
          return _vm.closePanel();
        }
      }
    }, [_c("span", {
      staticClass: "uk-position-center",
      attrs: {
        "data-uk-icon": "icon: chevron-left"
      }
    })]), _vm._v(" "), _c("h3", [_vm.openPanelsCount ? _c("div", {
      ref: "breadcrumb",
      staticClass: "customizer-panel-breadcrumb uk-slider"
    }, [_c("ul", {
      staticClass: "uk-breadcrumb uk-slider-items"
    }, [_c("li", [_c("a", {
      on: {
        click: function click($event) {
          $event.preventDefault();
          return _vm.closePanel(0);
        }
      }
    }, [_vm._v(_vm._s(_vm.theme.name))])]), _vm._v(" "), _vm._l(_vm.openPanels, function (panel, index) {
      return _c("li", [_c("a", {
        directives: [{
          name: "show",
          rawName: "v-show",
          value: index !== _vm.openPanelsCount - 1,
          expression: "index !== (openPanelsCount - 1)"
        }],
        on: {
          click: function click($event) {
            $event.preventDefault();
            return _vm.closePanel(index + 1);
          }
        }
      }, [_vm._v("\n                            " + _vm._s(panel.title) + "\n                            ")])]);
    })], 2)]) : _vm._e(), _vm._v(" "), _c("div", {
      staticClass: "customizer-panel-text uk-text-truncate"
    }, [_vm._v("\n                " + _vm._s(_vm.title) + "\n                "), _vm.badge ? _c("span", {
      staticClass: "uk-badge customizer-panel-badge"
    }, [_vm._v(_vm._s(_vm.badge))]) : _vm._e()])])]), _vm._v(" "), _vm._t("default", [_vm._v(_vm._s(_vm.$t("Empty panel")))])], 2);
  };

  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;
  /* style */

  var __vue_inject_styles__ = undefined;
  /* scoped */

  var __vue_scope_id__ = undefined;
  /* module identifier */

  var __vue_module_identifier__ = undefined;
  /* functional template */

  var __vue_is_functional_template__ = false;
  /* style inject */

  /* style inject SSR */

  /* style inject shadow dom */

  var __vue_component__ = normalizeComponent({
    render: __vue_render__,
    staticRenderFns: __vue_staticRenderFns__
  }, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);

  var script$1 = {
    components: {
      Panel: __vue_component__
    },
    data: function data() {
      return {
        last: null,
        initialWidth: 0
      };
    },
    computed: _extends({}, Vuex.mapGetters(['theme']), {}, Vuex.mapGetters('sidebar', ['sectionList', 'sectionListCount', 'openPanels', 'openPanelsCount', 'panel'])),
    created: function created() {
      this.stylesheet = document.createElement('style');
      this.stylesheet.type = 'text/css';
      document.head.appendChild(this.stylesheet);
    },
    mounted: function mounted() {
      var _this = this;

      this.$nextTick(function () {
        _this.initialWidth = _this.$el.offsetWidth;
      });
    },
    methods: _extends({}, Vuex.mapActions('sidebar', ['openPanel', 'closePanel']), {
      beforeEnter: function beforeEnter(el) {
        this.stylesheet.innerHTML = this.getStyle(); //this.last = this.panel

        if (~el.style.left.indexOf('-')) {
          el.style.left = '-100%';
        }
      },
      enter: function enter(el) {
        el.offsetWidth;
        el.style.left = 0; //el.scrollTop && (el.scrollTop = 0)
      },
      beforeLeave: function beforeLeave(el) {
        el.style.left = 0;
        el.offsetWidth;
      },
      leave: function leave(el) {
        this.$nextTick(function () {
          return el.style.left = function (el) {
            for (; el.nextElementSibling;) {
              if (el.nextElementSibling.classList.contains('v-enter')) {
                return true;
              }

              el = el.nextElementSibling;
            }

            return false;
          }(el) ? '-100%' : '';
        });
      },
      afterLeave: function afterLeave() {//this.last = this.panel
      },
      getStyle: function getStyle() {
        return this.panel ? ".customizer.expanded { margin-left: " + (this.panel.width || this.initialWidth) + "px; }\n\n                    .expanded .customizer-sidebar { width: " + (this.panel.width || this.initialWidth) + "px; }" : '';
      }
    })
  };

  /* script */
  var __vue_script__$1 = script$1;
  /* template */

  var __vue_render__$1 = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c("transition-group", {
      ref: "sidebar",
      attrs: {
        tag: "div"
      },
      on: {
        "before-enter": _vm.beforeEnter,
        enter: _vm.enter,
        "before-leave": _vm.beforeLeave,
        leave: _vm.leave,
        "after-leave": _vm.afterLeave
      }
    }, [_c("div", {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: !_vm.panel,
        expression: "!panel"
      }],
      key: "rootSection",
      ref: "root",
      staticClass: "customizer-panel"
    }, [_c("div", {
      staticClass: "customizer-panel-title"
    }, [_c("h3", [_c("div", {
      staticClass: "customizer-panel-breadcrumb"
    }, [_c("ul", {
      staticClass: "uk-breadcrumb"
    }, [_c("li", [_c("span", [_vm._v(_vm._s(_vm.$t("You are customizing")))])])])]), _vm._v(" "), _c("div", {
      staticClass: "customizer-panel-text uk-text-truncate"
    }, [_vm._v(_vm._s(_vm.theme.name))])])]), _vm._v(" "), _vm.sectionListCount ? _c("ul", {
      staticClass: "uk-nav uk-nav-default customizer-field-menu"
    }, _vm._l(_vm.sectionList, function (section) {
      return _c("li", {
        key: "sec-" + section.name
      }, [_c("h3", {
        staticClass: "customizer-field-menu-title",
        attrs: {
          tabindex: "0"
        },
        on: {
          click: function click($event) {
            $event.preventDefault();
            return _vm.openPanel(section.name);
          }
        }
      }, [_vm._v("\n                    " + _vm._s(section.title) + "\n                    "), section.tooltip ? _c("span", {
        staticClass: "customizer-field-tooltip",
        attrs: {
          title: section.tooltip,
          "data-uk-tooltip": "delay: 500"
        }
      }, [_vm._v("?")]) : _vm._e(), _vm._v(" "), section.info ? _c("a", {
        staticClass: "customizer-field-info",
        attrs: {
          href: section.info,
          title: _vm.$t("go to instructions"),
          target: "_blank"
        },
        on: {
          click: function click($event) {
            $event.stopPropagation();
          }
        }
      }, [_vm._v("i")]) : _vm._e(), _vm._v(" "), _c("span", {
        staticClass: "uk-position-center-right uk-position-small",
        attrs: {
          "data-uk-icon": "chevron-right"
        }
      })])]);
    }), 0) : _c("div", {
      staticClass: "uk-alert uk-alert-warning customizer-panel-margin-horizontal-indent"
    }, [_c("p", [_vm._v(_vm._s(_vm.$t("Install at least one plugin to work with design theme")) + ": "), _c("a", {
      attrs: {
        href: _vm.$store.getters.route.backend + "customizer/?module=plugins"
      }
    }, [_vm._v(_vm._s(_vm.$t("search plugins")))])])])]), _vm._v(" "), _vm._l(_vm.openPanels, function (pan) {
      return _c("panel", {
        directives: [{
          name: "show",
          rawName: "v-show",
          value: pan === _vm.panel,
          expression: "pan === panel"
        }],
        key: pan.name,
        ref: "panels",
        refInFor: true,
        attrs: {
          config: pan
        }
      }, [_vm._t("panel", [_vm._v(_vm._s(_vm.$t("Empty panel")))], {
        panel: pan
      })], 2);
    })], 2);
  };

  var __vue_staticRenderFns__$1 = [];
  __vue_render__$1._withStripped = true;
  /* style */

  var __vue_inject_styles__$1 = undefined;
  /* scoped */

  var __vue_scope_id__$1 = undefined;
  /* module identifier */

  var __vue_module_identifier__$1 = undefined;
  /* functional template */

  var __vue_is_functional_template__$1 = false;
  /* style inject */

  /* style inject SSR */

  /* style inject shadow dom */

  var __vue_component__$1 = normalizeComponent({
    render: __vue_render__$1,
    staticRenderFns: __vue_staticRenderFns__$1
  }, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, undefined, undefined);

  var script$2 = {
    computed: _extends({}, Vuex.mapState('sidebar', ['collapse']), {
      title: function title() {
        return this.collapse ? this.$t('Expand sidebar') : this.$t('Collapse sidebar');
      },
      icon: function icon() {
        return this.collapse ? 'triangle-right' : 'triangle-left';
      }
    }),
    methods: Vuex.mapMutations('sidebar', ['toggleCollapseStatus'])
  };

  /* script */
  var __vue_script__$2 = script$2;
  /* template */

  var __vue_render__$2 = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c("button", {
      staticClass: "uk-button customizer-button-collapse",
      attrs: {
        type: "button",
        title: _vm.title
      },
      on: {
        click: _vm.toggleCollapseStatus
      }
    }, [_c("span", {
      staticClass: "uk-position-center",
      attrs: {
        "data-uk-icon": _vm.icon
      }
    })]);
  };

  var __vue_staticRenderFns__$2 = [];
  __vue_render__$2._withStripped = true;
  /* style */

  var __vue_inject_styles__$2 = undefined;
  /* scoped */

  var __vue_scope_id__$2 = undefined;
  /* module identifier */

  var __vue_module_identifier__$2 = undefined;
  /* functional template */

  var __vue_is_functional_template__$2 = false;
  /* style inject */

  /* style inject SSR */

  /* style inject shadow dom */

  var __vue_component__$2 = normalizeComponent({
    render: __vue_render__$2,
    staticRenderFns: __vue_staticRenderFns__$2
  }, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, undefined, undefined, undefined);

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  var script$3 = {
    data: function data() {
      return {
        device: 'desktop',
        devices: {
          desktop: {
            name: 'Desktop'
          },
          tablet: {
            name: 'Tablet',
            width: 720,
            height: 1080
          },
          phone: {
            name: 'Phone',
            width: 320,
            height: 480
          }
        }
      };
    },
    created: function created() {
      this.stylesheet = document.createElement('style');
      this.stylesheet.type = 'text/css';
      document.head.appendChild(this.stylesheet);
    },
    watch: {
      device: function device(val, oldVal) {
        this.stylesheet.innerHTML = this.getStyle(this.devices[val].width, this.devices[val].height);
      }
    },
    methods: {
      getStyle: function getStyle(width, height) {
        return width && height ? ".customizer-main {\n\n                margin: auto 0 auto -" + width / 2 + "px;\n\n                width: " + width + "px;\n\n                height: " + height + "px;\n\n                max-width: 100%;\n\n                max-height: 100%;\n\n                left: 50%;\n\n              }" : '';
      }
    }
  };

  /* script */
  var __vue_script__$3 = script$3;
  /* template */

  var __vue_render__$3 = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c("div", {
      staticClass: "customizer-devices"
    }, _vm._l(_vm.devices, function (_, d) {
      return _c("button", {
        staticClass: "uk-button customizer-button-device",
        "class": {
          "uk-active": _vm.device === d
        },
        attrs: {
          type: "button"
        },
        on: {
          click: function click($event) {
            $event.preventDefault();
            _vm.device = d;
          }
        }
      }, [_c("span", {
        staticClass: "uk-position-center",
        attrs: {
          "data-uk-icon": d
        }
      })]);
    }), 0);
  };

  var __vue_staticRenderFns__$3 = [];
  __vue_render__$3._withStripped = true;
  /* style */

  var __vue_inject_styles__$3 = undefined;
  /* scoped */

  var __vue_scope_id__$3 = undefined;
  /* module identifier */

  var __vue_module_identifier__$3 = undefined;
  /* functional template */

  var __vue_is_functional_template__$3 = false;
  /* style inject */

  /* style inject SSR */

  /* style inject shadow dom */

  var __vue_component__$3 = normalizeComponent({
    render: __vue_render__$3,
    staticRenderFns: __vue_staticRenderFns__$3
  }, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, false, undefined, undefined, undefined);

  //
  var script$4 = {
    data: function data() {
      return {
        values: {},
        target: '',
        action: '',
        method: 'POST'
      };
    },
    destroyed: function destroyed() {
      uikitUtil.remove(this.$el);
    },
    methods: {
      submit: function submit() {
        this.$el.submit();
        return this;
      },
      encode: function encode(value) {
        return uikitUtil.isObject(value) ? JSON.stringify(value) : value;
      }
    }
  };

  /* script */
  var __vue_script__$4 = script$4;
  /* template */

  var __vue_render__$4 = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c("form", {
      attrs: {
        action: _vm.action,
        method: _vm.method,
        target: _vm.target,
        hidden: ""
      }
    }, _vm._l(_vm.values, function (value, name) {
      return _c("input", {
        key: name,
        attrs: {
          name: name,
          type: "hidden"
        },
        domProps: {
          value: _vm.encode(value)
        }
      });
    }), 0);
  };

  var __vue_staticRenderFns__$4 = [];
  __vue_render__$4._withStripped = true;
  /* style */

  var __vue_inject_styles__$4 = undefined;
  /* scoped */

  var __vue_scope_id__$4 = undefined;
  /* module identifier */

  var __vue_module_identifier__$4 = undefined;
  /* functional template */

  var __vue_is_functional_template__$4 = false;
  /* style inject */

  /* style inject SSR */

  /* style inject shadow dom */

  var __vue_component__$4 = normalizeComponent({
    render: __vue_render__$4,
    staticRenderFns: __vue_staticRenderFns__$4
  }, __vue_inject_styles__$4, __vue_script__$4, __vue_scope_id__$4, __vue_is_functional_template__$4, __vue_module_identifier__$4, false, undefined, undefined, undefined);

  //
  var script$5 = {
    data: function data() {
      return {
        name: '',
        loaded: false
      };
    },
    destroyed: function destroyed() {
      uikitUtil.remove(this.$el);
    },
    methods: {
      load: function load(event) {
        var _this = this;

        var window = this.$el.contentWindow;
        var document = this.$el.contentDocument;

        if (document.body.childNodes.length) {
          event.first = !this.loaded;
          this.loaded = true;
          this.$parent.update({
            event: event,
            window: window,
            document: document
          }, this);
          uikitUtil.on(window, "beforeunload unload", function (event) {
            return _this.$parent.update({
              event: event,
              window: window,
              document: document
            }, _this);
          });
        }
      }
    }
  };

  /* script */
  var __vue_script__$5 = script$5;
  /* template */

  var __vue_render__$5 = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c("iframe", {
      style: !_vm.loaded && {
        zIndex: -1
      },
      attrs: {
        name: _vm.name
      },
      on: {
        load: _vm.load
      }
    });
  };

  var __vue_staticRenderFns__$5 = [];
  __vue_render__$5._withStripped = true;
  /* style */

  var __vue_inject_styles__$5 = undefined;
  /* scoped */

  var __vue_scope_id__$5 = undefined;
  /* module identifier */

  var __vue_module_identifier__$5 = undefined;
  /* functional template */

  var __vue_is_functional_template__$5 = false;
  /* style inject */

  /* style inject SSR */

  /* style inject shadow dom */

  var __vue_component__$5 = normalizeComponent({
    render: __vue_render__$5,
    staticRenderFns: __vue_staticRenderFns__$5
  }, __vue_inject_styles__$5, __vue_script__$5, __vue_scope_id__$5, __vue_is_functional_template__$5, __vue_module_identifier__$5, false, undefined, undefined, undefined);

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  var script$6 = {
    methods: {
      reload: function reload() {
        this.$emit('resolve');
        window.onbeforeunload = null;

        var _final = function _final() {
          return location.reload();
        };

        this.$store.dispatch('close').then(_final, _final);
      }
    }
  };

  /* script */
  var __vue_script__$6 = script$6;
  /* template */

  var __vue_render__$6 = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c("div", [_c("div", {
      staticClass: "uk-modal-header"
    }, [_c("h2", {
      staticClass: "uk-modal-title"
    }, [_vm._v(_vm._s(_vm.$t("Mismatch")))])]), _vm._v(" "), _c("div", {
      staticClass: "uk-modal-body"
    }, [_vm._v("\n        " + _vm._s(_vm.$t("Preview theme does not match customizable design theme.")) + "\n    ")]), _vm._v(" "), _c("div", {
      staticClass: "uk-modal-footer uk-text-right"
    }, [_c("button", {
      staticClass: "uk-button uk-button-default uk-modal-close",
      attrs: {
        type: "button"
      },
      on: {
        click: _vm.reload
      }
    }, [_vm._v(_vm._s(_vm.$t("Reload App")))]), _vm._v(" "), _c("button", {
      staticClass: "uk-button uk-button-primary",
      attrs: {
        autofocus: ""
      },
      on: {
        click: function click($event) {
          _vm.$emit("resolve");

          _vm.$store.dispatch("preview/load");
        }
      }
    }, [_vm._v(_vm._s(_vm.$t("Reload Preview")))])])]);
  };

  var __vue_staticRenderFns__$6 = [];
  __vue_render__$6._withStripped = true;
  /* style */

  var __vue_inject_styles__$6 = undefined;
  /* scoped */

  var __vue_scope_id__$6 = undefined;
  /* module identifier */

  var __vue_module_identifier__$6 = undefined;
  /* functional template */

  var __vue_is_functional_template__$6 = false;
  /* style inject */

  /* style inject SSR */

  /* style inject shadow dom */

  var __vue_component__$6 = normalizeComponent({
    render: __vue_render__$6,
    staticRenderFns: __vue_staticRenderFns__$6
  }, __vue_inject_styles__$6, __vue_script__$6, __vue_scope_id__$6, __vue_is_functional_template__$6, __vue_module_identifier__$6, false, undefined, undefined, undefined);

  var script$7 = {
    data: function data() {
      return {
        channel: 0,
        current: null,
        method: 'POST'
      };
    },
    created: function created() {
      var _this = this;

      this.$store.subscribeAction(function (_ref, state) {
        var type = _ref.type,
            payload = _ref.payload;
        return 'preview/load' === type && _this.load(payload);
      });
    },
    computed: _extends({}, Vuex.mapGetters('preview', ['status', 'src', 'overlay']), {
      loading: function loading() {
        var name = "preview-" + this.channel;
        return this.current && this.current.name !== name;
      }
    }),
    watch: {
      status: function status(val, oldVal) {
        if (val === 3) {
          this.$modal(__vue_component__$6, null, {
            bgClose: false,
            escClose: false
          }).show({
            width: 'xlarge'
          });
        }
      }
    },
    methods: {
      load: function load(values) {
        if (values === void 0) {
          values = {};
        }

        var name = "preview-" + ++this.channel;
        var element = this.$refs.preview;
        this.pending && this.pending.$destroy();
        this.pending = this.create(__vue_component__$5, {
          name: name
        }, element);
        this.create(__vue_component__$4, {
          values: values,
          target: name,
          action: values.src ? values.src : this.src,
          method: this.method
        }, element).submit().$destroy();
      },
      update: function update(_ref2, current) {
        var event = _ref2.event,
            window = _ref2.window,
            document = _ref2.document;

        if (event.type === 'load') {
          if (event.first) {
            this.current && this.current.$destroy();
            this.current = current;
            this.pending = this.loading && this.pending;
          }

          this.loading || this.$store.dispatch('preview/ready', {
            event: event,
            window: window,
            document: document
          });
        } else {
          this.$store.dispatch("preview/" + event.type, {
            event: event,
            window: window,
            document: document
          });
        }
      },
      create: function create(component, _data, element) {
        if (element === void 0) {
          element = null;
        }

        var comp = new Vue({
          parent: this,
          "extends": component,
          data: function data() {
            return _data;
          }
        });
        element && element.appendChild(comp.$mount().$el);
        return comp;
      }
    }
  };

  /* script */
  var __vue_script__$7 = script$7;
  /* template */

  var __vue_render__$7 = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c("div", {
      staticClass: "customizer-preview"
    }, [_c("div", {
      ref: "preview",
      staticClass: "customizer-preview-iframe"
    }), _vm._v(" "), _c("transition", {
      attrs: {
        "enter-active-class": "uk-transition-fade",
        "leave-active-class": "uk-transition-fade"
      }
    }, [_c("div", {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.loading || _vm.overlay,
        expression: "loading || overlay"
      }],
      staticClass: "customizer-overlay uk-position-cover uk-position-z-index uk-overlay uk-overlay-default"
    })]), _vm._v(" "), _c("transition", {
      attrs: {
        "enter-active-class": "uk-transition-fade",
        "leave-active-class": "uk-transition-fade"
      }
    }, [_c("div", {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: !_vm.current,
        expression: "!current"
      }],
      staticClass: "uk-position-top uk-position-z-index"
    }, [_c("div", {
      staticClass: "button-progress-top uk-button uk-button-default uk-button-loading uk-width-1-1"
    }, [_vm._v(" ")])])])], 1);
  };

  var __vue_staticRenderFns__$7 = [];
  __vue_render__$7._withStripped = true;
  /* style */

  var __vue_inject_styles__$7 = undefined;
  /* scoped */

  var __vue_scope_id__$7 = undefined;
  /* module identifier */

  var __vue_module_identifier__$7 = undefined;
  /* functional template */

  var __vue_is_functional_template__$7 = false;
  /* style inject */

  /* style inject SSR */

  /* style inject shadow dom */

  var __vue_component__$7 = normalizeComponent({
    render: __vue_render__$7,
    staticRenderFns: __vue_staticRenderFns__$7
  }, __vue_inject_styles__$7, __vue_script__$7, __vue_scope_id__$7, __vue_is_functional_template__$7, __vue_module_identifier__$7, false, undefined, undefined, undefined);

  //
  //
  //
  //
  //
  //
  //
  //
  var script$8 = {
    data: function data() {
      return {
        loading: false
      };
    },
    methods: {
      back: function back() {
        var _this = this;

        if (this.loading || this.$store.state.status !== 4) {
          return;
        }

        this.loading = true;
        window.onbeforeunload = null;

        var _final = function _final() {
          return location.assign(_this.$store.getters.route.preview);
        }; // location.assign(this.$store.getters.route.preview)


        this.$store.dispatch('close').then(_final, _final);
      }
    }
  };

  /* script */
  var __vue_script__$8 = script$8;
  /* template */

  var __vue_render__$8 = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c("a", {
      staticClass: "uk-button customizer-button-close",
      "class": {
        "uk-button-loading": _vm.loading
      },
      attrs: {
        title: _vm.$t("Close customizer")
      },
      on: {
        click: function click($event) {
          $event.preventDefault();
          return _vm.back($event);
        }
      }
    }, [_c("span", {
      staticClass: "uk-position-center",
      attrs: {
        "data-uk-close": ""
      }
    })]);
  };

  var __vue_staticRenderFns__$8 = [];
  __vue_render__$8._withStripped = true;
  /* style */

  var __vue_inject_styles__$8 = undefined;
  /* scoped */

  var __vue_scope_id__$8 = undefined;
  /* module identifier */

  var __vue_module_identifier__$8 = undefined;
  /* functional template */

  var __vue_is_functional_template__$8 = false;
  /* style inject */

  /* style inject SSR */

  /* style inject shadow dom */

  var __vue_component__$8 = normalizeComponent({
    render: __vue_render__$8,
    staticRenderFns: __vue_staticRenderFns__$8
  }, __vue_inject_styles__$8, __vue_script__$8, __vue_scope_id__$8, __vue_is_functional_template__$8, __vue_module_identifier__$8, false, undefined, undefined, undefined);

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  var script$9 = {
    methods: {
      reload: function reload() {
        this.$emit('resolve');
        window.onbeforeunload = null;

        var _final = function _final() {
          return location.reload();
        };

        this.$store.dispatch('close').then(_final, _final);
      },
      back: function back() {
        var _this = this;

        this.$emit('resolve');
        window.onbeforeunload = null;

        var _final2 = function _final2() {
          return location.assign(_this.$store.getters.route.preview);
        };

        this.$store.dispatch('close').then(_final2, _final2);
      }
    }
  };

  /* script */
  var __vue_script__$9 = script$9;
  /* template */

  var __vue_render__$9 = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c("div", [_c("div", {
      staticClass: "uk-modal-header"
    }, [_c("h2", {
      staticClass: "uk-modal-title"
    }, [_vm._v(_vm._s(_vm.$t("Published")))])]), _vm._v(" "), _c("div", {
      staticClass: "uk-modal-body"
    }, [_vm._v("\n        " + _vm._s(_vm.$t("Сhanges applied")) + "\n    ")]), _vm._v(" "), _c("div", {
      staticClass: "uk-modal-footer uk-text-right"
    }, [_c("button", {
      staticClass: "uk-button uk-button-default uk-modal-close",
      attrs: {
        type: "button"
      },
      on: {
        click: _vm.reload
      }
    }, [_vm._v(_vm._s(_vm.$t("Return to customize")))]), _vm._v(" "), _c("button", {
      staticClass: "uk-button uk-button-primary",
      attrs: {
        autofocus: ""
      },
      on: {
        click: _vm.back
      }
    }, [_vm._v(_vm._s(_vm.$t("Return to site")))])])]);
  };

  var __vue_staticRenderFns__$9 = [];
  __vue_render__$9._withStripped = true;
  /* style */

  var __vue_inject_styles__$9 = undefined;
  /* scoped */

  var __vue_scope_id__$9 = undefined;
  /* module identifier */

  var __vue_module_identifier__$9 = undefined;
  /* functional template */

  var __vue_is_functional_template__$9 = false;
  /* style inject */

  /* style inject SSR */

  /* style inject shadow dom */

  var __vue_component__$9 = normalizeComponent({
    render: __vue_render__$9,
    staticRenderFns: __vue_staticRenderFns__$9
  }, __vue_inject_styles__$9, __vue_script__$9, __vue_scope_id__$9, __vue_is_functional_template__$9, __vue_module_identifier__$9, false, undefined, undefined, undefined);

  //
  var script$a = {
    data: function data() {
      return {
        sending: false
      };
    },
    methods: {
      publish: function publish() {
        var _this = this;

        if (this.sending || this.$store.state.status !== 4) {
          return;
        }

        this.setStatus(true);
        this.$store.dispatch('publish').then(function () {
          _this.$modal(__vue_component__$9, null, {
            bgClose: false,
            escClose: false
          }).show({
            width: 'xlarge'
          });

          _this.setStatus();
        }, function () {
          _this.setStatus();
        });
      },
      setStatus: function setStatus(val) {
        this.$emit('sending', val);
        this.sending = val;
      }
    }
  };

  /* script */
  var __vue_script__$a = script$a;
  /* template */

  var __vue_render__$a = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c("button", {
      staticClass: "uk-button uk-button-primary uk-button-small",
      "class": {
        "uk-button-sending": _vm.sending
      },
      attrs: {
        type: "button"
      },
      on: {
        click: _vm.publish
      }
    }, [_vm._v(_vm._s(_vm.$t("Publish")))]);
  };

  var __vue_staticRenderFns__$a = [];
  __vue_render__$a._withStripped = true;
  /* style */

  var __vue_inject_styles__$a = undefined;
  /* scoped */

  var __vue_scope_id__$a = undefined;
  /* module identifier */

  var __vue_module_identifier__$a = undefined;
  /* functional template */

  var __vue_is_functional_template__$a = false;
  /* style inject */

  /* style inject SSR */

  /* style inject shadow dom */

  var __vue_component__$a = normalizeComponent({
    render: __vue_render__$a,
    staticRenderFns: __vue_staticRenderFns__$a
  }, __vue_inject_styles__$a, __vue_script__$a, __vue_scope_id__$a, __vue_is_functional_template__$a, __vue_module_identifier__$a, false, undefined, undefined, undefined);

  //
  var script$b = {
    data: function data() {
      return {
        sending: false
      };
    },
    methods: {
      save: function save() {
        var _this = this;

        if (this.sending || this.$store.state.status !== 4) {
          return;
        }

        this.setStatus(true);
        this.$store.dispatch('save').then(function () {
          _this.$modal(__vue_component__$9, null, {
            bgClose: false,
            escClose: false
          }).show({
            width: 'xlarge'
          });

          _this.setStatus();
        }, function () {
          _this.setStatus();
        });
      },
      setStatus: function setStatus(val) {
        this.$emit('sending', val);
        this.sending = val;
      }
    }
  };

  /* script */
  var __vue_script__$b = script$b;
  /* template */

  var __vue_render__$b = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c("button", {
      staticClass: "uk-button uk-button-primary uk-button-small",
      "class": {
        "uk-button-sending": _vm.sending
      },
      attrs: {
        type: "button"
      },
      on: {
        click: _vm.save
      }
    }, [_vm._v(_vm._s(_vm.$t("Save as")))]);
  };

  var __vue_staticRenderFns__$b = [];
  __vue_render__$b._withStripped = true;
  /* style */

  var __vue_inject_styles__$b = undefined;
  /* scoped */

  var __vue_scope_id__$b = undefined;
  /* module identifier */

  var __vue_module_identifier__$b = undefined;
  /* functional template */

  var __vue_is_functional_template__$b = false;
  /* style inject */

  /* style inject SSR */

  /* style inject shadow dom */

  var __vue_component__$b = normalizeComponent({
    render: __vue_render__$b,
    staticRenderFns: __vue_staticRenderFns__$b
  }, __vue_inject_styles__$b, __vue_script__$b, __vue_scope_id__$b, __vue_is_functional_template__$b, __vue_module_identifier__$b, false, undefined, undefined, undefined);

  //
  var script$c = {
    components: {
      ActionPublish: __vue_component__$a,
      ActionSave: __vue_component__$b
    },
    data: function data() {
      return {
        action: 'publish',
        sending: false
      };
    },
    computed: {
      actions: function actions() {
        var actions = this.$store.getters.config.actions;
        return Object.keys(actions).reduce(function (_, name) {
          actions[name] && _.push(name);
          return _;
        }, []);
      }
    },
    methods: {
      change: function change() {
        var i = this.actions.indexOf(this.action);
        this.action = i + 1 > this.actions.length - 1 ? this.actions[0] : this.actions[i + 1];
      }
    }
  };

  /* script */
  var __vue_script__$c = script$c;
  /* template */

  var __vue_render__$c = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _vm.actions.length && _vm.$store.state.status !== 0 ? _c("div", {
      staticClass: "customizer-actions"
    }, [_c("div", {
      staticClass: "uk-button-group"
    }, [_c("action-" + _vm.action, {
      tag: "component",
      on: {
        sending: function sending($event) {
          _vm.sending = $event;
        }
      }
    }), _vm._v(" "), _vm.actions.length > 1 && !_vm.sending ? _c("button", {
      staticClass: "uk-button uk-button-primary uk-button-small",
      style: {
        padding: "0 5px"
      },
      attrs: {
        type: "button"
      },
      on: {
        click: _vm.change
      }
    }, [_c("span", {
      style: {
        verticalAlign: "2px"
      },
      attrs: {
        "data-uk-icon": "cog"
      }
    })]) : _vm._e()], 1)]) : _vm._e();
  };

  var __vue_staticRenderFns__$c = [];
  __vue_render__$c._withStripped = true;
  /* style */

  var __vue_inject_styles__$c = undefined;
  /* scoped */

  var __vue_scope_id__$c = undefined;
  /* module identifier */

  var __vue_module_identifier__$c = undefined;
  /* functional template */

  var __vue_is_functional_template__$c = false;
  /* style inject */

  /* style inject SSR */

  /* style inject shadow dom */

  var __vue_component__$c = normalizeComponent({
    render: __vue_render__$c,
    staticRenderFns: __vue_staticRenderFns__$c
  }, __vue_inject_styles__$c, __vue_script__$c, __vue_scope_id__$c, __vue_is_functional_template__$c, __vue_module_identifier__$c, false, undefined, undefined, undefined);

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  var script$d = {
    methods: {
      reload: function reload() {
        this.$emit('resolve');
        window.onbeforeunload = null;

        var _final = function _final() {
          return location.reload();
        };

        this.$store.dispatch('close').then(_final, _final);
      },
      back: function back() {
        var _this = this;

        this.$emit('resolve');
        window.onbeforeunload = null;

        var _final2 = function _final2() {
          return location.assign(_this.$store.getters.route.preview);
        };

        this.$store.dispatch('close').then(_final2, _final2);
      }
    }
  };

  /* script */
  var __vue_script__$d = script$d;
  /* template */

  var __vue_render__$d = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c("div", [_c("div", {
      staticClass: "uk-modal-header"
    }, [_c("h2", {
      staticClass: "uk-modal-title"
    }, [_vm._v(_vm._s(_vm.$t("Configure")))])]), _vm._v(" "), _c("div", {
      staticClass: "uk-modal-body"
    }, [_vm._v("\n        " + _vm._s(_vm.$t("The design theme you are customizing does not contain Customizer application integration code."))), _c("br"), _vm._v("\n        " + _vm._s(_vm.$t("Follow instructions on")) + " "), _c("a", {
      attrs: {
        href: _vm.$store.getters.route.backend + "customizer/",
        target: "_blank"
      }
    }, [_vm._v(_vm._s(_vm.$t("main page of app")))]), _vm._v(".\n    ")]), _vm._v(" "), _c("div", {
      staticClass: "uk-modal-footer uk-text-right"
    }, [_c("button", {
      staticClass: "uk-button uk-button-default uk-modal-close",
      attrs: {
        type: "button"
      },
      on: {
        click: _vm.reload
      }
    }, [_vm._v(_vm._s(_vm.$t("Return to customize")))]), _vm._v(" "), _c("button", {
      staticClass: "uk-button uk-button-primary",
      attrs: {
        autofocus: ""
      },
      on: {
        click: _vm.back
      }
    }, [_vm._v(_vm._s(_vm.$t("Return to site")))])])]);
  };

  var __vue_staticRenderFns__$d = [];
  __vue_render__$d._withStripped = true;
  /* style */

  var __vue_inject_styles__$d = undefined;
  /* scoped */

  var __vue_scope_id__$d = undefined;
  /* module identifier */

  var __vue_module_identifier__$d = undefined;
  /* functional template */

  var __vue_is_functional_template__$d = false;
  /* style inject */

  /* style inject SSR */

  /* style inject shadow dom */

  var __vue_component__$d = normalizeComponent({
    render: __vue_render__$d,
    staticRenderFns: __vue_staticRenderFns__$d
  }, __vue_inject_styles__$d, __vue_script__$d, __vue_scope_id__$d, __vue_is_functional_template__$d, __vue_module_identifier__$d, false, undefined, undefined, undefined);

  var script$e = {
    name: 'App',
    components: {
      Sidebar: __vue_component__$1,
      Collapse: __vue_component__$2,
      Devices: __vue_component__$3,
      Close: __vue_component__$8,
      Action: __vue_component__$c,
      Preview: __vue_component__$7
    },
    computed: _extends({}, Vuex.mapState(['status']), {}, Vuex.mapGetters('sidebar', ['collapse', 'sectionListCount'])),
    watch: {
      status: function status(val, oldVal) {
        //if (val === oldVal) { return }
        if (val === 3) {
          this.$modal(__vue_component__$d, null, {
            bgClose: false,
            escClose: false
          }).show({
            width: 'xlarge'
          });
        }
      }
    },
    mounted: function mounted() {
      this.$store.commit('setState', {
        name: 'status',
        value: 4
      });
      this.$store.dispatch('preview/load');
    }
  };

  /* script */
  var __vue_script__$e = script$e;
  /* template */

  var __vue_render__$e = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c("div", {
      staticClass: "customizer",
      "class": _vm.collapse ? _vm.collapse : ["expanded"],
      attrs: {
        id: "customizer"
      }
    }, [_c("div", {
      staticClass: "customizer-sidebar"
    }, [_c("div", {
      staticClass: "customizer-sidebar-header"
    }, [_c("Close"), _vm._v(" "), _vm.sectionListCount ? _c("Action") : _vm._e()], 1), _vm._v(" "), _c("div", {
      staticClass: "customizer-sidebar-content"
    }, [_c("Sidebar", {
      scopedSlots: _vm._u([{
        key: "panel",
        fn: function fn(ref) {
          var panel = ref.panel;
          return [panel.component ? _c(panel.component, _vm._b({
            tag: "component",
            attrs: {
              config: panel
            }
          }, "component", panel.props, false)) : _vm.$options.components[panel.name] ? _c(panel.name, _vm._b({
            tag: "component",
            attrs: {
              config: panel
            }
          }, "component", panel.props, false)) : _vm._e()];
        }
      }])
    })], 1), _vm._v(" "), _vm.sectionListCount ? _c("div", {
      staticClass: "customizer-sidebar-footer"
    }, [_c("Collapse"), _vm._v(" "), _c("Devices")], 1) : _vm._e()]), _vm._v(" "), _c("div", {
      staticClass: "customizer-main"
    }, [_vm.sectionListCount ? _c("Preview") : _vm._e()], 1)]);
  };

  var __vue_staticRenderFns__$e = [];
  __vue_render__$e._withStripped = true;
  /* style */

  var __vue_inject_styles__$e = undefined;
  /* scoped */

  var __vue_scope_id__$e = undefined;
  /* module identifier */

  var __vue_module_identifier__$e = undefined;
  /* functional template */

  var __vue_is_functional_template__$e = false;
  /* style inject */

  /* style inject SSR */

  /* style inject shadow dom */

  var __vue_component__$e = normalizeComponent({
    render: __vue_render__$e,
    staticRenderFns: __vue_staticRenderFns__$e
  }, __vue_inject_styles__$e, __vue_script__$e, __vue_scope_id__$e, __vue_is_functional_template__$e, __vue_module_identifier__$e, false, undefined, undefined, undefined);

  var api = {
    publish: function publish(_ref) {
      var route = _ref.route,
          draft = _ref.draft;
      return uikitUtil.ajax(route.ajax + "publish/?id=" + draft.id);
    },
    close: function close(_ref2) {
      var route = _ref2.route,
          draft = _ref2.draft;
      return uikitUtil.ajax(route.ajax + "close/?id=" + draft.id);
    },
    save: function save() {
      return new uikitUtil.Promise(function (resolve, reject) {
        setTimeout(function () {
          resolve();
        }, 10000);
      });
    } // dummy

  };

  /**
   * Utility functions.
   */

  var _set;

  function Util (_ref) {
    var set = _ref.set,
        config = _ref.config;
    _set = set;
  }
  function get(obj, key, def) {
    var parts = key.split('.');

    for (var i = 0; i < parts.length; i++) {
      if (!uikitUtil.isUndefined(obj[parts[i]])) {
        obj = obj[parts[i]];
      } else {
        return def;
      }
    }

    return obj;
  }
  function set(obj, key, val) {
    var parts = key.split('.');

    while (parts.length > 1) {
      var part = parts.shift();

      if (!uikitUtil.isObject(obj[part])) {
        _set(obj, part, {});
      }

      obj = obj[part];
    }

    _set(obj, parts.shift(), val);
  }
  function preparePanels(obj) {
    if (obj === void 0) {
      obj = {};
    }

    return Object.keys(obj).reduce(function (panels, key) {
      panels[key] = obj[key];
      panels[key]['name'] = key;
      return panels;
    }, {});
  }

  var state = {
    stack: [],
    collapse: false
  }; // getters

  var getters = {
    collapse: function collapse(state) {
      return {
        expanded: !state.collapse,
        collapsed: state.collapse
      };
    },
    panels: function panels(state, getters, rootState, rootGetters) {
      return uikitUtil.assign(rootGetters.panels, rootGetters.sections);
    },
    openPanels: function openPanels(state) {
      return state.stack;
    },
    openPanelsCount: function openPanelsCount(state, getters) {
      return getters.openPanels.length;
    },
    sectionList: function sectionList(state, getters, rootState, rootGetters) {
      return Object.keys(rootGetters.sections).map(function (name) {
        return rootGetters.sections[name];
      });
    },
    sectionListCount: function sectionListCount(state, getters) {
      return getters.sectionList.length;
    },
    panel: function panel(state, getters) {
      return getters.openPanelsCount ? getters.openPanels[getters.openPanelsCount - 1] : null;
    }
  }; // actions

  var actions = {
    openPanel: function openPanel(_ref, panel) {
      var commit = _ref.commit,
          getters = _ref.getters;
      panel = uikitUtil.isString(panel) ? getters.panels[panel] : panel;
      panel && commit('openPanel', panel);
    },
    closePanel: function closePanel(_ref2, index) {
      var commit = _ref2.commit,
          getters = _ref2.getters;

      if (index === void 0) {
        index = getters.openPanelsCount;
      }

      do {
        commit('closePanel');
      } while (getters.openPanelsCount > index);
    }
  }; // mutations

  var mutations = {
    openPanel: function openPanel(state, panel) {
      return state.stack.push(panel);
    },
    closePanel: function closePanel(state) {
      return state.stack.pop();
    },
    toggleCollapseStatus: function toggleCollapseStatus(state) {
      return state.collapse = !state.collapse;
    }
  };
  var sidebar = {
    namespaced: true,
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations
  };

  var state$1 = {
    // 0 - uninitialized
    // 1 - get, load
    // 2 - set, send
    // 3 - error
    // 4 - ready
    status: 0
  }; // getters

  var getters$1 = {
    status: function status(state) {
      return state.status;
    },
    src: function src(state, getters, rootState) {
      return get(rootState, 'config.route.preview');
    },
    overlay: function overlay(state, getters, rootState) {
      return state.status !== 4 || rootState.status !== 4;
    }
  }; // actions

  var actions$1 = {
    ready: function ready(_ref, payload) {
      var commit = _ref.commit,
          rootState = _ref.rootState;
      var id = get(payload, 'window.$config.draft.id');
      id && commit('setState', {
        name: 'status',
        value: id === get(rootState, 'config.draft.id') ? 4 : 3
      });
    },
    beforeunload: function beforeunload(_ref2) {
      var commit = _ref2.commit;
      return commit('setState', {
        name: 'status',
        value: 0
      });
    },
    unload: function unload(_ref3) {
      var commit = _ref3.commit;
      return commit('setState', {
        name: 'status',
        value: 0
      });
    },
    load: function load(_ref4) {
      var commit = _ref4.commit;
      return commit('setState', {
        name: 'status',
        value: 1
      });
    }
  }; // mutations

  var mutations$1 = {
    setState: function setState(state, _ref5) {
      var name = _ref5.name,
          value = _ref5.value;
      return set(state, name, value);
    }
  };
  var preview = {
    namespaced: true,
    state: state$1,
    getters: getters$1,
    actions: actions$1,
    mutations: mutations$1
  };

  Vue.use(Vuex__default); // initial state

  var state$2 = {
    // 0 - uninitialized
    // 1 - get, load
    // 2 - set, send
    // 3 - error
    // 4 - ready
    status: 0,
    config: get(window, '$config', {}),
    panels: get(window, '$customizer.panels', {}),
    sections: get(window, '$customizer.sections', {})
  }; // getters

  var getters$2 = {
    config: function config(state) {
      return state.config;
    },
    theme: function theme(state) {
      return get(state, 'config.theme', {});
    },
    draft: function draft(state) {
      return get(state, 'config.draft', {});
    },
    route: function route(state) {
      return get(state, 'config.route', {});
    },
    panels: function panels(state) {
      return preparePanels(state.panels);
    },
    sections: function sections(state) {
      return preparePanels(state.sections);
    }
  }; // actions

  var actions$2 = {
    publish: function publish(_ref) {
      var commit = _ref.commit,
          getters = _ref.getters;
      commit('setState', {
        name: 'status',
        value: 2
      });
      return new uikitUtil.Promise(function (resolve, reject) {
        var route = getters.route,
            draft = getters.draft;
        api.publish({
          route: route,
          draft: draft
        }).then(function () {
          resolve();
          commit('setState', {
            name: 'status',
            value: 4
          });
        }, function () {
          reject();
          commit('setState', {
            name: 'status',
            value: 4
          });
        });
      });
    },
    save: function save(_ref2) {
      var commit = _ref2.commit,
          getters = _ref2.getters;
      commit('setState', {
        name: 'status',
        value: 2
      });
      return new uikitUtil.Promise(function (resolve, reject) {
        var route = getters.route,
            draft = getters.draft;
        api.save({
          route: route,
          draft: draft
        }).then(function () {
          resolve();
          commit('setState', {
            name: 'status',
            value: 4
          });
        }, function () {
          reject();
          commit('setState', {
            name: 'status',
            value: 4
          });
        });
      });
    },
    close: function close(_ref3) {
      var commit = _ref3.commit,
          getters = _ref3.getters;
      commit('setState', {
        name: 'status',
        value: 0
      });
      var route = getters.route,
          draft = getters.draft;
      return api.close({
        route: route,
        draft: draft
      });
    },
    'preview/ready': function previewReady(_ref4, payload) {
      var commit = _ref4.commit,
          getters = _ref4.getters;
      var $config = payload.window.$config;

      if (uikitUtil.isEmpty($config)) {
        commit('setState', {
          name: 'status',
          value: 3
        });
        return;
      } // update route a preview


      if (getters.route.preview !== $config.route.preview) {
        commit('setState', {
          name: 'config.route.preview',
          value: $config.route.preview
        });
      } // update app


      if (getters.config.app !== $config.app) {
        commit('setState', {
          name: 'config.app',
          value: $config.app
        });
        window.history.pushState && window.history.state !== undefined && window.history.pushState({}, '', $config.route.url);
      }
    }
  }; // mutations

  var mutations$2 = {
    setState: function setState(state, _ref5) {
      var name = _ref5.name,
          value = _ref5.value;
      return set(state, name, value);
    },
    setStatus: function setStatus(state, status) {
      return state.status = status;
    },
    setConfig: function setConfig(state, _ref6) {
      var name = _ref6.name,
          value = _ref6.value;
      return set(state.config, name, value);
    }
  };
  var store = new Vuex__default.Store({
    state: state$2,
    getters: getters$2,
    actions: actions$2,
    mutations: mutations$2,
    modules: {
      sidebar: sidebar,
      preview: preview
    }
  });

  Vue.use(VueI18n);
  var i18n = new VueI18n({
    locale: get(store.state, 'config.locale', 'en_US'),
    messages: get(store.state, 'config.messages', {})
  });

  //
  var script$f = {
    provide: function provide() {
      return {
        Modal: this
      };
    },
    data: function data() {
      return {
        width: '',
        container: false
      };
    },
    watch: {
      container: {
        handler: function handler(e) {
          uikitUtil.toggleClass(this.$el, 'uk-modal-container', !!e);
        },
        immediate: true
      }
    },
    mounted: function mounted() {
      this.modal = uikit.modal(this.$el, this.options);
    },
    beforeDestroy: function beforeDestroy() {
      this.modal.$destroy(true);
    },
    methods: {
      show: function show(data) {
        var _this = this;

        !uikitUtil.isEmpty(data) && uikitUtil.each(data, function (value, name) {
          _this.$set(_this, name, value);
        });
        this.modal.show();
        return new uikitUtil.Promise(function (resolve, reject) {
          _this.promise = {
            resolve: resolve,
            reject: reject
          };
        });
      },
      hide: function hide() {
        this.modal.hide();
      },
      hidden: function hidden() {
        this.promise.resolve();
        this.$nextTick(this.$destroy);
      },
      resolve: function resolve(e) {
        this.promise.resolve(e);
        this.modal.hide();
      },
      reject: function reject(e) {
        this.promise.reject(e);
        this.modal.hide();
      }
    }
  };

  /* script */
  var __vue_script__$f = script$f;
  /* template */

  var __vue_render__$f = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c("div", {
      on: {
        show: function show($event) {
          if ($event.target !== $event.currentTarget) {
            return null;
          }

          return _vm.$emit("show");
        },
        hide: function hide($event) {
          if ($event.target !== $event.currentTarget) {
            return null;
          }

          return _vm.$emit("hide");
        },
        hidden: function hidden($event) {
          if ($event.target !== $event.currentTarget) {
            return null;
          }

          return _vm.hidden($event);
        }
      }
    }, [_c("div", {
      "class": ["uk-modal-dialog", _vm.width ? "uk-width-" + _vm.width : ""]
    }, [_c("modal", _vm._b({
      on: {
        resolve: _vm.resolve,
        reject: _vm.reject
      }
    }, "modal", _vm.props, false))], 1)]);
  };

  var __vue_staticRenderFns__$f = [];
  __vue_render__$f._withStripped = true;
  /* style */

  var __vue_inject_styles__$f = undefined;
  /* scoped */

  var __vue_scope_id__$f = undefined;
  /* module identifier */

  var __vue_module_identifier__$f = undefined;
  /* functional template */

  var __vue_is_functional_template__$f = false;
  /* style inject */

  /* style inject SSR */

  /* style inject shadow dom */

  var __vue_component__$f = normalizeComponent({
    render: __vue_render__$f,
    staticRenderFns: __vue_staticRenderFns__$f
  }, __vue_inject_styles__$f, __vue_script__$f, __vue_scope_id__$f, __vue_is_functional_template__$f, __vue_module_identifier__$f, false, undefined, undefined, undefined);

  function Modal (Vue) {
    if (!Vue.prototype.hasOwnProperty('$modal')) {
      Object.defineProperty(Vue.prototype, '$modal', {
        get: function get() {
          var _this = this;

          return function (component, props, options) {
            if (props === void 0) {
              props = {};
            }

            if (options === void 0) {
              options = {};
            }

            var modal = Vue.extend(component);
            options = uikitUtil.assign({
              stack: true,
              bgClose: true,
              escClose: true
            }, options);
            return new Vue({
              parent: _this,
              components: {
                modal: modal
              },
              "extends": __vue_component__$f,
              data: function data() {
                return {
                  props: props,
                  options: options
                };
              }
            }).$mount();
          };
        }
      });
    }
  }

  /**
   * Plugin class
   */
  var Plugin = {
    version: '1.2.0',
    install: function install(Vue) {
      if (this.installed) {
        return;
      }

      window.onbeforeunload = function () {
        return store.dispatch('close');
      };

      Util(Vue);
      Modal(Vue);
      uikitUtil.ready(function () {
        new Vue({
          el: '#customizer',
          store: store,
          i18n: i18n,
          render: function render(h) {
            return h(__vue_component__$e);
          }
        });
      });
    }
  };

  /**
   * Install plugin
   */

  if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(Plugin);
  }

  return Plugin;

})));
