import {
  Schema,
  SchemaBase,
  Number,
  String,
} from 'fastest-validator-decorators';

@Schema()
export class ValidatedResource extends SchemaBase {
    @String()
  declare firstName: string;

    @String()
    declare lastName: string;

    @String()
    declare path: string;

    @String()
    declare email1: string;

    @String()
    declare email2: string;

    @String()
    declare phone1: string;

    @String()
    declare phone2: string;

    @Number()
    declare cost: number;
}
