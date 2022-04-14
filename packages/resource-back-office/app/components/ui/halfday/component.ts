import Component from '@glimmer/component';
import type ResourceModel from 'ember-boilerplate/models/resource';
import startOfWeek from 'date-fns/startOfWeek';

interface UiHalfdayArgs {
  resource: ResourceModel;
  boolMorning: boolean;
  choosingDay: Date;
  numDay: number;
  toggleDisplayNewAssignmentModal: (
    choosingdate: Date,
    resource: ResourceModel,
    boolMorning: boolean,
    boolAfternoon: boolean
  ) => void;
}

export default class UiHalfday extends Component<UiHalfdayArgs> {
  get inverseBoolMorning() {
    return !this.args.boolMorning;
  }
  get assignment() {
    // console.log(this.args.resource);
    const res = this.args.resource.assignment.find((e) => {
      if (this.args.boolMorning) {
        return e.date.getDay() === this.args.numDay && e.isMorning;
      }
      return e.date.getDay() === this.args.numDay && e.isAfternoon;
    });
    // console.log(res?.assignmentType);
    return res;
  }

  get day() {
    let day = startOfWeek(this.args.choosingDay, { weekStartsOn: 0 });
    day.setDate(day.getDate() + this.args.numDay);
    day.setHours(1);
    return day;
  }

  get bgColor() {
    if (this.assignment?.isMorning || this.assignment?.isAfternoon) {
      if (this.assignment?.get('assignmentType')) {
        return (
          'background-color:' +
          this.assignment?.assignmentType.get('color') +
          ';'
        );
      }
    }
    return undefined;
  }
  get textColor() {
    if (this.assignment?.isMorning || this.assignment?.isAfternoon) {
      if (this.assignment?.get('assignmentType')) {
        return undefined;
      }
      return (
        'color:' +
        this.assignment?.assignmentType.get('parents').get('color') +
        ';'
      );
    }
    return undefined;
  }

  get borderColor() {
    if (this.bgColor) {
      return 'border-color:' + this.bgColor.split(':')[1];
    } else if (this.textColor) {
      return 'border-color:' + this.textColor.split(':')[1];
    }
    return undefined;
  }
}
