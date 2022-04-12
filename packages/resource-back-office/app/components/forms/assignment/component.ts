import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import type AssignmentTypeModel from 'ember-boilerplate/models/assignment-type';
import type EnterpriseModel from 'ember-boilerplate/models/enterprise';
import type ResourceModel from 'ember-boilerplate/models/resource';
import type { BaseFormArgs } from 'ember-form-changeset-validations/components/form';
import BaseForm from 'ember-form-changeset-validations/components/form';

export interface FormsAssignmentDTO {
  resource: ResourceModel;
  enterprise: EnterpriseModel;
  assignmentType: AssignmentTypeModel;
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
  @tracked comment: boolean = false;
  @action changeInput(field: string, value: string) {
    this.args.changeset.set(field as keyof FormsAssignmentDTO, value);
  }
  @action selectedMorning() {
    if (this.args.changeset.get('isMorning')) {
      this.args.changeset.set('isMorning', false);
    } else {
      this.args.changeset.set('isMorning', true);
    }
    console.log(this.args.changeset.get('isMorning'));
  }
  @action selectedAfternoon() {
    if (this.args.changeset.get('isAfternoon')) {
      this.args.changeset.set('isAfternoon', false);
    } else {
      this.args.changeset.set('isAfternoon', true);
    }
    console.log(this.args.changeset.get('isAfternoon'));
  }
  @action toggleComment() {
    if (this.comment) {
      this.comment = false;
    } else {
      this.comment = true;
    }
  }
  @action saveFunction() {
    console.log(this.args.changeset.get('isMorning'));
  }
}
