import Model, { attr } from '@ember-data/model';

export default class ResourceModel extends Model {
  @attr() declare resourceid: number;
  @attr() declare image: string;
  @attr() declare emailaddress: string;
  @attr() declare emailaddress2?: string;
  @attr() declare firstname: string;
  @attr() declare lastname: string;
  @attr() declare phonenumber: string;
  @attr() declare phonenumber2?: string;
  @attr() declare roleuser: string;
  @attr() declare enterprise: string;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    resource: ResourceModel;
  }
}
