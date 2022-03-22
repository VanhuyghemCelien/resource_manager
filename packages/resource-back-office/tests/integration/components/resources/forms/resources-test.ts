import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { Changeset } from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import Validation from 'ember-boilerplate/validator/forms/resources';
import type { TypedBufferedChangeset } from 'ember-form-changeset-validations';

module('Integration | Component | FormsResources', function (hooks) {
  setupRenderingTest(hooks);

  test('Create (empty changeset)', async function (assert) {
    assert.expect(0);
    this.set(
      'changeset',
      Changeset(
        {
          firstName: '',
          lastName: '',
          emailAddress: '',
          emailAddress2: '',
          phoneNumber: '',
          phoneNumber2: '',
          enterprise: '',
          cost: '',
        } as Record<keyof typeof Validation, unknown>,
        lookupValidator(Validation),
        Validation
      )
    );

    this.set('saveFunction', (changeset: TypedBufferedChangeset) => {
      assert.step('saveFunction');
      assert.strictEqual(changeset.get('firstName'), 'Prénom');
      assert.strictEqual(changeset.get('lastName'), 'Nom');
      assert.strictEqual(changeset.get('emailAddress'), 'prenom.nom@test.test');
      assert.strictEqual(
        changeset.get('emailAddress2'),
        'nom.prenom@test.test'
      );
      assert.strictEqual(changeset.get('phoneNumber'), '+32 477/04.46.51');
      assert.strictEqual(changeset.get('phoneNumber2'), '+32 477/04.46.52');
      assert.strictEqual(changeset.get('enterprise'), 'TRIPTYK');
      assert.strictEqual(changeset.get('cost'), '10');
    });
  });

  test('Edit (populated changeset)', async function (assert) {
    assert.expect(0);
    this.set(
      'changeset',
      Changeset(
        {
          firstName: 'Nom',
          lastName: 'Prénom',
          emailAddress: 'prenom.nom@test.test',
          emailAddress2: 'nom.prenom@test.test',
          phoneNumber: '+32 477/04.46.51',
          phoneNumber2: '+32 477/04.46.52',
          enterprise: 'TRIPTYK',
          cost: '10',
        } as Record<keyof typeof Validation, unknown>,
        lookupValidator(Validation),
        Validation
      )
    );

    this.set('saveFunction', (changeset: TypedBufferedChangeset) => {
      assert.step('saveFunction');
      assert.strictEqual(changeset.get('firstName'), 'Prénom');
      assert.strictEqual(changeset.get('lastName'), 'Nom');
    });
  });
});
