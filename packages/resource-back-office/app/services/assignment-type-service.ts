import { inject } from '@ember/service';
import Service from '@ember/service';
import type Store from '@ember-data/store';
import { tracked } from '@glimmer/tracking';
import type AssignmentTypeModel from 'ember-boilerplate/models/assignment-type';
import type ResourceModel from 'ember-boilerplate/models/resource';

export default class AssignmentTypeService extends Service {
  @inject declare store: Store;
  @tracked public assignmentTypesLegendToDisplay: Array<AssignmentTypeModel> =
    [];

  async getAllAssignmentTypes() {
    let allAssignmentTypes: Array<AssignmentTypeModel> = [];
    const assignmentTypes = await this.store.query('assignmentType', {
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
      if (!assignmentType.parents.get('name')) {
        assignmentTypes.push(assignmentType);
      }
    });
    return assignmentTypes;
  }

  async getAssignmentTitles(parentId: string) {
    const allAssignmentTypes = await this.getAllAssignmentTypes();
    let assignmentTypes: Array<AssignmentTypeModel> = [];
    allAssignmentTypes.forEach((assignmentType) => {
      if (assignmentType.parents.get('id') === parentId) {
        assignmentTypes.push(assignmentType);
      }
    });
    return assignmentTypes;
  }

  async getAssignedTypes(resources: Array<ResourceModel>) {
    let assignedTypes: Array<AssignmentTypeModel> = [];
    resources.forEach((resource) => {
      if (resource.get('assignment').length > 0) {
        resource.get('assignment').forEach((assignment) => {
          if (assignment.assignmentType.get('color')) {
            if (!assignedTypes.includes(assignment.assignmentType)) {
              assignedTypes.push(assignment.assignmentType);
            }
          } else if (assignment.assignmentType.get('parents').get('color')) {
            if (
              !assignedTypes.includes(assignment.assignmentType.get('parents'))
            ) {
              assignedTypes.push(assignment.assignmentType.get('parents'));
            }
          }
        });
      }
    });

    return assignedTypes;
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    assignmentTypeService: AssignmentTypeService;
  }
}
