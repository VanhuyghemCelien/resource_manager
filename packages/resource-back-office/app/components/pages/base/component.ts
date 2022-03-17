import Component from '@glimmer/component';
import { inject } from '@ember/service';
import type RouterService from '@ember/routing/router-service';

interface PagesBaseArgs {}

export default class PagesBase extends Component<PagesBaseArgs> {
  isExpanded = false;
  @inject declare router: RouterService;

  get route() {
    let route: string = this.router.currentRouteName;
    return route;
  }
}
