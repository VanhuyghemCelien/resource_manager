import type { JsonApiModelInterface } from './../../json-api/interfaces/model.interface.js';
import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { ResourceRepository } from '../repositories/resource.repository.js';
import { AssignmentModel } from './assignment.model.js';
import { EnterpriseModel } from './enterprise.model.js';

@Entity({
  tableName: 'resources',
  customRepository: () => ResourceRepository,
})

export class ResourceModel implements JsonApiModelInterface {
    @PrimaryKey()
      id: string = v4();

    @Property()
    declare firstName: string;

    @Property()
    declare lastName: string;

    @Property()
    declare emailAddress: string;

    @Property()
    declare emailAddress2?: string;

    @Property()
    declare phoneNumber: string;

    @Property()
    declare phoneNumber2?: string;

    @Property()
    declare cost?: string;

    @Property()
    declare image: string;

    @Property()
    declare enterprise: string;

    @Property()
    declare roleUser: string;

    @OneToMany({ entity: () => AssignmentModel, mappedBy: 'id' })
      assignments = new Collection<AssignmentModel>(this);

      @ManyToOne(() => EnterpriseModel, { wrappedReference: true })
    declare enterprises: EnterpriseModel;
}
