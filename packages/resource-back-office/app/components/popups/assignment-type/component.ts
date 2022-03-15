import Component from '@glimmer/component';

interface PopupsAssignmentTypeArgs {
  toggleDisplayModal: () => void;
  editAssignmentTypeField: (fieldName: string) => void;
  toggleIsColorChecked: () => void;
  saveFunction: () => void;
  isColorChecked: boolean;
}

// eslint-disable-next-line ember/no-empty-glimmer-component-classes
export default class PopupsAssignmentType extends Component<PopupsAssignmentTypeArgs> {}
