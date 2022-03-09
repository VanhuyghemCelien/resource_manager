import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { startOfWeek } from 'date-fns';
import type ResourceModel from 'ember-boilerplate/models/resource';

interface UiAssignmentArgs {
  resource: ResourceModel;
  choosingDay: Date;
  toggleDisplayNewAssignmentModal: (
    choosingdate: Date,
    resource: ResourceModel,
    boolMorning: boolean,
    boolAfternoon: boolean
  ) => void;
}

export default class UiAssignment extends Component<UiAssignmentArgs> {
  @tracked choosingDay: Date = new Date();

  get assignmentMondayMorning() {
    const res = this.args.resource.assignments.find((e) => {
      return e.date.getDay() === 1 && e.boolMorning;
    });
    return res;
  }

  get assignmentMondayAfternoon() {
    const res = this.args.resource.assignments.find((e) => {
      return e.date.getDay() === 1 && e.boolAfternoon;
    });
    return res;
  }

  get assignmentTuesdayMorning() {
    const res = this.args.resource.assignments.find((e) => {
      return e.date.getDay() === 2 && e.boolMorning;
    });
    return res;
  }

  get assignmentTuesdayAfternoon() {
    const res = this.args.resource.assignments.find((e) => {
      return e.date.getDay() === 2 && e.boolAfternoon;
    });
    return res;
  }

  get assignmentWednesdayMorning() {
    const res = this.args.resource.assignments.find((e) => {
      return e.date.getDay() === 3 && e.boolMorning;
    });
    return res;
  }

  get assignmentWednesdayAfternoon() {
    const res = this.args.resource.assignments.find((e) => {
      return e.date.getDay() === 3 && e.boolAfternoon;
    });
    return res;
  }

  get assignmentThursdayMorning() {
    const res = this.args.resource.assignments.find((e) => {
      return e.date.getDay() === 4 && e.boolMorning;
    });
    return res;
  }

  get assignmentThursdayAfternoon() {
    const res = this.args.resource.assignments.find((e) => {
      return e.date.getDay() === 4 && e.boolAfternoon;
    });
    return res;
  }

  get assignmentFridayMorning() {
    const res = this.args.resource.assignments.find((e) => {
      return e.date.getDay() === 5 && e.boolMorning;
    });
    return res;
  }

  get assignmentFridayAfternoon() {
    const res = this.args.resource.assignments.find((e) => {
      return e.date.getDay() === 5 && e.boolAfternoon;
    });
    return res;
  }

  get isBusyMonday() {
    return this.args.resource.assignments.find((e) => {
      return e.date.getDay() === 1;
    });
  }

  get isBusyTuesday() {
    return this.args.resource.assignments.find((e) => {
      return e.date.getDay() === 2;
    });
  }

  get isBusyWednesday() {
    return this.args.resource.assignments.find((e) => {
      return e.date.getDay() === 3;
    });
  }

  get isBusyThursday() {
    return this.args.resource.assignments.find((e) => {
      return e.date.getDay() === 4;
    });
  }

  get isBusyFriday() {
    return this.args.resource.assignments.find((e) => {
      return e.date.getDay() === 5;
    });
  }

  get monday() {
    let monday = startOfWeek(this.choosingDay, {
      weekStartsOn: 0,
    });
    monday.setDate(monday.getDate() + 1);
    monday.setHours(1); //a modifier pour le utc//
    return monday;
  }

  get tuesday() {
    let tuesday = startOfWeek(this.choosingDay, { weekStartsOn: 0 });
    tuesday.setDate(tuesday.getDate() + 2);
    tuesday.setHours(1); //a modifier pour le utc//
    return tuesday;
  }

  get wednesday() {
    let wednesday = startOfWeek(this.choosingDay, { weekStartsOn: 0 });
    wednesday.setDate(wednesday.getDate() + 3);
    wednesday.setHours(1); //a modifier pour le utc//
    return wednesday;
  }

  get thursday() {
    let thursday = startOfWeek(this.choosingDay, { weekStartsOn: 0 });
    thursday.setDate(thursday.getDate() + 4);
    thursday.setHours(1); //a modifier pour le utc//
    return thursday;
  }

  get friday() {
    let friday = startOfWeek(this.choosingDay, { weekStartsOn: 0 });
    friday.setDate(friday.getDate() + 5);
    friday.setHours(1); //a modifier pour le utc//
    return friday;
  }
}
