import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';
import type { JsonApiModelInterface } from '../../json-api/interfaces/model.interface';

@Entity({
  tableName: 'assignment-type',
  // customRepository: () => AssignmentTypeRepository,
})

export class AssignemntModel implements JsonApiModelInterface {
        @PrimaryKey()
          id: string = v4();

        @Property()
        declare name: string;

        @Property()
        declare color: string;
}
