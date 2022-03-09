import Component from '@glimmer/component';
import type EnterpriseModel from 'ember-boilerplate/models/enterprise';
import type ResourceModel from 'ember-boilerplate/models/resource';

interface PopupsEnterprisesArgs {
  popupType: string;
  objectType: string;
  object: EnterpriseModel | ResourceModel;
  toggleDisplayModal: (popupType: string) => void;
  editField?: (fieldname: string, event: { target: { value: string } }) => void;
  saveFunction?: () => void;
}

export default class PopupsEnterprises extends Component<PopupsEnterprisesArgs> {
  get popupName() {
    if (this.args.popupType === 'details') {
      return this.args.objectType + ' Details';
    } else if (this.args.popupType === 'edit') {
      return 'Edit ' + this.args.objectType;
    } else if (this.args.popupType === 'new') {
      return 'Add ' + this.args.objectType;
    }
    return 'None';
  }
}
