import type { ControllerParamsContext } from '@triptyk/nfw-core';
import {
  injectable,
  singleton,
} from '@triptyk/nfw-core';
import type {
  CheckTypes,
  QueryParamsSchemaInterface,
} from '../../json-api/interfaces/query-params.interface';

@singleton()
@injectable()
export class ResourceQueryParamsSchema implements QueryParamsSchemaInterface {
  allowedIncludes (
    _context: ControllerParamsContext,
  ): CheckTypes[] | Promise<CheckTypes[]> {
    return ['enterprise', 'assignment'];
  }

  allowedFields (
    _context: ControllerParamsContext,
  ): CheckTypes[] | Promise<CheckTypes[]> {
    return ['id', /resource\.(.+)/, /enterprise\.(.+)/, /assignment\.(.+)/, /.*/];
  }

  allowedSortFields (
    _context: ControllerParamsContext,
  ): CheckTypes[] | Promise<CheckTypes[]> {
    return [];
  }

  allowedFilters (
    _context: ControllerParamsContext,
  ): CheckTypes[] | Promise<CheckTypes[]> {
    return ['id.$eq', 'assignment.$and.0.date.$lte', 'assignment.$and.1.date.$gte'];
  }
}
