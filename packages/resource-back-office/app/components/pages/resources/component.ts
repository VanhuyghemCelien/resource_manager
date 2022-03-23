import type Store from '@ember-data/store';
import { action } from '@ember/object';
import type RouterService from '@ember/routing/router-service';
import { inject, service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import type { FormsResourcesDTO } from 'ember-boilerplate/components/forms/resources/component';
import type ResourceModel from 'ember-boilerplate/models/resource';
import { Changeset } from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import type FlashMessageService from 'ember-cli-flash/services/flash-messages';
import type { TypedBufferedChangeset } from 'ember-form-changeset-validations';
import { loading } from 'ember-loading';
import ResourceValidation from '../../../validator/forms/resources';

interface PagesResourcesArgs {}

export default class PagesResources extends Component<PagesResourcesArgs> {
  @service declare store: Store;
  @service declare router: RouterService;
  @inject declare flashMessages: FlashMessageService;

  @tracked displayNewResourceModal: Boolean = false;
  @tracked displayEditResourceModal: Boolean = false;
  @tracked displayDetailsResourceModal: Boolean = false;
  @tracked displayDeleteResourceModal: Boolean = false;
  @tracked modalName: string = '';
  @tracked resource: Partial<ResourceModel> = {
    id: '',
    image: '/assets/images/resource1.png',
    firstName: '',
    lastName: '',
    enterprise: '',
    emailAddress: '',
    emailAddress2: '',
    phoneNumber: '',
    phoneNumber2: '',
    roleUser: 'user',
    cost: '',
  };

  @tracked changeset: TypedBufferedChangeset<FormsResourcesDTO>;
  constructor(owner: unknown, args: PagesResourcesArgs) {
    super(owner, args);
    this.changeset = Changeset(
      {
        image: '/assets/images/resource1.png',
        firstName: '',
        lastName: '',
        enterprise: '',
        emailAddress: '',
        emailAddress2: '',
        phoneNumber: '',
        phoneNumber2: '',
        roleUser: 'user',
        cost: '',
      },
      lookupValidator(ResourceValidation),
      ResourceValidation
    ) as TypedBufferedChangeset<FormsResourcesDTO>;
  }

  @action
  displayDeleteResource(id: string) {
    this.toggleDisplayDeleteResourceModal();
    this.changeset.set('id', id);
  }

  @action
  toggleDisplayResourceModal(type: string) {
    if (type === 'details') {
      this.toggleDisplayDetailsResourceModal();
    } else if (type === 'new') {
      this.toggleDisplayNewResourceModal();
    } else if (type === 'edit') {
      this.toggleDisplayEditResourceModal();
    }
  }

  @action
  async toggleDisplayDeleteResourceModal() {
    this.changeset.rollback();
    if (this.displayDeleteResourceModal) {
      this.displayDeleteResourceModal = false;
    } else {
      this.displayDeleteResourceModal = true;
    }
  }

  toggleDisplayNewResourceModal() {
    if (this.displayNewResourceModal) {
      this.displayNewResourceModal = false;
      this.changeset.rollback();
    } else {
      this.displayNewResourceModal = true;
    }
  }

  toggleDisplayEditResourceModal() {
    if (this.displayEditResourceModal) {
      this.displayEditResourceModal = false;
      this.changeset.rollback();
    } else {
      this.displayEditResourceModal = true;
    }
  }

  toggleDisplayDetailsResourceModal() {
    if (this.displayDetailsResourceModal) {
      this.displayDetailsResourceModal = false;
      this.changeset.rollback();
    } else {
      this.displayDetailsResourceModal = true;
    }
  }

  @action
  async displayResourceDetails(modalName: string, resourceIdReceived: string) {
    const resourceReceived = await this.store.queryRecord('resource', {
      id: resourceIdReceived,
    });
    this.changeset.set('id', resourceReceived.id);
    this.changeset.set('image', resourceReceived.image);
    this.changeset.set('firstName', resourceReceived.firstName);
    this.changeset.set('lastName', resourceReceived.lastName);
    this.changeset.set('enterprise', resourceReceived.enterprise);
    this.changeset.set('emailAddress', resourceReceived.emailAddress);
    this.changeset.set('emailAddress2', resourceReceived.emailAddress2);
    this.changeset.set('phoneNumber', resourceReceived.phoneNumber);
    this.changeset.set('phoneNumber2', resourceReceived.phoneNumber2);
    this.changeset.set('roleUser', resourceReceived.roleUser);
    this.changeset.set('cost', resourceReceived.cost);
    if (modalName === 'edit') {
      this.toggleDisplayEditResourceModal();
    } else if (modalName === 'details') {
      this.toggleDisplayDetailsResourceModal();
    }
  }

  @action
  @loading
  async addResource(changeset: TypedBufferedChangeset<FormsResourcesDTO>) {
    try {
      const resourceToSave: Partial<ResourceModel> = {
        image: '/assets/images/resource1.png',
        firstName: changeset.get('firstName'),
        lastName: changeset.get('lastName'),
        enterprise: changeset.get('enterprise'),
        emailAddress: changeset.get('emailAddress'),
        emailAddress2: changeset.get('emailAddress2') ?? undefined,
        phoneNumber: changeset.get('phoneNumber'),
        phoneNumber2: changeset.get('phoneNumber2') ?? undefined,
        roleUser: 'user',
        cost: changeset.get('cost'),
      };
      const resourceCreated = await this.store.createRecord(
        'resource',
        resourceToSave
      );
      await resourceCreated.save();
      this.changeset.rollback();
      this.toggleDisplayResourceModal('new');
      this.router.refresh();
    } catch (e) {
      this.flashMessages.danger(e.message);
    }
  }

  @action
  @loading
  async editResource(changeset: TypedBufferedChangeset<FormsResourcesDTO>) {
    try {
      const resource = await this.store.queryRecord('resource', {
        id: this.changeset.get('id'),
      });
      resource.image = '/assets/images/resource1.png';
      resource.firstName = changeset.get('firstName');
      resource.lastName = changeset.get('lastName');
      resource.enterprise = changeset.get('enterprise');
      resource.emailAddress = changeset.get('emailAddress');
      resource.emailAddress2 = changeset.get('emailAddress2') ?? undefined;
      resource.phoneNumber = changeset.get('phoneNumber');
      resource.phoneNumber2 = changeset.get('phoneNumber2') ?? undefined;
      resource.roleUser = 'user';
      resource.cost = changeset.get('cost');

      await resource.save();
      this.changeset.rollback();
      this.toggleDisplayResourceModal('edit');
    } catch (e) {
      this.flashMessages.danger(e.message);
    }
  }

  @action
  async deleteResource() {
    try {
      const resourceToDelete = await this.store.queryRecord('resource', {
        id: this.changeset.get('id'),
      });
      resourceToDelete.destroyRecord();
      this.changeset.rollback();
      this.toggleDisplayDeleteResourceModal();
    } catch (e) {
      this.flashMessages.danger(e.message);
    }
  }
}
