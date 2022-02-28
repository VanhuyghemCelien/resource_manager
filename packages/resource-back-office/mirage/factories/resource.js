import { Factory } from 'miragejs';

export default Factory.extend({
  image() {
    return '/assets/icons/Users.svg';
  },
  emailaddress() {
    return 'toto@gmail.com';
  },
  firstname() {
    return 'toto';
  },
  lastname() {
    return 'fitdevoie';
  },
  phonenumber() {
    return '0456783456';
  },
  roleuser() {
    return 'user';
  },
  enterprise() {
    return 'tpk';
  },
});
