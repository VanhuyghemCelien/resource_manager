import {
  Schema,
  SchemaBase,
  String,
} from 'fastest-validator-decorators';

  @Schema(true)
export class ValidatedAssignmentType extends SchemaBase {
      @String()
  public declare name: string;

      @String({ optional: true })
      public declare color: string;
}

  @Schema(true)
export class ValidatedAssignmentTypeUpdate extends SchemaBase {
      @String()
  public declare id: string;

      @String({ optional: true })
      public declare name: string;

      @String({ optional: true })
      public declare color: string;
}
