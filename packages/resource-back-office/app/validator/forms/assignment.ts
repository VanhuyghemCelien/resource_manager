import { validatePresence } from 'ember-changeset-validations/validators';

export default {
  resource: [validatePresence(true)],
  enterprise: [validatePresence(true)],
  assignmentType: [validatePresence(true)],
  date: [validatePresence(true)],
  isMorning: [validatePresence(true)],
  isAfternoon: [validatePresence(true)],
  isRemote: [validatePresence(true)],
  comment: [validatePresence(false)],
};
