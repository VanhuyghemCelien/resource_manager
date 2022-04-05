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
    this.removeErrorClass(field);
  }
  @action setValidation(field: string) {
    let error;
    switch (field) {
      case 'name':
        error = this.args.changeset.error.name;
        break;
      case 'enterpriseNumber':
        error = this.args.changeset.error.enterpriseNumber;
        break;
      case 'vatNumber':
        error = this.args.changeset.error.vatNumber;
        break;
      case 'city':
        error = this.args.changeset.error.city;
        break;
      case 'emailAddress':
        error = this.args.changeset.error.emailAddress;
        break;
      case 'emailAddress2':
        error = this.args.changeset.error.emailAddress2;
        break;
      case 'phoneNumber':
        error = this.args.changeset.error.phoneNumber;
        break;
      case 'phoneNumber2':
        error = this.args.changeset.error.phoneNumber2;
        break;
      case 'address':
        error = this.args.changeset.error.address;
        break;
      default:
        break;
    }
    if (error) {
      console.log(error);
      return true;
    }
    return false;
  }
  @action validate() {
    const errors = this.args.changeset.error;
    let numberError = 0;
    let errorText = '';
    if (errors.name) {
      this.setErrorClass('name');
      numberError++;
      errorText +=
        '<li class="text-left pt-1 pl-1">Le champ nom est obligatoire</li>';
    } else {
      this.removeErrorClass('name');
    }
    if (errors.enterpriseNumber) {
      this.setErrorClass('enterpriseNumber');
      numberError++;
      errorText +=
        '<li class="text-left pt-1 pl-1">Le champ N° d\'entreprise n\'a pas le bon format</li>';
    } else {
      this.removeErrorClass('enterpriseNumber');
    }
    if (errors.vatNumber) {
      this.setErrorClass('vatNumber');
      numberError++;
      errorText +=
        '<li class="text-left pt-1 pl-1">Le champ N° de TVA n\'a pas le bon format</li>';
    } else {
      this.removeErrorClass('vatNumber');
    }
    if (errors.city) {
      this.setErrorClass('city');
      numberError++;
      errorText +=
        '<li class="text-left pt-1 pl-1">Le champ ville est obligatoire</li>';
    } else {
      this.removeErrorClass('city');
    }
    if (errors.emailAddress) {
      this.setErrorClass('emailAddress');
      numberError++;
      errorText +=
        '<li class="text-left pt-1 pl-1">Le champ addresse email n\'a pas le bon format</li>';
    } else {
      this.removeErrorClass('emailAddress');
    }
    if (errors.emailAddress2) {
      this.setErrorClass('emailAddress2');
      numberError++;
      errorText +=
        '<li class="text-left pt-1 pl-1">Le champ addresse email n°2 n\'a pas le bon format</li>';
    } else {
      this.removeErrorClass('emailAddress2');
    }
    if (errors.phoneNumber) {
      this.setErrorClass('phoneNumber');
      numberError++;
      errorText +=
        '<li class="text-left pt-1 pl-1">Le champ N° de téléphone n\'a pas le bon format</li>';
    } else {
      this.removeErrorClass('phoneNumber');
    }
    if (errors.phoneNumber2) {
      this.setErrorClass('phoneNumber2');
      numberError++;
      errorText +=
        '<li class="text-left pt-1 pl-1">Le champ N° de téléphone n°2 n\'a pas le bon format</li>';
    } else {
      this.removeErrorClass('phoneNumber2');
    }
    if (errors.address) {
      this.setErrorClass('address');
      numberError++;
      errorText +=
        '<li class="text-left pt-1 pl-1">Le champ addresse est obligatoire</li>';
    } else {
      this.removeErrorClass('address');
    }
    if (numberError === 0) {
      console.log('ok');
    } else if (numberError === 1) {
      document.getElementById('errorEnterpriseForm')!.innerHTML =
        '<ul class="list-disc list-inside">' + errorText + '</ul>';
    } else {
      document.getElementById('errorEnterpriseForm')!.innerHTML =
        '<ul class="list-disc list-inside">' + errorText + '</ul>';
    }
  }

  setErrorClass(field: string) {
    if (
      document.getElementById(field)!.classList.contains('border-textPrimary')
    ) {
      document.getElementById(field)!.classList.add('border-warn');
      document.getElementById(field)!.classList.remove('border-textPrimary');
    }
  }
  removeErrorClass(field: string) {
    if (document.getElementById(field)!.classList.contains('border-warn')) {
      document.getElementById(field)!.classList.remove('border-warn');
      document.getElementById(field)!.classList.add('border-textPrimary');
    }
  }
}
