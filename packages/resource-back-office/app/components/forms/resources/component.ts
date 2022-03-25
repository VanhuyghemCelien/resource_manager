import type Store from '@ember-data/store';
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

interface FormsResourcesArgs extends BaseFormArgs<FormsResourcesDTO> {
  store: Store;
}

export default class FormsResources extends BaseForm<
  FormsResourcesArgs,
  FormsResourcesDTO
> {
  @action changeInput(field: string, value: string) {
    this.args.changeset.set(field as keyof FormsResourcesDTO, value);
  }
  @action changeEnterprise(event: { target: { value: string } }) {
    const value = event.target.value;
    this.args.changeset.set('enterprise', value);
  }
  @action async logthis(event: { target: { files: FileList } }) {
    if (event.target.files[0]) {
      const file: File = event.target.files[0];
      console.log(file);

      const originalName: string = file.name;
      var fileName: string[] = originalName.split('.');
      const newName: string =
        fileName[0] + Math.floor(Math.random() * 10000) + '.' + fileName[1];
      let mimeType: string = file.type;
      const size: number = file.size;

      console.log(
        'FILENAME: ' +
          fileName +
          '\nORIGINAL_NAME: ' +
          originalName +
          '\nTYPE: ' +
          mimeType +
          '\nSIZE: ' +
          size +
          '\nNEW_NAME: ' +
          newName
      );

      this.args.changeset.set('image', '/assets/images/resource1.png');
    }
  }
}
