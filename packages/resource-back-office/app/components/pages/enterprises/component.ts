import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject, service } from '@ember/service';
import type Store from '@ember-data/store';
import type EnterpriseModel from 'ember-boilerplate/models/enterprise';
import type FlashMessageService from 'ember-cli-flash/services/flash-messages';

interface PagesEnterprisesArgs {}

export default class PagesEnterprises extends Component<PagesEnterprisesArgs> {
  @service declare store: Store;

  @tracked displayNewEnterpriseModal: Boolean = false;
  @tracked displayEditEnterpriseModal: Boolean = false;
  @tracked displayDetailsEnterpriseModal: Boolean = false;
  @tracked displayDeleteEnterpriseModal: Boolean = false;
  @tracked modalName: string = '';
  @tracked enterprise: Partial<EnterpriseModel> = {
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

  @action
  displayDeleteEnterprise(enterprise: Partial<EnterpriseModel>) {
    this.toggleDisplayDeleteEnterpriseModal();
    this.enterprise = {
      id: enterprise.id,
      name: enterprise.name,
      city: enterprise.city,
      address: enterprise.address,
      emailAddress: enterprise.emailAddress,
      phoneNumber: enterprise.phoneNumber,
      emailAddress2: enterprise.emailAddress2,
      phoneNumber2: enterprise.phoneNumber2,
      enterpriseNumber: enterprise.enterpriseNumber,
      vatNumber: enterprise.vatNumber,
    };
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
    const enterpriseToEdit: Partial<EnterpriseModel> = {
      id: enterpriseReceived.id,
      name: enterpriseReceived.name,
      city: enterpriseReceived.city,
      address: enterpriseReceived.address,
      emailAddress: enterpriseReceived.emailAddress,
      phoneNumber: enterpriseReceived.phoneNumber,
      emailAddress2: enterpriseReceived.emailAddress2,
      phoneNumber2: enterpriseReceived.phoneNumber2,
      enterpriseNumber: enterpriseReceived.enterpriseNumber,
      vatNumber: enterpriseReceived.vatNumber,
    };
    this.enterprise = enterpriseToEdit;
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

  @inject declare flashMessage: FlashMessageService;
  @action
  async addEnterprise(e: Event) {
    e.preventDefault();
    const enterprise = await this.store.createRecord(
      'enterprise',
      this.enterprise
    );
    this.reinitEnterprise();
    try {
      enterprise.save();
      this.toggleDisplayEnterpriseModal('new');
    } catch (e) {
      this.flashMessage.danger('erreur');
    }
  }

  @action
  async editEnterprise() {
    const editedEnterprise = this.enterprise;
    console.log(editedEnterprise.id);
    const enterprise = await this.store.findRecord(
      'enterprise',
      editedEnterprise.id!
    );

    enterprise.name = editedEnterprise.name!;
    enterprise.city = editedEnterprise.city!;
    enterprise.address = editedEnterprise.address!;
    enterprise.emailAddress = editedEnterprise.emailAddress!;
    enterprise.phoneNumber = editedEnterprise.phoneNumber!;
    enterprise.emailAddress2 = editedEnterprise.emailAddress2;
    enterprise.phoneNumber2 = editedEnterprise.phoneNumber2;
    enterprise.enterpriseNumber = editedEnterprise.enterpriseNumber;
    enterprise.vatNumber = editedEnterprise.vatNumber;

    enterprise.save();
    this.toggleDisplayEnterpriseModal('edit');
  }

  @action
  async deleteEnterprise(enterprise: EnterpriseModel) {
    const enterpriseToDelete = await this.store.queryRecord('enterprise', {
      id: enterprise.id,
    });
    if (enterpriseToDelete) {
      enterpriseToDelete.destroyRecord();
      this.toggleDisplayDeleteEnterpriseModal();
    }
  }
}
