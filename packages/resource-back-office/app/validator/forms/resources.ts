import {
  validateFormat,
  validateLength,
  validatePresence,
} from 'ember-changeset-validations/validators';

export default {
  firstName: [validateLength({ max: 50, allowBlank: false })],
  lastName: [validateLength({ max: 100, allowBlank: false })],
  emailAddress: [validateFormat({ type: 'email', allowBlank: false })],
  emailAddress2: [validateFormat({ type: 'email', allowBlank: true })],
  phoneNumber: [
    validateFormat({
      regex:
        /^(((\+|00)32[ ]?(?:\(0\)[ ]?)?)|0){1}(4(60|[789]\d)\/?(\s?\d{2}\.?){2}(\s?\d{2})|(\d\/?\s?\d{3}|\d{2}\/?\s?\d{2})(\.?\s?\d{2}){2})$/,
      allowBlank: false,
    }), //This regex validates that the phonenumber is a belgian one (multiple formats can be used)
  ],
  phoneNumber2: [
    validateFormat({
      regex:
        /^(((\+|00)32[ ]?(?:\(0\)[ ]?)?)|0){1}(4(60|[789]\d)\/?(\s?\d{2}\.?){2}(\s?\d{2})|(\d\/?\s?\d{3}|\d{2}\/?\s?\d{2})(\.?\s?\d{2}){2})$/,
      allowBlank: true,
    }), //This regex validates that the phonenumber is a belgian one (multiple formats can be used)
  ],
  enterprise: [validatePresence(true)],
  cost: [validateLength({ allowBlank: true })],
};
