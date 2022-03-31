import { EnterpriseModel } from './../../api/models/enterprise.model.js';
import { Factory } from '@mikro-orm/seeder';

export class EnterpriseFactory extends Factory<EnterpriseModel> {
  model = EnterpriseModel;

  definition (): Partial<EnterpriseModel> {
    return {
      name: 'max inc.',
      emailAddress: 'a@gmail.com',
      phoneNumber: '123',
      city: 'nismes',
      address: 'rue du goulag',
    };
  }
}
