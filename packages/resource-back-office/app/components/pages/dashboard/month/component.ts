import Component from '@glimmer/component';

interface PagesDashboardMonthArgs {}

export default class PagesDashboardMonth extends Component<PagesDashboardMonthArgs> {
  get columns() {
    let cols: number[] = Array(10);
    return cols;
  }

  get resources() {
    let resources: number[] = Array(8);
    return resources;
  }
}
