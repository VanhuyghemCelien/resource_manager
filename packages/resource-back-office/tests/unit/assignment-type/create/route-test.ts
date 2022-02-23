import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | assignment-type/create', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:assignment-type/create');
    assert.ok(route);
  });
});
