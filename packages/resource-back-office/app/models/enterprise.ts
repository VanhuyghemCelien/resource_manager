import Model, { attr } from '@ember-data/model';

export default class EnterpriseModel extends Model {
  @attr() declare enterpriseId: number;
  @attr() declare name: string;
  @attr() declare city: string;
  @attr() declare address: string;
  @attr() declare emailAddress: string;
  @attr() declare phoneNumber: string;
  @attr() declare emailAddress2?: string;
  @attr() declare phoneNumber2?: string;
  @attr() declare enterpriseNumber?: string;
  @attr() declare vatNumber?: string;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    enterprise: EnterpriseModel;
  }
}
