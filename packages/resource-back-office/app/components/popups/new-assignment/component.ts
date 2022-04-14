import type Store from '@ember-data/store';
import { action } from '@ember/object';
import { inject, service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import type AssignmentModel from 'ember-boilerplate/models/assignment';
import type AssignmentTypeModel from 'ember-boilerplate/models/assignment-type';
import type EnterpriseModel from 'ember-boilerplate/models/enterprise';
import type ResourceModel from 'ember-boilerplate/models/resource';
import type AssignmentTypeService from 'ember-boilerplate/services/assignment-type-service';
import type LocalStorage from 'ember-boilerplate/services/localstorage';

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
  @inject declare localstorage: LocalStorage;

  @tracked isFirstItem: boolean = false;
  @tracked isSecondItem: boolean = false;
  @tracked isThirdItem: boolean = false;
  @tracked isFirstExist: boolean = false;
  @tracked isSecondExist: boolean = false;
  @tracked isThirdExist: boolean = false;
  @tracked isMorning: boolean = this.args.assignment.isMorning!;
  @tracked isAfternoon: boolean = this.args.assignment.isAfternoon!;
  @tracked assignmentColor: string = '';
  @inject declare assignmentTypeService: AssignmentTypeService;

  @tracked assignment: Partial<AssignmentModel> = {
    ...this.args.assignment,
    date: this.args.choosingDay,
    resource: this.args.assignment.resource,
  };
  @tracked firstAssignment: Partial<AssignmentModel> = {
    ...this.assignment,
  };
  @tracked secondAssignment: Partial<AssignmentModel> = {
    ...this.assignment,
  };
  @tracked thirdAssignment: Partial<AssignmentModel> = {
    ...this.assignment,
  };
  @tracked assignmentType: Partial<AssignmentTypeModel> = {
    name: '',
    color: '',
    children: undefined,
  };

  @tracked assignmentTitle: Partial<AssignmentTypeModel> = {
    name: '',
    color: '',
    parents: undefined,
  };

  @tracked enterprise: Partial<EnterpriseModel> = {
    name: '',
  };

  @tracked typeSelected: boolean = false;
  @tracked assignmentTypeToDisplay: Array<AssignmentTypeModel> = [];
  @tracked assignmentTitleToDisplay: Array<AssignmentTypeModel> = [];

  constructor(o: unknown, args: PopupsNewAssignmentArgs) {
    super(o, args);
    this.assignmentTypeService.getAssignmentTypes().then((assignmentType) => {
      this.assignmentTypeToDisplay = assignmentType;
    });
    this.localstorage
      .getItems('first')
      .then((firstassignment) => {
        this.firstAssignment = {
          date: undefined,
          isMorning: false,
          isAfternoon: false,
          isRemote: firstassignment!.isRemote,
          comment: firstassignment!.comment,
          enterprise: firstassignment!.enterprise,
          assignmentType: firstassignment!.assignmentType,
        };
        this.isFirstExist = true;
      })
      .catch(() => {
        this.firstAssignment = {
          date: new Date(),
          isMorning: false,
          isAfternoon: false,
          isRemote: false,
          comment: '',
          enterprise: undefined,
          assignmentType: undefined,
        };
      });
    this.localstorage
      .getItems('second')
      .then((secondassignment) => {
        this.secondAssignment = {
          date: undefined,
          isMorning: false,
          isAfternoon: false,
          isRemote: secondassignment!.isRemote,
          comment: secondassignment!.comment,
          enterprise: secondassignment!.enterprise,
          assignmentType: secondassignment!.assignmentType,
        };
        this.isSecondExist = true;
      })
      .catch(() => {
        this.secondAssignment = {
          date: new Date(),
          isMorning: false,
          isAfternoon: false,
          isRemote: false,
          comment: '',
          enterprise: undefined,
          assignmentType: undefined,
        };
      });
    this.localstorage
      .getItems('third')
      .then((thirdassignment) => {
        this.thirdAssignment = {
          date: undefined,
          isMorning: false,
          isAfternoon: false,
          isRemote: thirdassignment!.isRemote,
          comment: thirdassignment!.comment,
          enterprise: thirdassignment!.enterprise,
          assignmentType: thirdassignment!.assignmentType,
        };
        this.isThirdExist = true;
      })
      .catch(() => {
        this.thirdAssignment = {
          date: new Date(),
          isMorning: false,
          isAfternoon: false,
          isRemote: false,
          comment: '',
          enterprise: undefined,
          assignmentType: undefined,
        };
      });
  }

  @action
  selectFirstItem() {
    if (this.isFirstItem) {
      this.isFirstItem = false;
      this.assignment = {
        ...this.assignment,
        isRemote: false,
        comment: '',
        enterprise: undefined,
        assignmentType: undefined,
      };
      this.comment = false;
    } else {
      this.isFirstItem = true;
      this.isSecondItem = false;
      this.isThirdItem = false;
      this.assignment = {
        ...this.assignment,
        isRemote: this.firstAssignment.isRemote,
        comment: this.firstAssignment.comment,
        enterprise: this.firstAssignment.enterprise,
        assignmentType: this.firstAssignment.assignmentType,
      };
      this.comment = true;
    }
  }

  @action
  selectSecondItem() {
    if (this.isSecondItem) {
      this.isSecondItem = false;
      this.assignment = {
        ...this.assignment,
        isRemote: false,
        comment: '',
        enterprise: undefined,
        assignmentType: undefined,
      };
      this.comment = false;
    } else {
      this.isFirstItem = false;
      this.isSecondItem = true;
      this.isThirdItem = false;
      this.assignment = {
        ...this.assignment,
        isRemote: this.secondAssignment.isRemote,
        comment: this.secondAssignment.comment,
        enterprise: this.secondAssignment.enterprise,
        assignmentType: this.secondAssignment.assignmentType,
      };
      this.comment = true;
    }
  }

  @action
  selectThirdItem() {
    if (this.isThirdItem) {
      this.isThirdItem = false;
      this.assignment = {
        ...this.assignment,
        isRemote: false,
        comment: '',
        enterprise: undefined,
        assignmentType: undefined,
      };
      this.comment = false;
    } else {
      this.isFirstItem = false;
      this.isThirdItem = true;
      this.isSecondItem = false;
      this.assignment = {
        ...this.assignment,
        isRemote: this.thirdAssignment.isRemote,
        comment: this.thirdAssignment.comment,
        enterprise: this.thirdAssignment.enterprise,
        assignmentType: this.thirdAssignment.assignmentType,
      };
      this.comment = true;
    }
  }

  @action
  toggleComment() {
    this.comment ? (this.comment = false) : (this.comment = true);
  }

  @action
  async selectType(event: { target: { value: string } }) {
    const value = event.target.value;
    let selected = await this.store.query('assignment-type', {
      filter: { name: value },
      fields: 'color,name,children',
    });
    this.assignment = {
      ...this.assignment,
      assignmentType: selected.firstObject,
    };
    this.assignmentType = {
      ...this.assignment.assignmentType,
    };
    this.args.assignment.assignmentType = selected.firstObject;
    this.typeSelected = true;

    this.assignmentTypeService
      .getAssignmentTitles(selected.firstObject.id)
      .then((assignmentTitle) => {
        this.assignmentTitleToDisplay = assignmentTitle;
      });
  }

  @action
  async selectTitle(event: { target: { value: string } }) {
    const value = event.target.value;
    let selected = await this.store.query('assignment-type', {
      filter: { name: value },
      fields: 'name,color,parents',
    });
    this.assignmentTitle = selected.firstObject;
    this.assignment = {
      ...this.assignment,
      assignmentType: selected.firstObject,
    };
    this.args.assignment.assignmentType = selected.firstObject;
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

  get verif() {
    if (this.isFirstItem) {
      return true;
    }
    if (this.isSecondItem) {
      return true;
    }
    if (this.isThirdItem) {
      return true;
    }
    return false;
  }
}
