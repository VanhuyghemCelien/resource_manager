import Model, { attr, belongsTo } from '@ember-data/model';
import type AssignmentTypeModel from './assignment-type';
import type EnterpriseModel from './enterprise';
import type ResourceModel from './resource';

export default class AssignmentModel extends Model {
  @attr('date') declare date: Date;
  @attr() declare isMorning: boolean;
  @attr() declare isAfternoon: boolean;
  @attr() declare isRemote: boolean;
  @attr() declare comment?: String;
  @belongsTo('resource')
  declare resource: ResourceModel;
  @belongsTo('assignmentType')
  declare assignmentType: AssignmentTypeModel;
  @belongsTo('enterprise')
  declare enterprise: EnterpriseModel;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    assignment: AssignmentModel;
  }
}
