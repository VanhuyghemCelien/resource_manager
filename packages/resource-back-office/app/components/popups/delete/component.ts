import Component from '@glimmer/component';
import type AssignmentTypeModel from 'ember-boilerplate/models/assignment-type';
import type EnterpriseModel from 'ember-boilerplate/models/enterprise';
import type ResourceModel from 'ember-boilerplate/models/resource';

interface PopupsDeleteArgs {
  type: string;
  toggleDisplayDeleteModal: () => void;
  deleteFunction: (id: number) => void;
  objectToDelete: ResourceModel | EnterpriseModel | AssignmentTypeModel;
}

// eslint-disable-next-line ember/no-empty-glimmer-component-classes
export default class PopupsDelete extends Component<PopupsDeleteArgs> {}
