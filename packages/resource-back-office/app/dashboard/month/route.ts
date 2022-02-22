import Route from '@ember/routing/route';

// eslint-disable-next-line ember/no-classic-classes
export default class DashboardMonth extends Route {
  model() {
    let cols: number[] = Array(10);
    let resources = Array(8);
    let retunsTBL = {
      cols,
      resources,
    };
    return retunsTBL;
  }
}
