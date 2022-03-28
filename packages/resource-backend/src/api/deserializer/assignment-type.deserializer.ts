import JSONAPIDeSerializer from 'json-api-serializer';
import { injectable, singleton } from '@triptyk/nfw-core';

@injectable()
@singleton()
export class AssignmentTypeDeserializer {
  private deserializer : JSONAPIDeSerializer;

  constructor () {
    this.deserializer = new JSONAPIDeSerializer({ unconvertCase: 'camelCase' });
    this.deserializer.register('assignment-type', {
      relationships: {
        parents: {
          type: 'assignment-type',
        },
        childs: {
          type: 'assignment-type',
        },
        assignments: {
          type: 'assignment',
        },
      },
    });
    this.deserializer.register('assignment-type');
    this.deserializer.register('assignment-type');
    this.deserializer.register('assignment');
  }

  public deserialize (data: any) : any {
    return this.deserializer.deserialize('assignment-type', data);
  }
}
