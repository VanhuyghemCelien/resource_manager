import type Store from '@ember-data/store';
import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import type { Assignment } from 'ember-boilerplate/components/pages/dashboard/week/component';
import type ResourceModel from 'ember-boilerplate/models/resource';

interface PopupsNewAssignmentArgs {
  displayNewTypeModal: boolean;
  displayNewTitleModal: boolean;
  displayNewEnterpriseModal: boolean;
  resourceName: string;
  toggleDisplayNewAssignmentModal: () => void;
  toggleDisplayNewTypeModal: () => void;
  toggleDisplayNewTitleModal: () => void;
  toggleDisplayNewEnterpriseModal: () => void;
  addAssignment: (
    date: Date,
    resource: ResourceModel,
    boolMorning: boolean,
    boolAfternoon: boolean
  ) => void;
  assignment: Assignment;
  choosingDay: Date;
}

export default class PopupsNewAssignment extends Component<PopupsNewAssignmentArgs> {
  @tracked comment: boolean = false;
  @service declare store: Store;
  @tracked boolMorning: boolean = this.args.assignment.boolMorning;
  @tracked boolAfternoon: boolean = this.args.assignment.boolAfternoon;

  @action
  toggleComment() {
    this.comment ? (this.comment = false) : (this.comment = true);
  }

  @action
  async selectType(event: { target: { value: string } }) {
    const value = event.target.value;
    let selected = await this.store.queryRecord('assignment-type', {
      name: value,
    });
    this.args.assignment.assignmentType = {
      assignmentTypeName: selected.assignmentTypeName,
      assignmentTypeColor: selected.assignmentTypeColor,
    };
  }

  @action
  selectTitle(event: { target: { value: string } }) {
    this.args.assignment.assignmentTitle = {
      assignmentTitleName: event.target.value,
    };
  }

  @action
  selectEnterprise(event: { target: { value: string } }) {
    this.args.assignment.enterprise = {
      enterpriseName: event.target.value,
    };
  }

  @action
  selectedMorning() {
    if (this.boolMorning) {
      this.boolMorning = false;
    } else {
      this.boolMorning = true;
    }
  }

  @action
  selectedAfternoon() {
    if (this.boolAfternoon) {
      this.boolAfternoon = false;
    } else {
      this.boolAfternoon = true;
    }
  }
}
