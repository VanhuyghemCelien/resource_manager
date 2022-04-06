import JSONAPIAdapter from './application';

export default class Resources extends JSONAPIAdapter {
  urlForQuery(query: Record<string, unknown>, modelName: string | number) {
    console.log(query);
    if (query.firstDate) {
      const url = `${this.host}/${this.namespace}/resources/${query.firstDate}/${query.lastDate}`;
      return url;
    }
    return super.urlForQuery(query, modelName);
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your adapters.
declare module 'ember-data/types/registries/adapter' {
  export default interface AdapterRegistry {
    resource: Resources;
  }
}
