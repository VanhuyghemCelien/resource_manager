import { action } from '@ember/object';
import type { BaseFormArgs } from 'ember-form-changeset-validations/components/form';
import BaseForm from 'ember-form-changeset-validations/components/form';

export interface FormsUserDTO {
  role: string;
  resource: string;
  login: string;
  password: string;
}

interface FormsUserArgs extends BaseFormArgs<FormsUserDTO> {}

export default class FormsUser extends BaseForm<FormsUserArgs, FormsUserDTO> {
  @action changeInput(field: string, value: string) {
    this.args.changeset.set(field as keyof FormsUserDTO, value);
  }
}
