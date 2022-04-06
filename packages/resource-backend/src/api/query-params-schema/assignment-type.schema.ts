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
export class AssignmentTypeQueryParamsSchema implements QueryParamsSchemaInterface {
  allowedIncludes (
    _context: ControllerParamsContext,
  ): string[] | Promise<string[]> {
    return ['childs', 'parents', 'assignment'];
  }

  allowedFields (
    _context: ControllerParamsContext,
  ): CheckTypes[] | Promise<string[]> {
    return ['id', /assignmentType\.(.+)/, /parents\.(.+)/, /children\.(.+)/, /assignment\.(.+)/, /.*/];
  }

  allowedSortFields (
    _context: ControllerParamsContext,
  ): string[] | Promise<string[]> {
    return [];
  }

  allowedFilters (
    _context: ControllerParamsContext,
  ): CheckTypes[] | Promise<CheckTypes[]> {
    return ['id.$eq', 'name'];
  }
}
