import Component from '@glimmer/component';

interface PagesDashboardWeekArgs {}

export default class PagesDashboardWeek extends Component<PagesDashboardWeekArgs> {
  get columns() {
    let cols: number[] = Array(5);
    return cols;
  }

  get resources() {
    let resources: number[] = Array(8);
    return resources;
  }

  get currentMonth() {
    let today = new Date();
    let numMonth: number = today.getMonth();
    let months: string[] = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return months[numMonth];
  }

  get today() {
    let today = new Date();
    let numDay: number = today.getDay();
    return numDay;
  }

  // get monday(){
  //   let numday: number = this.today;
  //   let x : number = 1%numday
  // }
}
