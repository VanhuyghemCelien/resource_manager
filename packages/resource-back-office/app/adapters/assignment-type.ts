import JSONAPIAdapter from '../adapters/application';

export default class AssignmentType extends JSONAPIAdapter {
  urlForQueryRecord(
    query: Record<string, unknown>,
    modelName: string | number
  ) {
    if (query.name) {
      const url = `${this.host}/${this.namespace}/assignment-types/${query.name}`;
      delete query.name;
      return url;
    }
    return super.urlForQueryRecord(query, modelName);
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your adapters.
declare module 'ember-data/types/registries/adapter' {
  export default interface AdapterRegistry {
    'assignment-type': AssignmentType;
  }
}
