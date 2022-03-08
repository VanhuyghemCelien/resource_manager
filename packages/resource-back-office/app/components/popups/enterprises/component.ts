import Component from '@glimmer/component';
import type { EnterpriseModel } from 'ember-boilerplate/components/pages/enterprises/component';

interface PopupsEnterprisesArgs {
  type: string;
  enterprise: EnterpriseModel;
  toggleDisplayEnterpriseModal: (type: string) => void;
  editEnterpriseField?: (
    fieldname: string,
    event: { target: { value: string } }
  ) => void;
  saveFunction?: () => void;
}

export default class PopupsEnterprises extends Component<PopupsEnterprisesArgs> {
  get popupName() {
    if (this.args.type === 'details') {
      return 'Enterprise Details';
    } else if (this.args.type === 'edit') {
      return 'Edit Enterprise';
    } else if (this.args.type === 'new') {
      return 'New Enterprise';
    }
    return 'None';
  }
}
