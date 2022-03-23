import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';
import type { JsonApiModelInterface } from '../../json-api/interfaces/model.interface';
import { EnterpriseRepository } from '../repositories/enterprise.repository.js';

@Entity({
  tableName: 'enterprises',
  customRepository: () => EnterpriseRepository,
})

export class EnterpriseModel implements JsonApiModelInterface {
        @PrimaryKey()
          id: string = v4();

        @Property()
        declare name: string;

        @Property()
        declare emailAddress: string;

        @Property({ nullable: true })
        declare emailAddress2?: string;

        @Property()
        declare phoneNumber: string;

        @Property({ nullable: true })
        declare phoneNumber2?: string;

        @Property()
        declare city: string;

        @Property()
        declare address: string;

        @Property({ nullable: true })
        declare enterpriseNumber?: string;

        @Property({ nullable: true })
        declare vatNumber?: string;
}
