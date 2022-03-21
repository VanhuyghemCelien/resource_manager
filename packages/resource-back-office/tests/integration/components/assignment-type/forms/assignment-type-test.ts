import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { Changeset } from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import Validation from 'ember-boilerplate/validator/forms/assignment-type';
import type { TypedBufferedChangeset } from 'ember-form-changeset-validations';

module('Integration | Component | FormsAssignmentType', function (hooks) {
  setupRenderingTest(hooks);

  test('Create (empty changeset)', async function (assert) {
    assert.expect(0);
    this.set(
      'changeset',
      Changeset(
        {
          assignmentType: '',
          name: '',
          color: '',
        } as Record<keyof typeof Validation, unknown>,
        lookupValidator(Validation),
        Validation
      )
    );

    this.set('saveFunction', (changeset: TypedBufferedChangeset) => {
      assert.step('saveFunction');
      assert.strictEqual(changeset.get('assignmentType'), '');
    });
  });

  test('Edit (populated changeset)', async function (assert) {
    assert.expect(0);
    this.set(
      'changeset',
      Changeset(
        {
          assignmentType: '',
          name: '',
          color: '',
        } as Record<keyof typeof Validation, unknown>,
        lookupValidator(Validation),
        Validation
      )
    );

    this.set('saveFunction', (changeset: TypedBufferedChangeset) => {
      assert.step('saveFunction');
      assert.strictEqual(changeset.get('assignmentType'), '');
    });
  });
});
