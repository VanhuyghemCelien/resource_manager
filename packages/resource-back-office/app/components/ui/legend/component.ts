import { action } from '@ember/object';
import { inject } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import type AssignmentTypeModel from 'ember-boilerplate/models/assignment-type';
import type EnterpriseModel from 'ember-boilerplate/models/enterprise';
import type ResourceModel from 'ember-boilerplate/models/resource';
import type AssignmentTypeService from 'ember-boilerplate/services/assignment-type-service';

interface UiLegendArgs {
  model: {
    resource: Array<ResourceModel>;
    assignmentType: Array<AssignmentTypeModel>;
    enterprise: Array<EnterpriseModel>;
  };
}

export default class UiLegend extends Component<UiLegendArgs> {
  @tracked isLegendDisplayed: boolean = false;
  @inject declare assignmentTypeService: AssignmentTypeService;
  @tracked assignmentTypesToDisplay: Array<AssignmentTypeModel> = [];

  @action
  toggleIsLegendDisplayed() {
    if (this.isLegendDisplayed) {
      this.isLegendDisplayed = false;
    } else {
      this.isLegendDisplayed = true;
      this.assignmentTypeService
        .getAssignedTypes(this.args.model.resource)
        .then((assignmentTypes) => {
          this.assignmentTypesToDisplay = assignmentTypes;
        });
    }
  }

  get borderRadius() {
    if (this.assignmentTypesToDisplay.length > 2) {
      return 'rounded-bl-lg';
    }
    return '';
  }

  get tableLength() {
    return this.assignmentTypesToDisplay.length;
  }
}
