import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | enterprises', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:enterprises');
    assert.ok(route);
  });
});
