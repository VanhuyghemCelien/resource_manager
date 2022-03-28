import { inject, injectable, singleton } from '@triptyk/nfw-core';
import { BaseJsonApiSerializer } from '../../json-api/serializer/base.serializer.js';
import type { AssignmentModel } from '../models/assignment.model.js';
import type { EnterpriseModel } from '../models/enterprise.model.js';
import type { ResourceModel } from '../models/resource.model.js';
import { ConfigurationService } from '../services/configuration.service.js';

@injectable()
@singleton()
export class ResourceSerializer extends BaseJsonApiSerializer<ResourceModel> {
  constructor (
    @inject(ConfigurationService) configurationService: ConfigurationService,
  ) {
    super(configurationService);

    this.serializer.register('resources', {
      whitelist: ['firstName', 'lastName', 'emailAddress', 'emailAddress2', 'phoneNumber', 'phoneNumber2', 'cost', 'image'] as (keyof ResourceModel)[],
      relationships: {
        enterprises: {
          type: 'enterprises',
        },
        assignments: {
          type: 'assignments',
        },
      },
    });
    this.serializer.register('enterprises', {
      whitelist: ['name', 'city', 'emailAddress', 'emailAddress2', 'phoneNumber', 'phoneNumber2', 'address', 'enterpriseNumber', 'vatNumber'] as (keyof EnterpriseModel)[],
    });
    this.serializer.register('assignments', {
      whitelist: ['date', 'isMorning', 'isAfternoon', 'isRemote', 'comment'] as (keyof AssignmentModel)[],
    });
  }

  serialize (
    data: ResourceModel[] | ResourceModel,
    extraData?: Record<string, unknown>,
  ) {
    return this.serializer.serializeAsync('resources', data, extraData ?? ({} as any));
  }
}
