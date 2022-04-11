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
  @tracked multipleColor: boolean = false;
  @tracked modalName: string = '';

  @tracked type: string = '';

  @tracked
  assignmentTypeChangeset: TypedBufferedChangeset<FormsAssignmentTypeDTO>;
  constructor(owner: unknown, args: PagesAssignmentTypesArgs) {
    super(owner, args);
    this.assignmentTypeChangeset = Changeset(
      {
        name: '',
        color: '',
      },
      lookupValidator(AssignmentTypeValidation),
      AssignmentTypeValidation
    ) as TypedBufferedChangeset<FormsAssignmentTypeDTO>;
  }

  get isMultipleColor() {
    return '';
  }

  @action
  toggleMultipleColor() {
    if (this.multipleColor) {
      this.multipleColor = false;
    } else {
      this.multipleColor = true;
    }
  }

  @action add(
    type: string,
    changeset: TypedBufferedChangeset<FormsAssignmentTypeDTO>
  ) {
    if (type === 'type') {
      this.addAssignmentType(changeset);
    } else if (type === 'title') {
      this.addAssignmentTitle(changeset);
    }
  }

  @action
  displayDeleteAssignmentType(id: string) {
    this.toggleDisplayDeleteAssignmentTypeModal();
    this.assignmentTypeChangeset.set('id', id);
  }

  @action
  toggleDisplayAssignmentTypeModal(popupType: string, type?: string) {
    if (popupType === 'new') {
      this.toggleDisplayNewAssignmentTypeModal(type);
    } else if (popupType === 'edit') {
      this.toggleDisplayEditAssignmentTypeModal(type);
    }
  }

  @action
  async toggleDisplayDeleteAssignmentTypeModal() {
    this.assignmentTypeChangeset.rollback();
    if (this.displayDeleteAssignmentTypeModal) {
      this.displayDeleteAssignmentTypeModal = false;
    } else {
      this.displayDeleteAssignmentTypeModal = true;
    }
  }

  toggleDisplayNewAssignmentTypeModal(type?: string) {
    if (this.displayNewAssignmentTypeModal) {
      this.displayNewAssignmentTypeModal = false;
      this.type = '';
      this.assignmentTypeChangeset.rollback();
    } else {
      this.displayNewAssignmentTypeModal = true;
      this.type = type!;
    }
  }

  toggleDisplayEditAssignmentTypeModal(type?: string) {
    if (this.displayEditAssignmentTypeModal) {
      this.displayEditAssignmentTypeModal = false;
      this.type = '';
      this.assignmentTypeChangeset.rollback();
    } else {
      this.displayEditAssignmentTypeModal = true;
      this.type = type!;
    }
  }

  @action
  edit(
    type: string,
    changeset: TypedBufferedChangeset<FormsAssignmentTypeDTO>
  ) {
    if (type === 'type') {
      this.editAssignmentType(changeset);
    } else if (type === 'title') {
      this.editAssignmentTitle(changeset);
    }
  }

  @action
  async displayAssignmentTypeDetails(
    type: string,
    assignmentTypeIdReceived: string
  ) {
    const assignmentTypeReceived = await this.store.queryRecord(
      'assignmentType',
      {
        id: assignmentTypeIdReceived,
      }
    );
    this.toggleDisplayEditAssignmentTypeModal(type);
    if (!assignmentTypeReceived.color && assignmentTypeReceived.children) {
      if (type === 'type') {
        this.toggleMultipleColor();
      } else if (type === 'title') {
        this.toggleMultipleColor();
      }
    }
    this.assignmentTypeChangeset.set('id', assignmentTypeReceived.id);
    this.assignmentTypeChangeset.set('color', assignmentTypeReceived.color);
    this.assignmentTypeChangeset.set('name', assignmentTypeReceived.name);
  }

  @action
  @loading
  async addAssignmentType(
    changeset: TypedBufferedChangeset<FormsAssignmentTypeDTO>
  ) {
    try {
      const assignmentTypeToAdd: Partial<AssignmentTypeModel> = {
        name: changeset.get('name'),
        color: changeset.get('color'),
        parents: changeset.get('parents'),
      };
      const assignmentType = this.store.createRecord(
        'assignment-type',
        assignmentTypeToAdd
      );
      this.assignmentTypeChangeset.rollback();
      await assignmentType.save();
      this.multipleColor = false;
      this.toggleDisplayNewAssignmentTypeModal();
      this.router.refresh();
      this.flashMessages.success("Le type d'occupation a bien été ajouté");
    } catch (e) {
      this.flashMessages.danger("Le type d'occupation n'a pas pu être ajouté");
    }
  }

  @action
  @loading
  async addAssignmentTitle(
    changeset: TypedBufferedChangeset<FormsAssignmentTypeDTO>
  ) {
    try {
      const assignmentTitleToAdd: Partial<AssignmentTypeModel> = {
        name: changeset.get('name'),
        color: changeset.get('color'),
        parents: changeset.get('parents'),
      };

      const assignmentTitle = this.store.createRecord(
        'assignmentType',
        assignmentTitleToAdd
      );
      this.assignmentTypeChangeset.rollback();
      await assignmentTitle.save();
      this.toggleDisplayAssignmentTypeModal('new', 'title');
      this.router.refresh();
      this.flashMessages.success("Le titre d'occupation a bien été ajouté");
    } catch (e) {
      this.flashMessages.danger("Le titre d'occupation n'a pas pu être ajouté");
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
      this.assignmentTypeChangeset.rollback();
      this.toggleDisplayAssignmentTypeModal('edit', 'type');
      this.router.refresh();
      this.flashMessages.success("Le type d'occupation a bien été modifié");
    } catch (e) {
      this.flashMessages.danger(e.message);
    }
  }

  @action
  async editAssignmentTitle(
    // A modifier l'edit de titre ne fonctionne pas
    changeset: TypedBufferedChangeset<FormsAssignmentTypeDTO>
  ) {
    try {
      const assignmentTitle = await this.store.queryRecord('assignmentType', {
        id: changeset.get('id'),
      });

      assignmentTitle.name = changeset.get('name');
      assignmentTitle.color = changeset.get('color');
      await assignmentTitle.save();
      this.assignmentTypeChangeset.rollback();
      this.router.refresh();
      this.toggleDisplayAssignmentTypeModal('edit', 'title');
      this.flashMessages.success("Le type d'occupation a bien été modifié");
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
          id: this.assignmentTypeChangeset.get('id'),
        }
      );
      assignmentTypeToDelete.destroyRecord();
      this.assignmentTypeChangeset.rollback();
      this.toggleDisplayDeleteAssignmentTypeModal();
      this.flashMessages.success("Le type d'occupation a bien été supprimé");
    } catch (e) {
      this.flashMessages.danger(e.message);
    }
  }
}
