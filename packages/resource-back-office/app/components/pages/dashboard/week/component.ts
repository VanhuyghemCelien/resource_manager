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
import AssignmentTypeValidation from '../../../../validator/forms/assignment-type';
import AssignmentValidation from '../../../../validator/forms/assignment';
import { loading } from 'ember-loading';
import type RouterService from '@ember/routing/router-service';
import type LocalStorage from 'ember-boilerplate/services/localstorage';
import type { FormsAssignmentTypeDTO } from 'ember-boilerplate/components/forms/assignment-type/component';
import type { FormsAssignmentDTO } from 'ember-boilerplate/components/forms/assignment/component';
import type AssignmentTypeService from 'ember-boilerplate/services/assignment-type-service';

interface PagesDashboardWeekArgs {
  model: {
    week: number;
    first: Date;
    resource: Array<ResourceModel>;
    assignmentType: Array<AssignmentTypeModel>;
    enterprise: Array<EnterpriseModel>;
  };
}

export default class PagesDashboardWeek extends Component<PagesDashboardWeekArgs> {
  @service declare store: Store;
  @service declare router: RouterService;
  @service declare flashMessages: FlashMessageService;
  @inject declare assignmentTypeService: AssignmentTypeService;
  @inject declare localstorage: LocalStorage;

  today: Date = new Date();
  // Nomenclature variables
  @tracked displayShowAssignmentModal: boolean = false;
  @tracked displayNewAssignmentModal: boolean = false;
  @tracked displayNewTypeModal: boolean = false;
  @tracked displayNewTitleModal: boolean = false;
  @tracked displayNewEnterpriseModal: boolean = false;
  @tracked choosingDay: Date = new Date(this.args.model.first);
  @tracked specificDay: Date = new Date();
  @tracked multipleColor: boolean = false;
  @tracked comment: boolean = false;
  @tracked resourceName: string = '';
  @tracked paramsDay: Number = 0;
  @tracked changesetEnterprise: TypedBufferedChangeset<FormsEnterpriseDTO>;
  @tracked changesetAssignment: TypedBufferedChangeset<FormsAssignmentDTO>;
  @tracked
  assignmentTypeChangeset: TypedBufferedChangeset<FormsAssignmentTypeDTO>;
  @tracked assignmentTypesToDisplay: Array<AssignmentTypeModel> = [];
  @tracked assignmentTitlesToDisplay: Array<AssignmentTypeModel> = [];
  constructor(owner: unknown, args: PagesDashboardWeekArgs) {
    super(owner, args);
    this.changesetAssignment = Changeset(
      {
        isMorning: false,
        isAfternoon: false,
        isRemote: false,
        comment: '',
        date: new Date(),
        assignmentType: undefined,
        enterprise: undefined,
        resource: undefined,
      },
      lookupValidator(AssignmentValidation),
      AssignmentValidation
    ) as TypedBufferedChangeset<FormsAssignmentDTO>;
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
    this.assignmentTypeChangeset = Changeset(
      {
        name: '',
        color: '',
        parents: undefined,
      },
      lookupValidator(AssignmentTypeValidation),
      AssignmentTypeValidation
    ) as TypedBufferedChangeset<FormsAssignmentTypeDTO>;
    this.assignmentTypeService.getAssignmentTypes().then((assignmentTypes) => {
      this.assignmentTypesToDisplay = assignmentTypes;
    });
  }

  @action add(
    type: string,
    changeset: TypedBufferedChangeset<FormsAssignmentTypeDTO>
  ) {
    if (type === 'type') {
      this.addAssignmentType(changeset);
    } else if (type === 'title') {
      this.addAssignmentTitle(changeset);
    }
  }

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

  @action
  async editAssignment(changeset: TypedBufferedChangeset<FormsAssignmentDTO>) {
    try {
      console.log(changeset);
    } catch (e) {
      console.log(e);
    }
  }

  @action
  async addAssignment(changeset: TypedBufferedChangeset<FormsAssignmentDTO>) {
    console.log('coucou');
    try {
      const assignmentReceived: Partial<AssignmentModel> = {
        date: changeset.get('date'),
        isMorning: changeset.get('isMorning'),
        isAfternoon: changeset.get('isAfternoon'),
        isRemote: changeset.get('isRemote'),
        comment: changeset.get('comment'),
        resource: changeset.get('resource'),
        assignmentType: changeset.get('assignmentType'),
        enterprise: changeset.get('enterprise'),
      };
      console.log(assignmentReceived);
      const assignment = await this.store.createRecord(
        'assignment',
        assignmentReceived
      );
      await assignment.save();
      this.localstorage.setThirdItem();
      this.localstorage.setSecondItem();
      this.localstorage.setFirstItem(assignment);
      this.toggleDisplayNewAssignmentModal();
      this.flashMessages.success("L'occupation a bien été ajoutée");
    } catch (e) {
      console.log(e);
      this.flashMessages.danger("L'occupation n'a pas pu être ajouté");
    }
  }

  @action
  @loading
  async addAssignmentType(
    changeset: TypedBufferedChangeset<FormsAssignmentTypeDTO>
  ) {
    try {
      const assignmentTypeToAdd: Partial<AssignmentTypeModel> = {
        name: changeset.get('name'),
        color: changeset.get('color'),
        parents: changeset.get('parents'),
      };
      const assignmentType = this.store.createRecord(
        'assignment-type',
        assignmentTypeToAdd
      );
      this.assignmentTypeChangeset.rollback();
      await assignmentType.save();
      this.multipleColor = false;
      this.toggleDisplayNewTypeModal();
      this.assignmentTypesToDisplay =
        await this.assignmentTypeService.getAssignmentTypes();
      this.flashMessages.success("Le type d'occupation a bien été ajouté");
    } catch (e) {
      this.flashMessages.danger("Le type d'occupation n'a pas pu être ajouté");
    }
  }

  @action
  @loading
  async addAssignmentTitle(
    changeset: TypedBufferedChangeset<FormsAssignmentTypeDTO>
  ) {
    try {
      const assignmentTitleToAdd: Partial<AssignmentTypeModel> = {
        name: changeset.get('name'),
        color: changeset.get('color'),
        parents: changeset.get('parents'),
      };

      const assignmentTitle = this.store.createRecord(
        'assignmentType',
        assignmentTitleToAdd
      );
      this.assignmentTypeChangeset.rollback();
      await assignmentTitle.save();
      this.toggleDisplayNewTitleModal();
      this.flashMessages.success("Le titre d'occupation a bien été ajouté");
    } catch (e) {
      this.flashMessages.danger("Le titre d'occupation n'a pas pu être ajouté");
    }
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
    if (this.multipleColor) {
      this.multipleColor = false;
    } else {
      this.multipleColor = true;
    }
  }

  @action
  toggleDisplayNewAssignmentModal(
    choosingdate?: Date,
    resource?: ResourceModel,
    isMorning?: boolean,
    isAfternoon?: boolean,
    assignment?: AssignmentModel
  ) {
    if (assignment || this.displayShowAssignmentModal) {
      if (this.displayShowAssignmentModal) {
        console.log('banane');
        this.displayShowAssignmentModal = false;
        this.changesetAssignment.rollback();
      } else {
        console.log('banane true');
        this.displayShowAssignmentModal = true;
        this.changesetAssignment.set('isMorning', assignment!.isMorning);
        this.changesetAssignment.set('isAfternoon', assignment!.isAfternoon);
        this.changesetAssignment.set('date', assignment!.date);
        this.changesetAssignment.set('resource', assignment!.resource);
        this.changesetAssignment.set('isRemote', assignment!.isRemote);
        this.changesetAssignment.set('comment', assignment!.comment);
        this.changesetAssignment.set(
          'assignmentType',
          assignment!.assignmentType
        );
        this.changesetAssignment.set('color', assignment!.assignmentType.color);
        this.changesetAssignment.set('enterprise', assignment!.enterprise);
        this.changesetAssignment.set('id', assignment!.id);
      }
    } else {
      if (this.displayNewAssignmentModal) {
        this.displayNewAssignmentModal = false;
        this.changesetAssignment.rollback();
      } else {
        this.changesetAssignment.set('isMorning', isMorning);
        this.changesetAssignment.set('isAfternoon', isAfternoon);
        this.changesetAssignment.set('date', choosingdate);
        this.changesetAssignment.set('resource', resource);
        this.resourceName = resource!.firstName + ' ' + resource!.lastName;
        this.displayNewAssignmentModal = true;
      }
    }
  }

  @action
  toggleDisplayNewTypeModal() {
    if (this.displayNewTypeModal) {
      this.displayNewTypeModal = false;
      this.assignmentTypeChangeset.rollback();
    } else {
      this.displayNewTypeModal = true;
      this.multipleColor = false;
    }
  }

  @action
  async toggleDisplayNewTitleModal() {
    if (this.displayNewTitleModal) {
      this.displayNewTitleModal = false;
      this.assignmentTypeChangeset.rollback();
    } else {
      this.displayNewTitleModal = true;
    }
  }

  @action
  toggleDisplayNewEnterpriseModal() {
    if (this.displayNewEnterpriseModal) {
      this.displayNewEnterpriseModal = false;
    } else {
      this.displayNewEnterpriseModal = true;
    }
  }

  @action
  choosingDayPlus() {
    this.choosingDay = new Date(
      this.choosingDay.setDate(this.choosingDay.getDate() + 7)
    );
    this.paramsDay = getWeek(subWeeks(this.choosingDay, 0), {
      weekStartsOn: 0,
    });
  }
  @action
  choosingDateLess() {
    this.choosingDay = new Date(
      this.choosingDay.setDate(this.choosingDay.getDate() - 7)
    );
    this.paramsDay = getWeek(subWeeks(this.choosingDay, 0), {
      weekStartsOn: 0,
    });
  }

  @action
  choosingDayActual() {
    this.choosingDay = new Date();
    this.specificDay = new Date();
    this.paramsDay = getWeek(subWeeks(this.choosingDay, 0), {
      weekStartsOn: 0,
    });
  }

  @action
  choosingSpecificDay(event: { target: { value: Date } }) {
    this.specificDay = event.target.value;
    this.choosingDay = new Date(this.specificDay);
    this.paramsDay = getWeek(subWeeks(this.choosingDay, 0), {
      weekStartsOn: 0,
    });
    this.router.transitionTo({ queryParams: { week: this.paramsDay } });
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
