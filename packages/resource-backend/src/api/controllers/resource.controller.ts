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

 @GET('/:firstDate/:lastDate')
  public async listresource (@Param('firstDate') first: string, @Param('lastDate') last: string) {
    const res = await this.resourceRepository.createQueryBuilder('resource').select('*').leftJoinAndSelect('resource.assignment', 'assignment', { $and: [{ 'assignment.date': { $lte: last } }, { 'assignment.date': { $gte: first } }] }).leftJoinAndSelect('assignment.assignmentType', 'assignmentType').getResult();
    console.log(res);
    return res;
  }

  @POST('/')
  @UseMiddleware(deserialize(ResourceDeserializer))
 async create (@EntityFromBody(ValidatedResource, ResourceModel) body: ResourceModel) {
   // this.aclService.enforce(UserModel.ability, currentUser, 'create', body);
   return await this.resourceRepository.jsonApiCreate(body);
 }

  @PATCH('/:id')
  @UseMiddleware(deserialize(ResourceDeserializer))
  async update (@EntityFromBody(ValidatedResourceUpdate, ResourceModel) resource: ResourceModel, @Param('id') id: string, @CurrentUser() currentUser?: UserModel) {
    return this.resourceRepository.jsonApiUpdate(resource as any, { id }, currentUser);
  }

  @DELETE('/:id')
  async delete (@EntityFromParam('id', ResourceModel) resource : ResourceModel) {
    return this.resourceRepository.jsonApiRemove({ id: resource.id });
  }

  @GET('/')
  public async list (@JsonApiQueryParams(ResourceQueryParamsSchema) queryParams: ValidatedJsonApiQueryParams) {
    return this.resourceRepository.jsonApiFind(queryParams);
  }

  @GET('/:id')
  async get (@JsonApiQueryParams(ResourceQueryParamsSchema) queryParams: ValidatedJsonApiQueryParams, @Param('id') id : string, @CurrentUser() currentUser?: UserModel) {
    return this.resourceRepository.jsonApiFindOne({
      id,
    }, queryParams, currentUser);
  }
}
