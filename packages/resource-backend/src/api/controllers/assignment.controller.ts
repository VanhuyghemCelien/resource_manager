import { deserialize } from './../middlewares/deserialize.middleware.js';
import {
  Controller,
  DELETE,
  GET,
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
import type { ValidatedJsonApiQueryParams } from '../../json-api/decorators/json-api-params.js';
import { JsonApiQueryParams } from '../../json-api/decorators/json-api-params.js';
import { CurrentUser } from '../decorators/current-user.decorator.js';
import type { UserModel } from '../models/user.model.js';
import { EntityFromParam } from '../decorators/entity-from-param.decorator.js';
import { AssignmentSerializer } from '../serializer/assignment.serializer.js';
import { AssignmentModel } from '../models/assignment.model.js';
import type { AssignmentRepository } from '../repositories/assignment.repository.js';
import { AssignmentDeserializer } from '../deserializer/assignment.deserializer.js';
import { ValidatedAssignment, ValidatedAssignmentUpdate } from '../validators/assignment.validator.js';
import { AssignmentQueryParamsSchema } from '../query-params-schema/assignment.schema.js';

@Controller('/assignments')
@UseErrorHandler(JsonApiErrorHandler)
@UseGuard(ContentGuard, true)
@UseResponseHandler(JsonApiResponsehandler, AssignmentSerializer)
@injectable()
export class AssignmentController {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    @InjectRepository(AssignmentModel)
    private assignmentRepository: AssignmentRepository,
    // @inject(AclService) private aclService: AclService,
  ) {}

  @POST('/')
  @UseMiddleware(deserialize(AssignmentDeserializer))
  async create (@EntityFromBody(ValidatedAssignment, AssignmentModel) body: AssignmentModel) {
    // this.aclService.enforce(UserModel.ability, currentUser, 'create', body);
    console.log(body);
    return this.assignmentRepository.jsonApiCreate(body);
  }

  @PATCH('/:id')
  @UseMiddleware(deserialize(AssignmentDeserializer))
  async update (@EntityFromBody(ValidatedAssignmentUpdate, AssignmentModel) user: UserModel, @Param('id') id: string, @CurrentUser() currentUser?: UserModel) {
    return this.assignmentRepository.jsonApiUpdate(user as any, { id }, currentUser);
  }

  @DELETE('/:id')
  async delete (@EntityFromParam('id', AssignmentModel) resource : AssignmentModel) {
    console.log('coucou');
    return this.assignmentRepository.jsonApiRemove({ id: resource.id });
  }

  @GET('/')
  public async list (@JsonApiQueryParams(AssignmentQueryParamsSchema) queryParams: ValidatedJsonApiQueryParams) {
    console.log('all');
    return this.assignmentRepository.jsonApiFind(queryParams);
  }

  @GET('/:id')
  async get (@JsonApiQueryParams(AssignmentQueryParamsSchema) queryParams: ValidatedJsonApiQueryParams, @Param('id') id : string, @CurrentUser() currentUser?: UserModel) {
    console.log('one');
    return this.assignmentRepository.jsonApiFindOne({
      id,
    }, queryParams, currentUser);
  }
}
