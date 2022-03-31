import Model, { attr, hasMany } from '@ember-data/model';
import type AssignmentModel from './assignment';
import type ResourceModel from './resource';

export default class EnterpriseModel extends Model {
  @attr() declare name: string;
  @attr() declare city: string;
  @attr() declare address: string;
  @attr() declare emailAddress: string;
  @attr() declare phoneNumber: string;
  @attr() declare emailAddress2?: string;
  @attr() declare phoneNumber2?: string;
  @attr() declare enterpriseNumber?: string;
  @attr() declare vatNumber?: string;
  @hasMany('resource', { async: false })
  declare resources: ResourceModel[];
  @hasMany('assignment', { async: false })
  declare assignments: AssignmentModel[];
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    enterprise: EnterpriseModel;
  }
}
