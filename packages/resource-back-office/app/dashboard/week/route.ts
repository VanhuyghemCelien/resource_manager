import type Store from '@ember-data/store';
import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class DashboardWeek extends Route {
  @service declare store: Store;

  queryParams = {
    week: {
      refreshModel: true,
    },
  };

  async model({ week }: { week: string }) {
    const [resource, assignmentType, assignmentTitle, enterprise, assignment] =
      await Promise.all([
        this.store.findAll('resource', { include: 'assignments' }),
        this.store.findAll('assignment-type'),
        this.store.findAll('assignment-title'),
        this.store.findAll('enterprise'),
        this.store.findAll('assignment'),
      ]);
    console.log(week);
    return {
      resource,
      assignmentType,
      assignmentTitle,
      enterprise,
      assignment,
      week,
    };
  }
}
