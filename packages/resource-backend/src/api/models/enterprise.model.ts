import { Collection, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';
import type { JsonApiModelInterface } from '../../json-api/interfaces/model.interface';
import { EnterpriseRepository } from '../repositories/enterprise.repository.js';
import { AssignmentModel } from './assignment.model.js';
import { ResourceModel } from './resource.model.js';

@Entity({
  tableName: 'enterprises',
  customRepository: () => EnterpriseRepository,
})

export class EnterpriseModel implements JsonApiModelInterface {
        @PrimaryKey()
          id: string = v4();

        @Property()
        declare name:string;

        @Property()
        declare emailAddress: string;

        @Property()
        declare emailAddress2?: string;

        @Property()
        declare phoneNumber: string;

        @Property()
        declare phoneNumber2?: string;

        @Property()
        declare city: string;

        @Property()
        declare address: string;

        @Property()
        declare enterpriseNumber?: string;

        @Property()
        declare vatNumber?: string;

        @OneToMany({ entity: () => AssignmentModel, mappedBy: 'id' })
          assignments = new Collection<AssignmentModel>(this);

        @OneToMany({ entity: () => ResourceModel, mappedBy: 'id' })
          resources = new Collection<ResourceModel>(this);
}
