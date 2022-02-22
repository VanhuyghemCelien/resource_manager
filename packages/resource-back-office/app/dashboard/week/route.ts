import Route from '@ember/routing/route';

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
