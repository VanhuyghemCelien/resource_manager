import Route from '@ember/routing/route';
import type RouterService from '@ember/routing/router-service';
import { service } from '@ember/service';

export default class Dashboard extends Route.extend({
  // anything which *must* be merged to prototype here
}) {
  @service router!: RouterService;

  x = 1;
  beforeModel() {
    this.router.transitionTo('dashboard.month', this.x);
  }
}
