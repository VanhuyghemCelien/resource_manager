import {
  validateFormat,
  validateLength,
  validatePresence,
} from 'ember-changeset-validations/validators';

export default {
  assignmentType: [validatePresence(true)],
  name: [validateLength({ max: 30, allowBlank: false })],
  color: [
    validateFormat({
      regex: /^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/,
      allowBlank: false,
    }),
  ],
};
