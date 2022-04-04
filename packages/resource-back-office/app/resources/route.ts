import type Store from '@ember-data/store';
import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class Resources extends Route {
  @service declare store: Store;

  async model() {
    const [resource, enterprise] = await Promise.all([
      this.store.query('resource', {
        fields:
          'firstName,lastName,cost,image,phoneNumber,phoneNumber2,emailAddress,emailAddress2',
        include: 'enterprise',
      }),
      this.store.query('enterprise', {
        fields: 'name,city',
      }),
    ]);
    return { enterprise, resource };
  }
}
