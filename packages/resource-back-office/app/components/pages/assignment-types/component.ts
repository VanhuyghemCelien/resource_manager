import type Store from '@ember-data/store';
import { action } from '@ember/object';
import type RouterService from '@ember/routing/router-service';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import type { FormsAssignmentTypeDTO } from 'ember-boilerplate/components/forms/assignment-type/component';
import type AssignmentTypeModel from 'ember-boilerplate/models/assignment-type';
import { Changeset } from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import type FlashMessageService from 'ember-cli-flash/services/flash-messages';
import type { TypedBufferedChangeset } from 'ember-form-changeset-validations';
import { loading } from 'ember-loading';
import AssignmentTypeValidation from '../../../validator/forms/assignment-type';

interface PagesAssignmentTypesArgs {}

export default class PagesAssignmentTypes extends Component<PagesAssignmentTypesArgs> {
  @service declare store: Store;
  @service declare flashMessages: FlashMessageService;
  @service declare router: RouterService;

  @tracked displayNewAssignmentTypeModal: Boolean = false;
  @tracked displayEditAssignmentTypeModal: Boolean = false;
  @tracked displayDeleteAssignmentTypeModal: Boolean = false;
  @tracked multipleColors: boolean = false;
  @tracked modalName: string = '';
  @tracked changeset: TypedBufferedChangeset<FormsAssignmentTypeDTO>;
  constructor(owner: unknown, args: PagesAssignmentTypesArgs) {
    super(owner, args);
    this.changeset = Changeset(
      {
        name: '',
        color: '',
      },
      lookupValidator(AssignmentTypeValidation),
      AssignmentTypeValidation
    ) as TypedBufferedChangeset<FormsAssignmentTypeDTO>;
  }

  @action
  toggleMultipleColors() {
    if (this.multipleColors) {
      this.multipleColors = false;
    } else {
      this.multipleColors = true;
    }
  }

  @action
  displayDeleteAssignmentType(id: string) {
    this.toggleDisplayDeleteAssignmentTypeModal();
    this.changeset.set('id', id);
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
    this.changeset.rollback();
    if (this.displayDeleteAssignmentTypeModal) {
      this.displayDeleteAssignmentTypeModal = false;
    } else {
      this.displayDeleteAssignmentTypeModal = true;
    }
  }

  toggleDisplayNewAssignmentTypeModal() {
    if (this.displayNewAssignmentTypeModal) {
      this.displayNewAssignmentTypeModal = false;
      this.changeset.rollback();
    } else {
      this.displayNewAssignmentTypeModal = true;
    }
  }

  toggleDisplayEditAssignmentTypeModal() {
    if (this.displayEditAssignmentTypeModal) {
      this.displayEditAssignmentTypeModal = false;
      this.changeset.rollback();
    } else {
      this.displayEditAssignmentTypeModal = true;
    }
  }

  @action
  async displayAssignmentTypeDetails(assignmentTypeIdReceived: string) {
    const assignmentTypeReceived = await this.store.queryRecord(
      'assignment-type',
      {
        id: assignmentTypeIdReceived,
      }
    );
    this.changeset.set('id', assignmentTypeReceived.id);
    this.changeset.set('color', assignmentTypeReceived.color);
    this.changeset.set('name', assignmentTypeReceived.name);
    this.toggleDisplayEditAssignmentTypeModal();
  }

  @action
  @loading
  async addAssignmentType(
    changeset: TypedBufferedChangeset<FormsAssignmentTypeDTO>
  ) {
    try {
      const assignmentTypeToSave: Partial<AssignmentTypeModel> = {
        name: changeset.get('name'),
        color: changeset.get('color'),
      };
      const assignmentTypeCreated = await this.store.createRecord(
        'assignment-type',
        assignmentTypeToSave
      );
      await assignmentTypeCreated.save();
      this.changeset.rollback();
      this.toggleDisplayAssignmentTypeModal('new');
      this.router.refresh();
    } catch (e) {
      this.flashMessages.danger(e.message);
    }
  }

  @action
  async editAssignmentType(
    changeset: TypedBufferedChangeset<FormsAssignmentTypeDTO>
  ) {
    try {
      const assignmentType = await this.store.queryRecord('assignment-type', {
        id: changeset.get('id'),
      });

      assignmentType.name = changeset.get('name');
      assignmentType.color = changeset.get('color');
      await assignmentType.save();
      this.changeset.rollback();
      this.toggleDisplayAssignmentTypeModal('edit');
    } catch (e) {
      this.flashMessages.danger(e.message);
    }
  }

  @action
  async deleteAssignmentType() {
    try {
      const assignmentTypeToDelete = await this.store.queryRecord(
        'assignment-type',
        {
          id: this.changeset.get('id'),
        }
      );
      assignmentTypeToDelete.destroyRecord();
      this.changeset.rollback();
      this.toggleDisplayDeleteAssignmentTypeModal();
    } catch (e) {
      this.flashMessages.danger(e.message);
    }
  }
}
