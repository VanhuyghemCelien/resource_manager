import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import type EnterpriseModel from 'ember-boilerplate/models/enterprise';
import type ResourceModel from 'ember-boilerplate/models/resource';

interface PopupsCreateEditDetailsArgs {
  popupType: string;
  objectType: string;
  object: EnterpriseModel | ResourceModel;
  toggleDisplayModal: (popupType: string) => void;
  editField?: (fieldname: string, event: { target: { value: string } }) => void;
  saveFunction?: () => void;
}

export default class PopupsCreateEditDetails extends Component<PopupsCreateEditDetailsArgs> {
  @tracked field = '';
  get fieldToEdit() {
    return this.field;
  }

  get popupName() {
    if (this.args.popupType === 'details') {
      if (this.args.objectType === 'Enterprise') {
        return "Détails de l'entreprise";
      } else if (this.args.objectType === 'Resource') {
        return 'Détails de la ressource';
      }
    } else if (this.args.popupType === 'edit') {
      if (this.args.objectType === 'Enterprise') {
        return "Modifier l'entreprise";
      } else if (this.args.objectType === 'Resource') {
        return 'Modifier la ressource';
      }
    } else if (this.args.popupType === 'new') {
      if (this.args.objectType === 'Enterprise') {
        return 'Ajouter une entreprise';
      } else if (this.args.objectType === 'Resource') {
        return 'Ajouter une ressource';
      }
    }
    return 'None';
  }
}
