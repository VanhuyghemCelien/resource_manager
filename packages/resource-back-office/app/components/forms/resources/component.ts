import { action } from '@ember/object';
import { service } from '@ember/service';
import { isEmpty } from '@ember/utils';
import { tracked } from '@glimmer/tracking';
import type FlashMessageService from 'ember-cli-flash/services/flash-messages';
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

export enum ImageMimeTypes {
  BMP = 'image/bmp',
  GIF = 'image/gif',
  JPEG = 'image/jpeg',
  PNG = 'image/png',
}

interface FormsResourcesArgs extends BaseFormArgs<FormsResourcesDTO> {
  popupType: string;
}

export default class FormsResources extends BaseForm<
  FormsResourcesArgs,
  FormsResourcesDTO
> {
  @service declare flashMessages: FlashMessageService;
  @tracked formData = new FormData(document.getElementsByTagName('form')[0]);

  @action changeInput(field: string, value: string) {
    this.formData.set(field as keyof FormsResourcesDTO, value);
  }
  @action changeEnterprise(event: { target: { value: string } }) {
    this.formData.set('enterprise', event.target.value);
  }
  @action async changeImage(event: { target: { files: FileList } }) {
    // Verify that file is present
    if (event.target.files[0]) {
      const file: File = event.target.files[0];
      // Verify that file is an image
      if (
        !(
          file.type === ImageMimeTypes.BMP ||
          file.type === ImageMimeTypes.GIF ||
          file.type === ImageMimeTypes.JPEG ||
          file.type === ImageMimeTypes.PNG
        )
      ) {
        this.flashMessages.danger(
          'Fichier invalide : ".' +
            file.name.split('.')[file.name.split('.').length - 1] +
            '" n\'est pas un type de fichier accepté !'
        );
        return;
      }
      // Verify that file is less than 1MB
      if (file.size > 1 * 1024 * 1024) {
        this.flashMessages.danger(
          'Fichier invalide : le fichier est trop lourd !'
        );
        return;
      }
      this.formData.append('image', file);
    } else {
      this.flashMessages.danger("Aucun fichier n'a été sélectionné.");
    }
  }

  @action
  async verifyFormData(event: Event) {
    try {
      event.preventDefault();
      this.args.changeset.set('firstName', this.formData.get('firstName'));
      this.args.changeset.set('lastName', this.formData.get('lastName'));
      this.args.changeset.set(
        'emailAddress',
        this.formData.get('emailAddress')
      );
      this.args.changeset.set(
        'emailAddress2',
        this.formData.get('emailAddress2')
      );
      this.args.changeset.set('phoneNumber', this.formData.get('phoneNumber'));
      this.args.changeset.set(
        'phoneNumber2',
        this.formData.get('phoneNumber2')
      );
      if (isEmpty(this.formData.get('enterprise'))) {
        this.args.changeset.set(
          'enterprise',
          this.args.changeset.get('enterprise')
        );
      } else {
        this.args.changeset.set('enterprise', this.formData.get('enterprise'));
      }
      this.args.changeset.set('cost', this.formData.get('cost'));
      if (this.args.popupType === 'edit') {
        //If the popup is edit, and no new image has been selected, we set the old image in the changeset
        if (isEmpty(this.formData.get('image'))) {
          this.args.changeset.set('image', this.args.changeset.get('image'));
        } else {
          //If the popup is edit, and a new image has been selected, we set the new image in the changeset
          this.args.changeset.set('image', this.formData.get('image'));
        }
      } else {
        //If the popup is to create a new enterprise, and no image has been selected, we throw an error
        if (isEmpty(this.formData.get('image'))) {
          throw new Error('Veuillez sélectionner une image.');
        } else {
          //If the popup is to create a new enterprise, and an image has been selected, we set the new in the changeset
          this.args.changeset.set('image', this.formData.get('image'));
        }
      }
      this.args.saveFunction(this.args.changeset);
    } catch (e) {
      this.flashMessages.danger(e.message);
    }
  }
}
