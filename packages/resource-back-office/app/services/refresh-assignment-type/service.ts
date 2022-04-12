import { inject } from '@ember/service';
import Service from '@ember/service';
import type Store from '@ember-data/store';
import { tracked } from '@glimmer/tracking';
import type AssignmentTypeModel from 'ember-boilerplate/models/assignment-type';
import type { TypedBufferedChangeset } from 'ember-form-changeset-validations';
import type { FormsAssignmentTypeDTO } from 'ember-boilerplate/components/forms/assignment-type/component';

export default class ServicesRefreshAssignmentType extends Service {
  @inject declare store: Store;
  @tracked public assignmentTypes: Array<AssignmentTypeModel> = [];

  async getAllAssignmentTypes() {
    let allAssignmentTypes: Array<AssignmentTypeModel> = [];
    const assignmentTypes = await this.store.query('assignment-type', {
      fields: '*',
      include: 'parents',
    });
    assignmentTypes.forEach((assignmentType) => {
      allAssignmentTypes.push(assignmentType);
    });
    return allAssignmentTypes;
  }

  async getAssignmentTypes() {
    const allAssignmentTypes = await this.getAllAssignmentTypes();
    let assignmentTypes: Array<AssignmentTypeModel> = [];
    allAssignmentTypes.forEach((assignmentType) => {
      if (assignmentType.parents === undefined) {
        assignmentTypes.push(assignmentType);
      }
    });
    return assignmentTypes;
  }

  async getAssignmentTitles(parent: AssignmentTypeModel) {
    const allAssignmentTypes = await this.getAllAssignmentTypes();
    let assignmentTypes: Array<AssignmentTypeModel> = [];
    allAssignmentTypes.forEach((assignmentType) => {
      if (assignmentType.id === parent.id) {
        assignmentTypes.push(assignmentType);
      }
    });
    return assignmentTypes;
  }

  async getAssignedAssignmentTypes() {
    const allAssignments = await this.store.query('assignment', {
      fields: '*',
      include: 'assignmentType',
    });
    let assignedAssignmentTypes: Array<AssignmentTypeModel> = [];
    let assignmentTypeToAdd: AssignmentTypeModel;
    let toAdd: boolean = false;
    allAssignments.forEach((assignment) => {
      assignmentTypeToAdd = assignment.assignmentType;
      toAdd = false;
      if (!assignmentTypeToAdd.get('color')) {
        assignmentTypeToAdd = assignmentTypeToAdd.get('parents');
        if (!assignmentTypeToAdd.get('color')) {
          toAdd = false;
        } else {
          toAdd = true;
        }
      } else {
        toAdd = true;
      }
      if (!assignedAssignmentTypes.includes(assignmentTypeToAdd) && toAdd) {
        assignedAssignmentTypes.push(assignmentTypeToAdd);
      }
    });
    return assignedAssignmentTypes;
  }

  async editAssignmentType(
    changeset: TypedBufferedChangeset<FormsAssignmentTypeDTO>
  ) {
    try {
      const assignmentType = await this.store.queryRecord('assignment-type', {
        id: changeset.get('id'),
      });
      assignmentType.set('name', changeset.get('name'));
      assignmentType.set('color', changeset.get('color'));
      await assignmentType.save();
      return true;
    } catch (e) {
      return false;
    }
  }
  //Function that delete an assignment-type
  //Function that create an assignment-type
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    assignmentTypeService: ServicesRefreshAssignmentType;
  }
}
