import {
  Schema,
  SchemaBase,
  String,
} from 'fastest-validator-decorators';

  @Schema(true)
export class ValidatedEnterprise extends SchemaBase {
      @String()
  declare name: string;

      @String()
      declare phoneNumber: string;

      @String()
      declare emailAddress: string;

      @String({ optional: true })
      declare emailAddress2: string;

      @String({ optional: true })
      declare phoneNumber2: string;

      @String({ optional: true })
      declare enterpriseNumber: string;

      @String({ optional: true })
      declare vatNumber: string;

      @String()
      declare city: string;

      @String()
      declare address: string;
}

  @Schema(true)
export class ValidatedEnterpriseUpdate extends SchemaBase {
      @String({ optional: true })
  declare id: string;

      @String({ optional: true })
      declare name: string;

      @String({ optional: true })
      declare phoneNumber: string;

      @String({ optional: true })
      declare emailAddress: string;

      @String({ optional: true })
      declare emailAddress2: string;

      @String({ optional: true })
      declare phoneNumber2: string;

      @String({ optional: true })
      declare enterpriseNumber: string;

      @String({ optional: true })
      declare vatNumber: string;

      @String({ optional: true })
      declare city: string;

      @String({ optional: true })
      declare address: string;
}
