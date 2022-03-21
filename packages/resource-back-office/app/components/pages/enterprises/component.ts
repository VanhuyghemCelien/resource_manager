import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';
import type Store from '@ember-data/store';
import type { TypedBufferedChangeset } from 'ember-form-changeset-validations';
import type { FormsEnterpriseDTO } from 'ember-boilerplate/components/forms/enterprise/component';
import { Changeset } from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import EnterpriseValidation from '../../../validator/forms/enterprise';
import type FlashMessageService from 'ember-cli-flash/services/flash-messages';

export interface EnterpriseModel {
  enterpriseId: number;
  name: string;
  city: string;
  address: string;
  emailAddress: string;
  phoneNumber: string;
  emailAddress2?: string;
  phoneNumber2?: string;
  enterpriseNumber?: string;
  vatNumber?: string;
}

interface PagesEnterprisesArgs {}

export default class PagesEnterprises extends Component<PagesEnterprisesArgs> {
  @service declare store: Store;
  @tracked declare flashMessages: FlashMessageService;

  @tracked displayNewEnterpriseModal: Boolean = false;
  @tracked displayEditEnterpriseModal: Boolean = false;
  @tracked displayDetailsEnterpriseModal: Boolean = false;
  @tracked displayDeleteEnterpriseModal: Boolean = false;
  @tracked modalName: string = '';
  @tracked enterprise: EnterpriseModel = {
    enterpriseId: 3,
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

  @tracked changeset: TypedBufferedChangeset<FormsEnterpriseDTO>;
  constructor(owner: unknown, args: PagesEnterprisesArgs) {
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

  reinitEnterprise() {
    this.changeset.set('name', '');
    this.changeset.set('city', '');
    this.changeset.set('address', '');
    this.changeset.set('emailAddress', '');
    this.changeset.set('phoneNumber', '');
    this.changeset.set('emailAddress2', '');
    this.changeset.set('phoneNumber2', '');
    this.changeset.set('enterpriseNumber', '');
    this.changeset.set('vatNumber', '');
  }

  @action
  displayDeleteEnterprise(enterprise: EnterpriseModel) {
    this.toggleDisplayDeleteEnterpriseModal();
    this.changeset.set('name', enterprise.name);
    this.changeset.set('city', enterprise.city);
    this.changeset.set('address', enterprise.address);
    this.changeset.set('emailAddress', enterprise.emailAddress);
    this.changeset.set('phoneNumber', enterprise.phoneNumber);
    this.changeset.set('emailAddress2', enterprise.emailAddress2);
    this.changeset.set('phoneNumber2', enterprise.phoneNumber2);
    this.changeset.set('enterpriseNumber', enterprise.enterpriseNumber);
    this.changeset.set('vatNumber', enterprise.vatNumber);
  }

  @action
  toggleDisplayEnterpriseModal(type: string) {
    if (type === 'details') {
      this.toggleDisplayDetailsEnterpriseModal();
    } else if (type === 'new') {
      this.toggleDisplayNewEnterpriseModal();
    } else if (type === 'edit') {
      this.toggleDisplayEditEnterpriseModal();
    }
  }

  @action
  async toggleDisplayDeleteEnterpriseModal() {
    this.reinitEnterprise();
    if (this.displayDeleteEnterpriseModal) {
      this.displayDeleteEnterpriseModal = false;
    } else {
      this.displayDeleteEnterpriseModal = true;
    }
  }

  toggleDisplayNewEnterpriseModal() {
    if (this.displayNewEnterpriseModal) {
      this.displayNewEnterpriseModal = false;
      this.reinitEnterprise();
    } else {
      this.displayNewEnterpriseModal = true;
    }
  }

  toggleDisplayEditEnterpriseModal() {
    if (this.displayEditEnterpriseModal) {
      this.displayEditEnterpriseModal = false;
      this.reinitEnterprise();
    } else {
      this.displayEditEnterpriseModal = true;
    }
  }

  toggleDisplayDetailsEnterpriseModal() {
    if (this.displayDetailsEnterpriseModal) {
      this.displayDetailsEnterpriseModal = false;
      this.reinitEnterprise();
    } else {
      this.displayDetailsEnterpriseModal = true;
    }
  }

  @action
  displayEnterpriseDetails(
    modalName: string,
    enterpriseReceived: EnterpriseModel
  ) {
    this.changeset.set('name', enterpriseReceived.name);
    this.changeset.set('city', enterpriseReceived.city);
    this.changeset.set('address', enterpriseReceived.address);
    this.changeset.set('emailAddress', enterpriseReceived.emailAddress);
    this.changeset.set('phoneNumber', enterpriseReceived.phoneNumber);
    this.changeset.set('emailAddress2', enterpriseReceived.emailAddress2);
    this.changeset.set('phoneNumber2', enterpriseReceived.phoneNumber2);
    this.changeset.set('enterpriseNumber', enterpriseReceived.enterpriseNumber);
    this.changeset.set('vatNumber', enterpriseReceived.vatNumber);
    if (modalName === 'edit') {
      this.toggleDisplayEditEnterpriseModal();
    } else if (modalName === 'details') {
      this.toggleDisplayDetailsEnterpriseModal();
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
  async addEnterprise(changeset: TypedBufferedChangeset<FormsEnterpriseDTO>) {
    try {
      const enterprise = await this.store.createRecord('enterprise', changeset);
      this.reinitEnterprise();
      enterprise.save();
      this.toggleDisplayEnterpriseModal('new');
    } catch (e) {
      this.flashMessages.danger('Erreur ajout entreprise');
    }
  }

  @action
  async editEnterprise() {
    const editedEnterprise = this.enterprise;
    const enterprise = await this.store.findRecord(
      'enterprise',
      editedEnterprise.enterpriseId
    );

    enterprise.name = editedEnterprise.name;
    enterprise.city = editedEnterprise.city;
    enterprise.address = editedEnterprise.address;
    enterprise.emailAddress = editedEnterprise.emailAddress;
    enterprise.phoneNumber = editedEnterprise.phoneNumber;
    enterprise.emailAddress2 = editedEnterprise.emailAddress2;
    enterprise.phoneNumber2 = editedEnterprise.phoneNumber2;
    enterprise.enterpriseNumber = editedEnterprise.enterpriseNumber;
    enterprise.vatNumber = editedEnterprise.vatNumber;

    enterprise.save();
    this.toggleDisplayEnterpriseModal('edit');
  }

  @action
  async deleteEnterprise(enterprise: EnterpriseModel) {
    const enterpriseToDelete = await this.store.peekRecord(
      'enterprise',
      enterprise.enterpriseId
    );
    if (enterpriseToDelete) {
      enterpriseToDelete!.deleteRecord();
      this.toggleDisplayDeleteEnterpriseModal();
      enterpriseToDelete!.unloadRecord();
      enterpriseToDelete!.save();
    }
  }
}
