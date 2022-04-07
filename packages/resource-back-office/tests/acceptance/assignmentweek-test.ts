import {
  click,
  visit,
  select,
  fillIn,
  triggerEvent,
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
    await click('[data-test-submit = "saveEnterprise"]');
    assert
      .dom('[data-test-validated="validated"]')
      .exists()
      .hasText('testTown', 'great, the enterprises test works');
  });

  test('add resources', async function (assert) {
    await visit('/resources');
    await click('[data-test-enterprises="addResourceButton"]');
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
    await click('[data-test-input="saveResource"]');
    assert
      .dom('[data-test-validated="validated"]')
      .exists()
      .hasText('testEnterprise - testTown', 'great, the resources test works');
  });

  test('add Assignment', async function (assert) {
    await visit('/dashboard');
    await click('[data-test-input="goMonth"]');
    await click('[data-test-input="2"]');
    await click('[data-test-input="addAssignmentType"]');
    await fillIn('[data-test-input="typeName"]', 'TestType');
    await click('[data-test-input="typeCheckbox"]');
    await click('[data-test-input="saveType"]');
    await select('[data-test-select="typeSelect"]', 'TestType');
    await click('[data-test-input="addAssignmentTitle"]');
    await select('[data-test-select="typeSelectTitle"]', 'TestType');
    await fillIn('[data-test-input="titleName"]', 'TestTitle');
    await document
      .getElementById('colorTitleInput')!
      .setAttribute('value', '#ff0000');
    await click('[data-test-input="saveTitle"]');
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
