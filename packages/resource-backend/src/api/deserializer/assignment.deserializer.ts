import { injectable, singleton } from '@triptyk/nfw-core';
import JSONAPISerializer from 'json-api-serializer';

@injectable()
@singleton()
export class AssignmentDeserializer {
  private deserializer : JSONAPISerializer;

  constructor () {
    this.deserializer = new JSONAPISerializer();
    this.deserializer.register('user', {
      relationships: {
        enterprises: {
          type: 'enterprise',
        },
        resources: {
          type: 'resource',
        },
        assignmentTypes: {
          type: 'assignment-type',
        },
      },
    });
    this.deserializer.register('enterprise');
    this.deserializer.register('resource');
    this.deserializer.register('assignment-type');
  }

  public deserialize (data: any) : any {
    return this.deserializer.deserialize('assignment', data);
  }
}
