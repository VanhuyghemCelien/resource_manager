import { Factory } from 'miragejs';

export default Factory.extend({
  assignmentTypeName() {
    const xexe = Math.floor(Math.random() * 8);
    if (xexe > 4) {
      return 'dede';
    }
    return 'Formation';
  },
  assignmentTypeColor() {
    return '#ff0000';
  },
});
