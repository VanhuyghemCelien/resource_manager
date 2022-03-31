import { inject, injectable, singleton } from '@triptyk/nfw-core';
import { BaseJsonApiSerializer } from '../../json-api/serializer/base.serializer.js';
import type { AssignmentTypeModel } from '../models/assignment-type.model.js';
import type { AssignmentModel } from '../models/assignment.model.js';
import type { EnterpriseModel } from '../models/enterprise.model.js';
import type { ResourceModel } from '../models/resource.model.js';
import { ConfigurationService } from '../services/configuration.service.js';

@injectable()
@singleton()
export class AssignmentSerializer extends BaseJsonApiSerializer<AssignmentModel> {
  constructor (
    @inject(ConfigurationService) configurationService: ConfigurationService,
  ) {
    super(configurationService);

    this.serializer.register('assignment', {
      whitelist: ['date', 'isMorning', 'isAfternoon', 'isRemote', 'comment'] as (keyof AssignmentModel)[],
      relationships: {
        enterprise: {
          type: 'enterprise',
        },
        resource: {
          type: 'resource',
        },
        assignmentType: {
          type: 'assignmentType',
        },
      },
    });
    this.serializer.register('enterprise', {
      whitelist: ['name', 'city', 'emailAddress', 'emailAddress2', 'phoneNumber', 'phoneNumber2', 'address', 'enterpriseNumber', 'vatNumber'] as (keyof EnterpriseModel)[],
    });
    this.serializer.register('resource', {
      whitelist: ['firstName', 'lastName', 'emailAddress', 'emailAddress2', 'phoneNumber', 'phoneNumber2', 'cost', 'enterprise', 'image', 'roleUser'] as (keyof ResourceModel)[],
    });
    this.serializer.register('assignmentType', {
      whitelist: ['name', 'color'] as (keyof AssignmentTypeModel)[],
    });
  }

  serialize (
    data: AssignmentModel[] | AssignmentModel,
    extraData?: Record<string, unknown>,
  ) {
    return this.serializer.serializeAsync('assignment', data, extraData ?? ({} as any));
  }
}
