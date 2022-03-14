import { Factory } from 'miragejs';

export default Factory.extend({
  image() {
    return '/assets/icons/Users.svg';
  },
  emailAddress() {
    return 'toto@gmail.com';
  },
  firstName() {
    return 'toto';
  },
  lastName() {
    return 'fitdevoie';
  },
  phoneNumber() {
    return '0456783456';
  },
  roleUser() {
    return 'user';
  },
  enterprise() {
    return 'tpk';
  },
});
