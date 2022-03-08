import Component from '@glimmer/component';
import type EnterpriseModel from 'ember-boilerplate/models/enterprise';

interface UiListArgs {
  enterprise: EnterpriseModel;
  displayDetails: (typeOfDisplay: string, enterprise: EnterpriseModel) => void;
  displayDelete: (enterprise: EnterpriseModel) => void;
}

// eslint-disable-next-line ember/no-empty-glimmer-component-classes
export default class UiList extends Component<UiListArgs> {}
