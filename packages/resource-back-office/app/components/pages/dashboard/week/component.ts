import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { format, subWeeks } from 'date-fns';
import type Store from '@ember-data/store';
import { service } from '@ember/service';
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
import AssignmentValidation from '../../../../validator/forms/assignment';
import { loading } from 'ember-loading';
import type RouterService from '@ember/routing/router-service';
import type { FormsAssignmentDTO } from 'ember-boilerplate/components/forms/assignment/component';

interface PagesDashboardWeekArgs {
  model: { week: number };
}

export default class PagesDashboardWeek extends Component<PagesDashboardWeekArgs> {
  @service declare store: Store;
  @service declare router: RouterService;
  @service declare flashMessages: FlashMessageService;

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
  @tracked changesetEnterprise: TypedBufferedChangeset<FormsEnterpriseDTO>;
  @tracked changesetAssignment: TypedBufferedChangeset<FormsAssignmentDTO>;
  constructor(owner: unknown, args: PagesDashboardWeekArgs) {
    super(owner, args);
    this.changesetEnterprise = Changeset(
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
    this.changesetAssignment = Changeset(
      {
        resource: null,
        isMorning: false,
        isAfternoon: false,
        comment: '',
        assignmentType: null,
        assignmentTitle: null,
      },
      lookupValidator(AssignmentValidation),
      AssignmentValidation
    ) as TypedBufferedChangeset<FormsAssignmentDTO>;
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
    this.router.refresh();
  }

  @action
  async addAssignmentTitle() {
    const parent = await this.store.queryRecord('assignment-type', {
      id: this.assignment.assignmentType!.id,
    });
    console.log(parent);

    const assignmentTitleToAdd: Partial<AssignmentTypeModel> = {
      name: this.assignmentTitle.name,
      color: this.assignmentTitle.color,
      parents: parent,
    };
    console.log(assignmentTitleToAdd);

    const assignmentTitle = this.store.createRecord(
      'assignmentType',
      assignmentTitleToAdd
    );
    this.assignmentTitle = {
      name: '',
      color: '',
      parents: undefined,
    };
    assignmentTitle.save();
    this.toggleDisplayNewTitleModal();
    this.router.refresh();
  }

  @action
  @loading
  async addEnterprise(
    changesetEnterprise: TypedBufferedChangeset<FormsEnterpriseDTO>
  ) {
    try {
      const enterpriseToSave: Partial<EnterpriseModel> = {
        name: changesetEnterprise.get('name'),
        city: changesetEnterprise.get('city'),
        emailAddress: changesetEnterprise.get('emailAddress'),
        phoneNumber: changesetEnterprise.get('phoneNumber'),
        phoneNumber2: changesetEnterprise.get('phoneNumber2') ?? undefined,
        emailAddress2: changesetEnterprise.get('emailAddress2') ?? undefined,
        enterpriseNumber:
          changesetEnterprise.get('enterpriseNumber') ?? undefined,
        vatNumber: changesetEnterprise.get('vatNumber') ?? undefined,
        address: changesetEnterprise.get('address'),
      };
      const enterpriseCreated = await this.store.createRecord(
        'enterprise',
        enterpriseToSave
      );
      await enterpriseCreated.save();
      this.changesetEnterprise.rollback();
      this.toggleDisplayNewEnterpriseModal();
      this.router.refresh();
      this.flashMessages.success('L’entreprise a bien été créée');
    } catch (e) {
      this.flashMessages.warning(e.message);
    }
  }

  @action
  toggleColor() {
    this.color = this.color ? true : false;
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

  @action
  createAssignment() {
    console.log(this.changesetAssignment);
  }
}
