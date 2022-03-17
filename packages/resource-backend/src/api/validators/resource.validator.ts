import {
  Schema,
  SchemaBase,
  String,
} from 'fastest-validator-decorators';

@Schema()
export class ValidatedResource extends SchemaBase {
    @String()
  declare firstName: string;

    @String()
    declare lastName: string;

    @String()
    declare emailAddress: string;

    @String()
    declare emailAddress2: string;

    @String()
    declare phoneNumber: string;

    @String()
    declare phoneNumber2: string;

    @String()
    declare cost: string;
}
