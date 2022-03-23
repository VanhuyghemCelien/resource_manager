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
    const [resource] = await Promise.all([
      this.store.findAll('resource', {
        include: 'assignments,assignments.assignmentTypes,enterprises',
        $and:[ {assignment.date: {$lte: 1},},],
      }),
    ]);
    return {
      resource,
      week,
    };
  }
}
