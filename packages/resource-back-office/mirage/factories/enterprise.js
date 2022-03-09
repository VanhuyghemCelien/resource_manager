import { Factory } from 'miragejs';

export default Factory.extend({
  enterpriseid(i) {
    return i + 1;
  },
  name(i) {
    if (i === 0) {
      return 'Technocité';
    }
    return 'Triptyk';
  },
  city(i) {
    if (i === 0) {
      return 'Hornu';
    }
    return 'Mons';
  },
  emailaddress(i) {
    if (i === 0) {
      return 'technocite@technocite.be';
    }
    return 'triptyk@triptyk.be';
  },
  phonenumber(i) {
    if (i === 0) {
      return '065/76.67.10';
    }
    return '065/76.67.11';
  },
  emailaddress2(i) {
    if (i === 0) {
      return 'technocite2@technocite.be';
    }
    return 'triptyk2@triptyk.be';
  },
  phonenumber2(i) {
    if (i === 0) {
      return '065/76.67.12';
    }
    return '065/76.67.13';
  },
  enterprisenumber() {
    return '0123456789';
  },
  vatnumber() {
    return 'BE0123456789';
  },
  address() {
    return 'Chaussée de Binche 177A';
  },
});
