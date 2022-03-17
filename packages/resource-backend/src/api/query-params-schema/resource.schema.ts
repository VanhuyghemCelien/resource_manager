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
  ): string[] | Promise<string[]> {
    return [];
  }

  allowedFields (
    _context: ControllerParamsContext,
  ): string[] | Promise<string[]> {
    return ['firstName', 'lastName', 'email1', 'email2', 'phone1', 'phone2', 'cost'];
  }

  allowedSortFields (
    _context: ControllerParamsContext,
  ): string[] | Promise<string[]> {
    return [];
  }

  allowedFilters (
    _context: ControllerParamsContext,
  ): CheckTypes[] | Promise<CheckTypes[]> {
    return ['id.$eq'];
  }
}
