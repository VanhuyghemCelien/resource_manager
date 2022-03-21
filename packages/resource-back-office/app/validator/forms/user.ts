import {
  validateConfirmation,
  validateLength,
  validatePresence,
} from 'ember-changeset-validations/validators';

export default {
  role: [validatePresence(true)],
  resource: [validatePresence(true)],
  login: [validateLength({ max: 60, allowBlank: false })],
  password: [validateLength({ max: 255, allowBlank: false })],
  passwordConfirmation: [
    validateConfirmation({ on: 'password', allowBlank: false }),
  ],
};
