import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { format, subWeeks } from 'date-fns';
import type Store from '@ember-data/store';
import { inject, service } from '@ember/service';
import type ResourceModel from 'ember-boilerplate/models/resource';
import getWeek from 'date-fns/getWeek';
import type AssignmentTypeModel from 'ember-boilerplate/models/assignment-type';
import type EnterpriseModel from 'ember-boilerplate/models/enterprise';
import type FlashMessageService from 'ember-cli-flash/services/flash-messages';
import type AssignmentModel from 'ember-boilerplate/models/assignment';
import type { TypedBufferedChangeset } from 'ember-form-changeset-validations';
import type { FormsEnterpriseDTO } from 'ember-boilerplate/components/forms/enterprise/component';
import { Changeset } from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import EnterpriseValidation from '../../../../validator/forms/enterprise';
import { loading } from 'ember-loading';
import type RouterService from '@ember/routing/router-service';

interface PagesDashboardWeekArgs {
  model: { week: number };
}

export default class PagesDashboardWeek extends Component<PagesDashboardWeekArgs> {
  @service declare store: Store;
  @service declare router: RouterService;
  @inject declare flashMessages: FlashMessageService;

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
  @tracked assignmentType: Partial<AssignmentTypeModel> = {
    name: '',
    color: '#adab32',
  };
  @tracked changeset: TypedBufferedChangeset<FormsEnterpriseDTO>;
  constructor(owner: unknown, args: PagesDashboardWeekArgs) {
    super(owner, args);
    this.changeset = Changeset(
      {
        name: '',
        city: '',
        address: '',
        emailAddress: '',
        phoneNumber: '',
        emailAddress2: '',
        phoneNumber2: '',
        enterpriseNumber: '',
        vatNumber: '',
      },
      lookupValidator(EnterpriseValidation),
      EnterpriseValidation
    ) as TypedBufferedChangeset<FormsEnterpriseDTO>;
  }
  @tracked assignmentTitle: Partial<AssignmentTypeModel> = {
    name: '',
    color: '',
    parents: undefined,
  };
  @tracked enterprise: Partial<EnterpriseModel> = {
    name: '',
  };
  @tracked assignment: Partial<AssignmentModel> = {
    date: new Date(),
    isMorning: false,
    isAfternoon: false,
    isRemote: false,
    comment: undefined,
    resource: undefined,
    assignmentType: undefined,
    enterprise: undefined,
  };

  reinitEnterprise() {
    this.enterprise = {
      id: '',
      name: '',
      city: '',
      address: '',
      emailAddress: '',
      phoneNumber: '',
      emailAddress2: '',
      phoneNumber2: '',
      enterpriseNumber: '',
      vatNumber: '',
    };
  }

  // TRAVAILLER AVEC LES CHANGESETS POUR LA VALIDATION
  @action
  addAssignment(assignmentNew: Partial<AssignmentModel>) {
    console.log(assignmentNew, 'addassignment');
    this.assignment = {
      date: assignmentNew.date,
      isMorning: assignmentNew.isMorning,
      isAfternoon: assignmentNew.isAfternoon,
      isRemote: assignmentNew.isRemote,
      comment: assignmentNew.comment,
      resource: assignmentNew.resource,
      assignmentType: assignmentNew.assignmentType,
      enterprise: assignmentNew.enterprise,
    };
    console.log(this.assignment);
    const assignment = this.store.createRecord('assignment', this.assignment);
    this.assignment = {
      date: new Date(),
      isMorning: false,
      isAfternoon: false,
      isRemote: false,
      comment: undefined,
      resource: undefined,
      assignmentType: undefined,
      enterprise: undefined,
    };
    // rajouter async await + gestion erreurs
    assignment.save();
    this.toggleDisplayNewAssignmentModal();
  }

  @action
  editAssignmentTypeField(field: string, event: { target: { value: string } }) {
    switch (field) {
      case 'assignmentTypeName':
        this.assignmentType.name = event.target.value;
        break;
      case 'assignmentTypeColor':
        this.assignmentType.color = event.target.value;
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
        this.assignmentTitle.name = event.target.value;
        break;
      case 'color':
        this.assignmentTitle.color = event.target.value;
        break;
    }
  }

  @action
  editEnterpriseField(field: string, event: { target: { value: string } }) {
    switch (field) {
      case 'name':
        this.enterprise.name = event.target.value;
        break;
      case 'city':
        this.enterprise.city = event.target.value;
        break;
      case 'emailAddress':
        this.enterprise.emailAddress = event.target.value;
        break;
      case 'phoneNumber':
        this.enterprise.phoneNumber = event.target.value;
        break;
      case 'phoneNumber2':
        this.enterprise.phoneNumber2 = event.target.value;
        break;
      case 'emailAddress2':
        this.enterprise.emailAddress2 = event.target.value;
        break;
      case 'enterpriseNumber':
        this.enterprise.enterpriseNumber = event.target.value;
        break;
      case 'vatNumber':
        this.enterprise.vatNumber = event.target.value;
        break;
      case 'address':
        this.enterprise.address = event.target.value;
        break;
      default:
        break;
    }
  }

  @action
  addAssignmentType() {
    const assignmentType = this.store.createRecord(
      'assignment-type',
      this.assignmentType
    );
    // changeset
    this.assignmentType = {
      name: '',
      color: '',
    };
    assignmentType.save();
    this.toggleDisplayNewTypeModal();
  }

  @action
  addAssignmentTitle() {
    const assignmentTitle = this.store.createRecord(
      'assignmentType',
      this.assignmentTitle
    );
    this.assignmentTitle = {
      name: '',
      color: '',
      parents: undefined,
    };
    assignmentTitle.save();
    this.toggleDisplayNewTitleModal();
  }

  @action
  @loading
  async addEnterprise(changeset: TypedBufferedChangeset<FormsEnterpriseDTO>) {
    try {
      const enterpriseToSave: Partial<EnterpriseModel> = {
        name: changeset.get('name'),
        city: changeset.get('city'),
        emailAddress: changeset.get('emailAddress'),
        phoneNumber: changeset.get('phoneNumber'),
        phoneNumber2: changeset.get('phoneNumber2') ?? undefined,
        emailAddress2: changeset.get('emailAddress2') ?? undefined,
        enterpriseNumber: changeset.get('enterpriseNumber') ?? undefined,
        vatNumber: changeset.get('vatNumber') ?? undefined,
        address: changeset.get('address'),
      };
      const enterpriseCreated = await this.store.createRecord(
        'enterprise',
        enterpriseToSave
      );
      await enterpriseCreated.save();
      this.changeset.rollback();
      this.toggleDisplayNewEnterpriseModal();
      this.router.refresh();
    } catch (e) {
      this.flashMessages.warning(e.message);
    }
  }

  @action
  toggleColor() {
    this.color = this.color ? false : true;
  }

  @action
  toggleDisplayNewAssignmentModal(
    choosingdate?: Date,
    resource?: ResourceModel,
    isMorning?: boolean,
    isAfternoon?: boolean
  ) {
    if (this.displayNewAssignmentModal) {
      this.displayNewAssignmentModal = false;
      this.assignment = {
        ...this.assignment,
        isMorning: false,
        isAfternoon: false,
      };
    } else {
      this.choosingDay = new Date(choosingdate!);
      this.assignment.resource = resource;
      this.resourceName = resource!.firstName + ' ' + resource!.lastName;
      this.assignment.isMorning = isMorning!;
      this.assignment.isAfternoon = isAfternoon!;
      this.displayNewAssignmentModal = true;
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
