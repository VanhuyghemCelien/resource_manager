import { JsonApiRepository } from '../../json-api/repositories/json-api.repository.js';
import type { ResourceModel } from '../models/resource.model.js';

export class ResourceRepository extends JsonApiRepository<ResourceModel> {
}
