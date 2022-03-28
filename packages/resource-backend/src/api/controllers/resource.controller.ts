import { deserialize } from './../middlewares/deserialize.middleware.js';
import {
  Controller,
  DELETE,
  GET,
  inject,
  injectable,
  InjectRepository,
  Param,
  PATCH,
  POST,
  UseErrorHandler,
  UseGuard,
  UseMiddleware,
  UseResponseHandler,
} from '@triptyk/nfw-core';
import { JsonApiErrorHandler } from '../../json-api/error-handler/json-api.error-handler.js';
import { ContentGuard } from '../../json-api/guards/content.guard.js';
import { JsonApiResponsehandler } from '../../json-api/response-handlers/json-api.response-handler.js';
import { EntityFromBody } from '../decorators/entity-from-body.decorator.js';
import { ResourceModel } from '../models/resource.model.js';
import type { ResourceRepository } from '../repositories/resource.repository.js';
import { ResourceSerializer } from '../serializer/resource.serializer.js';
import { ValidatedResource, ValidatedResourceUpdate } from '../validators/resource.validator.js';
import { AclService } from '../services/acl.service.js';
import { ResourceDeserializer } from '../deserializer/resource.deserializer.js';
import { ResourceQueryParamsSchema } from '../query-params-schema/resource.schema.js';
import type { ValidatedJsonApiQueryParams } from '../../json-api/decorators/json-api-params.js';
import { JsonApiQueryParams } from '../../json-api/decorators/json-api-params.js';
import { CurrentUser } from '../decorators/current-user.decorator.js';
import type { UserModel } from '../models/user.model.js';
import { EntityFromParam } from '../decorators/entity-from-param.decorator.js';

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
  async create (@EntityFromBody(ValidatedResource, ResourceModel) body: ResourceModel) {
    // this.aclService.enforce(UserModel.ability, currentUser, 'create', body);
    console.log(body);
    const rt = await this.resourceRepository.jsonApiCreate(body);
    console.log(rt);
    return rt;
  }

  @PATCH('/:id')
  @UseMiddleware(deserialize(ResourceDeserializer))
  async update (@EntityFromBody(ValidatedResourceUpdate, ResourceModel) user: UserModel, @Param('id') id: string, @CurrentUser() currentUser?: UserModel) {
    return this.resourceRepository.jsonApiUpdate(user as any, { id }, currentUser);
  }

  @DELETE('/:id')
  async delete (@EntityFromParam('id', ResourceModel) resource : ResourceModel) {
    console.log('coucou');
    return this.resourceRepository.jsonApiRemove({ id: resource.id });
  }

  @GET('/')
  public async list (@JsonApiQueryParams(ResourceQueryParamsSchema) queryParams: ValidatedJsonApiQueryParams) {
    console.log('all');
    return this.resourceRepository.jsonApiFind(queryParams);
  }

  @GET('/:id')
  async get (@JsonApiQueryParams(ResourceQueryParamsSchema) queryParams: ValidatedJsonApiQueryParams, @Param('id') id : string, @CurrentUser() currentUser?: UserModel) {
    console.log('one');
    return this.resourceRepository.jsonApiFindOne({
      id,
    }, queryParams, currentUser);
  }
}
