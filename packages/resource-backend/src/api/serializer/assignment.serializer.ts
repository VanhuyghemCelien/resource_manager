import { inject, injectable, singleton } from '@triptyk/nfw-core';
import { BaseJsonApiSerializer } from '../../json-api/serializer/base.serializer.js';
import type { AssignmentModel } from '../models/assignment.model.js';
import { ConfigurationService } from '../services/configuration.service.js';

@injectable()
@singleton()
export class AssignmentSerializer extends BaseJsonApiSerializer<AssignmentModel> {
  constructor (
    @inject(ConfigurationService) configurationService: ConfigurationService,
  ) {
    super(configurationService);

    this.serializer.register('assignments', {
      whitelist: ['date', 'isMorning', 'isAfternoon', 'isRemote', 'comment', 'enterprises', 'resources', 'types'] as (keyof AssignmentModel)[],
    });
  }

  serialize (
    data: AssignmentModel[] | AssignmentModel,
    extraData?: Record<string, unknown>,
  ) {
    return this.serializer.serializeAsync('assignments', data, extraData ?? ({} as any));
  }
}
