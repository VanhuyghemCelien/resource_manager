import type Store from '@ember-data/store';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import type AssignmentTypeModel from 'ember-boilerplate/models/assignment-type';
import type { BaseFormArgs } from 'ember-form-changeset-validations/components/form';
import BaseForm from 'ember-form-changeset-validations/components/form';

export interface FormsAssignmentTypeDTO {
  parents: AssignmentTypeModel | undefined;
  name: string;
  color: string | undefined;
}

interface FormsAssignmentTypeArgs extends BaseFormArgs<FormsAssignmentTypeDTO> {
  isColorChecked: boolean;
  type: string;
  parentsOption: AssignmentTypeModel[];
}

export default class FormsAssignmentType extends BaseForm<
  FormsAssignmentTypeArgs,
  FormsAssignmentTypeDTO
> {
  @service declare store: Store;
  @tracked isParentSelected: boolean = false;
  @action changeInput(field: string, value: string) {
    this.args.changeset.set(field as keyof FormsAssignmentTypeDTO, value);
  }
  @action changeColor(event: { target: { value: string } }) {
    this.args.changeset.set('color', event.target.value);
  }
  @action
  async changeParents(event: { target: { value: string } }) {
    this.args.changeset.set('parents', event.target.value);
    const parent = await this.store.queryRecord('assignment-type', {
      id: event.target.value,
    });
    if (parent.get('color')) {
      this.isParentSelected = false;
    } else {
      this.isParentSelected = true;
    }
  }
  @action validate(event: Event) {
    event.preventDefault();
    if (this.args.isColorChecked) {
      this.args.changeset.set('color', undefined);
    }
    if (this.args.type === 'type') {
      this.args.changeset.set('parents', undefined);
    }
    console.log('Name: ' + this.args.changeset.name);
    console.log('Color: ' + this.args.changeset.color);
    console.log('Parents: ' + this.args.changeset.parents);
  }
}
