import type Store from '@ember-data/store';
import Service, { inject } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import type AssignmentModel from 'ember-boilerplate/models/assignment';

export default class LocalStorage extends Service {
  @inject declare store: Store;

  @tracked public assignment?: AssignmentModel;

  setFirstItem(assignment: AssignmentModel) {
    localStorage.setItem('first', assignment.id);
  }

  setSecondItem() {
    let first = localStorage.getItem('first') ?? '';
    localStorage.setItem('second', first);
  }

  setThirdItem() {
    let first = localStorage.getItem('second') ?? '';
    localStorage.setItem('third', first);
  }

  async getItems(key: string) {
    let res = await this.store.query('assignment', {
      filter: { id: localStorage.getItem(key) },
      fields: 'isRemote,comment,enterprise,assignmentType',
    });
    console.log(res);
    this.assignment = res.firstObject;
    return this.assignment;
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    localstorage: LocalStorage;
  }
}
