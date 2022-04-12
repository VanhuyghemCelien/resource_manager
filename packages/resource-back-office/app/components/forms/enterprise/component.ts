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
    this.removeError(field);
  }

  @action validateField(field: string) {
    const errors = this.args.changeset.error;
    switch (field) {
      case 'name':
        if (errors.name) {
          this.setError(
            'name',
            'Le nom est un champ obligatoire',
            'emailAddress'
          );
        } else {
          this.removeError('name', 'emailAddress');
        }
        break;
      case 'enterpriseNumber':
        if (errors.enterpriseNumber) {
          this.setError(
            'enterpriseNumber',
            "Le numéro d'entreprise n'a pas le bon format",
            'emailAddress2'
          );
        } else {
          this.removeError('enterpriseNumber', 'emailAddress2');
        }
        break;
      case 'vatNumber':
        if (errors.vatNumber) {
          this.setError(
            'vatNumber',
            "Le numéro de TVA n'a pas le bon format",
            'phoneNumber'
          );
        } else {
          this.removeError('vatNumber', 'phoneNumber');
        }
        break;
      case 'city':
        if (errors.city) {
          this.setError(
            'city',
            'La ville est un champ obligatoire',
            'phoneNumber2'
          );
        } else {
          this.removeError('city', 'phoneNumber2');
        }
        break;
      case 'emailAddress':
        if (errors.emailAddress) {
          this.setError(
            'emailAddress',
            "L'adresse email n'a pas le bon format",
            'name'
          );
        } else {
          this.removeError('emailAddress', 'name');
        }
        break;
      case 'emailAddress2':
        if (errors.emailAddress2) {
          this.setError(
            'emailAddress2',
            "L'adresse email n'a pas le bon format",
            'enterpriseNumber'
          );
        } else {
          this.removeError('emailAddress2', 'enterpriseNumber');
        }
        break;
      case 'phoneNumber':
        if (errors.phoneNumber) {
          this.setError(
            'phoneNumber',
            "Le numéro de téléphone n'a pas le bon format",
            'vatNumber'
          );
        } else {
          this.removeError('phoneNumber', 'vatNumber');
        }
        break;
      case 'phoneNumber2':
        if (errors.phoneNumber2) {
          this.setError(
            'phoneNumber2',
            "Le numéro de téléphone n'a pas le bon format",
            'city'
          );
        } else {
          this.removeError('phoneNumber2', 'city');
        }
        break;
      case 'address':
        if (errors.address) {
          this.setError('address', "L'adresse est un champ obligatoire");
        } else {
          this.removeError('address');
        }
        break;
      default:
        break;
    }
  }

  setError(field: string, message: string, oppositeField?: string) {
    if (
      document.getElementById(field)!.classList.contains('border-textPrimary')
    ) {
      document.getElementById(field)!.classList.add('border-warn');
      document.getElementById(field)!.classList.remove('border-textPrimary');
      document.getElementById(field + 'Error')!.innerText = message;
      if (oppositeField) {
        if (
          !document
            .getElementById(oppositeField + 'Error')!
            .classList.contains('h-5')
        ) {
          document
            .getElementById(oppositeField + 'Error')!
            .classList.add('h-5');
        }
      }
    }
  }
  removeError(field: string, oppositeField?: string) {
    if (document.getElementById(field)!.classList.contains('border-warn')) {
      document.getElementById(field)!.classList.remove('border-warn');
      document.getElementById(field)!.classList.add('border-textPrimary');
    }
    document.getElementById(field + 'Error')!.innerText = '';
    if (oppositeField) {
      if (
        document
          .getElementById(oppositeField + 'Error')!
          .classList.contains('h-5')
      ) {
        document
          .getElementById(oppositeField + 'Error')!
          .classList.remove('h-5');
      }
    }
  }
}
