import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class AssignmentTypeModel extends Model {
  @attr() declare name: string;
  @attr() declare color?: string;
  @hasMany('assignmentType', { inverse: 'parents' })
  declare children?: AssignmentTypeModel;
  @belongsTo('assignmentType', { inverse: 'children' })
  declare parents: AssignmentTypeModel;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    assignmentType: AssignmentTypeModel;
  }
}
