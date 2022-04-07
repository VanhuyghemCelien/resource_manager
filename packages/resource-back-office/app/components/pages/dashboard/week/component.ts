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
import AssignmentTypeValidation from '../../../../validator/forms/assignment-type';
import { loading } from 'ember-loading';
import type RouterService from '@ember/routing/router-service';
import type { FormsAssignmentTypeDTO } from 'ember-boilerplate/components/forms/assignment-type/component';

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
  @tracked multipleColor: boolean = false;
  @tracked comment: boolean = false;
  @tracked resourceName: string = '';
  @tracked changesetEnterprise: TypedBufferedChangeset<FormsEnterpriseDTO>;
  @tracked
  assignmentTypeChangeset: TypedBufferedChangeset<FormsAssignmentTypeDTO>;
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
    this.assignmentTypeChangeset = Changeset(
      {
        name: '',
        color: '',
        parents: undefined,
      },
      lookupValidator(AssignmentTypeValidation),
      AssignmentTypeValidation
    ) as TypedBufferedChangeset<FormsAssignmentTypeDTO>;
  }

  @tracked parentsOption = this.getParentsOption();

  async getParentsOption() {
    const titleTable = await this.store.query('assignment-type', {
      fields: 'name,color',
      include: 'parents',
    });
    let parents: Partial<AssignmentTypeModel>[] = [];
    titleTable.forEach((title) => {
      if (!title.get('parents').get('name')) {
        parents.addObject(title.get('parents'));
      }
    });
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
    this.flashMessages.success("L'occupation a bien été ajoutée");
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
      this.router.refresh();
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
      document.getElementById('titleSelect')!.innerHTML =
        document.getElementById('titleSelect')!.innerHTML +
        '<option value="' +
        assignmentTitle.name +
        '">' +
        assignmentTitle.name +
        '</option>';
      this.toggleDisplayNewTitleModal();
      this.router.refresh();
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
      const parent = await this.store.queryRecord('assignment-type', {
        id: this.assignment.assignmentType!.id,
      });
      if (parent.get('color')) {
        this.multipleColor = false;
      } else {
        this.multipleColor = true;
      }
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
