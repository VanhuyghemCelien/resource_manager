import { inject, injectable, singleton } from '@triptyk/nfw-core';
import { BaseJsonApiSerializer } from '../../json-api/serializer/base.serializer.js';
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
      whitelist: ['firstName', 'lastName', 'emailAddress', 'emailAddress2', 'phoneNumber', 'phoneNumber2', 'cost', 'enterprise', 'image'] as (keyof ResourceModel)[],
    });
  }

  serialize (
    data: ResourceModel[] | ResourceModel,
    extraData?: Record<string, unknown>,
  ) {
    return this.serializer.serializeAsync('resources', data, extraData ?? ({} as any));
  }
}
