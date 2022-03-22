import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';
import type Store from '@ember-data/store';
import type EnterpriseModel from 'ember-boilerplate/models/enterprise';
import type FlashMessageService from 'ember-cli-flash/services/flash-messages';
import type { TypedBufferedChangeset } from 'ember-form-changeset-validations';
import type { FormsEnterpriseDTO } from 'ember-boilerplate/components/forms/enterprise/component';
import { Changeset } from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import EnterpriseValidation from '../../../validator/forms/enterprise';
import { inject } from '@ember/controller';
import { loading } from 'ember-loading';

interface PagesEnterprisesArgs {}

export default class PagesEnterprises extends Component<PagesEnterprisesArgs> {
  @service declare store: Store;
  @inject declare flashMessages: FlashMessageService;

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
    this.changeset.rollback();
  }

  @action
  displayDeleteEnterprise(id: string) {
    this.toggleDisplayDeleteEnterpriseModal();
    console.log(id);

    this.changeset.set('id', id);
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
  async displayEnterpriseDetails(
    modalName: string,
    enterpriseIdReceived: string
  ) {
    const enterpriseReceived = await this.store.queryRecord('enterprise', {
      id: enterpriseIdReceived,
    });
    this.changeset.set('id', enterpriseReceived.id);
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
  @loading
  async addEnterprise(changeset: TypedBufferedChangeset<FormsEnterpriseDTO>) {
    try {
      const enterpriseToSave: Partial<EnterpriseModel> = {
        name: changeset.get('name'),
        city: changeset.get('city'),
        emailAddress: changeset.get('emailAddress'),
        phoneNumber: changeset.get('phoneNumber'),
        phoneNumber2: changeset.get('phoneNumber2'),
        emailAddress2: changeset.get('emailAddress2'),
        enterpriseNumber: changeset.get('enterpriseNumber'),
        vatNumber: changeset.get('vatNumber'),
        address: changeset.get('address'),
      };
      const enterpriseCreated = await this.store.createRecord(
        'enterprise',
        enterpriseToSave
      );
      this.reinitEnterprise();
      enterpriseCreated.save();
      this.toggleDisplayEnterpriseModal('new');
    } catch (e) {
      this.flashMessages.danger(e.message);
    }
  }

  @action
  async editEnterprise(changeset: TypedBufferedChangeset<FormsEnterpriseDTO>) {
    try {
      const enterprise = await this.store.queryRecord('enterprise', {
        id: this.changeset.get('id'),
      });

      enterprise.name = changeset.get('name');
      enterprise.city = changeset.get('city');
      enterprise.address = changeset.get('address');
      enterprise.emailAddress = changeset.get('emailAddress');
      enterprise.phoneNumber = changeset.get('phoneNumber');
      enterprise.emailAddress2 = changeset.get('emailAddress2');
      enterprise.phoneNumber2 = changeset.get('phoneNumber2');
      enterprise.enterpriseNumber = changeset.get('enterpriseNumber');
      enterprise.vatNumber = changeset.get('vatNumber');

      enterprise.save();
      this.changeset.rollback();
      this.toggleDisplayEnterpriseModal('edit');
    } catch (e) {
      this.flashMessages.danger(e.message);
    }
  }

  @action
  async deleteEnterprise() {
    try {
      const enterpriseToDelete = await this.store.queryRecord('enterprise', {
        id: this.changeset.get('id'),
      });
      enterpriseToDelete.destroyRecord();
      this.changeset.rollback();
      this.toggleDisplayDeleteEnterpriseModal();
    } catch (e) {
      this.flashMessages.danger(e.message);
    }
  }
}
