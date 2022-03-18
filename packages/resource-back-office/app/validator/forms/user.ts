import {
  validateConfirmation,
  validateLength,
  validatePresence,
} from 'ember-changeset-validations/validators';

export default {
  role: [validatePresence(true)],
  resource: [validatePresence(true)],
  login: [validatePresence(true), validateLength({ max: 60 })],
  password: [validatePresence(true), validateLength({ max: 255 })],
  passwordConfirmation: [
    validatePresence(true),
    validateLength({ max: 255 }),
    validateConfirmation({ on: 'password' }),
  ],
};
