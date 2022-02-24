import Route from '@ember/routing/route';
import { service } from '@ember/service';
import type Store from '@ember-data/Store';

export default class Enterprises extends Route {
  @service declare store: Store;

  model() {
    return this.store.findAll('enterprise');
  }
}
