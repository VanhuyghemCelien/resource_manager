import {
  Schema,
  SchemaBase,
  String,
} from 'fastest-validator-decorators';
import type { AssignmentModel } from '../models/assignment.model';
import type { EnterpriseModel } from '../models/enterprise.model';

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
    public declare roleUser: string;

    public declare enterprise: EnterpriseModel;

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

    public declare enterprise: EnterpriseModel;

    @String()
    public declare image: string;

    public declare assignment: AssignmentModel[];
}
