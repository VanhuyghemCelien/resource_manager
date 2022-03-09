import { Factory } from 'miragejs';

export default Factory.extend({
  resourceid(i) {
    return i + 1;
  },
  image(i) {
    if (i === 0) {
      return '/assets/images/resource1.png';
    }
    return '/assets/images/resource2.png';
  },
  emailaddress(i) {
    if (i === 0) {
      return 'toto@gmail.com';
    }
    return 'tata@gmail.com';
  },
  emailaddress2(i) {
    if (i === 0) {
      return 'toto@triptyk.eu';
    }
    return 'tata@triptyk.eu';
  },
  firstname(i) {
    if (i === 0) {
      return 'toto';
    }
    return 'tata';
  },
  lastname(i) {
    if (i === 0) {
      return 'fitdevoie';
    }
    return 'test';
  },
  phonenumber() {
    return '0456/78.34.56';
  },
  phonenumber2() {
    return '0457/89.01.23';
  },
  roleuser() {
    return 'user';
  },
  enterprise(i) {
    if (i === 0) {
      return 'Triptyk';
    }
    return 'Technocité';
  },
});
