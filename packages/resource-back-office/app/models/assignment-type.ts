import Model, { attr } from '@ember-data/model';

export default class AssignmentTypeModel extends Model {
  @attr() declare assignmentTypeName: string;
  @attr() declare assignmentTypeColor?: string;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    assignmentType: AssignmentTypeModel;
  }
}
