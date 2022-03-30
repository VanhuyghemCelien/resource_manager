import Model, { attr, hasMany } from '@ember-data/model';
import type AssignmentModel from './assignment';

export default class ResourceModel extends Model {
  @attr() declare image: string;
  @attr() declare emailAddress: string;
  @attr() declare emailAddress2?: string;
  @attr() declare firstName: string;
  @attr() declare lastName: string;
  @attr() declare phoneNumber: string;
  @attr() declare phoneNumber2?: string;
  @attr() declare enterprise: string;
  @attr() declare cost?: string;
  @hasMany('assignment', { async: false })
  declare assignments: AssignmentModel[];
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    resource: ResourceModel;
  }
}
