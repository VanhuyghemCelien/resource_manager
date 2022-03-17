import { action } from '@ember/object';
import type { BaseFormArgs } from 'ember-form-changeset-validations/components/form';
import BaseForm from 'ember-form-changeset-validations/components/form';

export interface FormsResourcesDTO {
  firstName: string;
  lastName: string;
  emailAddress: string;
  emailAddress2: string;
  phoneNumber: string;
  phoneNumber2: string;
  enterprise: string;
  cost: string;
}

interface FormsResourcesArgs extends BaseFormArgs<FormsResourcesDTO> {}

export default class FormsResources extends BaseForm<
  FormsResourcesArgs,
  FormsResourcesDTO
> {
  @action changeInput(field: string, value: string) {
    this.args.changeset.set(field as keyof FormsResourcesDTO, value);
  }
}
