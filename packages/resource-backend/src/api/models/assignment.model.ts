import { Entity, ManyToOne, PrimaryKey, Property, Collection } from '@mikro-orm/core';
import { v4 } from 'uuid';
import type { JsonApiModelInterface } from '../../json-api/interfaces/model.interface.js';
import { AssignmentRepository } from '../repositories/assignment.repository.js';
import type { AssignmentTypeModel } from './assignment-type.model.js';
import type { EnterpriseModel } from './enterprise.model.js';
import type { ResourceModel } from './resource.model.js';

@Entity({
  tableName: 'assignment',
  customRepository: () => AssignmentRepository,
})

export class AssignmentModel implements JsonApiModelInterface {
      @PrimaryKey()
        id: string = v4();

      @Property()
      declare date: Date;

      @Property()
      declare isMorning: boolean;

      @Property()
      declare isAfternoon: boolean;

      @Property()
      declare isRemote: boolean;

      @Property()
      // eslint-disable-next-line no-undef
      declare comment?: Text;

      @ManyToOne('EnterpriseModel')
        enterprises = new Collection<EnterpriseModel>(this);

     @ManyToOne('ResourceModel')
       resources = new Collection<ResourceModel>(this);

     @ManyToOne('AssignmentTypeModel')
       types = new Collection<AssignmentTypeModel>(this);
}
