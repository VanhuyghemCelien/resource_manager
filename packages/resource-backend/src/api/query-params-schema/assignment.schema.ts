import type { ControllerParamsContext } from '@triptyk/nfw-core';
import { injectable, singleton } from '@triptyk/nfw-core';
import type { CheckTypes, QueryParamsSchemaInterface } from '../../json-api/interfaces/query-params.interface.js';

@injectable()
@singleton()
export class AssignmentQueryParamsSchema implements QueryParamsSchemaInterface {
  allowedIncludes (context: ControllerParamsContext): CheckTypes[] | Promise<CheckTypes[]> {
    return ['enterprise', 'resource', 'assignmentType'];
  }

  allowedFields (context: ControllerParamsContext): CheckTypes[] | Promise<CheckTypes[]> {
    return ['id', /assignment\.(.+)/, /enterprise\.(.+)/, /resource\.(.+)/, /assignmentType\.(.+)/];
  }

  allowedSortFields (context: ControllerParamsContext): CheckTypes[] | Promise<CheckTypes[]> {
    return [];
  }

  allowedFilters (context: ControllerParamsContext): CheckTypes[] | Promise<CheckTypes[]> {
    return ['id.$eq'];
  }
}
