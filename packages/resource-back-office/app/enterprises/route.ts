import Route from '@ember/routing/route';
import { service } from '@ember/service';
import type Store from '@ember-data/store';

export default class Enterprises extends Route {
  @service declare store: Store;

  model() {
    return this.store.query('enterprise', {
      fields:
        'name,city,address,phoneNumber,phoneNumber2,emailAddress,emailAddress2,enterpriseNumber,vatNumber',
    });
  }
}
