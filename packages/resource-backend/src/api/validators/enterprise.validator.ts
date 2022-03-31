import {
  Schema,
  SchemaBase,
  String,
  Array,
} from 'fastest-validator-decorators';
import type { AssignmentModel } from '../models/assignment.model.js';
import type { ResourceModel } from '../models/resource.model.js';

  @Schema(true)
export class ValidatedEnterprise extends SchemaBase {
      @String()
  declare name: string;

      @String()
      public declare phoneNumber: string;

      @String()
      public declare emailAddress: string;

      @String({ optional: true, empty: true })
      declare emailAddress2: string;

      @String({ optional: true, empty: true })
      declare phoneNumber2: string;

      @String({ optional: true, empty: true })
      declare enterpriseNumber: string;

      @String({ optional: true, empty: true })
      declare vatNumber: string;

      @String()
      public declare city: string;

      @String()
      public declare address: string;

      @Array({ empty: true, optional: true, items: 'string' })
      public declare assignment: AssignmentModel[];

      @Array({ empty: true, optional: true, items: 'string' })
      public declare resource: ResourceModel[];
}

  @Schema(true)
export class ValidatedEnterpriseUpdate extends SchemaBase {
      @String({ optional: true })
  public declare id: string;

      @String({ optional: true })
      public declare name: string;

      @String({ optional: true })
      public declare phoneNumber: string;

      @String({ optional: true })
      public declare emailAddress: string;

      @String({ optional: true })
      public declare emailAddress2: string;

      @String({ optional: true })
      public declare phoneNumber2: string;

      @String({ optional: true })
      public declare enterpriseNumber: string;

      @String({ optional: true })
      public declare vatNumber: string;

      @String({ optional: true })
      public declare city: string;

      @String({ optional: true })
      public declare address: string;

      @Array({ empty: true, optional: true, items: 'string' })
      public declare assignment: AssignmentModel[];

      @Array({ empty: true, optional: true, items: 'string' })
      public declare resource: ResourceModel[];
}
