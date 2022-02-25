import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export interface Enterprise {
  enterpriseid: number;
  name: string;
  city: string;
  emailaddress: string;
  phonenumber: string;
  emailaddress2: string;
  phonenumber2: string;
  enterprisenumber: string;
  vatnumber: string;
  address: string;
}

interface PagesEnterprisesArgs {}

// eslint-disable-next-line ember/no-empty-glimmer-component-classes
export default class PagesEnterprises extends Component<PagesEnterprisesArgs> {
  @tracked displayNewEnterpriseModal: Boolean = false;
  @tracked displayEditEnterpriseModal: Boolean = false;
  @tracked enterprise: Enterprise = {
    enterpriseid: 0,
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
  toggleDisplayNewEnterpriseModal() {
    if (this.displayNewEnterpriseModal) {
      this.displayNewEnterpriseModal = false;
    } else {
      this.displayNewEnterpriseModal = true;
    }
  }

  @action
  toggleDisplayEditEnterpriseModal() {
    if (this.displayEditEnterpriseModal) {
      this.displayEditEnterpriseModal = false;
    } else {
      this.displayEditEnterpriseModal = true;
    }
  }

  @action
  change(enterpriseReceived: Enterprise) {
    var enterpriseToEdit: Enterprise = {
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
    this.toggleDisplayEditEnterpriseModal();
  }
}
