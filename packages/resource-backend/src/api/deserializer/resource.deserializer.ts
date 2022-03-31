import JSONAPIDeSerializer from 'json-api-serializer';
import { injectable, singleton } from '@triptyk/nfw-core';

@injectable()
@singleton()
export class ResourceDeserializer {
  private deserializer : JSONAPIDeSerializer;

  constructor () {
    this.deserializer = new JSONAPIDeSerializer({ unconvertCase: 'camelCase' });
    this.deserializer.register('resources', {
      relationships: {
        enterprises: {
          type: 'enterprises',
        },
        assignments: {
          type: 'assignments',
        },
      },
    });
    this.deserializer.register('enterprises');
    this.deserializer.register('assignments');
  }

  public deserialize (data: any) : any {
    return this.deserializer.deserialize('resources', data);
  }
}
