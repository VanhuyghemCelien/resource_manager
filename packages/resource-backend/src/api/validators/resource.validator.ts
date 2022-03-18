import {
  Schema,
  SchemaBase,
  String,
} from 'fastest-validator-decorators';

@Schema(true)
export class ValidatedResource extends SchemaBase {
    @String()
  declare firstName: string;

    @String()
    declare lastName: string;

    @String()
    declare emailAddress: string;

    @String({ optional: true })
    declare emailAddress2: string;

    @String()
    declare phoneNumber: string;

    @String({ optional: true })
    declare phoneNumber2: string;

    @String({ optional: true })
    declare cost: string;

    @String()
    declare image: string;

    @String()
    declare roleUser: string;

    @String()
    declare enterprise: string;
}

@Schema(true)
export class ValidatedResourceUpdate extends SchemaBase {
    @String()
  declare id: string;

    @String({ optional: true })
    declare firstName: string;

    @String({ optional: true })
    declare lastName: string;

    @String({ optional: true })
    declare emailAddress: string;

    @String({ optional: true })
    declare emailAddress2: string;

    @String({ optional: true })
    declare phoneNumber: string;

    @String({ optional: true })
    declare phoneNumber2: string;

    @String({ optional: true })
    declare cost: string;
}
