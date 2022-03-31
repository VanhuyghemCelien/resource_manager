import { Factory } from 'miragejs';

export default Factory.extend({
  resourceId(i) {
    return i + 1;
  },
  image(i) {
    if (i === 0) {
      return '/assets/images/resource1.png';
    }
    return '/assets/images/resource2.png';
  },
  emailAddress(i) {
    if (i === 0) {
      return 'toto@gmail.com';
    }
    return 'tata@gmail.com';
  },
  emailAddress2(i) {
    if (i === 0) {
      return 'toto@triptyk.eu';
    }
    return 'tata@triptyk.eu';
  },
  firstName(i) {
    if (i === 0) {
      return 'toto';
    }
    return 'tata';
  },
  lastName(i) {
    if (i === 0) {
      return 'fitdevoie';
    }
    return 'test';
  },
  phoneNumber() {
    return '0456/78.34.56';
  },
  phoneNumber2() {
    return '0457/89.01.23';
  },
  enterprise(i) {
    if (i === 0) {
      return 'Triptyk';
    }
    return 'Technocité';
  },
  cost() {
    return '20';
  },
});
