import {
  Schema,
  SchemaBase,
  String,
} from 'fastest-validator-decorators';
import type { AssignmentModel } from '../models/assignment.model';
import type { ResourceModel } from '../models/resource.model';

  @Schema(true)
export class ValidatedEnterprise extends SchemaBase {
      @String()
  declare name: string;

      @String()
      public declare phoneNumber: string;

      @String()
      public declare emailAddress: string;

      @String({ optional: true })
      public declare emailAddress2: string;

      @String({ optional: true })
      public declare phoneNumber2: string;

      @String({ optional: true })
      public declare enterpriseNumber: string;

      @String({ optional: true })
      public declare vatNumber: string;

      @String()
      public declare city: string;

      @String()
      public declare address: string;

      public declare assignment: AssignmentModel[];

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

      public declare assignment: AssignmentModel[];

      public declare resource: ResourceModel[];
}
