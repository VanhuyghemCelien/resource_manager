import JSONAPIDeSerializer from 'json-api-serializer';
import { injectable, singleton } from '@triptyk/nfw-core';

@injectable()
@singleton()
export class ResourceDeserializer {
  private deserializer : JSONAPIDeSerializer;

  constructor () {
    this.deserializer = new JSONAPIDeSerializer({ unconvertCase: 'camelCase' });
    this.deserializer.register('resource', {
      relationships: {
        enterprises: {
          type: 'enterprise',
        },
        assignments: {
          type: 'assignment',
        },
      },
    });
    this.deserializer.register('enterprise');
    this.deserializer.register('assignment');
  }

  public deserialize (data: any) : any {
    return this.deserializer.deserialize('resource', data);
  }
}
