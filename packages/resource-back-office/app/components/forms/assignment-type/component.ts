import type Store from '@ember-data/store';
import { action } from '@ember/object';
import { inject, service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import type AssignmentTypeModel from 'ember-boilerplate/models/assignment-type';
import type AssignmentTypeService from 'ember-boilerplate/services/assignment-type-service';
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
  page: string;
}

export default class FormsAssignmentType extends BaseForm<
  FormsAssignmentTypeArgs,
  FormsAssignmentTypeDTO
> {
  @service declare store: Store;
  @tracked isParentSelected: boolean = false;
  @tracked isTitleColorDisplayed: boolean = false;
  @inject declare assignmentTypeService: AssignmentTypeService;
  @action changeInput(field: string, value: string) {
    this.args.changeset.set(field as keyof FormsAssignmentTypeDTO, value);
  }
  @action changeColor(event: { target: { value: string } }) {
    console.log(event);

    this.args.changeset.set('color', event.target.value);
  }
  @action
  async changeParents(event: { target: { value: string } }) {
    const parentReceived = await this.store.queryRecord('assignment-type', {
      id: event.target.value,
    });
    this.args.changeset.set('parents', parentReceived);
    this.isParentSelected = true;
    if (parentReceived.get('color')) {
      this.isTitleColorDisplayed = false;
    } else {
      this.isTitleColorDisplayed = true;
    }
  }

  @action saveAssignmentType(event: Event) {
    event.preventDefault();
    if (this.args.isColorChecked) {
      this.args.changeset.set('color', undefined);
    }
    this.args.changeset.set('parents', undefined);
    this.args.saveFunction(this.args.changeset);
  }
  @action saveAssignmentTitle(event: Event) {
    event.preventDefault();
    if (this.isParentSelected) {
      if (!this.isTitleColorDisplayed) {
        this.args.changeset.set('color', undefined);
      }
      this.args.saveFunction(this.args.changeset);
    } else if (this.args.page) {
      this.args.saveFunction(this.args.changeset);
    }
  }
}
