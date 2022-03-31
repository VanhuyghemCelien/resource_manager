import { EnterpriseModel } from './../../api/models/enterprise.model.js';
import { Factory } from '@mikro-orm/seeder';

export class EnterpriseFactory extends Factory<EnterpriseModel> {
  model = EnterpriseModel;

  definition (): Partial<EnterpriseModel> {
    return {
      name: 'TRIPTYK',
      emailAddress: 'tpk@tpk.be',
      phoneNumber: '+32478965823',
      city: 'Mons',
      address: 'Chaussée de Binche, 177A',
    };
  }
}
