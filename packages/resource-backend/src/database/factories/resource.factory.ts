import { Factory } from '@mikro-orm/seeder';
import { ResourceModel } from '../../api/models/resource.model.js';

export class ResourceFactory extends Factory<ResourceModel> {
  model = ResourceModel;

  definition (): Partial<ResourceModel> {
    return {
      firstName: 'Amaury',
      lastName: 'Deflorenne',
      emailAddress: 'amaury@tpk.be',
      emailAddress2: 'amaury@tpk.be',
      phoneNumber: '+32478986532',
      phoneNumber2: '+32478985632',
      cost: '15',
      image: 'string',
    };
  }
}
