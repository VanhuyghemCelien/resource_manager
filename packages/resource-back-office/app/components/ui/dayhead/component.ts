import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { startOfWeek } from 'date-fns';

interface UiDayheadArgs {
  choosingDay: Date;
  numDay: number;
}

export default class UiDayhead extends Component<UiDayheadArgs> {
  @tracked today: Date = new Date();

  get day() {
    let day = startOfWeek(this.args.choosingDay, { weekStartsOn: 0 });
    day.setDate(day.getDate() + this.args.numDay);
    day.setHours(1);
    return day;
  }
}
