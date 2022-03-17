import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { Changeset } from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import Validation from 'ember-boilerplate/validator/forms/enterprise';
import type { TypedBufferedChangeset } from 'ember-form-changeset-validations';

module('Integration | Component | FormsEnterprise', function (hooks) {
  setupRenderingTest(hooks);

  test('Create (empty changeset)', async function (assert) {
    assert.expect(0);
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
        } as Record<keyof typeof Validation, unknown>,
        lookupValidator(Validation),
        Validation
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
  });

  test('Edit (populated changeset)', async function (assert) {
    assert.expect(0);
    this.set(
      'changeset',
      Changeset(
        {
          name: 'Technocité',
          city: 'Mons',
          address: 'Chaussée de Binche, 177A',
          emailAddress: 'tpk@tpk.be',
          phoneNumber: '+32 477/04.46.51',
          emailAddress2: 'tpk2@tpk.be',
          phoneNumber2: '+32 477/04.46.52',
          enterpriseNumber: '0123456789',
          vatNumber: 'BE0123456789',
        } as Record<keyof typeof Validation, unknown>,
        lookupValidator(Validation),
        Validation
      )
    );

    this.set('saveFunction', (changeset: TypedBufferedChangeset) => {
      assert.step('saveFunction');
      assert.strictEqual(changeset.get('name'), 'Triptyk');
    });
  });
});
