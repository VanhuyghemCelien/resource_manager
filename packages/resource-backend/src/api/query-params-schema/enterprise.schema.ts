import type { ControllerParamsContext } from '@triptyk/nfw-core';
import { injectable, singleton } from '@triptyk/nfw-core';
import type { CheckTypes, QueryParamsSchemaInterface } from '../../json-api/interfaces/query-params.interface.js';

@singleton()
@injectable()
export class EnterpriseQueryParamsSchema implements QueryParamsSchemaInterface {
  allowedIncludes (
    _context: ControllerParamsContext,
  ): CheckTypes[] | Promise<CheckTypes[]> {
    return ['resource', 'assignment'];
  }

  allowedFields (
    _context: ControllerParamsContext,
  ): CheckTypes[] | Promise<CheckTypes[]> {
    return ['id', /enterprise\.(.+)/, /resource\.(.+)/, /assignment\.(.+)/, /.*/];
  }

  allowedSortFields (
    _context: ControllerParamsContext,
  ): CheckTypes[] | Promise<CheckTypes[]> {
    return [];
  }

  allowedFilters (
    _context: ControllerParamsContext,
  ): CheckTypes[] | Promise<CheckTypes[]> {
    return ['id.$eq', 'name'];
  }
}
