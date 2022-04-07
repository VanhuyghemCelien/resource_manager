import { endOfWeek, getYear, startOfWeek } from 'date-fns';
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

  getDateOfISOWeek(w: number, y: number) {
    let simple = new Date(y, 0, 1 + (w - 2) * 7);
    let dow = simple.getDay();
    let ISOweekStart = simple;
    if (dow <= 4) ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    else ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
    return ISOweekStart;
  }

  firstDayOfWeek(x: Date) {
    let start = startOfWeek(x);
    return start;
  }

  lastDayOfWeek(x: Date) {
    let end = endOfWeek(x);
    return end;
  }

  async model({ week }: { week: number }) {
    var year = getYear(new Date());
    var first = this.getDateOfISOWeek(week, year);
    var lastIso = endOfWeek(first).toISOString();
    var firstIso = first.toISOString();
    const [resource, assignmentType, enterprise] = await Promise.all([
      this.store.query('resource', {
        firstDate: firstIso,
        lastDate: lastIso,
      }),
      this.store.query('assignmentType', {
        fields: '*',
      }),
      this.store.query('enterprise', {
        fields: '*',
      }),
    ]);
    return {
      first,
      resource,
      week,
      assignmentType,
      enterprise,
    };
  }
}
