import { action } from '@ember/object';
import type { BaseFormArgs } from 'ember-form-changeset-validations/components/form';
import BaseForm from 'ember-form-changeset-validations/components/form';

export interface FormsAssignmentTypeDTO {
  assignmentType: string;
  name: string;
  color: string;
}

interface FormsAssignmentTypeArgs
  extends BaseFormArgs<FormsAssignmentTypeDTO> {}

export default class FormsAssignmentType extends BaseForm<
  FormsAssignmentTypeArgs,
  FormsAssignmentTypeDTO
> {
  @action changeInput(field: string, value: string) {
    this.args.changeset.set(field as keyof FormsAssignmentTypeDTO, value);
  }
}
