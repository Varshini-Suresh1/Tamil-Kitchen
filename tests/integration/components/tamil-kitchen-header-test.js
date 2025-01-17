import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tamil-kitchen-header', 'Integration | Component | tamil kitchen header', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{tamil-kitchen-header}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#tamil-kitchen-header}}
      template block text
    {{/tamil-kitchen-header}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
