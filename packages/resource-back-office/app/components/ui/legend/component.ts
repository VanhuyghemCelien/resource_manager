import type Store from '@ember-data/store';
import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import type AssignmentTypeModel from 'ember-boilerplate/models/assignment-type';
import type EnterpriseModel from 'ember-boilerplate/models/enterprise';
import type ResourceModel from 'ember-boilerplate/models/resource';

interface UiLegendArgs {
  model: {
    resource: Array<ResourceModel>;
    assignmentType: Array<AssignmentTypeModel>;
    enterprise: Array<EnterpriseModel>;
  };
}

export default class UiLegend extends Component<UiLegendArgs> {
  @tracked isLegendDisplayed: boolean = false;
  @service declare store: Store;

  @action
  toggleIsLegendDisplayed() {
    if (this.isLegendDisplayed) {
      this.isLegendDisplayed = false;
    } else {
      this.isLegendDisplayed = true;
    }
  }

  @tracked tableAssignmentTypeDisplayed: AssignmentTypeModel[] = [];
  constructor(owner: unknown, args: UiLegendArgs) {
    super(owner, args);
    this.args.model.assignmentType.forEach((assignmentType) => {
      if (this.willDisplay(assignmentType.get('id'))) {
        if (assignmentType.color) {
          this.tableAssignmentTypeDisplayed.push(assignmentType);
        } else {
          this.tableAssignmentTypeDisplayed.push(assignmentType.get('parents'));
        }
      }
    });
  }

  willDisplay(id: string) {
    let isDisplayed = false;
    const resources = this.args.model.resource;
    resources.forEach((resource) => {
      if (resource.get('assignment').length > 0) {
        resource.get('assignment').forEach((assignment) => {
          if (assignment.assignmentType.get('id') === id) {
            isDisplayed = true;
          }
        });
      }
    });
    return isDisplayed;
  }

  get borderRadius() {
    if (this.tableAssignmentTypeDisplayed.length > 2) {
      return 'rounded-bl-lg';
    }
    return '';
  }
}
