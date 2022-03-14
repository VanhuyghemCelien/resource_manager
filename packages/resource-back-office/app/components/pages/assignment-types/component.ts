import type Store from '@ember-data/store';
import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export interface AssignmentTypeModel {
  assignmenttypeid: number;
  assignmenttypename: string;
  multiplecolors: boolean;
  assignmenttypecolor?: string;
}

interface PagesAssignmentTypesArgs {}

export default class PagesAssignmentTypes extends Component<PagesAssignmentTypesArgs> {
  @service declare store: Store;

  @tracked displayNewAssignmentTypeModal: Boolean = false;
  @tracked displayEditAssignmentTypeModal: Boolean = false;
  @tracked displayDeleteAssignmentTypeModal: Boolean = false;
  @tracked modalName: string = '';
  @tracked assignmentType: AssignmentTypeModel = {
    assignmenttypeid: 3,
    assignmenttypename: '',
    multiplecolors: false,
    assignmenttypecolor: '',
  };

  @action
  toggleMultipleColors() {
    if (this.assignmentType.multiplecolors) {
      this.assignmentType.multiplecolors = false;
    } else {
      this.assignmentType.multiplecolors = true;
    }
  }

  reinitAssignmentType() {
    this.assignmentType = {
      assignmenttypeid: 3,
      assignmenttypename: '',
      multiplecolors: false,
      assignmenttypecolor: '',
    };
  }

  @action
  displayDeleteAssignmentType(assignmentType: AssignmentTypeModel) {
    this.toggleDisplayDeleteAssignmentTypeModal();
    this.assignmentType = {
      assignmenttypeid: assignmentType.assignmenttypeid,
      assignmenttypename: assignmentType.assignmenttypename,
      multiplecolors: assignmentType.multiplecolors,
      assignmenttypecolor: assignmentType.assignmenttypecolor,
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
      assignmenttypeid: assignmentTypeReceived.assignmenttypeid,
      assignmenttypename: assignmentTypeReceived.assignmenttypename,
      multiplecolors: assignmentTypeReceived.multiplecolors,
      assignmenttypecolor: assignmentTypeReceived.assignmenttypecolor,
    };
    this.assignmentType = assignmentTypeToEdit;
    this.toggleDisplayEditAssignmentTypeModal();
  }

  @action
  editAssignmentTypeField(field: string, event: { target: { value: string } }) {
    switch (field) {
      case 'assignmenttypename':
        this.assignmentType.assignmenttypename = event.target.value;
        break;
      case 'multiplecolors':
        this.assignmentType.multiplecolors = Boolean(event.target.value);
        break;
      case 'assignmenttypecolor':
        this.assignmentType.assignmenttypecolor = event.target.value;
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
      editedAssignmentType.assignmenttypeid
    );

    assignmentType.assignmenttypename = editedAssignmentType.assignmenttypename;
    assignmentType.multiplecolors = editedAssignmentType.multiplecolors;
    assignmentType.emaiassignmenttypecolorladdress =
      editedAssignmentType.assignmenttypecolor;
    assignmentType.save();
    this.toggleDisplayAssignmentTypeModal('edit');
  }

  @action
  async deleteAssignmentType(assignmentType: AssignmentTypeModel) {
    const assignmentTypeToDelete = await this.store.peekRecord(
      'assignment-type',
      assignmentType.assignmenttypeid
    );
    if (assignmentTypeToDelete) {
      assignmentTypeToDelete!.deleteRecord();
      this.toggleDisplayDeleteAssignmentTypeModal();
      assignmentTypeToDelete!.unloadRecord();
      assignmentTypeToDelete!.save();
    }
  }
}
