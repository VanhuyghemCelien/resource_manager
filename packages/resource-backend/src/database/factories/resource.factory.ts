import { Factory } from '@mikro-orm/seeder';
import { ResourceModel } from '../../api/models/resource.model.js';

export class ResourceFactory extends Factory<ResourceModel> {
  model = ResourceModel;

  definition (): Partial<ResourceModel> {
    return {
      firstName: 'string',
      lastName: 'string',
      emailAddress: 'string',
      emailAddress2: 'string',
      phoneNumber: 'string',
      phoneNumber2: 'string',
      cost: 'string',
      image: 'string',
    };
  }
}
