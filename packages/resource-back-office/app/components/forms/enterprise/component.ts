import { action } from '@ember/object';
import type { BaseFormArgs } from 'ember-form-changeset-validations/components/form';
import BaseForm from 'ember-form-changeset-validations/components/form';

export interface FormsEnterpriseDTO {
  name: string;
  city: string;
  address: string;
  emailAddress: string;
  phoneNumber: string;
  emailAddress2: string;
  phoneNumber2: string;
  enterpriseNumber: string;
  vatNumber: string;
}

interface FormsEnterpriseArgs extends BaseFormArgs<FormsEnterpriseDTO> {
  isDisplayed: boolean;
}

export default class FormsEnterprise extends BaseForm<
  FormsEnterpriseArgs,
  FormsEnterpriseDTO
> {
  @action changeInput(field: string, value: string) {
    this.args.changeset.set(field as keyof FormsEnterpriseDTO, value);
  }
  @action
  saveFunction() {
    this.args.isDisplayed = false;
  }
}
