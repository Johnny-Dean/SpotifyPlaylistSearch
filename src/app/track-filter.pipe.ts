import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trackFilter'
})
export class TrackFilterPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
