import type Store from '@ember-data/store';
import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class Resources extends Route {
  @service declare store: Store;

  model() {
    return this.store.query('resource', {});
  }
}
