import Model, { attr } from '@ember-data/model';

export default class EnterpriseModel extends Model {
  @attr() declare enterpriseid: Number;
  @attr() declare name: string;
  @attr() declare city: string;
  @attr() declare emailaddress: string;
  @attr() declare phonenumber: string;
  @attr() declare emailaddress2: string;
  @attr() declare phonenumber2: string;
  @attr() declare enterprisenumber: string;
  @attr() declare vatnumber: string;
  @attr() declare address: string;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    enterprise: EnterpriseModel;
  }
}
