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

  //   @ManytoOne('EnterpriseModel')
  //     enterprises = new Collection<EnterpriseModel>(this);

  //   @ManytoOne('ResourceModel')
  //     resources = new Collection<ResourceModel>(this);

  //   @ManytoOne('AssignmentTypeModel')
  //     types = new Collection<AssignmentTypeModel>(this);
}
