import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';
import type Store from '@ember-data/store';

export interface EnterpriseModel {
  enterpriseid: number;
  name: string;
  city: string;
  emailaddress: string;
  phonenumber: string;
  emailaddress2?: string;
  phonenumber2?: string;
  enterprisenumber?: string;
  vatnumber?: string;
  address: string;
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
    emailaddress: '',
    phonenumber: '',
    emailaddress2: '',
    phonenumber2: '',
    enterprisenumber: '',
    vatnumber: '',
    address: '',
  };

  @action
  displayDeleteEnterprise(enterprise: EnterpriseModel) {
    this.toggleDisplayDeleteEnterpriseModal();
    this.enterprise = {
      enterpriseid: enterprise.enterpriseid,
      name: enterprise.name,
      city: enterprise.city,
      emailaddress: enterprise.emailaddress,
      phonenumber: enterprise.phonenumber,
      emailaddress2: enterprise.emailaddress2,
      phonenumber2: enterprise.phonenumber2,
      enterprisenumber: enterprise.enterprisenumber,
      vatnumber: enterprise.vatnumber,
      address: enterprise.address,
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
    this.enterprise = {
      enterpriseid: 3,
      name: '',
      city: '',
      emailaddress: '',
      phonenumber: '',
      emailaddress2: '',
      phonenumber2: '',
      enterprisenumber: '',
      vatnumber: '',
      address: '',
    };
    if (this.displayDeleteEnterpriseModal) {
      this.displayDeleteEnterpriseModal = false;
    } else {
      this.displayDeleteEnterpriseModal = true;
    }
  }

  toggleDisplayNewEnterpriseModal() {
    if (this.displayNewEnterpriseModal) {
      this.displayNewEnterpriseModal = false;
      this.enterprise = {
        enterpriseid: 3,
        name: '',
        city: '',
        emailaddress: '',
        phonenumber: '',
        emailaddress2: '',
        phonenumber2: '',
        enterprisenumber: '',
        vatnumber: '',
        address: '',
      };
    } else {
      this.displayNewEnterpriseModal = true;
    }
  }

  toggleDisplayEditEnterpriseModal() {
    if (this.displayEditEnterpriseModal) {
      this.displayEditEnterpriseModal = false;
      this.enterprise = {
        enterpriseid: 3,
        name: '',
        city: '',
        emailaddress: '',
        phonenumber: '',
        emailaddress2: '',
        phonenumber2: '',
        enterprisenumber: '',
        vatnumber: '',
        address: '',
      };
    } else {
      this.displayEditEnterpriseModal = true;
    }
  }

  toggleDisplayDetailsEnterpriseModal() {
    if (this.displayDetailsEnterpriseModal) {
      this.displayDetailsEnterpriseModal = false;
      this.enterprise = {
        enterpriseid: 3,
        name: '',
        city: '',
        emailaddress: '',
        phonenumber: '',
        emailaddress2: '',
        phonenumber2: '',
        enterprisenumber: '',
        vatnumber: '',
        address: '',
      };
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
      emailaddress: enterpriseReceived.emailaddress,
      phonenumber: enterpriseReceived.phonenumber,
      emailaddress2: enterpriseReceived.emailaddress2,
      phonenumber2: enterpriseReceived.phonenumber2,
      enterprisenumber: enterpriseReceived.enterprisenumber,
      vatnumber: enterpriseReceived.vatnumber,
      address: enterpriseReceived.address,
    };
    this.enterprise = enterpriseToEdit;
    if (modalName === 'editEnterprise') {
      this.toggleDisplayEditEnterpriseModal();
    } else if (modalName === 'detailsEnterprise') {
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
    this.enterprise = {
      enterpriseid: 3,
      name: '',
      city: '',
      emailaddress: '',
      phonenumber: '',
      emailaddress2: '',
      phonenumber2: '',
      enterprisenumber: '',
      vatnumber: '',
      address: '',
    };
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
    enterprise.emailaddress = editedEnterprise.emailaddress;
    enterprise.phonenumber = editedEnterprise.phonenumber;
    enterprise.emailaddress2 = editedEnterprise.emailaddress2;
    enterprise.phonenumber2 = editedEnterprise.phonenumber2;
    enterprise.enterprisenumber = editedEnterprise.enterprisenumber;
    enterprise.vatnumber = editedEnterprise.vatnumber;
    enterprise.address = editedEnterprise.address;

    enterprise.save();
    this.toggleDisplayEnterpriseModal('edit');
  }

  @action
  async deleteEnterprise(enterpriseId: number) {
    const enterpriseToDelete = await this.store.peekRecord(
      'enterprise',
      enterpriseId
    );
    if (enterpriseId) {
      enterpriseToDelete!.deleteRecord();
      this.toggleDisplayDeleteEnterpriseModal();
      enterpriseToDelete!.unloadRecord();
      enterpriseToDelete!.save();
    }
  }
}
