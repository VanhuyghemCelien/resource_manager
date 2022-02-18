import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | roles', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:roles');
    assert.ok(route);
  });
});
