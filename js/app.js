webpackJsonpKeepOrSweep([1],{

/***/ "7YHV":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "HL4x":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "NHnr":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.esm.js
var vue_esm = __webpack_require__("7+uW");

// EXTERNAL MODULE: ./node_modules/lodash.shuffle/index.js
var lodash_shuffle = __webpack_require__("Jrax");
var lodash_shuffle_default = /*#__PURE__*/__webpack_require__.n(lodash_shuffle);

// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/get-iterator.js
var get_iterator = __webpack_require__("BO1k");
var get_iterator_default = /*#__PURE__*/__webpack_require__.n(get_iterator);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/toConsumableArray.js
var toConsumableArray = __webpack_require__("Gu7T");
var toConsumableArray_default = /*#__PURE__*/__webpack_require__.n(toConsumableArray);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./node_modules/vue-swing/VueSwing.vue


//
//
//
//
//
//

var Swing = __webpack_require__("J0ux");

/* harmony default export */ var VueSwing = ({
  name: 'vue-swing',

  props: ['config'],

  data: function data() {
    return {
      stack: null,
      cards: [],
      observer: null
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.stack = Swing.Stack(this.config || {});
    var children = [].concat(toConsumableArray_default()(this.$el.children));
    children.forEach(function (el) {
      _this.cards.push(_this.stack.createCard(el));
    });

    // Observe changes in DOM
    this.observer = new MutationObserver(function (mutations) {
      var addedElements = [];
      var removedElements = [];
      mutations.forEach(function (_ref) {
        var addedNodes = _ref.addedNodes,
            removedNodes = _ref.removedNodes;

        addedElements.push.apply(addedElements, toConsumableArray_default()(addedNodes));
        removedElements.push.apply(removedElements, toConsumableArray_default()(removedNodes));
      });

      // Create a new card for each new element
      addedElements.forEach(function (el) {
        // Ignore if the added element is also removed
        var i = removedElements.indexOf(el);
        if (i !== -1) {
          removedElements.splice(i, 1);
          return;
        }

        var card = _this.stack.getCard(el);
        if (card == null) {
          _this.cards.push(_this.stack.createCard(el));
        }
      });

      // Remove the card if the element is gone
      removedElements.forEach(function (el) {
        var card = _this.stack.getCard(el);
        if (card != null) {
          _this.cards.splice(_this.cards.indexOf(card), 1);
          _this.stack.destroyCard(card);
        }
      });
    });
    this.observer.observe(this.$el, { childList: true });

    // Register events
    var events = ['throwout', 'throwoutend', 'throwoutdown', 'throwoutleft', 'throwoutright', 'throwoutup', 'throwin', 'throwinend', 'dragstart', 'dragmove', 'dragend', 'destroyCard'];

    var _loop = function _loop(event) {
      _this.stack.on(event, function (e) {
        _this.$emit(event, e);
      });
    };

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = get_iterator_default()(events), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var event = _step.value;

        _loop(event);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.observer.disconnect();
  },


  Card: Swing.Card,
  Direction: Swing.Direction,
  Stack: Swing.Stack
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-f753aedc","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./node_modules/vue-swing/VueSwing.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_vm._t("default")],2)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var vue_swing_VueSwing = (esExports);
// CONCATENATED MODULE: ./node_modules/vue-swing/VueSwing.vue
function injectStyle (ssrContext) {
  __webpack_require__("koC8")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  VueSwing,
  vue_swing_VueSwing,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var node_modules_vue_swing_VueSwing = (Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/Cards.vue
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

/* harmony default export */ var Cards = ({
  name: 'Cards',
  props: {
    element: {
      type: Object,
      required: true
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-7a77af60","hasScoped":true,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/Cards.vue
var Cards_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"card"},[_c('div',{staticClass:"preview",style:({ backgroundImage: 'url(' + _vm.element.preview + ')' })}),_vm._v(" "),_c('h2',{staticClass:"name"},[_vm._v(_vm._s(_vm.element.name))]),_vm._v(" "),_c('p',{staticClass:"detail"},[_c('a',{attrs:{"href":_vm.element.link,"target":"_blank","rel":"noopener"}},[_c('img',{staticClass:"source",attrs:{"src":_vm.element.source,"alt":"🔗"}})]),_vm._v("\n      "+_vm._s(_vm.element.detail)+"\n  ")])])}
var Cards_staticRenderFns = []
var Cards_esExports = { render: Cards_render, staticRenderFns: Cards_staticRenderFns }
/* harmony default export */ var components_Cards = (Cards_esExports);
// CONCATENATED MODULE: ./src/components/Cards.vue
function Cards_injectStyle (ssrContext) {
  __webpack_require__("7YHV")
}
var Cards_normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var Cards___vue_template_functional__ = false
/* styles */
var Cards___vue_styles__ = Cards_injectStyle
/* scopeId */
var Cards___vue_scopeId__ = "data-v-7a77af60"
/* moduleIdentifier (server only) */
var Cards___vue_module_identifier__ = null
var Cards_Component = Cards_normalizeComponent(
  Cards,
  components_Cards,
  Cards___vue_template_functional__,
  Cards___vue_styles__,
  Cards___vue_scopeId__,
  Cards___vue_module_identifier__
)

/* harmony default export */ var src_components_Cards = (Cards_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/Actions.vue
//
//
//
//
//
//
//
//



/* harmony default export */ var Actions = ({
  name: 'Actions',
  data: function data() {
    return {
      actions: [{
        keep: 'Keep',
        sweep: 'Sweep'
      }, {
        keep: 'Neat',
        sweep: 'Delete'
      }, {
        keep: 'Shantay',
        sweep: 'Sashay'
      }, {
        keep: 'Love',
        sweep: 'Shove'
      }]
    };
  },

  methods: {
    keep: function keep() {
      this.$emit('keep');
    },
    sweep: function sweep() {
      this.$emit('sweep');
    }
  },
  computed: {
    randomLabel: function randomLabel() {
      return lodash_shuffle_default()(this.actions)[0];
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-46c940c8","hasScoped":true,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/Actions.vue
var Actions_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"actions"},[_c('button',{staticClass:"sweep",on:{"click":_vm.sweep}},[_vm._v(_vm._s(_vm.randomLabel.sweep))]),_vm._v(" "),_c('button',{staticClass:"keep",on:{"click":_vm.keep}},[_vm._v(_vm._s(_vm.randomLabel.keep))])])}
var Actions_staticRenderFns = []
var Actions_esExports = { render: Actions_render, staticRenderFns: Actions_staticRenderFns }
/* harmony default export */ var components_Actions = (Actions_esExports);
// CONCATENATED MODULE: ./src/components/Actions.vue
function Actions_injectStyle (ssrContext) {
  __webpack_require__("HL4x")
}
var Actions_normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var Actions___vue_template_functional__ = false
/* styles */
var Actions___vue_styles__ = Actions_injectStyle
/* scopeId */
var Actions___vue_scopeId__ = "data-v-46c940c8"
/* moduleIdentifier (server only) */
var Actions___vue_module_identifier__ = null
var Actions_Component = Actions_normalizeComponent(
  Actions,
  components_Actions,
  Actions___vue_template_functional__,
  Actions___vue_styles__,
  Actions___vue_scopeId__,
  Actions___vue_module_identifier__
)

/* harmony default export */ var src_components_Actions = (Actions_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/App.vue
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





/* harmony default export */ var App = ({
  name: 'App',
  components: {
    Cards: src_components_Cards,
    Actions: src_components_Actions
  },
  data: function data() {
    return {
      // TODO: Show icons over card, x for sweep etc
      config: {
        allowedDirections: [node_modules_vue_swing_VueSwing.Direction.LEFT, node_modules_vue_swing_VueSwing.Direction.RIGHT],
        // Higher swipe sensitivity, thanks to https://github.com/goweiwen/vue-swing/issues/10
        isThrowOut: function isThrowOut(xOffset, yOffset, element, throwOutConfidence) {
          return throwOutConfidence > 0.5;
        }
      }
    };
  },

  props: {
    elements: {
      type: Array,
      required: true
    }
  },
  methods: {
    // TODO: Reduce animation speed
    keep: function keep() {
      var cards = this.$refs.cardstack.cards;
      if (cards.length > 0) {
        cards[cards.length - 1].throwOut(1, 0);
      }
    },
    sweep: function sweep() {
      var cards = this.$refs.cardstack.cards;
      if (cards.length > 0) {
        cards[cards.length - 1].throwOut(-1, 0);
      }
    },
    next: function next(remove) {
      if (remove) {
        this.delete();
      }
      this.elements.pop();
    },
    delete: function _delete() {
      // TODO: Actually delete the element
    },

    // TODO: Not just refresh the page, but source elements again and show
    refresh: function refresh() {
      location.reload();
    },

    // Keyboard shortcuts thanks to https://vuejsdevelopers.com/2017/05/01/vue-js-cant-help-head-body/
    keyListener: function keyListener(evt) {
      // Keep: Space, →, Enter
      if (evt.keyCode === 32 || evt.keyCode === 39 || evt.keyCode === 13) {
        this.keep();
      }
      // Sweep: Delete, ←
      if (evt.keyCode === 46 || evt.keyCode === 37) {
        this.sweep();
      }
    }
  },
  created: function created() {
    // Add listener for keyboard shortcuts
    document.addEventListener('keyup', this.keyListener);
  },
  destroyed: function destroyed() {
    // Remove listener for keyboard shortcuts
    document.removeEventListener('keyup', this.keyListener);
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-7f48894d","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/App.vue
var App_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"app","role":"main"}},[_c('h1',[_vm._v("Keep or Sweep")]),_vm._v(" "),_c('div',{staticClass:"container"},[_c('vue-swing',{ref:"cardstack",staticClass:"card-container",attrs:{"config":_vm.config},on:{"throwoutleft":function($event){_vm.next(true)},"throwoutright":function($event){_vm.next(false)}}},_vm._l((_vm.elements),function(element){return (element)?_c('Cards',{key:element.id,attrs:{"element":element}}):_vm._e()})),_vm._v(" "),_c('div',{staticClass:"card-empty"},[_c('button',{staticClass:"refresh",attrs:{"aria-label":"Refresh"},on:{"click":_vm.refresh}}),_vm._v(" "),_c('h2',[_vm._v("All done!")]),_vm._v(" "),_c('p',[_vm._v("Refresh to keep or sweep again!")])])],1),_vm._v(" "),_c('Actions',{on:{"keep":_vm.keep,"sweep":_vm.sweep}})],1)}
var App_staticRenderFns = []
var App_esExports = { render: App_render, staticRenderFns: App_staticRenderFns }
/* harmony default export */ var selectortype_template_index_0_src_App = (App_esExports);
// CONCATENATED MODULE: ./src/App.vue
function App_injectStyle (ssrContext) {
  __webpack_require__("bNGq")
}
var App_normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var App___vue_template_functional__ = false
/* styles */
var App___vue_styles__ = App_injectStyle
/* scopeId */
var App___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var App___vue_module_identifier__ = null
var App_Component = App_normalizeComponent(
  App,
  selectortype_template_index_0_src_App,
  App___vue_template_functional__,
  App___vue_styles__,
  App___vue_scopeId__,
  App___vue_module_identifier__
)

/* harmony default export */ var src_App = (App_Component.exports);

// CONCATENATED MODULE: ./src/services/amazon.js
/* harmony default export */ var amazon = ({
  elements: [{
    id: 'B00ECCLV6E',
    preview: 'https://images-na.ssl-images-amazon.com/images/I/31vMFrUhtFL.jpg',
    name: 'Microsoft Sculpt Ergonomic Desktop (Set mit Maus und Tastatur, deutsches QWERTZ Tastaturlayout, schwarz, ergonomisch, kabellos)',
    detail: '97,79 €, on wishlist',
    source: 'https://www.amazon.de/favicon.ico',
    link: 'https://www.amazon.de/dp/B00ECCLV6E/'
  }, {
    id: 'B002NFHQ3E',
    preview: 'https://images-na.ssl-images-amazon.com/images/I/31Mw94gKNuL.jpg',
    name: 'Dr. Bronners Flüssigseife Eukalyptus 944 ml - Naturseife',
    detail: '23,80 €, on wishlist',
    source: 'https://www.amazon.de/favicon.ico',
    link: 'https://www.amazon.de/dp/B002NFHQ3E/'
  }, {
    id: 'B078HZG7GB',
    preview: 'https://images-na.ssl-images-amazon.com/images/I/91y9f6FZjWL._SL1500_.jpg',
    name: 'HYDROPHIL nachhaltige Zahnbürste aus Bambus blau extraweich 4er Pack weich',
    detail: '13,90 €, on wishlist',
    source: 'https://www.amazon.de/favicon.ico',
    link: 'https://www.amazon.de/dp/B078HZG7GB/'
  }]
});
// CONCATENATED MODULE: ./src/services/email.js
/* harmony default export */ var email = ({
  elements: [{
    id: '235',
    preview: 'Hey dear how are you? We haven’t heard from you in a few weeks, it would be great if you would call us some time. Cheers and kisses, your parents',
    name: 'Call us some time',
    detail: 'from your parents',
    source: 'https://www.google.com/inbox/assets/images/common/logo-nav.png',
    link: 'https://www.google.com/inbox/'
  }, {
    id: '143',
    preview: '',
    name: 'Invest in Bitcoin',
    detail: 'from promo@bitcoinbros.com',
    source: 'https://www.google.com/inbox/assets/images/common/logo-nav.png',
    link: 'https://www.google.com/inbox/'
  }, {
    id: '134',
    preview: '',
    name: 'YOU WON 1.5 Million!',
    detail: 'from spam@example.com',
    source: 'https://www.google.com/inbox/assets/images/common/logo-nav.png',
    link: 'https://www.google.com/inbox/'
  }]
});
// CONCATENATED MODULE: ./src/services/github.js
/* harmony default export */ var github = ({
  elements: [{
    id: '241266',
    preview: 'https://avatars2.githubusercontent.com/u/241266?s=400&v=4',
    name: 'Camila',
    detail: 'Brazilian Software Engineer living in Berlin.',
    source: 'https://github.com/favicon.ico',
    link: 'https://github.com/camilasan/'
  }]
});
// CONCATENATED MODULE: ./src/services/home.js
/* harmony default export */ var home = ({
  elements: [{
    id: 'junkdrawer',
    preview: 'https://c1.staticflickr.com/4/3549/3467650188_38a5aed632.jpg',
    name: 'Junk drawer',
    detail: 'In your kitchen',
    source: 'https://image.flaticon.com/icons/svg/23/23665.svg',
    link: 'https://www.flickr.com/photos/candyheartsandpaperflowers/3467650188'
  }, {
    id: 'officedesk',
    preview: 'https://www.publicdomainpictures.net/pictures/190000/velka/messy-desk-no-messages.jpg',
    name: 'Your desk',
    detail: 'In the office',
    source: 'https://image.flaticon.com/icons/svg/23/23665.svg',
    link: 'https://www.publicdomainpictures.net/en/view-image.php?image=183434&picture=messy-desk-no-messages'
  }, {
    id: 'clothes',
    preview: 'https://images.unsplash.com/photo-1472666260353-23210544cdf1?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1735ca87150a9a98aeb3c21612b7433c&dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb',
    name: 'Clothes you never wear',
    detail: 'Donate them',
    source: 'https://image.flaticon.com/icons/svg/23/23665.svg',
    link: 'https://www.netflix.com/watch/80048218'
  }]
});
// CONCATENATED MODULE: ./src/services/instagram.js
/* harmony default export */ var instagram = ({
  elements: [{
    id: 'BmEsgz-A-_5',
    preview: 'https://instagram.fham1-1.fna.fbcdn.net/vp/14ba4a6f59cc8b6cef40300925190ec6/5C0FFF13/t51.2885-15/e35/37894789_448968982250440_2716276290247196672_n.jpg',
    name: 'Ready to go! #breakbrake17 #raw',
    detail: '39 likes, 0 comments',
    source: 'https://www.instagram.com/static/images/ico/favicon.ico/36b3ee2d91ed.ico',
    link: 'https://www.instagram.com/p/BmEsgz-A-_5/'
  }, {
    id: 'BmEHgD5AjS2',
    preview: 'https://instagram.fham1-1.fna.fbcdn.net/vp/248b33740b0d9c488479a439dee347c7/5C029173/t51.2885-15/e35/38023378_2140119756312330_5690523692275073024_n.jpg',
    name: 'Beer is really not helping 🙄🍺 #criticalengineering',
    detail: '10 likes, 0 comments',
    source: 'https://www.instagram.com/static/images/ico/favicon.ico/36b3ee2d91ed.ico',
    link: 'https://www.instagram.com/p/BmEHgD5AjS2/'
  }, {
    id: 'BmD2csggFSI',
    preview: 'https://instagram.fham1-1.fna.fbcdn.net/vp/6dfe13d50c16771cd3ce87f6cd7c6f76/5BED7042/t51.2885-15/e35/37720833_272773736878266_7376601168329310208_n.jpg',
    name: '❤️Berlin',
    detail: '10 likes, 0 comments',
    source: 'https://www.instagram.com/static/images/ico/favicon.ico/36b3ee2d91ed.ico',
    link: 'https://www.instagram.com/p/BmD2csggFSI/'
  }]
});
// CONCATENATED MODULE: ./src/services/netflix.js
/* harmony default export */ var netflix = ({
  elements: [{
    id: '80115896',
    preview: 'https://occ-0-1555-1556.1.nflxso.net/art/67f98/423f0d2877838a69bbe75deca5e09f52f0b67f98.jpg',
    name: 'Rupaul’s Drag Race',
    detail: 'My List',
    source: 'https://assets.nflxext.com/us/ffe/siteui/common/icons/nficon2016.ico',
    link: 'https://www.netflix.com/watch/80115896'
  }, {
    id: '80004448',
    preview: 'https://occ-0-1555-1556.1.nflxso.net/art/faf12/1d1b752783606344ebd685439dd04c871b0faf12.jpg',
    name: 'Cosmos',
    detail: 'My List',
    source: 'https://assets.nflxext.com/us/ffe/siteui/common/icons/nficon2016.ico',
    link: 'https://www.netflix.com/watch/80004448'
  }, {
    id: '80048218',
    preview: 'https://occ-0-1555-1556.1.nflxso.net/art/5d8e1/f81fbcc2029f95fb3fd52cece4a7556b5db5d8e1.jpg',
    name: 'He Named Me Malala',
    detail: 'My List',
    source: 'https://assets.nflxext.com/us/ffe/siteui/common/icons/nficon2016.ico',
    link: 'https://www.netflix.com/watch/80048218'
  }]
});
// CONCATENATED MODULE: ./src/services/twitter.js
/* harmony default export */ var twitter = ({
  elements: [{
    id: '740212043492495360',
    preview: 'Getting involved in open source is difficult enough. So- be welcoming\n- have a Code of Conduct\n- don’t be afraid to exclude toxic people\n:)',
    name: 'Tweet from you',
    detail: '🗨️ 0 🔁 43 ❤️ 83, 7 Jun 2016',
    source: 'https://twitter.com/favicon.ico',
    link: 'https://twitter.com/jancborchardt/status/740212043492495360'
  }, {
    id: '439531056316686336',
    preview: 'https://pbs.twimg.com/profile_images/439531056316686336/F8Vpmwrg_400x400.jpeg',
    name: 'Martin',
    detail: 'Follows you back',
    source: 'https://twitter.com/favicon.ico',
    link: 'https://twitter.com/xmartin'
  }, {
    id: '859307085254799360',
    preview: 'https://pbs.twimg.com/profile_images/859307085254799360/DxXInTiZ_400x400.jpg',
    name: 'Regina',
    detail: 'Follows you back',
    source: 'https://twitter.com/favicon.ico',
    link: 'https://twitter.com/reginasipos/'
  }, {
    id: '907693741577789440',
    preview: 'https://pbs.twimg.com/profile_images/907693741577789440/_LzuruZ9_400x400.jpg',
    name: 'Max',
    detail: 'Follows you back',
    source: 'https://twitter.com/favicon.ico',
    link: 'https://twitter.com/shelldaemon'
  }]
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/Main.vue













// import unsplash from './services/unsplash';

vue_esm["a" /* default */].component('vue-swing', node_modules_vue_swing_VueSwing);

/* harmony default export */ var Main = ({
  name: 'Main',
  components: { App: src_App },
  template: '<App :elements="elements" />',
  data: function data() {
    return {
      elements: []
    };
  },

  methods: {},
  created: function created() {
    // Add elements from services
    this.elements = this.elements.concat(amazon.elements, email.elements, github.elements, home.elements, instagram.elements, netflix.elements, twitter.elements
    // unsplash.elements,
    );

    // Randomize elements on startup
    this.elements = lodash_shuffle_default()(this.elements);
    // this.elements = this.elements.sort(function() {
    //   return 0.5 - Math.random();
    // });
  }
});
// CONCATENATED MODULE: ./src/Main.vue
var Main_normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */
var __vue_template__ = null
/* template functional */
var Main___vue_template_functional__ = false
/* styles */
var Main___vue_styles__ = null
/* scopeId */
var Main___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var Main___vue_module_identifier__ = null
var Main_Component = Main_normalizeComponent(
  Main,
  __vue_template__,
  Main___vue_template_functional__,
  Main___vue_styles__,
  Main___vue_scopeId__,
  Main___vue_module_identifier__
)

/* harmony default export */ var src_Main = (Main_Component.exports);

// CONCATENATED MODULE: ./src/main.js
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.



// Special case for Nextcloud CSP
// See https://blog.wuc.me/2018/10/18/nextcloud-vue-csp.html
// And https://icewind.nl/entry/nextcloud-webpack/
if (typeof OC !== 'undefined') {
  // eslint-disable-next-line
  __webpack_require__.nc = btoa(OC.requestToken);
  // eslint-disable-next-line
  __webpack_require__.p = OC.filePath('keeporsweep', 'js', '../js/');
  var script = document.querySelector('[nonce]');
  // eslint-disable-next-line
  __webpack_require__.nc = script.nonce || script.getAttribute('nonce');
}

vue_esm["a" /* default */].config.productionTip = false;

/* eslint-disable no-new */

var View = vue_esm["a" /* default */].extend(src_Main);
new View().$mount('#app-content');

/***/ }),

/***/ "bNGq":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "koC8":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},["NHnr"]);
//# sourceMappingURL=app.js.map