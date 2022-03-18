import {
  validateFormat,
  validateLength,
  validatePresence,
} from 'ember-changeset-validations/validators';

export default {
  firstName: [validatePresence(true), validateLength({ max: 50 })],
  lastName: [validatePresence(true), validateLength({ max: 100 })],
  emailAddress: [
    validatePresence(true),
    validateFormat({ type: 'email' }),
    validateLength({ max: 255 }),
  ],
  emailAddress2: [
    validateFormat({ type: 'email' }),
    validateLength({ max: 255, allowBlank: true }),
  ],
  phoneNumber: [
    validatePresence(true),
    validateLength({ max: 20 }),
    validateFormat({
      regex:
        /^(((\+|00)32[ ]?(?:\(0\)[ ]?)?)|0){1}(4(60|[789]\d)\/?(\s?\d{2}\.?){2}(\s?\d{2})|(\d\/?\s?\d{3}|\d{2}\/?\s?\d{2})(\.?\s?\d{2}){2})$/,
    }), //This regex validates that the phonenumber is a belgian one (multiple formats can be used)
  ],
  phoneNumber2: [
    validateLength({ max: 20, allowBlank: true }),
    validateFormat({
      regex:
        /^(((\+|00)32[ ]?(?:\(0\)[ ]?)?)|0){1}(4(60|[789]\d)\/?(\s?\d{2}\.?){2}(\s?\d{2})|(\d\/?\s?\d{3}|\d{2}\/?\s?\d{2})(\.?\s?\d{2}){2})$/,
    }), //This regex validates that the phonenumber is a belgian one (multiple formats can be used)
  ],
  enterprise: [validatePresence(true)],
  cost: [validateLength({ allowBlank: true })],
};
