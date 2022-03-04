import Model, { attr } from '@ember-data/model';
import type {
  AssignmentTitle,
  AssignmentType,
  Enterprise,
} from 'ember-boilerplate/components/pages/dashboard/week/component';

export default class AssignmentModel extends Model {
  @attr() declare userName: string;
  @attr() declare assignmentType: AssignmentType;
  @attr() declare assignmentTitle: AssignmentTitle;
  @attr() declare enterprise: Enterprise;
  @attr() declare date: string;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    assignment: AssignmentModel;
  }
}
