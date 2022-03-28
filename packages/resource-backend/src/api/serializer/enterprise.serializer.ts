import { inject, injectable, singleton } from '@triptyk/nfw-core';
import { BaseJsonApiSerializer } from '../../json-api/serializer/base.serializer.js';
import type { AssignmentModel } from '../models/assignment.model.js';
import type { EnterpriseModel } from '../models/enterprise.model.js';
import type { ResourceModel } from '../models/resource.model.js';
import { ConfigurationService } from '../services/configuration.service.js';

@injectable()
@singleton()
export class EnterpriseSerializer extends BaseJsonApiSerializer<EnterpriseModel> {
  constructor (
    @inject(ConfigurationService) configurationService: ConfigurationService,
  ) {
    super(configurationService);

    this.serializer.register('enterprises', {
      whitelist: ['name', 'city', 'emailAddress', 'emailAddress2', 'phoneNumber', 'phoneNumber2', 'address', 'enterpriseNumber', 'vatNumber'] as (keyof EnterpriseModel)[],
      relationships: {
        resources: {
          type: 'resources',
        },
        assignments: {
          type: 'assignments',
        },
      },
    });
    this.serializer.register('assignments', {
      whitelist: ['date', 'isMorning', 'isAfternoon', 'isRemote', 'comment'] as (keyof AssignmentModel)[],
    });
    this.serializer.register('resources', {
      whitelist: ['firstName', 'lastName', 'emailAddress', 'emailAddress2', 'phoneNumber', 'phoneNumber2', 'cost', 'enterprise', 'image', 'roleUser'] as (keyof ResourceModel)[],
    });
  }

  serialize (
    data: EnterpriseModel[] | EnterpriseModel,
    extraData?: Record<string, unknown>,
  ) {
    return this.serializer.serializeAsync('enterprises', data, extraData ?? ({} as any));
  }
}
