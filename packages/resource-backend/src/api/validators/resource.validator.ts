import {
  Schema,
  SchemaBase,
  String,
  Array,
} from 'fastest-validator-decorators';
import type { AssignmentModel } from '../models/assignment.model.js';
import type { EnterpriseModel } from '../models/enterprise.model.js';

@Schema(true)
export class ValidatedResource extends SchemaBase {
    @String()
  public declare firstName: string;

    @String()
    public declare lastName: string;

    @String()
    public declare emailAddress: string;

    @String({ optional: true })
    public declare emailAddress2: string;

    @String()
    public declare phoneNumber: string;

    @String({ optional: true })
    public declare phoneNumber2: string;

    @String({ optional: true })
    public declare cost: string;

    @String()
    public declare image: string;

    @String()
    public declare enterprises: EnterpriseModel;

    @Array({ empty: true, optional: true, items: 'string' })
    public declare assignment: AssignmentModel[];
}

@Schema(true)
export class ValidatedResourceUpdate extends SchemaBase {
    @String()
  public declare id: string;

    @String({ optional: true })
    public declare firstName: string;

    @String({ optional: true })
    public declare lastName: string;

    @String({ optional: true })
    public declare emailAddress: string;

    @String({ optional: true })
    public declare emailAddress2: string;

    @String({ optional: true })
    public declare phoneNumber: string;

    @String({ optional: true })
    public declare phoneNumber2: string;

    @String({ optional: true })
    public declare cost: string;

    @String({ optional: true })
    public declare enterprises: EnterpriseModel;

    @String({ optional: true })
    public declare image: string;

    @Array({ empty: true, optional: true, items: 'string' })
    public declare assignment: AssignmentModel[];
}
