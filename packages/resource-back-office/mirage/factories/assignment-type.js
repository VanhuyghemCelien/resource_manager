import { Factory } from 'miragejs';

export default Factory.extend({
  assignmenttypeid(i) {
    return i + 1;
  },
  assignmenttypename(i) {
    if (i === 0) {
      return 'Formation';
    }
    return 'Projet';
  },
  multiplecolors(i) {
    if (i === 0) {
      return true;
    }
    return false;
  },
  assignmenttypecolor(i) {
    if (i === 0) {
      return undefined;
    }
    return '#9EDCA0';
  },
});
