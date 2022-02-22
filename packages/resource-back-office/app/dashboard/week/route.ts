import Route from '@ember/routing/route';

// eslint-disable-next-line ember/no-classic-classes
export default class DashboardWeek extends Route {
  // normal class body definition here

  model() {
    let cols: number[] = Array(5);
    let resources = Array(8);
    let retunsTBL = {
      cols,
      resources,
    };
    return retunsTBL;
  }
}
