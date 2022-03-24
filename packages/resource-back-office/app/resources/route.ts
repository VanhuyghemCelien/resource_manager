import type Store from '@ember-data/store';
import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { Promise } from 'rsvp';

export default class Resources extends Route {
  @service declare store: Store;

  async model() {
    const [resource, enterprise] = await Promise.all([
      this.store.query('resource', {
        fields:
          'firstName,lastName,cost,image,enterprise,phoneNumber,phoneNumber2,emailAddress,emailAddress2',
      }),
      this.store.query('enterprise', { fields: 'id,name,city' }),
    ]);
    return { resource, enterprise };
  }
}
