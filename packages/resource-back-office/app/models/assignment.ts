import Model, { attr, belongsTo } from '@ember-data/model';
import type {
  AssignmentTitle,
  AssignmentType,
  Enterprise,
} from 'ember-boilerplate/components/pages/dashboard/week/component';
import type ResourceModel from './resource';

export default class AssignmentModel extends Model {
  @attr() declare assignmentType: AssignmentType;
  @attr() declare assignmentTitle: AssignmentTitle;
  @attr() declare enterprise: Enterprise;
  @attr('date') declare date: Date;
  @attr() declare boolMorning: boolean;
  @attr() declare boolAfternoon: boolean;
  @belongsTo('resource')
  declare resource: ResourceModel;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    assignment: AssignmentModel;
  }
}
