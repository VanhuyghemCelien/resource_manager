import Component from '@glimmer/component';

interface PopupsDeleteArgs {
  type: string;
  toggleDisplayDeleteModal: () => void;
  deleteFunction: (id: number) => void;
  idObjectToDelete: number;
}

// eslint-disable-next-line ember/no-empty-glimmer-component-classes
export default class PopupsDelete extends Component<PopupsDeleteArgs> {}
