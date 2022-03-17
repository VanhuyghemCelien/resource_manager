import {
  validateFormat,
  validateLength,
  validatePresence,
} from 'ember-changeset-validations/validators';

export default {
  assignmentType: [validatePresence(true)],
  name: [validatePresence(true), validateLength({ max: 30 })],
  color: [
    validatePresence(true),
    validateFormat({ regex: /^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/ }),
  ],
};
