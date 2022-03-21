import { Controller, DELETE, GET, inject, injectable, InjectRepository, Param, PATCH, POST, UseErrorHandler, UseGuard, UseMiddleware, UseResponseHandler } from '@triptyk/nfw-core';
import { deserialize } from './../middlewares/deserialize.middleware.js';
import { JsonApiErrorHandler } from '../../json-api/error-handler/json-api.error-handler.js';
import { ContentGuard } from '../../json-api/guards/content.guard.js';
import { JsonApiResponsehandler } from '../../json-api/response-handlers/json-api.response-handler.js';
import { EntityFromBody } from '../decorators/entity-from-body.decorator.js';
import { AssignmentTypeDeserializer } from '../deserializer/assignment-type.deserializer.js';
import { AssignmentTypeModel } from '../models/assignment-type.model.js';
import type { AssignmentTypeRepository } from '../repositories/assignment-type.repository.js';
import { AclService } from '../services/acl.service.js';
import { ValidatedAssignmentType, ValidatedAssignmentTypeUpdate } from '../validators/assignment-type.validator.js';
import type { UserModel } from '../models/user.model.js';
import { CurrentUser } from '../decorators/current-user.decorator.js';
import { EntityFromParam } from '../decorators/entity-from-param.decorator.js';
import type { ValidatedJsonApiQueryParams } from '../../json-api/decorators/json-api-params.js';
import { JsonApiQueryParams } from '../../json-api/decorators/json-api-params.js';
import { AssignmentTypeQueryParamsSchema } from '../query-params-schema/assignment-type.schema.js';
import { AssignmentTypeSerializer } from '../serializer/assignment-type.serializer.js';

@Controller('/assignment-types')
@UseErrorHandler(JsonApiErrorHandler)
@UseGuard(ContentGuard, true)
@UseResponseHandler(JsonApiResponsehandler, AssignmentTypeSerializer)
@injectable()
export class AssignmentTypeController {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    @InjectRepository(AssignmentTypeModel)
    private assignmentTypeRepository: AssignmentTypeRepository,
    @inject(AclService) private aclService: AclService,
  ) {}

  @POST('/')
  @UseMiddleware(deserialize(AssignmentTypeDeserializer))
  async create (@EntityFromBody(ValidatedAssignmentType, AssignmentTypeModel) body: AssignmentTypeModel) {
    // this.aclService.enforce(UserModel.ability, currentUser, 'create', body);
    console.log(body);
    return this.assignmentTypeRepository.jsonApiCreate(body);
  }

  @PATCH('/:id')
  @UseMiddleware(deserialize(AssignmentTypeDeserializer))
  async update (@EntityFromBody(ValidatedAssignmentTypeUpdate, AssignmentTypeModel) user: UserModel, @Param('id') id: string, @CurrentUser() currentUser?: UserModel) {
    return this.assignmentTypeRepository.jsonApiUpdate(user as any, { id }, currentUser);
  }

  @DELETE('/:id')
  async delete (@EntityFromParam('id', AssignmentTypeModel) resource : AssignmentTypeModel) {
    console.log('coucou');
    return this.assignmentTypeRepository.jsonApiRemove({ id: resource.id });
  }

  @GET('/')
  public async list (@JsonApiQueryParams(AssignmentTypeQueryParamsSchema) queryParams: ValidatedJsonApiQueryParams) {
    console.log('all');
    return this.assignmentTypeRepository.jsonApiFind(queryParams);
  }

  @GET('/:id')
  async get (@JsonApiQueryParams(AssignmentTypeQueryParamsSchema) queryParams: ValidatedJsonApiQueryParams, @Param('id') id : string, @CurrentUser() currentUser?: UserModel) {
    console.log('one');
    return this.assignmentTypeRepository.jsonApiFindOne({
      id,
    }, queryParams, currentUser);
  }
}
