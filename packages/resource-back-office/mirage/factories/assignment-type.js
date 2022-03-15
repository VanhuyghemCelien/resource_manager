import { Factory } from 'miragejs';

export default Factory.extend({
  assignmentTypeId(i) {
    return i + 1;
  },
  assignmentTypeName(i) {
    if (i === 0) {
      return 'Formation';
    }
    return 'Projet';
  },
  multipleColors(i) {
    if (i === 0) {
      return true;
    }
    return false;
  },
  assignmentTypeColor(i) {
    if (i === 0) {
      return undefined;
    }
    return '#9EDCA0';
  },
});
