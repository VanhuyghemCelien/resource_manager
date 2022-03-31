import type Store from '@ember-data/store';
import { action } from '@ember/object';
import { inject, service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import type ResourceModel from 'ember-boilerplate/models/resource';
import type FlashMessageService from 'ember-cli-flash/services/flash-messages';

interface PagesResourcesArgs {}

export default class PagesResources extends Component<PagesResourcesArgs> {
  @service declare store: Store;

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
    emailAddress: '',
    emailAddress2: '',
    phoneNumber: '',
    phoneNumber2: '',
    enterprises: undefined,
    cost: '',
  };

  reinitResource() {
    this.resource = {
      id: '',
      image: '/assets/images/resource1.png',
      firstName: '',
      lastName: '',
      emailAddress: '',
      emailAddress2: '',
      phoneNumber: '',
      phoneNumber2: '',
      enterprises: undefined,
      cost: '',
    };
  }

  @action
  displayDeleteResource(resource: ResourceModel) {
    this.toggleDisplayDeleteResourceModal();
    this.resource = {
      id: resource.id,
      image: resource.image,
      firstName: resource.firstName,
      lastName: resource.lastName,
      emailAddress: resource.emailAddress,
      emailAddress2: resource.emailAddress2,
      phoneNumber: resource.phoneNumber,
      phoneNumber2: resource.phoneNumber2,
      enterprises: resource.enterprises,
      cost: resource.cost,
    };
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
    this.reinitResource();
    if (this.displayDeleteResourceModal) {
      this.displayDeleteResourceModal = false;
    } else {
      this.displayDeleteResourceModal = true;
    }
  }

  toggleDisplayNewResourceModal() {
    if (this.displayNewResourceModal) {
      this.displayNewResourceModal = false;
      this.reinitResource();
    } else {
      this.displayNewResourceModal = true;
    }
  }

  toggleDisplayEditResourceModal() {
    if (this.displayEditResourceModal) {
      this.displayEditResourceModal = false;
      this.reinitResource();
    } else {
      this.displayEditResourceModal = true;
    }
  }

  toggleDisplayDetailsResourceModal() {
    if (this.displayDetailsResourceModal) {
      this.displayDetailsResourceModal = false;
      this.reinitResource();
    } else {
      this.displayDetailsResourceModal = true;
    }
  }

  @action
  displayResourceDetails(
    modalName: string,
    resourceReceived: Partial<ResourceModel>
  ) {
    const resourceToEdit: Partial<ResourceModel> = {
      id: resourceReceived.id,
      image: resourceReceived.image,
      firstName: resourceReceived.firstName,
      lastName: resourceReceived.lastName,
      emailAddress: resourceReceived.emailAddress,
      emailAddress2: resourceReceived.emailAddress2,
      phoneNumber: resourceReceived.phoneNumber,
      phoneNumber2: resourceReceived.phoneNumber2,
      enterprises: resourceReceived.enterprises,
      cost: resourceReceived.cost,
    };
    this.resource = resourceToEdit;
    if (modalName === 'edit') {
      this.toggleDisplayEditResourceModal();
    } else if (modalName === 'details') {
      this.toggleDisplayDetailsResourceModal();
    }
  }

  @action
  async editResourceField(field: string, event: { target: { value: string } }) {
    switch (field) {
      case 'image':
        this.resource.image = event.target.value;
        break;
      case 'emailAddress':
        this.resource.emailAddress = event.target.value;
        break;
      case 'phoneNumber':
        this.resource.phoneNumber = event.target.value;
        break;
      case 'phoneNumber2':
        this.resource.phoneNumber2 = event.target.value;
        break;
      case 'emailAddress2':
        this.resource.emailAddress2 = event.target.value;
        break;
      case 'firstName':
        this.resource.firstName = event.target.value;
        break;
      case 'lastName':
        this.resource.lastName = event.target.value;
        break;
      case 'enterprise':
        this.resource.enterprises = await this.store.queryRecord('enterprise', {
          id: event.target.value,
          fields: '*',
        });
        console.log(this.resource.enterprises, 'coucoutoi');

        break;
      case 'cost':
        this.resource.cost = event.target.value;
        break;
      default:
        break;
    }
  }

  @inject declare flashMessages: FlashMessageService;
  @action
  async addResource() {
    console.log(this.resource);
    console.log(this.resource.enterprises);
    try {
      console.log('ici');
      const resource = await this.store.createRecord('resource', this.resource);
      console.log('après');
      this.reinitResource();
      resource.save();
      this.toggleDisplayResourceModal('new');
    } catch (e) {
      this.flashMessages.danger('erreur');
    }
  }

  @action
  async editResource() {
    const editedResource = this.resource;
    console.log(editedResource);
    const resource = await this.store.findRecord(
      'resource',
      editedResource.id!
    );
    console.log(resource);
    resource.image = editedResource.image!;
    resource.firstName = editedResource.firstName!;
    resource.lastName = editedResource.lastName!;
    resource.emailAddress = editedResource.emailAddress!;
    resource.emailAddress2 = editedResource.emailAddress2;
    resource.phoneNumber = editedResource.phoneNumber!;
    resource.phoneNumber2 = editedResource.phoneNumber2;
    resource.enterprises = editedResource.enterprises!;
    resource.cost = editedResource.cost;

    resource.save();
    this.toggleDisplayResourceModal('edit');
  }

  @action
  async deleteResource(resource: ResourceModel) {
    const resourceToDelete = await this.store.queryRecord('resource', {
      id: resource.id,
    });

    if (resourceToDelete) {
      resourceToDelete.destroyRecord();
      this.toggleDisplayDeleteResourceModal();
    }
  }
}
