import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';
import type { JsonApiModelInterface } from '../../json-api/interfaces/model.interface.js';
import { AssignmentTypeRepository } from '../repositories/assignment-type.repository.js';
import { AssignmentModel } from './assignment.model.js';

@Entity({
  tableName: 'assignment-type',
  customRepository: () => AssignmentTypeRepository,
})

export class AssignmentTypeModel implements JsonApiModelInterface {
        @PrimaryKey()
          id: string = v4();

        @Property()
        declare name: string;

        @Property({ nullable: true })
        declare color: string;

        @ManyToOne(() => AssignmentTypeModel, { wrappedReference: true, nullable: true })
        // eslint-disable-next-line no-use-before-define
        declare parents: AssignmentTypeModel;

        @OneToMany({ entity: () => AssignmentTypeModel, mappedBy: 'parents', nullable: true })
          childs = new Collection<AssignmentTypeModel>(this);

        @OneToMany({ entity: () => AssignmentModel, mappedBy: 'assignmentTypes', nullable: true })
          assignments = new Collection<AssignmentModel>(this);
}
