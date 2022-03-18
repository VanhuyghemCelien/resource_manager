import { action } from '@ember/object';
import type { BaseFormArgs } from 'ember-form-changeset-validations/components/form';
import BaseForm from 'ember-form-changeset-validations/components/form';

export interface FormsAssignmentDTO {
  resource: string;
  enterprise: string;
  assignmentType: string;
  date: Date;
  isMorning: boolean;
  isAfternoon: boolean;
  isRemote: boolean;
  comment: string;
}

interface FormsAssignmentArgs extends BaseFormArgs<FormsAssignmentDTO> {}

export default class FormsAssignment extends BaseForm<
  FormsAssignmentArgs,
  FormsAssignmentDTO
> {
  @action changeInput(field: string, value: string) {
    this.args.changeset.set(field as keyof FormsAssignmentDTO, value);
  }
}
