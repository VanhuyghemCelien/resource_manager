import type Store from '@ember-data/store';
import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export interface AssignmentTypeModel {
  assignmentTypeId: number;
  assignmentTypeName: string;
  multipleColors: boolean;
  assignmentTypeColor?: string;
}

interface PagesAssignmentTypesArgs {}

export default class PagesAssignmentTypes extends Component<PagesAssignmentTypesArgs> {
  @service declare store: Store;

  @tracked displayNewAssignmentTypeModal: Boolean = false;
  @tracked displayEditAssignmentTypeModal: Boolean = false;
  @tracked displayDeleteAssignmentTypeModal: Boolean = false;
  @tracked modalName: string = '';
  @tracked assignmentType: AssignmentTypeModel = {
    assignmentTypeId: 3,
    assignmentTypeName: '',
    multipleColors: false,
    assignmentTypeColor: '',
  };

  @action
  toggleMultipleColors() {
    if (this.assignmentType.multipleColors) {
      this.assignmentType.multipleColors = false;
    } else {
      this.assignmentType.multipleColors = true;
    }
  }

  reinitAssignmentType() {
    this.assignmentType = {
      assignmentTypeId: 3,
      assignmentTypeName: '',
      multipleColors: false,
      assignmentTypeColor: '',
    };
  }

  @action
  displayDeleteAssignmentType(assignmentType: AssignmentTypeModel) {
    this.toggleDisplayDeleteAssignmentTypeModal();
    this.assignmentType = {
      assignmentTypeId: assignmentType.assignmentTypeId,
      assignmentTypeName: assignmentType.assignmentTypeName,
      multipleColors: assignmentType.multipleColors,
      assignmentTypeColor: assignmentType.assignmentTypeColor,
    };
  }

  @action
  toggleDisplayAssignmentTypeModal(type: string) {
    if (type === 'new') {
      this.toggleDisplayNewAssignmentTypeModal();
    } else if (type === 'edit') {
      this.toggleDisplayEditAssignmentTypeModal();
    }
  }

  @action
  async toggleDisplayDeleteAssignmentTypeModal() {
    this.reinitAssignmentType();
    if (this.displayDeleteAssignmentTypeModal) {
      this.displayDeleteAssignmentTypeModal = false;
    } else {
      this.displayDeleteAssignmentTypeModal = true;
    }
  }

  toggleDisplayNewAssignmentTypeModal() {
    this.reinitAssignmentType();
    if (this.displayNewAssignmentTypeModal) {
      this.displayNewAssignmentTypeModal = false;
      this.reinitAssignmentType();
    } else {
      this.displayNewAssignmentTypeModal = true;
    }
  }

  toggleDisplayEditAssignmentTypeModal() {
    if (this.displayEditAssignmentTypeModal) {
      this.displayEditAssignmentTypeModal = false;
      this.reinitAssignmentType();
    } else {
      this.displayEditAssignmentTypeModal = true;
    }
  }

  @action
  displayAssignmentTypeDetails(assignmentTypeReceived: AssignmentTypeModel) {
    const assignmentTypeToEdit: AssignmentTypeModel = {
      assignmentTypeId: assignmentTypeReceived.assignmentTypeId,
      assignmentTypeName: assignmentTypeReceived.assignmentTypeName,
      multipleColors: assignmentTypeReceived.multipleColors,
      assignmentTypeColor: assignmentTypeReceived.assignmentTypeColor,
    };
    this.assignmentType = assignmentTypeToEdit;
    this.toggleDisplayEditAssignmentTypeModal();
  }

  @action
  editAssignmentTypeField(field: string, event: { target: { value: string } }) {
    switch (field) {
      case 'assignmenttypename':
        this.assignmentType.assignmentTypeName = event.target.value;
        break;
      case 'multiplecolors':
        this.assignmentType.multipleColors = Boolean(event.target.value);
        break;
      case 'assignmenttypecolor':
        this.assignmentType.assignmentTypeColor = event.target.value;
        break;
      default:
        break;
    }
  }

  @action
  addAssignmentType() {
    const assignmentType = this.store.createRecord(
      'assignment-type',
      this.assignmentType
    );
    this.reinitAssignmentType();
    assignmentType.save();
    this.toggleDisplayAssignmentTypeModal('new');
  }

  @action
  async editAssignmentType() {
    const editedAssignmentType = this.assignmentType;
    const assignmentType = await this.store.findRecord(
      'assignment-type',
      editedAssignmentType.assignmentTypeId
    );

    assignmentType.assignmentTypeName = editedAssignmentType.assignmentTypeName;
    assignmentType.multipleColors = editedAssignmentType.multipleColors;
    assignmentType.emaiassignmenttypecolorladdress =
      editedAssignmentType.assignmentTypeColor;
    assignmentType.save();
    this.toggleDisplayAssignmentTypeModal('edit');
  }

  @action
  async deleteAssignmentType(assignmentType: AssignmentTypeModel) {
    const assignmentTypeToDelete = await this.store.peekRecord(
      'assignment-type',
      assignmentType.assignmentTypeId
    );
    if (assignmentTypeToDelete) {
      assignmentTypeToDelete!.deleteRecord();
      this.toggleDisplayDeleteAssignmentTypeModal();
      assignmentTypeToDelete!.unloadRecord();
      assignmentTypeToDelete!.save();
    }
  }
}
