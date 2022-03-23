import { Schema, SchemaBase, Date, Boolean, String } from 'fastest-validator-decorators';
import type { AssignmentTypeModel } from '../models/assignment-type.model';
import type { EnterpriseModel } from '../models/enterprise.model';
import type { ResourceModel } from '../models/resource.model';

@Schema(true)
export class ValidatedAssignment extends SchemaBase {
    @Date()
  public declare date : Date;

  @Boolean()
    public declare isMorning : boolean;

  @Boolean()
  public declare isAfternoon : boolean;

  @Boolean()
  public declare isRemote : boolean;

  @String({ optional: true, empty: true })
  public declare comment: string;

  public declare enterprises: EnterpriseModel;

  public declare resources: ResourceModel;

  public declare assignmentTypes: AssignmentTypeModel;
}

@Schema(true)
export class ValidatedAssignmentUpdate extends SchemaBase {
    @Date({ optional: true })
  public declare date : Date;

    @Boolean({ optional: true })
    public declare isMorning : boolean;

    @Boolean({ optional: true })
    public declare isAfternoon : boolean;

    @Boolean({ optional: true })
    public declare isRemote : boolean;

    @String({ optional: true })
    public declare comment: string;

    public declare enterprises: EnterpriseModel;

    public declare resources: ResourceModel;

    public declare assignmentTypes: AssignmentTypeModel;
}
