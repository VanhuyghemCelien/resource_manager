import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { Changeset } from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import EnterpriseValidation from 'ember-boilerplate/validator/forms/enterprise';
import type { TypedBufferedChangeset } from 'ember-form-changeset-validations';
import click from '@ember/test-helpers/dom/click';
import fillIn from '@ember/test-helpers/dom/fill-in';

module('Integration | Component | FormsEnterprise', function (hooks) {
  setupRenderingTest(hooks);

  test('Create (empty changeset)', async function (assert) {
    assert.expect(20);
    this.set(
      'changeset',
      Changeset(
        {
          name: '',
          city: '',
          address: '',
          emailAddress: '',
          phoneNumber: '',
          emailAddress2: '',
          phoneNumber2: '',
          enterpriseNumber: '',
          vatNumber: '',
        } as Record<keyof typeof EnterpriseValidation, unknown>,
        lookupValidator(EnterpriseValidation),
        EnterpriseValidation
      )
    );

    this.set('saveFunction', (changeset: TypedBufferedChangeset) => {
      assert.step('saveFunction');
      assert.strictEqual(changeset.get('name'), 'Triptyk');
      assert.strictEqual(changeset.get('city'), 'Mons');
      assert.strictEqual(changeset.get('address'), 'Chaussée de Binche, 177A');
      assert.strictEqual(changeset.get('emailAddress'), 'tpk@tpk.be');
      assert.strictEqual(changeset.get('phoneNumber'), '+32 477/04.46.51');
      assert.strictEqual(changeset.get('emailAddress2'), 'tpk2@tpk.be');
      assert.strictEqual(changeset.get('phoneNumber2'), '+32 477/04.46.52');
      assert.strictEqual(changeset.get('enterpriseNumber'), '0123456789');
      assert.strictEqual(changeset.get('vatNumber'), 'BE0123456789');
    });

    await render(
      hbs`<Forms::Enterprise @popupName="Test enterprise" @popupType="new" @changeset={{this.changeset}} @saveFunction={{this.saveFunction}} />`
    );

    assert.dom('[data-test-input="name"]').hasValue('');
    assert.dom('[data-test-input="city"]').hasValue('');
    assert.dom('[data-test-input="address"]').hasValue('');
    assert.dom('[data-test-input="emailAddress"]').hasValue('');
    assert.dom('[data-test-input="phoneNumber"]').hasValue('');
    assert.dom('[data-test-input="emailAddress2"]').hasValue('');
    assert.dom('[data-test-input="phoneNumber2"]').hasValue('');
    assert.dom('[data-test-input="enterpriseNumber"]').hasValue('');
    assert.dom('[data-test-input="vatNumber"]').hasValue('');

    await fillIn('[data-test-input="name"]', 'Triptyk');
    await fillIn('[data-test-input="city"]', 'Mons');
    await fillIn('[data-test-input="address"]', 'Chaussée de Binche, 177A');
    await fillIn('[data-test-input="emailAddress"]', 'tpk@tpk.be');
    await fillIn('[data-test-input="phoneNumber"]', '+32 477/04.46.51');
    await fillIn('[data-test-input="emailAddress2"]', 'tpk2@tpk.be');
    await fillIn('[data-test-input="phoneNumber2"]', '+32 477/04.46.52');
    await fillIn('[data-test-input="enterpriseNumber"]', '0123456789');
    await fillIn('[data-test-input="vatNumber"]', 'BE0123456789');

    await click("button[type='submit']");
    assert.verifySteps(['saveFunction']);
  });

  test('Edit (populated changeset)', async function (assert) {
    assert.expect(20);
    this.set(
      'changeset',
      Changeset(
        {
          name: 'Triptyk',
          city: 'Mons',
          address: 'Chaussée de Binche, 177A',
          emailAddress: 'tpk@tpk.be',
          phoneNumber: '+32 477/04.46.51',
          emailAddress2: 'tpk2@tpk.be',
          phoneNumber2: '+32 477/04.46.52',
          enterpriseNumber: '0123456789',
          vatNumber: 'BE0123456789',
        } as Record<keyof typeof EnterpriseValidation, unknown>,
        lookupValidator(EnterpriseValidation),
        EnterpriseValidation
      )
    );

    this.set('saveFunction', (changeset: TypedBufferedChangeset) => {
      assert.step('saveFunction');
      assert.strictEqual(changeset.get('name'), 'TriptykEdited');
      assert.strictEqual(changeset.get('city'), 'MonsEdited');
      assert.strictEqual(
        changeset.get('address'),
        'Chaussée de Binche, 177AEdited'
      );
      assert.strictEqual(changeset.get('emailAddress'), 'tpkEdited@tpk.be');
      assert.strictEqual(changeset.get('phoneNumber'), '+32 477/04.46.53');
      assert.strictEqual(changeset.get('emailAddress2'), 'tpk2Edited@tpk.be');
      assert.strictEqual(changeset.get('phoneNumber2'), '+32 477/04.46.54');
      assert.strictEqual(changeset.get('enterpriseNumber'), '0123456780');
      assert.strictEqual(changeset.get('vatNumber'), 'BE0123456780');
    });

    await render(
      hbs`<Forms::Enterprise @popupName="Test enterprise" @popupType="new" @changeset={{this.changeset}} @saveFunction={{this.saveFunction}} />`
    );

    assert.dom('[data-test-input="name"]').hasValue('Triptyk');
    assert.dom('[data-test-input="city"]').hasValue('Mons');
    assert
      .dom('[data-test-input="address"]')
      .hasValue('Chaussée de Binche, 177A');
    assert.dom('[data-test-input="emailAddress"]').hasValue('tpk@tpk.be');
    assert.dom('[data-test-input="phoneNumber"]').hasValue('+32 477/04.46.51');
    assert.dom('[data-test-input="emailAddress2"]').hasValue('tpk2@tpk.be');
    assert.dom('[data-test-input="phoneNumber2"]').hasValue('+32 477/04.46.52');
    assert.dom('[data-test-input="enterpriseNumber"]').hasValue('0123456789');
    assert.dom('[data-test-input="vatNumber"]').hasValue('BE0123456789');

    await fillIn('[data-test-input="name"]', 'TriptykEdited');
    await fillIn('[data-test-input="city"]', 'MonsEdited');
    await fillIn(
      '[data-test-input="address"]',
      'Chaussée de Binche, 177AEdited'
    );
    await fillIn('[data-test-input="emailAddress"]', 'tpkEdited@tpk.be');
    await fillIn('[data-test-input="phoneNumber"]', '+32 477/04.46.53');
    await fillIn('[data-test-input="emailAddress2"]', 'tpk2Edited@tpk.be');
    await fillIn('[data-test-input="phoneNumber2"]', '+32 477/04.46.54');
    await fillIn('[data-test-input="enterpriseNumber"]', '0123456780');
    await fillIn('[data-test-input="vatNumber"]', 'BE0123456780');

    await click("button[type='submit']");
    assert.verifySteps(['saveFunction']);
  });
});
