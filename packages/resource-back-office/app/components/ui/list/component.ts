import Component from '@glimmer/component';
import type AssignmentTypeModel from 'ember-boilerplate/models/assignment-type';
import type EnterpriseModel from 'ember-boilerplate/models/enterprise';
import type ResourceModel from 'ember-boilerplate/models/resource';

interface UiListArgs {
  enterprises: [EnterpriseModel];
  type: string;
  object: EnterpriseModel | ResourceModel | AssignmentTypeModel;
  displayDetails: (typeOfDisplay: string, enterprise: EnterpriseModel) => void;
  displayDelete: (enterprise: EnterpriseModel) => void;
}

export default class UiList extends Component<UiListArgs> {
  get title() {
    if (this.args.type === 'assignment-type') {
      const assignmentType = this.args.object as AssignmentTypeModel;
      return 'Titre - ' + assignmentType.get('parents').get('name');
    }
    return undefined;
  }
}
