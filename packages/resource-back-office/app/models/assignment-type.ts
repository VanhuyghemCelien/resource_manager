import Model, { attr, belongsTo } from '@ember-data/model';

export default class AssignmentTypeModel extends Model {
  @attr() declare name: string;
  @attr() declare color?: string;
  @belongsTo('assignmentType')
  declare parents?: AssignmentTypeModel;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    assignmentType: AssignmentTypeModel;
  }
}
