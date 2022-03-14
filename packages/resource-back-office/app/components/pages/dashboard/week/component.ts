import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { format, subWeeks } from 'date-fns';
import type Store from '@ember-data/store';
import { service } from '@ember/service';
import type ResourceModel from 'ember-boilerplate/models/resource';
import getWeek from 'date-fns/getWeek';

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
  name: string;
}

interface PagesDashboardWeekArgs {
  model: { week: number };
}

export default class PagesDashboardWeek extends Component<PagesDashboardWeekArgs> {
  @service declare store: Store;

  today: Date = new Date();
  // Nomenclature variables
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
    name: '',
  };
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
      name: '',
    },
    date: new Date(),
    boolMorning: false,
    boolAfternoon: false,
    resource: undefined,
  };

  // TRAVAILLER AVEC LES CHANGESETS POUR LA VALIDATION
  @action
  addAssignment(
    date: Date,
    resource: ResourceModel,
    assignmentNew: Assignment
  ) {
    this.assignment = {
      assignmentType: {
        assignmentTypeName: assignmentNew.assignmentType.assignmentTypeName,
        assignmentTypeColor: assignmentNew.assignmentType.assignmentTypeColor,
      },
      assignmentTitle: {
        assignmentTitleName: assignmentNew.assignmentTitle.assignmentTitleName,
        assignmentTitleColor:
          assignmentNew.assignmentTitle.assignmentTitleColor,
      },
      enterprise: {
        name: assignmentNew.enterprise.name,
      },
      date: date,
      boolMorning: assignmentNew.boolMorning,
      boolAfternoon: assignmentNew.boolAfternoon,
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
        name: '',
      },
      date: new Date(),
      boolMorning: false,
      boolAfternoon: false,
      resource: undefined,
    };
    // rajouter async await + gestion erreurs
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
    this.enterprise.name = event.target.value;
  }

  @action
  addAssignmentType() {
    const assignmentType = this.store.createRecord(
      'assignment-type',
      this.assignmentType
    );
    // changeset
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
      name: '',
    };
    enterprise.save();
    this.toggleDisplayNewEnterpriseModal();
  }

  @action
  toggleColor() {
    this.color = this.color ? false : true;
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
      this.resourceName = resource!.firstName + ' ' + resource!.lastName;
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

  get choosingDateLess() {
    return getWeek(subWeeks(this.choosingDay, 1), { weekStartsOn: 0 });
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

  get currentMonth() {
    let month: string = format(this.choosingDay, 'MMMM - yyyy');
    return month;
  }

  get numDay() {
    let numDay: number = this.today.getDay();
    return numDay;
  }
}
