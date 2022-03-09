import type Store from '@ember-data/store';
import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export interface ResourceModel {
  resourceid: number;
  image: string;
  emailaddress: string;
  emailaddress2: string;
  firstname: string;
  lastname: string;
  phonenumber: string;
  phonenumber2: string;
  roleuser: string;
  enterprise: string;
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
    resourceid: 3,
    image: '/assets/images/resource1.png',
    emailaddress: '',
    emailaddress2: '',
    firstname: '',
    lastname: '',
    phonenumber: '',
    phonenumber2: '',
    roleuser: 'user',
    enterprise: '',
  };

  reinitResource() {
    this.resource = {
      resourceid: 3,
      image: '/assets/images/resource1.png',
      emailaddress: '',
      emailaddress2: '',
      firstname: '',
      lastname: '',
      phonenumber: '',
      phonenumber2: '',
      roleuser: 'user',
      enterprise: '',
    };
  }

  @action
  displayDeleteResource(resource: ResourceModel) {
    this.toggleDisplayDeleteResourceModal();
    this.resource = {
      resourceid: resource.resourceid,
      image: resource.image,
      emailaddress: resource.emailaddress,
      emailaddress2: resource.emailaddress2,
      firstname: resource.firstname,
      lastname: resource.lastname,
      phonenumber: resource.phonenumber,
      phonenumber2: resource.phonenumber2,
      roleuser: resource.roleuser,
      enterprise: resource.enterprise,
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
      resourceid: resourceReceived.resourceid,
      image: resourceReceived.image,
      emailaddress: resourceReceived.emailaddress,
      emailaddress2: resourceReceived.emailaddress2,
      firstname: resourceReceived.firstname,
      lastname: resourceReceived.lastname,
      phonenumber: resourceReceived.phonenumber,
      phonenumber2: resourceReceived.phonenumber2,
      roleuser: resourceReceived.roleuser,
      enterprise: resourceReceived.enterprise,
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
      case 'emailaddress':
        this.resource.emailaddress = event.target.value;
        break;
      case 'phonenumber':
        this.resource.phonenumber = event.target.value;
        break;
      case 'phonenumber2':
        this.resource.phonenumber2 = event.target.value;
        break;
      case 'emailaddress2':
        this.resource.emailaddress2 = event.target.value;
        break;
      case 'firstname':
        this.resource.firstname = event.target.value;
        break;
      case 'lastname':
        this.resource.lastname = event.target.value;
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
      editedResource.resourceid
    );

    resource.image = editedResource.image;
    resource.enterprise = editedResource.enterprise;
    resource.emailaddress = editedResource.emailaddress;
    resource.phonenumber = editedResource.phonenumber;
    resource.emailaddress2 = editedResource.emailaddress2;
    resource.phonenumber2 = editedResource.phonenumber2;
    resource.firstname = editedResource.firstname;
    resource.lastname = editedResource.lastname;

    resource.save();
    this.toggleDisplayResourceModal('edit');
  }

  @action
  async deleteResource(resourceId: number) {
    const resourceToDelete = await this.store.peekRecord(
      'resource',
      resourceId
    );
    if (resourceId) {
      resourceToDelete!.deleteRecord();
      this.toggleDisplayDeleteResourceModal();
      resourceToDelete!.unloadRecord();
      resourceToDelete!.save();
    }
  }
}
