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
    return ['firstName', 'lastName', 'emailAddress', 'emailAddress2', 'phoneNumber', 'phoneNumber2', 'cost'];
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
