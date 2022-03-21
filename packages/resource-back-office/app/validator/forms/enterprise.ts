import {
  validateFormat,
  validateLength,
} from 'ember-changeset-validations/validators';

export default {
  name: [validateLength({ max: 60, allowBlank: false })],
  city: [validateLength({ max: 60, allowBlank: false })],
  address: [validateLength({ max: 255, allowBlank: false })],
  emailAddress: [validateFormat({ type: 'email', allowBlank: false })],
  phoneNumber: [
    validateFormat({
      regex:
        /^(((\+|00)32[ ]?(?:\(0\)[ ]?)?)|0){1}(4(60|[789]\d)\/?(\s?\d{2}\.?){2}(\s?\d{2})|(\d\/?\s?\d{3}|\d{2}\/?\s?\d{2})(\.?\s?\d{2}){2})$/,
      allowBlank: false,
    }), //This regex validates that the phonenumber is a belgian one (multiple formats can be used)
  ],
  emailAddress2: [validateFormat({ type: 'email', allowBlank: true })],
  phoneNumber2: [
    validateFormat({
      regex:
        /^(((\+|00)32[ ]?(?:\(0\)[ ]?)?)|0){1}(4(60|[789]\d)\/?(\s?\d{2}\.?){2}(\s?\d{2})|(\d\/?\s?\d{3}|\d{2}\/?\s?\d{2})(\.?\s?\d{2}){2})$/,
      allowBlank: true,
    }), //This regex validates that the phonenumber is a belgian one (multiple formats can be used)
  ],
  enterpriseNumber: [
    validateFormat({
      regex:
        /^(U[0-9]{8}|0[0-9]{9}|[0-9]{8}L|[0-9]{8,12}|[0-9A-Z][0-9]{7}[0-9A-Z]|[0-9A-Z]{2}[0-9]{9}|([0-9]{9}([0-9]{3})?|[A-Z]{2}[0-9]{3})|[0-9]S[0-9]{5}L|[0-9]{9}B[0-9]{2}|[0-9]{2,10})$/,
      allowBlank: true,
    }), //This regex validates that the enterprise number is an european one
  ],
  vatNumber: [
    validateFormat({
      regex:
        /^((AT)?U[0-9]{8}|(BE)?0[0-9]{9}|(BG)?[0-9]{9,10}|(CY)?[0-9]{8}L|(CZ)?[0-9]{8,10}|(DE)?[0-9]{9}|(DK)?[0-9]{8}|(EE)?[0-9]{9}|(EL|GR)?[0-9]{9}|(ES)?[0-9A-Z][0-9]{7}[0-9A-Z]|(FI)?[0-9]{8}|(FR)?[0-9A-Z]{2}[0-9]{9}|(GB)?([0-9]{9}([0-9]{3})?|[A-Z]{2}[0-9]{3})|(HU)?[0-9]{8}|(IE)?[0-9]S[0-9]{5}L|(IT)?[0-9]{11}|(LT)?([0-9]{9}|[0-9]{12})|(LU)?[0-9]{8}|(LV)?[0-9]{11}|(MT)?[0-9]{8}|(NL)?[0-9]{9}B[0-9]{2}|(PL)?[0-9]{10}|(PT)?[0-9]{9}|(RO)?[0-9]{2,10}|(SE)?[0-9]{12}|(SI)?[0-9]{8}|(SK)?[0-9]{10})$/,
      allowBlank: true,
    }), //This regex validates that the VAT number is an european one
  ],
};
