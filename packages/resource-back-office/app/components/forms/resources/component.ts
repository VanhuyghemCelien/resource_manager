import type Store from '@ember-data/store';
import { action } from '@ember/object';
import { service } from '@ember/service';
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
  @service declare store: Store;

  @action changeInput(field: string, value: string) {
    this.args.changeset.set(field as keyof FormsResourcesDTO, value);
    console.log(field.toUpperCase() + ': ' + value);
  }
  @action changeEnterprise(event: { target: { value: string } }) {
    const value = event.target.value;
    this.args.changeset.set('enterprise', value);
    console.log('ENTERPRISE_ID: ' + value);
  }
  @action async logthis(event: { target: { files: FileList } }) {
    if (event.target.files[0]) {
      const file: File = event.target.files[0];
      console.log(file);

      const originalName: string = file.name;
      const fileName: string = originalName;
      let mimeType: string = file.type;
      const size: number = file.size;
      // try {
      //   await this.store.createRecord('document', {
      //     fileName: fileName,
      //     originalName: originalName,
      //     path: 'dist/uploads/' + fileName,
      //     mimeType: 'image/png',
      //     size: size,
      //   });
      // } catch (e) {
      //   console.log(e.message);
      // }

      console.log(
        'FILENAME: ' +
          fileName +
          '\nORIGINAL_NAME: ' +
          originalName +
          '\nTYPE: ' +
          mimeType +
          '\nSIZE: ' +
          size
      );

      this.args.changeset.set('image', '/assets/images/resource1.png');
    }
  }
  @action logchangeset() {
    console.log('tetst');
  }
}
