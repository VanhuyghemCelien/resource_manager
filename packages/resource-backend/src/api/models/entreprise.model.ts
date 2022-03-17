import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';
import type { JsonApiModelInterface } from '../../json-api/interfaces/model.interface';

@Entity({
  tableName: 'assignment',
  // customRepository: () => AssignmentRepository,
})

export class AssignemntModel implements JsonApiModelInterface {
        @PrimaryKey()
          id: string = v4();

        @Property()
        declare name:string;

        @Property()
        declare email1: string;

        @Property()
        declare email2?: string;

        @Property()
        declare phone1: string;

        @Property()
        declare phone2?: string;

        @Property()
        declare city: string;

        @Property()
        declare address: string;

        @Property()
        declare number?: string;

        @Property()
        declare vatNumber?: string;
}
