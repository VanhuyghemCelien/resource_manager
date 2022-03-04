import { Factory } from 'miragejs';

export default Factory.extend({
  userName() {
    return 'toto fitdevoie';
  },

  assignmentType() {
    return {
      assignmentTypeName: 'fefe',
      assignmentTypeColor: '#f4bdbd',
    };
  },

  assignmentTitle() {
    return {
      assignmentTitleName: 'gt',
    };
  },

  enterprise() {
    return {
      enterpriseName: 'tuy',
    };
  },

  date() {
    return 'Monday - 28 / 02';
  },
});
