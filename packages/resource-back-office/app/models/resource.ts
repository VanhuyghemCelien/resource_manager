import Model, { attr, hasMany } from '@ember-data/model';
import type AssignmentModel from './assignment';

export default class ResourceModel extends Model {
  @attr() declare image: string;
  @attr() declare emailaddress: string;
  @attr() declare firstname: string;
  @attr() declare lastname: string;
  @attr() declare phonenumber: string;
  @attr() declare roleuser: string;
  @attr() declare enterprise: string;
  @hasMany('assignment', { async: false })
  declare assignments: AssignmentModel[];
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    resource: ResourceModel;
  }
}
