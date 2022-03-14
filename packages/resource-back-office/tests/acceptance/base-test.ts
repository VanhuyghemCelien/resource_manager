import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { click, currentURL, visit } from '@ember/test-helpers';

module('Acceptance | base', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /resources', async function (assert) {
    assert.expect(1);

    await visit('/dashboard/month/1');
    await click('[data-test-linktousers]');

    assert.strictEqual(currentURL(), '/users');
  });
});
