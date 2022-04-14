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

interface FormsEnterpriseArgs extends BaseFormArgs<FormsEnterpriseDTO> {}

export default class FormsEnterprise extends BaseForm<
  FormsEnterpriseArgs,
  FormsEnterpriseDTO
> {
  @action changeInput(field: string, value: string) {
    this.args.changeset.set(field as keyof FormsEnterpriseDTO, value);
  }

  @action validateField(field: string) {
    const errors = this.args.changeset.error;
    switch (field) {
      case 'name':
        if (errors.name) {
          return true;
        }
        return false;
      case 'enterpriseNumber':
        if (errors.enterpriseNumber) {
          return true;
        }
        return false;
      case 'vatNumber':
        if (errors.vatNumber) {
          return true;
        }
        return false;
      case 'city':
        if (errors.city) {
          return true;
        }
        return false;
      case 'emailAddress':
        if (errors.emailAddress) {
          return true;
        }
        return false;
      case 'emailAddress2':
        if (errors.emailAddress2) {
          return true;
        }
        return false;
      case 'phoneNumber':
        if (errors.phoneNumber) {
          return true;
        }
        return false;
      case 'phoneNumber2':
        if (errors.phoneNumber2) {
          return true;
        }
        return false;
      case 'address':
        if (errors.address) {
          return true;
        }
        return false;
      default:
        return false;
    }
  }
}
