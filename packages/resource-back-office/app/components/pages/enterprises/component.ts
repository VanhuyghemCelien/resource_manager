import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';
import type Store from '@ember-data/store';

export interface EnterpriseModel {
  enterpriseid: number;
  name: string;
  city: string;
  address: string;
  emailaddress: string;
  phonenumber: string;
  emailaddress2?: string;
  phonenumber2?: string;
  enterprisenumber?: string;
  vatnumber?: string;
}

interface PagesEnterprisesArgs {}

export default class PagesEnterprises extends Component<PagesEnterprisesArgs> {
  @service declare store: Store;

  @tracked displayNewEnterpriseModal: Boolean = false;
  @tracked displayEditEnterpriseModal: Boolean = false;
  @tracked displayDetailsEnterpriseModal: Boolean = false;
  @tracked displayDeleteEnterpriseModal: Boolean = false;
  @tracked modalName: string = '';
  @tracked enterprise: EnterpriseModel = {
    enterpriseid: 3,
    name: '',
    city: '',
    address: '',
    emailaddress: '',
    phonenumber: '',
    emailaddress2: '',
    phonenumber2: '',
    enterprisenumber: '',
    vatnumber: '',
  };

  reinitEnterprise() {
    this.enterprise = {
      enterpriseid: 3,
      name: '',
      city: '',
      address: '',
      emailaddress: '',
      phonenumber: '',
      emailaddress2: '',
      phonenumber2: '',
      enterprisenumber: '',
      vatnumber: '',
    };
  }

  @action
  displayDeleteEnterprise(enterprise: EnterpriseModel) {
    this.toggleDisplayDeleteEnterpriseModal();
    this.enterprise = {
      enterpriseid: enterprise.enterpriseid,
      name: enterprise.name,
      city: enterprise.city,
      address: enterprise.address,
      emailaddress: enterprise.emailaddress,
      phonenumber: enterprise.phonenumber,
      emailaddress2: enterprise.emailaddress2,
      phonenumber2: enterprise.phonenumber2,
      enterprisenumber: enterprise.enterprisenumber,
      vatnumber: enterprise.vatnumber,
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
    const enterpriseToEdit: EnterpriseModel = {
      enterpriseid: enterpriseReceived.enterpriseid,
      name: enterpriseReceived.name,
      city: enterpriseReceived.city,
      address: enterpriseReceived.address,
      emailaddress: enterpriseReceived.emailaddress,
      phonenumber: enterpriseReceived.phonenumber,
      emailaddress2: enterpriseReceived.emailaddress2,
      phonenumber2: enterpriseReceived.phonenumber2,
      enterprisenumber: enterpriseReceived.enterprisenumber,
      vatnumber: enterpriseReceived.vatnumber,
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
      case 'emailaddress':
        this.enterprise.emailaddress = event.target.value;
        break;
      case 'phonenumber':
        this.enterprise.phonenumber = event.target.value;
        break;
      case 'phonenumber2':
        this.enterprise.phonenumber2 = event.target.value;
        break;
      case 'emailaddress2':
        this.enterprise.emailaddress2 = event.target.value;
        break;
      case 'enterprisenumber':
        this.enterprise.enterprisenumber = event.target.value;
        break;
      case 'vatnumber':
        this.enterprise.vatnumber = event.target.value;
        break;
      case 'address':
        this.enterprise.address = event.target.value;
        break;
      default:
        break;
    }
  }

  @action
  addEnterprise() {
    const enterprise = this.store.createRecord('enterprise', this.enterprise);
    this.reinitEnterprise();
    enterprise.save();
    this.toggleDisplayEnterpriseModal('new');
  }

  @action
  async editEnterprise() {
    const editedEnterprise = this.enterprise;
    const enterprise = await this.store.findRecord(
      'enterprise',
      editedEnterprise.enterpriseid
    );

    enterprise.name = editedEnterprise.name;
    enterprise.city = editedEnterprise.city;
    enterprise.address = editedEnterprise.address;
    enterprise.emailaddress = editedEnterprise.emailaddress;
    enterprise.phonenumber = editedEnterprise.phonenumber;
    enterprise.emailaddress2 = editedEnterprise.emailaddress2;
    enterprise.phonenumber2 = editedEnterprise.phonenumber2;
    enterprise.enterprisenumber = editedEnterprise.enterprisenumber;
    enterprise.vatnumber = editedEnterprise.vatnumber;

    enterprise.save();
    this.toggleDisplayEnterpriseModal('edit');
  }

  @action
  async deleteEnterprise(enterprise: EnterpriseModel) {
    const enterpriseToDelete = await this.store.peekRecord(
      'enterprise',
      enterprise.enterpriseid
    );
    if (enterpriseToDelete) {
      enterpriseToDelete!.deleteRecord();
      this.toggleDisplayDeleteEnterpriseModal();
      enterpriseToDelete!.unloadRecord();
      enterpriseToDelete!.save();
    }
  }
}
