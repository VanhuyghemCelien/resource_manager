import { Factory } from 'miragejs';

export default Factory.extend({
  enterpriseid() {
    return Math.floor(Math.random() * 20);
  },
  name() {
    if (Math.floor(Math.random() * 20) >= 10) {
      return 'Technocité';
    }
    return 'Triptyk';
  },
  city() {
    if (Math.floor(Math.random() * 20) >= 10) {
      return 'Hornu';
    }
    return 'Mons';
  },
  emailaddress() {
    if (Math.floor(Math.random() * 20) >= 10) {
      return 'technocite@technocite.be';
    }
    return 'triptyk@triptyk.be';
  },
  phonenumber() {
    if (Math.floor(Math.random() * 20) >= 10) {
      return '065/76.67.10';
    }
    return '065/76.67.11';
  },
  emailaddress2() {
    if (Math.floor(Math.random() * 20) >= 10) {
      return 'technocite2@technocite.be';
    }
    return 'triptyk2@triptyk.be';
  },
  phonenumber2() {
    if (Math.floor(Math.random() * 20) >= 10) {
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
