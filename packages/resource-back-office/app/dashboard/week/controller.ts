/* eslint-disable ember/no-controllers */
import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { getWeek } from 'date-fns';

export default class DashboardWeek extends Controller {
  queryParams = ['week'];

  @tracked week = getWeek(new Date());
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    'dashboard/week': DashboardWeek;
  }
}
