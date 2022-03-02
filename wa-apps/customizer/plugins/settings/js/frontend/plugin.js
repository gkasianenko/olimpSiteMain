/*!
 * settings v1.1.0
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue'), require('uikit-util'), require('vue-i18n'), require('uikit'), require('vuex'), require('inputmask')) :
    typeof define === 'function' && define.amd ? define(['vue', 'uikit-util', 'vue-i18n', 'uikit', 'vuex', 'inputmask'], factory) :
    (global = global || self, global.VueCustomizersettings = factory(global.Vue, global.UIkit.util, global.VueI18n, global.UIkit, global.Vuex, global.Inputmask));
}(this, (function (Vue$1, uikitUtil, VueI18n, uikit, vuex, Inputmask) { 'use strict';

    Vue$1 = Vue$1 && Object.prototype.hasOwnProperty.call(Vue$1, 'default') ? Vue$1['default'] : Vue$1;
    VueI18n = VueI18n && Object.prototype.hasOwnProperty.call(VueI18n, 'default') ? VueI18n['default'] : VueI18n;
    Inputmask = Inputmask && Object.prototype.hasOwnProperty.call(Inputmask, 'default') ? Inputmask['default'] : Inputmask;

    var Field = {
      methods: {
        filterOptions: function filterOptions(options) {
          var opts = [];

          if (!options) {
            //isDebug
            //console.log(`Invalid options provided for ${this.name}`)
            return opts;
          }

          uikitUtil.each(options, function (name, value) {
            if (uikitUtil.isObject(name)) {
              opts.push({
                text: name.name,
                description: name.description || '',
                value: value
              });
            } else {
              opts.push({
                text: name,
                value: value
              });
            }
          });
          return opts;
        }
      },
      "extends": Vue$1.component('field')
    };

    //
    var script = {
      "extends": Field
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

      return _c("ul", {
        staticClass: "uk-grid uk-grid-small",
        attrs: {
          "data-uk-grid": ""
        }
      }, _vm._l(_vm.filterOptions(_vm.options), function (option) {
        return _c("li", [_c("label", {
          staticClass: "uk-inline"
        }, [_c("input", {
          directives: [{
            name: "model",
            rawName: "v-model",
            value: _vm.value,
            expression: "value"
          }],
          staticClass: "uk-position-absolute uk-invisible",
          attrs: {
            type: "radio"
          },
          domProps: {
            value: option.value,
            checked: _vm._q(_vm.value, option.value)
          },
          on: {
            change: function change($event) {
              _vm.value = option.value;
            }
          }
        }), _vm._v(" "), _c("span", _vm._b({
          staticClass: "uk-button"
        }, "span", _vm.attributes, false), [_vm._v(_vm._s(option.text))])])]);
      }), 0);
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

    Vue$1.use(VueI18n);
    var i18n = {
      beforeCreate: function beforeCreate() {
        this._i18n = new VueI18n({
          locale: this.$store.state.config.locale,
          messages: this.$store.state.sections.settings.messages
        });
        this._i18nWatcher = this._i18n.watchI18nData();
      }
    };

    //
    var script$1 = {
      mixins: [i18n],
      "extends": Vue$1.component('field')
    };

    /* script */
    var __vue_script__$1 = script$1;
    /* template */

    var __vue_render__$1 = function __vue_render__() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c("label", {
        "class": {
          "uk-text-muted": _vm.attributes.disabled
        }
      }, [_c("input", _vm._b({
        directives: [{
          name: "model",
          rawName: "v-model",
          value: _vm.value,
          expression: "value"
        }],
        staticClass: "uk-checkbox",
        attrs: {
          "true-value": "1",
          "false-value": "",
          type: "checkbox"
        },
        domProps: {
          checked: Array.isArray(_vm.value) ? _vm._i(_vm.value, null) > -1 : _vm._q(_vm.value, "1")
        },
        on: {
          change: function change($event) {
            var $$a = _vm.value,
                $$el = $event.target,
                $$c = $$el.checked ? "1" : "";

            if (Array.isArray($$a)) {
              var $$v = null,
                  $$i = _vm._i($$a, $$v);

              if ($$el.checked) {
                $$i < 0 && (_vm.value = $$a.concat([$$v]));
              } else {
                $$i > -1 && (_vm.value = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
              }
            } else {
              _vm.value = $$c;
            }
          }
        }
      }, "input", _vm.attributes, false)), _vm._v(" " + _vm._s(_vm.$t("Enabled/Disabled")) + "\n")]);
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

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function createCommonjsModule(fn, module) {
    	return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    var tinycolor = createCommonjsModule(function (module) {
      // TinyColor v1.4.1
      // https://github.com/bgrins/TinyColor
      // Brian Grinstead, MIT License
      (function (Math) {
        var trimLeft = /^\s+/,
            trimRight = /\s+$/,
            tinyCounter = 0,
            mathRound = Math.round,
            mathMin = Math.min,
            mathMax = Math.max,
            mathRandom = Math.random;

        function tinycolor(color, opts) {
          color = color ? color : '';
          opts = opts || {}; // If input is already a tinycolor, return itself

          if (color instanceof tinycolor) {
            return color;
          } // If we are called as a function, call using new instead


          if (!(this instanceof tinycolor)) {
            return new tinycolor(color, opts);
          }

          var rgb = inputToRGB(color);
          this._originalInput = color, this._r = rgb.r, this._g = rgb.g, this._b = rgb.b, this._a = rgb.a, this._roundA = mathRound(100 * this._a) / 100, this._format = opts.format || rgb.format;
          this._gradientType = opts.gradientType; // Don't let the range of [0,255] come back in [0,1].
          // Potentially lose a little bit of precision here, but will fix issues where
          // .5 gets interpreted as half of the total, instead of half of 1
          // If it was supposed to be 128, this was already taken care of by `inputToRgb`

          if (this._r < 1) {
            this._r = mathRound(this._r);
          }

          if (this._g < 1) {
            this._g = mathRound(this._g);
          }

          if (this._b < 1) {
            this._b = mathRound(this._b);
          }

          this._ok = rgb.ok;
          this._tc_id = tinyCounter++;
        }

        tinycolor.prototype = {
          isDark: function () {
            return this.getBrightness() < 128;
          },
          isLight: function () {
            return !this.isDark();
          },
          isValid: function () {
            return this._ok;
          },
          getOriginalInput: function () {
            return this._originalInput;
          },
          getFormat: function () {
            return this._format;
          },
          getAlpha: function () {
            return this._a;
          },
          getBrightness: function () {
            //http://www.w3.org/TR/AERT#color-contrast
            var rgb = this.toRgb();
            return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
          },
          getLuminance: function () {
            //http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
            var rgb = this.toRgb();
            var RsRGB, GsRGB, BsRGB, R, G, B;
            RsRGB = rgb.r / 255;
            GsRGB = rgb.g / 255;
            BsRGB = rgb.b / 255;

            if (RsRGB <= 0.03928) {
              R = RsRGB / 12.92;
            } else {
              R = Math.pow((RsRGB + 0.055) / 1.055, 2.4);
            }

            if (GsRGB <= 0.03928) {
              G = GsRGB / 12.92;
            } else {
              G = Math.pow((GsRGB + 0.055) / 1.055, 2.4);
            }

            if (BsRGB <= 0.03928) {
              B = BsRGB / 12.92;
            } else {
              B = Math.pow((BsRGB + 0.055) / 1.055, 2.4);
            }

            return 0.2126 * R + 0.7152 * G + 0.0722 * B;
          },
          setAlpha: function (value) {
            this._a = boundAlpha(value);
            this._roundA = mathRound(100 * this._a) / 100;
            return this;
          },
          toHsv: function () {
            var hsv = rgbToHsv(this._r, this._g, this._b);
            return {
              h: hsv.h * 360,
              s: hsv.s,
              v: hsv.v,
              a: this._a
            };
          },
          toHsvString: function () {
            var hsv = rgbToHsv(this._r, this._g, this._b);
            var h = mathRound(hsv.h * 360),
                s = mathRound(hsv.s * 100),
                v = mathRound(hsv.v * 100);
            return this._a == 1 ? "hsv(" + h + ", " + s + "%, " + v + "%)" : "hsva(" + h + ", " + s + "%, " + v + "%, " + this._roundA + ")";
          },
          toHsl: function () {
            var hsl = rgbToHsl(this._r, this._g, this._b);
            return {
              h: hsl.h * 360,
              s: hsl.s,
              l: hsl.l,
              a: this._a
            };
          },
          toHslString: function () {
            var hsl = rgbToHsl(this._r, this._g, this._b);
            var h = mathRound(hsl.h * 360),
                s = mathRound(hsl.s * 100),
                l = mathRound(hsl.l * 100);
            return this._a == 1 ? "hsl(" + h + ", " + s + "%, " + l + "%)" : "hsla(" + h + ", " + s + "%, " + l + "%, " + this._roundA + ")";
          },
          toHex: function (allow3Char) {
            return rgbToHex(this._r, this._g, this._b, allow3Char);
          },
          toHexString: function (allow3Char) {
            return '#' + this.toHex(allow3Char);
          },
          toHex8: function (allow4Char) {
            return rgbaToHex(this._r, this._g, this._b, this._a, allow4Char);
          },
          toHex8String: function (allow4Char) {
            return '#' + this.toHex8(allow4Char);
          },
          toRgb: function () {
            return {
              r: mathRound(this._r),
              g: mathRound(this._g),
              b: mathRound(this._b),
              a: this._a
            };
          },
          toRgbString: function () {
            return this._a == 1 ? "rgb(" + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ")" : "rgba(" + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ", " + this._roundA + ")";
          },
          toPercentageRgb: function () {
            return {
              r: mathRound(bound01(this._r, 255) * 100) + "%",
              g: mathRound(bound01(this._g, 255) * 100) + "%",
              b: mathRound(bound01(this._b, 255) * 100) + "%",
              a: this._a
            };
          },
          toPercentageRgbString: function () {
            return this._a == 1 ? "rgb(" + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%)" : "rgba(" + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%, " + this._roundA + ")";
          },
          toName: function () {
            if (this._a === 0) {
              return "transparent";
            }

            if (this._a < 1) {
              return false;
            }

            return hexNames[rgbToHex(this._r, this._g, this._b, true)] || false;
          },
          toFilter: function (secondColor) {
            var hex8String = '#' + rgbaToArgbHex(this._r, this._g, this._b, this._a);
            var secondHex8String = hex8String;
            var gradientType = this._gradientType ? "GradientType = 1, " : "";

            if (secondColor) {
              var s = tinycolor(secondColor);
              secondHex8String = '#' + rgbaToArgbHex(s._r, s._g, s._b, s._a);
            }

            return "progid:DXImageTransform.Microsoft.gradient(" + gradientType + "startColorstr=" + hex8String + ",endColorstr=" + secondHex8String + ")";
          },
          toString: function (format) {
            var formatSet = !!format;
            format = format || this._format;
            var formattedString = false;
            var hasAlpha = this._a < 1 && this._a >= 0;
            var needsAlphaFormat = !formatSet && hasAlpha && (format === "hex" || format === "hex6" || format === "hex3" || format === "hex4" || format === "hex8" || format === "name");

            if (needsAlphaFormat) {
              // Special case for "transparent", all other non-alpha formats
              // will return rgba when there is transparency.
              if (format === "name" && this._a === 0) {
                return this.toName();
              }

              return this.toRgbString();
            }

            if (format === "rgb") {
              formattedString = this.toRgbString();
            }

            if (format === "prgb") {
              formattedString = this.toPercentageRgbString();
            }

            if (format === "hex" || format === "hex6") {
              formattedString = this.toHexString();
            }

            if (format === "hex3") {
              formattedString = this.toHexString(true);
            }

            if (format === "hex4") {
              formattedString = this.toHex8String(true);
            }

            if (format === "hex8") {
              formattedString = this.toHex8String();
            }

            if (format === "name") {
              formattedString = this.toName();
            }

            if (format === "hsl") {
              formattedString = this.toHslString();
            }

            if (format === "hsv") {
              formattedString = this.toHsvString();
            }

            return formattedString || this.toHexString();
          },
          clone: function () {
            return tinycolor(this.toString());
          },
          _applyModification: function (fn, args) {
            var color = fn.apply(null, [this].concat([].slice.call(args)));
            this._r = color._r;
            this._g = color._g;
            this._b = color._b;
            this.setAlpha(color._a);
            return this;
          },
          lighten: function () {
            return this._applyModification(lighten, arguments);
          },
          brighten: function () {
            return this._applyModification(brighten, arguments);
          },
          darken: function () {
            return this._applyModification(darken, arguments);
          },
          desaturate: function () {
            return this._applyModification(desaturate, arguments);
          },
          saturate: function () {
            return this._applyModification(saturate, arguments);
          },
          greyscale: function () {
            return this._applyModification(greyscale, arguments);
          },
          spin: function () {
            return this._applyModification(spin, arguments);
          },
          _applyCombination: function (fn, args) {
            return fn.apply(null, [this].concat([].slice.call(args)));
          },
          analogous: function () {
            return this._applyCombination(analogous, arguments);
          },
          complement: function () {
            return this._applyCombination(complement, arguments);
          },
          monochromatic: function () {
            return this._applyCombination(monochromatic, arguments);
          },
          splitcomplement: function () {
            return this._applyCombination(splitcomplement, arguments);
          },
          triad: function () {
            return this._applyCombination(triad, arguments);
          },
          tetrad: function () {
            return this._applyCombination(tetrad, arguments);
          }
        }; // If input is an object, force 1 into "1.0" to handle ratios properly
        // String input requires "1.0" as input, so 1 will be treated as 1

        tinycolor.fromRatio = function (color, opts) {
          if (typeof color == "object") {
            var newColor = {};

            for (var i in color) {
              if (color.hasOwnProperty(i)) {
                if (i === "a") {
                  newColor[i] = color[i];
                } else {
                  newColor[i] = convertToPercentage(color[i]);
                }
              }
            }

            color = newColor;
          }

          return tinycolor(color, opts);
        }; // Given a string or object, convert that input to RGB
        // Possible string inputs:
        //
        //     "red"
        //     "#f00" or "f00"
        //     "#ff0000" or "ff0000"
        //     "#ff000000" or "ff000000"
        //     "rgb 255 0 0" or "rgb (255, 0, 0)"
        //     "rgb 1.0 0 0" or "rgb (1, 0, 0)"
        //     "rgba (255, 0, 0, 1)" or "rgba 255, 0, 0, 1"
        //     "rgba (1.0, 0, 0, 1)" or "rgba 1.0, 0, 0, 1"
        //     "hsl(0, 100%, 50%)" or "hsl 0 100% 50%"
        //     "hsla(0, 100%, 50%, 1)" or "hsla 0 100% 50%, 1"
        //     "hsv(0, 100%, 100%)" or "hsv 0 100% 100%"
        //


        function inputToRGB(color) {
          var rgb = {
            r: 0,
            g: 0,
            b: 0
          };
          var a = 1;
          var s = null;
          var v = null;
          var l = null;
          var ok = false;
          var format = false;

          if (typeof color == "string") {
            color = stringInputToObject(color);
          }

          if (typeof color == "object") {
            if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
              rgb = rgbToRgb(color.r, color.g, color.b);
              ok = true;
              format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
            } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
              s = convertToPercentage(color.s);
              v = convertToPercentage(color.v);
              rgb = hsvToRgb(color.h, s, v);
              ok = true;
              format = "hsv";
            } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
              s = convertToPercentage(color.s);
              l = convertToPercentage(color.l);
              rgb = hslToRgb(color.h, s, l);
              ok = true;
              format = "hsl";
            }

            if (color.hasOwnProperty("a")) {
              a = color.a;
            }
          }

          a = boundAlpha(a);
          return {
            ok: ok,
            format: color.format || format,
            r: mathMin(255, mathMax(rgb.r, 0)),
            g: mathMin(255, mathMax(rgb.g, 0)),
            b: mathMin(255, mathMax(rgb.b, 0)),
            a: a
          };
        } // Conversion Functions
        // --------------------
        // `rgbToHsl`, `rgbToHsv`, `hslToRgb`, `hsvToRgb` modified from:
        // <http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript>
        // `rgbToRgb`
        // Handle bounds / percentage checking to conform to CSS color spec
        // <http://www.w3.org/TR/css3-color/>
        // *Assumes:* r, g, b in [0, 255] or [0, 1]
        // *Returns:* { r, g, b } in [0, 255]


        function rgbToRgb(r, g, b) {
          return {
            r: bound01(r, 255) * 255,
            g: bound01(g, 255) * 255,
            b: bound01(b, 255) * 255
          };
        } // `rgbToHsl`
        // Converts an RGB color value to HSL.
        // *Assumes:* r, g, and b are contained in [0, 255] or [0, 1]
        // *Returns:* { h, s, l } in [0,1]


        function rgbToHsl(r, g, b) {
          r = bound01(r, 255);
          g = bound01(g, 255);
          b = bound01(b, 255);
          var max = mathMax(r, g, b),
              min = mathMin(r, g, b);
          var h,
              s,
              l = (max + min) / 2;

          if (max == min) {
            h = s = 0; // achromatic
          } else {
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

            switch (max) {
              case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;

              case g:
                h = (b - r) / d + 2;
                break;

              case b:
                h = (r - g) / d + 4;
                break;
            }

            h /= 6;
          }

          return {
            h: h,
            s: s,
            l: l
          };
        } // `hslToRgb`
        // Converts an HSL color value to RGB.
        // *Assumes:* h is contained in [0, 1] or [0, 360] and s and l are contained [0, 1] or [0, 100]
        // *Returns:* { r, g, b } in the set [0, 255]


        function hslToRgb(h, s, l) {
          var r, g, b;
          h = bound01(h, 360);
          s = bound01(s, 100);
          l = bound01(l, 100);

          function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
          }

          if (s === 0) {
            r = g = b = l; // achromatic
          } else {
            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
          }

          return {
            r: r * 255,
            g: g * 255,
            b: b * 255
          };
        } // `rgbToHsv`
        // Converts an RGB color value to HSV
        // *Assumes:* r, g, and b are contained in the set [0, 255] or [0, 1]
        // *Returns:* { h, s, v } in [0,1]


        function rgbToHsv(r, g, b) {
          r = bound01(r, 255);
          g = bound01(g, 255);
          b = bound01(b, 255);
          var max = mathMax(r, g, b),
              min = mathMin(r, g, b);
          var h,
              s,
              v = max;
          var d = max - min;
          s = max === 0 ? 0 : d / max;

          if (max == min) {
            h = 0; // achromatic
          } else {
            switch (max) {
              case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;

              case g:
                h = (b - r) / d + 2;
                break;

              case b:
                h = (r - g) / d + 4;
                break;
            }

            h /= 6;
          }

          return {
            h: h,
            s: s,
            v: v
          };
        } // `hsvToRgb`
        // Converts an HSV color value to RGB.
        // *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
        // *Returns:* { r, g, b } in the set [0, 255]


        function hsvToRgb(h, s, v) {
          h = bound01(h, 360) * 6;
          s = bound01(s, 100);
          v = bound01(v, 100);
          var i = Math.floor(h),
              f = h - i,
              p = v * (1 - s),
              q = v * (1 - f * s),
              t = v * (1 - (1 - f) * s),
              mod = i % 6,
              r = [v, q, p, p, t, v][mod],
              g = [t, v, v, q, p, p][mod],
              b = [p, p, t, v, v, q][mod];
          return {
            r: r * 255,
            g: g * 255,
            b: b * 255
          };
        } // `rgbToHex`
        // Converts an RGB color to hex
        // Assumes r, g, and b are contained in the set [0, 255]
        // Returns a 3 or 6 character hex


        function rgbToHex(r, g, b, allow3Char) {
          var hex = [pad2(mathRound(r).toString(16)), pad2(mathRound(g).toString(16)), pad2(mathRound(b).toString(16))]; // Return a 3 character hex if possible

          if (allow3Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1)) {
            return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
          }

          return hex.join("");
        } // `rgbaToHex`
        // Converts an RGBA color plus alpha transparency to hex
        // Assumes r, g, b are contained in the set [0, 255] and
        // a in [0, 1]. Returns a 4 or 8 character rgba hex


        function rgbaToHex(r, g, b, a, allow4Char) {
          var hex = [pad2(mathRound(r).toString(16)), pad2(mathRound(g).toString(16)), pad2(mathRound(b).toString(16)), pad2(convertDecimalToHex(a))]; // Return a 4 character hex if possible

          if (allow4Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1) && hex[3].charAt(0) == hex[3].charAt(1)) {
            return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
          }

          return hex.join("");
        } // `rgbaToArgbHex`
        // Converts an RGBA color to an ARGB Hex8 string
        // Rarely used, but required for "toFilter()"


        function rgbaToArgbHex(r, g, b, a) {
          var hex = [pad2(convertDecimalToHex(a)), pad2(mathRound(r).toString(16)), pad2(mathRound(g).toString(16)), pad2(mathRound(b).toString(16))];
          return hex.join("");
        } // `equals`
        // Can be called with any tinycolor input


        tinycolor.equals = function (color1, color2) {
          if (!color1 || !color2) {
            return false;
          }

          return tinycolor(color1).toRgbString() == tinycolor(color2).toRgbString();
        };

        tinycolor.random = function () {
          return tinycolor.fromRatio({
            r: mathRandom(),
            g: mathRandom(),
            b: mathRandom()
          });
        }; // Modification Functions
        // ----------------------
        // Thanks to less.js for some of the basics here
        // <https://github.com/cloudhead/less.js/blob/master/lib/less/functions.js>


        function desaturate(color, amount) {
          amount = amount === 0 ? 0 : amount || 10;
          var hsl = tinycolor(color).toHsl();
          hsl.s -= amount / 100;
          hsl.s = clamp01(hsl.s);
          return tinycolor(hsl);
        }

        function saturate(color, amount) {
          amount = amount === 0 ? 0 : amount || 10;
          var hsl = tinycolor(color).toHsl();
          hsl.s += amount / 100;
          hsl.s = clamp01(hsl.s);
          return tinycolor(hsl);
        }

        function greyscale(color) {
          return tinycolor(color).desaturate(100);
        }

        function lighten(color, amount) {
          amount = amount === 0 ? 0 : amount || 10;
          var hsl = tinycolor(color).toHsl();
          hsl.l += amount / 100;
          hsl.l = clamp01(hsl.l);
          return tinycolor(hsl);
        }

        function brighten(color, amount) {
          amount = amount === 0 ? 0 : amount || 10;
          var rgb = tinycolor(color).toRgb();
          rgb.r = mathMax(0, mathMin(255, rgb.r - mathRound(255 * -(amount / 100))));
          rgb.g = mathMax(0, mathMin(255, rgb.g - mathRound(255 * -(amount / 100))));
          rgb.b = mathMax(0, mathMin(255, rgb.b - mathRound(255 * -(amount / 100))));
          return tinycolor(rgb);
        }

        function darken(color, amount) {
          amount = amount === 0 ? 0 : amount || 10;
          var hsl = tinycolor(color).toHsl();
          hsl.l -= amount / 100;
          hsl.l = clamp01(hsl.l);
          return tinycolor(hsl);
        } // Spin takes a positive or negative amount within [-360, 360] indicating the change of hue.
        // Values outside of this range will be wrapped into this range.


        function spin(color, amount) {
          var hsl = tinycolor(color).toHsl();
          var hue = (hsl.h + amount) % 360;
          hsl.h = hue < 0 ? 360 + hue : hue;
          return tinycolor(hsl);
        } // Combination Functions
        // ---------------------
        // Thanks to jQuery xColor for some of the ideas behind these
        // <https://github.com/infusion/jQuery-xcolor/blob/master/jquery.xcolor.js>


        function complement(color) {
          var hsl = tinycolor(color).toHsl();
          hsl.h = (hsl.h + 180) % 360;
          return tinycolor(hsl);
        }

        function triad(color) {
          var hsl = tinycolor(color).toHsl();
          var h = hsl.h;
          return [tinycolor(color), tinycolor({
            h: (h + 120) % 360,
            s: hsl.s,
            l: hsl.l
          }), tinycolor({
            h: (h + 240) % 360,
            s: hsl.s,
            l: hsl.l
          })];
        }

        function tetrad(color) {
          var hsl = tinycolor(color).toHsl();
          var h = hsl.h;
          return [tinycolor(color), tinycolor({
            h: (h + 90) % 360,
            s: hsl.s,
            l: hsl.l
          }), tinycolor({
            h: (h + 180) % 360,
            s: hsl.s,
            l: hsl.l
          }), tinycolor({
            h: (h + 270) % 360,
            s: hsl.s,
            l: hsl.l
          })];
        }

        function splitcomplement(color) {
          var hsl = tinycolor(color).toHsl();
          var h = hsl.h;
          return [tinycolor(color), tinycolor({
            h: (h + 72) % 360,
            s: hsl.s,
            l: hsl.l
          }), tinycolor({
            h: (h + 216) % 360,
            s: hsl.s,
            l: hsl.l
          })];
        }

        function analogous(color, results, slices) {
          results = results || 6;
          slices = slices || 30;
          var hsl = tinycolor(color).toHsl();
          var part = 360 / slices;
          var ret = [tinycolor(color)];

          for (hsl.h = (hsl.h - (part * results >> 1) + 720) % 360; --results;) {
            hsl.h = (hsl.h + part) % 360;
            ret.push(tinycolor(hsl));
          }

          return ret;
        }

        function monochromatic(color, results) {
          results = results || 6;
          var hsv = tinycolor(color).toHsv();
          var h = hsv.h,
              s = hsv.s,
              v = hsv.v;
          var ret = [];
          var modification = 1 / results;

          while (results--) {
            ret.push(tinycolor({
              h: h,
              s: s,
              v: v
            }));
            v = (v + modification) % 1;
          }

          return ret;
        } // Utility Functions
        // ---------------------


        tinycolor.mix = function (color1, color2, amount) {
          amount = amount === 0 ? 0 : amount || 50;
          var rgb1 = tinycolor(color1).toRgb();
          var rgb2 = tinycolor(color2).toRgb();
          var p = amount / 100;
          var rgba = {
            r: (rgb2.r - rgb1.r) * p + rgb1.r,
            g: (rgb2.g - rgb1.g) * p + rgb1.g,
            b: (rgb2.b - rgb1.b) * p + rgb1.b,
            a: (rgb2.a - rgb1.a) * p + rgb1.a
          };
          return tinycolor(rgba);
        }; // Readability Functions
        // ---------------------
        // <http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef (WCAG Version 2)
        // `contrast`
        // Analyze the 2 colors and returns the color contrast defined by (WCAG Version 2)


        tinycolor.readability = function (color1, color2) {
          var c1 = tinycolor(color1);
          var c2 = tinycolor(color2);
          return (Math.max(c1.getLuminance(), c2.getLuminance()) + 0.05) / (Math.min(c1.getLuminance(), c2.getLuminance()) + 0.05);
        }; // `isReadable`
        // Ensure that foreground and background color combinations meet WCAG2 guidelines.
        // The third argument is an optional Object.
        //      the 'level' property states 'AA' or 'AAA' - if missing or invalid, it defaults to 'AA';
        //      the 'size' property states 'large' or 'small' - if missing or invalid, it defaults to 'small'.
        // If the entire object is absent, isReadable defaults to {level:"AA",size:"small"}.
        // *Example*
        //    tinycolor.isReadable("#000", "#111") => false
        //    tinycolor.isReadable("#000", "#111",{level:"AA",size:"large"}) => false


        tinycolor.isReadable = function (color1, color2, wcag2) {
          var readability = tinycolor.readability(color1, color2);
          var wcag2Parms, out;
          out = false;
          wcag2Parms = validateWCAG2Parms(wcag2);

          switch (wcag2Parms.level + wcag2Parms.size) {
            case "AAsmall":
            case "AAAlarge":
              out = readability >= 4.5;
              break;

            case "AAlarge":
              out = readability >= 3;
              break;

            case "AAAsmall":
              out = readability >= 7;
              break;
          }

          return out;
        }; // `mostReadable`
        // Given a base color and a list of possible foreground or background
        // colors for that base, returns the most readable color.
        // Optionally returns Black or White if the most readable color is unreadable.
        // *Example*
        //    tinycolor.mostReadable(tinycolor.mostReadable("#123", ["#124", "#125"],{includeFallbackColors:false}).toHexString(); // "#112255"
        //    tinycolor.mostReadable(tinycolor.mostReadable("#123", ["#124", "#125"],{includeFallbackColors:true}).toHexString();  // "#ffffff"
        //    tinycolor.mostReadable("#a8015a", ["#faf3f3"],{includeFallbackColors:true,level:"AAA",size:"large"}).toHexString(); // "#faf3f3"
        //    tinycolor.mostReadable("#a8015a", ["#faf3f3"],{includeFallbackColors:true,level:"AAA",size:"small"}).toHexString(); // "#ffffff"


        tinycolor.mostReadable = function (baseColor, colorList, args) {
          var bestColor = null;
          var bestScore = 0;
          var readability;
          var includeFallbackColors, level, size;
          args = args || {};
          includeFallbackColors = args.includeFallbackColors;
          level = args.level;
          size = args.size;

          for (var i = 0; i < colorList.length; i++) {
            readability = tinycolor.readability(baseColor, colorList[i]);

            if (readability > bestScore) {
              bestScore = readability;
              bestColor = tinycolor(colorList[i]);
            }
          }

          if (tinycolor.isReadable(baseColor, bestColor, {
            "level": level,
            "size": size
          }) || !includeFallbackColors) {
            return bestColor;
          } else {
            args.includeFallbackColors = false;
            return tinycolor.mostReadable(baseColor, ["#fff", "#000"], args);
          }
        }; // Big List of Colors
        // ------------------
        // <http://www.w3.org/TR/css3-color/#svg-color>


        var names = tinycolor.names = {
          aliceblue: "f0f8ff",
          antiquewhite: "faebd7",
          aqua: "0ff",
          aquamarine: "7fffd4",
          azure: "f0ffff",
          beige: "f5f5dc",
          bisque: "ffe4c4",
          black: "000",
          blanchedalmond: "ffebcd",
          blue: "00f",
          blueviolet: "8a2be2",
          brown: "a52a2a",
          burlywood: "deb887",
          burntsienna: "ea7e5d",
          cadetblue: "5f9ea0",
          chartreuse: "7fff00",
          chocolate: "d2691e",
          coral: "ff7f50",
          cornflowerblue: "6495ed",
          cornsilk: "fff8dc",
          crimson: "dc143c",
          cyan: "0ff",
          darkblue: "00008b",
          darkcyan: "008b8b",
          darkgoldenrod: "b8860b",
          darkgray: "a9a9a9",
          darkgreen: "006400",
          darkgrey: "a9a9a9",
          darkkhaki: "bdb76b",
          darkmagenta: "8b008b",
          darkolivegreen: "556b2f",
          darkorange: "ff8c00",
          darkorchid: "9932cc",
          darkred: "8b0000",
          darksalmon: "e9967a",
          darkseagreen: "8fbc8f",
          darkslateblue: "483d8b",
          darkslategray: "2f4f4f",
          darkslategrey: "2f4f4f",
          darkturquoise: "00ced1",
          darkviolet: "9400d3",
          deeppink: "ff1493",
          deepskyblue: "00bfff",
          dimgray: "696969",
          dimgrey: "696969",
          dodgerblue: "1e90ff",
          firebrick: "b22222",
          floralwhite: "fffaf0",
          forestgreen: "228b22",
          fuchsia: "f0f",
          gainsboro: "dcdcdc",
          ghostwhite: "f8f8ff",
          gold: "ffd700",
          goldenrod: "daa520",
          gray: "808080",
          green: "008000",
          greenyellow: "adff2f",
          grey: "808080",
          honeydew: "f0fff0",
          hotpink: "ff69b4",
          indianred: "cd5c5c",
          indigo: "4b0082",
          ivory: "fffff0",
          khaki: "f0e68c",
          lavender: "e6e6fa",
          lavenderblush: "fff0f5",
          lawngreen: "7cfc00",
          lemonchiffon: "fffacd",
          lightblue: "add8e6",
          lightcoral: "f08080",
          lightcyan: "e0ffff",
          lightgoldenrodyellow: "fafad2",
          lightgray: "d3d3d3",
          lightgreen: "90ee90",
          lightgrey: "d3d3d3",
          lightpink: "ffb6c1",
          lightsalmon: "ffa07a",
          lightseagreen: "20b2aa",
          lightskyblue: "87cefa",
          lightslategray: "789",
          lightslategrey: "789",
          lightsteelblue: "b0c4de",
          lightyellow: "ffffe0",
          lime: "0f0",
          limegreen: "32cd32",
          linen: "faf0e6",
          magenta: "f0f",
          maroon: "800000",
          mediumaquamarine: "66cdaa",
          mediumblue: "0000cd",
          mediumorchid: "ba55d3",
          mediumpurple: "9370db",
          mediumseagreen: "3cb371",
          mediumslateblue: "7b68ee",
          mediumspringgreen: "00fa9a",
          mediumturquoise: "48d1cc",
          mediumvioletred: "c71585",
          midnightblue: "191970",
          mintcream: "f5fffa",
          mistyrose: "ffe4e1",
          moccasin: "ffe4b5",
          navajowhite: "ffdead",
          navy: "000080",
          oldlace: "fdf5e6",
          olive: "808000",
          olivedrab: "6b8e23",
          orange: "ffa500",
          orangered: "ff4500",
          orchid: "da70d6",
          palegoldenrod: "eee8aa",
          palegreen: "98fb98",
          paleturquoise: "afeeee",
          palevioletred: "db7093",
          papayawhip: "ffefd5",
          peachpuff: "ffdab9",
          peru: "cd853f",
          pink: "ffc0cb",
          plum: "dda0dd",
          powderblue: "b0e0e6",
          purple: "800080",
          rebeccapurple: "663399",
          red: "f00",
          rosybrown: "bc8f8f",
          royalblue: "4169e1",
          saddlebrown: "8b4513",
          salmon: "fa8072",
          sandybrown: "f4a460",
          seagreen: "2e8b57",
          seashell: "fff5ee",
          sienna: "a0522d",
          silver: "c0c0c0",
          skyblue: "87ceeb",
          slateblue: "6a5acd",
          slategray: "708090",
          slategrey: "708090",
          snow: "fffafa",
          springgreen: "00ff7f",
          steelblue: "4682b4",
          tan: "d2b48c",
          teal: "008080",
          thistle: "d8bfd8",
          tomato: "ff6347",
          turquoise: "40e0d0",
          violet: "ee82ee",
          wheat: "f5deb3",
          white: "fff",
          whitesmoke: "f5f5f5",
          yellow: "ff0",
          yellowgreen: "9acd32"
        }; // Make it easy to access colors via `hexNames[hex]`

        var hexNames = tinycolor.hexNames = flip(names); // Utilities
        // ---------
        // `{ 'name1': 'val1' }` becomes `{ 'val1': 'name1' }`

        function flip(o) {
          var flipped = {};

          for (var i in o) {
            if (o.hasOwnProperty(i)) {
              flipped[o[i]] = i;
            }
          }

          return flipped;
        } // Return a valid alpha value [0,1] with all invalid values being set to 1


        function boundAlpha(a) {
          a = parseFloat(a);

          if (isNaN(a) || a < 0 || a > 1) {
            a = 1;
          }

          return a;
        } // Take input from [0, n] and return it as [0, 1]


        function bound01(n, max) {
          if (isOnePointZero(n)) {
            n = "100%";
          }

          var processPercent = isPercentage(n);
          n = mathMin(max, mathMax(0, parseFloat(n))); // Automatically convert percentage into number

          if (processPercent) {
            n = parseInt(n * max, 10) / 100;
          } // Handle floating point rounding errors


          if (Math.abs(n - max) < 0.000001) {
            return 1;
          } // Convert into [0, 1] range if it isn't already


          return n % max / parseFloat(max);
        } // Force a number between 0 and 1


        function clamp01(val) {
          return mathMin(1, mathMax(0, val));
        } // Parse a base-16 hex value into a base-10 integer


        function parseIntFromHex(val) {
          return parseInt(val, 16);
        } // Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
        // <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>


        function isOnePointZero(n) {
          return typeof n == "string" && n.indexOf('.') != -1 && parseFloat(n) === 1;
        } // Check to see if string passed in is a percentage


        function isPercentage(n) {
          return typeof n === "string" && n.indexOf('%') != -1;
        } // Force a hex value to have 2 characters


        function pad2(c) {
          return c.length == 1 ? '0' + c : '' + c;
        } // Replace a decimal with it's percentage value


        function convertToPercentage(n) {
          if (n <= 1) {
            n = n * 100 + "%";
          }

          return n;
        } // Converts a decimal to a hex value


        function convertDecimalToHex(d) {
          return Math.round(parseFloat(d) * 255).toString(16);
        } // Converts a hex value to a decimal


        function convertHexToDecimal(h) {
          return parseIntFromHex(h) / 255;
        }

        var matchers = function () {
          // <http://www.w3.org/TR/css3-values/#integers>
          var CSS_INTEGER = "[-\\+]?\\d+%?"; // <http://www.w3.org/TR/css3-values/#number-value>

          var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?"; // Allow positive/negative integer/number.  Don't capture the either/or, just the entire outcome.

          var CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")"; // Actual matching.
          // Parentheses and commas are optional, but not required.
          // Whitespace can take the place of commas or opening paren

          var PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
          var PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
          return {
            CSS_UNIT: new RegExp(CSS_UNIT),
            rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
            rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
            hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
            hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
            hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
            hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
            hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
            hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
            hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
            hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
          };
        }(); // `isValidCSSUnit`
        // Take in a single string / number and check to see if it looks like a CSS unit
        // (see `matchers` above for definition).


        function isValidCSSUnit(color) {
          return !!matchers.CSS_UNIT.exec(color);
        } // `stringInputToObject`
        // Permissive string parsing.  Take in a number of formats, and output an object
        // based on detected format.  Returns `{ r, g, b }` or `{ h, s, l }` or `{ h, s, v}`


        function stringInputToObject(color) {
          color = color.replace(trimLeft, '').replace(trimRight, '').toLowerCase();
          var named = false;

          if (names[color]) {
            color = names[color];
            named = true;
          } else if (color == 'transparent') {
            return {
              r: 0,
              g: 0,
              b: 0,
              a: 0,
              format: "name"
            };
          } // Try to match string input using regular expressions.
          // Keep most of the number bounding out of this function - don't worry about [0,1] or [0,100] or [0,360]
          // Just return an object and let the conversion functions handle that.
          // This way the result will be the same whether the tinycolor is initialized with string or object.


          var match;

          if (match = matchers.rgb.exec(color)) {
            return {
              r: match[1],
              g: match[2],
              b: match[3]
            };
          }

          if (match = matchers.rgba.exec(color)) {
            return {
              r: match[1],
              g: match[2],
              b: match[3],
              a: match[4]
            };
          }

          if (match = matchers.hsl.exec(color)) {
            return {
              h: match[1],
              s: match[2],
              l: match[3]
            };
          }

          if (match = matchers.hsla.exec(color)) {
            return {
              h: match[1],
              s: match[2],
              l: match[3],
              a: match[4]
            };
          }

          if (match = matchers.hsv.exec(color)) {
            return {
              h: match[1],
              s: match[2],
              v: match[3]
            };
          }

          if (match = matchers.hsva.exec(color)) {
            return {
              h: match[1],
              s: match[2],
              v: match[3],
              a: match[4]
            };
          }

          if (match = matchers.hex8.exec(color)) {
            return {
              r: parseIntFromHex(match[1]),
              g: parseIntFromHex(match[2]),
              b: parseIntFromHex(match[3]),
              a: convertHexToDecimal(match[4]),
              format: named ? "name" : "hex8"
            };
          }

          if (match = matchers.hex6.exec(color)) {
            return {
              r: parseIntFromHex(match[1]),
              g: parseIntFromHex(match[2]),
              b: parseIntFromHex(match[3]),
              format: named ? "name" : "hex"
            };
          }

          if (match = matchers.hex4.exec(color)) {
            return {
              r: parseIntFromHex(match[1] + '' + match[1]),
              g: parseIntFromHex(match[2] + '' + match[2]),
              b: parseIntFromHex(match[3] + '' + match[3]),
              a: convertHexToDecimal(match[4] + '' + match[4]),
              format: named ? "name" : "hex8"
            };
          }

          if (match = matchers.hex3.exec(color)) {
            return {
              r: parseIntFromHex(match[1] + '' + match[1]),
              g: parseIntFromHex(match[2] + '' + match[2]),
              b: parseIntFromHex(match[3] + '' + match[3]),
              format: named ? "name" : "hex"
            };
          }

          return false;
        }

        function validateWCAG2Parms(parms) {
          // return valid WCAG2 parms for isReadable.
          // If input parms are invalid, return {"level":"AA", "size":"small"}
          var level, size;
          parms = parms || {
            "level": "AA",
            "size": "small"
          };
          level = (parms.level || "AA").toUpperCase();
          size = (parms.size || "small").toLowerCase();

          if (level !== "AA" && level !== "AAA") {
            level = "AA";
          }

          if (size !== "small" && size !== "large") {
            size = "small";
          }

          return {
            "level": level,
            "size": size
          };
        } // Node: Export function


        if ( module.exports) {
          module.exports = tinycolor;
        } // AMD/requirejs: Define the module
        else {
              window.tinycolor = tinycolor;
            }
      })(Math);
    });

    function _colorChange(data, oldHue) {
      var alpha = data && data.a;
      var color; // hsl is better than hex between conversions

      if (data && data.hsl) {
        color = tinycolor(data.hsl);
      } else if (data && data.hex && data.hex.length > 0) {
        color = tinycolor(data.hex);
      } else if (data && data.hsv) {
        color = tinycolor(data.hsv);
      } else if (data && data.rgba) {
        color = tinycolor(data.rgba);
      } else if (data && data.rgb) {
        color = tinycolor(data.rgb);
      } else {
        color = tinycolor(data);
      }

      if (color && (color._a === undefined || color._a === null)) {
        color.setAlpha(alpha || 1);
      }

      var hsl = color.toHsl();
      var hsv = color.toHsv();

      if (hsl.s === 0) {
        hsv.h = hsl.h = data.h || data.hsl && data.hsl.h || oldHue || 0;
      }
      /* --- comment this block to fix #109, may cause #25 again --- */
      // when the hsv.v is less than 0.0164 (base on test)
      // because of possible loss of precision
      // the result of hue and saturation would be miscalculated
      // if (hsv.v < 0.0164) {
      //   hsv.h = data.h || (data.hsv && data.hsv.h) || 0
      //   hsv.s = data.s || (data.hsv && data.hsv.s) || 0
      // }
      // if (hsl.l < 0.01) {
      //   hsl.h = data.h || (data.hsl && data.hsl.h) || 0
      //   hsl.s = data.s || (data.hsl && data.hsl.s) || 0
      // }

      /* ------ */


      return {
        hsl: hsl,
        hex: color.toHexString().toUpperCase(),
        hex8: color.toHex8String().toUpperCase(),
        rgba: color.toRgb(),
        hsv: hsv,
        oldHue: data.h || oldHue || hsl.h,
        source: data.source,
        a: data.a || color.getAlpha()
      };
    }

    var colorMixin = {
      props: ['value'],

      data() {
        return {
          val: _colorChange(this.value)
        };
      },

      computed: {
        colors: {
          get() {
            return this.val;
          },

          set(newVal) {
            this.val = newVal;
            this.$emit('input', newVal);
          }

        }
      },
      watch: {
        value(newVal) {
          this.val = _colorChange(newVal);
        }

      },
      methods: {
        colorChange(data, oldHue) {
          this.oldHue = this.colors.hsl.h;
          this.colors = _colorChange(data, oldHue || this.oldHue);
        },

        isValidHex(hex) {
          return tinycolor(hex).isValid();
        },

        simpleCheckForValidColor(data) {
          var keysToCheck = ['r', 'g', 'b', 'a', 'h', 's', 'l', 'v'];
          var checked = 0;
          var passed = 0;

          for (var i = 0; i < keysToCheck.length; i++) {
            var letter = keysToCheck[i];

            if (data[letter]) {
              checked++;

              if (!isNaN(data[letter])) {
                passed++;
              }
            }
          }

          if (checked === passed) {
            return data;
          }
        },

        paletteUpperCase(palette) {
          return palette.map(c => c.toUpperCase());
        },

        isTransparent(color) {
          return tinycolor(color).getAlpha() === 0;
        }

      }
    };

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
    var script$2 = {
      name: 'editableInput',
      props: {
        label: String,
        labelText: String,
        desc: String,
        value: [String, Number],
        max: Number,
        min: Number,
        arrowOffset: {
          type: Number,
          default: 1
        }
      },
      computed: {
        val: {
          get() {
            return this.value;
          },

          set(v) {
            // TODO: min
            if (!(this.max === undefined) && +v > this.max) {
              this.$refs.input.value = this.max;
            } else {
              return v;
            }
          }

        },

        labelId() {
          return `input__label__${this.label}__${Math.random().toString().slice(2, 5)}`;
        },

        labelSpanText() {
          return this.labelText || this.label;
        }

      },
      methods: {
        update(e) {
          this.handleChange(e.target.value);
        },

        handleChange(newVal) {
          let data = {};
          data[this.label] = newVal;

          if (data.hex === undefined && data['#'] === undefined) {
            this.$emit('change', data);
          } else if (newVal.length > 5) {
            this.$emit('change', data);
          }
        },

        // **** unused
        // handleBlur (e) {
        //   console.log(e)
        // },
        handleKeyDown(e) {
          let val = this.val;
          let number = Number(val);

          if (number) {
            let amount = this.arrowOffset || 1; // Up

            if (e.keyCode === 38) {
              val = number + amount;
              this.handleChange(val);
              e.preventDefault();
            } // Down


            if (e.keyCode === 40) {
              val = number - amount;
              this.handleChange(val);
              e.preventDefault();
            }
          }
        } // **** unused
        // handleDrag (e) {
        //   console.log(e)
        // },
        // handleMouseDown (e) {
        //   console.log(e)
        // }


      }
    };

    const isOldIE = typeof navigator !== 'undefined' &&
        /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
    function createInjector(context) {
        return (id, style) => addStyle(id, style);
    }
    let HEAD;
    const styles = {};
    function addStyle(id, css) {
        const group = isOldIE ? css.media || 'default' : id;
        const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
        if (!style.ids.has(id)) {
            style.ids.add(id);
            let code = css.source;
            if (css.map) {
                // https://developer.chrome.com/devtools/docs/javascript-debugging
                // this makes source maps inside style tags work properly in Chrome
                code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
                // http://stackoverflow.com/a/26603875
                code +=
                    '\n/*# sourceMappingURL=data:application/json;base64,' +
                        btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                        ' */';
            }
            if (!style.element) {
                style.element = document.createElement('style');
                style.element.type = 'text/css';
                if (css.media)
                    style.element.setAttribute('media', css.media);
                if (HEAD === undefined) {
                    HEAD = document.head || document.getElementsByTagName('head')[0];
                }
                HEAD.appendChild(style.element);
            }
            if ('styleSheet' in style.element) {
                style.styles.push(code);
                style.element.styleSheet.cssText = style.styles
                    .filter(Boolean)
                    .join('\n');
            }
            else {
                const index = style.ids.size - 1;
                const textNode = document.createTextNode(code);
                const nodes = style.element.childNodes;
                if (nodes[index])
                    style.element.removeChild(nodes[index]);
                if (nodes.length)
                    style.element.insertBefore(textNode, nodes[index]);
                else
                    style.element.appendChild(textNode);
            }
        }
    }

    /* script */
    const __vue_script__$2 = script$2;
    /* template */

    var __vue_render__$2 = function () {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c("div", {
        staticClass: "vc-editable-input"
      }, [_c("input", {
        directives: [{
          name: "model",
          rawName: "v-model",
          value: _vm.val,
          expression: "val"
        }],
        ref: "input",
        staticClass: "vc-input__input",
        attrs: {
          "aria-labelledby": _vm.labelId
        },
        domProps: {
          value: _vm.val
        },
        on: {
          keydown: _vm.handleKeyDown,
          input: [function ($event) {
            if ($event.target.composing) {
              return;
            }

            _vm.val = $event.target.value;
          }, _vm.update]
        }
      }), _vm._v(" "), _c("span", {
        staticClass: "vc-input__label",
        attrs: {
          for: _vm.label,
          id: _vm.labelId
        }
      }, [_vm._v(_vm._s(_vm.labelSpanText))]), _vm._v(" "), _c("span", {
        staticClass: "vc-input__desc"
      }, [_vm._v(_vm._s(_vm.desc))])]);
    };

    var __vue_staticRenderFns__$2 = [];
    __vue_render__$2._withStripped = true;
    /* style */

    const __vue_inject_styles__$2 = function (inject) {
      if (!inject) return;
      inject("data-v-0b7edaec_0", {
        source: "\n.vc-editable-input {\n  position: relative;\n}\n.vc-input__input {\n  padding: 0;\n  border: 0;\n  outline: none;\n}\n.vc-input__label {\n  text-transform: capitalize;\n}\n",
        map: {
          "version": 3,
          "sources": ["D:\\OPENSERVER\\OSPanel\\domains\\s8.loc\\wa-apps\\customizer\\plugins\\settings\\node_modules\\vue-color\\src\\components\\common\\EditableInput.vue"],
          "names": [],
          "mappings": ";AAsGA;EACA,kBAAA;AACA;AACA;EACA,UAAA;EACA,SAAA;EACA,aAAA;AACA;AACA;EACA,0BAAA;AACA",
          "file": "EditableInput.vue",
          "sourcesContent": ["<template>\n  <div class=\"vc-editable-input\">\n    <input\n      :aria-labelledby=\"labelId\"\n      class=\"vc-input__input\"\n      v-model=\"val\"\n      @keydown=\"handleKeyDown\"\n      @input=\"update\"\n      ref=\"input\"\n    >\n    <span :for=\"label\" class=\"vc-input__label\" :id=\"labelId\">{{labelSpanText}}</span>\n    <span class=\"vc-input__desc\">{{desc}}</span>\n  </div>\n</template>\n\n<script>\nexport default {\n  name: 'editableInput',\n  props: {\n    label: String,\n    labelText: String,\n    desc: String,\n    value: [String, Number],\n    max: Number,\n    min: Number,\n    arrowOffset: {\n      type: Number,\n      default: 1\n    }\n  },\n  computed: {\n    val: {\n      get () {\n        return this.value\n      },\n      set (v) {\n        // TODO: min\n        if (!(this.max === undefined) && +v > this.max) {\n          this.$refs.input.value = this.max\n        } else {\n          return v\n        }\n      }\n    },\n    labelId () {\n      return `input__label__${this.label}__${Math.random().toString().slice(2, 5)}`\n    },\n    labelSpanText () {\n      return this.labelText || this.label\n    }\n  },\n  methods: {\n    update (e) {\n      this.handleChange(e.target.value)\n    },\n    handleChange (newVal) {\n      let data = {}\n      data[this.label] = newVal\n      if (data.hex === undefined && data['#'] === undefined) {\n        this.$emit('change', data)\n      } else if (newVal.length > 5) {\n        this.$emit('change', data)\n      }\n    },\n    // **** unused\n    // handleBlur (e) {\n    //   console.log(e)\n    // },\n    handleKeyDown (e) {\n      let val = this.val\n      let number = Number(val)\n\n      if (number) {\n        let amount = this.arrowOffset || 1\n\n        // Up\n        if (e.keyCode === 38) {\n          val = number + amount\n          this.handleChange(val)\n          e.preventDefault()\n        }\n\n        // Down\n        if (e.keyCode === 40) {\n          val = number - amount\n          this.handleChange(val)\n          e.preventDefault()\n        }\n      }\n    }\n    // **** unused\n    // handleDrag (e) {\n    //   console.log(e)\n    // },\n    // handleMouseDown (e) {\n    //   console.log(e)\n    // }\n  }\n}\n</script>\n\n<style>\n.vc-editable-input {\n  position: relative;\n}\n.vc-input__input {\n  padding: 0;\n  border: 0;\n  outline: none;\n}\n.vc-input__label {\n  text-transform: capitalize;\n}\n</style>\n"]
        },
        media: undefined
      });
    };
    /* scoped */


    const __vue_scope_id__$2 = undefined;
    /* module identifier */

    const __vue_module_identifier__$2 = undefined;
    /* functional template */

    const __vue_is_functional_template__$2 = false;
    /* style inject SSR */

    /* style inject shadow dom */

    const __vue_component__$2 = normalizeComponent({
      render: __vue_render__$2,
      staticRenderFns: __vue_staticRenderFns__$2
    }, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, createInjector, undefined, undefined);

    var clamp_1 = clamp;

    function clamp(value, min, max) {
      return min < max ? value < min ? min : value > max ? max : value : value < max ? max : value > min ? min : value;
    }

    /**
     * lodash (Custom Build) <https://lodash.com/>
     * Build: `lodash modularize exports="npm" -o ./`
     * Copyright jQuery Foundation and other contributors <https://jquery.org/>
     * Released under MIT license <https://lodash.com/license>
     * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
     * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
     */

    /** Used as the `TypeError` message for "Functions" methods. */

    var FUNC_ERROR_TEXT = 'Expected a function';
    /** Used as references for various `Number` constants. */

    var NAN = 0 / 0;
    /** `Object#toString` result references. */

    var symbolTag = '[object Symbol]';
    /** Used to match leading and trailing whitespace. */

    var reTrim = /^\s+|\s+$/g;
    /** Used to detect bad signed hexadecimal string values. */

    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
    /** Used to detect binary string values. */

    var reIsBinary = /^0b[01]+$/i;
    /** Used to detect octal string values. */

    var reIsOctal = /^0o[0-7]+$/i;
    /** Built-in method references without a dependency on `root`. */

    var freeParseInt = parseInt;
    /** Detect free variable `global` from Node.js. */

    var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
    /** Detect free variable `self`. */

    var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
    /** Used as a reference to the global object. */

    var root = freeGlobal || freeSelf || Function('return this')();
    /** Used for built-in method references. */

    var objectProto = Object.prototype;
    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
     * of values.
     */

    var objectToString = objectProto.toString;
    /* Built-in method references for those with the same name as other `lodash` methods. */

    var nativeMax = Math.max,
        nativeMin = Math.min;
    /**
     * Gets the timestamp of the number of milliseconds that have elapsed since
     * the Unix epoch (1 January 1970 00:00:00 UTC).
     *
     * @static
     * @memberOf _
     * @since 2.4.0
     * @category Date
     * @returns {number} Returns the timestamp.
     * @example
     *
     * _.defer(function(stamp) {
     *   console.log(_.now() - stamp);
     * }, _.now());
     * // => Logs the number of milliseconds it took for the deferred invocation.
     */

    var now = function () {
      return root.Date.now();
    };
    /**
     * Creates a debounced function that delays invoking `func` until after `wait`
     * milliseconds have elapsed since the last time the debounced function was
     * invoked. The debounced function comes with a `cancel` method to cancel
     * delayed `func` invocations and a `flush` method to immediately invoke them.
     * Provide `options` to indicate whether `func` should be invoked on the
     * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
     * with the last arguments provided to the debounced function. Subsequent
     * calls to the debounced function return the result of the last `func`
     * invocation.
     *
     * **Note:** If `leading` and `trailing` options are `true`, `func` is
     * invoked on the trailing edge of the timeout only if the debounced function
     * is invoked more than once during the `wait` timeout.
     *
     * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
     * until to the next tick, similar to `setTimeout` with a timeout of `0`.
     *
     * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
     * for details over the differences between `_.debounce` and `_.throttle`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to debounce.
     * @param {number} [wait=0] The number of milliseconds to delay.
     * @param {Object} [options={}] The options object.
     * @param {boolean} [options.leading=false]
     *  Specify invoking on the leading edge of the timeout.
     * @param {number} [options.maxWait]
     *  The maximum time `func` is allowed to be delayed before it's invoked.
     * @param {boolean} [options.trailing=true]
     *  Specify invoking on the trailing edge of the timeout.
     * @returns {Function} Returns the new debounced function.
     * @example
     *
     * // Avoid costly calculations while the window size is in flux.
     * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
     *
     * // Invoke `sendMail` when clicked, debouncing subsequent calls.
     * jQuery(element).on('click', _.debounce(sendMail, 300, {
     *   'leading': true,
     *   'trailing': false
     * }));
     *
     * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
     * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
     * var source = new EventSource('/stream');
     * jQuery(source).on('message', debounced);
     *
     * // Cancel the trailing debounced invocation.
     * jQuery(window).on('popstate', debounced.cancel);
     */


    function debounce(func, wait, options) {
      var lastArgs,
          lastThis,
          maxWait,
          result,
          timerId,
          lastCallTime,
          lastInvokeTime = 0,
          leading = false,
          maxing = false,
          trailing = true;

      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }

      wait = toNumber(wait) || 0;

      if (isObject(options)) {
        leading = !!options.leading;
        maxing = 'maxWait' in options;
        maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
        trailing = 'trailing' in options ? !!options.trailing : trailing;
      }

      function invokeFunc(time) {
        var args = lastArgs,
            thisArg = lastThis;
        lastArgs = lastThis = undefined;
        lastInvokeTime = time;
        result = func.apply(thisArg, args);
        return result;
      }

      function leadingEdge(time) {
        // Reset any `maxWait` timer.
        lastInvokeTime = time; // Start the timer for the trailing edge.

        timerId = setTimeout(timerExpired, wait); // Invoke the leading edge.

        return leading ? invokeFunc(time) : result;
      }

      function remainingWait(time) {
        var timeSinceLastCall = time - lastCallTime,
            timeSinceLastInvoke = time - lastInvokeTime,
            result = wait - timeSinceLastCall;
        return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
      }

      function shouldInvoke(time) {
        var timeSinceLastCall = time - lastCallTime,
            timeSinceLastInvoke = time - lastInvokeTime; // Either this is the first call, activity has stopped and we're at the
        // trailing edge, the system time has gone backwards and we're treating
        // it as the trailing edge, or we've hit the `maxWait` limit.

        return lastCallTime === undefined || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
      }

      function timerExpired() {
        var time = now();

        if (shouldInvoke(time)) {
          return trailingEdge(time);
        } // Restart the timer.


        timerId = setTimeout(timerExpired, remainingWait(time));
      }

      function trailingEdge(time) {
        timerId = undefined; // Only invoke if we have `lastArgs` which means `func` has been
        // debounced at least once.

        if (trailing && lastArgs) {
          return invokeFunc(time);
        }

        lastArgs = lastThis = undefined;
        return result;
      }

      function cancel() {
        if (timerId !== undefined) {
          clearTimeout(timerId);
        }

        lastInvokeTime = 0;
        lastArgs = lastCallTime = lastThis = timerId = undefined;
      }

      function flush() {
        return timerId === undefined ? result : trailingEdge(now());
      }

      function debounced() {
        var time = now(),
            isInvoking = shouldInvoke(time);
        lastArgs = arguments;
        lastThis = this;
        lastCallTime = time;

        if (isInvoking) {
          if (timerId === undefined) {
            return leadingEdge(lastCallTime);
          }

          if (maxing) {
            // Handle invocations in a tight loop.
            timerId = setTimeout(timerExpired, wait);
            return invokeFunc(lastCallTime);
          }
        }

        if (timerId === undefined) {
          timerId = setTimeout(timerExpired, wait);
        }

        return result;
      }

      debounced.cancel = cancel;
      debounced.flush = flush;
      return debounced;
    }
    /**
     * Creates a throttled function that only invokes `func` at most once per
     * every `wait` milliseconds. The throttled function comes with a `cancel`
     * method to cancel delayed `func` invocations and a `flush` method to
     * immediately invoke them. Provide `options` to indicate whether `func`
     * should be invoked on the leading and/or trailing edge of the `wait`
     * timeout. The `func` is invoked with the last arguments provided to the
     * throttled function. Subsequent calls to the throttled function return the
     * result of the last `func` invocation.
     *
     * **Note:** If `leading` and `trailing` options are `true`, `func` is
     * invoked on the trailing edge of the timeout only if the throttled function
     * is invoked more than once during the `wait` timeout.
     *
     * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
     * until to the next tick, similar to `setTimeout` with a timeout of `0`.
     *
     * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
     * for details over the differences between `_.throttle` and `_.debounce`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to throttle.
     * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
     * @param {Object} [options={}] The options object.
     * @param {boolean} [options.leading=true]
     *  Specify invoking on the leading edge of the timeout.
     * @param {boolean} [options.trailing=true]
     *  Specify invoking on the trailing edge of the timeout.
     * @returns {Function} Returns the new throttled function.
     * @example
     *
     * // Avoid excessively updating the position while scrolling.
     * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
     *
     * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
     * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
     * jQuery(element).on('click', throttled);
     *
     * // Cancel the trailing throttled invocation.
     * jQuery(window).on('popstate', throttled.cancel);
     */


    function throttle(func, wait, options) {
      var leading = true,
          trailing = true;

      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }

      if (isObject(options)) {
        leading = 'leading' in options ? !!options.leading : leading;
        trailing = 'trailing' in options ? !!options.trailing : trailing;
      }

      return debounce(func, wait, {
        'leading': leading,
        'maxWait': wait,
        'trailing': trailing
      });
    }
    /**
     * Checks if `value` is the
     * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
     * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an object, else `false`.
     * @example
     *
     * _.isObject({});
     * // => true
     *
     * _.isObject([1, 2, 3]);
     * // => true
     *
     * _.isObject(_.noop);
     * // => true
     *
     * _.isObject(null);
     * // => false
     */


    function isObject(value) {
      var type = typeof value;
      return !!value && (type == 'object' || type == 'function');
    }
    /**
     * Checks if `value` is object-like. A value is object-like if it's not `null`
     * and has a `typeof` result of "object".
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
     * @example
     *
     * _.isObjectLike({});
     * // => true
     *
     * _.isObjectLike([1, 2, 3]);
     * // => true
     *
     * _.isObjectLike(_.noop);
     * // => false
     *
     * _.isObjectLike(null);
     * // => false
     */


    function isObjectLike(value) {
      return !!value && typeof value == 'object';
    }
    /**
     * Checks if `value` is classified as a `Symbol` primitive or object.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
     * @example
     *
     * _.isSymbol(Symbol.iterator);
     * // => true
     *
     * _.isSymbol('abc');
     * // => false
     */


    function isSymbol(value) {
      return typeof value == 'symbol' || isObjectLike(value) && objectToString.call(value) == symbolTag;
    }
    /**
     * Converts `value` to a number.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to process.
     * @returns {number} Returns the number.
     * @example
     *
     * _.toNumber(3.2);
     * // => 3.2
     *
     * _.toNumber(Number.MIN_VALUE);
     * // => 5e-324
     *
     * _.toNumber(Infinity);
     * // => Infinity
     *
     * _.toNumber('3.2');
     * // => 3.2
     */


    function toNumber(value) {
      if (typeof value == 'number') {
        return value;
      }

      if (isSymbol(value)) {
        return NAN;
      }

      if (isObject(value)) {
        var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
        value = isObject(other) ? other + '' : other;
      }

      if (typeof value != 'string') {
        return value === 0 ? value : +value;
      }

      value = value.replace(reTrim, '');
      var isBinary = reIsBinary.test(value);
      return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
    }

    var lodash_throttle = throttle;

    //
    var script$3 = {
      name: 'Saturation',
      props: {
        value: Object
      },
      computed: {
        colors() {
          return this.value;
        },

        bgColor() {
          return `hsl(${this.colors.hsv.h}, 100%, 50%)`;
        },

        pointerTop() {
          return -(this.colors.hsv.v * 100) + 1 + 100 + '%';
        },

        pointerLeft() {
          return this.colors.hsv.s * 100 + '%';
        }

      },
      methods: {
        throttle: lodash_throttle((fn, data) => {
          fn(data);
        }, 20, {
          'leading': true,
          'trailing': false
        }),

        handleChange(e, skip) {
          !skip && e.preventDefault();
          var container = this.$refs.container;
          var containerWidth = container.clientWidth;
          var containerHeight = container.clientHeight;
          var xOffset = container.getBoundingClientRect().left + window.pageXOffset;
          var yOffset = container.getBoundingClientRect().top + window.pageYOffset;
          var pageX = e.pageX || (e.touches ? e.touches[0].pageX : 0);
          var pageY = e.pageY || (e.touches ? e.touches[0].pageY : 0);
          var left = clamp_1(pageX - xOffset, 0, containerWidth);
          var top = clamp_1(pageY - yOffset, 0, containerHeight);
          var saturation = left / containerWidth;
          var bright = clamp_1(-(top / containerHeight) + 1, 0, 1);
          this.throttle(this.onChange, {
            h: this.colors.hsv.h,
            s: saturation,
            v: bright,
            a: this.colors.hsv.a,
            source: 'hsva'
          });
        },

        onChange(param) {
          this.$emit('change', param);
        },

        handleMouseDown(e) {
          // this.handleChange(e, true)
          window.addEventListener('mousemove', this.handleChange);
          window.addEventListener('mouseup', this.handleChange);
          window.addEventListener('mouseup', this.handleMouseUp);
        },

        handleMouseUp(e) {
          this.unbindEventListeners();
        },

        unbindEventListeners() {
          window.removeEventListener('mousemove', this.handleChange);
          window.removeEventListener('mouseup', this.handleChange);
          window.removeEventListener('mouseup', this.handleMouseUp);
        }

      }
    };

    /* script */
    const __vue_script__$3 = script$3;
    /* template */

    var __vue_render__$3 = function () {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c("div", {
        ref: "container",
        staticClass: "vc-saturation",
        style: {
          background: _vm.bgColor
        },
        on: {
          mousedown: _vm.handleMouseDown,
          touchmove: _vm.handleChange,
          touchstart: _vm.handleChange
        }
      }, [_c("div", {
        staticClass: "vc-saturation--white"
      }), _vm._v(" "), _c("div", {
        staticClass: "vc-saturation--black"
      }), _vm._v(" "), _c("div", {
        staticClass: "vc-saturation-pointer",
        style: {
          top: _vm.pointerTop,
          left: _vm.pointerLeft
        }
      }, [_c("div", {
        staticClass: "vc-saturation-circle"
      })])]);
    };

    var __vue_staticRenderFns__$3 = [];
    __vue_render__$3._withStripped = true;
    /* style */

    const __vue_inject_styles__$3 = function (inject) {
      if (!inject) return;
      inject("data-v-63b6f413_0", {
        source: "\n.vc-saturation,\n.vc-saturation--white,\n.vc-saturation--black {\n  cursor: pointer;\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n}\n.vc-saturation--white {\n  background: linear-gradient(to right, #fff, rgba(255,255,255,0));\n}\n.vc-saturation--black {\n  background: linear-gradient(to top, #000, rgba(0,0,0,0));\n}\n.vc-saturation-pointer {\n  cursor: pointer;\n  position: absolute;\n}\n.vc-saturation-circle {\n  cursor: head;\n  width: 4px;\n  height: 4px;\n  box-shadow: 0 0 0 1.5px #fff, inset 0 0 1px 1px rgba(0,0,0,.3), 0 0 1px 2px rgba(0,0,0,.4);\n  border-radius: 50%;\n  transform: translate(-2px, -2px);\n}\n",
        map: {
          "version": 3,
          "sources": ["D:\\OPENSERVER\\OSPanel\\domains\\s8.loc\\wa-apps\\customizer\\plugins\\settings\\node_modules\\vue-color\\src\\components\\common\\Saturation.vue"],
          "names": [],
          "mappings": ";AA2FA;;;EAGA,eAAA;EACA,kBAAA;EACA,MAAA;EACA,OAAA;EACA,QAAA;EACA,SAAA;AACA;AAEA;EACA,gEAAA;AACA;AACA;EACA,wDAAA;AACA;AACA;EACA,eAAA;EACA,kBAAA;AACA;AACA;EACA,YAAA;EACA,UAAA;EACA,WAAA;EACA,0FAAA;EACA,kBAAA;EACA,gCAAA;AACA",
          "file": "Saturation.vue",
          "sourcesContent": ["<template>\n  <div class=\"vc-saturation\"\n    :style=\"{background: bgColor}\"\n    ref=\"container\"\n    @mousedown=\"handleMouseDown\"\n    @touchmove=\"handleChange\"\n    @touchstart=\"handleChange\">\n    <div class=\"vc-saturation--white\"></div>\n    <div class=\"vc-saturation--black\"></div>\n    <div class=\"vc-saturation-pointer\" :style=\"{top: pointerTop, left: pointerLeft}\">\n      <div class=\"vc-saturation-circle\"></div>\n    </div>\n  </div>\n</template>\n\n<script>\nimport clamp from 'clamp'\nimport throttle from 'lodash.throttle'\n\nexport default {\n  name: 'Saturation',\n  props: {\n    value: Object\n  },\n  computed: {\n    colors () {\n      return this.value\n    },\n    bgColor () {\n      return `hsl(${this.colors.hsv.h}, 100%, 50%)`\n    },\n    pointerTop () {\n      return (-(this.colors.hsv.v * 100) + 1) + 100 + '%'\n    },\n    pointerLeft () {\n      return this.colors.hsv.s * 100 + '%'\n    }\n  },\n  methods: {\n    throttle: throttle((fn, data) => {\n      fn(data)\n    }, 20,\n      {\n        'leading': true,\n        'trailing': false\n      }),\n    handleChange (e, skip) {\n      !skip && e.preventDefault()\n      var container = this.$refs.container\n      var containerWidth = container.clientWidth\n      var containerHeight = container.clientHeight\n\n      var xOffset = container.getBoundingClientRect().left + window.pageXOffset\n      var yOffset = container.getBoundingClientRect().top + window.pageYOffset\n      var pageX = e.pageX || (e.touches ? e.touches[0].pageX : 0)\n      var pageY = e.pageY || (e.touches ? e.touches[0].pageY : 0)\n      var left = clamp(pageX - xOffset, 0, containerWidth)\n      var top = clamp(pageY - yOffset, 0, containerHeight)\n      var saturation = left / containerWidth\n      var bright = clamp(-(top / containerHeight) + 1, 0, 1)\n\n      this.throttle(this.onChange, {\n        h: this.colors.hsv.h,\n        s: saturation,\n        v: bright,\n        a: this.colors.hsv.a,\n        source: 'hsva'\n      })\n    },\n    onChange (param) {\n      this.$emit('change', param)\n    },\n    handleMouseDown (e) {\n      // this.handleChange(e, true)\n      window.addEventListener('mousemove', this.handleChange)\n      window.addEventListener('mouseup', this.handleChange)\n      window.addEventListener('mouseup', this.handleMouseUp)\n    },\n    handleMouseUp (e) {\n      this.unbindEventListeners()\n    },\n    unbindEventListeners () {\n      window.removeEventListener('mousemove', this.handleChange)\n      window.removeEventListener('mouseup', this.handleChange)\n      window.removeEventListener('mouseup', this.handleMouseUp)\n    }\n  }\n}\n</script>\n\n<style>\n.vc-saturation,\n.vc-saturation--white,\n.vc-saturation--black {\n  cursor: pointer;\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n}\n\n.vc-saturation--white {\n  background: linear-gradient(to right, #fff, rgba(255,255,255,0));\n}\n.vc-saturation--black {\n  background: linear-gradient(to top, #000, rgba(0,0,0,0));\n}\n.vc-saturation-pointer {\n  cursor: pointer;\n  position: absolute;\n}\n.vc-saturation-circle {\n  cursor: head;\n  width: 4px;\n  height: 4px;\n  box-shadow: 0 0 0 1.5px #fff, inset 0 0 1px 1px rgba(0,0,0,.3), 0 0 1px 2px rgba(0,0,0,.4);\n  border-radius: 50%;\n  transform: translate(-2px, -2px);\n}\n</style>\n"]
        },
        media: undefined
      });
    };
    /* scoped */


    const __vue_scope_id__$3 = undefined;
    /* module identifier */

    const __vue_module_identifier__$3 = undefined;
    /* functional template */

    const __vue_is_functional_template__$3 = false;
    /* style inject SSR */

    /* style inject shadow dom */

    const __vue_component__$3 = normalizeComponent({
      render: __vue_render__$3,
      staticRenderFns: __vue_staticRenderFns__$3
    }, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, false, createInjector, undefined, undefined);

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
    var script$4 = {
      name: 'Hue',
      props: {
        value: Object,
        direction: {
          type: String,
          // [horizontal | vertical]
          default: 'horizontal'
        }
      },

      data() {
        return {
          oldHue: 0,
          pullDirection: ''
        };
      },

      computed: {
        colors() {
          const h = this.value.hsl.h;
          if (h !== 0 && h - this.oldHue > 0) this.pullDirection = 'right';
          if (h !== 0 && h - this.oldHue < 0) this.pullDirection = 'left';
          this.oldHue = h;
          return this.value;
        },

        directionClass() {
          return {
            'vc-hue--horizontal': this.direction === 'horizontal',
            'vc-hue--vertical': this.direction === 'vertical'
          };
        },

        pointerTop() {
          if (this.direction === 'vertical') {
            if (this.colors.hsl.h === 0 && this.pullDirection === 'right') return 0;
            return -(this.colors.hsl.h * 100 / 360) + 100 + '%';
          } else {
            return 0;
          }
        },

        pointerLeft() {
          if (this.direction === 'vertical') {
            return 0;
          } else {
            if (this.colors.hsl.h === 0 && this.pullDirection === 'right') return '100%';
            return this.colors.hsl.h * 100 / 360 + '%';
          }
        }

      },
      methods: {
        handleChange(e, skip) {
          !skip && e.preventDefault();
          var container = this.$refs.container;
          var containerWidth = container.clientWidth;
          var containerHeight = container.clientHeight;
          var xOffset = container.getBoundingClientRect().left + window.pageXOffset;
          var yOffset = container.getBoundingClientRect().top + window.pageYOffset;
          var pageX = e.pageX || (e.touches ? e.touches[0].pageX : 0);
          var pageY = e.pageY || (e.touches ? e.touches[0].pageY : 0);
          var left = pageX - xOffset;
          var top = pageY - yOffset;
          var h;
          var percent;

          if (this.direction === 'vertical') {
            if (top < 0) {
              h = 360;
            } else if (top > containerHeight) {
              h = 0;
            } else {
              percent = -(top * 100 / containerHeight) + 100;
              h = 360 * percent / 100;
            }

            if (this.colors.hsl.h !== h) {
              this.$emit('change', {
                h: h,
                s: this.colors.hsl.s,
                l: this.colors.hsl.l,
                a: this.colors.hsl.a,
                source: 'hsl'
              });
            }
          } else {
            if (left < 0) {
              h = 0;
            } else if (left > containerWidth) {
              h = 360;
            } else {
              percent = left * 100 / containerWidth;
              h = 360 * percent / 100;
            }

            if (this.colors.hsl.h !== h) {
              this.$emit('change', {
                h: h,
                s: this.colors.hsl.s,
                l: this.colors.hsl.l,
                a: this.colors.hsl.a,
                source: 'hsl'
              });
            }
          }
        },

        handleMouseDown(e) {
          this.handleChange(e, true);
          window.addEventListener('mousemove', this.handleChange);
          window.addEventListener('mouseup', this.handleMouseUp);
        },

        handleMouseUp(e) {
          this.unbindEventListeners();
        },

        unbindEventListeners() {
          window.removeEventListener('mousemove', this.handleChange);
          window.removeEventListener('mouseup', this.handleMouseUp);
        }

      }
    };

    /* script */
    const __vue_script__$4 = script$4;
    /* template */

    var __vue_render__$4 = function () {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c("div", {
        class: ["vc-hue", _vm.directionClass]
      }, [_c("div", {
        ref: "container",
        staticClass: "vc-hue-container",
        attrs: {
          role: "slider",
          "aria-valuenow": _vm.colors.hsl.h,
          "aria-valuemin": "0",
          "aria-valuemax": "360"
        },
        on: {
          mousedown: _vm.handleMouseDown,
          touchmove: _vm.handleChange,
          touchstart: _vm.handleChange
        }
      }, [_c("div", {
        staticClass: "vc-hue-pointer",
        style: {
          top: _vm.pointerTop,
          left: _vm.pointerLeft
        },
        attrs: {
          role: "presentation"
        }
      }, [_c("div", {
        staticClass: "vc-hue-picker"
      })])])]);
    };

    var __vue_staticRenderFns__$4 = [];
    __vue_render__$4._withStripped = true;
    /* style */

    const __vue_inject_styles__$4 = function (inject) {
      if (!inject) return;
      inject("data-v-6112b804_0", {
        source: "\n.vc-hue {\n  position: absolute;\n  top: 0px;\n  right: 0px;\n  bottom: 0px;\n  left: 0px;\n  border-radius: 2px;\n}\n.vc-hue--horizontal {\n  background: linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);\n}\n.vc-hue--vertical {\n  background: linear-gradient(to top, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);\n}\n.vc-hue-container {\n  cursor: pointer;\n  margin: 0 2px;\n  position: relative;\n  height: 100%;\n}\n.vc-hue-pointer {\n  z-index: 2;\n  position: absolute;\n}\n.vc-hue-picker {\n  cursor: pointer;\n  margin-top: 1px;\n  width: 4px;\n  border-radius: 1px;\n  height: 8px;\n  box-shadow: 0 0 2px rgba(0, 0, 0, .6);\n  background: #fff;\n  transform: translateX(-2px) ;\n}\n",
        map: {
          "version": 3,
          "sources": ["D:\\OPENSERVER\\OSPanel\\domains\\s8.loc\\wa-apps\\customizer\\plugins\\settings\\node_modules\\vue-color\\src\\components\\common\\Hue.vue"],
          "names": [],
          "mappings": ";AA8IA;EACA,kBAAA;EACA,QAAA;EACA,UAAA;EACA,WAAA;EACA,SAAA;EACA,kBAAA;AACA;AACA;EACA,2GAAA;AACA;AACA;EACA,yGAAA;AACA;AACA;EACA,eAAA;EACA,aAAA;EACA,kBAAA;EACA,YAAA;AACA;AACA;EACA,UAAA;EACA,kBAAA;AACA;AACA;EACA,eAAA;EACA,eAAA;EACA,UAAA;EACA,kBAAA;EACA,WAAA;EACA,qCAAA;EACA,gBAAA;EACA,4BAAA;AACA",
          "file": "Hue.vue",
          "sourcesContent": ["<template>\n  <div :class=\"['vc-hue', directionClass]\">\n    <div class=\"vc-hue-container\"\n      role=\"slider\"\n      :aria-valuenow=\"colors.hsl.h\"\n      aria-valuemin=\"0\"\n      aria-valuemax=\"360\"\n      ref=\"container\"\n      @mousedown=\"handleMouseDown\"\n      @touchmove=\"handleChange\"\n      @touchstart=\"handleChange\">\n      <div class=\"vc-hue-pointer\" :style=\"{top: pointerTop, left: pointerLeft}\" role=\"presentation\">\n        <div class=\"vc-hue-picker\"></div>\n      </div>\n    </div>\n  </div>\n</template>\n\n<script>\nexport default {\n  name: 'Hue',\n  props: {\n    value: Object,\n    direction: {\n      type: String,\n      // [horizontal | vertical]\n      default: 'horizontal'\n    }\n  },\n  data () {\n    return {\n      oldHue: 0,\n      pullDirection: ''\n    }\n  },\n  computed: {\n    colors () {\n      const h = this.value.hsl.h\n      if (h !== 0 && h - this.oldHue > 0) this.pullDirection = 'right'\n      if (h !== 0 && h - this.oldHue < 0) this.pullDirection = 'left'\n      this.oldHue = h\n\n      return this.value\n    },\n    directionClass () {\n      return {\n        'vc-hue--horizontal': this.direction === 'horizontal',\n        'vc-hue--vertical': this.direction === 'vertical'\n      }\n    },\n    pointerTop () {\n      if (this.direction === 'vertical') {\n        if (this.colors.hsl.h === 0 && this.pullDirection === 'right') return 0\n        return -((this.colors.hsl.h * 100) / 360) + 100 + '%'\n      } else {\n        return 0\n      }\n    },\n    pointerLeft () {\n      if (this.direction === 'vertical') {\n        return 0\n      } else {\n        if (this.colors.hsl.h === 0 && this.pullDirection === 'right') return '100%'\n        return (this.colors.hsl.h * 100) / 360 + '%'\n      }\n    }\n  },\n  methods: {\n    handleChange (e, skip) {\n      !skip && e.preventDefault()\n\n      var container = this.$refs.container\n      var containerWidth = container.clientWidth\n      var containerHeight = container.clientHeight\n\n      var xOffset = container.getBoundingClientRect().left + window.pageXOffset\n      var yOffset = container.getBoundingClientRect().top + window.pageYOffset\n      var pageX = e.pageX || (e.touches ? e.touches[0].pageX : 0)\n      var pageY = e.pageY || (e.touches ? e.touches[0].pageY : 0)\n      var left = pageX - xOffset\n      var top = pageY - yOffset\n\n      var h\n      var percent\n\n      if (this.direction === 'vertical') {\n        if (top < 0) {\n          h = 360\n        } else if (top > containerHeight) {\n          h = 0\n        } else {\n          percent = -(top * 100 / containerHeight) + 100\n          h = (360 * percent / 100)\n        }\n\n        if (this.colors.hsl.h !== h) {\n          this.$emit('change', {\n            h: h,\n            s: this.colors.hsl.s,\n            l: this.colors.hsl.l,\n            a: this.colors.hsl.a,\n            source: 'hsl'\n          })\n        }\n      } else {\n        if (left < 0) {\n          h = 0\n        } else if (left > containerWidth) {\n          h = 360\n        } else {\n          percent = left * 100 / containerWidth\n          h = (360 * percent / 100)\n        }\n\n        if (this.colors.hsl.h !== h) {\n          this.$emit('change', {\n            h: h,\n            s: this.colors.hsl.s,\n            l: this.colors.hsl.l,\n            a: this.colors.hsl.a,\n            source: 'hsl'\n          })\n        }\n      }\n    },\n    handleMouseDown (e) {\n      this.handleChange(e, true)\n      window.addEventListener('mousemove', this.handleChange)\n      window.addEventListener('mouseup', this.handleMouseUp)\n    },\n    handleMouseUp (e) {\n      this.unbindEventListeners()\n    },\n    unbindEventListeners () {\n      window.removeEventListener('mousemove', this.handleChange)\n      window.removeEventListener('mouseup', this.handleMouseUp)\n    }\n  }\n}\n</script>\n\n<style>\n.vc-hue {\n  position: absolute;\n  top: 0px;\n  right: 0px;\n  bottom: 0px;\n  left: 0px;\n  border-radius: 2px;\n}\n.vc-hue--horizontal {\n  background: linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);\n}\n.vc-hue--vertical {\n  background: linear-gradient(to top, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);\n}\n.vc-hue-container {\n  cursor: pointer;\n  margin: 0 2px;\n  position: relative;\n  height: 100%;\n}\n.vc-hue-pointer {\n  z-index: 2;\n  position: absolute;\n}\n.vc-hue-picker {\n  cursor: pointer;\n  margin-top: 1px;\n  width: 4px;\n  border-radius: 1px;\n  height: 8px;\n  box-shadow: 0 0 2px rgba(0, 0, 0, .6);\n  background: #fff;\n  transform: translateX(-2px) ;\n}\n</style>\n"]
        },
        media: undefined
      });
    };
    /* scoped */


    const __vue_scope_id__$4 = undefined;
    /* module identifier */

    const __vue_module_identifier__$4 = undefined;
    /* functional template */

    const __vue_is_functional_template__$4 = false;
    /* style inject SSR */

    /* style inject shadow dom */

    const __vue_component__$4 = normalizeComponent({
      render: __vue_render__$4,
      staticRenderFns: __vue_staticRenderFns__$4
    }, __vue_inject_styles__$4, __vue_script__$4, __vue_scope_id__$4, __vue_is_functional_template__$4, __vue_module_identifier__$4, false, createInjector, undefined, undefined);

    //
    //
    //
    //
    let _checkboardCache = {};
    var script$5 = {
      name: 'Checkboard',
      props: {
        size: {
          type: [Number, String],
          default: 8
        },
        white: {
          type: String,
          default: '#fff'
        },
        grey: {
          type: String,
          default: '#e6e6e6'
        }
      },
      computed: {
        bgStyle() {
          return {
            'background-image': 'url(' + getCheckboard(this.white, this.grey, this.size) + ')'
          };
        }

      }
    };
    /**
     * get base 64 data by canvas
     *
     * @param {String} c1 hex color
     * @param {String} c2 hex color
     * @param {Number} size
     */

    function renderCheckboard(c1, c2, size) {
      // Dont Render On Server
      if (typeof document === 'undefined') {
        return null;
      }

      var canvas = document.createElement('canvas');
      canvas.width = canvas.height = size * 2;
      var ctx = canvas.getContext('2d'); // If no context can be found, return early.

      if (!ctx) {
        return null;
      }

      ctx.fillStyle = c1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = c2;
      ctx.fillRect(0, 0, size, size);
      ctx.translate(size, size);
      ctx.fillRect(0, 0, size, size);
      return canvas.toDataURL();
    }
    /**
     * get checkboard base data and cache
     *
     * @param {String} c1 hex color
     * @param {String} c2 hex color
     * @param {Number} size
     */


    function getCheckboard(c1, c2, size) {
      var key = c1 + ',' + c2 + ',' + size;

      if (_checkboardCache[key]) {
        return _checkboardCache[key];
      } else {
        var checkboard = renderCheckboard(c1, c2, size);
        _checkboardCache[key] = checkboard;
        return checkboard;
      }
    }

    /* script */
    const __vue_script__$5 = script$5;
    /* template */

    var __vue_render__$5 = function () {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c("div", {
        staticClass: "vc-checkerboard",
        style: _vm.bgStyle
      });
    };

    var __vue_staticRenderFns__$5 = [];
    __vue_render__$5._withStripped = true;
    /* style */

    const __vue_inject_styles__$5 = function (inject) {
      if (!inject) return;
      inject("data-v-9800718a_0", {
        source: "\n.vc-checkerboard {\n  position: absolute;\n  top: 0px;\n  right: 0px;\n  bottom: 0px;\n  left: 0px;\n  background-size: contain;\n}\n",
        map: {
          "version": 3,
          "sources": ["D:\\OPENSERVER\\OSPanel\\domains\\s8.loc\\wa-apps\\customizer\\plugins\\settings\\node_modules\\vue-color\\src\\components\\common\\Checkboard.vue"],
          "names": [],
          "mappings": ";AAoFA;EACA,kBAAA;EACA,QAAA;EACA,UAAA;EACA,WAAA;EACA,SAAA;EACA,wBAAA;AACA",
          "file": "Checkboard.vue",
          "sourcesContent": ["<template>\n  <div class=\"vc-checkerboard\" :style=\"bgStyle\"></div>\n</template>\n\n<script>\nlet _checkboardCache = {}\n\nexport default {\n  name: 'Checkboard',\n  props: {\n    size: {\n      type: [Number, String],\n      default: 8\n    },\n    white: {\n      type: String,\n      default: '#fff'\n    },\n    grey: {\n      type: String,\n      default: '#e6e6e6'\n    }\n  },\n  computed: {\n    bgStyle () {\n      return {\n        'background-image': 'url(' + getCheckboard(this.white, this.grey, this.size) + ')'\n      }\n    }\n  }\n}\n\n/**\n * get base 64 data by canvas\n *\n * @param {String} c1 hex color\n * @param {String} c2 hex color\n * @param {Number} size\n */\n\nfunction renderCheckboard (c1, c2, size) {\n  // Dont Render On Server\n  if (typeof document === 'undefined') {\n    return null\n  }\n  var canvas = document.createElement('canvas')\n  canvas.width = canvas.height = size * 2\n  var ctx = canvas.getContext('2d')\n  // If no context can be found, return early.\n  if (!ctx) {\n    return null\n  }\n  ctx.fillStyle = c1\n  ctx.fillRect(0, 0, canvas.width, canvas.height)\n  ctx.fillStyle = c2\n  ctx.fillRect(0, 0, size, size)\n  ctx.translate(size, size)\n  ctx.fillRect(0, 0, size, size)\n  return canvas.toDataURL()\n}\n\n/**\n * get checkboard base data and cache\n *\n * @param {String} c1 hex color\n * @param {String} c2 hex color\n * @param {Number} size\n */\n\nfunction getCheckboard (c1, c2, size) {\n  var key = c1 + ',' + c2 + ',' + size\n\n  if (_checkboardCache[key]) {\n    return _checkboardCache[key]\n  } else {\n    var checkboard = renderCheckboard(c1, c2, size)\n    _checkboardCache[key] = checkboard\n    return checkboard\n  }\n}\n\n</script>\n\n<style>\n.vc-checkerboard {\n  position: absolute;\n  top: 0px;\n  right: 0px;\n  bottom: 0px;\n  left: 0px;\n  background-size: contain;\n}\n</style>\n"]
        },
        media: undefined
      });
    };
    /* scoped */


    const __vue_scope_id__$5 = undefined;
    /* module identifier */

    const __vue_module_identifier__$5 = undefined;
    /* functional template */

    const __vue_is_functional_template__$5 = false;
    /* style inject SSR */

    /* style inject shadow dom */

    const __vue_component__$5 = normalizeComponent({
      render: __vue_render__$5,
      staticRenderFns: __vue_staticRenderFns__$5
    }, __vue_inject_styles__$5, __vue_script__$5, __vue_scope_id__$5, __vue_is_functional_template__$5, __vue_module_identifier__$5, false, createInjector, undefined, undefined);

    //
    var script$6 = {
      name: 'Alpha',
      props: {
        value: Object,
        onChange: Function
      },
      components: {
        checkboard: __vue_component__$5
      },
      computed: {
        colors() {
          return this.value;
        },

        gradientColor() {
          var rgba = this.colors.rgba;
          var rgbStr = [rgba.r, rgba.g, rgba.b].join(',');
          return 'linear-gradient(to right, rgba(' + rgbStr + ', 0) 0%, rgba(' + rgbStr + ', 1) 100%)';
        }

      },
      methods: {
        handleChange(e, skip) {
          !skip && e.preventDefault();
          var container = this.$refs.container;
          var containerWidth = container.clientWidth;
          var xOffset = container.getBoundingClientRect().left + window.pageXOffset;
          var pageX = e.pageX || (e.touches ? e.touches[0].pageX : 0);
          var left = pageX - xOffset;
          var a;

          if (left < 0) {
            a = 0;
          } else if (left > containerWidth) {
            a = 1;
          } else {
            a = Math.round(left * 100 / containerWidth) / 100;
          }

          if (this.colors.a !== a) {
            this.$emit('change', {
              h: this.colors.hsl.h,
              s: this.colors.hsl.s,
              l: this.colors.hsl.l,
              a: a,
              source: 'rgba'
            });
          }
        },

        handleMouseDown(e) {
          this.handleChange(e, true);
          window.addEventListener('mousemove', this.handleChange);
          window.addEventListener('mouseup', this.handleMouseUp);
        },

        handleMouseUp() {
          this.unbindEventListeners();
        },

        unbindEventListeners() {
          window.removeEventListener('mousemove', this.handleChange);
          window.removeEventListener('mouseup', this.handleMouseUp);
        }

      }
    };

    /* script */
    const __vue_script__$6 = script$6;
    /* template */

    var __vue_render__$6 = function () {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c("div", {
        staticClass: "vc-alpha"
      }, [_c("div", {
        staticClass: "vc-alpha-checkboard-wrap"
      }, [_c("checkboard")], 1), _vm._v(" "), _c("div", {
        staticClass: "vc-alpha-gradient",
        style: {
          background: _vm.gradientColor
        }
      }), _vm._v(" "), _c("div", {
        ref: "container",
        staticClass: "vc-alpha-container",
        on: {
          mousedown: _vm.handleMouseDown,
          touchmove: _vm.handleChange,
          touchstart: _vm.handleChange
        }
      }, [_c("div", {
        staticClass: "vc-alpha-pointer",
        style: {
          left: _vm.colors.a * 100 + "%"
        }
      }, [_c("div", {
        staticClass: "vc-alpha-picker"
      })])])]);
    };

    var __vue_staticRenderFns__$6 = [];
    __vue_render__$6._withStripped = true;
    /* style */

    const __vue_inject_styles__$6 = function (inject) {
      if (!inject) return;
      inject("data-v-4bcea74c_0", {
        source: "\n.vc-alpha {\n  position: absolute;\n  top: 0px;\n  right: 0px;\n  bottom: 0px;\n  left: 0px;\n}\n.vc-alpha-checkboard-wrap {\n  position: absolute;\n  top: 0px;\n  right: 0px;\n  bottom: 0px;\n  left: 0px;\n  overflow: hidden;\n}\n.vc-alpha-gradient {\n  position: absolute;\n  top: 0px;\n  right: 0px;\n  bottom: 0px;\n  left: 0px;\n}\n.vc-alpha-container {\n  cursor: pointer;\n  position: relative;\n  z-index: 2;\n  height: 100%;\n  margin: 0 3px;\n}\n.vc-alpha-pointer {\n  z-index: 2;\n  position: absolute;\n}\n.vc-alpha-picker {\n  cursor: pointer;\n  width: 4px;\n  border-radius: 1px;\n  height: 8px;\n  box-shadow: 0 0 2px rgba(0, 0, 0, .6);\n  background: #fff;\n  margin-top: 1px;\n  transform: translateX(-2px);\n}\n",
        map: {
          "version": 3,
          "sources": ["D:\\OPENSERVER\\OSPanel\\domains\\s8.loc\\wa-apps\\customizer\\plugins\\settings\\node_modules\\vue-color\\src\\components\\common\\Alpha.vue"],
          "names": [],
          "mappings": ";AAsFA;EACA,kBAAA;EACA,QAAA;EACA,UAAA;EACA,WAAA;EACA,SAAA;AACA;AACA;EACA,kBAAA;EACA,QAAA;EACA,UAAA;EACA,WAAA;EACA,SAAA;EACA,gBAAA;AACA;AACA;EACA,kBAAA;EACA,QAAA;EACA,UAAA;EACA,WAAA;EACA,SAAA;AACA;AACA;EACA,eAAA;EACA,kBAAA;EACA,UAAA;EACA,YAAA;EACA,aAAA;AACA;AACA;EACA,UAAA;EACA,kBAAA;AACA;AACA;EACA,eAAA;EACA,UAAA;EACA,kBAAA;EACA,WAAA;EACA,qCAAA;EACA,gBAAA;EACA,eAAA;EACA,2BAAA;AACA",
          "file": "Alpha.vue",
          "sourcesContent": ["<template>\n  <div class=\"vc-alpha\">\n    <div class=\"vc-alpha-checkboard-wrap\">\n      <checkboard></checkboard>\n    </div>\n    <div class=\"vc-alpha-gradient\" :style=\"{background: gradientColor}\"></div>\n    <div class=\"vc-alpha-container\" ref=\"container\"\n        @mousedown=\"handleMouseDown\"\n        @touchmove=\"handleChange\"\n        @touchstart=\"handleChange\">\n      <div class=\"vc-alpha-pointer\" :style=\"{left: colors.a * 100 + '%'}\">\n        <div class=\"vc-alpha-picker\"></div>\n      </div>\n    </div>\n  </div>\n</template>\n\n<script>\nimport checkboard from './Checkboard.vue'\n\nexport default {\n  name: 'Alpha',\n  props: {\n    value: Object,\n    onChange: Function\n  },\n  components: {\n    checkboard\n  },\n  computed: {\n    colors () {\n      return this.value\n    },\n    gradientColor () {\n      var rgba = this.colors.rgba\n      var rgbStr = [rgba.r, rgba.g, rgba.b].join(',')\n      return 'linear-gradient(to right, rgba(' + rgbStr + ', 0) 0%, rgba(' + rgbStr + ', 1) 100%)'\n    }\n  },\n  methods: {\n    handleChange (e, skip) {\n      !skip && e.preventDefault()\n      var container = this.$refs.container\n      var containerWidth = container.clientWidth\n\n      var xOffset = container.getBoundingClientRect().left + window.pageXOffset\n      var pageX = e.pageX || (e.touches ? e.touches[0].pageX : 0)\n      var left = pageX - xOffset\n\n      var a\n      if (left < 0) {\n        a = 0\n      } else if (left > containerWidth) {\n        a = 1\n      } else {\n        a = Math.round(left * 100 / containerWidth) / 100\n      }\n\n      if (this.colors.a !== a) {\n        this.$emit('change', {\n          h: this.colors.hsl.h,\n          s: this.colors.hsl.s,\n          l: this.colors.hsl.l,\n          a: a,\n          source: 'rgba'\n        })\n      }\n    },\n    handleMouseDown (e) {\n      this.handleChange(e, true)\n      window.addEventListener('mousemove', this.handleChange)\n      window.addEventListener('mouseup', this.handleMouseUp)\n    },\n    handleMouseUp () {\n      this.unbindEventListeners()\n    },\n    unbindEventListeners () {\n      window.removeEventListener('mousemove', this.handleChange)\n      window.removeEventListener('mouseup', this.handleMouseUp)\n    }\n  }\n}\n\n</script>\n\n<style>\n.vc-alpha {\n  position: absolute;\n  top: 0px;\n  right: 0px;\n  bottom: 0px;\n  left: 0px;\n}\n.vc-alpha-checkboard-wrap {\n  position: absolute;\n  top: 0px;\n  right: 0px;\n  bottom: 0px;\n  left: 0px;\n  overflow: hidden;\n}\n.vc-alpha-gradient {\n  position: absolute;\n  top: 0px;\n  right: 0px;\n  bottom: 0px;\n  left: 0px;\n}\n.vc-alpha-container {\n  cursor: pointer;\n  position: relative;\n  z-index: 2;\n  height: 100%;\n  margin: 0 3px;\n}\n.vc-alpha-pointer {\n  z-index: 2;\n  position: absolute;\n}\n.vc-alpha-picker {\n  cursor: pointer;\n  width: 4px;\n  border-radius: 1px;\n  height: 8px;\n  box-shadow: 0 0 2px rgba(0, 0, 0, .6);\n  background: #fff;\n  margin-top: 1px;\n  transform: translateX(-2px);\n}\n</style>\n"]
        },
        media: undefined
      });
    };
    /* scoped */


    const __vue_scope_id__$6 = undefined;
    /* module identifier */

    const __vue_module_identifier__$6 = undefined;
    /* functional template */

    const __vue_is_functional_template__$6 = false;
    /* style inject SSR */

    /* style inject shadow dom */

    const __vue_component__$6 = normalizeComponent({
      render: __vue_render__$6,
      staticRenderFns: __vue_staticRenderFns__$6
    }, __vue_inject_styles__$6, __vue_script__$6, __vue_scope_id__$6, __vue_is_functional_template__$6, __vue_module_identifier__$6, false, createInjector, undefined, undefined);

    //
    var script$7 = {
      name: 'Chrome',
      mixins: [colorMixin],
      props: {
        disableAlpha: {
          type: Boolean,
          default: false
        },
        disableFields: {
          type: Boolean,
          default: false
        }
      },
      components: {
        saturation: __vue_component__$3,
        hue: __vue_component__$4,
        alpha: __vue_component__$6,
        'ed-in': __vue_component__$2,
        checkboard: __vue_component__$5
      },

      data() {
        return {
          fieldsIndex: 0,
          highlight: false
        };
      },

      computed: {
        hsl() {
          const {
            h,
            s,
            l
          } = this.colors.hsl;
          return {
            h: h.toFixed(),
            s: `${(s * 100).toFixed()}%`,
            l: `${(l * 100).toFixed()}%`
          };
        },

        activeColor() {
          const rgba = this.colors.rgba;
          return 'rgba(' + [rgba.r, rgba.g, rgba.b, rgba.a].join(',') + ')';
        },

        hasAlpha() {
          return this.colors.a < 1;
        }

      },
      methods: {
        childChange(data) {
          this.colorChange(data);
        },

        inputChange(data) {
          if (!data) {
            return;
          }

          if (data.hex) {
            this.isValidHex(data.hex) && this.colorChange({
              hex: data.hex,
              source: 'hex'
            });
          } else if (data.r || data.g || data.b || data.a) {
            this.colorChange({
              r: data.r || this.colors.rgba.r,
              g: data.g || this.colors.rgba.g,
              b: data.b || this.colors.rgba.b,
              a: data.a || this.colors.rgba.a,
              source: 'rgba'
            });
          } else if (data.h || data.s || data.l) {
            const s = data.s ? data.s.replace('%', '') / 100 : this.colors.hsl.s;
            const l = data.l ? data.l.replace('%', '') / 100 : this.colors.hsl.l;
            this.colorChange({
              h: data.h || this.colors.hsl.h,
              s,
              l,
              source: 'hsl'
            });
          }
        },

        toggleViews() {
          if (this.fieldsIndex >= 2) {
            this.fieldsIndex = 0;
            return;
          }

          this.fieldsIndex++;
        },

        showHighlight() {
          this.highlight = true;
        },

        hideHighlight() {
          this.highlight = false;
        }

      }
    };

    /* script */
    const __vue_script__$7 = script$7;
    /* template */

    var __vue_render__$7 = function () {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c("div", {
        class: ["vc-chrome", _vm.disableAlpha ? "vc-chrome__disable-alpha" : ""],
        attrs: {
          role: "application",
          "aria-label": "Chrome color picker"
        }
      }, [_c("div", {
        staticClass: "vc-chrome-saturation-wrap"
      }, [_c("saturation", {
        on: {
          change: _vm.childChange
        },
        model: {
          value: _vm.colors,
          callback: function ($$v) {
            _vm.colors = $$v;
          },
          expression: "colors"
        }
      })], 1), _vm._v(" "), _c("div", {
        staticClass: "vc-chrome-body"
      }, [_c("div", {
        staticClass: "vc-chrome-controls"
      }, [_c("div", {
        staticClass: "vc-chrome-color-wrap"
      }, [_c("div", {
        staticClass: "vc-chrome-active-color",
        style: {
          background: _vm.activeColor
        },
        attrs: {
          "aria-label": "current color is " + _vm.colors.hex
        }
      }), _vm._v(" "), !_vm.disableAlpha ? _c("checkboard") : _vm._e()], 1), _vm._v(" "), _c("div", {
        staticClass: "vc-chrome-sliders"
      }, [_c("div", {
        staticClass: "vc-chrome-hue-wrap"
      }, [_c("hue", {
        on: {
          change: _vm.childChange
        },
        model: {
          value: _vm.colors,
          callback: function ($$v) {
            _vm.colors = $$v;
          },
          expression: "colors"
        }
      })], 1), _vm._v(" "), !_vm.disableAlpha ? _c("div", {
        staticClass: "vc-chrome-alpha-wrap"
      }, [_c("alpha", {
        on: {
          change: _vm.childChange
        },
        model: {
          value: _vm.colors,
          callback: function ($$v) {
            _vm.colors = $$v;
          },
          expression: "colors"
        }
      })], 1) : _vm._e()])]), _vm._v(" "), !_vm.disableFields ? _c("div", {
        staticClass: "vc-chrome-fields-wrap"
      }, [_c("div", {
        directives: [{
          name: "show",
          rawName: "v-show",
          value: _vm.fieldsIndex === 0,
          expression: "fieldsIndex === 0"
        }],
        staticClass: "vc-chrome-fields"
      }, [_c("div", {
        staticClass: "vc-chrome-field"
      }, [!_vm.hasAlpha ? _c("ed-in", {
        attrs: {
          label: "hex",
          value: _vm.colors.hex
        },
        on: {
          change: _vm.inputChange
        }
      }) : _vm._e(), _vm._v(" "), _vm.hasAlpha ? _c("ed-in", {
        attrs: {
          label: "hex",
          value: _vm.colors.hex8
        },
        on: {
          change: _vm.inputChange
        }
      }) : _vm._e()], 1)]), _vm._v(" "), _c("div", {
        directives: [{
          name: "show",
          rawName: "v-show",
          value: _vm.fieldsIndex === 1,
          expression: "fieldsIndex === 1"
        }],
        staticClass: "vc-chrome-fields"
      }, [_c("div", {
        staticClass: "vc-chrome-field"
      }, [_c("ed-in", {
        attrs: {
          label: "r",
          value: _vm.colors.rgba.r
        },
        on: {
          change: _vm.inputChange
        }
      })], 1), _vm._v(" "), _c("div", {
        staticClass: "vc-chrome-field"
      }, [_c("ed-in", {
        attrs: {
          label: "g",
          value: _vm.colors.rgba.g
        },
        on: {
          change: _vm.inputChange
        }
      })], 1), _vm._v(" "), _c("div", {
        staticClass: "vc-chrome-field"
      }, [_c("ed-in", {
        attrs: {
          label: "b",
          value: _vm.colors.rgba.b
        },
        on: {
          change: _vm.inputChange
        }
      })], 1), _vm._v(" "), !_vm.disableAlpha ? _c("div", {
        staticClass: "vc-chrome-field"
      }, [_c("ed-in", {
        attrs: {
          label: "a",
          value: _vm.colors.a,
          "arrow-offset": 0.01,
          max: 1
        },
        on: {
          change: _vm.inputChange
        }
      })], 1) : _vm._e()]), _vm._v(" "), _c("div", {
        directives: [{
          name: "show",
          rawName: "v-show",
          value: _vm.fieldsIndex === 2,
          expression: "fieldsIndex === 2"
        }],
        staticClass: "vc-chrome-fields"
      }, [_c("div", {
        staticClass: "vc-chrome-field"
      }, [_c("ed-in", {
        attrs: {
          label: "h",
          value: _vm.hsl.h
        },
        on: {
          change: _vm.inputChange
        }
      })], 1), _vm._v(" "), _c("div", {
        staticClass: "vc-chrome-field"
      }, [_c("ed-in", {
        attrs: {
          label: "s",
          value: _vm.hsl.s
        },
        on: {
          change: _vm.inputChange
        }
      })], 1), _vm._v(" "), _c("div", {
        staticClass: "vc-chrome-field"
      }, [_c("ed-in", {
        attrs: {
          label: "l",
          value: _vm.hsl.l
        },
        on: {
          change: _vm.inputChange
        }
      })], 1), _vm._v(" "), !_vm.disableAlpha ? _c("div", {
        staticClass: "vc-chrome-field"
      }, [_c("ed-in", {
        attrs: {
          label: "a",
          value: _vm.colors.a,
          "arrow-offset": 0.01,
          max: 1
        },
        on: {
          change: _vm.inputChange
        }
      })], 1) : _vm._e()]), _vm._v(" "), _c("div", {
        staticClass: "vc-chrome-toggle-btn",
        attrs: {
          role: "button",
          "aria-label": "Change another color definition"
        },
        on: {
          click: _vm.toggleViews
        }
      }, [_c("div", {
        staticClass: "vc-chrome-toggle-icon"
      }, [_c("svg", {
        staticStyle: {
          width: "24px",
          height: "24px"
        },
        attrs: {
          viewBox: "0 0 24 24"
        },
        on: {
          mouseover: _vm.showHighlight,
          mouseenter: _vm.showHighlight,
          mouseout: _vm.hideHighlight
        }
      }, [_c("path", {
        attrs: {
          fill: "#333",
          d: "M12,18.17L8.83,15L7.42,16.41L12,21L16.59,16.41L15.17,15M12,5.83L15.17,9L16.58,7.59L12,3L7.41,7.59L8.83,9L12,5.83Z"
        }
      })])]), _vm._v(" "), _c("div", {
        directives: [{
          name: "show",
          rawName: "v-show",
          value: _vm.highlight,
          expression: "highlight"
        }],
        staticClass: "vc-chrome-toggle-icon-highlight"
      })])]) : _vm._e()])]);
    };

    var __vue_staticRenderFns__$7 = [];
    __vue_render__$7._withStripped = true;
    /* style */

    const __vue_inject_styles__$7 = function (inject) {
      if (!inject) return;
      inject("data-v-aa87754c_0", {
        source: "\n.vc-chrome {\n  background: #fff;\n  border-radius: 2px;\n  box-shadow: 0 0 2px rgba(0,0,0,.3), 0 4px 8px rgba(0,0,0,.3);\n  box-sizing: initial;\n  width: 225px;\n  font-family: Menlo;\n  background-color: #fff;\n}\n.vc-chrome-controls {\n  display: flex;\n}\n.vc-chrome-color-wrap {\n  position: relative;\n  width: 36px;\n}\n.vc-chrome-active-color {\n  position: relative;\n  width: 30px;\n  height: 30px;\n  border-radius: 15px;\n  overflow: hidden;\n  z-index: 1;\n}\n.vc-chrome-color-wrap .vc-checkerboard {\n  width: 30px;\n  height: 30px;\n  border-radius: 15px;\n  background-size: auto;\n}\n.vc-chrome-sliders {\n  flex: 1;\n}\n.vc-chrome-fields-wrap {\n  display: flex;\n  padding-top: 16px;\n}\n.vc-chrome-fields {\n  display: flex;\n  margin-left: -6px;\n  flex: 1;\n}\n.vc-chrome-field {\n  padding-left: 6px;\n  width: 100%;\n}\n.vc-chrome-toggle-btn {\n  width: 32px;\n  text-align: right;\n  position: relative;\n}\n.vc-chrome-toggle-icon {\n  margin-right: -4px;\n  margin-top: 12px;\n  cursor: pointer;\n  position: relative;\n  z-index: 2;\n}\n.vc-chrome-toggle-icon-highlight {\n  position: absolute;\n  width: 24px;\n  height: 28px;\n  background: #eee;\n  border-radius: 4px;\n  top: 10px;\n  left: 12px;\n}\n.vc-chrome-hue-wrap {\n  position: relative;\n  height: 10px;\n  margin-bottom: 8px;\n}\n.vc-chrome-alpha-wrap {\n  position: relative;\n  height: 10px;\n}\n.vc-chrome-hue-wrap .vc-hue {\n  border-radius: 2px;\n}\n.vc-chrome-alpha-wrap .vc-alpha-gradient {\n  border-radius: 2px;\n}\n.vc-chrome-hue-wrap .vc-hue-picker, .vc-chrome-alpha-wrap .vc-alpha-picker {\n  width: 12px;\n  height: 12px;\n  border-radius: 6px;\n  transform: translate(-6px, -2px);\n  background-color: rgb(248, 248, 248);\n  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.37);\n}\n.vc-chrome-body {\n  padding: 16px 16px 12px;\n  background-color: #fff;\n}\n.vc-chrome-saturation-wrap {\n  width: 100%;\n  padding-bottom: 55%;\n  position: relative;\n  border-radius: 2px 2px 0 0;\n  overflow: hidden;\n}\n.vc-chrome-saturation-wrap .vc-saturation-circle {\n  width: 12px;\n  height: 12px;\n}\n.vc-chrome-fields .vc-input__input {\n  font-size: 11px;\n  color: #333;\n  width: 100%;\n  border-radius: 2px;\n  border: none;\n  box-shadow: inset 0 0 0 1px #dadada;\n  height: 21px;\n  text-align: center;\n}\n.vc-chrome-fields .vc-input__label {\n  text-transform: uppercase;\n  font-size: 11px;\n  line-height: 11px;\n  color: #969696;\n  text-align: center;\n  display: block;\n  margin-top: 12px;\n}\n.vc-chrome__disable-alpha .vc-chrome-active-color {\n  width: 18px;\n  height: 18px;\n}\n.vc-chrome__disable-alpha .vc-chrome-color-wrap {\n  width: 30px;\n}\n.vc-chrome__disable-alpha .vc-chrome-hue-wrap {\n  margin-top: 4px;\n  margin-bottom: 4px;\n}\n",
        map: {
          "version": 3,
          "sources": ["D:\\OPENSERVER\\OSPanel\\domains\\s8.loc\\wa-apps\\customizer\\plugins\\settings\\node_modules\\vue-color\\src\\components\\Chrome.vue"],
          "names": [],
          "mappings": ";AAoLA;EACA,gBAAA;EACA,kBAAA;EACA,4DAAA;EACA,mBAAA;EACA,YAAA;EACA,kBAAA;EACA,sBAAA;AACA;AACA;EACA,aAAA;AACA;AACA;EACA,kBAAA;EACA,WAAA;AACA;AACA;EACA,kBAAA;EACA,WAAA;EACA,YAAA;EACA,mBAAA;EACA,gBAAA;EACA,UAAA;AACA;AACA;EACA,WAAA;EACA,YAAA;EACA,mBAAA;EACA,qBAAA;AACA;AACA;EACA,OAAA;AACA;AACA;EACA,aAAA;EACA,iBAAA;AACA;AACA;EACA,aAAA;EACA,iBAAA;EACA,OAAA;AACA;AACA;EACA,iBAAA;EACA,WAAA;AACA;AACA;EACA,WAAA;EACA,iBAAA;EACA,kBAAA;AACA;AACA;EACA,kBAAA;EACA,gBAAA;EACA,eAAA;EACA,kBAAA;EACA,UAAA;AACA;AACA;EACA,kBAAA;EACA,WAAA;EACA,YAAA;EACA,gBAAA;EACA,kBAAA;EACA,SAAA;EACA,UAAA;AACA;AACA;EACA,kBAAA;EACA,YAAA;EACA,kBAAA;AACA;AACA;EACA,kBAAA;EACA,YAAA;AACA;AACA;EACA,kBAAA;AACA;AACA;EACA,kBAAA;AACA;AACA;EACA,WAAA;EACA,YAAA;EACA,kBAAA;EACA,gCAAA;EACA,oCAAA;EACA,2CAAA;AACA;AACA;EACA,uBAAA;EACA,sBAAA;AACA;AACA;EACA,WAAA;EACA,mBAAA;EACA,kBAAA;EACA,0BAAA;EACA,gBAAA;AACA;AACA;EACA,WAAA;EACA,YAAA;AACA;AAEA;EACA,eAAA;EACA,WAAA;EACA,WAAA;EACA,kBAAA;EACA,YAAA;EACA,mCAAA;EACA,YAAA;EACA,kBAAA;AACA;AACA;EACA,yBAAA;EACA,eAAA;EACA,iBAAA;EACA,cAAA;EACA,kBAAA;EACA,cAAA;EACA,gBAAA;AACA;AAEA;EACA,WAAA;EACA,YAAA;AACA;AACA;EACA,WAAA;AACA;AACA;EACA,eAAA;EACA,kBAAA;AACA",
          "file": "Chrome.vue",
          "sourcesContent": ["<template>\n  <div role=\"application\" aria-label=\"Chrome color picker\" :class=\"['vc-chrome', disableAlpha ? 'vc-chrome__disable-alpha' : '']\">\n    <div class=\"vc-chrome-saturation-wrap\">\n      <saturation v-model=\"colors\" @change=\"childChange\"></saturation>\n    </div>\n    <div class=\"vc-chrome-body\">\n      <div class=\"vc-chrome-controls\">\n        <div class=\"vc-chrome-color-wrap\">\n          <div :aria-label=\"`current color is ${colors.hex}`\" class=\"vc-chrome-active-color\" :style=\"{background: activeColor}\"></div>\n          <checkboard v-if=\"!disableAlpha\"></checkboard>\n        </div>\n\n        <div class=\"vc-chrome-sliders\">\n          <div class=\"vc-chrome-hue-wrap\">\n            <hue v-model=\"colors\" @change=\"childChange\"></hue>\n          </div>\n          <div class=\"vc-chrome-alpha-wrap\" v-if=\"!disableAlpha\">\n            <alpha v-model=\"colors\" @change=\"childChange\"></alpha>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"vc-chrome-fields-wrap\" v-if=\"!disableFields\">\n        <div class=\"vc-chrome-fields\" v-show=\"fieldsIndex === 0\">\n          <!-- hex -->\n          <div class=\"vc-chrome-field\">\n            <ed-in v-if=\"!hasAlpha\" label=\"hex\" :value=\"colors.hex\" @change=\"inputChange\"></ed-in>\n            <ed-in v-if=\"hasAlpha\" label=\"hex\" :value=\"colors.hex8\" @change=\"inputChange\"></ed-in>\n          </div>\n        </div>\n        <div class=\"vc-chrome-fields\" v-show=\"fieldsIndex === 1\">\n          <!-- rgba -->\n          <div class=\"vc-chrome-field\">\n            <ed-in label=\"r\" :value=\"colors.rgba.r\" @change=\"inputChange\"></ed-in>\n          </div>\n          <div class=\"vc-chrome-field\">\n            <ed-in label=\"g\" :value=\"colors.rgba.g\" @change=\"inputChange\"></ed-in>\n          </div>\n          <div class=\"vc-chrome-field\">\n            <ed-in label=\"b\" :value=\"colors.rgba.b\" @change=\"inputChange\"></ed-in>\n          </div>\n          <div class=\"vc-chrome-field\" v-if=\"!disableAlpha\">\n            <ed-in label=\"a\" :value=\"colors.a\" :arrow-offset=\"0.01\" :max=\"1\" @change=\"inputChange\"></ed-in>\n          </div>\n        </div>\n        <div class=\"vc-chrome-fields\" v-show=\"fieldsIndex === 2\">\n          <!-- hsla -->\n          <div class=\"vc-chrome-field\">\n            <ed-in label=\"h\" :value=\"hsl.h\" @change=\"inputChange\"></ed-in>\n          </div>\n          <div class=\"vc-chrome-field\">\n            <ed-in label=\"s\" :value=\"hsl.s\" @change=\"inputChange\"></ed-in>\n          </div>\n          <div class=\"vc-chrome-field\">\n            <ed-in label=\"l\" :value=\"hsl.l\" @change=\"inputChange\"></ed-in>\n          </div>\n          <div class=\"vc-chrome-field\" v-if=\"!disableAlpha\">\n            <ed-in label=\"a\" :value=\"colors.a\" :arrow-offset=\"0.01\" :max=\"1\" @change=\"inputChange\"></ed-in>\n          </div>\n        </div>\n        <!-- btn -->\n        <div class=\"vc-chrome-toggle-btn\" role=\"button\" aria-label=\"Change another color definition\" @click=\"toggleViews\">\n          <div class=\"vc-chrome-toggle-icon\">\n            <svg style=\"width:24px; height:24px\" viewBox=\"0 0 24 24\"\n              @mouseover=\"showHighlight\"\n              @mouseenter=\"showHighlight\"\n              @mouseout=\"hideHighlight\">\n              <path fill=\"#333\" d=\"M12,18.17L8.83,15L7.42,16.41L12,21L16.59,16.41L15.17,15M12,5.83L15.17,9L16.58,7.59L12,3L7.41,7.59L8.83,9L12,5.83Z\" />\n            </svg>\n          </div>\n          <div class=\"vc-chrome-toggle-icon-highlight\" v-show=\"highlight\"></div>\n        </div>\n        <!-- btn -->\n      </div>\n    </div>\n  </div>\n</template>\n\n<script>\nimport colorMixin from '../mixin/color'\nimport editableInput from './common/EditableInput.vue'\nimport saturation from './common/Saturation.vue'\nimport hue from './common/Hue.vue'\nimport alpha from './common/Alpha.vue'\nimport checkboard from './common/Checkboard.vue'\n\nexport default {\n  name: 'Chrome',\n  mixins: [colorMixin],\n  props: {\n    disableAlpha: {\n      type: Boolean,\n      default: false\n    },\n    disableFields: {\n      type: Boolean,\n      default: false\n    }\n  },\n  components: {\n    saturation,\n    hue,\n    alpha,\n    'ed-in': editableInput,\n    checkboard\n  },\n  data () {\n    return {\n      fieldsIndex: 0,\n      highlight: false\n    }\n  },\n  computed: {\n    hsl () {\n      const { h, s, l } = this.colors.hsl\n      return {\n        h: h.toFixed(),\n        s: `${(s * 100).toFixed()}%`,\n        l: `${(l * 100).toFixed()}%`\n      }\n    },\n    activeColor () {\n      const rgba = this.colors.rgba\n      return 'rgba(' + [rgba.r, rgba.g, rgba.b, rgba.a].join(',') + ')'\n    },\n    hasAlpha () {\n      return this.colors.a < 1\n    }\n  },\n  methods: {\n    childChange (data) {\n      this.colorChange(data)\n    },\n    inputChange (data) {\n      if (!data) {\n        return\n      }\n      if (data.hex) {\n        this.isValidHex(data.hex) && this.colorChange({\n          hex: data.hex,\n          source: 'hex'\n        })\n      } else if (data.r || data.g || data.b || data.a) {\n        this.colorChange({\n          r: data.r || this.colors.rgba.r,\n          g: data.g || this.colors.rgba.g,\n          b: data.b || this.colors.rgba.b,\n          a: data.a || this.colors.rgba.a,\n          source: 'rgba'\n        })\n      } else if (data.h || data.s || data.l) {\n        const s = data.s ? (data.s.replace('%', '') / 100) : this.colors.hsl.s\n        const l = data.l ? (data.l.replace('%', '') / 100) : this.colors.hsl.l\n\n        this.colorChange({\n          h: data.h || this.colors.hsl.h,\n          s,\n          l,\n          source: 'hsl'\n        })\n      }\n    },\n    toggleViews () {\n      if (this.fieldsIndex >= 2) {\n        this.fieldsIndex = 0\n        return\n      }\n      this.fieldsIndex ++\n    },\n    showHighlight () {\n      this.highlight = true\n    },\n    hideHighlight () {\n      this.highlight = false\n    }\n  }\n}\n</script>\n\n<style>\n.vc-chrome {\n  background: #fff;\n  border-radius: 2px;\n  box-shadow: 0 0 2px rgba(0,0,0,.3), 0 4px 8px rgba(0,0,0,.3);\n  box-sizing: initial;\n  width: 225px;\n  font-family: Menlo;\n  background-color: #fff;\n}\n.vc-chrome-controls {\n  display: flex;\n}\n.vc-chrome-color-wrap {\n  position: relative;\n  width: 36px;\n}\n.vc-chrome-active-color {\n  position: relative;\n  width: 30px;\n  height: 30px;\n  border-radius: 15px;\n  overflow: hidden;\n  z-index: 1;\n}\n.vc-chrome-color-wrap .vc-checkerboard {\n  width: 30px;\n  height: 30px;\n  border-radius: 15px;\n  background-size: auto;\n}\n.vc-chrome-sliders {\n  flex: 1;\n}\n.vc-chrome-fields-wrap {\n  display: flex;\n  padding-top: 16px;\n}\n.vc-chrome-fields {\n  display: flex;\n  margin-left: -6px;\n  flex: 1;\n}\n.vc-chrome-field {\n  padding-left: 6px;\n  width: 100%;\n}\n.vc-chrome-toggle-btn {\n  width: 32px;\n  text-align: right;\n  position: relative;\n}\n.vc-chrome-toggle-icon {\n  margin-right: -4px;\n  margin-top: 12px;\n  cursor: pointer;\n  position: relative;\n  z-index: 2;\n}\n.vc-chrome-toggle-icon-highlight {\n  position: absolute;\n  width: 24px;\n  height: 28px;\n  background: #eee;\n  border-radius: 4px;\n  top: 10px;\n  left: 12px;\n}\n.vc-chrome-hue-wrap {\n  position: relative;\n  height: 10px;\n  margin-bottom: 8px;\n}\n.vc-chrome-alpha-wrap {\n  position: relative;\n  height: 10px;\n}\n.vc-chrome-hue-wrap .vc-hue {\n  border-radius: 2px;\n}\n.vc-chrome-alpha-wrap .vc-alpha-gradient {\n  border-radius: 2px;\n}\n.vc-chrome-hue-wrap .vc-hue-picker, .vc-chrome-alpha-wrap .vc-alpha-picker {\n  width: 12px;\n  height: 12px;\n  border-radius: 6px;\n  transform: translate(-6px, -2px);\n  background-color: rgb(248, 248, 248);\n  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.37);\n}\n.vc-chrome-body {\n  padding: 16px 16px 12px;\n  background-color: #fff;\n}\n.vc-chrome-saturation-wrap {\n  width: 100%;\n  padding-bottom: 55%;\n  position: relative;\n  border-radius: 2px 2px 0 0;\n  overflow: hidden;\n}\n.vc-chrome-saturation-wrap .vc-saturation-circle {\n  width: 12px;\n  height: 12px;\n}\n\n.vc-chrome-fields .vc-input__input {\n  font-size: 11px;\n  color: #333;\n  width: 100%;\n  border-radius: 2px;\n  border: none;\n  box-shadow: inset 0 0 0 1px #dadada;\n  height: 21px;\n  text-align: center;\n}\n.vc-chrome-fields .vc-input__label {\n  text-transform: uppercase;\n  font-size: 11px;\n  line-height: 11px;\n  color: #969696;\n  text-align: center;\n  display: block;\n  margin-top: 12px;\n}\n\n.vc-chrome__disable-alpha .vc-chrome-active-color {\n  width: 18px;\n  height: 18px;\n}\n.vc-chrome__disable-alpha .vc-chrome-color-wrap {\n  width: 30px;\n}\n.vc-chrome__disable-alpha .vc-chrome-hue-wrap {\n  margin-top: 4px;\n  margin-bottom: 4px;\n}\n</style>\n"]
        },
        media: undefined
      });
    };
    /* scoped */


    const __vue_scope_id__$7 = undefined;
    /* module identifier */

    const __vue_module_identifier__$7 = undefined;
    /* functional template */

    const __vue_is_functional_template__$7 = false;
    /* style inject SSR */

    /* style inject shadow dom */

    const __vue_component__$7 = normalizeComponent({
      render: __vue_render__$7,
      staticRenderFns: __vue_staticRenderFns__$7
    }, __vue_inject_styles__$7, __vue_script__$7, __vue_scope_id__$7, __vue_is_functional_template__$7, __vue_module_identifier__$7, false, createInjector, undefined, undefined);

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
    function debounce$1(fn, delay) {
      var timeoutID = null;
      return function () {
        clearTimeout(timeoutID);
        var args = arguments;
        var that = this;
        timeoutID = setTimeout(function () {
          fn.apply(that, args);
        }, delay);
      };
    }
    /**
     * https://stackoverflow.com/questions/22783108/convert-js-object-to-form-data
     */

    function convertToFormData(data, formData, parentKey) {
      if (data === null || data === undefined) return null;
      formData = formData || new FormData();

      if (typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
        Object.keys(data).forEach(function (key) {
          return convertToFormData(data[key], formData, !parentKey ? key : data[key] instanceof File ? parentKey : parentKey + "[" + key + "]");
        });
      } else {
        formData.append(parentKey, data);
      }

      return formData;
    }

    var debounce$2 = {
      bind: directive,
      update: function update(el, binding) {
        if (binding.value !== binding.oldValue) {
          directive(el, binding);
        }
      }
    };

    function directive(el, binding) {
      el.oninput = debounce$1(function (e) {
        el.dispatchEvent(new Event('change'));
      }, parseInt(binding.value) || 500);
    }

    //
    var script$8 = {
      mixins: [i18n],
      directives: {
        debounce: debounce$2
      },
      components: {
        ChromePicker: __vue_component__$7
      },
      props: ['color'],
      data: function data() {
        return {
          colors: {
            hex: '#ffffff'
          },
          colorValue: '',
          open: false
        };
      },
      mounted: function mounted() {
        this.setColor(this.color);
      },
      methods: {
        setColor: function setColor(color) {
          this.updateColors(color);
          this.colorValue = color;
        },
        updateColors: function updateColors(color) {
          this.colors = tinycolor(color);
        },
        updateFromInput: function updateFromInput() {
          this.updateColors(this.colorValue);
        },
        updateFromPicker: function updateFromPicker(color) {
          this.colors = color;
        },
        hide: function hide() {
          this.open = false;
          this.updateColors(this.colorValue);
        },
        show: function show() {
          var _this = this;

          this.open = true;
          this.$nextTick(function () {
            _this.dropdown = uikit.dropdown(_this.$refs.dropdown, {
              flip: "x",
              mode: "click",
              toggle: false,
              animation: false,
              boundaryAlign: true,
              pos: 'bottom-justify',
              boundary: uikitUtil.closest(_this.$el, '.settings-field') || _this.$el
            });

            if (_this.colors._format === 'hsl') {
              _this.$refs.picker.toggleViews();

              _this.$refs.picker.toggleViews();
            } else if (_this.colors._format === 'rgb') {
              _this.$refs.picker.toggleViews();
            }

            _this.dropdown.show();
          });
        },
        cancel: function cancel() {
          this.dropdown.hide(false);
        },
        choose: function choose() {
          this.colorValue = function (color, index) {
            return 0 === index ? color._a < 1 ? color.toRgbString() : color.toHexString().toUpperCase() : 1 === index ? color.toRgbString() : color.toHslString();
          }(tinycolor(this.colors.hsv), this.$refs.picker.fieldsIndex);

          this.dropdown.hide(false);
        }
      },
      watch: {
        colorValue: function colorValue(val, oldVal) {
          if (val !== oldVal) {
            this.updateColors(val);
            this.$emit('input', val);
          }
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

      return _c("div", {
        staticClass: "uk-flex uk-flex-middle"
      }, [_c("div", {
        staticClass: "uk-width-expand"
      }, [_c("input", {
        directives: [{
          name: "debounce",
          rawName: "v-debounce"
        }, {
          name: "model",
          rawName: "v-model.lazy",
          value: _vm.colorValue,
          expression: "colorValue",
          modifiers: {
            lazy: true
          }
        }],
        staticClass: "uk-input",
        attrs: {
          type: "text"
        },
        domProps: {
          value: _vm.colorValue
        },
        on: {
          input: _vm.updateFromInput,
          change: function change($event) {
            _vm.colorValue = $event.target.value;
          }
        }
      })]), _vm._v(" "), _c("div", {
        staticClass: "uk-width-auto"
      }, [_c("a", {
        staticClass: "settings-colorpicker",
        on: {
          click: function click($event) {
            $event.preventDefault();
            !_vm.open && _vm.show();
          }
        }
      }, [_c("div", {
        "class": ["settings-colorpicker-color", {
          "settings-colorpicker-color-none": !_vm.colorValue
        }],
        style: _vm.colorValue && {
          background: _vm.colorValue
        }
      })]), _vm._v(" "), _vm.open ? _c("div", {
        ref: "dropdown",
        staticClass: "settings-colorpicker-dropdown",
        on: {
          show: function show($event) {
            _vm.open = true;
          },
          hidden: _vm.hide
        }
      }, [_c("ChromePicker", {
        ref: "picker",
        attrs: {
          value: _vm.colors
        },
        on: {
          input: _vm.updateFromPicker
        }
      }), _vm._v(" "), _c("p", {
        staticClass: "uk-margin-remove-bottom uk-text-right"
      }, [_c("button", {
        staticClass: "uk-button uk-button-default uk-button-small",
        attrs: {
          type: "button"
        },
        on: {
          click: _vm.cancel
        }
      }, [_vm._v(_vm._s(_vm.$t("Cancel")))]), _vm._v(" "), _c("button", {
        staticClass: "uk-button uk-button-primary uk-button-small",
        attrs: {
          type: "button"
        },
        on: {
          click: _vm.choose
        }
      }, [_vm._v(_vm._s(_vm.$t("Apply")))])])], 1) : _vm._e()])]);
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
    var script$9 = {
      components: {
        ColorPicker: __vue_component__$8
      },
      "extends": Vue$1.component('field')
    };

    /* script */
    var __vue_script__$9 = script$9;
    /* template */

    var __vue_render__$9 = function __vue_render__() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c("ColorPicker", _vm._b({
        attrs: {
          color: _vm.value
        },
        model: {
          value: _vm.value,
          callback: function callback($$v) {
            _vm.value = $$v;
          },
          expression: "value"
        }
      }, "ColorPicker", _vm.attributes, false));
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
      directives: {
        debounce: debounce$2
      },
      "extends": Vue$1.component('field')
    };

    /* script */
    var __vue_script__$a = script$a;
    /* template */

    var __vue_render__$a = function __vue_render__() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c("textarea", _vm._b({
        directives: [{
          name: "debounce",
          rawName: "v-debounce"
        }, {
          name: "model",
          rawName: "v-model.lazy",
          value: _vm.value,
          expression: "value",
          modifiers: {
            lazy: true
          }
        }],
        ref: "code",
        staticClass: "uk-textarea",
        domProps: {
          value: _vm.value
        },
        on: {
          change: function change($event) {
            _vm.value = $event.target.value;
          }
        }
      }, "textarea", _vm.attributes, false));
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
      methods: vuex.mapActions('settings', ['openPanel']),
      mixins: [i18n],
      "extends": Vue$1.component('field')
    };

    /* script */
    var __vue_script__$b = script$b;
    /* template */

    var __vue_render__$b = function __vue_render__() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c("h2", {
        staticClass: "customizer-field-menu-title settings-field-menu-title",
        attrs: {
          tabindex: "0"
        },
        on: {
          click: function click($event) {
            $event.preventDefault();
            return _vm.openPanel(_vm.field.panel);
          }
        }
      }, [_vm._v("\n    " + _vm._s(_vm.field.label) + "\n    "), _vm.field.tooltip ? _c("span", {
        staticClass: "customizer-field-tooltip settings-field-tooltip",
        attrs: {
          title: _vm.field.tooltip,
          "data-uk-tooltip": "delay: 500"
        }
      }, [_vm._v("?")]) : _vm._e(), _vm._v(" "), _vm.field.info ? _c("a", {
        staticClass: "customizer-field-info settings-field-info",
        attrs: {
          href: _vm.field.info,
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
      })]);
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

    var api = {
      get: function get(_ref) {
        var route = _ref.route,
            draft = _ref.draft,
            config = _ref.config;
        var data = new FormData();
        data.append('id', draft.id);
        data.append('app', config.app);
        return uikitUtil.ajax(route.ajax + "settings/get/", {
          data: data,
          method: 'POST',
          responseType: 'json'
        });
      },
      set: function set(_ref2) {
        var route = _ref2.route,
            draft = _ref2.draft,
            values = _ref2.values;
        var data = new FormData();
        data.append('id', draft.id);
        convertToFormData(values, data);
        return uikitUtil.ajax(route.ajax + "settings/set/", {
          data: data,
          method: 'POST',
          responseType: 'json'
        });
      },
      uploadImage: function uploadImage(_ref3) {
        var route = _ref3.route,
            _ref3$data = _ref3.data,
            data = _ref3$data === void 0 ? null : _ref3$data;
        return uikitUtil.ajax(route.ajax + "settings/uploadimage/", {
          data: data,
          method: 'POST',
          responseType: 'json'
        });
      }
    };

    //
    var script$c = {
      methods: {
        upload: function upload(event) {
          var _this = this;

          var route = this.$store.getters.route;
          var ext = event.target.files[0].name.split('.').pop();
          var data = new FormData();
          data.append('name', (this.filename || '').replace('*', ext));
          data.append('file', event.target.files[0]);
          data.append('path', this.THEME_PATH);
          api.uploadImage({
            route: route,
            data: data
          }).then(function (_ref) {
            var response = _ref.response;

            if (response.status === 'ok') {
              _this.value = response.data.value;
            } else if (response.status === 'fail') {
              (uikitUtil.isArray(response.errors) ? response.errors : [response.errors]).forEach(function (error) {
                uikit.notification({
                  message: error,
                  status: 'danger',
                  pos: 'bottom-right',
                  timeout: 5000
                });
              });
              _this.value = '';
            }
          }, function (error) {
            uikit.notification({
              message: error,
              status: 'danger',
              pos: 'bottom-right',
              timeout: 5000
            });
            _this.value = '';
          });
        }
      },
      mixins: [i18n],
      "extends": Vue$1.component('field')
    };

    /* script */
    var __vue_script__$c = script$c;
    /* template */

    var __vue_render__$c = function __vue_render__() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c("div", {
        staticClass: "uk-cover-container"
      }, [_c("input", {
        ref: "file",
        staticClass: "uk-position-absolute uk-invisible",
        attrs: {
          type: "file",
          accept: "image/jpg,image/jpeg,image/png,image/gif"
        },
        on: {
          change: _vm.upload
        }
      }), _vm._v(" "), !_vm.value ? _c("div", {
        staticClass: "uk-link uk-text-muted uk-placeholder uk-text-center uk-margin-remove",
        on: {
          click: function click($event) {
            return _vm.$refs.file.click();
          }
        }
      }, [_c("span", {
        attrs: {
          "data-uk-icon": "icon: image"
        }
      }), _vm._v(" "), _c("p", {
        staticClass: "uk-h6 uk-margin-small-top uk-margin-remove-bottom"
      }, [_vm._v(_vm._s(_vm.$t("Select Image")))])]) : _c("div", {
        staticClass: "uk-transition-toggle uk-text-center customizer-thumbnail settings-thumbnail"
      }, [_c("img", {
        attrs: {
          src: _vm.THEME_URL + _vm.value
        }
      }), _vm._v(" "), _vm._m(0), _vm._v(" "), _c("a", {
        staticClass: "uk-position-cover",
        on: {
          click: function click($event) {
            $event.preventDefault();
            return _vm.$refs.file.click();
          }
        }
      }), _vm._v(" "), _c("div", {
        staticClass: "uk-transition-fade uk-position-top-right uk-light customizer-thumbnail-badge settings-thumbnail-badge"
      }, [_c("a", {
        staticClass: "uk-icon-link",
        attrs: {
          "data-uk-icon": "trash",
          title: _vm.$t("Delete")
        },
        on: {
          click: function click($event) {
            $event.preventDefault();
            _vm.value = "";
          }
        }
      })])])]);
    };

    var __vue_staticRenderFns__$c = [function () {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c("div", {
        staticClass: "uk-position-cover uk-transition-fade uk-text-muted customizer-thumbnail-overlay settings-thumbnail-overlay"
      }, [_c("span", {
        staticClass: "uk-position-center",
        attrs: {
          "data-uk-icon": "icon: plus; ratio: 2"
        }
      })]);
    }];
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
    var script$d = {
      props: {
        title: {
          type: String,
          "default": function _default() {
            return this.$t('Select Image');
          }
        },
        url: {
          type: String,
          "default": function _default() {
            return '';
          }
        },
        images: {
          type: Object
        },
        value: {
          type: String
        }
      },
      methods: {
        select: function select(value) {
          this.$emit('input', value);
          this.$emit('resolve', value);
        }
      },
      mixins: [i18n]
    };

    /* script */
    var __vue_script__$d = script$d;
    /* template */

    var __vue_render__$d = function __vue_render__() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c("div", [_c("button", {
        staticClass: "uk-modal-close-default",
        attrs: {
          type: "button",
          "data-uk-close": ""
        }
      }), _vm._v(" "), _c("div", {
        staticClass: "uk-modal-header"
      }, [_c("h2", {
        staticClass: "uk-modal-title"
      }, [_vm._v(_vm._s(_vm.title))])]), _vm._v(" "), _c("div", {
        staticClass: "uk-modal-body"
      }, [_c("ul", {
        staticClass: "customizer-field-image-select settings-field-image-select uk-grid uk-grid-small",
        attrs: {
          "data-uk-grid": ""
        }
      }, _vm._l(_vm.images, function (img) {
        return _c("li", [_c("label", {
          staticClass: "uk-inline",
          "class": {
            "uk-active": _vm.value === img.value
          },
          on: {
            click: function click($event) {
              return _vm.select(img.value);
            }
          }
        }, [_c("img", {
          attrs: {
            src: _vm.url + img.value
          }
        })])]);
      }), 0)])]);
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

    //
    var script$e = {
      methods: {
        select: function select() {
          var _this = this;

          this.$modal(__vue_component__$d, {
            images: this.filterOptions(this.options),
            title: this.title || this.$t('Select') + ' ' + this.label.toLowerCase(),
            url: this.THEME_URL,
            value: this.value
          }).show({
            width: '2-3@l'
          }).then(function (value) {
            !uikitUtil.isUndefined(value) && (_this.value = value);
          });
        }
      },
      mixins: [i18n],
      "extends": Field
    };

    /* script */
    var __vue_script__$e = script$e;
    /* template */

    var __vue_render__$e = function __vue_render__() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c("div", {
        staticClass: "uk-position-relative uk-transition-toggle uk-text-center uk-text-muted"
      }, [_c("img", {
        attrs: {
          src: _vm.THEME_URL + _vm.value
        }
      }), _vm._v(" "), _vm._m(0), _vm._v(" "), _c("a", {
        staticClass: "uk-position-cover",
        on: {
          click: function click($event) {
            $event.preventDefault();
            return _vm.select($event);
          }
        }
      })]);
    };

    var __vue_staticRenderFns__$e = [function () {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c("div", {
        staticClass: "uk-position-cover uk-transition-fade customizer-thumbnail-overlay"
      }, [_c("span", {
        staticClass: "uk-position-center",
        attrs: {
          "data-uk-icon": "icon: plus; ratio: 2"
        }
      })]);
    }];
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

    //
    var script$f = {
      "extends": Vue$1.component('field'),
      mixins: [i18n],
      computed: {
        value: {
          get: function get$1() {
            return get(this.values, this.name);
          },
          set: function set$1(value) {
            var _this = this;

            this.$store.commit('settings/setState', {
              name: 'tracking',
              value: false
            });

            set(this.values, this.name, value);

            setTimeout(function () {
              return _this.$store.commit('settings/setState', {
                name: 'tracking',
                value: true
              });
            }, 0);
          }
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

      return _c("label", [_c("input", {
        directives: [{
          name: "model",
          rawName: "v-model",
          value: _vm.value,
          expression: "value"
        }],
        staticClass: "uk-checkbox",
        attrs: {
          "true-value": "true",
          "false-value": "false",
          type: "checkbox"
        },
        domProps: {
          checked: Array.isArray(_vm.value) ? _vm._i(_vm.value, null) > -1 : _vm._q(_vm.value, "true")
        },
        on: {
          change: function change($event) {
            var $$a = _vm.value,
                $$el = $event.target,
                $$c = $$el.checked ? "true" : "false";

            if (Array.isArray($$a)) {
              var $$v = null,
                  $$i = _vm._i($$a, $$v);

              if ($$el.checked) {
                $$i < 0 && (_vm.value = $$a.concat([$$v]));
              } else {
                $$i > -1 && (_vm.value = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
              }
            } else {
              _vm.value = $$c;
            }
          }
        }
      }), _vm._v("\n    " + _vm._s(_vm.$t("Show hidden settings")) + "\n")]);
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

    //
    var script$g = {
      methods: vuex.mapActions('settings', ['openPanel']),
      mixins: [i18n],
      "extends": Vue$1.component('field')
    };

    /* script */
    var __vue_script__$g = script$g;
    /* template */

    var __vue_render__$g = function __vue_render__() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c("ul", {
        staticClass: "uk-nav uk-nav-default customizer-field-menu settings-field-menu"
      }, _vm._l(_vm.items, function (item, index) {
        return _c("li", [_c("h2", {
          staticClass: "customizer-field-menu-title settings-field-menu-title",
          attrs: {
            tabindex: "0"
          },
          on: {
            click: function click($event) {
              $event.preventDefault();
              return _vm.openPanel(index);
            }
          }
        }, [_vm._v("\n            " + _vm._s(item.label) + "\n            "), item.tooltip ? _c("span", {
          staticClass: "customizer-field-tooltip settings-field-tooltip",
          attrs: {
            title: item.tooltip,
            "data-uk-tooltip": "delay: 500"
          }
        }, [_vm._v("?")]) : _vm._e(), _vm._v(" "), item.info ? _c("a", {
          staticClass: "customizer-field-info settings-field-info",
          attrs: {
            href: item.info,
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
      }), 0);
    };

    var __vue_staticRenderFns__$g = [];
    __vue_render__$g._withStripped = true;
    /* style */

    var __vue_inject_styles__$g = undefined;
    /* scoped */

    var __vue_scope_id__$g = undefined;
    /* module identifier */

    var __vue_module_identifier__$g = undefined;
    /* functional template */

    var __vue_is_functional_template__$g = false;
    /* style inject */

    /* style inject SSR */

    /* style inject shadow dom */

    var __vue_component__$g = normalizeComponent({
      render: __vue_render__$g,
      staticRenderFns: __vue_staticRenderFns__$g
    }, __vue_inject_styles__$g, __vue_script__$g, __vue_scope_id__$g, __vue_is_functional_template__$g, __vue_module_identifier__$g, false, undefined, undefined, undefined);

    //
    var script$h = {
      "extends": Vue$1.component('field')
    };

    /* script */
    var __vue_script__$h = script$h;
    /* template */

    var __vue_render__$h = function __vue_render__() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c("div");
    };

    var __vue_staticRenderFns__$h = [];
    __vue_render__$h._withStripped = true;
    /* style */

    var __vue_inject_styles__$h = undefined;
    /* scoped */

    var __vue_scope_id__$h = undefined;
    /* module identifier */

    var __vue_module_identifier__$h = undefined;
    /* functional template */

    var __vue_is_functional_template__$h = false;
    /* style inject */

    /* style inject SSR */

    /* style inject shadow dom */

    var __vue_component__$h = normalizeComponent({
      render: __vue_render__$h,
      staticRenderFns: __vue_staticRenderFns__$h
    }, __vue_inject_styles__$h, __vue_script__$h, __vue_scope_id__$h, __vue_is_functional_template__$h, __vue_module_identifier__$h, false, undefined, undefined, undefined);

    //
    var base = ['top', 'right', 'bottom', 'left'];
    var specific = ['top-left', 'top-center', 'top-right', 'center-left', 'center', 'center-center', 'center-right', 'bottom-left', 'bottom-center', 'bottom-right'];
    var script$i = {
      computed: {
        tabs: function tabs() {
          var tabs = []; // is used

          var used = [];
          uikitUtil.each(this.options, function (value, key) {
            used.push(key);
          }); // base

          var items = base.map(function (pos) {
            return used.includes(pos) ? pos : '';
          }).filter(String);
          items.length && tabs.push({
            title: this.$t('Base'),
            items: items,
            active: base.includes(this.value)
          }); // specific

          items = specific.map(function (pos) {
            return used.includes(pos) ? pos : '';
          }).filter(String);
          items.length && tabs.push({
            title: this.$t('Specific'),
            items: items,
            active: specific.includes(this.value)
          }); // cover

          used.includes('cover') && tabs.push({
            title: this.$t('Cover'),
            items: ['cover'],
            active: this.value === 'cover'
          });
          return tabs;
        }
      },
      methods: {
        getVariant: function getVariant(id) {
          return Array.from({
            length: id + 1
          }, function () {
            return 'I';
          }).join('');
        },
        getPositionClass: function getPositionClass(pos) {
          return 'uk-position-' + (pos === 'center-center' ? 'center' : pos);
        }
      },
      mixins: [i18n],
      "extends": Vue$1.component('field')
    };

    /* script */
    var __vue_script__$i = script$i;
    /* template */

    var __vue_render__$i = function __vue_render__() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c("div", {
        staticClass: "uk-inline uk-text-center"
      }, [_vm.tabs.length > 1 ? [_c("ul", {
        staticClass: "uk-flex-center",
        attrs: {
          "data-uk-tab": ""
        }
      }, _vm._l(_vm.tabs, function (tab, tabIndex) {
        return _c("li", {
          key: tabIndex,
          "class": {
            "uk-active": tab.active
          }
        }, [_c("a", [_vm._v(_vm._s(_vm.getVariant(tabIndex)))])]);
      }), 0), _vm._v(" "), _c("ul", {
        staticClass: "uk-switcher uk-margin"
      }, _vm._l(_vm.tabs, function (tab, tabIndex) {
        return _c("li", {
          key: tabIndex
        }, [_c("div", {
          staticClass: "uk-inline customizer-field-position-box settings-field-position-box"
        }, [_c("div", {
          staticClass: "uk-inline customizer-field-position-square settings-field-position-square"
        }, _vm._l(tab.items, function (item, itemIndex) {
          return _c("label", {
            key: itemIndex,
            staticClass: "uk-overlay-default uk-flex uk-flex-center uk-flex-middle uk-padding-small",
            "class": [_vm.getPositionClass(item)]
          }, [_c("input", _vm._b({
            directives: [{
              name: "model",
              rawName: "v-model",
              value: _vm.value,
              expression: "value"
            }],
            staticClass: "uk-radio uk-margin-remove",
            attrs: {
              type: "radio"
            },
            domProps: {
              value: item,
              checked: _vm._q(_vm.value, item)
            },
            on: {
              change: function change($event) {
                _vm.value = item;
              }
            }
          }, "input", _vm.attributes, false))]);
        }), 0)])]);
      }), 0)] : _vm._l(_vm.tabs, function (tab, tabIndex) {
        return _c("div", {
          key: tabIndex,
          staticClass: "uk-inline customizer-field-position-box settings-field-position-box"
        }, [_c("div", {
          staticClass: "uk-inline customizer-field-position-square settings-field-position-square"
        }, _vm._l(tab.items, function (item, itemIndex) {
          return _c("label", {
            key: itemIndex,
            staticClass: "uk-overlay-default uk-flex uk-flex-center uk-flex-middle uk-padding-small",
            "class": [_vm.getPositionClass(item)]
          }, [_c("input", _vm._b({
            directives: [{
              name: "model",
              rawName: "v-model",
              value: _vm.value,
              expression: "value"
            }],
            staticClass: "uk-radio uk-margin-remove",
            attrs: {
              type: "radio"
            },
            domProps: {
              value: item,
              checked: _vm._q(_vm.value, item)
            },
            on: {
              change: function change($event) {
                _vm.value = item;
              }
            }
          }, "input", _vm.attributes, false))]);
        }), 0)]);
      })], 2);
    };

    var __vue_staticRenderFns__$i = [];
    __vue_render__$i._withStripped = true;
    /* style */

    var __vue_inject_styles__$i = undefined;
    /* scoped */

    var __vue_scope_id__$i = undefined;
    /* module identifier */

    var __vue_module_identifier__$i = undefined;
    /* functional template */

    var __vue_is_functional_template__$i = false;
    /* style inject */

    /* style inject SSR */

    /* style inject shadow dom */

    var __vue_component__$i = normalizeComponent({
      render: __vue_render__$i,
      staticRenderFns: __vue_staticRenderFns__$i
    }, __vue_inject_styles__$i, __vue_script__$i, __vue_scope_id__$i, __vue_is_functional_template__$i, __vue_module_identifier__$i, false, undefined, undefined, undefined);

    //
    var script$j = {
      "extends": Field
    };

    /* script */
    var __vue_script__$j = script$j;
    /* template */

    var __vue_render__$j = function __vue_render__() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c("div", _vm._l(_vm.filterOptions(_vm.options), function (option) {
        return _c("label", {
          staticClass: "uk-panel"
        }, [_c("input", _vm._b({
          directives: [{
            name: "model",
            rawName: "v-model",
            value: _vm.value,
            expression: "value"
          }],
          staticClass: "uk-radio",
          attrs: {
            type: "radio"
          },
          domProps: {
            value: option.value,
            checked: _vm._q(_vm.value, option.value)
          },
          on: {
            change: function change($event) {
              _vm.value = option.value;
            }
          }
        }, "input", _vm.attributes, false)), _vm._v(" " + _vm._s(option.text) + "\n        "), _c("p", {
          staticClass: "uk-text-small uk-text-muted"
        }, [_vm._v(_vm._s(option.description))])]);
      }), 0);
    };

    var __vue_staticRenderFns__$j = [];
    __vue_render__$j._withStripped = true;
    /* style */

    var __vue_inject_styles__$j = undefined;
    /* scoped */

    var __vue_scope_id__$j = undefined;
    /* module identifier */

    var __vue_module_identifier__$j = undefined;
    /* functional template */

    var __vue_is_functional_template__$j = false;
    /* style inject */

    /* style inject SSR */

    /* style inject shadow dom */

    var __vue_component__$j = normalizeComponent({
      render: __vue_render__$j,
      staticRenderFns: __vue_staticRenderFns__$j
    }, __vue_inject_styles__$j, __vue_script__$j, __vue_scope_id__$j, __vue_is_functional_template__$j, __vue_module_identifier__$j, false, undefined, undefined, undefined);

    //
    var script$k = {
      computed: {
        from: {
          get: function get() {
            return this.value.split(':')[0] || '';
          },
          set: function set(value) {
            this.value = value + ':' + this.$refs.to.value;
          }
        },
        to: {
          get: function get() {
            return this.value.split(':')[1] || '';
          },
          set: function set(value) {
            this.value = this.$refs.from.value + ':' + value;
          }
        }
      },
      mounted: function mounted() {
        Inputmask({
          regex: "\\d*"
        }).mask(this.$refs.from);
        Inputmask({
          regex: "\\d*"
        }).mask(this.$refs.to);
      },
      mixins: [i18n],
      "extends": Vue$1.component('field')
    };

    /* script */
    var __vue_script__$k = script$k;
    /* template */

    var __vue_render__$k = function __vue_render__() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c("div", [_c("div", {
        staticClass: "uk-grid uk-grid-small uk-flex-nowrap"
      }, [_c("div", [_c("div", {
        staticClass: "uk-grid uk-grid-small uk-flex-middle"
      }, [_c("div", [_c("label", [_vm._v(_vm._s(_vm.$t("from")))])]), _vm._v(" "), _c("div", [_c("input", _vm._b({
        directives: [{
          name: "model",
          rawName: "v-model.number",
          value: _vm.from,
          expression: "from",
          modifiers: {
            number: true
          }
        }],
        ref: "from",
        staticClass: "uk-input",
        attrs: {
          type: "text",
          placeholder: "0"
        },
        domProps: {
          value: _vm.from
        },
        on: {
          input: function input($event) {
            if ($event.target.composing) {
              return;
            }

            _vm.from = _vm._n($event.target.value);
          },
          blur: function blur($event) {
            return _vm.$forceUpdate();
          }
        }
      }, "input", _vm.attributes, false))])])]), _vm._v(" "), _c("div", [_c("div", {
        staticClass: "uk-grid uk-grid-small uk-flex-middle"
      }, [_c("div", [_c("label", [_vm._v(_vm._s(_vm.$t("to")))])]), _vm._v(" "), _c("div", [_c("input", _vm._b({
        directives: [{
          name: "model",
          rawName: "v-model.number",
          value: _vm.to,
          expression: "to",
          modifiers: {
            number: true
          }
        }],
        ref: "to",
        staticClass: "uk-input",
        attrs: {
          type: "text",
          placeholder: "∞"
        },
        domProps: {
          value: _vm.to
        },
        on: {
          input: function input($event) {
            if ($event.target.composing) {
              return;
            }

            _vm.to = _vm._n($event.target.value);
          },
          blur: function blur($event) {
            return _vm.$forceUpdate();
          }
        }
      }, "input", _vm.attributes, false))])])])])]);
    };

    var __vue_staticRenderFns__$k = [];
    __vue_render__$k._withStripped = true;
    /* style */

    var __vue_inject_styles__$k = undefined;
    /* scoped */

    var __vue_scope_id__$k = undefined;
    /* module identifier */

    var __vue_module_identifier__$k = undefined;
    /* functional template */

    var __vue_is_functional_template__$k = false;
    /* style inject */

    /* style inject SSR */

    /* style inject shadow dom */

    var __vue_component__$k = normalizeComponent({
      render: __vue_render__$k,
      staticRenderFns: __vue_staticRenderFns__$k
    }, __vue_inject_styles__$k, __vue_script__$k, __vue_scope_id__$k, __vue_is_functional_template__$k, __vue_module_identifier__$k, false, undefined, undefined, undefined);

    //
    var script$l = {
      "extends": Field
    };

    /* script */
    var __vue_script__$l = script$l;
    /* template */

    var __vue_render__$l = function __vue_render__() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c("select", _vm._b({
        directives: [{
          name: "model",
          rawName: "v-model",
          value: _vm.value,
          expression: "value"
        }],
        staticClass: "uk-select",
        on: {
          change: function change($event) {
            var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
              return o.selected;
            }).map(function (o) {
              var val = "_value" in o ? o._value : o.value;
              return val;
            });
            _vm.value = $event.target.multiple ? $$selectedVal : $$selectedVal[0];
          }
        }
      }, "select", _vm.attributes, false), [_vm._l(_vm.filterOptions(_vm.options), function (option) {
        return [option.label ? _c("optgroup", {
          attrs: {
            label: option.label
          }
        }, _vm._l(option.options, function (opt) {
          return _c("option", {
            domProps: {
              value: opt.value
            }
          }, [_vm._v("\n                " + _vm._s(opt.text) + "\n            ")]);
        }), 0) : _c("option", {
          domProps: {
            value: option.value
          }
        }, [_vm._v("\n            " + _vm._s(option.text) + "\n        ")])];
      })], 2);
    };

    var __vue_staticRenderFns__$l = [];
    __vue_render__$l._withStripped = true;
    /* style */

    var __vue_inject_styles__$l = undefined;
    /* scoped */

    var __vue_scope_id__$l = undefined;
    /* module identifier */

    var __vue_module_identifier__$l = undefined;
    /* functional template */

    var __vue_is_functional_template__$l = false;
    /* style inject */

    /* style inject SSR */

    /* style inject shadow dom */

    var __vue_component__$l = normalizeComponent({
      render: __vue_render__$l,
      staticRenderFns: __vue_staticRenderFns__$l
    }, __vue_inject_styles__$l, __vue_script__$l, __vue_scope_id__$l, __vue_is_functional_template__$l, __vue_module_identifier__$l, false, undefined, undefined, undefined);

    //
    var script$m = {
      computed: {
        width: {
          get: function get() {
            var v = this.value.split('x')[0];
            return v && v != '0' ? v : '';
          },
          set: function set(value) {
            this.value = (value ? value : '0') + 'x' + (this.$refs.height.value ? this.$refs.height.value : '0');
          }
        },
        height: {
          get: function get() {
            var v = this.value.split('x')[1];
            return v && v != '0' ? v : '';
          },
          set: function set(value) {
            this.value = (this.$refs.width.value ? this.$refs.width.value : '0') + 'x' + (value ? value : '0');
          }
        }
      },
      mounted: function mounted() {
        Inputmask({
          regex: "\\d*"
        }).mask(this.$refs.width);
        Inputmask({
          regex: "\\d*"
        }).mask(this.$refs.height);
      },
      mixins: [i18n],
      "extends": Vue$1.component('field')
    };

    /* script */
    var __vue_script__$m = script$m;
    /* template */

    var __vue_render__$m = function __vue_render__() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c("div", {
        staticClass: "uk-grid uk-grid-small uk-flex-nowrap"
      }, [_c("div", [_c("div", [_vm._v(_vm._s(_vm.$t("Width")))]), _vm._v(" "), _c("input", _vm._b({
        directives: [{
          name: "model",
          rawName: "v-model.number",
          value: _vm.width,
          expression: "width",
          modifiers: {
            number: true
          }
        }],
        ref: "width",
        staticClass: "uk-input",
        attrs: {
          type: "text",
          placeholder: "auto"
        },
        domProps: {
          value: _vm.width
        },
        on: {
          input: function input($event) {
            if ($event.target.composing) {
              return;
            }

            _vm.width = _vm._n($event.target.value);
          },
          blur: function blur($event) {
            return _vm.$forceUpdate();
          }
        }
      }, "input", _vm.attributes, false))]), _vm._v(" "), _c("div", [_c("div", [_vm._v(_vm._s(_vm.$t("Height")))]), _vm._v(" "), _c("input", _vm._b({
        directives: [{
          name: "model",
          rawName: "v-model.number",
          value: _vm.height,
          expression: "height",
          modifiers: {
            number: true
          }
        }],
        ref: "height",
        staticClass: "uk-input",
        attrs: {
          type: "text",
          placeholder: "auto"
        },
        domProps: {
          value: _vm.height
        },
        on: {
          input: function input($event) {
            if ($event.target.composing) {
              return;
            }

            _vm.height = _vm._n($event.target.value);
          },
          blur: function blur($event) {
            return _vm.$forceUpdate();
          }
        }
      }, "input", _vm.attributes, false))])]);
    };

    var __vue_staticRenderFns__$m = [];
    __vue_render__$m._withStripped = true;
    /* style */

    var __vue_inject_styles__$m = undefined;
    /* scoped */

    var __vue_scope_id__$m = undefined;
    /* module identifier */

    var __vue_module_identifier__$m = undefined;
    /* functional template */

    var __vue_is_functional_template__$m = false;
    /* style inject */

    /* style inject SSR */

    /* style inject shadow dom */

    var __vue_component__$m = normalizeComponent({
      render: __vue_render__$m,
      staticRenderFns: __vue_staticRenderFns__$m
    }, __vue_inject_styles__$m, __vue_script__$m, __vue_scope_id__$m, __vue_is_functional_template__$m, __vue_module_identifier__$m, false, undefined, undefined, undefined);

    //
    var script$n = {
      created: function created() {
        this.options = this.value.replace(/\s+/g, '').split(',');
      },
      methods: {
        moved: function moved() {
          var value = [];
          Array.prototype.slice.call(this.$refs.sort.children).forEach(function (element) {
            value.push(element.getAttribute('data-id'));
          });
          this.value = value.join(',');
        }
      },
      mixins: [i18n],
      "extends": Vue$1.component('field')
    };

    /* script */
    var __vue_script__$n = script$n;
    /* template */

    var __vue_render__$n = function __vue_render__() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c("div", {
        staticClass: "customizer-field-sort settings-field-sort"
      }, [_c("ul", {
        ref: "sort",
        staticClass: "uk-child-width-1-1",
        attrs: {
          "data-uk-sortable": ""
        },
        on: {
          moved: _vm.moved
        }
      }, _vm._l(_vm.options, function (option, index) {
        return _c("li", {
          key: index,
          attrs: {
            "data-id": option
          }
        }, [_c("div", {
          staticClass: "uk-sortable-handle"
        }, [_c("span", {
          staticClass: "customizer-field-sort-icon settings-field-sort-icon uk-position-center-left",
          attrs: {
            "data-uk-icon": "table"
          }
        }), _vm._v("\n                " + _vm._s(_vm.$t(option)) + "\n            ")])]);
      }), 0)]);
    };

    var __vue_staticRenderFns__$n = [];
    __vue_render__$n._withStripped = true;
    /* style */

    var __vue_inject_styles__$n = undefined;
    /* scoped */

    var __vue_scope_id__$n = undefined;
    /* module identifier */

    var __vue_module_identifier__$n = undefined;
    /* functional template */

    var __vue_is_functional_template__$n = false;
    /* style inject */

    /* style inject SSR */

    /* style inject shadow dom */

    var __vue_component__$n = normalizeComponent({
      render: __vue_render__$n,
      staticRenderFns: __vue_staticRenderFns__$n
    }, __vue_inject_styles__$n, __vue_script__$n, __vue_scope_id__$n, __vue_is_functional_template__$n, __vue_module_identifier__$n, false, undefined, undefined, undefined);

    //
    var script$o = {
      directives: {
        debounce: debounce$2
      },
      "extends": Vue$1.component('field')
    };

    /* script */
    var __vue_script__$o = script$o;
    /* template */

    var __vue_render__$o = function __vue_render__() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c("input", _vm._b({
        directives: [{
          name: "debounce",
          rawName: "v-debounce"
        }, {
          name: "model",
          rawName: "v-model.lazy",
          value: _vm.value,
          expression: "value",
          modifiers: {
            lazy: true
          }
        }],
        staticClass: "uk-input",
        attrs: {
          type: "text"
        },
        domProps: {
          value: _vm.value
        },
        on: {
          change: function change($event) {
            _vm.value = $event.target.value;
          }
        }
      }, "input", _vm.attributes, false));
    };

    var __vue_staticRenderFns__$o = [];
    __vue_render__$o._withStripped = true;
    /* style */

    var __vue_inject_styles__$o = undefined;
    /* scoped */

    var __vue_scope_id__$o = undefined;
    /* module identifier */

    var __vue_module_identifier__$o = undefined;
    /* functional template */

    var __vue_is_functional_template__$o = false;
    /* style inject */

    /* style inject SSR */

    /* style inject shadow dom */

    var __vue_component__$o = normalizeComponent({
      render: __vue_render__$o,
      staticRenderFns: __vue_staticRenderFns__$o
    }, __vue_inject_styles__$o, __vue_script__$o, __vue_scope_id__$o, __vue_is_functional_template__$o, __vue_module_identifier__$o, false, undefined, undefined, undefined);

    //
    var script$p = {
      directives: {
        debounce: debounce$2
      },
      "extends": Vue$1.component('field')
    };

    /* script */
    var __vue_script__$p = script$p;
    /* template */

    var __vue_render__$p = function __vue_render__() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c("textarea", _vm._b({
        directives: [{
          name: "debounce",
          rawName: "v-debounce"
        }, {
          name: "model",
          rawName: "v-model.lazy",
          value: _vm.value,
          expression: "value",
          modifiers: {
            lazy: true
          }
        }],
        staticClass: "customizer-field-textarea settings-field-textarea uk-textarea",
        domProps: {
          value: _vm.value
        },
        on: {
          change: function change($event) {
            _vm.value = $event.target.value;
          }
        }
      }, "textarea", _vm.attributes, false));
    };

    var __vue_staticRenderFns__$p = [];
    __vue_render__$p._withStripped = true;
    /* style */

    var __vue_inject_styles__$p = undefined;
    /* scoped */

    var __vue_scope_id__$p = undefined;
    /* module identifier */

    var __vue_module_identifier__$p = undefined;
    /* functional template */

    var __vue_is_functional_template__$p = false;
    /* style inject */

    /* style inject SSR */

    /* style inject shadow dom */

    var __vue_component__$p = normalizeComponent({
      render: __vue_render__$p,
      staticRenderFns: __vue_staticRenderFns__$p
    }, __vue_inject_styles__$p, __vue_script__$p, __vue_scope_id__$p, __vue_is_functional_template__$p, __vue_module_identifier__$p, false, undefined, undefined, undefined);

    //
    var script$q = {
      components: {
        FieldButtonSelect: __vue_component__,
        FieldCheckbox: __vue_component__$1,
        FieldColor: __vue_component__$9,
        FieldEditor: __vue_component__$a,
        FieldGroupDivider: __vue_component__$b,
        FieldImage: __vue_component__$c,
        FieldImageSelect: __vue_component__$e,
        FieldInvisibleSettings: __vue_component__$f,
        FieldMenu: __vue_component__$g,
        FieldParagraph: __vue_component__$h,
        FieldPosition: __vue_component__$i,
        FieldRadio: __vue_component__$j,
        FieldRange: __vue_component__$k,
        FieldSelect: __vue_component__$l,
        FieldSize: __vue_component__$m,
        FieldSort: __vue_component__$n,
        FieldText: __vue_component__$o,
        FieldTextarea: __vue_component__$p
      },
      computed: {
        fields: function fields() {
          return this.prepare(this.config.fields || {});
        }
      },
      created: function created() {
        this.$store.commit('settings/setState', {
          name: 'tracking',
          value: false
        });
      },
      mounted: function mounted() {
        var _this = this;

        this.$nextTick(function () {
          return _this.$store.commit('settings/setState', {
            name: 'tracking',
            value: true
          });
        });
      },
      mixins: [i18n],
      "extends": Vue$1.component('fields')
    };

    /* script */
    var __vue_script__$q = script$q;
    /* template */

    var __vue_render__$q = function __vue_render__() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c("div", {
        staticClass: "customizer-fields settings-fields"
      }, [_vm._l(_vm.fields, function (field) {
        return _c("div", {
          directives: [{
            name: "show",
            rawName: "v-show",
            value: _vm.evaluate(field.show),
            expression: "evaluate(field.show)"
          }],
          key: field.name,
          staticClass: "customizer-field settings-field"
        }, [field.label && !~["group-divider"].indexOf(field.type) ? _c("h3", {
          staticClass: "customizer-field-heading settings-field-heading"
        }, [_vm._v("\n            " + _vm._s(field.label) + "\n            "), field.badge ? _c("span", {
          staticClass: "uk-badge customizer-field-badge settings-field-badge"
        }, [_vm._v(_vm._s(field.badge))]) : _vm._e(), _vm._v(" "), field.tooltip ? _c("span", {
          staticClass: "customizer-field-tooltip settings-field-tooltip",
          attrs: {
            title: field.tooltip,
            "data-uk-tooltip": "delay: 500"
          }
        }, [_vm._v("?")]) : _vm._e(), _vm._v(" "), field.info ? _c("a", {
          staticClass: "customizer-field-info settings-field-info",
          attrs: {
            href: field.info,
            title: _vm.$t("go to instructions"),
            target: "_blank"
          }
        }, [_vm._v("i")]) : _vm._e()]) : _vm._e(), _vm._v(" "), ~["group-divider"].indexOf(field.type) ? _c(field.component, {
          tag: "component",
          attrs: {
            field: field,
            values: _vm.values
          },
          on: {
            change: _vm.change
          }
        }) : _c("div", {
          "class": {
            "uk-margin-bottom": !field.description
          }
        }, [_c(field.component, {
          tag: "component",
          attrs: {
            field: field,
            values: _vm.values
          },
          on: {
            change: _vm.change
          }
        })], 1), _vm._v(" "), field.description && !~["group-divider"].indexOf(field.type) ? _c("div", {
          staticClass: "uk-margin-bottom uk-text-small uk-text-muted uk-link-muted",
          domProps: {
            innerHTML: _vm._s(field.description)
          }
        }) : _vm._e()], 1);
      }), _vm._v(" "), _c("transition", {
        attrs: {
          "enter-active-class": "uk-transition-fade",
          "leave-active-class": "uk-transition-fade"
        }
      }, [!Object.keys(_vm.fields).length ? _c("div", {
        staticClass: "uk-position-top uk-position-z-index"
      }, [_c("div", {
        staticClass: "button-progress-top uk-button uk-button-default uk-button-loading uk-overlay-default uk-width-1-1",
        staticStyle: {
          "margin-top": "81px"
        }
      }, [_vm._v(" ")])]) : _vm._e()])], 2);
    };

    var __vue_staticRenderFns__$q = [];
    __vue_render__$q._withStripped = true;
    /* style */

    var __vue_inject_styles__$q = undefined;
    /* scoped */

    var __vue_scope_id__$q = undefined;
    /* module identifier */

    var __vue_module_identifier__$q = undefined;
    /* functional template */

    var __vue_is_functional_template__$q = false;
    /* style inject */

    /* style inject SSR */

    /* style inject shadow dom */

    var __vue_component__$q = normalizeComponent({
      render: __vue_render__$q,
      staticRenderFns: __vue_staticRenderFns__$q
    }, __vue_inject_styles__$q, __vue_script__$q, __vue_scope_id__$q, __vue_is_functional_template__$q, __vue_module_identifier__$q, false, undefined, undefined, undefined);

    //
    var script$r = {
      computed: vuex.mapState('settings', ['status', 'changed']),
      methods: {
        apply: function apply() {
          if (this.status === 2) {
            return;
          }

          this.$store.dispatch('settings/set');
        }
      },
      destroyed: function destroyed() {
        uikitUtil.remove(this.$el);
      },
      mixins: [i18n]
    };

    /* script */
    var __vue_script__$r = script$r;
    /* template */

    var __vue_render__$r = function __vue_render__() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c("div", {
        directives: [{
          name: "show",
          rawName: "v-show",
          value: _vm.changed,
          expression: "changed"
        }],
        staticClass: "uk-position-bottom-center uk-position-z-index uk-margin-small uk-box-shadow-large"
      }, [_c("button", {
        staticClass: "uk-button uk-button-danger uk-button-small",
        "class": {
          "uk-button-sending": _vm.status === 2
        },
        attrs: {
          type: "button"
        },
        on: {
          click: _vm.apply
        }
      }, [_vm._v(_vm._s(_vm.$t("Apply")))])]);
    };

    var __vue_staticRenderFns__$r = [];
    __vue_render__$r._withStripped = true;
    /* style */

    var __vue_inject_styles__$r = undefined;
    /* scoped */

    var __vue_scope_id__$r = undefined;
    /* module identifier */

    var __vue_module_identifier__$r = undefined;
    /* functional template */

    var __vue_is_functional_template__$r = false;
    /* style inject */

    /* style inject SSR */

    /* style inject shadow dom */

    var __vue_component__$r = normalizeComponent({
      render: __vue_render__$r,
      staticRenderFns: __vue_staticRenderFns__$r
    }, __vue_inject_styles__$r, __vue_script__$r, __vue_scope_id__$r, __vue_is_functional_template__$r, __vue_module_identifier__$r, false, undefined, undefined, undefined);

    //
    var script$s = {
      mixins: [i18n]
    };

    /* script */
    var __vue_script__$s = script$s;
    /* template */

    var __vue_render__$s = function __vue_render__() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c("div", [_c("div", {
        staticClass: "uk-modal-header"
      }, [_c("h2", {
        staticClass: "uk-modal-title"
      }, [_vm._v(_vm._s(_vm.$t("Settings changed")))])]), _vm._v(" "), _c("div", {
        staticClass: "uk-modal-body"
      }, [_vm._v("\n        " + _vm._s(_vm.$t("Settings have been changed but no changes have been accepted")) + "\n    ")]), _vm._v(" "), _c("div", {
        staticClass: "uk-modal-footer uk-text-right"
      }, [_c("button", {
        staticClass: "uk-button uk-button-default uk-modal-close",
        attrs: {
          type: "button"
        },
        on: {
          click: function click($event) {
            return _vm.$emit("resolve");
          }
        }
      }, [_vm._v(_vm._s(_vm.$t("Close")))]), _vm._v(" "), _c("button", {
        staticClass: "uk-button uk-button-primary",
        attrs: {
          autofocus: ""
        },
        on: {
          click: function click($event) {
            _vm.$emit("resolve");

            _vm.$store.dispatch("settings/set");
          }
        }
      }, [_vm._v(_vm._s(_vm.$t("Apply")))])])]);
    };

    var __vue_staticRenderFns__$s = [];
    __vue_render__$s._withStripped = true;
    /* style */

    var __vue_inject_styles__$s = undefined;
    /* scoped */

    var __vue_scope_id__$s = undefined;
    /* module identifier */

    var __vue_module_identifier__$s = undefined;
    /* functional template */

    var __vue_is_functional_template__$s = false;
    /* style inject */

    /* style inject SSR */

    /* style inject shadow dom */

    var __vue_component__$s = normalizeComponent({
      render: __vue_render__$s,
      staticRenderFns: __vue_staticRenderFns__$s
    }, __vue_inject_styles__$s, __vue_script__$s, __vue_scope_id__$s, __vue_is_functional_template__$s, __vue_module_identifier__$s, false, undefined, undefined, undefined);

    var state = {
      // 0 - uninitialized
      // 1 - get, load
      // 2 - set, send
      // 3 - error
      // 4 - ready
      status: 0,
      changed: false,
      tracking: true,
      // to avoid unnecessary preview updates
      panels: {},
      values: {}
    }; // getters

    var getters = {
      fields: function fields(state) {
        return get(state, 'panels.settings.fields', {});
      },
      panels: function panels(state) {
        return preparePanels(state.panels);
      },
      values: function values(state) {
        return state.values;
      },
      changed: function changed(state) {
        return state.changed;
      },
      tracking: function tracking(state) {
        return state.tracking;
      },
      autoApply: function autoApply(state, getters, rootState) {
        return get(rootState, 'sections.settings.autoApply', false) && rootState.status === 4;
      },
      messages: function messages(state, getters, rootState) {
        return get(rootState, 'sections.settings.messages', {});
      }
    }; // actions

    var actions = {
      get: function get(_ref) {
        var commit = _ref.commit,
            rootGetters = _ref.rootGetters;
        return new uikitUtil.Promise(function (resolve, reject) {
          var route = rootGetters.route,
              draft = rootGetters.draft,
              config = rootGetters.config;
          commit('setState', {
            name: 'status',
            value: 1
          });
          api.get({
            route: route,
            draft: draft,
            config: config
          }).then(function (_ref2) {
            var response = _ref2.response;
            commit('setState', {
              name: 'panels',
              value: response.data.panels
            });
            resolve(response);
            commit('setState', {
              name: 'status',
              value: 4
            });
          }, function (error) {
            reject(error);
            commit('setState', {
              name: 'status',
              value: 4
            });
          });
        });
      },
      set: function set(_ref3) {
        var commit = _ref3.commit,
            dispatch = _ref3.dispatch,
            state = _ref3.state,
            rootGetters = _ref3.rootGetters;
        return new uikitUtil.Promise(function (resolve, reject) {
          var route = rootGetters.route,
              draft = rootGetters.draft;
          var values = state.values;

          var _final = function _final() {
            commit('setState', {
              name: 'status',
              value: 4
            });
            commit('setState', {
              name: 'status',
              value: 4
            }, {
              root: true
            });
          };

          commit('setState', {
            name: 'status',
            value: 2
          });
          commit('setState', {
            name: 'status',
            value: 0
          }, {
            root: true
          });
          api.set({
            route: route,
            draft: draft,
            values: values
          }).then(function (_ref4) {
            var response = _ref4.response;

            if (response.status === 'fail') {
              (uikitUtil.isArray(response.errors) ? response.errors : [response.errors]).forEach(function (error) {
                uikit.notification({
                  message: error,
                  status: 'danger',
                  pos: 'bottom-right',
                  timeout: 5000
                });
              });
            }

            commit('setState', {
              name: 'changed',
              value: false
            });
            dispatch('preview/load', void 0, {
              root: true
            });
            resolve(response);

            _final();
          }, function (error) {
            uikit.notification({
              message: error,
              status: 'danger',
              pos: 'bottom-right',
              timeout: 5000
            });
            reject(error);

            _final();
          });
        });
      },
      openPanel: function openPanel(_ref5, panel) {
        var dispatch = _ref5.dispatch,
            state = _ref5.state,
            getters = _ref5.getters;
        panel = uikitUtil.isString(panel) ? getters.panels[panel] : panel;
        panel && dispatch('sidebar/openPanel', uikitUtil.assign({
          component: __vue_component__$q,
          props: {
            values: state.values
          }
        }, panel), {
          root: true
        });
      },
      clear: function clear(_ref6) {
        var commit = _ref6.commit;
        commit('setState', {
          name: 'changed',
          value: false
        });
        commit('setState', {
          name: 'panels',
          value: {}
        });
        commit('setState', {
          name: 'values',
          value: {}
        });
      }
    }; // mutations

    var mutations = {
      setState: function setState(state, _ref7) {
        var name = _ref7.name,
            value = _ref7.value;
        return set(state, name, value);
      }
    };
    var store = {
      namespaced: true,
      state: state,
      getters: getters,
      actions: actions,
      mutations: mutations
    };

    //
    var script$t = {
      components: {
        SettingsFields: __vue_component__$q
      },
      props: {
        config: Object
      },
      // revise later
      computed: vuex.mapGetters('settings', ['values', 'fields', 'changed', 'tracking', 'autoApply']),
      watch: {
        tracking: function tracking(val, oldVal) {
          var _this = this;

          if (val === oldVal) {
            return;
          }

          if (val) {
            this.unwatch = this.$watch('values', debounce$1(function () {
              if (_this.autoApply) {
                _this.$store.dispatch('settings/set');
              } else {
                _this.$store.commit('settings/setState', {
                  name: 'changed',
                  value: true
                });
              }
            }, 50), {
              deep: true
            });
          } else {
            uikitUtil.isFunction(this.unwatch) && this.unwatch();
            this.unwatch = null;
          }
        },
        '$store.state.config.app': function $storeStateConfigApp(val, oldVal) {
          if (val !== oldVal) {
            this.$store.dispatch('sidebar/closePanel', 0);
          }
        }
      },
      beforeCreate: function beforeCreate() {
        uikitUtil.isUndefined(this.$store.state.settings) && this.$store.registerModule('settings', store);
      },
      mounted: function mounted() {
        this.$sticky = new Vue({
          parent: this,
          "extends": __vue_component__$r
        }).$mount();
        uikitUtil.$('.customizer-sidebar-content').appendChild(this.$sticky.$el);
        this.$store.dispatch('settings/get');
      },
      beforeDestroy: function beforeDestroy() {
        var _this2 = this;

        var _final = function _final() {
          _this2.$sticky && _this2.$sticky.$destroy();

          _this2.$store.dispatch('settings/clear');
        };

        this.changed ? this.$modal(__vue_component__$s, null, {
          bgClose: false,
          escClose: false
        }).show({
          width: 'xlarge'
        }).then(_final, _final) : _final();
      }
    };

    /* script */
    var __vue_script__$t = script$t;
    /* template */

    var __vue_render__$t = function __vue_render__() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c("SettingsFields", {
        attrs: {
          config: {
            fields: _vm.fields
          },
          values: _vm.values
        }
      });
    };

    var __vue_staticRenderFns__$t = [];
    __vue_render__$t._withStripped = true;
    /* style */

    var __vue_inject_styles__$t = undefined;
    /* scoped */

    var __vue_scope_id__$t = undefined;
    /* module identifier */

    var __vue_module_identifier__$t = undefined;
    /* functional template */

    var __vue_is_functional_template__$t = false;
    /* style inject */

    /* style inject SSR */

    /* style inject shadow dom */

    var __vue_component__$t = normalizeComponent({
      render: __vue_render__$t,
      staticRenderFns: __vue_staticRenderFns__$t
    }, __vue_inject_styles__$t, __vue_script__$t, __vue_scope_id__$t, __vue_is_functional_template__$t, __vue_module_identifier__$t, false, undefined, undefined, undefined);

    /**
     * Plugin class
     */
    var Plugin = {
      install: function install(Vue) {
        if (this.installed) {
          return;
        }

        Util(Vue);
        Vue.component('settings', __vue_component__$t);
      },
      version: '1.1.0'
    };

    /**
     * Install plugin
     */

    if (typeof window !== 'undefined' && window.Vue) {
      window.Vue.use(Plugin);
    }

    return Plugin;

})));
