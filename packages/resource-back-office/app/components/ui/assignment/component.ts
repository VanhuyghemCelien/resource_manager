import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { startOfWeek } from 'date-fns';
import type ResourceModel from 'ember-boilerplate/models/resource';

interface UiAssignmentArgs {
  resource: ResourceModel;
  choosingDay: Date;
  toggleDisplayNewAssignmentModal: (
    choosingdate: Date,
    resourceFirstName: string,
    resourceLastName: string
  ) => void;
}

export default class UiAssignment extends Component<UiAssignmentArgs> {
  @tracked displayNewAssignmentModal: boolean = false;
  @tracked displayNewTypeModal: boolean = false;
  @tracked displayNewTitleModal: boolean = false;
  @tracked displayNewEnterpriseModal: boolean = false;
  @tracked resourceName: string = '';
  @tracked choosingDay: Date = new Date();

  @action
  toggleDisplayNewTypeModal() {
    this.displayNewTypeModal
      ? (this.displayNewTypeModal = false)
      : (this.displayNewTypeModal = true);
  }

  @action
  toggleDisplayNewTitleModal() {
    this.displayNewTitleModal
      ? (this.displayNewTitleModal = false)
      : (this.displayNewTitleModal = true);
  }

  @action
  toggleDisplayNewEnterpriseModal() {
    this.displayNewEnterpriseModal
      ? (this.displayNewEnterpriseModal = false)
      : (this.displayNewEnterpriseModal = true);
  }

  get isBusyMonday() {
    console.log(this.args.resource);
    return this.args.resource.assignments.find((e) => {
      return e.date.getDay() === 1;
    });
  }

  get isBusyTuesday() {
    console.log(this.args.resource);
    return this.args.resource.assignments.find((e) => {
      return e.date.getDay() === 2;
    });
  }

  get isBusyWednesday() {
    console.log(this.args.resource);
    return this.args.resource.assignments.find((e) => {
      return e.date.getDay() === 3;
    });
  }

  get isBusyThursday() {
    console.log(this.args.resource);
    return this.args.resource.assignments.find((e) => {
      return e.date.getDay() === 4;
    });
  }

  get isBusyFriday() {
    console.log(this.args.resource);
    return this.args.resource.assignments.find((e) => {
      return e.date.getDay() === 5;
    });
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
