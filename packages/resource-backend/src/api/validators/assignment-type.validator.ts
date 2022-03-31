import {
  Schema,
  SchemaBase,
  String,
} from 'fastest-validator-decorators';

  @Schema(true)
export class ValidatedAssignmentType extends SchemaBase {
      @String()
  declare name: string;

      @String({ optional: true, empty: true })
      declare color: string;
}

  @Schema(true)
export class ValidatedAssignmentTypeUpdate extends SchemaBase {
      @String()
  declare id: string;

      @String({ optional: true })
      declare name: string;

      @String({ optional: true })
      declare color: string;
}
