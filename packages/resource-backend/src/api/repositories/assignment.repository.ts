import type { UserModel } from '../models/user.model.js';
import { JsonApiRepository } from '../../json-api/repositories/json-api.repository.js';

export class AssignmentRepository extends JsonApiRepository<UserModel> {
}
