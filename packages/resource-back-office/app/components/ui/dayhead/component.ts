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
    let dayHead = startOfWeek(this.args.choosingDay, { weekStartsOn: 0 });
    dayHead.setDate(dayHead.getDate() + this.args.numDay);
    dayHead.setHours(1);
    return dayHead;
  }
}
