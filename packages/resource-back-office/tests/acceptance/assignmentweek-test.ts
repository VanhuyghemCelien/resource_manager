import {
  click,
  visit,
  select,
  fillIn,
  triggerEvent,
  waitFor,
} from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Acceptance | posts', function (hooks) {
  setupApplicationTest(hooks);

  test('add enterprise', async function (assert) {
    await visit('/enterprises');
    await click('[data-test-input="addEnterprises"]');
    await fillIn('[data-test-input="name"]', 'testEnterprise');
    await fillIn('[data-test-input="city"]', 'testTown');
    await fillIn('[data-test-input="address"]', '64 avenue du test');
    await fillIn('[data-test-input="emailAddress"]', 'info@test.be');
    await fillIn('[data-test-input="phoneNumber"]', '0476786734');
    await click('[data-test-submit="saveEnterprise"]');
    assert.dom('[data-test-validated="validated"]').exists();
  });

  test('add resources', async function (assert) {
    await visit('/resources');
    await click('[data-test-resources="addResourceButton"]');
    await triggerEvent('[data-test-input="resourceImage"]', 'change', {
      files: [
        new File(['Ember Rules!'], 'ember-rules.png', { type: 'image/png' }),
      ],
    });
    await fillIn('[data-test-input="resourceFirstName"]', 'Test');
    await fillIn('[data-test-input="resourceLastName"]', 'Test');
    await fillIn('[data-test-input="resourceMail"]', 'test@user.be');
    await fillIn('[data-test-input="resourcePhone"]', '0478967314');
    await select('[data-test-select="enterprisesSelect"]', 'testEnterprise');
    await waitFor('[data-test-input="saveResource"]', { timeout: 1000 });
    await click('[data-test-input="saveResource"]');
    await waitFor('[data-test-resources="addResourceButton"]', {
      timeout: 1000,
    });
    assert.dom('[data-test-resources="addResourceButton"]').exists();
  });

  test('add assignment type', async function (assert) {
    await visit('/assignment-type');
    await click('[data-test-input="addType"]');
    await fillIn('[data-test-input="typeName"]', 'Formation');
    await click('[data-test-input="typeCheckbox"]');
    await click('[data-test-input="saveType"]');
    assert.dom('[data-test-typeName="typeName"]').exists();
  });

  test('add assignment title', async function (assert) {
    await visit('/assignment-type');
    await click('[data-test-input="addTitle"]');
    await select('[data-test-select="typeSelectTitle"]', 'Formation');
    await fillIn('[data-test-input="titleName"]', 'EmberJS');
    await triggerEvent('[data-test-input="colorTitle"]', 'change', {
      value: '#ff568a',
    });
    await click('[data-test-input="saveTitle"]');
    assert.dom('[data-test-typeName="typeName"]').exists();
  });

  test('add Assignment', async function (assert) {
    await visit('/dashboard');
    await click('[data-test-input="goMonth"]');
    await click('[data-test-input="2"]');
    await select('[data-test-select="typeSelect"]', 'TestType');
    await waitFor('[data-test-select="titleSelect"]', { timeout: 1000 });
    await select('[data-test-select="titleSelect"]', 'TestTitle');
    await click('[data-test-input="addEnterprises2"]');
    await fillIn('[data-test-input="name"]', 'testEnterprise2');
    await fillIn('[data-test-input="city"]', 'testTown2');
    await fillIn('[data-test-input="address"]', '64 avenue du test2');
    await fillIn('[data-test-input="emailAddress"]', 'info2@test.be');
    await fillIn('[data-test-input="phoneNumber"]', '0476786732');
    await click('[data-test-submit = "saveEnterprise"]');
    await select('[data-test-select="enterprisesSelect2"]', 'testEnterprise');
    await click('[data-test-input="remote"]');
    await click('[data-test-input="comment"]');
    await fillIn('[data-test-input="commentText"]', 'test de commentaire');
    await click('[data-test-input="saveAssignment"]');
    assert.dom('[data-test-input="2"]').containsText('-');
    await click('[data-test-input="nextWeek"]');
    assert
      .dom('[data-test-input="2"]')
      .hasText('', 'great, the queryparams test works');
  });
});
