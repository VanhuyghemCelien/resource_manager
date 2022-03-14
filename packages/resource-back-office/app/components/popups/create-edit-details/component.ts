import { action } from '@ember/object';
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

  @action
  getFieldToEdit(objectType: string, fieldId: number) {
    let valueToReturn = '';
    switch (fieldId) {
      case 0:
        if (objectType === 'Enterprise') {
          valueToReturn = 'name';
        } else if (objectType === 'Resource') {
          valueToReturn = 'firstname';
        }
        break;
      case 1:
        if (objectType === 'Enterprise') {
          valueToReturn = 'enterprisenumber';
        } else if (objectType === 'Resource') {
          valueToReturn = 'lastname';
        }
        break;
      case 2:
        if (objectType === 'Enterprise') {
          valueToReturn = 'vatnumber';
        } else if (objectType === 'Resource') {
          valueToReturn = 'enterprise';
        }
        break;
      case 3:
        if (objectType === 'Enterprise') {
          valueToReturn = 'city';
        } else if (objectType === 'Resource') {
          valueToReturn = 'cost';
        }
        break;
      case 4:
        if (objectType === 'Enterprise') {
          valueToReturn = 'address';
        }
        break;
      case 5:
        if (objectType === 'Enterprise' || objectType === 'Resource') {
          valueToReturn = 'emailaddress';
        }
        break;
      case 6:
        if (objectType === 'Enterprise' || objectType === 'Resource') {
          valueToReturn = 'emailaddress2';
        }
        break;
      case 7:
        if (objectType === 'Enterprise' || objectType === 'Resource') {
          valueToReturn = 'phonenumber';
        }
        break;
      case 8:
        if (objectType === 'Enterprise' || objectType === 'Resource') {
          valueToReturn = 'phonenumber2';
        }
        break;
      default:
        break;
    }
    this.field = valueToReturn;
  }
}
