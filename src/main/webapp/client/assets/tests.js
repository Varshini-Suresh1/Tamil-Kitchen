'use strict';

define('tamil-kitchen-app/tests/app.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | app');

  QUnit.test('app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass ESLint\n\n');
  });

  QUnit.test('components/orders-component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/orders-component.js should pass ESLint\n\n2:20 - \'action\' is defined but never used. (no-unused-vars)\n21:11 - \'Ember\' is not defined. (no-undef)');
  });

  QUnit.test('components/side-bar.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/side-bar.js should pass ESLint\n\n33:9 - Unexpected console statement. (no-console)');
  });

  QUnit.test('controllers/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/application.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/food-details.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/food-details.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/login.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/login.js should pass ESLint\n\n90:5 - Unexpected console statement. (no-console)\n97:9 - Unexpected console statement. (no-console)');
  });

  QUnit.test('controllers/restaurants/fooditems.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/restaurants/fooditems.js should pass ESLint\n\n3:8 - \'restaurants\' is defined but never used. (no-unused-vars)\n113:5 - Duplicate key \'updateSelectedFoodDetail\'. (no-dupe-keys)\n362:9 - Unexpected console statement. (no-console)\n393:27 - Unexpected console statement. (no-console)\n398:33 - Unexpected console statement. (no-console)\n405:17 - Unexpected console statement. (no-console)\n410:9 - Unexpected console statement. (no-console)\n421:14 - \'error\' is defined but never used. (no-unused-vars)\n433:9 - Unexpected console statement. (no-console)\n518:9 - Unexpected console statement. (no-console)\n553:9 - Unexpected console statement. (no-console)');
  });

  QUnit.test('controllers/restaurants/index.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/restaurants/index.js should pass ESLint\n\n177:15 - Unexpected console statement. (no-console)\n207:7 - Unexpected console statement. (no-console)\n271:7 - Unexpected console statement. (no-console)\n295:19 - \'error\' is defined but never used. (no-unused-vars)\n318:19 - \'error\' is defined but never used. (no-unused-vars)\n347:21 - \'error\' is defined but never used. (no-unused-vars)\n352:17 - \'error\' is defined but never used. (no-unused-vars)\n416:9 - Unexpected console statement. (no-console)\n440:9 - Unexpected console statement. (no-console)');
  });

  QUnit.test('controllers/restaurants/low-stock-food.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/restaurants/low-stock-food.js should pass ESLint\n\n3:10 - \'computed\' is defined but never used. (no-unused-vars)');
  });

  QUnit.test('controllers/restaurants/orders-history.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/restaurants/orders-history.js should pass ESLint\n\n2:10 - \'action\' is defined but never used. (no-unused-vars)\n13:9 - \'Ember\' is not defined. (no-undef)\n40:7 - Unexpected console statement. (no-console)\n44:9 - Unexpected console statement. (no-console)\n49:11 - \'userId\' is assigned a value but never used. (no-unused-vars)\n59:9 - Unexpected console statement. (no-console)\n62:11 - Unexpected console statement. (no-console)\n100:11 - Unexpected console statement. (no-console)\n133:9 - Unexpected console statement. (no-console)');
  });

  QUnit.test('controllers/signup.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/signup.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/users/addresses.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/users/addresses.js should pass ESLint\n\n253:9 - Unexpected console statement. (no-console)');
  });

  QUnit.test('controllers/users/cart.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/users/cart.js should pass ESLint\n\n3:20 - \'action\' is defined but never used. (no-unused-vars)\n68:17 - \'payload\' is assigned a value but never used. (no-unused-vars)\n144:24 - \'error\' is defined but never used. (no-unused-vars)\n232:21 - Unexpected console statement. (no-console)');
  });

  QUnit.test('controllers/users/order-history.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/users/order-history.js should pass ESLint\n\n29:27 - \'data\' is defined but never used. (no-unused-vars)');
  });

  QUnit.test('controllers/users/profile.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/users/profile.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/and.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/and.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/eq.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/eq.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/format-date.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/format-date.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/format-number.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/format-number.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/gt.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/gt.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/or.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/or.js should pass ESLint\n\n');
  });

  QUnit.test('mixins/Authmixin.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'mixins/Authmixin.js should pass ESLint\n\n3:8 - \'Router\' is defined but never used. (no-unused-vars)\n56:7 - Unexpected console statement. (no-console)');
  });

  QUnit.test('resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass ESLint\n\n');
  });

  QUnit.test('router.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass ESLint\n\n');
  });

  QUnit.test('routes/access-denied.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/access-denied.js should pass ESLint\n\n20:13 - Unexpected console statement. (no-console)\n28:13 - Unexpected console statement. (no-console)');
  });

  QUnit.test('routes/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/application.js should pass ESLint\n\n');
  });

  QUnit.test('routes/food-details.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/food-details.js should pass ESLint\n\n5:9 - \'Ember\' is not defined. (no-undef)\n6:18 - \'Ember\' is not defined. (no-undef)\n26:14 - \'error\' is defined but never used. (no-unused-vars)');
  });

  QUnit.test('routes/login.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/login.js should pass ESLint\n\n');
  });

  QUnit.test('routes/logout.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/logout.js should pass ESLint\n\n');
  });

  QUnit.test('routes/not-found.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/not-found.js should pass ESLint\n\n21:13 - Unexpected console statement. (no-console)\n29:13 - Unexpected console statement. (no-console)');
  });

  QUnit.test('routes/restaurants.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/restaurants.js should pass ESLint\n\n');
  });

  QUnit.test('routes/restaurants/fooditems.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/restaurants/fooditems.js should pass ESLint\n\n5:9 - \'Ember\' is not defined. (no-undef)\n6:18 - \'Ember\' is not defined. (no-undef)\n20:12 - \'Promise\' is not defined. (no-undef)\n40:9 - Unexpected console statement. (no-console)\n45:43 - \'role\' is defined but never used. (no-unused-vars)\n58:26 - \'Ember\' is not defined. (no-undef)\n62:11 - Unexpected console statement. (no-console)\n68:32 - \'role\' is defined but never used. (no-unused-vars)\n79:9 - Unexpected console statement. (no-console)\n94:9 - Unexpected console statement. (no-console)');
  });

  QUnit.test('routes/restaurants/index.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/restaurants/index.js should pass ESLint\n\n22:14 - \'Promise\' is not defined. (no-undef)\n30:11 - Unexpected console statement. (no-console)\n41:15 - Unexpected console statement. (no-console)');
  });

  QUnit.test('routes/restaurants/low-stock-food.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/restaurants/low-stock-food.js should pass ESLint\n\n5:9 - \'Ember\' is not defined. (no-undef)\n6:18 - \'Ember\' is not defined. (no-undef)\n7:15 - \'transition\' is defined but never used. (no-unused-vars)\n37:42 - \'role\' is defined but never used. (no-unused-vars)\n45:26 - \'Ember\' is not defined. (no-undef)\n49:11 - Unexpected console statement. (no-console)');
  });

  QUnit.test('routes/restaurants/orders-history.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/restaurants/orders-history.js should pass ESLint\n\n5:9 - \'Ember\' is not defined. (no-undef)\n6:18 - \'Ember\' is not defined. (no-undef)\n7:15 - \'transition\' is defined but never used. (no-unused-vars)\n19:9 - Unexpected console statement. (no-console)\n39:39 - \'role\' is defined but never used. (no-unused-vars)\n48:26 - \'Ember\' is not defined. (no-undef)\n52:11 - Unexpected console statement. (no-console)');
  });

  QUnit.test('routes/signup.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/signup.js should pass ESLint\n\n');
  });

  QUnit.test('routes/users/addresses.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/users/addresses.js should pass ESLint\n\n5:9 - \'Ember\' is not defined. (no-undef)\n6:18 - \'Ember\' is not defined. (no-undef)\n28:9 - Unexpected console statement. (no-console)\n39:31 - \'role\' is defined but never used. (no-unused-vars)');
  });

  QUnit.test('routes/users/cart.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/users/cart.js should pass ESLint\n\n5:9 - \'Ember\' is not defined. (no-undef)\n6:18 - \'Ember\' is not defined. (no-undef)\n7:15 - \'transition\' is defined but never used. (no-unused-vars)\n18:5 - Unexpected console statement. (no-console)\n22:9 - Unexpected console statement. (no-console)\n31:9 - Unexpected console statement. (no-console)\n42:28 - \'role\' is defined but never used. (no-unused-vars)');
  });

  QUnit.test('routes/users/order-history.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/users/order-history.js should pass ESLint\n\n5:9 - \'Ember\' is not defined. (no-undef)\n6:18 - \'Ember\' is not defined. (no-undef)\n7:15 - \'transition\' is defined but never used. (no-unused-vars)\n18:5 - Unexpected console statement. (no-console)\n22:9 - Unexpected console statement. (no-console)\n31:9 - Unexpected console statement. (no-console)\n42:28 - \'role\' is defined but never used. (no-unused-vars)');
  });

  QUnit.test('routes/users/profile.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/users/profile.js should pass ESLint\n\n5:9 - \'Ember\' is not defined. (no-undef)\n6:18 - \'Ember\' is not defined. (no-undef)\n7:15 - \'transition\' is defined but never used. (no-unused-vars)\n17:12 - \'Promise\' is not defined. (no-undef)\n28:7 - Unexpected console statement. (no-console)\n52:14 - \'error\' is defined but never used. (no-unused-vars)');
  });

  QUnit.test('services/access-control.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/access-control.js should pass ESLint\n\n');
  });

  QUnit.test('services/user.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/user.js should pass ESLint\n\n');
  });
});
define('tamil-kitchen-app/tests/helpers/destroy-app', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = destroyApp;
  function destroyApp(application) {
    Ember.run(application, 'destroy');
  }
});
define('tamil-kitchen-app/tests/helpers/ember-power-select', ['exports', 'ember-power-select/test-support/helpers'], function (exports, _helpers) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.selectChoose = exports.touchTrigger = exports.nativeTouch = exports.clickTrigger = exports.typeInSearch = exports.triggerKeydown = exports.nativeMouseUp = exports.nativeMouseDown = exports.findContains = undefined;
  exports.default = deprecatedRegisterHelpers;


  function deprecateHelper(fn, name) {
    return function () {
      (true && !(false) && Ember.deprecate('DEPRECATED `import { ' + name + ' } from \'../../tests/helpers/ember-power-select\';` is deprecated. Please, replace it with `import { ' + name + ' } from \'ember-power-select/test-support/helpers\';`', false, { until: '1.11.0', id: 'ember-power-select-test-support-' + name }));

      return fn.apply(undefined, arguments);
    };
  }

  var findContains = deprecateHelper(_helpers.findContains, 'findContains');
  var nativeMouseDown = deprecateHelper(_helpers.nativeMouseDown, 'nativeMouseDown');
  var nativeMouseUp = deprecateHelper(_helpers.nativeMouseUp, 'nativeMouseUp');
  var triggerKeydown = deprecateHelper(_helpers.triggerKeydown, 'triggerKeydown');
  var typeInSearch = deprecateHelper(_helpers.typeInSearch, 'typeInSearch');
  var clickTrigger = deprecateHelper(_helpers.clickTrigger, 'clickTrigger');
  var nativeTouch = deprecateHelper(_helpers.nativeTouch, 'nativeTouch');
  var touchTrigger = deprecateHelper(_helpers.touchTrigger, 'touchTrigger');
  var selectChoose = deprecateHelper(_helpers.selectChoose, 'selectChoose');

  function deprecatedRegisterHelpers() {
    (true && !(false) && Ember.deprecate("DEPRECATED `import registerPowerSelectHelpers from '../../tests/helpers/ember-power-select';` is deprecated. Please, replace it with `import registerPowerSelectHelpers from 'ember-power-select/test-support/helpers';`", false, { until: '1.11.0', id: 'ember-power-select-test-support-register-helpers' }));

    return (0, _helpers.default)();
  }

  exports.findContains = findContains;
  exports.nativeMouseDown = nativeMouseDown;
  exports.nativeMouseUp = nativeMouseUp;
  exports.triggerKeydown = triggerKeydown;
  exports.typeInSearch = typeInSearch;
  exports.clickTrigger = clickTrigger;
  exports.nativeTouch = nativeTouch;
  exports.touchTrigger = touchTrigger;
  exports.selectChoose = selectChoose;
});
define('tamil-kitchen-app/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'tamil-kitchen-app/tests/helpers/start-app', 'tamil-kitchen-app/tests/helpers/destroy-app'], function (exports, _qunit, _startApp, _destroyApp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (name) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _startApp.default)();

        if (options.beforeEach) {
          return options.beforeEach.apply(this, arguments);
        }
      },
      afterEach: function afterEach() {
        var _this = this;

        var afterEach = options.afterEach && options.afterEach.apply(this, arguments);
        return resolve(afterEach).then(function () {
          return (0, _destroyApp.default)(_this.application);
        });
      }
    });
  };

  var resolve = Ember.RSVP.resolve;
});
define('tamil-kitchen-app/tests/helpers/resolver', ['exports', 'tamil-kitchen-app/resolver', 'tamil-kitchen-app/config/environment'], function (exports, _resolver, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var resolver = _resolver.default.create();

  resolver.namespace = {
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix
  };

  exports.default = resolver;
});
define('tamil-kitchen-app/tests/helpers/start-app', ['exports', 'tamil-kitchen-app/app', 'tamil-kitchen-app/config/environment'], function (exports, _app, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = startApp;
  function startApp(attrs) {
    var attributes = Ember.merge({}, _environment.default.APP);
    attributes = Ember.merge(attributes, attrs); // use defaults, but you can override;

    return Ember.run(function () {
      var application = _app.default.create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
      return application;
    });
  }
});
define('tamil-kitchen-app/tests/integration/components/orders-component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('orders-component', 'Integration | Component | orders component', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "sWS127Sy",
      "block": "{\"statements\":[[1,[26,[\"orders-component\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "jbqH67+8",
      "block": "{\"statements\":[[0,\"\\n\"],[6,[\"orders-component\"],null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"locals\":[]},null],[0,\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('tamil-kitchen-app/tests/integration/components/side-bar-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('side-bar', 'Integration | Component | side bar', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "xnoP9jrK",
      "block": "{\"statements\":[[1,[26,[\"side-bar\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "YG31HFCn",
      "block": "{\"statements\":[[0,\"\\n\"],[6,[\"side-bar\"],null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"locals\":[]},null],[0,\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('tamil-kitchen-app/tests/integration/components/tamil-kitchen-header-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('tamil-kitchen-header', 'Integration | Component | tamil kitchen header', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "z5AaXAQz",
      "block": "{\"statements\":[[1,[26,[\"tamil-kitchen-header\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "+vlHU4tK",
      "block": "{\"statements\":[[0,\"\\n\"],[6,[\"tamil-kitchen-header\"],null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"locals\":[]},null],[0,\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('tamil-kitchen-app/tests/integration/helpers/and-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('and', 'helper:and', {
    integration: true
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it renders', function (assert) {
    this.set('inputValue', '1234');

    this.render(Ember.HTMLBars.template({
      "id": "etSau6Tt",
      "block": "{\"statements\":[[1,[33,[\"and\"],[[28,[\"inputValue\"]]],null],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '1234');
  });
});
define('tamil-kitchen-app/tests/integration/helpers/eq-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('eq', 'helper:eq', {
    integration: true
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it renders', function (assert) {
    this.set('inputValue', '1234');

    this.render(Ember.HTMLBars.template({
      "id": "1SYOrDlN",
      "block": "{\"statements\":[[1,[33,[\"eq\"],[[28,[\"inputValue\"]]],null],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '1234');
  });
});
define('tamil-kitchen-app/tests/integration/helpers/format-date-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('format-date', 'helper:format-date', {
    integration: true
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it renders', function (assert) {
    this.set('inputValue', '1234');

    this.render(Ember.HTMLBars.template({
      "id": "+/CCj5S3",
      "block": "{\"statements\":[[1,[33,[\"format-date\"],[[28,[\"inputValue\"]]],null],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '1234');
  });
});
define('tamil-kitchen-app/tests/integration/helpers/format-number-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('format-number', 'helper:format-number', {
    integration: true
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it renders', function (assert) {
    this.set('inputValue', '1234');

    this.render(Ember.HTMLBars.template({
      "id": "UVXwomh4",
      "block": "{\"statements\":[[1,[33,[\"format-number\"],[[28,[\"inputValue\"]]],null],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '1234');
  });
});
define('tamil-kitchen-app/tests/integration/helpers/gt-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('gt', 'helper:gt', {
    integration: true
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it renders', function (assert) {
    this.set('inputValue', '1234');

    this.render(Ember.HTMLBars.template({
      "id": "06IyGDRK",
      "block": "{\"statements\":[[1,[33,[\"gt\"],[[28,[\"inputValue\"]]],null],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '1234');
  });
});
define('tamil-kitchen-app/tests/integration/helpers/neq-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('neq', 'helper:neq', {
    integration: true
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it renders', function (assert) {
    this.set('inputValue', '1234');

    this.render(Ember.HTMLBars.template({
      "id": "XScZrfen",
      "block": "{\"statements\":[[1,[33,[\"neq\"],[[28,[\"inputValue\"]]],null],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '1234');
  });
});
define('tamil-kitchen-app/tests/integration/helpers/or-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('or', 'helper:or', {
    integration: true
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it renders', function (assert) {
    this.set('inputValue', '1234');

    this.render(Ember.HTMLBars.template({
      "id": "l5tNo+6p",
      "block": "{\"statements\":[[1,[33,[\"or\"],[[28,[\"inputValue\"]]],null],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '1234');
  });
});
define('tamil-kitchen-app/tests/test-helper', ['tamil-kitchen-app/tests/helpers/resolver', 'ember-qunit', 'ember-cli-qunit'], function (_resolver, _emberQunit, _emberCliQunit) {
  'use strict';

  (0, _emberQunit.setResolver)(_resolver.default);
  (0, _emberCliQunit.start)();
});
define('tamil-kitchen-app/tests/tests.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | tests');

  QUnit.test('helpers/destroy-app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/module-for-acceptance.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/start-app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/orders-component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/orders-component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/side-bar-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/side-bar-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/tamil-kitchen-header-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/tamil-kitchen-header-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/helpers/and-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/helpers/and-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/helpers/eq-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/helpers/eq-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/helpers/format-date-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/helpers/format-date-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/helpers/format-number-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/helpers/format-number-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/helpers/gt-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/helpers/gt-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/helpers/neq-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/helpers/neq-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/helpers/or-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/helpers/or-test.js should pass ESLint\n\n');
  });

  QUnit.test('test-helper.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/fooditems-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/fooditems-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/user/addresses-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/user/addresses-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/user/profile-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/user/profile-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/users/profile-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/users/profile-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/mixins/my-mixin-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/mixins/my-mixin-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/access-denied-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/access-denied-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/admin/dashboard-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/admin/dashboard-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/admin/food-details-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/admin/food-details-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/admin/fooditems-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/admin/fooditems-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/admin/low-stock-food-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/admin/low-stock-food-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/admin/orders-history-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/admin/orders-history-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/details-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/details-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/food-details-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/food-details-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/login-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/login-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/not-found-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/not-found-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/pending-orders-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/pending-orders-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/restaurants-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/restaurants-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/signup-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/signup-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/users/addresses-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/users/addresses-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/users/cart-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/users/cart-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/users/order-history-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/users/order-history-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/users/profile-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/users/profile-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/services/access-control-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/access-control-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/services/api-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/api-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/services/restaurant-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/restaurant-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/services/user-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/user-test.js should pass ESLint\n\n');
  });
});
define('tamil-kitchen-app/tests/unit/controllers/fooditems-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:fooditems', 'Unit | Controller | fooditems', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('tamil-kitchen-app/tests/unit/controllers/user/addresses-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:user/addresses', 'Unit | Controller | user/addresses', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('tamil-kitchen-app/tests/unit/controllers/user/profile-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:user/profile', 'Unit | Controller | user/profile', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('tamil-kitchen-app/tests/unit/controllers/users/profile-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:users/profile', 'Unit | Controller | users/profile', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('tamil-kitchen-app/tests/unit/mixins/my-mixin-test', ['tamil-kitchen-app/mixins/my-mixin', 'qunit'], function (_myMixin, _qunit) {
  'use strict';

  (0, _qunit.module)('Unit | Mixin | my mixin');

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    var MyMixinObject = Ember.Object.extend(_myMixin.default);
    var subject = MyMixinObject.create();
    assert.ok(subject);
  });
});
define('tamil-kitchen-app/tests/unit/routes/access-denied-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:access-denied', 'Unit | Route | access denied', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('tamil-kitchen-app/tests/unit/routes/admin/dashboard-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:admin/dashboard', 'Unit | Route | admin/dashboard', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('tamil-kitchen-app/tests/unit/routes/admin/food-details-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:admin/food-details', 'Unit | Route | admin/food details', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('tamil-kitchen-app/tests/unit/routes/admin/fooditems-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:admin/fooditems', 'Unit | Route | admin/fooditems', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('tamil-kitchen-app/tests/unit/routes/admin/low-stock-food-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:admin/low-stock-food', 'Unit | Route | admin/low stock food', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('tamil-kitchen-app/tests/unit/routes/admin/orders-history-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:admin/orders', 'Unit | Route | admin/orders', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('tamil-kitchen-app/tests/unit/routes/details-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:details', 'Unit | Route | details', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('tamil-kitchen-app/tests/unit/routes/food-details-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:food-details', 'Unit | Route | food details', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('tamil-kitchen-app/tests/unit/routes/login-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:login', 'Unit | Route | login', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('tamil-kitchen-app/tests/unit/routes/not-found-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:not-found', 'Unit | Route | not found', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('tamil-kitchen-app/tests/unit/routes/pending-orders-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:pending-orders', 'Unit | Route | pending orders', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('tamil-kitchen-app/tests/unit/routes/restaurants-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:restaurants', 'Unit | Route | restaurants', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('tamil-kitchen-app/tests/unit/routes/signup-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:signup', 'Unit | Route | signup', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('tamil-kitchen-app/tests/unit/routes/users/addresses-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:users/addresses', 'Unit | Route | users/addresses', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('tamil-kitchen-app/tests/unit/routes/users/cart-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:users/cart', 'Unit | Route | users/cart', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('tamil-kitchen-app/tests/unit/routes/users/order-history-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:users/order-history', 'Unit | Route | users/order history', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('tamil-kitchen-app/tests/unit/routes/users/profile-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:users/profile', 'Unit | Route | users/profile', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('tamil-kitchen-app/tests/unit/services/access-control-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('service:access-control', 'Unit | Service | access control', {
    // Specify the other units that are required for this test.
    // needs: ['service:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var service = this.subject();
    assert.ok(service);
  });
});
define('tamil-kitchen-app/tests/unit/services/api-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('service:api', 'Unit | Service | api', {
    // Specify the other units that are required for this test.
    // needs: ['service:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var service = this.subject();
    assert.ok(service);
  });
});
define('tamil-kitchen-app/tests/unit/services/restaurant-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('service:restaurant', 'Unit | Service | restaurant', {
    // Specify the other units that are required for this test.
    // needs: ['service:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var service = this.subject();
    assert.ok(service);
  });
});
define('tamil-kitchen-app/tests/unit/services/user-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('service:user', 'Unit | Service | user', {
    // Specify the other units that are required for this test.
    // needs: ['service:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var service = this.subject();
    assert.ok(service);
  });
});
require('tamil-kitchen-app/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
