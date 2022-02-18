import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | roles/id', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:roles/id');
    assert.ok(route);
  });
});
