import { Controller, DELETE, GET, inject, injectable, InjectRepository, Param, PATCH, POST, UseErrorHandler, UseGuard, UseMiddleware, UseResponseHandler } from '@triptyk/nfw-core';
import { deserialize } from './../middlewares/deserialize.middleware.js';
import { JsonApiErrorHandler } from '../../json-api/error-handler/json-api.error-handler.js';
import { ContentGuard } from '../../json-api/guards/content.guard.js';
import { JsonApiResponsehandler } from '../../json-api/response-handlers/json-api.response-handler.js';
import { EntityFromBody } from '../decorators/entity-from-body.decorator.js';
import { EnterpriseModel } from '../models/enterprise.model.js';
import type { EnterpriseRepository } from '../repositories/enterprise.repository.js';
import { AclService } from '../services/acl.service.js';
import { ValidatedEnterprise, ValidatedEnterpriseUpdate } from '../validators/enterprise.validator.js';
import { CurrentUser } from '../decorators/current-user.decorator.js';
import type { UserModel } from '../models/user.model.js';
import { EntityFromParam } from '../decorators/entity-from-param.decorator.js';
import type { ValidatedJsonApiQueryParams } from '../../json-api/decorators/json-api-params.js';
import { JsonApiQueryParams } from '../../json-api/decorators/json-api-params.js';
import { EnterpriseQueryParamsSchema } from '../query-params-schema/enterprise.schema.js';
import { EnterpriseDeserializer } from '../deserializer/enterprise.deserializer.js';
import { EnterpriseSerializer } from '../serializer/enterprise.serializer.js';

@Controller('/enterprises')
@UseErrorHandler(JsonApiErrorHandler)
@UseGuard(ContentGuard, true)
@UseResponseHandler(JsonApiResponsehandler, EnterpriseSerializer)
@injectable()
export class EnterpriseController {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    @InjectRepository(EnterpriseModel)
    private enterpriseRepository: EnterpriseRepository,
    @inject(AclService) private aclService: AclService,
  ) {}

  @POST('/')
  @UseMiddleware(deserialize(EnterpriseDeserializer))
  async create (@EntityFromBody(ValidatedEnterprise, EnterpriseModel) body: EnterpriseModel) {
    // this.aclService.enforce(UserModel.ability, currentUser, 'create', body);
    return this.enterpriseRepository.jsonApiCreate(body);
  }

  @PATCH('/:id')
  @UseMiddleware(deserialize(EnterpriseDeserializer))
  async update (@EntityFromBody(ValidatedEnterpriseUpdate, EnterpriseModel) enterprise: EnterpriseModel, @Param('id') id: string, @CurrentUser() currentUser?: UserModel) {
    return this.enterpriseRepository.jsonApiUpdate(enterprise as any, { id }, currentUser);
  }

  @DELETE('/:id')
  async delete (@EntityFromParam('id', EnterpriseModel) enterprise : EnterpriseModel) {
    console.log('coucou');
    return this.enterpriseRepository.jsonApiRemove({ id: enterprise.id });
  }

  @GET('/')
  public async list (@JsonApiQueryParams(EnterpriseQueryParamsSchema) queryParams: ValidatedJsonApiQueryParams) {
    const rt = await this.enterpriseRepository.jsonApiFind(queryParams);
    console.log(rt);
    return rt;
  }

  @GET('/:id')
  async get (@JsonApiQueryParams(EnterpriseQueryParamsSchema) queryParams: ValidatedJsonApiQueryParams, @Param('id') id : string, @CurrentUser() currentUser?: UserModel) {
    console.log('one');
    return this.enterpriseRepository.jsonApiFindOne({
      id,
    }, queryParams, currentUser);
  }
}
