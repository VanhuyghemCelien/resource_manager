import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { startOfWeek } from 'date-fns';
import type ResourceModel from 'ember-boilerplate/models/resource';

interface UiAssignmentArgs {
  resource: ResourceModel;
  choosingDay: Date;
}

// eslint-disable-next-line ember/no-empty-glimmer-component-classes
export default class UiAssignment extends Component<UiAssignmentArgs> {
  @tracked displayNewAssignmentModal: boolean = false;
  @tracked displayNewTypeModal: boolean = false;
  @tracked displayNewTitleModal: boolean = false;
  @tracked displayNewEnterpriseModal: boolean = false;
  @tracked resourceName: string = '';

  @action
  toggleDisplayNewAssignmentModal(
    choosingdate: Date,
    resourceFirstName: string,
    resourceLastName: string
  ) {
    this.displayNewAssignmentModal
      ? (this.displayNewAssignmentModal = false)
      : ((this.displayNewAssignmentModal = true),
        (this.resourceName = resourceFirstName + ' ' + resourceLastName),
        (this.args.choosingDay = new Date(choosingdate)));
  }

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

  get monday() {
    let monday = startOfWeek(this.args.choosingDay, {
      weekStartsOn: 0,
    });
    monday.setDate(monday.getDate() + 1);
    return monday;
  }

  get tuesday() {
    let tuesday = startOfWeek(this.args.choosingDay, { weekStartsOn: 0 });
    tuesday.setDate(tuesday.getDate() + 2);
    return tuesday;
  }

  get wednesday() {
    let wednesday = startOfWeek(this.args.choosingDay, { weekStartsOn: 0 });
    wednesday.setDate(wednesday.getDate() + 3);
    return wednesday;
  }

  get thursday() {
    let thursday = startOfWeek(this.args.choosingDay, { weekStartsOn: 0 });
    thursday.setDate(thursday.getDate() + 4);
    return thursday;
  }

  get friday() {
    let friday = startOfWeek(this.args.choosingDay, { weekStartsOn: 0 });
    friday.setDate(friday.getDate() + 5);
    return friday;
  }
}
