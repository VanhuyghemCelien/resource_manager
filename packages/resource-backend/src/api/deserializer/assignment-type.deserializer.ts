import JSONAPIDeSerializer from 'json-api-serializer';
import { injectable, singleton } from '@triptyk/nfw-core';

@injectable()
@singleton()
export class AssignmentTypeDeserializer {
  private deserializer : JSONAPIDeSerializer;

  constructor () {
    this.deserializer = new JSONAPIDeSerializer({ unconvertCase: 'camelCase' });
    this.deserializer.register('assignmentType', {
      relationships: {
        parents: {
          type: 'assignmentType',
        },
        childs: {
          type: 'assignmentType',
        },
        assignments: {
          type: 'assignment',
        },
      },
    });
    this.deserializer.register('assignmentType');
    this.deserializer.register('assignmentType');
    this.deserializer.register('assignment');
  }

  public deserialize (data: any) : any {
    return this.deserializer.deserialize('assignmentType', data);
  }
}
