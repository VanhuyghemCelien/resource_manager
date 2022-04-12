import Service from '@ember/service';

export default class AssignmentTypeRefresh extends Service {
  //Function that get all the assignment-types
  //Function that get all the assignment-types that are assigned
  //Function that edit an assignment-type
  //Function that delete an assignment-type
  //Function that create an assignment-type
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    'assignment-type-refresh': AssignmentTypeRefresh;
  }
}
