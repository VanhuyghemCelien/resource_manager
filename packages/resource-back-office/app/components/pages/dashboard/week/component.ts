import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { format, startOfWeek } from 'date-fns';
import type Store from '@ember-data/store';
import { service } from '@ember/service';
import type ResourceModel from 'ember-boilerplate/models/resource';

export interface Assignment {
  assignmentType: AssignmentType;
  assignmentTitle: AssignmentTitle;
  enterprise: Enterprise;
  date: Date;
  boolMorning: boolean;
  boolAfternoon: boolean;
  resource?: ResourceModel;
}

export interface AssignmentType {
  assignmentTypeName: string;
  assignmentTypeColor?: string;
}

export interface AssignmentTitle {
  assignmentTitleName: string;
  assignmentTitleColor?: string;
}

export interface Enterprise {
  enterpriseName: string;
}

interface PagesDashboardWeekArgs {}

export default class PagesDashboardWeek extends Component<PagesDashboardWeekArgs> {
  @service declare store: Store;

  today: Date = new Date();
  @tracked displayNewAssignmentModal: boolean = false;
  @tracked displayNewTypeModal: boolean = false;
  @tracked displayNewTitleModal: boolean = false;
  @tracked displayNewEnterpriseModal: boolean = false;
  @tracked choosingDay: Date = new Date();
  @tracked specificDay: Date = new Date();
  @tracked color: boolean = false;
  @tracked comment: boolean = false;
  @tracked resourceName: string = '';
  @tracked assignmentType: AssignmentType = {
    assignmentTypeName: '',
    assignmentTypeColor: '#adab32',
  };
  @tracked assignmentTitle: AssignmentTitle = {
    assignmentTitleName: '',
    assignmentTitleColor: '',
  };
  @tracked enterprise: Enterprise = {
    enterpriseName: '',
  };
  @tracked colorFormat =
    'border-[' + this.assignmentType.assignmentTypeColor + ']';
  @tracked assignment: Assignment = {
    assignmentType: {
      assignmentTypeName: '',
      assignmentTypeColor: '',
    },
    assignmentTitle: {
      assignmentTitleName: '',
      assignmentTitleColor: '',
    },
    enterprise: {
      enterpriseName: '',
    },
    date: new Date(),
    boolMorning: false,
    boolAfternoon: false,
    resource: undefined,
  };

  @action
  addAssignment(
    date: Date,
    resource: ResourceModel,
    boolMorning: boolean,
    boolAfternoon: boolean
  ) {
    console.log(boolMorning);
    console.log(boolAfternoon);
    this.assignment = {
      assignmentType: {
        assignmentTypeName: this.assignmentType.assignmentTypeName,
        assignmentTypeColor: this.assignmentType.assignmentTypeColor,
      },
      assignmentTitle: {
        assignmentTitleName: this.assignmentTitle.assignmentTitleName,
        assignmentTitleColor: this.assignmentTitle.assignmentTitleColor,
      },
      enterprise: {
        enterpriseName: this.enterprise.enterpriseName,
      },
      date: date,
      boolMorning: boolMorning,
      boolAfternoon: boolAfternoon,
      resource: resource,
    };
    const assignment = this.store.createRecord('assignment', this.assignment);
    this.assignment = {
      assignmentType: {
        assignmentTypeName: '',
        assignmentTypeColor: '',
      },
      assignmentTitle: {
        assignmentTitleName: '',
        assignmentTitleColor: '',
      },
      enterprise: {
        enterpriseName: '',
      },
      date: new Date(),
      boolMorning: false,
      boolAfternoon: false,
      resource: undefined,
    };
    assignment.save();
    this.toggleDisplayNewAssignmentModal(this.today, resource, false, false);
  }

  @action
  editAssignmentTypeField(field: string, event: { target: { value: string } }) {
    switch (field) {
      case 'name':
        this.assignmentType.assignmentTypeName = event.target.value;
        break;
      case 'color':
        this.assignmentType.assignmentTypeColor = event.target.value;
        break;
    }
  }

  @action
  editAssignmentTitleField(
    field: string,
    event: { target: { value: string } }
  ) {
    switch (field) {
      case 'name':
        this.assignmentTitle.assignmentTitleName = event.target.value;
        break;
      case 'color':
        this.assignmentTitle.assignmentTitleColor = event.target.value;
        break;
    }
  }

  @action
  editEnterpriseField(event: { target: { value: string } }) {
    this.enterprise.enterpriseName = event.target.value;
  }

  @action
  addAssignmentType() {
    const assignmentType = this.store.createRecord(
      'assignment-type',
      this.assignmentType
    );
    this.assignmentType = {
      assignmentTypeName: '',
      assignmentTypeColor: '',
    };
    assignmentType.save();
    this.toggleDisplayNewTypeModal();
  }

  @action
  addAssignmentTitle() {
    const assignmentTitle = this.store.createRecord(
      'assignment-title',
      this.assignmentTitle
    );
    this.assignmentTitle = {
      assignmentTitleName: '',
      assignmentTitleColor: '',
    };
    assignmentTitle.save();
    this.toggleDisplayNewTitleModal();
  }

  @action
  addEnterprise() {
    const enterprise = this.store.createRecord('enterprise', this.enterprise);
    this.enterprise = {
      enterpriseName: '',
    };
    enterprise.save();
    this.toggleDisplayNewEnterpriseModal();
  }

  @action
  toggleColor() {
    this.color ? (this.color = false) : (this.color = true);
  }

  @action
  toggleDisplayNewAssignmentModal(
    choosingdate?: Date,
    resource?: ResourceModel,
    boolMorning?: boolean,
    boolAfternoon?: boolean
  ) {
    if (this.displayNewAssignmentModal) {
      this.displayNewAssignmentModal = false;
      this.assignment = {
        ...this.assignment,
        boolMorning: false,
        boolAfternoon: false,
      };
    } else {
      this.displayNewAssignmentModal = true;
      this.choosingDay = new Date(choosingdate!);
      this.assignment.resource = resource;
      this.resourceName = resource!.firstname + ' ' + resource!.lastname;
      this.assignment.boolMorning = boolMorning!;
      this.assignment.boolAfternoon = boolAfternoon!;
    }
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
