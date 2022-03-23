import JSONAPIDeSerializer from 'json-api-serializer';
import { injectable, singleton } from '@triptyk/nfw-core';

@injectable()
@singleton()
export class EnterpriseDeserializer {
  private deserializer : JSONAPIDeSerializer;

  constructor () {
    this.deserializer = new JSONAPIDeSerializer({ unconvertCase: 'camelCase' });
    this.deserializer.register('enterprise', {
      relationships: {
        resources: {
          type: 'resource',
        },
        assignments: {
          type: 'assignment',
        },
      },
    });
  }

  public deserialize (data: any) : any {
    return this.deserializer.deserialize('enterprise', data);
  }
}
