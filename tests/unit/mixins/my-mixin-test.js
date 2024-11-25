import Ember from 'ember';
import MyMixinMixin from 'tamil-kitchen-app/mixins/my-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | my mixin');

// Replace this with your real tests.
test('it works', function(assert) {
  let MyMixinObject = Ember.Object.extend(MyMixinMixin);
  let subject = MyMixinObject.create();
  assert.ok(subject);
});
