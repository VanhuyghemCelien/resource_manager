import type Store from '@ember-data/store';
import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import type AssignmentModel from 'ember-boilerplate/models/assignment';
import type AssignmentTypeModel from 'ember-boilerplate/models/assignment-type';
import type EnterpriseModel from 'ember-boilerplate/models/enterprise';
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
  assignment: Partial<AssignmentModel>;
  choosingDay: Date;
  assignmentTitle: Partial<AssignmentTypeModel>;
}

export default class PopupsNewAssignment extends Component<PopupsNewAssignmentArgs> {
  @tracked comment: boolean = false;
  @service declare store: Store;
  @tracked isMorning: boolean = this.args.assignment.isMorning!;
  @tracked isAfternoon: boolean = this.args.assignment.isAfternoon!;
  @tracked assignmentColor: string = '';
  @tracked assignment: Partial<AssignmentModel> = {
    ...this.args.assignment,
    date: this.args.choosingDay,
    resource: this.args.assignment.resource,
  };
  @tracked assignmentType: Partial<AssignmentTypeModel> = {
    name: '',
    color: '',
  };

  @tracked assignmentTitle: Partial<AssignmentTypeModel> = {
    name: '',
    color: '',
    parents: undefined,
  };

  @tracked enterprise: Partial<EnterpriseModel> = {
    name: '',
  };

  @action
  toggleComment() {
    this.comment ? (this.comment = false) : (this.comment = true);
  }

  @action
  async selectType(event: { target: { value: string } }) {
    const value = event.target.value;
    let selected = await this.store.query('assignmentType', {
      filter: { name: value },
      fields: 'color,name',
    });
    this.assignment = {
      ...this.assignment,
      assignmentType: selected.firstObject,
    };
    this.assignmentType = {
      ...this.assignmentType,
      name: selected.firstObject!.name,
      color: selected.firstObject!.color,
    };
  }

  @action
  async selectTitle(event: { target: { value: string } }) {
    const value = event.target.value;
    let selected = await this.store.query('assignmentType', {
      filter: { name: value },
      fields: 'name,color,parents',
    });
    this.assignmentTitle = {
      name: selected.firstObject!.name,
      color: selected.firstObject!.color,
      parents: selected.firstObject!.parents,
    };
  }

  @action
  async selectEnterprise(event: { target: { value: string } }) {
    const value = event.target.value;
    let selected = await this.store.query('enterprise', {
      filter: { name: value },
      fields:
        'name,emailAddress,emailAddress2,phoneNumber,phoneNumber2,city,address,enterpriseNumber,vatNumber',
    });
    this.assignment = {
      ...this.assignment,
      enterprise: selected.firstObject,
    };
    this.enterprise = {
      name: selected.firstObject?.name,
      city: selected.firstObject?.city,
      address: selected.firstObject?.address,
      emailAddress: selected.firstObject?.emailAddress,
      phoneNumber: selected.firstObject?.phoneNumber,
      emailAddress2: selected.firstObject?.emailAddress2,
      phoneNumber2: selected.firstObject?.phoneNumber2,
      enterpriseNumber: selected.firstObject?.enterpriseNumber,
      vatNumber: selected.firstObject?.vatNumber,
    };
  }

  @action
  selectedMorning() {
    if (this.assignment.isMorning) {
      this.assignment.isMorning = false;
    } else {
      this.assignment.isMorning = true;
    }
  }

  @action
  selectedAfternoon() {
    if (this.assignment.isAfternoon) {
      this.assignment.isAfternoon = false;
    } else {
      this.assignment.isAfternoon = true;
    }
  }

  @action
  selectedRemote() {
    if (this.assignment.isRemote) {
      this.assignment.isRemote = false;
    } else {
      this.assignment.isRemote = true;
    }
  }
  @action
  editAssignmentCommentField(event: { target: { value: string } }) {
    this.assignment.comment = event.target.value;
  }
}
