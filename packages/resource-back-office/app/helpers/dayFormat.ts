import { helper } from '@ember/component/helper';
import { format } from 'date-fns';

function dayFormat([args]: Date[]): string {
  let dayFormat = format(args, 'EEEE - d / LL');
  return dayFormat;
}

export default helper(dayFormat);
