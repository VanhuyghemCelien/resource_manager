import type { JsonApiModelInterface } from './../../json-api/interfaces/model.interface.js';
import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { ResourceRepository } from '../repositories/resource.repository.js';
import { AssignmentModel } from './assignment.model.js';
import type { EnterpriseModel } from './enterprise.model.js';

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

    @Property({ nullable: true })
    declare emailAddress2?: string;

    @Property()
    declare phoneNumber: string;

    @Property({ nullable: true })
    declare phoneNumber2?: string;

    @Property({ nullable: true })
    declare cost?: string;

    @Property()
    declare image: string;

    @OneToMany({ entity: () => AssignmentModel, mappedBy: 'resource', nullable: true })
      assignment = new Collection<AssignmentModel>(this);

      @ManyToOne('EnterpriseModel', { wrappedReference: true })
    declare enterprise: EnterpriseModel;
}
