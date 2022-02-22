import Route from '@ember/routing/route';
import type RouterService from '@ember/routing/router-service';
import { service } from '@ember/service';

// eslint-disable-next-line ember/no-classic-classes
export default class Dashboard extends Route {
  @service router!: RouterService;

  x = 1;
  beforeModel() {
    this.router.transitionTo('dashboard.week', this.x);
  }
}
