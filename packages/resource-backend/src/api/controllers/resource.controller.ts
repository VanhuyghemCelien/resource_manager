import { deserialize } from './../middlewares/deserialize.middleware.js';
import type { EntityDTO } from '@mikro-orm/core';
import {
  Controller,
  DELETE,
  GET,
  inject,
  injectable,
  InjectRepository,
  Param,
  POST,
  PUT,
  UseErrorHandler,
  UseGuard,
  UseMiddleware,
  UseResponseHandler,
} from '@triptyk/nfw-core';
import type { ValidatedJsonApiQueryParams } from '../../json-api/decorators/json-api-params.js';
import { JsonApiQueryParams } from '../../json-api/decorators/json-api-params.js';
import { JsonApiErrorHandler } from '../../json-api/error-handler/json-api.error-handler.js';
import { ContentGuard } from '../../json-api/guards/content.guard.js';
import { JsonApiResponsehandler } from '../../json-api/response-handlers/json-api.response-handler.js';
import { EntityFromBody } from '../decorators/entity-from-body.decorator.js';
import { ValidatedFile } from '../decorators/file.decorator.js';
import { fileUploadMiddleware } from '../middlewares/file-upload.middleware.js';
import { ResourceModel } from '../models/resource.model.js';
import { ResourceQueryParamsSchema } from '../query-params-schema/resource.schema.js';
import type { ResourceRepository } from '../repositories/resource.repository.js';
import { ResourceSerializer } from '../serializer/resource.serializer.js';
import { ValidatedResource } from '../validators/resource.validator.js';
import { CurrentUser } from '../decorators/current-user.decorator.js';
import type { UserModel } from '../models/user.model.js';
import { AclService } from '../services/acl.service.js';
import { ResourceDeserializer } from '../deserializer/resource.deserializer.js';

@Controller('/resources')
@UseErrorHandler(JsonApiErrorHandler)
@UseGuard(ContentGuard, true)
@UseResponseHandler(JsonApiResponsehandler, ResourceSerializer)
@injectable()
export class ResourceController {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    @InjectRepository(ResourceModel)
    private resourceRepository: ResourceRepository,
    @inject(AclService) private aclService: AclService,
  ) {}

  @POST('/')
  @UseMiddleware(deserialize(ResourceDeserializer))
  async create (@EntityFromBody(ValidatedResource, ResourceModel) body: ResourceModel, @CurrentUser() currentUser?: UserModel) {
    // this.aclService.enforce(UserModel.ability, currentUser, 'create', body);
    console.log(body);
    return this.resourceRepository.jsonApiCreate(body);
  }

  @PUT('/:id')
  @UseMiddleware(fileUploadMiddleware)
  async replace (
    @Param('id') id: string,
    @ValidatedFile('file', ValidatedResource) document: Partial<EntityDTO<ResourceModel>>,
  ) {
    await this.resourceRepository.findOneOrFail({ id }).then(file => file?.removeFromDisk());
    const up = await this.resourceRepository.jsonApiUpdate(document, { id });
    return up;
  }

  @DELETE('/:id')
  async delete (@Param('id') id: string) {
    return this.resourceRepository.jsonApiRemove({ id });
  }

  @GET('/')
  public async list (
    @JsonApiQueryParams(ResourceQueryParamsSchema)
      queryParams: ValidatedJsonApiQueryParams,
  ) {
    return this.resourceRepository.findAll();
  }
}
