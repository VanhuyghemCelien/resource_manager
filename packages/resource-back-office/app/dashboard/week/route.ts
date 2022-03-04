import type Store from '@ember-data/store';
import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class DashboardWeek extends Route {
  @service declare store: Store;

  async model() {
    const [resource, assignmentType, assignmentTitle, enterprise, assignment] =
      await Promise.all([
        this.store.findAll('resource'),
        this.store.findAll('assignment-type'),
        this.store.findAll('assignment-title'),
        this.store.findAll('enterprise'),
        this.store.findAll('assignment'),
      ]);
    return {
      resource,
      assignmentType,
      assignmentTitle,
      enterprise,
      assignment,
    };
  }
}
