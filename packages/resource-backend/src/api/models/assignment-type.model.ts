import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';
import type { JsonApiModelInterface } from '../../json-api/interfaces/model.interface.js';
import { AssignmentTypeRepository } from '../repositories/assignment-type.repository.js';

@Entity({
  tableName: 'assignment-type',
  customRepository: () => AssignmentTypeRepository,
})

export class AssignmentTypeModel implements JsonApiModelInterface {
        @PrimaryKey()
          id: string = v4();

        @Property()
        declare name: string;

        @Property()
        declare color?: string;
}
