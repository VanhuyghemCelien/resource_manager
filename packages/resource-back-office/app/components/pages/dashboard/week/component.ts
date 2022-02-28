import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { format, startOfWeek } from 'date-fns';

interface PagesDashboardWeekArgs {}

export default class PagesDashboardWeek extends Component<PagesDashboardWeekArgs> {
  today: Date = new Date();
  @tracked displayNewAssignmentModal: boolean = false;
  @tracked choosingDay: Date = new Date();
  @tracked specificDay: Date = new Date();
  @tracked here: boolean = false;
  @tracked resourceName: string = '';

  @action
  toggleHere() {
    this.here ? (this.here = false) : (this.here = true);
  }

  @action
  toggleDisplayNewAssignmentModal(
    resourceLastName: string,
    resourceFirstName: string,
    choosingdate: Date
  ) {
    this.displayNewAssignmentModal
      ? (this.displayNewAssignmentModal = false)
      : ((this.displayNewAssignmentModal = true),
        (this.resourceName = resourceFirstName + ' ' + resourceLastName),
        (this.choosingDay = new Date(choosingdate)));
  }

  @action
  choosingDayPlus() {
    this.choosingDay = new Date(
      this.choosingDay.setDate(this.choosingDay.getDate() + 7)
    );
  }

  @action
  choosingDayLess() {
    this.choosingDay = new Date(
      this.choosingDay.setDate(this.choosingDay.getDate() - 7)
    );
  }

  @action
  choosingDayActual() {
    this.choosingDay = new Date();
    this.specificDay = new Date();
  }

  @action
  choosingSpecificDay(event: { target: { value: Date } }) {
    this.specificDay = event.target.value;
    this.choosingDay = new Date(this.specificDay);
  }

  dayFormat(dayDate: Date) {
    let dayFormat = format(dayDate, 'EEEE - d / LL');
    return dayFormat;
  }

  get columns() {
    let cols: number[] = Array(5);
    return cols;
  }

  get resources() {
    let resources: number[] = Array(8);
    return resources;
  }

  get currentMonth() {
    let month: string = format(this.choosingDay, 'MMMM - yyyy');
    return month;
  }

  get numDay() {
    let numDay: number = this.today.getDay();
    return numDay;
  }

  get monday() {
    let monday = startOfWeek(this.choosingDay, {
      weekStartsOn: 0,
    });
    monday.setDate(monday.getDate() + 1);
    return monday;
  }

  get tuesday() {
    let tuesday = startOfWeek(this.choosingDay, { weekStartsOn: 0 });
    tuesday.setDate(tuesday.getDate() + 2);
    return tuesday;
  }

  get wednesday() {
    let wednesday = startOfWeek(this.choosingDay, { weekStartsOn: 0 });
    wednesday.setDate(wednesday.getDate() + 3);
    return wednesday;
  }

  get thursday() {
    let thursday = startOfWeek(this.choosingDay, { weekStartsOn: 0 });
    thursday.setDate(thursday.getDate() + 4);
    return thursday;
  }

  get friday() {
    let friday = startOfWeek(this.choosingDay, { weekStartsOn: 0 });
    friday.setDate(friday.getDate() + 5);
    return friday;
  }
}
