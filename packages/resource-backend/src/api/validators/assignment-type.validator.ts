import type { AssignmentModel } from './../models/assignment.model.js';
import {
  Schema,
  SchemaBase,
  String,
  Array,
} from 'fastest-validator-decorators';
import type { AssignmentTypeModel } from '../models/assignment-type.model.js';

  @Schema(true)
export class ValidatedAssignmentType extends SchemaBase {
      @String()
  public declare name: string;

      @String({ optional: true, empty: true })
      public declare color: string;

      @String({ empty: true, optional: true })
      public declare parents: AssignmentTypeModel;

      @Array({ empty: true, optional: true, items: 'string' })
      public declare children: AssignmentTypeModel[];

      @Array({ empty: true, optional: true, items: 'string' })
      public declare assignment: AssignmentModel[];
}

  @Schema(true)
export class ValidatedAssignmentTypeUpdate extends SchemaBase {
      @String()
  public declare id: string;

      @String({ optional: true })
      public declare name: string;

      @String({ optional: true })
      public declare color: string;

      @String({ empty: true, optional: true })
      public declare parents: AssignmentTypeModel;

      @Array({ empty: true, optional: true, items: 'string' })
      public declare children: AssignmentTypeModel[];

      @Array({ empty: true, optional: true, items: 'string' })
      public declare assignment: AssignmentModel[];
}
