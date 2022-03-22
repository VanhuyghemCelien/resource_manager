import { Factory } from 'miragejs';

export default Factory.extend({
  assignmentType() {
    return {
      assignmentTypeName: 'Formation',
      assignmentTypeColor: '#f4bdbd',
    };
  },

  assignmentTitle() {
    return {
      assignmentTitleName: 'Node.js',
    };
  },

  enterprise() {
    return {
      name: 'Technocité',
    };
  },

  date() {
    return new Date().toISOString();
  },

  boolMorning() {
    return true;
  },

  boolAfternoon() {
    return false;
  },
});
