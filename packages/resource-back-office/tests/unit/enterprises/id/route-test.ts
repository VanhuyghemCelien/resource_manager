import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | enterprises/id', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:enterprises/id');
    assert.ok(route);
  });
});
