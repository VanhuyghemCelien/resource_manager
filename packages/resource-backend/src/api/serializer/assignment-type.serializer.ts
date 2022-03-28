import { inject, injectable, singleton } from '@triptyk/nfw-core';
import { BaseJsonApiSerializer } from '../../json-api/serializer/base.serializer.js';
import type { AssignmentTypeModel } from '../models/assignment-type.model.js';
import type { AssignmentModel } from '../models/assignment.model.js';
import { ConfigurationService } from '../services/configuration.service.js';

@injectable()
@singleton()
export class AssignmentTypeSerializer extends BaseJsonApiSerializer<AssignmentTypeModel> {
  constructor (
    @inject(ConfigurationService) configurationService: ConfigurationService,
  ) {
    super(configurationService);

    this.serializer.register('assignment-types', {
      whitelist: ['name', 'color'] as (keyof AssignmentTypeModel)[],
      relationships: {
        childs: {
          type: 'assignment-type',
        },
        parents: {
          type: 'assignment-type',
        },
        assignments: {
          type: 'assignment',
        },
      },
    });
    this.serializer.register('childs', {
      whitelist: ['name', 'color'] as (keyof AssignmentTypeModel)[],
    });
    this.serializer.register('parents', {
      whitelist: ['name', 'color'] as (keyof AssignmentTypeModel)[],
    });
    this.serializer.register('assignments', {
      whitelist: ['date', 'isMorning', 'isAfternoon', 'isRemote', 'comment'] as (keyof AssignmentModel)[],
    });
  }

  serialize (
    data: AssignmentTypeModel[] | AssignmentTypeModel,
    extraData?: Record<string, unknown>,
  ) {
    return this.serializer.serializeAsync('assignment-types', data, extraData ?? ({} as any));
  }
}
