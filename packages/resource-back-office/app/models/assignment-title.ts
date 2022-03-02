import Model, { attr } from '@ember-data/model';

export default class AssignmentTitleModel extends Model {
  @attr() declare assignmentTitleName: string;
  @attr() declare assignmentTitleColor?: string;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    assignmentTitle: AssignmentTitleModel;
  }
}
