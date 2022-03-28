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
    var simple = new Date(y, 0, 1 + (w - 2) * 7);
    var dow = simple.getDay();
    var ISOweekStart = simple;
    if (dow <= 4) ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    else ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
    return ISOweekStart;
  }

  firstDayOfWeek(x: Date) {
    var start = startOfWeek(x);
    return start;
  }

  lastDayOfWeek(x: Date) {
    var end = endOfWeek(x);
    return end;
  }

  async model({ week }: { week: number }) {
    var year = getYear(new Date());
    var first = this.getDateOfISOWeek(week, year);
    var last = endOfWeek(first);
    console.log(first);
    console.log(last);
    const [resource] = await Promise.all([
      this.store.query('resource', {
        fields: '*',
        // filter: {
        //   $and: [
        //     { 'assignments.date': { $lte: last } },
        //     { 'assignments.date': { $gte: first } },
        //   ],
        // },
      }),
    ]);
    const [assignmentType] = await Promise.all([
      this.store.query('assignmentType', {
        fields: '*',
      }),
    ]);
    return {
      resource,
      week,
      assignmentType,
    };
  }
}
