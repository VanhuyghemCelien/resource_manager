import type Store from '@ember-data/store';
import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export interface ResourceModel {
  resourceId: number;
  image: string;
  firstName: string;
  lastName: string;
  enterprise: string;
  emailAddress: string;
  emailAddress2?: string;
  phoneNumber: string;
  phoneNumber2?: string;
  roleUser: string;
  cost?: string;
}

interface PagesResourcesArgs {}

export default class PagesResources extends Component<PagesResourcesArgs> {
  @service declare store: Store;

  @tracked displayNewResourceModal: Boolean = false;
  @tracked displayEditResourceModal: Boolean = false;
  @tracked displayDetailsResourceModal: Boolean = false;
  @tracked displayDeleteResourceModal: Boolean = false;
  @tracked modalName: string = '';
  @tracked resource: ResourceModel = {
    resourceId: 3,
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

  reinitResource() {
    this.resource = {
      resourceId: 3,
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
  }

  @action
  displayDeleteResource(resource: ResourceModel) {
    this.toggleDisplayDeleteResourceModal();
    this.resource = {
      resourceId: resource.resourceId,
      image: resource.image,
      firstName: resource.firstName,
      lastName: resource.lastName,
      enterprise: resource.enterprise,
      emailAddress: resource.emailAddress,
      emailAddress2: resource.emailAddress2,
      phoneNumber: resource.phoneNumber,
      phoneNumber2: resource.phoneNumber2,
      roleUser: resource.roleUser,
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
  displayResourceDetails(modalName: string, resourceReceived: ResourceModel) {
    const resourceToEdit: ResourceModel = {
      resourceId: resourceReceived.resourceId,
      image: resourceReceived.image,
      firstName: resourceReceived.firstName,
      lastName: resourceReceived.lastName,
      enterprise: resourceReceived.enterprise,
      emailAddress: resourceReceived.emailAddress,
      emailAddress2: resourceReceived.emailAddress2,
      phoneNumber: resourceReceived.phoneNumber,
      phoneNumber2: resourceReceived.phoneNumber2,
      roleUser: resourceReceived.roleUser,
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
  editResourceField(field: string, event: { target: { value: string } }) {
    switch (field) {
      case 'image':
        this.resource.image = event.target.value;
        break;
      case 'enterprise':
        this.resource.enterprise = event.target.value;
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
      case 'cost':
        this.resource.cost = event.target.value;
        break;
      default:
        break;
    }
  }

  @action
  addResource() {
    const resource = this.store.createRecord('resource', this.resource);
    this.reinitResource();
    resource.save();
    this.toggleDisplayResourceModal('new');
  }

  @action
  async editResource() {
    const editedResource = this.resource;
    const resource = await this.store.findRecord(
      'resource',
      editedResource.resourceId
    );

    resource.image = editedResource.image;
    resource.firstName = editedResource.firstName;
    resource.lastName = editedResource.lastName;
    resource.enterprise = editedResource.enterprise;
    resource.emailAddress = editedResource.emailAddress;
    resource.emailAddress2 = editedResource.emailAddress2;
    resource.phoneNumber = editedResource.phoneNumber;
    resource.phoneNumber2 = editedResource.phoneNumber2;
    resource.cost = editedResource.cost;

    resource.save();
    this.toggleDisplayResourceModal('edit');
  }

  @action
  async deleteResource(resource: ResourceModel) {
    const resourceToDelete = await this.store.peekRecord(
      'resource',
      resource.resourceId
    );
    if (resourceToDelete) {
      resourceToDelete!.deleteRecord();
      this.toggleDisplayDeleteResourceModal();
      resourceToDelete!.unloadRecord();
      resourceToDelete!.save();
    }
  }
}
