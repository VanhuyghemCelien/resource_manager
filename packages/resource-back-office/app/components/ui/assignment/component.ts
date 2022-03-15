import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import type ResourceModel from 'ember-boilerplate/models/resource';

interface UiAssignmentArgs {
  resource: ResourceModel;
  choosingDay: Date;
  toggleDisplayNewAssignmentModal: (
    choosingdate: Date,
    resource: ResourceModel,
    boolMorning: boolean,
    boolAfternoon: boolean
  ) => void;
}

export default class UiAssignment extends Component<UiAssignmentArgs> {
  @tracked tableDay: number[] = [1, 2, 3, 4, 5];
}
