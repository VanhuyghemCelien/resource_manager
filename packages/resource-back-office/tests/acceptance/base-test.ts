import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | base', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /resources', async function (assert) {
    await visit('/dashboard/month/1');
    await click('[data-test-letestdesacha]');

    assert.strictEqual(currentURL(), '/resources');
  });
});
