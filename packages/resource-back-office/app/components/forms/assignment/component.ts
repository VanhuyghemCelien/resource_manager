import type Store from '@ember-data/store';
import { action } from '@ember/object';
import { service, inject } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import type AssignmentModel from 'ember-boilerplate/models/assignment';
import type AssignmentTypeModel from 'ember-boilerplate/models/assignment-type';
import type EnterpriseModel from 'ember-boilerplate/models/enterprise';
import type ResourceModel from 'ember-boilerplate/models/resource';
import type LocalStorage from 'ember-boilerplate/services/localstorage';
import type { BaseFormArgs } from 'ember-form-changeset-validations/components/form';
import BaseForm from 'ember-form-changeset-validations/components/form';

export interface FormsAssignmentDTO {
  isMorning: boolean;
  isAfternoon: boolean;
  isRemote: boolean;
  comment: string;
  date: Date;
  assignmentType: AssignmentTypeModel;
  enterprise: EnterpriseModel;
  resource: ResourceModel;
  color: string;
}

interface FormsAssignmentArgs extends BaseFormArgs<FormsAssignmentDTO> {
  displayNewTypeModal: boolean;
  displayNewTitleModal: boolean;
  displayNewEnterpriseModal: boolean;
  toggleDisplayNewAssignmentModal: () => void;
  toggleDisplayNewTypeModal: () => void;
  toggleDisplayNewTitleModal: () => void;
  toggleDisplayNewEnterpriseModal: () => void;
}

export default class FormsAssignment extends BaseForm<
  FormsAssignmentArgs,
  FormsAssignmentDTO
> {
  @inject declare localstorage: LocalStorage;
  @service declare store: Store;

  @tracked isComment: boolean = false;
  @tracked isFirstExist: boolean = false;
  @tracked isSecondExist: boolean = false;
  @tracked isThirdExist: boolean = false;
  @tracked isFirstItem: boolean = false;
  @tracked isSecondItem: boolean = false;
  @tracked isThirdItem: boolean = false;
  @tracked firstAssignment?: Partial<AssignmentModel>;
  @tracked secondAssignment?: Partial<AssignmentModel>;
  @tracked thirdAssignment?: Partial<AssignmentModel>;

  constructor(o: unknown, args: FormsAssignmentArgs) {
    super(o, args);
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
  logchangeset(event: Event) {
    event.preventDefault();
    console.log(this.args.changeset.get('isMorning'), 'morning');
    console.log(this.args.changeset.get('isAfternoon'), 'afternoon');
    console.log(this.args.changeset.get('isRemote'), 'remote');
    console.log(this.args.changeset.get('comment'), 'comment');
    console.log(this.args.changeset.get('date'), 'date');
    console.log(this.args.changeset.get('assignmentType'), 'type');
    console.log(this.args.changeset.get('enterprise'), 'enterprise');
    console.log(this.args.changeset.get('resource'), 'resource');
  }

  @action
  selectFirstItem() {
    if (this.isFirstItem) {
      this.isFirstItem = false;
      this.args.changeset.rollback;
      // this.assignment = {
      //   ...this.assignment,
      //   isRemote: false,
      //   comment: '',
      //   enterprise: undefined,
      //   assignmentType: undefined,
      // };
      this.isComment = false;
    } else {
      this.isFirstItem = true;
      this.isSecondItem = false;
      this.isThirdItem = false;
      this.args.changeset.set('isRemote', this.firstAssignment?.isRemote);
      this.args.changeset.set('comment', this.firstAssignment?.comment);
      this.args.changeset.set('enterprise', this.firstAssignment?.enterprise);
      this.args.changeset.set(
        'assignmentType',
        this.firstAssignment?.assignmentType
      );
      // this.assignment = {
      //   ...this.assignment,
      //   isRemote: this.firstAssignment.isRemote,
      //   comment: this.firstAssignment.comment,
      //   enterprise: this.firstAssignment.enterprise,
      //   assignmentType: this.firstAssignment.assignmentType,
      // };
      this.isComment = true;
    }
  }

  @action
  selectSecondItem() {
    if (this.isSecondItem) {
      this.isSecondItem = false;
      this.args.changeset.rollback;
      // this.assignment = {
      //   ...this.assignment,
      //   isRemote: false,
      //   comment: '',
      //   enterprise: undefined,
      //   assignmentType: undefined,
      // };
      this.isComment = false;
    } else {
      this.isFirstItem = false;
      this.isSecondItem = true;
      this.isThirdItem = false;
      this.args.changeset.set('isRemote', this.secondAssignment?.isRemote);
      this.args.changeset.set('comment', this.secondAssignment?.comment);
      this.args.changeset.set('enterprise', this.secondAssignment?.enterprise);
      this.args.changeset.set(
        'assignmentType',
        this.secondAssignment?.assignmentType
      );
      // this.assignment = {
      //   ...this.assignment,
      //   isRemote: this.secondAssignment.isRemote,
      //   comment: this.secondAssignment.comment,
      //   enterprise: this.secondAssignment.enterprise,
      //   assignmentType: this.secondAssignment.assignmentType,
      // };
      this.isComment = true;
    }
  }

  @action
  selectThirdItem() {
    if (this.isThirdItem) {
      this.isThirdItem = false;
      this.args.changeset.rollback;
      // this.assignment = {
      //   ...this.assignment,
      //   isRemote: false,
      //   comment: '',
      //   enterprise: undefined,
      //   assignmentType: undefined,
      // };
      this.isComment = false;
    } else {
      this.isFirstItem = false;
      this.isThirdItem = true;
      this.isSecondItem = false;
      this.args.changeset.set('isRemote', this.thirdAssignment?.isRemote);
      this.args.changeset.set('comment', this.thirdAssignment?.comment);
      this.args.changeset.set('enterprise', this.thirdAssignment?.enterprise);
      this.args.changeset.set(
        'assignmentType',
        this.thirdAssignment?.assignmentType
      );
      // this.assignment = {
      //   ...this.assignment,
      //   isRemote: this.thirdAssignment.isRemote,
      //   comment: this.thirdAssignment.comment,
      //   enterprise: this.thirdAssignment.enterprise,
      //   assignmentType: this.thirdAssignment.assignmentType,
      // };
      this.isComment = true;
    }
  }

  @action
  toggleComment() {
    if (this.isComment) {
      this.isComment = false;
    } else {
      this.isComment = true;
    }
  }

  @action
  async selectType(event: { target: { value: string } }) {
    const value = event.target.value;
    let selected = await this.store.query('assignment-type', {
      filter: { name: value },
      fields: 'color,name,children',
    });
    document.getElementById('titleSelect')!.removeAttribute('disabled');
    const titleTable = await this.store.query('assignmentType', {
      fields: 'name,color',
      include: 'parents',
    });
    document.getElementById('titleSelect')!.innerHTML =
      '<option value="" selected disabled>Sélectionnez un titre d\'occupation</option>';
    titleTable.forEach((title) => {
      if (selected.firstObject.id === title.parents.get('id')) {
        document.getElementById('titleSelect')!.innerHTML =
          document.getElementById('titleSelect')!.innerHTML +
          '<option value="' +
          title.get('name') +
          '">' +
          title.get('name') +
          '</option>';
      }
    });
  }

  @action
  async selectTitle(event: { target: { value: string } }) {
    const value = event.target.value;
    let selected = await this.store.query('assignmentType', {
      filter: { name: value },
      fields: 'name,color,parents',
    });
    this.args.changeset.set(
      'color',
      selected.firstObject?.parents.get('color')
    );
    this.args.changeset.set('assignmentType', selected.firstObject);
  }

  @action
  async selectEnterprise(event: { target: { value: string } }) {
    const value = event.target.value;
    let selected = await this.store.query('enterprise', {
      filter: { name: value },
      fields:
        'name,emailAddress,emailAddress2,phoneNumber,phoneNumber2,city,address,enterpriseNumber,vatNumber',
    });
    this.args.changeset.set('enterprise', selected.firstObject);
  }

  @action
  selectedMorning() {
    if (this.args.changeset.get('isMorning')) {
      this.args.changeset.set('isMorning', false);
    } else {
      this.args.changeset.set('isMorning', true);
    }
  }

  @action
  selectedAfternoon() {
    if (this.args.changeset.get('isAfternoon')) {
      this.args.changeset.set('isAfternoon', false);
    } else {
      this.args.changeset.set('isAfternoon', true);
    }
  }

  get color() {
    return this.args.changeset.get('color');
  }

  @action
  selectedRemote() {
    if (this.args.changeset.get('isRemote')) {
      this.args.changeset.set('isRemote', false);
    } else {
      this.args.changeset.set('isRemote', true);
    }
  }
  @action
  editAssignmentCommentField(event: { target: { value: string } }) {
    this.args.changeset.set('comment', event.target.value);
  }

  @action saveAssignment(event: Event) {
    event.preventDefault();
    this.args.saveFunction(this.args.changeset);
  }

  get verif() {
    if (this.isFirstItem) {
      if (this.args.changeset.get('comment')) {
        this.isComment = true;
      }
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
