import Component from '@glimmer/component';
import type ResourceModel from 'ember-boilerplate/models/resource';

interface UiHalfdayArgs {
  resource: ResourceModel;
  boolMorning: boolean;
  numDay: number;
}

export default class UiHalfday extends Component<UiHalfdayArgs> {
  get inverseBoolMorning() {
    return !this.args.boolMorning;
  }
  get assignment() {
    const res = this.args.resource.assignments.find((e) => {
      if (this.args.boolMorning) {
        return e.date.getDay() === this.args.numDay && e.boolMorning;
      }
      return e.date.getDay() === this.args.numDay && e.boolAfternoon;
    });
    return res;
  }
}
