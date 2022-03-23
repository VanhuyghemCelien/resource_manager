import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';
import type { JsonApiModelInterface } from '../../json-api/interfaces/model.interface.js';
import { AssignmentRepository } from '../repositories/assignment.repository.js';
import { AssignmentTypeModel } from './assignment-type.model.js';
import { EnterpriseModel } from './enterprise.model.js';
import { ResourceModel } from './resource.model.js';

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

      @Property({ nullable: true })
      // eslint-disable-next-line no-undef
      declare comment?: Text;

      @ManyToOne(() => EnterpriseModel, { wrappedReference: true })
      declare enterprises: EnterpriseModel;

      @ManyToOne(() => ResourceModel, { wrappedReference: true })
      declare resources: ResourceModel;

      @ManyToOne(() => AssignmentTypeModel, { wrappedReference: true })
      declare types: AssignmentTypeModel;
}
